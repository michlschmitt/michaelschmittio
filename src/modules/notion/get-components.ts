/* eslint-disable @typescript-eslint/no-explicit-any */

// import modules
import { getNotionBlocks, getNotionDatabase } from './utils';

// define modules
export const getComponentContent = async (pageIdentifier: string) => {
  // get database of pages
  const database = await getNotionDatabase(process.env.NOTION_COMPONENTS_DATABASE_ID as string);

  // get page id
  const page = database.find(
    (item) =>
      (item as any)?.properties?.title?.title[0]?.plain_text?.toLowerCase() ===
      pageIdentifier.toLowerCase(),
  );

  // get blocks
  const blocks = await getNotionBlocks(page?.id as string);
  const rawJson = blocks.find((item) => item.type === 'code');
  const pageContent = JSON.parse(rawJson?.code?.rich_text[0].text?.content);

  return [pageIdentifier, pageContent];
};

export const getComponentsContent = async (componentIdentifiers: string[]) => {
  // loop over pageIdentifier and get component contents
  const components = await Promise.all(
    componentIdentifiers.map(async (componentIdentifier) =>
      getComponentContent(componentIdentifier),
    ),
  );

  const componentsContent = Object.fromEntries(components);

  return componentsContent;
};
