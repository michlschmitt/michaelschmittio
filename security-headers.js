// custom securityHeaders

// create csp policy
const cspPolicy = [];
cspPolicy.push("default-src 'self'");
cspPolicy.push("img-src 'self' data: https: http:");
cspPolicy.push("font-src 'self'");
cspPolicy.push("style-src 'self' 'unsafe-inline' *.cookiehub.net cookiehub.net");
cspPolicy.push(
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' www.youtube.com www.googletagmanager.com *.google-analytics.com *.cookiehub.net cookiehub.net",
);
cspPolicy.push("frame-src 'self' https://www.youtube-nocookie.com");
cspPolicy.push(
  "connect-src 'self' www.googletagmanager.com www.google-analytics.com *.cookiehub.net cookiehub.net",
);

// You can choose which headers to add to the list
// after learning more below.
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Content-Security-Policy',
    value: cspPolicy.join('; '),
  },
];

module.exports = { securityHeaders };
