// import node_modules
import * as React from 'react';

// import types
import type { GetStaticProps } from 'next';
import { NextPageWithLayout } from '../types';

// import modules
import * as notion from '../modules/notion';

// import components
import CallToActionSection from '../components/sections/CallToActionSection';
import FeaturedInLogosSection from '../components/sections/FeaturedInLogosSection';
import GridSection from '../components/layouts/GridSection';
import Heading from '../components/atoms/Heading';
import HeroSection from '../components/sections/HeroSection';
import LinkButton from '../components/atoms/LinkButton';
import MainLayout from '../components/layouts/MainLayout';
import PortfolioPreviewSection from '../components/sections/PortfolioPreviewSection';
import SEO from '../components/meta/SEO';
import Text from '../components/atoms/Text';

// define page
const IndexPage: NextPageWithLayout = ({ componentsContent, pageContent }) => (
  <>
    {/* SEO */}
    <SEO
      description={pageContent.seo.description}
      image={pageContent.seo.image}
      title={pageContent.seo.title}
    />

    {/* Hero */}
    <HeroSection
      buttons={pageContent.hero.buttons}
      heroImage={pageContent.hero.image}
      introText={pageContent.hero.intro}
      title={pageContent.hero.title}
    />

    {/* About preview */}
    <GridSection
      firstColComponent={
        <Heading customClasses="!mt-[-6px]" tag="h2">
          {pageContent.about.title}
        </Heading>
      }
      secondColComponent={
        <div className="split-content-2">
          <Text customClasses="!mb-2">{pageContent.about.intro}</Text>
          <LinkButton
            color="link"
            customClasses="!justify-start"
            href={pageContent.about.cta.href}
            text={pageContent.about.cta.label}
          />
        </div>
      }
    />

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
    <FeaturedInLogosSection content={componentsContent.FeaturedInLogosSection} />

    {/* Call-to-action */}
    <CallToActionSection
      ctaHref={pageContent.cta.link.href}
      ctaLabel={pageContent.cta.link.label}
      teaser={pageContent.cta.teaser}
      title={pageContent.cta.title}
    />
  </>
);

IndexPage.getLayout = (page) => (
  <MainLayout content={page.props.componentsContent}>{page}</MainLayout>
);

export const getStaticProps: GetStaticProps = async () => {
  // get notion data
  const pageId = 'Home';
  const componentIds = ['MainNav', 'Footer', 'FeaturedInLogosSection'];

  // get pageContent
  const pageContent = await notion.getPageContent(pageId);
  const componentsContent = await notion.getComponentsContent(componentIds);

  // return props
  return { props: { componentsContent, pageContent }, revalidate: false };
};

export default IndexPage;
