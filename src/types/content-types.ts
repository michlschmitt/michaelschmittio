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
    github: {
      href: string;
      label: string;
    };
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
  copyright: {
    href: string;
    label: string;
  };
  links: {
    href: string;
    label: string;
  }[];
  socialLinks: {
    github: {
      href: string;
      label: string;
    };
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

export interface ContactFormType {
  name: {
    labelText: string;
    placeholderText: string;
  };
  email: {
    labelText: string;
    placeholderText: string;
  };
  message: {
    labelText: string;
    placeholderText: string;
  };
  submit: {
    labelText: string;
    success: string;
  };
  availability: {
    noteText: string;
  };
  error: {
    submit: string;
  };
  privacy: {
    text: string;
  };
}

export interface NewsletterSectionType {
  title: string;
  teaser: string;
  RevueForm: RevueFormType;
}

export interface TestimonialType {
  id: string;
  designation: string;
  image: string;
  name: string;
  quote: string;
}
