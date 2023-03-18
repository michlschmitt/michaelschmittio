/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';

export type NextPageWithLayout = NextPage<any> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
