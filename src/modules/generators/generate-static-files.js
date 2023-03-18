/* eslint-disable @typescript-eslint/no-var-requires */

const generateSitemaps = require('./generate-sitemaps');
const generateRobotsTxt = require('./generate-robots.txt');
// const generateFeeds = require('./generate-feeds');

// generate static files
generateSitemaps();
generateRobotsTxt();
// generateFeeds(); // TODO: add when Blog, Snippets and Bookmarks are live
