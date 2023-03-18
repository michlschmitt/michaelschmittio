import { Client } from '@notionhq/client';

import { notionApiKey } from './config';

export const notionClient = new Client({ auth: notionApiKey });
