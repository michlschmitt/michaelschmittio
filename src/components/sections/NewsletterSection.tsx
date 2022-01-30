// import node_modules
import * as React from 'react';

// import types
import { NewsletterSectionType } from '../../types';

// import components
import Heading from '../atoms/Heading';
import RevueForm from '../vendors/RevueForm';
import Text from '../atoms/Text';

// import modules
import { newsletterSectionPropTypes } from '../../modules/prop-types';

// import styles
import Col from '../layouts/Col';
import Container from '../layouts/Container';
import Row from '../layouts/Row';
import Section from '../layouts/Section';
import Spacer from '../layouts/Spacer';

// define component
const NewsletterSection: React.FunctionComponent<{ content: NewsletterSectionType }> = ({
  content,
}) => (
  <Section color="gradient-horizontal">
    <Container md>
      <Row justify="center">
        <Col span={12}>
          <Heading alignment="center" tag="h1">
            {content.title}
          </Heading>
          <Text alignment="center">{content.teaser}</Text>
        </Col>
      </Row>
      <Spacer height="16px" />
      <Row justify="center">
        <Col span={10}>
          <RevueForm alignment="center" content={content.RevueForm} />
        </Col>
      </Row>
    </Container>
  </Section>
);

NewsletterSection.propTypes = {
  content: newsletterSectionPropTypes,
};

export default NewsletterSection;
