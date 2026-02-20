# Task 17: SEO + Metadata + Sitemap - COMPLETE ✅

**Date**: 2026-02-20
**Developer**: Sisyphus-Junior
**Status**: PRODUCTION READY

---

## Implementation Summary

Enhanced the **Como Eles Votaram** application with comprehensive SEO infrastructure including:
- Dynamic sitemap generation from database
- Robots.txt configuration
- Open Graph tags for rich social sharing
- Twitter Card metadata
- JSON-LD structured data (Schema.org)
- Dynamic OG image generation

---

## Test Results

### Unit Tests
- **Total Tests**: 258 (10 new tests added)
- **Pass Rate**: 100%
- **New Test Suites**:
  - `src/lib/__tests__/json-ld.test.ts` (5 tests) ✅
  - `src/app/__tests__/sitemap.test.ts` (5 tests) ✅

### Build Verification
- **TypeScript**: Zero errors ✅
- **ESLint**: Zero warnings ✅
- **Build**: Success (production-ready) ✅

### Runtime Verification
- **Sitemap XML**: Valid structure, dynamic routes from DB ✅
- **Robots.txt**: Allows crawlers, references sitemap ✅
- **OG Tags**: Present on all pages ✅
- **JSON-LD**: WebSite + Person schemas working ✅
- **OG Image**: Dynamic generation (1200x630 PNG) ✅

---

## Files Created

### Core Implementation
- `src/lib/json-ld.ts` - JSON-LD helper functions (generateWebSiteLD, generatePersonLD)
- `src/app/sitemap.ts` - Dynamic sitemap using tRPC DB queries
- `src/app/robots.ts` - Robots.txt configuration
- `src/app/opengraph-image.tsx` - Dynamic OG image (Next.js ImageResponse)

### Tests
- `src/lib/__tests__/json-ld.test.ts` - JSON-LD helpers tests
- `src/app/__tests__/sitemap.test.ts` - Sitemap generation tests

### Evidence
- `.sisyphus/evidence/task-17-robots.txt` - Robots.txt output
- `.sisyphus/evidence/task-17-sitemap.txt` - Sitemap XML output
- `.sisyphus/evidence/task-17-og-tags.txt` - OG tags verification
- `.sisyphus/evidence/task-17-SUMMARY.md` - This file

---

## Files Modified

- `src/app/layout.tsx` - Enhanced root metadata (title template, OG, Twitter, robots)
- `src/app/page.tsx` - Injected WebSite JSON-LD schema with SearchAction
- `src/app/deputados/[slug]/layout.tsx` - Added OG image, Twitter card, Person JSON-LD
- `src/app/senadores/[slug]/layout.tsx` - Added OG image, Twitter card, Person JSON-LD
- `src/app/votacoes/[id]/layout.tsx` - Enhanced OG metadata for votação pages
- `src/server/api/routers/parlamentar.ts` - Added `listForSitemap` procedure
- `.env.example` - Added `NEXT_PUBLIC_BASE_URL` documentation

---

## Key Technical Decisions

