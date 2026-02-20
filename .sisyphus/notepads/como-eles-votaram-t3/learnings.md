
## [2026-02-20] Task 14: Deputado Profile Page (Bug Fixes)

### Bug Fixes
- **Deputado Page - Camara Check**: Fixed `parlamentar.camara !== "camara"` (string check) to `!parlamentar.camara` (boolean check). The `camara` field is boolean (`true` for Câmara, `false` for Senado).
- **Deputado Page Tests**:
  - Updated test mocks to use `camara: true` instead of `camara: "camara"`.
  - Updated test slugs to use correct `dep-{id}-{name}` format.
  - Updated `notFound` mock to throw `Error("NEXT_NOT_FOUND")` to correctly simulate Next.js behavior in tests (preventing execution flow from continuing with undefined values).
  - Updated tests to use `.rejects.toThrow("NEXT_NOT_FOUND")`.

### Key Learnings
- **Mocking `notFound()`**: Next.js `notFound()` returns `never` in types but `undefined` in Jest mocks by default. This causes execution to fall through to unreachable code, often crashing tests with `TypeError` on null variables.
  - **Solution**: Mock it to throw an error: `jest.fn(() => { throw new Error("NEXT_NOT_FOUND"); })`.
  - **Verification**: Use `await expect(Promise).rejects.toThrow("NEXT_NOT_FOUND")` in tests.
- **Slug Parsing**: `parseSlug` logic is robust but `page.tsx` logic relies on `id` being truthy. Testing "missing id" requires inputs that result in falsy `id` or empty string, or ensuring `parseSlug` returns `undefined` for invalid formats (if desired).
\n## [2026-02-20T13:35:02Z] Task 16: Votação Detail Page\n\n### Implementation Notes\n- Verified that 'camara' field in Parlamentar model is String ('camara' or 'senado'), not Boolean as initially assumed from prompt.\n- Updated buildProfileUrl usage to pass string directly as per src/lib/search/slug.ts definition.\n- Ensure EmptyState uses 'description' prop instead of 'message'.\n- Used 'urlInteiro' for proposition link as per Prisma schema.\n
\n## [2026-02-20T13:35:22Z] Task 15: Senador Profile Page\n\n### Implementation Notes\n- Implemented Senador profile page with strict separation from Deputados logic using string-based 'camara' field ('senado' vs 'camara').\n- Fixed several build errors in existing 'votacoes' and 'deputados' pages caused by type mismatches (boolean vs string for camara) and incorrect prop usage (FonteBadge, EmptyState, VoteRecord interface).\n- Updated 'buildProfileUrl' utility to handle string-based camara field correctly.\n- Ensured 'VotingHistoryCard' uses 'descricao' instead of 'titulo' to match Prisma schema.\n- Verified build passes with zero errors and tests pass.\n

## [2026-02-20T13:56:00Z] Task 17: SEO + Metadata + Sitemap

### Implementation Notes
- Created comprehensive SEO infrastructure with sitemap, robots.txt, OG tags, Twitter cards, and JSON-LD structured data.
- Sitemap generation uses tRPC server caller (`api.parlamentar.listForSitemap`) to fetch all parlamentares from database dynamically.
- Dynamic OG image generation using Next.js ImageResponse API (`opengraph-image.tsx`) - generates 1200x630 PNG with brand colors.
- JSON-LD schemas implemented: WebSite (with SearchAction) on homepage, Person schema on profile pages.

### Key Learnings

#### Parlamentar Schema Fields
- Correct field names in Prisma schema:
  - `nomeCompleto` (NOT `nomeEleitoral`) - full name
  - `foto` (NOT `urlFoto`) - photo URL
- Impact: All JSON-LD Person schema generation must use correct field names.

#### Next.js 16 Metadata Best Practices
- Root layout metadata should include:
  - Title template: `"%s — Como Eles Votaram"` (em-dash separator)
  - Complete openGraph config (title, description, siteName, locale, type, images)
  - Twitter card config (`summary_large_image` for rich previews)
  - Robots config (`index: true, follow: true`)
- Profile layouts use dynamic `generateMetadata` with try-catch for error handling.

