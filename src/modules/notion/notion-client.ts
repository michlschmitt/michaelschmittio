// import node_modules
import { Client } from '@notionhq/client';

// import config
import { notionApiKey } from './config';

// init notion client
export const notionClient = new Client({ auth: notionApiKey });
