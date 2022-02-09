/* eslint-disable @typescript-eslint/no-explicit-any */

// import types
import { FixMeLater } from './universal';

// Notion API related types

export type NotionBlockTextType = {
  type: string;
  text: {
    content: string | null;
    link: { url: string | null } | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string | null;
  };
  plain_text: string;
  href: string | null;
};

export type NotionBlockType = {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  type: string;
  archived: false;
  [type: string]: FixMeLater; // TODO: implement
};
