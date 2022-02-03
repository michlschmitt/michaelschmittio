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

This repo uses [Release-it](https://github.com/release-it/release-it) for versioning. Take into account that release-it will change the version number following these guides:

- git commit -m “fix: …” commit will trigger a patch update (1.0.0 → 1.0.1)
- git commit -m “feat: …” commit will trigger a minor update (1.0.0 → 1.1.0)
- BREAKING CHANGE: …in the commit body and with any type of commit will trigger a major update (1.0.0 → 2.0.0)

As a summary, release-it will do these tasks: Bumps the version in package.json; Updates CHANGELOG.md; Commits both files; Tags and creates a new release on GitHub. To trigger an version update run:

```
yarn release
```

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



