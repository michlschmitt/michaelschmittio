/* eslint-disable @typescript-eslint/no-explicit-any */

// import modules
import { getNestedNotionBlocks } from '.';
import { getNotionBlocks, getNotionDatabase, getNotionPage } from './utils';

// define modules
export const getPageContent = async (pageIdentifier: string) => {
  // get database of pages
  const database = await getNotionDatabase(process.env.NOTION_PAGES_DATABASE_ID as string);

  // get page id
  const page = database.find(
    (item) =>
      (item as any)?.properties?.title?.title[0]?.plain_text?.toLowerCase() ===
      pageIdentifier.toLowerCase(),
  );

  // get page content
  const pageData = await getNotionPage(page?.id as string);

  // get seo meta data
  const metaData = {
    seo: {
      description: (pageData as any)?.properties?.seoDescription?.rich_text[0]?.text?.content,
      image: (pageData as any)?.properties?.seoImage?.files[0]?.file?.url,
      title: (pageData as any)?.properties?.seoTitle?.rich_text[0]?.text?.content,
    },
  };

  // get blocks
  const blocks = await getNotionBlocks(page?.id as string);

  // filter structured page content
  const filterPageBlocks = blocks.filter(
    (item) =>
      !(
        item?.type === 'code' &&
        item?.code?.language === 'json' &&
        item?.code?.caption[0]?.text?.content?.toUpperCase() === 'PAGE-CONTENT'
      ),
  );

  // check if notion block contains structured content
  const pageJson = blocks.find(
    (item) =>
      item?.type === 'code' &&
      item?.code?.language === 'json' &&
      item?.code?.caption[0]?.text?.content?.toUpperCase() === 'PAGE-CONTENT',
  );
  const pageContent = pageJson && JSON.parse(pageJson?.code?.text[0].plain_text);

  // get nested blocks
  const pageBlocks = await getNestedNotionBlocks(filterPageBlocks);

  // return page content
  return { ...metaData, ...pageContent, blocks: pageBlocks };
};
