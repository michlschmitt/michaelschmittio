// pages/api/newsletter.tsx

import type { NextApiRequest, NextApiResponse } from 'next';

import * as plausible from '../../modules/plausible';
import * as convertKit from '../../modules/convertkit';

// track newsletter subscription
const newsletterSubscription = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // get email
    const { email } = req.body;

    // validate email
    if (!email) {
      res.status(400).json({ error: 'Email is required!' });
      return;
    }

    // subscribe to convertkit
    await convertKit.subscribeToNewsletter(email);

    // track event
    await plausible.trackNewsletterSubscription();

    // send success response
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: (error as { message: string })?.message || error });
  }
};

export default newsletterSubscription;
