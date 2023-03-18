import React from 'react';

import type { GetStaticPaths, GetStaticProps } from 'next';
import { FixMeLater, NextPageWithLayout } from '../../types';

import * as notion from '../../modules/notion';

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
import Link from 'next/link';

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
            <Subtitle>
              <>
                <Link href={pageContent.detail.subtitleButton.href}>
                  {pageContent.detail.subtitleButton.label}
                </Link>
                &nbsp;&gt;&nbsp;{pageContent.name}
              </>
            </Subtitle>
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

    <Spacer height="100px" />

    {/* Case studies */}
    <Section color="gradient" padding="medium">
      <Container xl>
        <Row>
          <Col span={12}>
            <Heading alignment="center" tag="h2">
              {pageContent.detail.otherTitle}
            </Heading>
          </Col>
        </Row>
        <Row alignItems="stretch">
          {portfolioItems.map((item: FixMeLater) => (
            <Col span={12} spanMd={6} key={item.name}>
              <PortfolioItemCard
                image={item.image}
                linkLabel={componentsContent.PortfolioItemCard.link.label}
                name={item.name}
                slug={item.slug}
                text={item.excerpt}
                title={item.title}
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
                href={pageContent.detail.exploreButton.href}
                text={pageContent.detail.exploreButton.label}
              />
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    </Section>

    {/* Call-to-action */}
    <Section padding="large">
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
  const portfolioItems = await notion.getPortfolioItems();

  const paths = portfolioItems.map((item) => ({
    params: { slug: item.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params || {};

  const componentIds = ['MainNav', 'Footer', 'PortfolioItemCard'];

  const pageContent = await notion.getPageContent('Portfolio');
  const portfolioItemContent = await notion.getPortfolioItemContent(slug as string);
  const componentsContent = await notion.getComponentsContent(componentIds);
  const portfolioItems = await notion.getPortfolioItems({ exclude: slug as string, limit: 2 });

  return {
    props: {
      componentsContent,
      portfolioItems,
      pageContent: { ...pageContent, ...portfolioItemContent },
    },
    revalidate: false,
  };
};

export default PortfolioItemPage;
