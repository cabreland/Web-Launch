/**
 * Build-time Algolia indexer.
 *
 * Reads all content directly from /content (independent of the Next.js
 * runtime) and pushes search records to Algolia. Run this after `next build`
 * (or wire it in as a Vercel postbuild step) so the index stays in sync with
 * whatever content shipped in that deploy.
 *
 * Requires: ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY, ALGOLIA_INDEX_NAME
 * No-ops (with a warning) if those aren't set — safe to leave in CI before
 * Algolia is provisioned.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { algoliasearch } from "algoliasearch";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const res = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(res) : [res];
  });
}

function urlFor(type, fm) {
  switch (type) {
    case "learn":
      return `/learn/${fm.cluster}/${fm.slug}`;
    case "builds":
      return `/builds/${fm.slug}`;
    case "platforms":
      return fm.isOverview ? `/platforms/${fm.platform}` : `/platforms/${fm.platform}/${fm.slug}`;
    case "industries":
      return `/industries/${fm.industry}`;
    case "compare":
      return `/compare/${fm.slug}`;
    default:
      return "/";
  }
}

function buildRecords() {
  const types = ["learn", "builds", "platforms", "industries", "compare"];
  const records = [];

  for (const type of types) {
    const files = walk(path.join(CONTENT_ROOT, type)).filter((f) => f.endsWith(".mdx"));
    for (const filePath of files) {
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw);
      const url = urlFor(type, data);
      records.push({
        objectID: url,
        title: data.title,
        description: data.description,
        url,
        type,
        facet:
          data.cluster ?? data.platformName ?? data.industryName ?? data.compareA ?? undefined,
        content: content.replace(/[#*`>_-]/g, "").slice(0, 5000),
      });
    }
  }
  return records;
}

async function main() {
  const appId = process.env.ALGOLIA_APP_ID;
  const adminKey = process.env.ALGOLIA_ADMIN_KEY;
  const indexName = process.env.ALGOLIA_INDEX_NAME || "weblaunch_content";

  const records = buildRecords();
  console.log(`Built ${records.length} search records from /content.`);

  if (!appId || !adminKey) {
    console.warn(
      "ALGOLIA_APP_ID / ALGOLIA_ADMIN_KEY not set — skipping Algolia push. Records were built but not sent."
    );
    return;
  }

  const client = algoliasearch(appId, adminKey);
  await client.saveObjects({ indexName, objects: records });
  console.log(`Pushed ${records.length} records to Algolia index "${indexName}".`);
}

main().catch((err) => {
  console.error("Algolia index build failed:", err);
  process.exit(1);
});
