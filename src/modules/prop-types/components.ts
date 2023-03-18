import * as PropTypes from 'prop-types';

export const mainNavPropTypes = PropTypes.exact({
  callToAction: PropTypes.exact({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  logo: PropTypes.exact({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.exact({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  socialLinks: PropTypes.exact({
    github: PropTypes.exact({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
    linkedIn: PropTypes.exact({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
    twitter: PropTypes.exact({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}).isRequired;

export const footerPropTypes = PropTypes.exact({
  copyright: PropTypes.exact({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  links: PropTypes.arrayOf(
    PropTypes.exact({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  socialLinks: PropTypes.exact({
    github: PropTypes.exact({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
    linkedIn: PropTypes.exact({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
    twitter: PropTypes.exact({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}).isRequired;

export const featuredInLogoSectionPropTypes = PropTypes.exact({
  title: PropTypes.string.isRequired,
  logos: PropTypes.arrayOf(
    PropTypes.exact({ alt: PropTypes.string.isRequired, src: PropTypes.string.isRequired })
      .isRequired,
  ).isRequired,
}).isRequired;

export const convertKitPropTypes = PropTypes.exact({
  email: PropTypes.exact({ placeholder: PropTypes.string.isRequired }).isRequired,
  privacy: PropTypes.exact({ html: PropTypes.string.isRequired }).isRequired,
  submit: PropTypes.exact({
    error: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired,
  }).isRequired,
}).isRequired;

export const contactFormPropTypes = PropTypes.exact({
  name: PropTypes.exact({
    labelText: PropTypes.string.isRequired,
    placeholderText: PropTypes.string.isRequired,
  }).isRequired,
  email: PropTypes.exact({
    labelText: PropTypes.string.isRequired,
    placeholderText: PropTypes.string.isRequired,
  }).isRequired,
  message: PropTypes.exact({
    labelText: PropTypes.string.isRequired,
    placeholderText: PropTypes.string.isRequired,
  }).isRequired,
  submit: PropTypes.exact({
    labelText: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired,
  }).isRequired,
  availability: PropTypes.exact({
    noteText: PropTypes.string.isRequired,
  }).isRequired,
  error: PropTypes.exact({
    submit: PropTypes.string.isRequired,
  }).isRequired,
  privacy: PropTypes.exact({
    text: PropTypes.string.isRequired,
  }).isRequired,
}).isRequired;

export const testimonialsPropTypes = PropTypes.arrayOf(
  PropTypes.exact({
    designation: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    quote: PropTypes.string.isRequired,
  }).isRequired,
).isRequired;
