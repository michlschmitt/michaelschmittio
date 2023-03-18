import * as PropTypes from 'prop-types';
import React from 'react';

import { TestimonialType } from '../../types';

import Heading from '../atoms/Heading';
import TestimonialCard from '../elements/TestimonialCard';

import { testimonialsPropTypes } from '../../modules/prop-types';

import Col from '../layouts/Col';
import Container from '../layouts/Container';
import Row from '../layouts/Row';
import Section from '../layouts/Section';
import Spacer from '../layouts/Spacer';

const TestimonialsSection: React.FunctionComponent<{
  title: string;
  testimonials: TestimonialType[];
}> = ({ title, testimonials }) => (
  <Section color="gradient-horizontal" padding="small">
    <Container lg>
      <Row justify="center">
        <Col span={12}>
          <Heading alignment="center" tag="h2">
            {title}
          </Heading>
        </Col>
      </Row>
      <Spacer height="24px" />
      {testimonials.map((testimonial, index) => (
        <React.Fragment key={testimonial.id}>
          <Row justify="center" alignItems="stretch">
            <Col span={12}>
              <TestimonialCard
                designation={testimonial.designation}
                image={testimonial.image}
                name={testimonial.name}
                quote={testimonial.quote}
              />
            </Col>
          </Row>
          {index !== testimonials.length - 1 && <Spacer height="32px" />}
        </React.Fragment>
      ))}
    </Container>
  </Section>
);

TestimonialsSection.propTypes = {
  title: PropTypes.string.isRequired,
  testimonials: testimonialsPropTypes,
};

export default TestimonialsSection;
