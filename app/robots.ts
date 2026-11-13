import type { MetadataRoute } from "next";
import { absoluteUrl, isNonProductionDeploy, siteUrl } from "@/lib/site-url";

/**
 * `/robots.txt`: crawl everything except the developer pages, and point to the sitemap.
 * Vercel preview deploys block all crawling instead.
 */
export default function robots(): MetadataRoute.Robots {
  if (isNonProductionDeploy) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/dev/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
