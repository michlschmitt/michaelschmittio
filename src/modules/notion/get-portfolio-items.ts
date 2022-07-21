/* eslint-disable @typescript-eslint/no-explicit-any */

// import modules
import { getNotionBlocks, getNotionPage, getNestedNotionBlocks, getNotionDatabase } from './utils';

// import config
import { notionPortfolioDatabaseId } from '../../../config';

// define modules
export const getPortfolioItemContent = async (slug: string) => {
  // get database of pages
  const database = await getNotionDatabase(notionPortfolioDatabaseId as string);

  // get page id
  const page = database.find(
    (item) =>
      (item as any)?.properties?.slug?.rich_text?.[0]?.plain_text?.toLowerCase() ===
      slug.toLowerCase(),
  );

  // get page content
  const pageData = await getNotionPage(page?.id as string);

  // get seo meta data
  const metaData = {
    image: (pageData as any)?.properties?.image?.rich_text?.[0]?.text?.content,
    name: (pageData as any)?.properties?.name?.title?.[0]?.plain_text,
    seo: {
      description: (pageData as any)?.properties?.seoDescription?.rich_text?.[0]?.text?.content,
      image: (pageData as any)?.properties?.seoImage?.rich_text?.[0]?.text?.content,
      title: (pageData as any)?.properties?.seoTitle?.rich_text?.[0]?.text?.content,
    },
    title: (pageData as any)?.properties?.title?.rich_text?.[0]?.text?.content,
  };

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
  return { ...metaData, ...structuredPageContent, blocks: pageBlocks };
};

export const getPortfolioItems = async (params?: { exclude?: string; limit?: number }) => {
  // get database of pages
  const database = await getNotionDatabase(notionPortfolioDatabaseId as string);

  // filter items
  let portfolioItems = database
    .filter((item) => (item as any)?.properties?.status?.select?.name === 'PUBLISHED')
    .map((item) => (item as any)?.properties)
    .sort((a, b) => Date.parse(b.releaseDate.date.start) - Date.parse(a.releaseDate.date.start));

  // exclude items
  if (params?.exclude) {
    portfolioItems = portfolioItems.filter(
      (item) =>
        (item as any)?.slug?.rich_text?.[0]?.plain_text?.toLowerCase() !==
        params?.exclude?.toLowerCase(),
    );
  }

  // filter items
  if (params?.limit) {
    portfolioItems = portfolioItems.slice(0, params.limit);
  }

  return portfolioItems;
};
