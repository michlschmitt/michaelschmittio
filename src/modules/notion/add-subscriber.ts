// import modules
import { notionClient } from './notion-client';

// add contact form subscriber to notion
export const addSubscriber = async ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => {
  try {
    // create new entry
    await notionClient.pages.create({
      parent: {
        database_id: process.env.NOTION_CONTACT_FORM_DATABASE_ID as string,
      },
      properties: {
        Name: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        Email: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          rich_text: [
            {
              text: {
                content: email,
              },
            },
          ],
        },
        Subject: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          rich_text: [
            {
              text: {
                content: message,
              },
            },
          ],
        },
      },
    });
  } catch (error) {
    throw new Error(error as string);
  }
};
