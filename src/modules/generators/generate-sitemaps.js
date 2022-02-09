/* eslint-disable @typescript-eslint/no-var-requires */

// import node_modules
// const fs = require('fs');
// const path = require('path');
const { SitemapStream } = require('sitemap');
const { createWriteStream } = require('fs');

// define methods
const generateSitemap = () => {
  // create pages sitemap
  const pages = [
    {
      changefreq: 'monthly',
      lastmod: '2022-02-01',
      priority: 1,
      url: 'https://www.michaelschmitt.io/',
    },
    {
      changefreq: 'monthly',
      lastmod: '2022-02-01',
      priority: 0.8,
      url: 'https://www.michaelschmitt.io/about/',
    },
    {
      changefreq: 'monthly',
      lastmod: '2022-02-01',
      priority: 0.8,
      url: 'https://www.michaelschmitt.io/portfolio/',
    },
    {
      changefreq: 'monthly',
      lastmod: '2022-02-01',
      priority: 0.8,
      url: 'https://www.michaelschmitt.io/newsletter/',
    },
    {
      changefreq: 'monthly',
      lastmod: '2022-02-01',
      priority: 0.8,
      url: 'https://www.michaelschmitt.io/contact/',
    },
    {
      changefreq: 'yearly',
      lastmod: '2022-02-01',
      priority: 0.5,
      url: 'https://www.michaelschmitt.io/privacy-policy/',
    },
    {
      changefreq: 'yearly',
      lastmod: '2022-02-01',
      priority: 0.5,
      url: 'https://www.michaelschmitt.io/legal-notice/',
    },
  ];

  // create portfolio items sitemap
  const portfolio = [];

  // get posts
  const portfolioItems = await notion.getPortfolioItems();
  portfolioItems.forEach((item) => {
    portfolio.push({
      url: `https://www.michaelschmitt.io/portfolio/${item.lastModifiedAt.rich_text[0].plain_text}/`,
      changefreq: 'yearly',
      priority: 0.7,
      lastmod: item.slug.rich_text[0].plain_text,
    });
  });

  // // create blog tags sitemap
  // const blogTags = [];

  // // get tags
  // const tagFiles = fs.readdirSync(path.join('src/content/tags/en'));
  // tagFiles.forEach((tagFile) => {
  //   // get post meta
  //   const tag = fs.readFileSync(path.join('src/content/tags/en', tagFile), 'utf-8');
  //   const { data } = matter(tag);

  //   blogTags.push({
  //     url: `https://storyliner.app/blog/tag/${data.slugEN}/`,
  //     changefreq: 'yearly',
  //     priority: 0.6,
  //     lastmod: '2021-06-16',
  //     links: [{ lang: 'de', url: `https://storyliner.app/de/blog/tag/${data.slugDE}/` }],
  //   });
  // });

  // combine entries
  // const entries = [...pages, ...blogPosts, ...blogTags];
  const entries = [...pages, ...portfolio];

  // create sitemap
  const sitemap = new SitemapStream({
    hostname: 'https://www.michaelschmitt.io',
    xslUrl: 'https://www.michaelschmitt.io/xml-sitemap.xsl',
  });

  sitemap.pipe(createWriteStream('./public/sitemap.xml'));
  entries.forEach((entry) => sitemap.write(entry));
  sitemap.end();
};

module.exports = generateSitemap;
