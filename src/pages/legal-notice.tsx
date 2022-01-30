// import node_modules
import * as React from 'react';

// import types
import type { GetStaticProps } from 'next';
import { NextPageWithLayout } from '../types';

// import modules
import * as notion from '../modules/notion';

// import components
import Container from '../components/layouts/Container';
import MainLayout from '../components/layouts/MainLayout';
import NotionRenderer from '../components/atoms/NotionRenderer';
import SEO from '../components/meta/SEO';
import Spacer from '../components/layouts/Spacer';

// define page
const LegalNoticePage: NextPageWithLayout = ({ pageContent }) => (
  <>
    {/* SEO */}
    <SEO
      description={pageContent.seo.description}
      image={pageContent.seo.image}
      title={pageContent.seo.title}
    />

    {/* Content */}
    <Spacer height="50px" />
    <Container md>
      <NotionRenderer blocks={pageContent.blocks} />
    </Container>
    <Spacer height="100px" />
  </>
);

LegalNoticePage.getLayout = (page) => (
  <MainLayout content={page.props.componentsContent}>{page}</MainLayout>
);

export const getStaticProps: GetStaticProps = async () => {
  // get notion data
  const pageId = 'Legal notice';
  const componentIds = ['MainNav', 'Footer'];

  // get pageContent
  const pageContent = await notion.getPageContent(pageId);
  const componentsContent = await notion.getComponentsContent(componentIds);

  // return props
  return { props: { componentsContent, pageContent }, revalidate: false };
};

export default LegalNoticePage;
