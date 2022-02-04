// pages/api/contact.tsx

// import types
import type { NextApiRequest, NextApiResponse } from 'next';

// import modules
import * as notion from '../../modules/notion';
import * as plausible from '../../modules/plausible';
import * as csrf from '../../modules/csrf';

// handle contact from
const contactFormHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // secure route
  await csrf.cookieParserMiddleware(req, res);
  await csrf.csrfMiddleware(req, res);

  // track subscription
  try {
    await plausible.trackContactFormRequest();
  } catch (error) {
    // do nothing
  }

  try {
    // get form data
    const { name, email, message } = req.body;

    // add subscriber
    await notion.addSubscriber({ name, email, message });

    // send success response
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: (error as { message: string })?.message || error });
  }
};

export default contactFormHandler;
