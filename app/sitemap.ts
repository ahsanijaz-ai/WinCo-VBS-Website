import type { MetadataRoute } from "next";
import { navItems } from "@/lib/nav-items";
import { absoluteUrl } from "@/lib/site-url";

/**
 * `/sitemap.xml`: the four public pages, taken from the nav so a new page is never missed.
 * No `lastModified`, because a made-up date is worse than none for search engines.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return navItems.map(({ href }) => ({
    url: absoluteUrl(href),
    changeFrequency: "monthly",
    priority: href === "/" ? 1 : 0.8,
  }));
}
