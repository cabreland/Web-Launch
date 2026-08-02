import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
