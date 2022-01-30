// import node_modules
import * as React from 'react';

// import types
import type { GetStaticProps } from 'next';
import { NextPageWithLayout } from '../../types';

// import modules
import * as notion from '../../modules/notion';

// import components
import ButtonGroup from '../../components/atoms/ButtonGroup';
import Col from '../../components/layouts/Col';
import Container from '../../components/layouts/Container';
import Heading from '../../components/atoms/Heading';
import LinkButton from '../../components/atoms/LinkButton';
import MainLayout from '../../components/layouts/MainLayout';
import PortfolioPreviewSection from '../../components/sections/PortfolioPreviewSection';
import Row from '../../components/layouts/Row';
import SEO from '../../components/meta/SEO';
import Section from '../../components/layouts/Section';
import Spacer from '../../components/layouts/Spacer';
import TestimonialCard from '../../components/elements/TestimonialCard';
import Text from '../../components/atoms/Text';
import TextWall from '../../components/elements/TextWall';

// define page
const PortfolioPage: NextPageWithLayout = ({ pageContent }) => {
  return (
    <>
      {/* SEO */}
      <SEO
        description={pageContent.seo.description}
        image={pageContent.seo.image}
        title={pageContent.seo.title}
      />

      {/* Hero */}
      <Section>
        <Container md>
          <Row alignItems="center" justify="center">
            <Col span={12}>
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
            id: string;
            image: string;
            intro: string;
            title: string;
          },
          index: number,
        ) => (
          <PortfolioPreviewSection
            buttons={project.buttons}
            image={project.image}
            imagePosition={index % 2 ? 'left' : 'right'}
            introText={project.intro}
            key={project.id}
            subline={project.id}
            title={project.title}
            backgroundColor="grey"
          />
        ),
      )}

      {/* Case studies */}
      {/* TODO: implement past projects and client case studies */}

      {/* Clients */}
      <Section>
        <Container xl>
          <TextWall title={pageContent.clients.title} text={pageContent.clients.names} />
        </Container>
      </Section>

      {/* Testimonials */}
      <Section color="gradient-horizontal" padding="medium">
        <Container lg>
          <Row justify="center">
            <Col span={12}>
              <Heading alignment="center" tag="h2">
                What other&apos;s say about working with me
              </Heading>
            </Col>
          </Row>
          <Spacer height="24px" />
          <Row justify="center" alignItems="stretch">
            <Col span={12}>
              <TestimonialCard
                image={pageContent.seo.image}
                name="Lilo Fee Koppe"
                quote="Michael and his team have successfully relaunched our website to an online portal for customers, employees, and partners. The all-round support and know-how were absolutely impressive - from data audit, workshops to the ideal information architecture, a great design and the implementation of various tools. Even with short-term projects, they always go the „extra mile“ for us - they not only deliver, but also get involved to develop the optimal solution for us in the shortest possible time. A partner who stands for quality and with whom it is a pleasure to work!"
                title="Director Marketing & Communications, Felss Group GmbH"
              />
            </Col>
          </Row>
          <Spacer height="24px" />
          <Row justify="center" alignItems="stretch">
            <Col span={12}>
              <TestimonialCard
                image={pageContent.seo.image}
                name="Martin Reich"
                // quote="Michael and his team was our perfect partner, from the initial product idea, through the development of the right business model, the technical implementation to the conception of creative content. Competent, very committed and reliable, thank you very much for everything."
                quote="Competent, very committed and reliable, thank you very much for everything."
                title="Chief Executive Officer, Foconn GmbH"
              />
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
};

PortfolioPage.getLayout = (page) => (
  <MainLayout content={page.props.componentsContent}>{page}</MainLayout>
);

export const getStaticProps: GetStaticProps = async () => {
  // get notion data
  const pageId = 'Portfolio';
  const componentIds = ['MainNav', 'Footer'];

  // get pageContent
  const pageContent = await notion.getPageContent(pageId);
  const componentsContent = await notion.getComponentsContent(componentIds);

  // return props
  return { props: { componentsContent, pageContent }, revalidate: false };
};

export default PortfolioPage;