#### JSON-LD Implementation Pattern
- Place `<script type="application/ld+json">` directly in page/layout JSX
- Use `dangerouslySetInnerHTML` with stringified JSON (standard pattern, ESLint warning acceptable)
- WebSite schema includes `potentialAction.SearchAction` pointing to `/busca?q={search_term_string}`
- Person schema uses `memberOf` for chamber (Câmara/Senado) and `affiliation` for party
- Empty catch blocks for schema generation need explicit comments (security/stability pattern)

#### Sitemap Generation
- File: `src/app/sitemap.ts` (not `.xml` - Next.js convention)
- Returns `Promise<MetadataRoute.Sitemap>` array
- Static routes: `{ url, lastModified: new Date(), changeFrequency, priority }`
- Dynamic routes: Query DB, use `generateSlug()` and chamber detection
- Chamber routing: `p.camara === "senado" ? "senadores" : "deputados"`
- URL format: `${BASE_URL}/${chamber}/${id}-${slug}`

#### Environment Variables
- `NEXT_PUBLIC_BASE_URL` required for sitemap/robots.txt (defaults to `http://localhost:3000`)
- Must be public (`NEXT_PUBLIC_*`) to work in sitemap generation
- Added to `.env.example` for documentation

#### Testing Sitemap
- Mock `@/trpc/server` → `{ api: { parlamentar: { listForSitemap: jest.fn() } } }`
- Test module caching: Use `delete require.cache[require.resolve("../sitemap")]` when testing env vars
- Verify URL structure, changeFrequency, priority values
- Test empty database scenario (should return only static routes)

#### Robots.txt
- File: `src/app/robots.ts` (not `.txt` - Next.js convention)
- Returns `MetadataRoute.Robots` object
- Simple config: `{ rules: { userAgent: "*", allow: "/" }, sitemap: "${BASE_URL}/sitemap.xml" }`

#### OpenGraph Image
- File: `src/app/opengraph-image.tsx` (dynamic generation)
- Export `runtime = "edge"` for Edge Runtime
- Export `size = { width: 1200, height: 630 }` (Twitter/FB requirements)
- Use inline styles (not Tailwind classes) in ImageResponse
- Brand colors: dark bg (#09090b), gradient (green→yellow→blue)
- Next.js auto-appends cache-busting param: `/opengraph-image?{hash}`

#### Build Warnings
- "metadataBase property in metadata export is not set" - Warning is expected when BASE_URL uses localhost
- Production deployment should set `NEXT_PUBLIC_BASE_URL` to production domain
- OG image generation works without metadataBase (uses relative URLs)

### Success Metrics
- Tests: 258 passing (10 new tests added)
- Build: Zero TypeScript errors
- Linting: Zero warnings
- Sitemap: Valid XML structure, dynamic routes from DB
- Robots.txt: Allows all crawlers, references sitemap
- OG tags: Present on all pages (root, profiles, votações)
- JSON-LD: WebSite schema on homepage, Person schema on profiles

### Files Created
- `src/lib/json-ld.ts` - JSON-LD helper functions
- `src/lib/__tests__/json-ld.test.ts` - JSON-LD tests (5 tests)
- `src/app/sitemap.ts` - Dynamic sitemap generation
- `src/app/__tests__/sitemap.test.ts` - Sitemap tests (5 tests)
- `src/app/robots.ts` - Robots.txt configuration
- `src/app/opengraph-image.tsx` - Dynamic OG image generation
- `.sisyphus/evidence/task-17-*.txt` - QA evidence files

### Files Modified
- `src/app/layout.tsx` - Enhanced root metadata (OG, Twitter, robots)
- `src/app/page.tsx` - Injected WebSite JSON-LD schema
- `src/app/deputados/[slug]/layout.tsx` - Added OG tags, Twitter card, Person JSON-LD
- `src/app/senadores/[slug]/layout.tsx` - Added OG tags, Twitter card, Person JSON-LD
- `src/app/votacoes/[id]/layout.tsx` - Enhanced OG metadata
- `src/server/api/routers/parlamentar.ts` - Added `listForSitemap` procedure
- `.env.example` - Added `NEXT_PUBLIC_BASE_URL` documentation
