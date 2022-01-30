// import node_modules
import * as React from 'react';

// import types
import type { GetStaticProps } from 'next';
import { NextPageWithLayout } from '../types';

// import modules
import * as notion from '../modules/notion';

// import components
import CheckeredPaperCard from '../components/elements/CheckeredPaperCard';
import Col from '../components/layouts/Col';
import ContactForm from '../components/vendors/ContactForm';
import Container from '../components/layouts/Container';
import Heading from '../components/atoms/Heading';
import MainLayout from '../components/layouts/MainLayout';
import Row from '../components/layouts/Row';
import SEO from '../components/meta/SEO';
import Section from '../components/layouts/Section';
import Spacer from '../components/layouts/Spacer';
import Text from '../components/atoms/Text';

// define page
const ContactPage: NextPageWithLayout = ({ pageContent }) => {
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
          <Row alignItems="center" justify="space-between" wrap="wrap-reverse">
            <Col span={12} spanLg={6}>
              <CheckeredPaperCard>
                <ContactForm />
              </CheckeredPaperCard>
            </Col>
            <Col span={12} spanLg={6}>
              <>
                <Spacer height="16px" />
                <React.Fragment>
                  <Heading alignment="left" customClasses="text-xl lg:text-2xl mb-6" tag="h2">
                    {pageContent.contact.title}
                  </Heading>
                </React.Fragment>

                {pageContent.contact.workOptions.map(
                  ({ title, description }: { title: string; description: string }) => (
                    <React.Fragment key={title}>
                      <Heading customClasses="text-base lg:text-xl mb-2" tag="h3">
                        {title}
                      </Heading>
                      <Text>{description}</Text>
                    </React.Fragment>
                  ),
                )}
                <Spacer height="16px" />
              </>
            </Col>
          </Row>
        </Container>
      </Section>

      {/* FAQ */}
      <Section color="gradient" padding="medium">
        <Container xl>
          <Row alignItems="center" justify="space-between">
            {pageContent.faq.items.map(
              ({ question, answer }: { question: string; answer: string }) => (
                <Col span={12} spanSm={6} spanMd={4} key={question}>
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
  // get notion data
  const pageId = 'Contact';
  const componentIds = ['MainNav', 'Footer'];

  // get pageContent
  const pageContent = await notion.getPageContent(pageId);
  const componentsContent = await notion.getComponentsContent(componentIds);

  // return props
  return { props: { componentsContent, pageContent }, revalidate: false };
};

export default ContactPage;
