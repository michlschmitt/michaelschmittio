/* eslint-disable @typescript-eslint/no-explicit-any */

// import node_modules
import cookieParser from 'cookie-parser';
import csrf from 'csurf';

// impot types
import { NextApiResponse, NextApiRequest } from 'next';

// init csrf
const csrfProtection = csrf({ cookie: true });

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export const initMiddleware = (middleware: any) => {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
};

export const cookieParserMiddleware = initMiddleware(cookieParser());

export const csrfMiddleware = initMiddleware(csrfProtection);
