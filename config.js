// config

// security
export const csrfSecret = process.env.CSRF_SECRET;

// General
export const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
export const passwordProtection = process.env.NEXT_PUBLIC_PASSWORD_PROTECTION;
export const cookieBaseDomain = process.env.NEXT_PUBLIC_COOKIES_BASE_DOMAIN;

// Notion
export const notionApiKey = process.env.NOTION_API_KEY;
export const notionBookmarksDatabaseId = process.env.NOTION_BOOKMARKS_DATABASE_ID;
export const notionComponentsDatabaseId = process.env.NOTION_COMPONENTS_DATABASE_ID;
export const notionPagesDatabaseId = process.env.NOTION_PAGES_DATABASE_ID;
export const notionFormDatabaseId = process.env.NOTION_CONTACT_FORM_DATABASE_ID;
export const notionPortfolioDatabaseId = process.env.NOTION_PORTFOLIO_DATABASE_ID;

// Plausible Analytics
export const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
