/* eslint-disable @typescript-eslint/no-var-requires */

// import node_modules
const fs = require('fs');

// define methods
const generateRobotsTxt = () => {
  // init vars
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  // staging robots.txt
  const staging = `# Disallow all pages
    User-Agent: *
    Disallow: /

    # Host
    Host: https://staging.michaelschmitt.io

    # Sitemaps
    Sitemap: https://staging.michaelschmitt.io/sitemap.xml
    `;

  // production robots.txt
  const production = `# Allow all pages
    User-Agent: *
    Allow: /

    # Host
    Host: https://www.michaelschmitt.io

    # Sitemaps
    Sitemap: https://www.michaelschmitt.io/sitemap.xml
    `;

  const content = domain?.includes('staging') ? staging : production;

  fs.writeFileSync('public/robots.txt', content);
};

module.exports = generateRobotsTxt;
