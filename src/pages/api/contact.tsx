// pages/api/contact.tsx

// import types
import type { NextApiRequest, NextApiResponse } from 'next';

// handle contact from
const contactFormHandler = (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  res.status(200).json({ success: true });
};

export default contactFormHandler;
