import React from 'react';

import type { GetStaticProps } from 'next';
import { NextPageWithLayout } from '../types';

import * as notion from '../modules/notion';

import Col from '../components/layouts/Col';
import Container from '../components/layouts/Container';
import MainLayout from '../components/layouts/MainLayout';
import NotionRenderer from '../components/atoms/NotionRenderer';
import Row from '../components/layouts/Row';
import SEO from '../components/meta/SEO';
import Spacer from '../components/layouts/Spacer';

const PrivacyPolicyPage: NextPageWithLayout = ({ pageContent }) => (
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
      <Row>
        <Col span={12}>
          <NotionRenderer blocks={pageContent.blocks} />
        </Col>
      </Row>
    </Container>
    <Spacer height="100px" />
  </>
);

PrivacyPolicyPage.getLayout = (page) => (
  <MainLayout content={page.props.componentsContent}>{page}</MainLayout>
);

export const getStaticProps: GetStaticProps = async () => {
  const pageId = 'Privacy-policy';
  const componentIds = ['MainNav', 'Footer'];

  const pageContent = await notion.getPageContent(pageId);
  const componentsContent = await notion.getComponentsContent(componentIds);

  return { props: { componentsContent, pageContent }, revalidate: false };
};

export default PrivacyPolicyPage;
