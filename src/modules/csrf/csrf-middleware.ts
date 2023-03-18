/* eslint-disable @typescript-eslint/no-explicit-any */

import cookieParser from 'cookie-parser';
import csrf from 'csurf';

import { NextApiResponse, NextApiRequest } from 'next';
import { FixMeLater } from '../../types';

const csrfProtection = csrf({ cookie: true });

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export const initMiddleware = (middleware: FixMeLater) => {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: FixMeLater) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
};

export const cookieParserMiddleware = initMiddleware(cookieParser());

export const csrfMiddleware = initMiddleware(csrfProtection);
