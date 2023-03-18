import React from 'react';

import type { GetStaticProps } from 'next';
import { NextPageWithLayout } from '../types';

import * as notion from '../modules/notion';

import ButtonGroup from '../components/atoms/ButtonGroup';
import CheckeredPaperCard from '../components/elements/CheckeredPaperCard';
import Col from '../components/layouts/Col';
import Container from '../components/layouts/Container';
import Heading from '../components/atoms/Heading';
import Image from '../components/atoms/Image';
import LinkButton from '../components/atoms/LinkButton';
import MainLayout from '../components/layouts/MainLayout';
import Row from '../components/layouts/Row';
import SEO from '../components/meta/SEO';
import Section from '../components/layouts/Section';
import Spacer from '../components/layouts/Spacer';
import Subtitle from '../components/atoms/Subtitle';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import Text from '../components/atoms/Text';
import TextWall from '../components/elements/TextWall';
import TimelineCard from '../components/elements/TimelineCard';
import TimelineContainer from '../components/elements/TimelineContainer';

const AboutPage: NextPageWithLayout = ({ componentsContent, pageContent }) => {
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

      {/* About */}
      <Section color="gradient" padding="none">
        <Container xl>
          <Row alignItems="center" justify="center">
            <Col span={12}>
              <Spacer height="75px" />
            </Col>
            <Col span={12} spanLg={5}>
              <CheckeredPaperCard>
                <Image
                  alt={pageContent.about.image.alt}
                  height={800}
                  isPriority
                  isRound
                  layout="responsive"
                  src={pageContent.about.image.src}
                  width={680}
                />
              </CheckeredPaperCard>
              <Spacer height="32px" />
            </Col>
            <Col span={12} spanLg={6}>
              <>
                <Heading tag="h2">{pageContent.about.title}</Heading>
                <Text>{pageContent.about.text}</Text>
                <ButtonGroup alignment="left">
                  <LinkButton
                    color="link"
                    customClasses="!justify-start"
                    href={pageContent.about.cta.href}
                    key={pageContent.about.cta.href}
                    size="large"
                    text={pageContent.about.cta.label}
                  />
                </ButtonGroup>
                <Spacer height="44px" />
              </>
            </Col>
          </Row>
        </Container>
      </Section>

      {/* Skills */}
      <Section color="black">
        <Container lg>
          <Row justify="center">
            <Col span={12} spanLg={9}>
              <Heading alignment="center" tag="h2">
                {pageContent.skills.title}
              </Heading>
              <Text alignment="center">{pageContent.skills.intro}</Text>
            </Col>
          </Row>
          <Spacer height="24px" />
          <Row justify="space-between">
            {pageContent.skills.items.map((skill: { id: string; title: string; text: string }) => (
              <Col span={12} spanLg={6} key={skill.id}>
                <Heading tag="h3">{skill.title}</Heading>
                <Text>{skill.text}</Text>
                <Spacer height="24px" />
              </Col>
            ))}
          </Row>
          <Spacer height="24px" />
          <Row>
            <Col span={12}>
              <TextWall
                title={pageContent.skills.other.title}
                text={pageContent.skills.other.tools}
              />
            </Col>
          </Row>
        </Container>
      </Section>

      {/* Testimonials */}
      <TestimonialsSection
        title={pageContent.testimonials.title}
        testimonials={componentsContent.Testimonials.testimonials}
      />
      <Spacer height="50px" />

      {/* Background */}
      <Section color="green">
        <Container lg>
          <Row justify="center">
            <Col span={12} spanLg={12}>
              <Heading alignment="left" tag="h2">
                {pageContent.background.title}
              </Heading>
              <Text customClasses="mb-0">{pageContent.background.text}</Text>
              <ButtonGroup>
                <LinkButton
                  customClasses="!justify-start"
                  color="link"
                  href={pageContent.background.linkedIn.href}
                  size="large"
                  text={pageContent.background.linkedIn.label}
                />
              </ButtonGroup>
            </Col>
          </Row>
          <Spacer height="32px" />
          <Row justify="center">
            <Col span={12} spanLg={12}>
              <TimelineContainer>
                {pageContent.background.cv.map(
                  (item: { company: string; title: string; text: string }) => (
                    <TimelineCard
                      key={item.title}
                      company={item.company}
                      title={item.title}
                      text={item.text}
                    />
                  ),
                )}
                <Spacer height="48px" />
                <Subtitle isWhite>{pageContent.background.publications.title}</Subtitle>
                <Spacer height="12px" />
                {pageContent.background.publications.items.map(
                  (item: { href: string; label: string }) => (
                    <ButtonGroup alignment="left" key={item.href}>
                      <LinkButton
                        customClasses="!justify-start"
                        color="link"
                        href={item.href}
                        size="large"
                        text={item.label}
                      />
                    </ButtonGroup>
                  ),
                )}
              </TimelineContainer>
            </Col>
          </Row>
        </Container>
      </Section>

      {/* Teaser Blog */}
      {/* TODO: implement blog - preview 3 posts */}

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

AboutPage.getLayout = (page) => (
  <MainLayout content={page.props.componentsContent}>{page}</MainLayout>
);

export const getStaticProps: GetStaticProps = async () => {
  const pageId = 'About';
  const componentIds = ['MainNav', 'Footer', 'Testimonials'];

  const pageContent = await notion.getPageContent(pageId);
  const componentsContent = await notion.getComponentsContent(componentIds);

  return { props: { componentsContent, pageContent }, revalidate: false };
};

export default AboutPage;
