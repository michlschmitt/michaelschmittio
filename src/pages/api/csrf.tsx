// pages/api/contact.tsx

import type { NextApiRequest, NextApiResponse } from 'next';

import * as csrf from '../../modules/csrf';

// handle contact from
const csrfToken = async (req: NextApiRequest, res: NextApiResponse) => {
  // secure route
  await csrf.cookieParserMiddleware(req, res);
  await csrf.csrfMiddleware(req, res);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  res.json({ CSRFToken: req.csrfToken() });
};

export default csrfToken;
