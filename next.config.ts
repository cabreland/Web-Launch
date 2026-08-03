import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every route reads MDX content off disk via fs.readFileSync at request
  // time (see src/lib/content.ts). Next's automatic file tracing can't see
  // those reads to know it should bundle them into each route's serverless
  // function - without this, pages render fine at build time (content is on
  // disk during the build) but 404 once Vercel invalidates the static cache
  // and re-invokes the function, because content/ isn't in that function's
  // bundle. This forces it into every route's trace.
  outputFileTracingIncludes: {
    "/**": ["./content/**/*"],
  },
  async redirects() {
    return [
      // Old Wix contractor-SEO pages — all collapse to homepage
      { source: "/plumbing-seo", destination: "/", permanent: true },
      { source: "/roofing-seo", destination: "/", permanent: true },
      { source: "/hvac-seo", destination: "/", permanent: true },
      { source: "/home-builders-seo", destination: "/", permanent: true },
      { source: "/general-contractors-seo", destination: "/", permanent: true },

      // Section renames
      { source: "/web-design", destination: "/builds", permanent: true },
      { source: "/pricing", destination: "/work-with-us", permanent: true },
      { source: "/blog", destination: "/learn", permanent: true },
      { source: "/blog/:path*", destination: "/learn/:path*", permanent: true },

      // /contact and /privacy-policy are preserved at the same paths in the
      // new site — no redirect needed, just confirmed live at launch.
    ];
  },
};

export default nextConfig;
