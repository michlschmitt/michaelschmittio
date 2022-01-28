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
const AboutPage: NextPageWithLayout = ({ pageContent }) => {
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
        Hero wie Figma, Link to LinkedIn;
        <br />
        With a Master&apos;s degree in Marketing & Innovation, a background in engineering and
        advanced training in artificial intelligence, Michael has equal footing in the creative and
        technological realms. Since the founding of Gravitales, he has driven the union of
        creativity and technology as the guiding principle behind the company&apos;s success.
      </div>

      {/* Skills/Services */}
      <div className="mb-4 w-full bg-white">
        Siehe https://www.gravitales.com/en/approach/ / linear.app - An experience youd expect from
        a professional tool.
        <br />
        Creative technoloes sprech verwenden
        <br />
        Logos Stack? Stack als eigene Seite? auf Bookmarks?
      </div>

      {/* Background */}
      <div className="mb-4 w-full bg-white">
        Background with CV, see Form Guy Portfolio website; Verweis Interviews, Siehe aktuelle Seite
        Passion for sharing knowledge...
      </div>

      {/* Teaser Blog */}
      <div className="mb-4 w-full bg-white">3x Blog posts</div>

      {/* CTA */}
      <div className="mb-4 w-full bg-white">Get in touch - Contact form</div>
    </>
  );
};

AboutPage.getLayout = (page) => (
  <MainLayout content={page.props.componentsContent}>{page}</MainLayout>
);

export const getStaticProps: GetStaticProps = async () => {
  // get notion data
  const pageId = 'About';
  const componentIds = ['MainNav', 'Footer'];

  // get pageContent
  const pageContent = await notion.getPageContent(pageId);
  const componentsContent = await notion.getComponentsContent(componentIds);

  // return props
  return { props: { componentsContent, pageContent }, revalidate: false };
};

export default AboutPage;
