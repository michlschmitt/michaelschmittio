// import node_modules
import * as React from 'react';

// import types
import type { GetStaticProps } from 'next';
import { NextPageWithLayout } from '../types';

// import modules
import * as notion from '../modules/notion';

// import components
import Col from '../components/layouts/Col';
import Container from '../components/layouts/Container';
import ConvertKitForm from '../components/vendors/ConvertKitForm';
import FullHeightContainer from '../components/layouts/FullHeightContainer';
import Heading from '../components/atoms/Heading';
import MainLayout from '../components/layouts/MainLayout';
import Row from '../components/layouts/Row';
import SEO from '../components/meta/SEO';
import Section from '../components/layouts/Section';
import Spacer from '../components/layouts/Spacer';
import Text from '../components/atoms/Text';

// define page
const NewsletterPage: NextPageWithLayout = ({ componentsContent, pageContent }) => {
  return (
    <>
      {/* SEO */}
      <SEO
        description={pageContent.seo.description}
        image={pageContent.seo.image}
        title={pageContent.seo.title}
      />

      {/* Content */}
      <FullHeightContainer>
        <Section color="gradient-horizontal">
          <Container xl>
            <Row justify="center">
              <Col span={12} spanMd={10} spanLg={8}>
                <Heading alignment="center" tag="h1">
                  {pageContent.hero.title}
                </Heading>
                <Text alignment="center">{pageContent.hero.teaser}</Text>
              </Col>
            </Row>
            <Spacer height="16px" />
            <Row justify="center">
              <Col span={12} spanMd={10} spanLg={7}>
                <ConvertKitForm alignment="center" content={componentsContent.ConvertKitForm} />
              </Col>
            </Row>
          </Container>
        </Section>
      </FullHeightContainer>
    </>
  );
};

NewsletterPage.getLayout = (page) => (
  <MainLayout content={page.props.componentsContent}>{page}</MainLayout>
);

export const getStaticProps: GetStaticProps = async () => {
  // get notion data
  const pageId = 'Newsletter';
  const componentIds = ['MainNav', 'Footer', 'ConvertKitForm'];

  // get pageContent
  const pageContent = await notion.getPageContent(pageId);
  const componentsContent = await notion.getComponentsContent(componentIds);

  // return props
  return {
    props: { componentsContent, pageContent },
    revalidate: false,
  };
};

export default NewsletterPage;
