/* eslint-disable @typescript-eslint/no-var-requires */

// import node_modules
// const fs = require('fs');
// const path = require('path');
const { Client } = require('@notionhq/client');
const { SitemapStream } = require('sitemap');
const { createWriteStream } = require('fs');

// define notion methods
const notionClient = new Client({ auth: process.env.NOTION_API_KEY });

const getNotionDatabase = async (databaseId) => {
  const response = await notionClient.databases.query({ database_id: databaseId });
  return response.results;
};

const getPortfolioItems = async () => {
  // get database of pages
  const database = await getNotionDatabase(process.env.NOTION_PORTFOLIO_DATABASE_ID);

  // filter items
  let portfolioItems = database
    .filter((item) => item?.properties?.status?.select?.name === 'PUBLISHED')
    .map((item) => item?.properties);

  return portfolioItems;
};

// define sitemap methods
const generateSitemap = async () => {
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
  const portfolioItems = await getPortfolioItems();
  portfolioItems.forEach((item) => {
    portfolio.push({
      url: `https://www.michaelschmitt.io/portfolio/${item.slug.rich_text[0].plain_text}/`,
      changefreq: 'yearly',
      priority: 0.7,
      lastmod: item.lastModifiedAt.last_edited_time,
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
