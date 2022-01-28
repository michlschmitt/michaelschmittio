// content types

export interface MainNavType {
  callToAction: {
    href: string;
    label: string;
  };
  logo: {
    href: string;
    label: string;
  };
  navItems: {
    href: string;
    label: string;
  }[];
  socialLinks: {
    linkedIn: {
      href: string;
      label: string;
    };
    twitter: {
      href: string;
      label: string;
    };
  };
}

export interface FooterType {
  cookiePolicy: {
    label: string;
  };
  copyright: {
    href: string;
    label: string;
  };
  links: {
    href: string;
    label: string;
  }[];
  socialLinks: {
    linkedIn: {
      href: string;
      label: string;
    };
    twitter: {
      href: string;
      label: string;
    };
  };
}

export interface FeaturedInLogoSectionType {
  title: string;
  logos: { alt: string; src: string }[];
}

export interface RevueFormType {
  action: string;
  email: { placeholder: string };
  privacy: { html: string };
  submit: { label: string };
}

export interface NewsletterSectionType {
  title: string;
  teaser: string;
  RevueForm: RevueFormType;
}
