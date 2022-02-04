# Michael Schmitt - Portfolio website

Next.js and Notion API based static portfolio website and blog

## Getting started

### Installation

```
yarn install
```

### Development

```
yarn dev
```

### Linting

```
yarn lint
```

### Deployment

Automatic deployments via [Vercel for Github](https://vercel.com/docs/git/vercel-for-github).

This repo uses [Release-it](https://github.com/release-it/release-it) for versioning. As a summary, release-it will do these tasks: Bumps the version in package.json; Updates CHANGELOG.md; Commits both files; Tags and creates a new release on GitHub. To trigger an version update run:

```
yarn release
```

## Content Management

Content is retrieved from the Notion API.

## Security

### CSRF protection

Forms are protected against CSRF attacks by using csurf

### Security headers

Security headers are set to prevent cross-site scripting (XSS) attacks, content sniffing, clickjacking, insecure connection and other security risks in next.config.js.

## Todos

- [ ] Add case studies to portfolio page
- [ ] Update cover image of Storyliner preview
- [ ] Add awards to portfolio page
- [ ] Add blog page and preview blog posts on home and about
- [ ] Add bookmarks directory

## Build with

- [Next.js](https://nextjs.org/)
- [Notion API](https://developers.notion.com/)

## License

Proprietary software of Michael Schmitt
