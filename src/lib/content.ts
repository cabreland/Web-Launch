import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { AuthorKey } from "./site";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface FaqItem {
  q: string;
  a: string;
}

export interface BaseFrontmatter {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: AuthorKey;
  ogImage?: string;
  faq?: FaqItem[];
}

export interface LearnFrontmatter extends BaseFrontmatter {
  cluster: "ai-automation" | "business-systems" | "exit-readiness" | "acquisition-finance";
}

export interface PlatformFrontmatter extends BaseFrontmatter {
  platform: string;
  platformName: string;
  isOverview?: boolean;
}

export interface IndustryFrontmatter extends BaseFrontmatter {
  industry: string;
  industryName: string;
}

export interface CompareFrontmatter extends BaseFrontmatter {
  compareA: string;
  compareB: string;
}

export interface SlideshowSlide {
  eyebrow?: string;
  title: string;
  body: string;
  stat?: string;
}

export interface BuildFrontmatter extends BaseFrontmatter {
  summary: string;
  stack?: string[];
  slideshow?: SlideshowSlide[];
}

export interface ContentEntry<T extends BaseFrontmatter = BaseFrontmatter> {
  frontmatter: T;
  content: string;
  readingTime: string;
}

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const res = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(res) : [res];
  });
}

function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function readAll<T extends BaseFrontmatter>(subdir: string): ContentEntry<T>[] {
  const dir = path.join(CONTENT_ROOT, subdir);
  const files = walk(dir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((filePath) => {
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw);
      return {
        frontmatter: data as T,
        content,
        readingTime: estimateReadingTime(content),
      };
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    );
}

// --- Learn ---
export function getLearnArticles(): ContentEntry<LearnFrontmatter>[] {
  return readAll<LearnFrontmatter>("learn");
}
export function getLearnArticle(cluster: string, slug: string) {
  return getLearnArticles().find(
    (e) => e.frontmatter.cluster === cluster && e.frontmatter.slug === slug
  );
}
export function getLearnArticlesByCluster(cluster: string) {
  return getLearnArticles().filter((e) => e.frontmatter.cluster === cluster);
}
export function getClusters(): string[] {
  return Array.from(new Set(getLearnArticles().map((e) => e.frontmatter.cluster)));
}

// --- Builds ---
export function getBuilds(): ContentEntry<BuildFrontmatter>[] {
  return readAll<BuildFrontmatter>("builds");
}
export function getBuild(slug: string) {
  return getBuilds().find((e) => e.frontmatter.slug === slug);
}

// --- Platforms ---
export function getPlatformEntries(): ContentEntry<PlatformFrontmatter>[] {
  return readAll<PlatformFrontmatter>("platforms");
}
export function getPlatforms(): string[] {
  return Array.from(new Set(getPlatformEntries().map((e) => e.frontmatter.platform)));
}
export function getPlatformOverview(platform: string) {
  return getPlatformEntries().find(
    (e) => e.frontmatter.platform === platform && e.frontmatter.isOverview
  );
}
export function getPlatformArticle(platform: string, slug: string) {
  return getPlatformEntries().find(
    (e) => e.frontmatter.platform === platform && e.frontmatter.slug === slug && !e.frontmatter.isOverview
  );
}
export function getPlatformArticles(platform: string) {
  return getPlatformEntries().filter(
    (e) => e.frontmatter.platform === platform && !e.frontmatter.isOverview
  );
}

// --- Industries ---
export function getIndustries(): ContentEntry<IndustryFrontmatter>[] {
  return readAll<IndustryFrontmatter>("industries");
}
export function getIndustry(slug: string) {
  return getIndustries().find((e) => e.frontmatter.industry === slug);
}

// --- Compare ---
export function getCompares(): ContentEntry<CompareFrontmatter>[] {
  return readAll<CompareFrontmatter>("compare");
}
export function getCompare(slug: string) {
  return getCompares().find((e) => e.frontmatter.slug === slug);
}

// --- Unified (sitemap + search index) ---
export interface SearchRecord {
  objectID: string;
  title: string;
  description: string;
  url: string;
  type: "learn" | "build" | "platform" | "industry" | "compare";
  facet?: string;
}

export function getAllUrls(): { url: string; lastModified?: string }[] {
  const urls: { url: string; lastModified?: string }[] = [];
  for (const e of getLearnArticles()) {
    urls.push({
      url: `/learn/${e.frontmatter.cluster}/${e.frontmatter.slug}`,
      lastModified: e.frontmatter.updatedAt ?? e.frontmatter.publishedAt,
    });
  }
  for (const e of getBuilds()) {
    urls.push({ url: `/builds/${e.frontmatter.slug}`, lastModified: e.frontmatter.updatedAt ?? e.frontmatter.publishedAt });
  }
  for (const e of getPlatformEntries()) {
    const url = e.frontmatter.isOverview
      ? `/platforms/${e.frontmatter.platform}`
      : `/platforms/${e.frontmatter.platform}/${e.frontmatter.slug}`;
    urls.push({ url, lastModified: e.frontmatter.updatedAt ?? e.frontmatter.publishedAt });
  }
  for (const e of getIndustries()) {
    urls.push({ url: `/industries/${e.frontmatter.industry}`, lastModified: e.frontmatter.updatedAt ?? e.frontmatter.publishedAt });
  }
  for (const e of getCompares()) {
    urls.push({ url: `/compare/${e.frontmatter.slug}`, lastModified: e.frontmatter.updatedAt ?? e.frontmatter.publishedAt });
  }
  return urls;
}
