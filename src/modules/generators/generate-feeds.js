/* eslint-disable @typescript-eslint/no-var-requires */

// import node_modules
// const path = require('path');
const Feed = require('feed').Feed;
const fs = require('fs');

// init vars
const today = new Date();
const currentYear = today.getFullYear();

// define methods
const generateFeeds = () => {
  // init feed
  const feed = new Feed({
    title: 'Michael Schmitt - Blog - The Unkwown',
    description: 'TODO: add description',
    id: 'https://www.michaelschmitt.io/',
    link: 'https://www.michaelschmitt.io/',
    language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    image: 'TODO: add screensaver image',
    favicon: 'https://www.michaelschmitt.io/favicon.ico',
    copyright: `All rights reserved ${currentYear}, mii ventures GmbH`,
    updated: today, // optional, default = today
    generator: 'Michael Schmitt', // optional, default = 'Feed for Node.js'
    feedLinks: { rss2: 'https://www.michaelschmitt.io/rss_en.xml' },
  });

  // const authorFilesEN = fs.readdirSync(path.join('src/content/authors/en'));
  // const authorsEN = authorFilesEN.map((authorFile) => {
  //   const author = fs.readFileSync(path.join('src/content/authors/en', authorFile), 'utf-8');
  //   const { data } = matter(author);
  //   return { slug: authorFile?.replace(/\.[^/.]+$/, ''), name: data.name };
  // });

  // const postFilesEN = fs.readdirSync(path.join('src/content/posts/en'));
  // postFilesEN.forEach((postFile) => {
  //   // get meta data
  //   const post = fs.readFileSync(path.join('src/content/posts/en', postFile), 'utf-8');
  //   const { data } = matter(post);
  //   const author = authorsEN.find((item) => item.slug === data.author);

  //   // add item to feed
  //   feedEN.addItem({
  //     author: [{ name: author.name }],
  //     content: data.excerpt,
  //     date: post.pubDate,
  //     description: data.metaDescription,
  //     id: data.slugEN,
  //     image: post.image,
  //     link: `https//storyliner.app/blog/${data.slugEN}/`,
  //     title: data.title,
  //   });
  // });

  // // add tags
  // const tagFilesEN = fs.readdirSync(path.join('src/content/tags/en'));
  // const tagsEN = tagFilesEN.map((tagFile) => {
  //   const tag = fs.readFileSync(path.join('src/content/tags/en', tagFile), 'utf-8');
  //   const { data } = matter(tag);
  //   return data.title;
  // });
  // tagsEN.forEach((tag) => feedEN.addCategory(tag));

  // Write the RSS output to a public file, making it
  // accessible at storyliner.app/rss_en.xml
  fs.writeFileSync('public/rss.xml', feed.rss2());
};

module.exports = generateFeeds;
