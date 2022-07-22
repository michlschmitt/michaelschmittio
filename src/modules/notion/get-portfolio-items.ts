/* eslint-disable @typescript-eslint/no-explicit-any */

// import types
import { FixMeLater } from '../../types';

// import modules
import {
  getNestedNotionBlocks,
  getNotionBlocks,
  getNotionDatabase,
  getPageProperty,
} from './utils';

// import config
import { notionPortfolioDatabaseId } from '../../../config';

// define modules
export const getPortfolioItemWithProperties = async (item: FixMeLater) => {
  const { properties: raw, id: portfolioId } = (item || {}) as {
    properties: FixMeLater;
    id: string;
  };

  // get portfolio item properties
  const excerpt = await getPageProperty(portfolioId as string, raw?.excerpt?.id);
  const image = await getPageProperty(portfolioId as string, raw?.image?.id);
  const lastModifiedAt = await getPageProperty(portfolioId as string, raw?.lastModifiedAt?.id);
  const name = await getPageProperty(portfolioId as string, raw?.name?.id);
  const releaseDate = await getPageProperty(portfolioId as string, raw?.releaseDate?.id);
  const seoDescription = await getPageProperty(portfolioId as string, raw?.seoDescription?.id);
  const seoImage = await getPageProperty(portfolioId as string, raw?.seoImage?.id);
  const seoTitle = await getPageProperty(portfolioId as string, raw?.seoTitle?.id);
  const slug = await getPageProperty(portfolioId as string, raw?.slug?.id);
  const status = await getPageProperty(portfolioId as string, raw?.status?.id);
  const title = await getPageProperty(portfolioId as string, raw?.title?.id);

  // construct properties obj
  const properties = {
    excerpt: excerpt || seoDescription,
    image: image || seoImage,
    lastModifiedAt,
    name: name || title,
    releaseDate,
    slug,
    status,
    title,
  };
  const seo = { description: seoDescription, image: seoImage, title: seoTitle };

  return { ...item, ...properties, seo };
};

export const getPortfolioItemContent = async (slug: string) => {
  // get database of pages
  const database = await getNotionDatabase(notionPortfolioDatabaseId as string);

  // get page id
  const page = database.find((item) =>
    (item as { url: string })?.url
      ?.toLowerCase()
      ?.replace('-', '')
      ?.includes(slug?.toLowerCase()?.replace('-', '')),
  );
  const portfolioItem = await getPortfolioItemWithProperties(page);

  // get blocks
  const blocks = await getNotionBlocks(page?.id as string);

  // filter structured page content
  const filterPageBlocks = blocks.filter(
    (item) =>
      !(
        item?.type === 'code' &&
        item?.code?.language === 'json' &&
        item?.code?.caption?.[0]?.text?.content?.toUpperCase() === 'PAGE-CONTENT'
      ),
  );

  // check if notion block contains structured content
  const pageJson = blocks.find(
    (item) =>
      item?.type === 'code' &&
      item?.code?.language === 'json' &&
      item?.code?.caption?.[0]?.text?.content?.toUpperCase() === 'PAGE-CONTENT',
  );
  const structuredPageContent = pageJson && JSON.parse(pageJson?.code?.text[0].plain_text);

  // get nested blocks
  const pageBlocks = await getNestedNotionBlocks(filterPageBlocks);

  // return page content
  return { ...portfolioItem, ...structuredPageContent, blocks: pageBlocks };
};

export const getPortfolioItems = async (params?: { exclude?: string; limit?: number }) => {
  // get database of pages
  const database = await getNotionDatabase(notionPortfolioDatabaseId as string);

  // get page id
  const portfolioItemsPromise = await database.map(async (item) =>
    getPortfolioItemWithProperties(item),
  );
  let portfolioItems = await Promise.all(portfolioItemsPromise);

  // filter items
  portfolioItems = portfolioItems
    .filter((item) => item?.status === 'PUBLISHED')
    .sort((a, b) => Date.parse(b?.releaseDate) - Date.parse(a?.releaseDate));

  // exclude items
  if (params?.exclude) {
    portfolioItems = portfolioItems.filter(
      (item) => item?.slug?.toLowerCase() !== params?.exclude?.toLowerCase(),
    );
  }

  // filter items
  if (params?.limit) {
    portfolioItems = portfolioItems.slice(0, params.limit);
  }

  return portfolioItems;
};
