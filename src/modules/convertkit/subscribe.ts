// import config
import { convertKitNewsletterFormId, convertKitApiKey } from './config';

export const subscribeToNewsletter = async (email: string) =>
  fetch(`https://api.convertkit.com/v3/forms/${convertKitNewsletterFormId}/subscribe`, {
    body: JSON.stringify({ api_key: convertKitApiKey, email }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });
