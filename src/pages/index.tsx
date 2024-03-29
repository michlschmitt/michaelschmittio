import React from 'react';

import type { GetStaticProps } from 'next';
import { ButtonColor, NextPageWithLayout } from '../types';

import * as notion from '../modules/notion';

import ButtonGroup from '../components/atoms/ButtonGroup';
import CheckeredPaperCard from '../components/elements/CheckeredPaperCard';
import Col from '../components/layouts/Col';
import Container from '../components/layouts/Container';
import Heading from '../components/atoms/Heading';
import Image from '../components/atoms/Image';
import LinkButton from '../components/atoms/LinkButton';
import MainLayout from '../components/layouts/MainLayout';
import PortfolioPreviewSection from '../components/sections/PortfolioPreviewSection';
import Row from '../components/layouts/Row';
import SEO from '../components/meta/SEO';
import Section from '../components/layouts/Section';
import Spacer from '../components/layouts/Spacer';
import Subtitle from '../components/atoms/Subtitle';
import Text from '../components/atoms/Text';

const IndexPage: NextPageWithLayout = ({ pageContent }) => (
  <>
    {/* SEO */}
    <SEO
      description={pageContent.seo.description}
      image={pageContent.seo.image}
      title={pageContent.seo.title}
    />

    {/* Hero */}
    <Section padding="none">
      <Container xl>
        <Row alignItems="center" justify="space-between">
          <Col span={12}>
            <Spacer height="75px" />
          </Col>
          <Col span={12} spanLg={7}>
            <>
              <Heading tag="h1">{pageContent.hero.title}</Heading>
              <Text size="large">{pageContent.hero.intro}</Text>
              <ButtonGroup>
                {pageContent.hero.buttons.map(
                  (button: { color: ButtonColor; href: string; label: string }) => (
                    <LinkButton
                      color={button.color}
                      href={button.href}
                      key={button.href}
                      size="large"
                      text={button.label}
                    />
                  ),
                )}
              </ButtonGroup>
              <Spacer height="44px" />
            </>
          </Col>
          <Col span={12} spanLg={5}>
            <CheckeredPaperCard>
              <Image
                alt={pageContent.hero.image.alt}
                height={800}
                isPriority
                isRound
                layout="responsive"
                src={pageContent.hero.image.src}
                width={680}
              />
            </CheckeredPaperCard>
            <Spacer height="32px" />
          </Col>
        </Row>
      </Container>
    </Section>

    {/* About preview */}
    <Section color="green">
      <Container xl>
        <Row>
          <Col span={12} spanLg={4}>
            <Heading customClasses="!mt-[-6px]" tag="h2">
              {pageContent.about.title}
            </Heading>
          </Col>

          <Col span={12} spanLg={8}>
            <div className="ms-split-content-2">
              <Text customClasses="!mb-2">{pageContent.about.intro}</Text>
              <LinkButton
                color="link"
                customClasses="!justify-start"
                href={pageContent.about.cta.href}
                text={pageContent.about.cta.label}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </Section>

    {/* Storyliner preview */}
    <PortfolioPreviewSection
      buttons={pageContent.storyliner.buttons}
      facts={pageContent.storyliner.facts}
      image={pageContent.storyliner.image}
      introText={pageContent.storyliner.intro}
      subline={pageContent.storyliner.id}
      title={pageContent.storyliner.title}
    />

    {/* FeaturedIn Logos */}
    <Section color="grey1">
      <Container xl>
        <Row alignItems="center" justify="center">
          <Col span={12} spanXl={3}>
            <Spacer height="12px" />
            <Subtitle alignment="center" isWhite>
              {pageContent.featuredIn.title}
            </Subtitle>
            <Spacer height="12px" />
          </Col>
          {pageContent.featuredIn.logos.map((logo: { alt: string; src: string }) => (
            <Col key={logo.src} span={6} spanMd={3} spanXl={2}>
              <Image
                alt={logo.alt}
                height={360}
                isRound
                isWhite
                layout="responsive"
                src={logo.src}
                width={720}
              />
            </Col>
          ))}
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

IndexPage.getLayout = (page) => (
  <MainLayout content={page.props.componentsContent}>{page}</MainLayout>
);

export const getStaticProps: GetStaticProps = async () => {
  const pageId = 'Home';
  const componentIds = ['MainNav', 'Footer'];

  const pageContent = await notion.getPageContent(pageId);
  const componentsContent = await notion.getComponentsContent(componentIds);

  return { props: { componentsContent, pageContent }, revalidate: false };
};

export default IndexPage;
