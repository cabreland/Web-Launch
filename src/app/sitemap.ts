import type { MetadataRoute } from "next";
import { getAllUrls } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  "",
  "/learn",
  "/builds",
  "/platforms",
  "/industries",
  "/community",
  "/about",
  "/work-with-us",
  "/contact",
  "/resources",
  "/privacy-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const contentEntries: MetadataRoute.Sitemap = getAllUrls().map((entry) => ({
    url: `${siteConfig.url}${entry.url}`,
    lastModified: entry.lastModified ? new Date(entry.lastModified) : new Date(),
  }));

  return [...staticEntries, ...contentEntries];
}
