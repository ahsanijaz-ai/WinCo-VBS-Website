/**
 * The site's full address, used by the sitemap, robots file, structured data and `metadataBase`.
 *
 * 1. `NEXT_PUBLIC_SITE_URL` when set (the real domain, set in Vercel at go-live).
 * 2. On Vercel production, the project's production address.
 * 3. On a Vercel preview, that preview's address.
 * 4. Locally, `http://localhost:3000`.
 *
 * Always returned without a trailing slash.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (process.env.VERCEL_ENV === "production" && production) return `https://${production}`;

  const preview = process.env.VERCEL_URL;
  if (preview) return `https://${preview}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

/** Turns a path like `/about` into a full URL on this site. */
export function absoluteUrl(path = "/"): string {
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}

/**
 * True on Vercel preview and development deploys. Search engines are kept off those, so a
 * preview link never shows up in Google. Off Vercel (`VERCEL_ENV` unset) this is false.
 */
export const isNonProductionDeploy =
  process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== "production";
