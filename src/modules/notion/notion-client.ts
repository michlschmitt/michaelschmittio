// import node_modules
import { Client } from '@notionhq/client';

// init notion client
export const notionClient = new Client({ auth: process.env.NOTION_API_KEY });