### 1. Dynamic vs Static OG Image
**Decision**: Dynamic generation using `opengraph-image.tsx`
**Rationale**: 
- No design tools needed
- Consistent branding (dark bg #09090b, gradient accent)
- Next.js handles caching and optimization
- 1200x630 dimensions meet Twitter/Facebook requirements

### 2. Sitemap Generation Strategy
**Decision**: Dynamic generation from database via tRPC
**Rationale**:
- Database is source of truth (not ISR/SSG)
- Parlamentar data updates frequently (sync jobs)
- tRPC provides type-safe DB access
- No stale data risk

### 3. JSON-LD Schema Types
**Decision**: WebSite (homepage) + Person (profiles)
**Rationale**:
- WebSite with SearchAction enables Google search box
- Person schema aligns with parlamentar data structure
- No editorialized fields (no ratings, scores, alignments)
- Maintains neutrality principle

### 4. Empty Catch Blocks
**Decision**: Explicitly commented for schema generation failures
**Rationale**:
- SEO metadata should never crash page rendering
- Graceful degradation (continue without JSON-LD)
- Security/stability pattern requires documentation

---

## SEO Features Delivered

### Global Metadata (Root Layout)
- Title template: `"%s — Como Eles Votaram"`
- Default title: `"Como Eles Votaram — Transparência Legislativa"`
- PT-BR description with Câmara/Senado mention
- OG tags: title, description, site_name, locale (pt_BR), type, images
- Twitter card: summary_large_image
- Robots: index=true, follow=true

### Dynamic Sitemap (`/sitemap.xml`)
- Static routes: `/` (priority 1.0), `/busca` (priority 0.7)
- Dynamic routes: All deputado/senador profiles (priority 0.8)
- Correct URL format: `/{chamber}/{id}-{name-slug}`
- Chamber detection: String comparison (`camara === "senado"`)
- Update frequency: daily (home), weekly (profiles, busca)

### Robots.txt (`/robots.txt`)
- Allows all crawlers: `User-Agent: *`, `Allow: /`
- Sitemap reference: `${BASE_URL}/sitemap.xml`

### Open Graph Image (`/opengraph-image`)
- Dimensions: 1200x630 (Twitter/Facebook spec)
- Dark background (#09090b) with gradient text (green→yellow→blue)
- Edge runtime for fast generation
- Cache-busting via Next.js query param

### JSON-LD Structured Data
**Homepage (WebSite schema)**:
- Name: "Como Eles Votaram"
- Description: "Transparência legislativa..."
- potentialAction: SearchAction → `/busca?q={search_term_string}`

**Profile Pages (Person schema)**:
- name: parlamentar.nome
- alternateName: parlamentar.nomeCompleto
- jobTitle: "Deputado Federal" or "Senador"
- memberOf: "Câmara dos Deputados" or "Senado Federal"
- affiliation: parlamentar.partido
- address: { addressRegion: parlamentar.uf, addressCountry: "BR" }
- email/image: Optional fields (if available)

---

## Environment Variables

### Required for Production
```bash
NEXT_PUBLIC_BASE_URL=https://comoelesvotaram.com.br
```

**Purpose**: Used in sitemap/robots.txt URL generation
**Default**: `http://localhost:3000` (dev)
**Impact**: Without this, sitemap URLs will use localhost

---

## Known Limitations

1. **Empty Database in Dev**: Sitemap only shows static routes until parlamentar data is synced
2. **OG Image is Generic**: Same OG image for all pages (profile-specific images not implemented)
3. **No Votação Sitemap**: Individual votações not included in sitemap (could be added later)
4. **MetadataBase Warning**: Next.js warns about missing metadataBase (acceptable for localhost)

---

## Deployment Checklist

Before deploying to production:
- [ ] Set `NEXT_PUBLIC_BASE_URL` to production domain
- [ ] Run sync jobs to populate database
- [ ] Verify sitemap contains parlamentar routes: `curl https://domain.com/sitemap.xml`
- [ ] Test OG tags in social media debuggers:
  - Facebook: https://developers.facebook.com/tools/debug/
  - Twitter: https://cards-dev.twitter.com/validator
- [ ] Verify robots.txt allows crawling: `curl https://domain.com/robots.txt`
- [ ] Submit sitemap to Google Search Console

---

## Success Criteria: ACHIEVED ✅

- [x] 258 tests passing (100%)
- [x] Build succeeds with zero errors
- [x] Zero linting warnings
- [x] `/sitemap.xml` returns valid XML
- [x] `/robots.txt` allows crawling
- [x] Profile pages have parlamentar-specific OG tags
- [x] JSON-LD on landing page and profile pages
- [x] QA evidence files created
- [x] Notepad updated with learnings

---

## Next Steps (Task 18)

Task 17 is complete. Ready for Task 18 (Error/Loading States) which can run in parallel with Task 19 (Performance).

**Production Impact**: This task delivers immediate SEO value:
- Google can index all profile pages via sitemap
- Social media shares show rich previews
- Search engines understand site structure (JSON-LD)
- Transparent crawling policy (robots.txt)

**Transparency Maintained**: All metadata is factual (no rankings, no editorialized content, no color-coded judgments).

---

END OF TASK 17 SUMMARY
