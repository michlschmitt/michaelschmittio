/* eslint-disable @typescript-eslint/no-explicit-any */

import { getNotionBlocks, getNotionDatabase } from './utils';

import { notionComponentsDatabaseId } from './config';

export const getComponentContent = async (pageIdentifier: string) => {
  // get database of pages
  const database = await getNotionDatabase(notionComponentsDatabaseId as string);

  // get page id
  const page = database.find((item) =>
    (item as { url: string })?.url?.toLowerCase()?.includes(pageIdentifier.toLowerCase()),
  );

  // get blocks
  const blocks = await getNotionBlocks(page?.id as string);
  const rawJson = blocks.find((item) => item.type === 'code');
  const pageContent = JSON.parse(rawJson?.code?.rich_text?.[0].text?.content);

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
