// import node_modules
import * as PropTypes from 'prop-types';

// define component propTypes
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
  cookiePolicy: PropTypes.exact({
    label: PropTypes.string.isRequired,
  }).isRequired,
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

export const revueFormPropTypes = PropTypes.exact({
  action: PropTypes.string.isRequired,
  email: PropTypes.exact({ placeholder: PropTypes.string.isRequired }).isRequired,
  privacy: PropTypes.exact({ html: PropTypes.string.isRequired }).isRequired,
  submit: PropTypes.exact({ label: PropTypes.string.isRequired }).isRequired,
}).isRequired;

export const newsletterSectionPropTypes = PropTypes.exact({
  RevueForm: revueFormPropTypes,
  teaser: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}).isRequired;
