/* eslint-disable @typescript-eslint/no-explicit-any */

// import modules
import { notionClient } from './notion-client';

// define helpers
export const getNotionPage = async (pageId: string) => {
  const response = await notionClient.pages.retrieve({ page_id: pageId });
  return response;
};

export const getNotionDatabase = async (databaseId: string) => {
  const response = await notionClient.databases.query({ database_id: databaseId });
  return response.results;
};

export const getNotionBlocks = async (blockId: string) => {
  // loop over blocks
  const blocks = [];

  // init cursor
  let cursor;

  // loop over blocks
  while (true) {
    // get blocks
    const { results, next_cursor }: { results: any; next_cursor: string | null } =
      await notionClient.blocks.children.list({
        start_cursor: cursor,
        block_id: blockId,
      });

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
  blocks: { id: string; children: any; has_children: any; type: string }[],
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

  // return nested blocks
  return blocksWithChildren;
};
