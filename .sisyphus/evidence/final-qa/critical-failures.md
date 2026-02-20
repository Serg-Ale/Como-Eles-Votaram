# Critical Failures - Manual QA Task F3

**Execution Date**: 2026-02-20 14:51 UTC  
**Dev Server**: http://localhost:3000  
**Tester**: Sisyphus-Junior (Playwright browser automation)

---

## CRITICAL FAILURE #1: Empty Parlamentares Database

### Evidence
- **Homepage stats**: 0 Deputados, 0 Senadores (but 115 Votações, 0 Proposições)
- **Screenshot**: `.sisyphus/evidence/final-qa/screenshots/homepage-initial.png`

### Impact
- **BLOCKS**: All parlamentar profile pages
- **BLOCKS**: All search functionality
- **BLOCKS**: Integration testing for Tasks 12-15

### Root Cause
Database not seeded with parlamentares. Only votações data exists.

### Recommendation
Run data sync workflow or seed script to populate `parlamentares` table before production deployment.

---

## CRITICAL FAILURE #2: Parliamentar Search Broken

### Evidence
- **URL Tested**: http://localhost:3000/busca?q=Lula
- **Console Errors**: 
  ```
  TRPCClientError: Invalid `prisma.parlamentar.findMany()` invocation
  ```
- **Screenshot**: `.sisyphus/evidence/final-qa/screenshots/search-error-lula.png`

### Steps to Reproduce
1. Navigate to `/busca`
2. Type "Lula" in search input
3. Observe tRPC queries fail with Prisma errors

### Impact
- **BLOCKS**: Task 13 (Search page) functionality
- **BLOCKS**: User discovery of parlamentares
- **BLOCKS**: Core user journey (Homepage → Search → Profile)

### Root Cause Analysis Needed
- Prisma schema issue with search query
- Possible missing index or column
- Query structure incompatible with empty database

### Recommendation
1. Fix Prisma query in `parlamentar.search` tRPC procedure
2. Add error boundary to search page for graceful degradation
3. Test with seeded database to verify fix

---

## Severity Assessment

**Verdict**: **FAIL** ❌

These are **blocking failures** that prevent:
- Primary user journeys
- Core feature testing
- Production readiness

**Cannot proceed with comprehensive QA until these are resolved.**

---

## What Still Works

### ✅ Passing Elements
1. **Homepage loads**: Manifesto, statistics (though counts are 0/0)
2. **404 page**: Renders correctly with search widget
3. **Mobile responsive**: Layout adapts to 375px width without breaking
4. **Dark theme**: Consistent across all pages
5. **Navigation header**: Links present (though target pages 404 without slugs)
6. **Footer**: Links and attribution visible
7. **Dev server**: Starts successfully after cleaning `.next` cache
8. **tRPC connection**: Queries execute (though fail on empty data)

### ⚠️ Minor Issues (Non-Blocking)
- `/grid.svg` 404 error (visual asset missing, no functional impact)
- Routes require slugs (`/deputados/[slug]` not `/deputados`)

---

## Next Steps for Task F3 Completion

**Option A: Fix Critical Issues First**
1. Seed database with parlamentares
2. Fix Prisma search query
3. Re-run comprehensive QA

**Option B: Document As-Is**
1. Create final report with FAIL verdict
2. Document what was tested (limited scope)
3. List blockers for full QA execution

**Recommended**: Option A — Fix critical issues, then complete QA.

---

## Evidence Files Generated
- `.sisyphus/evidence/final-qa/screenshots/homepage-initial.png`
- `.sisyphus/evidence/final-qa/screenshots/search-page.png`
- `.sisyphus/evidence/final-qa/screenshots/search-error-lula.png`
- `.sisyphus/evidence/final-qa/screenshots/404-page.png`
- `.sisyphus/evidence/final-qa/screenshots/homepage-mobile.png`
- `.sisyphus/evidence/final-qa/critical-failures.md` (this file)
