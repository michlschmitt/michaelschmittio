// import node_modules
import * as React from 'react';

// import types
import type { GetStaticProps } from 'next';
import { NextPageWithLayout } from '../types';

// import modules
import * as notion from '../modules/notion';

// import components
import FullHeightContainer from '../components/layouts/FullHeightContainer';
import MainLayout from '../components/layouts/MainLayout';
import NewsletterSection from '../components/sections/NewsletterSection';
import SEO from '../components/meta/SEO';

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
        <NewsletterSection content={componentsContent.NewsletterSection} />
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
  const componentIds = ['MainNav', 'Footer', 'NewsletterSection', 'RevueForm'];

  // get pageContent
  const pageContent = await notion.getPageContent(pageId);
  const componentsContent = await notion.getComponentsContent(componentIds);

  // return props
  return {
    props: {
      componentsContent: {
        ...componentsContent,
        NewsletterSection: {
          ...componentsContent.NewsletterSection,
          RevueForm: componentsContent.RevueForm,
        },
      },
      pageContent,
    },
    revalidate: false,
  };
};

export default NewsletterPage;
