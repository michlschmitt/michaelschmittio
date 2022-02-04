// pages/api/newsletter.tsx

// import types
import type { NextApiRequest, NextApiResponse } from 'next';

// import modules
import * as plausible from '../../modules/plausible';

// track newsletter subscription
const newsletterSubscription = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // track event
    await plausible.trackNewsletterSubscription();

    // send success response
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: (error as { message: string })?.message || error });
  }
};

export default newsletterSubscription;
