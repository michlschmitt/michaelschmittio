// import node_modules
import * as React from 'react';

// import types
import type { GetStaticPaths, GetStaticProps } from 'next';
import { FixMeLater, NextPageWithLayout } from '../../types';

// import modules
import * as notion from '../../modules/notion';

// import components
import ButtonGroup from '../../components/atoms/ButtonGroup';
import Col from '../../components/layouts/Col';
import Container from '../../components/layouts/Container';
import Heading from '../../components/atoms/Heading';
import Image from '../../components/atoms/Image';
import LinkButton from '../../components/atoms/LinkButton';
import MainLayout from '../../components/layouts/MainLayout';
import NotionRenderer from '../../components/atoms/NotionRenderer';
import PortfolioItemCard from '../../components/elements/PortfolioItemCard';
import Row from '../../components/layouts/Row';
import SEO from '../../components/meta/SEO';
import Section from '../../components/layouts/Section';
import Spacer from '../../components/layouts/Spacer';
import Subtitle from '../../components/atoms/Subtitle';
import Text from '../../components/atoms/Text';

// define page
const PortfolioItemPage: NextPageWithLayout = ({
  componentsContent,
  pageContent,
  portfolioItems,
}) => (
  <>
    {/* SEO */}
    <SEO
      description={pageContent.seo.description}
      image={pageContent.seo.image}
      title={pageContent.seo.title}
    />

    <Spacer height="50px" />

    {/* Header */}
    <Section padding="none">
      <Container md>
        <Row>
          <Col span={12}>
            <Subtitle>{pageContent.name}</Subtitle>
            <Spacer height="12px" />
            <Heading tag="h1">{pageContent.title}</Heading>
          </Col>
        </Row>
      </Container>
    </Section>

    <Spacer height="12px" />

    {/* Image */}
    <Section padding="none">
      <Container lg>
        <Row>
          <Col span={12}>
            <Image
              alt={pageContent.name}
              height={720}
              isPriority
              isRound
              layout="responsive"
              src={pageContent.image}
              width={1280}
            />
          </Col>
        </Row>
      </Container>
    </Section>

    <Spacer height="24px" />

    {/* Content */}
    <Section padding="none">
      <Container md>
        <Row>
          <Col span={12}>
            <NotionRenderer blocks={pageContent.blocks} />
          </Col>
        </Row>
      </Container>
    </Section>

    <Spacer height="50px" />

    {/* Case studies */}
    <Section color="gradient" padding="medium">
      <Container xl>
        <Row>
          <Col span={12}>
            <Heading alignment="center" tag="h2">
              {pageContent.pastProjects.title}
            </Heading>
          </Col>
        </Row>
        <Row>
          {portfolioItems.map((item: FixMeLater) => (
            <Col span={12} spanMd={6} key={item.name.title[0].plain_text}>
              <PortfolioItemCard
                image={item.image.rich_text[0].plain_text}
                linkLabel={componentsContent.PortfolioItemCard.link.label}
                name={item.name.title[0].plain_text}
                slug={item.slug.rich_text[0].plain_text}
                text={item.excerpt.rich_text[0].plain_text}
                title={item.title.rich_text[0].plain_text}
              />
            </Col>
          ))}
        </Row>
        <Spacer height="28px" />
        <Row>
          <Col span={12}>
            <ButtonGroup alignment="center">
              <LinkButton
                color="link"
                href={pageContent.pastProjects.exploreButton.href}
                text={pageContent.pastProjects.exploreButton.label}
              />
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    </Section>

    <Spacer height="50px" />

    {/* Call-to-action */}
    <Section padding="medium">
      <Container md>
        <Row justify="center">
          <Col span={12}>
            <Heading alignment="center" tag="h2">
              {pageContent.cta.title}
            </Heading>
            <Text alignment="center">{pageContent.cta.teaser}</Text>
          </Col>
          <Col span={12}>
            <Spacer height="16px" />
            <ButtonGroup alignment="center">
              <LinkButton
                color="gradient"
                href={pageContent.cta.link.href}
                size="large"
                text={pageContent.cta.link.label}
              />
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    </Section>
  </>
);

PortfolioItemPage.getLayout = (page) => (
  <MainLayout content={page.props.componentsContent}>{page}</MainLayout>
);

export const getStaticPaths: GetStaticPaths = async () => {
  // get portfolio items
  const portfolioItems = await notion.getPortfolioItems();

  // create params
  const paths = portfolioItems.map((item) => ({
    params: { slug: item.slug.rich_text[0].plain_text },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // get slug
  const { slug } = params || {};

  // get notion data
  const componentIds = ['MainNav', 'Footer', 'PortfolioItemCard'];

  // get portfolio items
  const portfolioPageContent = await notion.getPageContent('Portfolio');
  const portfolioItemContent = await notion.getPortfolioItemContent(slug as string);
  const componentsContent = await notion.getComponentsContent(componentIds);
  const portfolioItems = await notion.getPortfolioItems({ exclude: slug as string, limit: 2 });

  // return props
  return {
    props: {
      componentsContent,
      portfolioItems: portfolioItems,
      pageContent: { ...portfolioPageContent, ...portfolioItemContent },
    },
    revalidate: false,
  };
};

export default PortfolioItemPage;
