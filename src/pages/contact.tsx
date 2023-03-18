import React from 'react';

import type { GetStaticProps } from 'next';
import { NextPageWithLayout } from '../types';

import * as notion from '../modules/notion';

import CheckeredPaperCard from '../components/elements/CheckeredPaperCard';
import Col from '../components/layouts/Col';
import ContactForm from '../components/vendors/ContactForm';
import Container from '../components/layouts/Container';
import Heading from '../components/atoms/Heading';
import Image from '../components/atoms/Image';
import MainLayout from '../components/layouts/MainLayout';
import Row from '../components/layouts/Row';
import SEO from '../components/meta/SEO';
import Section from '../components/layouts/Section';
import Spacer from '../components/layouts/Spacer';
import Subtitle from '../components/atoms/Subtitle';
import Text from '../components/atoms/Text';

const ContactPage: NextPageWithLayout = ({ componentsContent, pageContent }) => {
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

      {/* Form */}
      <Section padding="none">
        <Container xl>
          <Row alignItems="center" justify="center">
            <Col span={12} spanMd={10} spanLg={8}>
              <Spacer height="32px" />
              <CheckeredPaperCard>
                <ContactForm content={componentsContent.ContactForm} />
              </CheckeredPaperCard>
              <Spacer height="32px" />
            </Col>
          </Row>
        </Container>
      </Section>

      {/* FeaturedIn Logos */}
      <Section color="primary">
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

      {/* FAQ */}
      <Section color="gradient" padding="medium">
        <Container xl>
          <Row alignItems="center" justify="center">
            <Col span={12}>
              <Heading alignment="center" tag="h2">
                {pageContent.faq.title}
              </Heading>
            </Col>
          </Row>
          <Spacer height="16px" />
          <Row alignItems="flex-start" justify="space-between">
            {pageContent.faq.items.map(
              ({ question, answer }: { question: string; answer: string }) => (
                <Col span={12} spanSm={6} spanMd={6} key={question}>
                  <Spacer height="16px" />
                  <Heading customClasses="text-base lg:text-xl" tag="h3">
                    {question}
                  </Heading>
                  <Text>{answer}</Text>
                  <Spacer height="16px" />
                </Col>
              ),
            )}
          </Row>
        </Container>
      </Section>
    </>
  );
};

ContactPage.getLayout = (page) => (
  <MainLayout content={page.props.componentsContent}>{page}</MainLayout>
);

export const getStaticProps: GetStaticProps = async () => {
  const pageId = 'Contact';
  const componentIds = ['MainNav', 'Footer', 'ContactForm'];

  const pageContent = await notion.getPageContent(pageId);
  const componentsContent = await notion.getComponentsContent(componentIds);

  return { props: { componentsContent, pageContent }, revalidate: false };
};

export default ContactPage;
