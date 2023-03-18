import React from 'react';

import type { GetStaticProps } from 'next';
import { FixMeLater, NextPageWithLayout } from '../../types';

import * as notion from '../../modules/notion';

import ButtonGroup from '../../components/atoms/ButtonGroup';
import Col from '../../components/layouts/Col';
import Container from '../../components/layouts/Container';
import Heading from '../../components/atoms/Heading';
import LinkButton from '../../components/atoms/LinkButton';
import MainLayout from '../../components/layouts/MainLayout';
import PortfolioItemCard from '../../components/elements/PortfolioItemCard';
import PortfolioPreviewSection from '../../components/sections/PortfolioPreviewSection';
import Row from '../../components/layouts/Row';
import SEO from '../../components/meta/SEO';
import Section from '../../components/layouts/Section';
import Spacer from '../../components/layouts/Spacer';
import Text from '../../components/atoms/Text';
import TextWall from '../../components/elements/TextWall';

const PortfolioPage: NextPageWithLayout = ({ componentsContent, portfolioItems, pageContent }) => {
  return (
    <>
      {/* SEO */}
      <SEO
        description={pageContent.seo.description}
        image={pageContent.seo.image}
        title={pageContent.seo.title}
      />

      <Spacer height="75px" />

      {/* Hero */}
      <Section padding="none">
        <Container xl>
          <Row alignItems="center" justify="center">
            <Col span={12} spanLg={8}>
              <Heading alignment="center" tag="h1">
                {pageContent.hero.title}
              </Heading>
              <Text alignment="center" size="large">
                {pageContent.hero.intro}
              </Text>
            </Col>
          </Row>
        </Container>
      </Section>

      {/* Active portfolio */}
      {pageContent.activePortfolio.map(
        (
          project: {
            buttons: { href: string; label: string; color: string }[];
            facts: { text: string }[];
            id: string;
            image: string;
            intro: string;
            title: string;
          },
          index: number,
        ) => (
          <PortfolioPreviewSection
            backgroundColor="black"
            buttons={project.buttons}
            facts={project.facts}
            image={project.image}
            imagePosition={index % 2 ? 'right' : 'left'}
            introText={project.intro}
            key={project.id}
            subline={project.id}
            title={project.title}
          />
        ),
      )}

      {/* Case studies */}
      <Section color="gradient" padding="medium">
        <Container xl>
          <Spacer height="25px" />
          <Row>
            <Col span={12}>
              <Heading alignment="center" tag="h2">
                {pageContent.pastProjects.title}
              </Heading>
            </Col>
          </Row>
          <Spacer height="12px" />
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

          <Spacer height="50px" />

          {/* Clients */}
          <Row>
            <Col span={12}>
              <TextWall title={pageContent.clients.title} text={pageContent.clients.names} />
            </Col>
          </Row>

          <Spacer height="25px" />
        </Container>
      </Section>

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
      <Spacer height="50px" />
    </>
  );
};

PortfolioPage.getLayout = (page) => (
  <MainLayout content={page.props.componentsContent}>{page}</MainLayout>
);

export const getStaticProps: GetStaticProps = async () => {
  const pageId = 'Portfolio';
  const componentIds = ['MainNav', 'Footer', 'PortfolioItemCard'];

  const pageContent = await notion.getPageContent(pageId);
  const componentsContent = await notion.getComponentsContent(componentIds);
  const portfolioItems = await notion.getPortfolioItems();

  return { props: { componentsContent, portfolioItems, pageContent }, revalidate: false };
};

export default PortfolioPage;
