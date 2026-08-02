# WebLaunch.io

Next.js 16 (App Router) + Tailwind v4 build for weblaunch.io. Content is
git-based MDX for launch; see "Sanity migration" below for the planned
upgrade path once content volume justifies a CMS.

## Stack

- **Framework:** Next.js 16, App Router, TypeScript, React 19
- **Styling:** Tailwind CSS v4 (CSS-first `@theme` config in `src/app/globals.css` — no `tailwind.config.js`)
- **Content:** MDX files in `/content`, parsed with `gray-matter`, rendered with `next-mdx-remote/rsc`
- **Search:** Algolia (`algoliasearch` + `react-instantsearch`), env-gated — degrades gracefully if unconfigured
- **Newsletter:** Beehiiv, proxied through `/api/subscribe` so the API key never reaches the client
- **Analytics:** GA4 via `@next/third-parties/google`, env-gated
- **Deploy target:** Vercel

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything degrades gracefully if empty
npm run dev
```

Open http://localhost:3000.

## Adding content

Every content type is a folder under `/content`. Drop in a new `.mdx` file
with the right frontmatter and it's live — no code changes, no CMS.

| Type | Path | Route |
|---|---|---|
| Learn article | `content/learn/<cluster>/<slug>.mdx` | `/learn/<cluster>/<slug>` |
| Build | `content/builds/<slug>.mdx` | `/builds/<slug>` |
| Platform overview | `content/platforms/<platform>/index.mdx` (`isOverview: true`) | `/platforms/<platform>` |
| Platform article | `content/platforms/<platform>/<slug>.mdx` | `/platforms/<platform>/<slug>` |
| Industry | `content/industries/<slug>.mdx` | `/industries/<industry>` |
| Compare | `content/compare/<slug>.mdx` | `/compare/<slug>` |

Frontmatter schema lives in `src/lib/content.ts` (`LearnFrontmatter`,
`BuildFrontmatter`, etc.) — every field required there is required in the
`.mdx` file's frontmatter or the page will render with gaps.

The `<OperatorNote>` component is available inside any MDX body — it's the
brand's signature callout block. Usage:

```mdx
<OperatorNote>
Your operator-voice note here.
</OperatorNote>
```

Add an `faq` array to frontmatter to get an FAQ accordion + `FAQPage`
JSON-LD automatically:

```yaml
faq:
  - q: "Question text"
    a: "Answer text"
```

## Content rules (per brand guidelines)

- No real company names in public content. EBB → "a national M&A advisory
  firm/brokerage." ACPM → "a commercial property management company."
- All `/builds` showcases are anonymized — no client names, ever.
- Community (Skool) is the conversion destination for implementation
  resources — don't gate real information behind a lead form on this site.

## Search (Algolia)

The build script at `scripts/build-algolia-index.mjs` reads `/content`
directly (independent of the Next runtime) and pushes records to Algolia.

```bash
npm run search:index
```

No-ops with a warning if `ALGOLIA_APP_ID` / `ALGOLIA_ADMIN_KEY` aren't set —
safe to leave wired into CI before Algolia is provisioned. Wire it as a
Vercel deploy step (or GitHub Action post-deploy) once the index exists.

The `SearchModal` component (`⌘K`) currently shows a "search isn't
configured" message until `NEXT_PUBLIC_ALGOLIA_APP_ID` and
`NEXT_PUBLIC_ALGOLIA_SEARCH_KEY` are set — swap in the `react-instantsearch`
`<InstantSearch>` / `<SearchBox>` / `<Hits>` components there once Algolia is
live. `react-instantsearch` is already installed.

## Newsletter (Beehiiv)

`/api/subscribe` proxies to Beehiiv's subscriptions API server-side, so the
admin API key never ships to the browser. Set `BEEHIIV_API_KEY` and
`BEEHIIV_PUBLICATION_ID` to activate it — without them, the form returns a
friendly "not configured yet" message instead of erroring.

## Analytics

GA4 only mounts if `NEXT_PUBLIC_GA_ID` is set. Search Console verification:
use a DNS TXT record once weblaunch.io's DNS is pointed at Vercel (survives
redeploys, cleaner than an HTML verification file).

## Redirects

Full Wix → new-site redirect map lives in `next.config.ts`
(`redirects()`) — contractor SEO pages collapse to `/`, `/web-design` →
`/builds`, `/pricing` → `/work-with-us`, `/blog` → `/learn`. `/contact` and
`/privacy-policy` are preserved at the same paths, no redirect needed.

## Known placeholders to close out before launch

- **Trevor's bio** — `src/lib/site.ts` `authors.trevor` is a visible
  placeholder (`bioPending: true`). The `/about` page renders a dashed-border
  "pending" box instead of publishing filler copy. Replace and flip
  `bioPending` to `false`/remove it.
- **Privacy Policy** (`src/app/privacy-policy/page.tsx`) — generic draft,
  flagged in-file for a legal review pass before launch. Not legal advice,
  just a placeholder so the preserved URL isn't a 404.
- **Community join link** (`/community`) — CTA points at `#`, needs the live
  Skool URL.
- **Contact page** — has an email mailto but no scheduling link yet.
- **Logo mark** — `src/components/ui/Logo.tsx` is a hand-built placeholder
  SVG matching the brand brief (angled rocket, two-tone wordmark,
  `currentColor`). Swap in the final production SVG file when ready; the
  component API (`<Logo variant="light" | "dark" />`) can stay the same.

## Sanity migration (later — not needed for launch)

MDX → Sanity is intentionally deferred until there's enough published
content to justify the CMS. When that time comes:

1. Stand up Sanity Studio as a separate deployable (e.g. `/studio` route or
   subdomain).
2. Mirror each `/content` subfolder as a Sanity document type — the
   frontmatter interfaces in `src/lib/content.ts` map close to 1:1.
3. Write a one-time script that reads existing `.mdx` files (frontmatter +
   body) and creates matching Sanity documents.
4. Swap the functions in `src/lib/content.ts` to fetch from Sanity's client
   (GROQ) instead of the filesystem — because every page component consumes
   these typed functions rather than touching the filesystem directly, this
   swap should not require touching page-level code.

## Deployment

Connect this repo to Vercel, set the environment variables above in the
Vercel project settings (Production + Preview), and deploy. DNS cutover
(weblaunch.io, registered at Enom) is handled outside this repo — point the
domain at Vercel once a production deploy passes QA.

Note: `npm run build` in a network-restricted sandbox will fail to fetch
Google Fonts (`next/font/google` needs to reach fonts.googleapis.com at
build time) — this is expected and resolves normally on Vercel, which has
open outbound access. Verified during this build by temporarily swapping to
system fonts: all 30 routes compiled and statically generated correctly.
