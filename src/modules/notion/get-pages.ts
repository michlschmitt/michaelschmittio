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
import { notionPagesDatabaseId } from '../../../config';

// define modules
export const getPageWithProperties = async (page: FixMeLater) => {
  const { properties: raw, id: pageId } = (page || {}) as {
    properties: FixMeLater;
    id: string;
  };

  // get portfolio item properties
  const excerpt = await getPageProperty(pageId as string, raw?.excerpt?.id);
  const image = await getPageProperty(pageId as string, raw?.image?.id);
  const lastModifiedAt = await getPageProperty(pageId as string, raw?.lastModifiedAt?.id);
  const name = await getPageProperty(pageId as string, raw?.name?.id);
  const releaseDate = await getPageProperty(pageId as string, raw?.releaseDate?.id);
  const seoDescription = await getPageProperty(pageId as string, raw?.seoDescription?.id);
  const seoImage = await getPageProperty(pageId as string, raw?.seoImage?.id);
  const seoTitle = await getPageProperty(pageId as string, raw?.seoTitle?.id);
  const slug = await getPageProperty(pageId as string, raw?.slug?.id);
  const status = await getPageProperty(pageId as string, raw?.status?.id);
  const title = await getPageProperty(pageId as string, raw?.title?.id);

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

  return { ...page, ...properties, seo };
};

export const getPageContent = async (pageIdentifier: string) => {
  // get database of pages
  const database = await getNotionDatabase(notionPagesDatabaseId as string);

  // get page id
  const page = database.find((item) =>
    (item as { url: string })?.url
      ?.toLowerCase()
      ?.replace('-', '')
      ?.includes(pageIdentifier?.toLowerCase()?.replace('-', '')),
  );
  const pageWithProperties = await getPageWithProperties(page);

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

  const pageContent = pageJson && JSON.parse(pageJson?.code?.rich_text?.[0].text?.content);

  // get nested blocks
  const pageBlocks = await getNestedNotionBlocks(filterPageBlocks);

  // return page content
  return { ...pageWithProperties, ...pageContent, blocks: pageBlocks };
};
