// import node_modules
import * as React from 'react';

// import types
import type { GetStaticProps } from 'next';
import { NextPageWithLayout } from '../../types';

// import modules
import * as notion from '../../modules/notion';

// import components
import CallToActionSection from '../../components/sections/CallToActionSection';
import Container from '../../components/layouts/Container';
import Heading from '../../components/atoms/Heading';
import MainLayout from '../../components/layouts/MainLayout';
import PortfolioPreviewSection from '../../components/sections/PortfolioPreviewSection';
import SEO from '../../components/meta/SEO';
import Section from '../../components/layouts/Section';
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
      <div className="flex w-full justify-center py-4 md:py-16">
        <div className="flex w-full max-w-screen-md">
          <div>
            <Heading alignment="center" tag="h1">
              {pageContent.hero.title}
            </Heading>
            <Text alignment="center">{pageContent.hero.intro}</Text>
          </div>
        </div>
      </div>

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
          />
        ),
      )}

      {/* Case studies */}
      {/* TODO: implement past projects and client case studies */}

      {/* Clients */}
      <Section>
        <TextWall title={pageContent.clients.title} text={pageContent.clients.names} />
      </Section>

      {/* Testimonials */}
      {/* TODO: implement testimonials */}

      <div className="w-full bg-primary py-16">
        <Container>
          <div className="flex w-full flex-col content-center items-center justify-center">
            <div className="mb-4">
              <div>What other's say about working with me</div>
            </div>

            <div className="flex w-full justify-between px-4">
              <div className="mr-4 flex flex-col content-center items-center justify-center rounded-xl bg-white p-4">
                <div className="mb-4 text-center text-xl">
                  „Michael and his team was our perfect partner, from the initial product idea,
                  through the development of the right business model, the technical implementation
                  to the conception of creative content. Competent, very committed and reliable,
                  thank you very much for everything.“
                </div>
                <div className="text-center">
                  <div>Martin Reich</div>
                  <div>Chief Executive Officer, Foconn GmbH</div>
                </div>
              </div>

              <div className="flex flex-col content-center items-center justify-center rounded-xl bg-white p-4">
                <div className="mb-4 text-center text-xl">
                  Michael and his team have successfully relaunched our website to an online portal
                  for customers, employees, and partners. The all-round support and know-how were
                  absolutely impressive - from data audit, workshops to the ideal information
                  architecture, a great design and the implementation of various tools. Even with
                  short-term projects, they always go the "extra mile" for us - they not only
                  deliver, but also get involved to develop the optimal solution for us in the
                  shortest possible time. A partner who stands for quality and with whom it is a
                  pleasure to work!“
                </div>
                <div className="text-center">
                  <div>Lilo Fee Koppe</div>
                  <div>Director Marketing & Communications, Felss Group GmbH</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Call-to-action */}
      <CallToActionSection
        ctaHref={pageContent.cta.link.href}
        ctaLabel={pageContent.cta.link.label}
        teaser={pageContent.cta.teaser}
        title={pageContent.cta.title}
      />
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
