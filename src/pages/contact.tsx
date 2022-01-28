// import node_modules
import * as React from 'react';

// import types
import type { GetStaticProps } from 'next';
import { NextPageWithLayout } from '../types';

// import modules
import * as notion from '../modules/notion';

// import components
import MainLayout from '../components/layouts/MainLayout';
import SEO from '../components/meta/SEO';

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
      <div className="mb-4 w-full bg-white">
        Ready for more attention? Those who want to reach new goals must leave old paths. Success in
        the new attention economy is a question of culture and new digital ways of thinking. Our
        team is dedicated to your creative challenges with optimism and a deep understanding of
        technology and communication.
        <br />
        Are you looking for a partner for your communication challenges? We develop creative
        technology solutions for start-ups, companies or agencies and accompany communication and
        innovation projects from the idea to the market launch and beyond. Write us and you are
        guaranteed to get our attention :)
      </div>

      {/* Formular */}
      <div className="mb-4 w-full bg-white">See Form Guy Website</div>

      {/* FAQ */}
      <div className="mb-4 w-full bg-white">
        See Form Guy Website und https://www.gravitales.com/en/approach/ am Ende
      </div>
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
