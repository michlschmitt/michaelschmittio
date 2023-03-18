/* eslint-disable @typescript-eslint/no-explicit-any */

import { FixMeLater } from '../../types';

import { notionClient } from './notion-client';

export const getPageProperty = async (pageId?: string, propertyId?: string) => {
  // check args
  if (!propertyId || !pageId) {
    return '';
  }

  const response = await notionClient.pages.properties.retrieve({
    page_id: pageId,
    property_id: propertyId,
  });

  // text property
  if (response.object === 'list') {
    return (response as FixMeLater)?.results?.[0]?.rich_text?.plain_text || '';
  }

  // select property
  if (response.object === 'property_item') {
    if (response.type === 'date') {
      return (response as FixMeLater)?.date?.start || '';
    }

    if (response.type === 'select') {
      return (response as FixMeLater)?.select?.name || '';
    }
  }

  return '';
};

export const getNotionPage = async (pageId: string) => {
  const response = await notionClient.pages.retrieve({ page_id: pageId });
  return response;
};

export const getNotionDatabase = async (databaseId: string) => {
  const response = await notionClient.databases.query({ database_id: databaseId });
  return response.results;
};

export const getNotionBlocks = async (blockId: string) => {
  // checks args
  if (!blockId) {
    return [];
  }

  // loop over blocks
  const blocks = [];

  // init cursor
  let cursor;

  // loop over blocks
  while (true) {
    // get blocks
    const { results, next_cursor }: { results: FixMeLater; next_cursor: string | null } =
      await notionClient.blocks.children.list({ start_cursor: cursor, block_id: blockId });

    // store results
    blocks.push(...results);

    // check if there are more blocks
    if (!next_cursor) {
      break;
    }

    // store cursor
    cursor = next_cursor;
  }

  // return blocks
  return blocks;
};

export const getNestedNotionBlocks = async (
  blocks: { id: string; children: FixMeLater; has_children: FixMeLater; type: string }[],
) => {
  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getNotionBlocks(block.id),
        };
      }),
  );

  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    // TODO: fix type issues
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (block.has_children && !block[block.type]?.children) {
      // TODO: fix type issues
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      block[block.type]['children'] = childBlocks.find((x) => x.id === block.id)?.children;
    }
    return block;
  });

  // wrap lists
  const serializedBlocks = [];

  // store list items
  let listItems = [];

  // loop over blocks
  for (let i = 0; i < blocksWithChildren.length; i += 1) {
    // get blocks
    const block = blocksWithChildren[i];
    const nextBlock = blocksWithChildren[i + 1];

    // check block
    if (block.type === 'bulleted_list_item') {
      // get all list items after
      listItems.push(block);

      // check next block and save wrapped list
      if (nextBlock.type !== 'bulleted_list_item') {
        // save wrapped list
        serializedBlocks.push({
          id: i,
          type: 'bulleted_list',
          bulleted_list: { items: listItems },
        });

        // reset store
        listItems = [];
      }

      // go to next item
      continue;
    }

    if (block.type === 'numbered_list_item') {
      // get all list items after
      serializedBlocks.push(block);

      // check next block and save wrapped list
      if (nextBlock.type !== 'numbered_list_item') {
        // save wrapped list
        serializedBlocks.push({
          id: i,
          type: 'numbered_list',
          numbered_list: { items: listItems },
        });

        // reset store
        listItems = [];
      }

      // go to next item
      continue;
    }

    serializedBlocks.push(block);
  }

  // return nested blocks
  return serializedBlocks;
};
