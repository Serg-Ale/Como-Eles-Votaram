# Spark Platform Visual Migration — Navy Civic Dark Redesign

## TL;DR

> **Quick Summary**: Full visual redesign of Como Eles Votaram from zinc-dark theme to Navy Civic Dark design language inspired by Spark Platform. All pages, components, and layouts get new colors, typography, and visual patterns while preserving the existing Next.js/tRPC/Prisma architecture completely untouched.
> 
> **Deliverables**:
> - New design tokens (Navy Civic Dark color scheme in globals.css)
> - Space Grotesk + Space Mono typography (replacing Inter)
> - Redesigned landing page with hero-bg.jpg, grid overlay, green glow orbs
> - Updated Navbar with CEV logo box, CTA button, mobile menu
> - Updated Footer with CEV logo, monospace section headers
> - `// LABEL` monospace section header pattern
> - New vote badge colors (green/red/amber/slate)
> - Updated opengraph-image with new brand colors
> - Grid-bg CSS utility, tag-pill, stat-number classes
> - All 38 tests passing after changes
> 
> **Estimated Effort**: Medium
> **Parallel Execution**: YES — 5 waves
> **Critical Path**: Task 1 → Task 2 → Task 3 → Task 4 → Task 5 → Tasks 6-10 → Tasks 11-14 → Task 15 → F1-F4

---

## Context

### Original Request
Migrate the visual design language from the Spark Platform (a Lovable-generated Vite SPA prototype) to the Como Eles Votaram production Next.js app. Full app redesign — every page, component, and layout gets the new "Navy Civic Dark" aesthetic.

### Interview Summary
**Key Discussions**:
- **Scope**: Full app redesign — ALL pages, components, layouts
- **Color strategy**: Full acid green — drop verde/amarelo/azul brand tokens, single acid green as primary AND accent
- **Vote badges**: Spark colors — Sim=green, Não=red, Abstenção=amber, Absent=slate
- **Hero background**: Background image + overlay using user-provided hero-bg.jpg
- **Tests**: Yes, update affected Jest tests atomically with each component change
- **OpenGraph**: Yes, update to new brand colors
- **Section headers**: Replace with `// LABEL` monospace pattern from Spark
- **Legacy tokens**: Remove --verde, --amarelo, --azul completely
- **shadcn baseColor**: Change from "zinc" to "slate" in components.json

**Research Findings**:
- Spark is Tailwind v3 (CEV is v4) — only VALUES are ported, no syntax translation needed
- CEV already uses v4 correctly (`@import "tailwindcss"`, `@theme`, `@layer base`)
- Both use shadcn/ui + Lucide icons — component structure is compatible
- `public/grid.svg` is referenced in page.tsx but doesn't exist (broken reference, will be replaced by CSS grid-bg)
- `--font-geist-sans` in @theme block is dead reference from T3 scaffold (will be replaced)

### Metis Review
**Identified Gaps** (addressed):
- hero-bg.jpg source: User provided the image directly
- opengraph-image update: User confirmed YES
- `// LABEL` pattern: User confirmed replace SectionHeader style
- Legacy brand tokens: User confirmed remove completely
- shadcn baseColor: User confirmed change to "slate"

---

## Work Objectives

### Core Objective
Transform every visual surface of Como Eles Votaram from the current zinc-dark/blue-primary theme to the Navy Civic Dark design language with acid green accent, Space Grotesk/Mono typography, grid overlays, and green glow effects — without touching any backend, API, or data logic.

### Concrete Deliverables
- `src/styles/globals.css` — New Navy Civic Dark tokens + utility classes (grid-bg, tag-pill, stat-number, vote-*)
- `src/app/layout.tsx` — Space Grotesk + Space Mono fonts via next/font/google
- `src/lib/theme/colors.ts` — Updated brand color constants (no more verde/amarelo/azul)
- `src/__tests__/design-tokens.test.tsx` — Updated to assert new brand colors
- `src/components/votacao/voto-badge.tsx` + test — New vote colors
- `src/app/page.tsx` + test — Full hero redesign with hero-bg.jpg
- `src/components/layout/header.tsx` — CEV logo box, CTA, mobile menu
- `src/components/layout/footer.tsx` — CEV logo, monospace headers
- `src/components/layout/section-header.tsx` — `// LABEL` pattern
- `src/app/opengraph-image.tsx` — New brand hex colors
- `src/components/parlamentar/parlamentar-card.tsx` — Navy card + hover styles
- `src/components/parlamentar/parlamentar-header.tsx` — Navy profile card
- `src/components/votacao/votacao-card.tsx` — Navy card styling
- `src/components/data/stat-card.tsx` — Font-mono stats, green primary
- `src/components/data/empty-state.tsx` — Navy styling
- `src/components/search/hero-search-bar.tsx` — Navy/green input styling
- `src/app/busca/page.tsx` — Navy page styling
- `src/app/deputados/[slug]/page.tsx` — Navy page styling
- `src/app/senadores/[slug]/page.tsx` — Navy page styling
- `src/app/votacoes/[id]/page.tsx` — Navy page styling
- `public/hero-bg.jpg` — Hero background image (user-provided)
- `components.json` — baseColor: "slate"

### Definition of Done
- [ ] `npx jest --passWithNoTests` — ALL 38 tests pass
- [ ] `npx tsc --noEmit` — Zero type errors
- [ ] `npm run build` — Successful production build
- [ ] Zero hardcoded `#09090b`, `#22c55e`, `#facc15`, `#3b82f6` hex values in any component file
- [ ] Zero references to `--verde`, `--amarelo`, `--azul` CSS variables
- [ ] All pages render with navy background (not zinc-950)
- [ ] All stat numbers use font-mono
- [ ] Vote badges use green/red/amber/slate (not blue/amber/gray/purple)

### Must Have
- Navy Civic Dark color tokens (`220 50% 4%` background)
- Acid green primary/accent (`142 76% 52%`)
- Space Grotesk + Space Mono typography
- Grid-bg CSS pattern overlay
- CEV logo box in navbar and footer
- `// LABEL` section header pattern
- hero-bg.jpg with dark overlay in hero section
- Green glow orb effects in hero
- Font-mono treatment for all stats/numbers
- Updated vote badge colors matching Spark

### Must NOT Have (Guardrails)
- NO theme toggle, ThemeProvider, useTheme hook, or light mode support
- NO new abstractions: no useVoteColor hook, VoteColorMap constant, theme.config.ts
- NO new wrapper components: no ThemeCard, GlowEffect, AnimatedGradient
- NO new npm packages — fonts via next/font/google only
- NO tailwind.config.ts — keep CSS-first Tailwind v4 config
- NO modifications to tRPC routers, Prisma schema, API routes, or backend code
- NO changes to component Props interfaces or exported function signatures
- NO "magic number" hex colors in JSX class strings — use Tailwind tokens or CSS variables
- NO over-commenting — don't add JSDoc blocks to existing uncommented functions
- NO unnecessary file renames or directory restructuring

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: YES (Jest + React Testing Library)
- **Automated tests**: Tests-after (update tests atomically with each component in the same task)
- **Framework**: Jest (`npx jest`)
- **TDD**: No — this is a visual migration, not behavior change. Tests verify markup classes, not logic.

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright (playwright skill) — Navigate, interact, assert DOM, screenshot
- **Build verification**: Use Bash — `npx tsc --noEmit`, `npm run build`, `npx jest`
- **File content**: Use Bash (grep) — Verify no old hex values remain

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — tokens, fonts, constants):
├── Task 1: Save hero-bg.jpg to public/ [quick]
├── Task 2: globals.css design tokens + utility classes [quick]
├── Task 3: layout.tsx font swap (Inter → Space Grotesk/Mono) [quick]
├── Task 4: colors.ts brand constants + design-tokens test [quick]
├── Task 5: components.json baseColor update [quick]

Wave 2 (Core components — depend on Wave 1 tokens):
├── Task 6: voto-badge.tsx + voto-badge.test.tsx [quick]
├── Task 7: section-header.tsx (// LABEL pattern) [quick]
├── Task 8: header.tsx (CEV logo, CTA, mobile menu) [quick]
├── Task 9: footer.tsx (CEV logo, monospace headers) [quick]
├── Task 10: hero-search-bar.tsx (navy/green styling) [quick]

Wave 3 (Pages + remaining components — depend on Wave 2):
├── Task 11: page.tsx home + page.test.tsx (full hero redesign) [unspecified-high]
├── Task 12: stat-card.tsx + empty-state.tsx (navy + font-mono) [quick]
├── Task 13: parlamentar-card.tsx + parlamentar-header.tsx + test [quick]
├── Task 14: votacao-card.tsx + voting-history-card.tsx [quick]

Wave 4 (Remaining pages + OG image):
├── Task 15: opengraph-image.tsx (new brand hex) [quick]
├── Task 16: busca/page.tsx (navy styling) [quick]
├── Task 17: deputados/[slug]/page.tsx + senadores/[slug]/page.tsx [quick]
├── Task 18: votacoes/[id]/page.tsx + test update [quick]

Wave FINAL (Independent review — 4 parallel):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA with Playwright (unspecified-high)
├── Task F4: Scope fidelity check (deep)

Critical Path: T1-T5 (parallel) → T6-T10 (parallel) → T11-T14 (parallel) → T15-T18 (parallel) → F1-F4 (parallel)
Parallel Speedup: ~75% faster than sequential
Max Concurrent: 5 (Wave 1 & Wave 2)
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| T1 | — | T11 |
| T2 | — | T6-T18 |
| T3 | — | T8, T11 |
| T4 | — | T6, T11 |
| T5 | — | — |
| T6 | T2, T4 | T11, T14, T18 |
| T7 | T2 | T11, T16-T18 |
| T8 | T2, T3 | — |
| T9 | T2, T3 | — |
| T10 | T2 | T11 |
| T11 | T1, T2, T3, T6, T7, T10 | — |
| T12 | T2 | T17, T18 |
| T13 | T2 | T16 |
| T14 | T2, T6 | T18 |
| T15 | T2, T4 | — |
| T16 | T2, T13 | — |
| T17 | T2, T12 | — |
| T18 | T2, T6, T12, T14 | — |

### Agent Dispatch Summary

- **Wave 1**: **5 tasks** — T1-T5 → all `quick`
- **Wave 2**: **5 tasks** — T6-T10 → all `quick`
- **Wave 3**: **4 tasks** — T11 → `unspecified-high`, T12-T14 → `quick`
- **Wave 4**: **4 tasks** — T15-T18 → all `quick`
- **FINAL**: **4 tasks** — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

> Implementation + Test = ONE Task. Never separate.
> EVERY task MUST have: Recommended Agent Profile + Parallelization info + QA Scenarios.

- [x] 1. Save hero-bg.jpg to public/

  **What to do**:
  - The user provided a hero-bg.jpg image (dark navy with subtle geometric grid pattern)
  - Save it to `public/hero-bg.jpg` in the project root
  - The image is available in this conversation's context — the user attached it directly
  - If the image cannot be extracted from conversation context, create a placeholder: download a dark navy gradient image from a public source or generate a simple CSS gradient fallback, then note it for manual replacement

  **Must NOT do**:
  - Don't install any image processing packages
  - Don't modify any other files in this task

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single file save operation, trivial task
  - **Skills**: []
    - No special skills needed for a file save
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not a browser task

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4, 5)
  - **Blocks**: Task 11 (home page hero needs this image)
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `src/app/page.tsx:19` — Current hero references `bg-[url('/grid.svg')]` — this will be replaced by `bg-[url('/hero-bg.jpg')]`
  - `/tmp/spark-platform/src/components/Hero.tsx` — Spark hero uses `bg-[url('/hero-bg.jpg')]` pattern

  **Acceptance Criteria**:
  - [ ] File exists at `public/hero-bg.jpg`
  - [ ] File is a valid image (not 0 bytes)

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: hero-bg.jpg saved correctly
    Tool: Bash
    Preconditions: Project at /home/lxndr/Projects/Personal/vote-tracking-app
    Steps:
      1. Run `ls -la public/hero-bg.jpg`
      2. Assert file exists and size > 0 bytes
      3. Run `file public/hero-bg.jpg` to verify it's a valid image
    Expected Result: File exists, is > 1KB, and `file` command reports JPEG image data
    Failure Indicators: File missing, 0 bytes, or not recognized as image
    Evidence: .sisyphus/evidence/task-1-hero-bg-exists.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `style(tokens): migrate design system to Navy Civic Dark theme`
  - Files: `public/hero-bg.jpg`

- [x] 2. Migrate globals.css to Navy Civic Dark tokens + utility classes

  **What to do**:
  - Replace ALL CSS custom property values in `src/styles/globals.css` `:root` block with Navy Civic Dark values from Spark
  - Remove `--verde`, `--amarelo`, `--azul` brand token declarations entirely
  - Remove `--color-verde`, `--color-amarelo`, `--color-azul` from `@theme` block
  - Update `--font-sans` in `@theme` to reference `var(--font-sans)` (will be set by next/font in layout.tsx)
  - Add `--font-mono` variable to `@theme`: `var(--font-mono), ui-monospace, monospace`
  - Add comment header: `/* Navy Civic Dark Theme — Como Eles Votaram */`
  - Update ALL token values:
    ```
    --background: 220 50% 4%;
    --foreground: 210 30% 95%;
    --card: 220 45% 7%;
    --card-foreground: 210 30% 95%;
    --popover: 220 45% 7%;
    --popover-foreground: 210 30% 95%;
    --primary: 142 76% 52%;
    --primary-foreground: 220 50% 4%;
    --secondary: 220 35% 12%;
    --secondary-foreground: 210 30% 85%;
    --muted: 220 35% 10%;
    --muted-foreground: 215 20% 50%;
    --accent: 142 76% 52%;
    --accent-foreground: 220 50% 4%;
    --destructive: 0 72% 51%;
    --destructive-foreground: 210 30% 95%;
    --border: 220 30% 14%;
    --input: 220 35% 10%;
    --ring: 142 76% 52%;
    --radius: 0.375rem;
    ```
  - Add custom tokens after `--radius`:
    ```
    --navy-deep: 220 50% 4%;
    --navy-card: 220 45% 7%;
    --navy-surface: 220 35% 10%;
    --navy-border: 220 30% 14%;
    --green-acid: 142 76% 52%;
    --green-dim: 142 60% 35%;
    --vote-yes: 142 76% 52%;
    --vote-no: 0 72% 51%;
    --vote-abstain: 40 80% 55%;
    --vote-absent: 215 20% 40%;
    ```
  - Add utility classes in `@layer components` block at bottom of file:
    ```css
    @layer components {
      .grid-bg {
        background-image:
          linear-gradient(hsl(220 30% 14% / 0.3) 1px, transparent 1px),
          linear-gradient(90deg, hsl(220 30% 14% / 0.3) 1px, transparent 1px);
        background-size: 40px 40px;
      }
      .stat-number {
        font-family: var(--font-mono);
        @apply text-4xl font-bold text-primary;
      }
      .tag-pill {
        font-family: var(--font-mono);
        @apply text-xs px-2 py-0.5 rounded border;
      }
      .vote-yes { @apply text-green-400 bg-green-400/10 border-green-400/30; }
      .vote-no { @apply text-red-400 bg-red-400/10 border-red-400/30; }
      .vote-abstain { @apply text-amber-400 bg-amber-400/10 border-amber-400/30; }
      .vote-absent { @apply text-slate-400 bg-slate-400/10 border-slate-400/30; }
    }
    ```
  - Register custom tokens in `@theme` block for `--color-navy-*`, `--color-green-*`, `--color-vote-*` so they're usable as Tailwind classes

  **Must NOT do**:
  - Don't create a tailwind.config.ts file
  - Don't add a ThemeProvider or dark mode toggle
  - Don't change the `@import` statements at the top
  - Don't add `@import url('https://fonts.googleapis.com/')` — fonts are handled in layout.tsx via next/font

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single CSS file modification with clear token mappings
  - **Skills**: []
    - No special skills needed
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: Overkill for token migration, values are explicitly defined

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4, 5)
  - **Blocks**: Tasks 6-18 (ALL subsequent tasks depend on tokens being correct)
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `src/styles/globals.css` — Current file to modify (112 lines). Keep same structure: `@import` → `@theme` → `@layer base :root` → `@layer base *`
  - `/tmp/spark-platform/src/index.css:11-74` — Source of truth for ALL token values. Copy values exactly.
  - `/tmp/spark-platform/src/index.css:97-127` — Source of utility classes (grid-bg, stat-number, tag-pill, vote-*)

  **API/Type References**:
  - Tailwind v4 uses `@theme` block for registering custom properties, NOT `tailwind.config.ts`

  **Acceptance Criteria**:
  - [ ] Zero references to `--verde`, `--amarelo`, `--azul` in globals.css
  - [ ] `--background: 220 50% 4%` present in :root
  - [ ] `--primary: 142 76% 52%` present in :root
  - [ ] `.grid-bg` class defined in `@layer components`
  - [ ] `.stat-number` class defined
  - [ ] `.tag-pill` class defined
  - [ ] `.vote-yes/.vote-no/.vote-abstain/.vote-absent` classes defined

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Navy tokens correctly applied
    Tool: Bash (grep)
    Preconditions: globals.css has been modified
    Steps:
      1. Run `grep -- "--background: 220 50% 4%" src/styles/globals.css`
      2. Run `grep -- "--primary: 142 76% 52%" src/styles/globals.css`
      3. Run `grep -- "--verde" src/styles/globals.css` — should return NO matches
      4. Run `grep -- "--amarelo" src/styles/globals.css` — should return NO matches
      5. Run `grep -- "--azul" src/styles/globals.css` — should return NO matches
    Expected Result: Steps 1-2 match, steps 3-5 return empty
    Failure Indicators: Old token values still present, or new values missing
    Evidence: .sisyphus/evidence/task-2-tokens-applied.txt

  Scenario: Utility classes present
    Tool: Bash (grep)
    Preconditions: globals.css has been modified
    Steps:
      1. Run `grep "grid-bg" src/styles/globals.css`
      2. Run `grep "stat-number" src/styles/globals.css`
      3. Run `grep "tag-pill" src/styles/globals.css`
      4. Run `grep "vote-yes" src/styles/globals.css`
    Expected Result: All 4 grep commands return matches
    Evidence: .sisyphus/evidence/task-2-utilities-present.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `style(tokens): migrate design system to Navy Civic Dark theme`
  - Files: `src/styles/globals.css`

- [x] 3. Swap fonts in layout.tsx (Inter → Space Grotesk + Space Mono)

  **What to do**:
  - Replace `import { Inter } from "next/font/google"` with imports for Space_Grotesk and Space_Mono
  - Configure fonts:
    ```tsx
    const spaceGrotesk = Space_Grotesk({
      subsets: ["latin"],
      variable: "--font-sans",
      display: "swap",
    });
    const spaceMono = Space_Mono({
      weight: ["400", "700"],
      subsets: ["latin"],
      variable: "--font-mono",
      display: "swap",
    });
    ```
  - Update body className: `font-sans ${spaceGrotesk.variable} ${spaceMono.variable} antialiased`
  - Remove the old `inter` const

  **Must NOT do**:
  - Don't change metadata, TRPCReactProvider, or structural layout
  - Don't add `@import url()` in CSS — use next/font only
  - Don't change component imports or page structure

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple import swap, ~10 lines changed
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `next-best-practices`: Font loading is straightforward with next/font

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4, 5)
  - **Blocks**: Tasks 8, 9, 11 (depend on font variables being available)
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `src/app/layout.tsx:4,39-43,50` — Current Inter font setup to replace
  - `/tmp/spark-platform/src/index.css:5` — Spark loads "Space Grotesk" and "Space Mono" from Google Fonts

  **Acceptance Criteria**:
  - [ ] No reference to `Inter` in layout.tsx
  - [ ] `Space_Grotesk` and `Space_Mono` imported from `next/font/google`
  - [ ] `--font-sans` and `--font-mono` CSS variables set via font objects
  - [ ] Both variable strings applied to body className

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Fonts correctly configured
    Tool: Bash (grep)
    Preconditions: layout.tsx has been modified
    Steps:
      1. Run `grep "Space_Grotesk" src/app/layout.tsx`
      2. Run `grep "Space_Mono" src/app/layout.tsx`
      3. Run `grep "Inter" src/app/layout.tsx` — should return NO matches
      4. Run `grep "font-mono" src/app/layout.tsx`
    Expected Result: Steps 1,2,4 match. Step 3 returns empty.
    Failure Indicators: Inter still imported, or Space fonts missing
    Evidence: .sisyphus/evidence/task-3-fonts-swapped.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `style(tokens): migrate design system to Navy Civic Dark theme`
  - Files: `src/app/layout.tsx`

- [x] 4. Update colors.ts brand constants + design-tokens test

  **What to do**:
  - Replace `src/lib/theme/colors.ts` content — remove `verde`, `amarelo`, `azul` keys, replace with:
    ```ts
    export const colors = {
      primary: "#34d399",    // acid green (hsl 142 76% 52%)
      background: "#071018", // navy deep (hsl 220 50% 4%)
    } as const;
    ```
  - Keep the `BrandColor` type export: `export type BrandColor = keyof typeof colors;`
  - Remove the JSDoc comment referencing `#09090b` and WCAG contrast ratios against zinc-950 — replace with a comment noting the Navy Civic Dark palette
  - Update `src/__tests__/design-tokens.test.tsx`:
    - Change the brand color assertions from `colors.verde`/`colors.amarelo`/`colors.azul`/`colors.background` to `colors.primary`/`colors.background`
    - Assert `colors.primary` equals `"#34d399"`
    - Assert `colors.background` equals `"#071018"`
    - Remove assertions for `verde`, `amarelo`, `azul`

  **Must NOT do**:
  - Don't create new files or abstractions
  - Don't add a VoteColorMap or theme.config.ts

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Two small files, ~15 lines total change
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `systematic-debugging`: Not debugging, just updating constants

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 5)
  - **Blocks**: Tasks 6, 11, 15 (depend on brand constants being correct)
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `src/lib/theme/colors.ts` — Current file (12 lines). Replace 3 color keys with 2 new ones.
  - `src/__tests__/design-tokens.test.tsx:19-25` — Current brand color assertions to update

  **Acceptance Criteria**:
  - [ ] `colors.primary` equals `"#34d399"` in colors.ts
  - [ ] `colors.background` equals `"#071018"` in colors.ts
  - [ ] No reference to `verde`, `amarelo`, or `azul` in colors.ts
  - [ ] `npx jest src/__tests__/design-tokens.test.tsx` passes

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Brand colors updated correctly
    Tool: Bash (grep)
    Preconditions: Both files modified
    Steps:
      1. Run `grep "verde" src/lib/theme/colors.ts` — should return NO matches
      2. Run `grep "amarelo" src/lib/theme/colors.ts` — should return NO matches
      3. Run `grep "azul" src/lib/theme/colors.ts` — should return NO matches
      4. Run `grep "#34d399" src/lib/theme/colors.ts` — should match
      5. Run `grep "#071018" src/lib/theme/colors.ts` — should match
    Expected Result: Steps 1-3 empty, steps 4-5 match
    Evidence: .sisyphus/evidence/task-4-colors-updated.txt

  Scenario: Design tokens test passes
    Tool: Bash
    Preconditions: Both files modified
    Steps:
      1. Run `npx jest src/__tests__/design-tokens.test.tsx --no-coverage`
    Expected Result: 2 tests pass, 0 failures
    Failure Indicators: Test fails on old color assertions
    Evidence: .sisyphus/evidence/task-4-test-pass.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `style(tokens): migrate design system to Navy Civic Dark theme`
  - Files: `src/lib/theme/colors.ts`, `src/__tests__/design-tokens.test.tsx`

- [x] 5. Update components.json baseColor from "zinc" to "slate"

  **What to do**:
  - In `components.json`, change `"baseColor": "zinc"` to `"baseColor": "slate"`
  - This ensures any future `npx shadcn add` commands generate components with blue-ish navy undertones matching the Navy Civic Dark design

  **Must NOT do**:
  - Don't change any other field in components.json
  - Don't add a tailwind config path (keep `"config": ""`)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single JSON field change, 1 line
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - None needed for a JSON edit

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 4)
  - **Blocks**: None (this is a config change, no downstream depends on it at runtime)
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `components.json:9` — Line to change: `"baseColor": "zinc"` → `"baseColor": "slate"`

  **Acceptance Criteria**:
  - [ ] `components.json` contains `"baseColor": "slate"`
  - [ ] No reference to `"zinc"` in components.json

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: baseColor updated to slate
    Tool: Bash (grep)
    Preconditions: components.json modified
    Steps:
      1. Run `grep '"baseColor": "slate"' components.json`
      2. Run `grep '"baseColor": "zinc"' components.json` — should return NO matches
    Expected Result: Step 1 matches, step 2 empty
    Evidence: .sisyphus/evidence/task-5-basecolor-slate.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `style(tokens): migrate design system to Navy Civic Dark theme`
  - Files: `components.json`

- [x] 6. Vote Badge Color Migration (voto-badge.tsx + test)

  **What to do**:
  - Open `src/components/votacao/voto-badge.tsx`
  - Change vote color mapping in the `variants` object (CVA):
    - `Sim`: `bg-blue-500 hover:bg-blue-600 border-blue-600` → `bg-green-500 hover:bg-green-600 border-green-600`
    - `Não`: `bg-amber-500 hover:bg-amber-600 border-amber-600` → `bg-red-500 hover:bg-red-600 border-red-600`
    - `Abstenção`: keep `bg-gray-500` → change to `bg-amber-500 hover:bg-amber-600 border-amber-600`
    - `Obstrução`: keep `bg-purple-500` as-is
    - `Art. 17`: keep `bg-slate-500` as-is
    - `default` (Não Votou): keep `bg-muted` as-is
  - Open `src/components/__tests__/voto-badge.test.tsx`
  - Update test assertions to match new colors:
    - `expect(container.firstChild).toHaveClass("bg-blue-500")` → `expect(container.firstChild).toHaveClass("bg-green-500")` for Sim
    - `expect(container.firstChild).toHaveClass("bg-amber-500")` → `expect(container.firstChild).toHaveClass("bg-red-500")` for Não
    - Add/update assertion for Abstenção to check `bg-amber-500`

  **Must NOT do**:
  - Do NOT change the Props interface (`VotoBadgeProps`)
  - Do NOT create a VoteColorMap constant or useVoteColor hook
  - Do NOT change the exported function signature
  - Do NOT add new imports

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Small, focused change to CVA variants and corresponding test assertions. Two files, mechanical mapping.
  - **Skills**: []
    - No special skills needed for class string replacement
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed — Jest tests verify class output, no browser needed
    - `systematic-debugging`: Not needed — no debugging, straightforward replacement

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 8, 9, 10)
  - **Blocks**: Tasks 11, 14, 18 (pages that render VotoBadge)
  - **Blocked By**: Tasks 2, 4 (design tokens and brand colors must exist)

  **References**:

  **Pattern References** (existing code to follow):
  - `src/components/votacao/voto-badge.tsx:8-30` — CVA `variants.voto` object with current color classes. Change the class strings directly in this object.
  - `/tmp/spark-platform/src/index.css:85-100` — Spark vote color utilities (`.vote-yes`, `.vote-no`, `.vote-abstain`, `.vote-absent`) showing target green/red/amber/slate scheme

  **API/Type References**:
  - `src/components/votacao/voto-badge.tsx:32-35` — `VotoBadgeProps` interface: `{ voto: string; className?: string }`. DO NOT MODIFY.

  **Test References**:
  - `src/components/__tests__/voto-badge.test.tsx:8-26` — Current test structure: renders badge per vote type, asserts `toHaveClass("bg-X-500")`. Update the expected class strings.

  **Acceptance Criteria**:
  - [ ] `bg-blue-500` does NOT appear in voto-badge.tsx
  - [ ] `bg-green-500` appears for Sim vote
  - [ ] `bg-red-500` appears for Não vote
  - [ ] `bg-amber-500` appears for Abstenção vote
  - [ ] `npx jest src/components/__tests__/voto-badge.test.tsx` → PASS

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Vote badge renders correct Spark colors
    Tool: Bash (jest)
    Preconditions: voto-badge.tsx and test file updated
    Steps:
      1. Run `npx jest src/components/__tests__/voto-badge.test.tsx --verbose`
      2. Verify all test cases pass (Sim=green, Não=red, Abstenção=amber, Obstrução=purple, Art.17=slate)
    Expected Result: All tests PASS, 0 failures
    Failure Indicators: Any test failure mentioning "bg-blue-500" or "bg-amber-500" for Sim/Não
    Evidence: .sisyphus/evidence/task-6-vote-badge-tests.txt

  Scenario: No legacy blue-500 in vote badge
    Tool: Bash (grep)
    Preconditions: voto-badge.tsx updated
    Steps:
      1. Run `grep -n "bg-blue-500" src/components/votacao/voto-badge.tsx`
      2. Run `grep -n "bg-green-500" src/components/votacao/voto-badge.tsx`
      3. Run `grep -n "bg-red-500" src/components/votacao/voto-badge.tsx`
    Expected Result: Step 1 returns empty, Step 2 returns 1 match, Step 3 returns 1 match
    Failure Indicators: bg-blue-500 found in voto-badge.tsx
    Evidence: .sisyphus/evidence/task-6-vote-badge-grep.txt
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `style(components): update core components to Navy Civic Dark`
  - Files: `src/components/votacao/voto-badge.tsx`, `src/components/__tests__/voto-badge.test.tsx`

- [x] 7. Section Header Monospace Label Pattern (section-header.tsx)

  **What to do**:
  - Open `src/components/layout/section-header.tsx`
  - Add a monospace `// LABEL` prefix above the existing `<h2>`. Insert this JSX before the h2:
    ```tsx
    <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">
      // {title.toUpperCase()}
    </p>
    ```
  - Update the h2 className to: `text-3xl sm:text-4xl font-bold text-foreground`
  - Keep the Props interface (`SectionHeaderProps`) unchanged
  - Keep the `FonteBadge` component and `description` paragraph unchanged
  - Keep the existing container div and its classes

  **Must NOT do**:
  - Do NOT change Props interface or function signature
  - Do NOT create a separate MonospaceLabel component
  - Do NOT remove FonteBadge or description rendering
  - Do NOT change the `id` attribute on the section element

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single file, small markup addition (one `<p>` tag) and class update on h2. No logic changes.
  - **Skills**: []
    - No special skills needed
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: Not needed — exact markup is specified, no design decisions

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 8, 9, 10)
  - **Blocks**: Tasks 11, 16, 17, 18 (pages that use SectionHeader)
  - **Blocked By**: Task 2 (globals.css must define font-mono token)

  **References**:

  **Pattern References** (existing code to follow):
  - `src/components/layout/section-header.tsx:1-30` — Current component structure. The `<h2>` is inside a div. Add the `<p>` tag BEFORE the h2, inside the same container.
  - `/tmp/spark-platform/src/components/RecentVotes.tsx:20-22` — Spark's `// REGISTRO` label pattern: `<p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">// REGISTRO</p>` followed by `<h2>`
  - `/tmp/spark-platform/src/components/Parliamentarians.tsx:16-18` — Same pattern with `// REPRESENTANTES`

  **API/Type References**:
  - `src/components/layout/section-header.tsx` — Props: `{ title: string; description?: string; fonte?: string; atualizacao?: string }`. The `title` prop is used for both the monospace label (`title.toUpperCase()`) and the h2 text.

  **Acceptance Criteria**:
  - [ ] `font-mono` class appears in section-header.tsx
  - [ ] `text-primary` class on the monospace label
  - [ ] `tracking-widest` and `uppercase` on the monospace label
  - [ ] String `// ` (with space) appears before the uppercased title
  - [ ] Props interface unchanged

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Section header has monospace label
    Tool: Bash (grep)
    Preconditions: section-header.tsx updated
    Steps:
      1. Run `grep -n "font-mono" src/components/layout/section-header.tsx`
      2. Run `grep -n "tracking-widest" src/components/layout/section-header.tsx`
      3. Run `grep -n "// {" src/components/layout/section-header.tsx` — verify template literal with title
    Expected Result: All 3 greps return matches
    Failure Indicators: Missing font-mono or tracking-widest classes
    Evidence: .sisyphus/evidence/task-7-section-header-grep.txt

  Scenario: Section header preserves existing functionality
    Tool: Bash (grep)
    Preconditions: section-header.tsx updated
    Steps:
      1. Run `grep -n "FonteBadge" src/components/layout/section-header.tsx` — should still exist
      2. Run `grep -n "description" src/components/layout/section-header.tsx` — should still exist
      3. Run `grep -n "SectionHeaderProps" src/components/layout/section-header.tsx` — interface intact
    Expected Result: All 3 return matches, nothing removed
    Evidence: .sisyphus/evidence/task-7-section-header-preserved.txt
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `style(components): update core components to Navy Civic Dark`
  - Files: `src/components/layout/section-header.tsx`

- [x] 8. Header / Navbar Redesign (header.tsx)

  **What to do**:
  - Open `src/components/layout/header.tsx`
  - Add `"use client"` directive at the top (needed for `useState` mobile menu toggle)
  - Add imports: `import { useState } from "react"`, `import { Menu, X } from "lucide-react"` (keep existing Link, Button, Search imports)
  - Replace the entire header content with Spark Navbar pattern:
    - **CEV Logo Box**: `<div className="w-8 h-8 rounded bg-primary flex items-center justify-center"><span className="font-mono text-primary-foreground font-bold text-xs">CEV</span></div>`
    - **Brand text**: `<span className="text-lg font-bold">Como Eles <span className="text-primary">Votaram</span></span>`
    - **Nav links**: Keep existing links to `/busca` (Buscar) but style as `text-sm text-muted-foreground hover:text-foreground transition-colors`
    - **CTA button**: `<Link href="/busca"><Button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-md font-mono">Explorar →</Button></Link>`
    - **Mobile menu**: `useState` toggle with hamburger `<Menu>` / `<X>` icons. Slide-down panel with same links.
  - Keep `bg-background/80 backdrop-blur-md border-b border-border` on the `<header>` element (already exists)
  - Keep `sticky top-0 z-50` positioning

  **Must NOT do**:
  - Do NOT add a ThemeToggle or dark mode switch
  - Do NOT create separate NavLink components
  - Do NOT add any animations or framer-motion
  - Do NOT change route paths
  - Do NOT remove the Search icon import if used elsewhere (check — if not used, can remove)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single file rewrite of ~40 lines. Clear pattern to follow from Spark Navbar. No complex logic beyond useState toggle.
  - **Skills**: []
    - No special skills needed — pattern is fully specified
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: Not needed — exact markup provided from Spark reference
    - `frontend-ui-ux`: Not needed — no design decisions, following Spark pattern exactly

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 9, 10)
  - **Blocks**: None directly (header is used in layout.tsx which already exists)
  - **Blocked By**: Tasks 2, 3 (globals.css tokens and font loading in layout.tsx)

  **References**:

  **Pattern References** (existing code to follow):
  - `src/components/layout/header.tsx:1-40` — Current header structure. Replace inner content but keep the outer `<header>` element with its positioning classes.
  - `/tmp/spark-platform/src/components/Navbar.tsx:1-80` — **PRIMARY REFERENCE**: Full Spark navbar with CEV logo box, brand text, nav links, CTA button, mobile menu with useState. Adapt from react-router `<a>` to Next.js `<Link>`.

  **API/Type References**:
  - Next.js `Link` component — already imported. Use for all navigation links.
  - `lucide-react` `Menu` and `X` icons — for mobile hamburger toggle.

  **Acceptance Criteria**:
  - [ ] `"use client"` directive at top of file
  - [ ] CEV logo box with `bg-primary` and `font-mono` text "CEV"
  - [ ] Brand text with `text-primary` on "Votaram"
  - [ ] CTA button with `font-mono` linking to `/busca`
  - [ ] Mobile menu with Menu/X icons and useState toggle
  - [ ] No `ThemeToggle` or dark mode references

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Header renders CEV logo and brand text
    Tool: Bash (grep)
    Preconditions: header.tsx rewritten
    Steps:
      1. Run `grep -n "CEV" src/components/layout/header.tsx` — logo box text
      2. Run `grep -n "text-primary" src/components/layout/header.tsx` — green "Votaram"
      3. Run `grep -n "bg-primary" src/components/layout/header.tsx` — logo box bg
      4. Run `grep -n "font-mono" src/components/layout/header.tsx` — monospace on logo and CTA
    Expected Result: All 4 greps return at least 1 match each
    Failure Indicators: Missing CEV text or bg-primary class
    Evidence: .sisyphus/evidence/task-8-header-grep.txt

  Scenario: Header has mobile menu toggle
    Tool: Bash (grep)
    Preconditions: header.tsx rewritten
    Steps:
      1. Run `grep -n "useState" src/components/layout/header.tsx`
      2. Run `grep -n "Menu" src/components/layout/header.tsx`
      3. Run `grep -n '"use client"' src/components/layout/header.tsx`
    Expected Result: All 3 return matches
    Failure Indicators: Missing useState import or "use client" directive
    Evidence: .sisyphus/evidence/task-8-header-mobile.txt

  Scenario: No theme toggle in header
    Tool: Bash (grep)
    Preconditions: header.tsx rewritten
    Steps:
      1. Run `grep -in "theme" src/components/layout/header.tsx`
      2. Run `grep -in "dark" src/components/layout/header.tsx`
    Expected Result: Both return empty (no matches)
    Failure Indicators: Any theme-related code found
    Evidence: .sisyphus/evidence/task-8-header-no-theme.txt
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `style(components): update core components to Navy Civic Dark`
  - Files: `src/components/layout/header.tsx`

- [x] 9. Footer Redesign (footer.tsx)

  **What to do**:
  - Open `src/components/layout/footer.tsx`
  - Add CEV logo box + brand text at top of footer (same pattern as header):
    - `<div className="w-8 h-8 rounded bg-primary flex items-center justify-center"><span className="font-mono text-primary-foreground font-bold text-xs">CEV</span></div>`
    - `<span className="text-lg font-bold">Como Eles <span className="text-primary">Votaram</span></span>`
  - Change footer background: `bg-muted/50` → `bg-card`
  - Change section headers (Navegação, Dados, Sobre) to monospace style: `text-xs font-mono text-primary uppercase tracking-widest mb-4`
  - Add `font-mono` to copyright text at bottom
  - Keep ALL existing Links, content, and structure unchanged
  - Keep the border-t border-border separator

  **Must NOT do**:
  - Do NOT remove any existing navigation links
  - Do NOT change href paths
  - Do NOT add new sections or social media links
  - Do NOT create separate FooterSection components

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single file, class string updates and small markup additions. No logic changes.
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: Not needed — exact markup specified from Spark Footer reference

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8, 10)
  - **Blocks**: None
  - **Blocked By**: Tasks 2, 3 (tokens and fonts must be loaded)

  **References**:

  **Pattern References**:
  - `src/components/layout/footer.tsx:1-71` — Current footer structure with 3 sections (Navegação, Dados, Sobre), copyright, links. Keep all content, update styling.
  - `/tmp/spark-platform/src/components/Footer.tsx:1-60` — Spark footer with CEV logo box, monospace section headers, `bg-card` background, `font-mono` copyright.

  **Acceptance Criteria**:
  - [ ] `bg-card` replaces `bg-muted/50` as footer background
  - [ ] CEV logo box with `bg-primary` and "CEV" text present
  - [ ] Section headers use `font-mono text-primary uppercase tracking-widest`
  - [ ] Copyright uses `font-mono`
  - [ ] All original Links preserved

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Footer has Spark styling
    Tool: Bash (grep)
    Preconditions: footer.tsx updated
    Steps:
      1. Run `grep -n "bg-card" src/components/layout/footer.tsx` — new background
      2. Run `grep -n "bg-muted/50" src/components/layout/footer.tsx` — old background removed
      3. Run `grep -n "CEV" src/components/layout/footer.tsx` — logo box
      4. Run `grep -n "tracking-widest" src/components/layout/footer.tsx` — monospace section headers
      5. Run `grep -n "font-mono" src/components/layout/footer.tsx` — monospace styling
    Expected Result: Steps 1,3,4,5 return matches. Step 2 returns empty.
    Failure Indicators: bg-muted/50 still present or CEV missing
    Evidence: .sisyphus/evidence/task-9-footer-grep.txt

  Scenario: Footer preserves all navigation links
    Tool: Bash (grep)
    Preconditions: footer.tsx updated
    Steps:
      1. Run `grep -n "/busca" src/components/layout/footer.tsx`
      2. Run `grep -n "Navegação\|Dados\|Sobre" src/components/layout/footer.tsx`
      3. Run `grep -c "Link" src/components/layout/footer.tsx` — count Link usages, should match original count
    Expected Result: All sections and routes preserved
    Evidence: .sisyphus/evidence/task-9-footer-links.txt
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `style(components): update core components to Navy Civic Dark`
  - Files: `src/components/layout/footer.tsx`

- [x] 10. Hero Search Bar Token Update (hero-search-bar.tsx)

  **What to do**:
  - Open `src/components/search/hero-search-bar.tsx`
  - Update Input className: ensure `bg-secondary/50 border-border focus-visible:ring-primary` (replace any hardcoded colors if present)
  - Update Button: add `font-mono` class to the search button text
  - Verify existing token-based classes work with new design system (they should — this component already uses semantic tokens)
  - This is a minimal change — the component mostly uses token classes already

  **Must NOT do**:
  - Do NOT change the Props interface or form behavior
  - Do NOT change the search form submission logic
  - Do NOT add animations or placeholder text changes
  - Do NOT change the icon usage (Search icon from lucide)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Minimal class string update in single file. May only need `font-mono` addition.
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Not needed — single class addition

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8, 9)
  - **Blocks**: Task 11 (home page uses hero-search-bar)
  - **Blocked By**: Task 2 (globals.css tokens)

  **References**:

  **Pattern References**:
  - `src/components/search/hero-search-bar.tsx:1-37` — Current component. Check each className for hardcoded colors vs tokens. Add `font-mono` to Button.
  - `/tmp/spark-platform/src/components/Hero.tsx:55-65` — Spark hero search input: `bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary focus:border-primary`

  **Acceptance Criteria**:
  - [ ] `font-mono` appears on search button
  - [ ] No hardcoded hex colors in hero-search-bar.tsx
  - [ ] Component compiles without errors

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Search bar uses token classes
    Tool: Bash (grep)
    Preconditions: hero-search-bar.tsx updated
    Steps:
      1. Run `grep -n "font-mono" src/components/search/hero-search-bar.tsx`
      2. Run `grep -nE "#[0-9a-fA-F]{3,8}" src/components/search/hero-search-bar.tsx` — no hex colors
    Expected Result: Step 1 returns match, Step 2 returns empty
    Failure Indicators: Missing font-mono or hardcoded hex found
    Evidence: .sisyphus/evidence/task-10-searchbar-grep.txt
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `style(components): update core components to Navy Civic Dark`
  - Files: `src/components/search/hero-search-bar.tsx`

- [x] 11. Home Page Hero Redesign (page.tsx + page.test.tsx)

  **What to do**:
  - Open `src/app/page.tsx`
  - **Hero section** (lines 17-60 approximately): Replace the entire hero with Spark pattern:
    - Outer container: `<section className="relative min-h-screen flex items-center justify-center overflow-hidden">`
    - Background image layer: `<div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center" />`
    - Dark overlay: `<div className="absolute inset-0 bg-background/70" />`
    - Grid overlay: `<div className="absolute inset-0 grid-bg opacity-40" />`
    - Green glow orb: `<div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />`
    - Content wrapper: `<div className="relative z-10 container mx-auto px-4 text-center">`
    - Monospace label: `<p className="text-xs font-mono text-primary uppercase tracking-widest mb-4">// PLATAFORMA</p>`
    - Headline: `<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">Como Eles <span className="text-primary">Votaram</span></h1>`
    - Subtitle: keep existing text, style as `text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8`
    - Tag pills: `<div className="flex flex-wrap justify-center gap-2 mb-12">` with pills like `<span className="px-3 py-1 rounded-full text-xs font-mono border border-primary/30 text-primary bg-primary/10">Transparência</span>` and similar for "Dados Abertos", "Democracia"
    - HeroSearchBar: keep existing `<HeroSearchBar />` component
    - Stats row: Keep existing stats (deputados, senadores, votações) but wrap values in `<span className="font-mono text-2xl font-bold text-primary">`
    - Bottom fade: `<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />`
  - **Remove all hardcoded colors**: Delete `from-[#09090b]`, `to-[#1a1b2e]`, the Brazilian flag gradient `from-green-400 via-yellow-400 to-blue-500`, `bg-[#09090b]` (line 105)
  - **Below-hero sections**: Keep Suspense wrappers, SectionHeader, VotacoesRecentes, ParlamentarCards intact. Only update the final CTA section:
    - Remove `bg-[#09090b]` (line 105), replace with no bg (inherits from body background)
    - Update CTA button to use `font-mono` class
  - Open `src/app/__tests__/page.test.tsx`
  - **Verify tests**: Current tests assert on text content ("Como Eles Votaram", "Deputados", stats text) NOT on class names. Tests should pass without changes. Run `npx jest src/app/__tests__/page.test.tsx` to verify. If any test breaks due to structural changes (e.g., the "Votaram" text now being in a `<span>`), update the assertion to match new structure.

  **Must NOT do**:
  - Do NOT remove Suspense boundaries around data-fetching components
  - Do NOT change tRPC data fetching (HydrateClient, prefetch calls)
  - Do NOT remove SectionHeader, VotacoesRecentes, ParlamentarCards components
  - Do NOT add framer-motion or animation libraries
  - Do NOT create new utility components (GlowOrb, GridOverlay, etc.)
  - Do NOT change the page's metadata export

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Largest single task — full hero rewrite with multiple overlay layers, tag pills, stats row, gradient removal. Needs attention to detail.
  - **Skills**: [`next-best-practices`]
    - `next-best-practices`: Page uses server components with Suspense — ensure RSC boundaries are preserved correctly during hero rewrite.
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed in this task — QA is via grep and jest. Playwright is used in Final QA (F3).
    - `frontend-design`: Not needed — exact markup is specified from Spark Hero reference.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 12, 13, 14)
  - **Blocks**: None
  - **Blocked By**: Tasks 1, 2, 3, 6, 7, 10 (hero-bg.jpg, tokens, fonts, vote badge colors, section header, search bar)

  **References**:

  **Pattern References**:
  - `src/app/page.tsx:1-136` — **FULL FILE** — Current home page. Lines 17-60 are the hero section to rewrite. Lines 62-100 are data sections to keep intact. Lines 102-134 are the CTA section (remove `bg-[#09090b]`).
  - `/tmp/spark-platform/src/components/Hero.tsx:1-90` — **PRIMARY REFERENCE**: Spark hero with bg-image, overlays, grid-bg, glow orb, tag pills, stats, bottom fade. Adapt this structure.

  **API/Type References**:
  - `src/app/page.tsx:1-15` — Server component imports: `HydrateClient`, `api`, `prefetch` from tRPC. These MUST remain. The page is a server component that prefetches data.

  **Test References**:
  - `src/app/__tests__/page.test.tsx:1-81` — Tests mock tRPC and assert text content. Key assertions: `getByText("Como Eles Votaram")`, stats values. These should pass with new markup since text content is preserved.

  **Acceptance Criteria**:
  - [ ] No `#09090b` hex in page.tsx
  - [ ] No `#1a1b2e` hex in page.tsx
  - [ ] No `from-green-400 via-yellow-400 to-blue-500` gradient in page.tsx
  - [ ] `hero-bg.jpg` referenced in bg-image class
  - [ ] `grid-bg` class present
  - [ ] `bg-primary/5 blur-3xl` glow orb present
  - [ ] `// PLATAFORMA` monospace label present
  - [ ] `text-primary` on "Votaram" span
  - [ ] `font-mono` on stat values
  - [ ] `npx jest src/app/__tests__/page.test.tsx` → PASS

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Home page hero has Spark visual elements
    Tool: Bash (grep)
    Preconditions: page.tsx rewritten
    Steps:
      1. Run `grep -n "hero-bg.jpg" src/app/page.tsx` — bg image reference
      2. Run `grep -n "grid-bg" src/app/page.tsx` — grid overlay
      3. Run `grep -n "blur-3xl" src/app/page.tsx` — glow orb
      4. Run `grep -n "// PLATAFORMA" src/app/page.tsx` — monospace label
      5. Run `grep -n "font-mono" src/app/page.tsx` — monospace on stats
    Expected Result: All 5 return at least 1 match
    Failure Indicators: Any of the 5 missing
    Evidence: .sisyphus/evidence/task-11-hero-spark-elements.txt

  Scenario: Home page has no legacy hardcoded colors
    Tool: Bash (grep)
    Preconditions: page.tsx rewritten
    Steps:
      1. Run `grep -n "#09090b" src/app/page.tsx` — zinc background
      2. Run `grep -n "#1a1b2e" src/app/page.tsx` — old gradient end
      3. Run `grep -n "from-green-400" src/app/page.tsx` — Brazilian flag gradient
      4. Run `grep -n "via-yellow-400" src/app/page.tsx`
      5. Run `grep -n "to-blue-500" src/app/page.tsx`
    Expected Result: All 5 return empty (0 matches)
    Failure Indicators: Any hardcoded color hex or flag gradient found
    Evidence: .sisyphus/evidence/task-11-hero-no-legacy.txt

  Scenario: Home page tests pass after hero redesign
    Tool: Bash (jest)
    Preconditions: page.tsx and page.test.tsx updated (if needed)
    Steps:
      1. Run `npx jest src/app/__tests__/page.test.tsx --verbose`
    Expected Result: All tests PASS
    Failure Indicators: Any test failure — likely due to text split across spans
    Evidence: .sisyphus/evidence/task-11-hero-tests.txt
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `style(pages): redesign home page and data components`
  - Files: `src/app/page.tsx`, `src/app/__tests__/page.test.tsx` (if modified)

- [x] 12. Stat Card & Empty State Token Update (stat-card.tsx + empty-state.tsx)

  **What to do**:
  - Open `src/components/data/stat-card.tsx`
  - Add `font-mono` to the stat value element: find the `<div>` or `<span>` rendering the numeric value (likely has `text-2xl font-bold`) and add `font-mono` to its className
  - Verify all other classes are token-based (they should be — component uses `bg-card`, `border`, etc.)
  - Open `src/components/data/empty-state.tsx`
  - Update border styling: change any `border-dashed` to solid `border-border` (if present)
  - Verify token-based classes throughout

  **Must NOT do**:
  - Do NOT change Props interfaces
  - Do NOT change the component structure or logic
  - Do NOT add animations or hover effects

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Two files, minimal class additions. Possibly just adding `font-mono` to one element.
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: Overkill for adding one CSS class

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 11, 13, 14)
  - **Blocks**: Tasks 17, 18 (parlamentar pages and votação page use StatCard)
  - **Blocked By**: Task 2 (design tokens)

  **References**:

  **Pattern References**:
  - `src/components/data/stat-card.tsx:1-29` — Current component. Find the value rendering element and add `font-mono`.
  - `src/components/data/empty-state.tsx:1-30` — Current component. Check border classes.
  - `/tmp/spark-platform/src/components/Hero.tsx:70-80` — Spark stat values use `font-mono text-2xl font-bold text-primary`

  **Acceptance Criteria**:
  - [ ] `font-mono` appears on stat value in stat-card.tsx
  - [ ] No hardcoded hex colors in either file
  - [ ] Components compile without errors

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Stat card has monospace value
    Tool: Bash (grep)
    Preconditions: stat-card.tsx updated
    Steps:
      1. Run `grep -n "font-mono" src/components/data/stat-card.tsx`
      2. Run `grep -nE "#[0-9a-fA-F]{3,8}" src/components/data/stat-card.tsx` — no hex colors
    Expected Result: Step 1 returns match, Step 2 returns empty
    Evidence: .sisyphus/evidence/task-12-stat-card.txt

  Scenario: Empty state uses token classes
    Tool: Bash (grep)
    Preconditions: empty-state.tsx verified/updated
    Steps:
      1. Run `grep -nE "#[0-9a-fA-F]{3,8}" src/components/data/empty-state.tsx` — no hex colors
      2. Run `grep -n "border" src/components/data/empty-state.tsx` — uses border tokens
    Expected Result: Step 1 empty, Step 2 returns matches
    Evidence: .sisyphus/evidence/task-12-empty-state.txt
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `style(pages): redesign home page and data components`
  - Files: `src/components/data/stat-card.tsx`, `src/components/data/empty-state.tsx`

- [x] 13. Parlamentar Cards Hover Update (parlamentar-card.tsx + parlamentar-header.tsx + test)

  **What to do**:
  - Open `src/components/parlamentar/parlamentar-card.tsx`
  - Update hover/border classes on the card element:
    - Change `hover:bg-muted/50` → `hover:border-primary/30`
    - Change `border-muted` → `border-border` (if present)
    - Keep all existing content (avatar, name, party, state, Link)
  - Open `src/components/parlamentar/parlamentar-header.tsx`
  - Verify all classes are token-based (bg-card, border, shadow-sm — these should work with new tokens)
  - No changes expected unless hardcoded colors found
  - Open `src/components/__tests__/parlamentar-card.test.tsx`
  - Verify tests pass — assertions are on text content (`getByText`, `getByRole`) and `href` attributes, NOT on CSS classes. No test changes should be needed. Run `npx jest src/components/__tests__/parlamentar-card.test.tsx` to confirm.

  **Must NOT do**:
  - Do NOT change Props interfaces
  - Do NOT change Link routing logic
  - Do NOT add animation libraries
  - Do NOT restructure the card layout

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 2-3 files, class string swaps only. Test verification with no expected changes.
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Not needed — just class string updates

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 11, 12, 14)
  - **Blocks**: Task 16 (busca page renders parlamentar cards)
  - **Blocked By**: Task 2 (design tokens)

  **References**:

  **Pattern References**:
  - `src/components/parlamentar/parlamentar-card.tsx:1-66` — Current card. Find the Card/div element with hover classes and update.
  - `src/components/parlamentar/parlamentar-header.tsx:1-71` — Current header. Verify token usage.
  - `/tmp/spark-platform/src/components/Parliamentarians.tsx:30-50` — Spark card hover: `hover:border-primary/30 transition-all`

  **Test References**:
  - `src/components/__tests__/parlamentar-card.test.tsx:1-41` — Tests assert text and href, not classes. Should pass without changes.

  **Acceptance Criteria**:
  - [ ] `hover:border-primary/30` present in parlamentar-card.tsx
  - [ ] No `hover:bg-muted/50` in parlamentar-card.tsx (if it existed)
  - [ ] `npx jest src/components/__tests__/parlamentar-card.test.tsx` → PASS
  - [ ] No hardcoded hex colors in either file

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Parlamentar card has Spark hover style
    Tool: Bash (grep)
    Preconditions: parlamentar-card.tsx updated
    Steps:
      1. Run `grep -n "hover:border-primary" src/components/parlamentar/parlamentar-card.tsx`
      2. Run `grep -n "hover:bg-muted" src/components/parlamentar/parlamentar-card.tsx` — should be gone
      3. Run `grep -nE "#[0-9a-fA-F]{3,8}" src/components/parlamentar/parlamentar-card.tsx` — no hex
    Expected Result: Step 1 returns match, Steps 2-3 return empty
    Evidence: .sisyphus/evidence/task-13-parlamentar-card.txt

  Scenario: Parlamentar card tests pass unchanged
    Tool: Bash (jest)
    Preconditions: parlamentar-card.tsx updated
    Steps:
      1. Run `npx jest src/components/__tests__/parlamentar-card.test.tsx --verbose`
    Expected Result: All tests PASS
    Evidence: .sisyphus/evidence/task-13-parlamentar-tests.txt
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `style(pages): redesign home page and data components`
  - Files: `src/components/parlamentar/parlamentar-card.tsx`, `src/components/parlamentar/parlamentar-header.tsx`

- [x] 14. Votação Cards Hover Update (votacao-card.tsx + voting-history-card.tsx)

  **What to do**:
  - Open `src/components/votacao/votacao-card.tsx`
  - Update hover classes: `hover:bg-muted/30` → `hover:bg-card/80` and add `hover:border-primary/30`
  - Verify `border-border` is used (not `border-muted`)
  - Open `src/components/parlamentar/voting-history-card.tsx`
  - Add `hover:border-primary/30` to the Card className
  - Both components already use token-based classes mostly

  **Must NOT do**:
  - Do NOT change Props interfaces or data rendering logic
  - Do NOT change Link routing or href construction
  - Do NOT restructure card content layout

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Two files, class string additions/swaps only.
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Not needed — just class string updates

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 11, 12, 13)
  - **Blocks**: Task 18 (votação detail page uses these cards)
  - **Blocked By**: Tasks 2, 6 (tokens and vote badge colors)

  **References**:

  **Pattern References**:
  - `src/components/votacao/votacao-card.tsx:1-70` — Current card with hover classes to update.
  - `src/components/parlamentar/voting-history-card.tsx:1-47` — Current card, add hover:border-primary/30.
  - `/tmp/spark-platform/src/components/RecentVotes.tsx:25-45` — Spark vote card hover pattern.

  **Acceptance Criteria**:
  - [ ] `hover:border-primary/30` present in both files
  - [ ] No `hover:bg-muted/30` in votacao-card.tsx
  - [ ] No hardcoded hex colors in either file

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Votação cards have Spark hover style
    Tool: Bash (grep)
    Preconditions: both card files updated
    Steps:
      1. Run `grep -n "hover:border-primary" src/components/votacao/votacao-card.tsx`
      2. Run `grep -n "hover:border-primary" src/components/parlamentar/voting-history-card.tsx`
      3. Run `grep -n "hover:bg-muted" src/components/votacao/votacao-card.tsx` — old style gone
      4. Run `grep -nE "#[0-9a-fA-F]{3,8}" src/components/votacao/votacao-card.tsx` — no hex
    Expected Result: Steps 1-2 return matches, Steps 3-4 return empty
    Evidence: .sisyphus/evidence/task-14-votacao-cards.txt
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `style(pages): redesign home page and data components`
  - Files: `src/components/votacao/votacao-card.tsx`, `src/components/parlamentar/voting-history-card.tsx`

- [x] 15. OpenGraph Image Brand Update (opengraph-image.tsx)

  **What to do**:
  - Open `src/app/opengraph-image.tsx`
  - Update inline style colors:
    - Background: `"#09090b"` → `"#071018"` (navy deep)
    - "Votaram" text: Remove the gradient technique (`background: "linear-gradient(...)"`, `backgroundClip: "text"`, `WebkitBackgroundClip: "text"`, `color: "transparent"`). Replace with simple solid color: `color: "#34d399"` (acid green)
    - Keep "Como Eles " in white
    - Subtitle: change `color: "#9ca3af"` → `color: "#6b7f99"` (muted-foreground equivalent)
  - Keep all OG image dimensions (1200x630) and ImageResponse structure unchanged
  - Keep font loading logic unchanged

  **Must NOT do**:
  - Do NOT change image dimensions
  - Do NOT change the font loading mechanism
  - Do NOT add new graphical elements (logo box, etc. — OG images should be simple)
  - Do NOT change the export name or function signature

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single file, 3-4 hex color replacements in inline styles. Mechanical changes.
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `next-best-practices`: Not needed — OG image route handler is straightforward

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 16, 17, 18)
  - **Blocks**: None
  - **Blocked By**: Tasks 2, 4 (tokens and colors.ts for reference values)

  **References**:

  **Pattern References**:
  - `src/app/opengraph-image.tsx:1-72` — Current file. Inline styles use hex colors directly (this is correct for OG images — they can't use CSS tokens). Lines ~35-45 have the gradient on "Votaram". Lines ~25 have the background color.

  **API/Type References**:
  - `src/lib/theme/colors.ts` — Reference for brand hex values: `primary: "#34d399"`, `background: "#071018"`

  **Acceptance Criteria**:
  - [ ] `#09090b` does NOT appear in opengraph-image.tsx
  - [ ] `#071018` appears as background color
  - [ ] `#34d399` appears for "Votaram" text color
  - [ ] No gradient technique (backgroundClip, WebkitBackgroundClip) on "Votaram"
  - [ ] `#22c55e`, `#facc15`, `#3b82f6` do NOT appear (old gradient colors)

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: OG image uses navy brand colors
    Tool: Bash (grep)
    Preconditions: opengraph-image.tsx updated
    Steps:
      1. Run `grep -n "#071018" src/app/opengraph-image.tsx` — navy background
      2. Run `grep -n "#34d399" src/app/opengraph-image.tsx` — acid green text
      3. Run `grep -n "#09090b" src/app/opengraph-image.tsx` — old zinc removed
      4. Run `grep -n "#22c55e" src/app/opengraph-image.tsx` — old gradient green removed
      5. Run `grep -n "#facc15" src/app/opengraph-image.tsx` — old gradient yellow removed
      6. Run `grep -n "#3b82f6" src/app/opengraph-image.tsx` — old gradient blue removed
      7. Run `grep -n "backgroundClip" src/app/opengraph-image.tsx` — gradient technique removed
    Expected Result: Steps 1-2 return matches, Steps 3-7 return empty
    Failure Indicators: Any old hex color or gradient technique found
    Evidence: .sisyphus/evidence/task-15-og-image.txt
  ```

  **Commit**: YES (groups with Wave 4)
  - Message: `style(pages): update remaining pages and opengraph image`
  - Files: `src/app/opengraph-image.tsx`

- [x] 16. Busca Page Verification (busca/page.tsx)

  **What to do**:
  - Open `src/app/busca/page.tsx`
  - **Audit all classNames** for hardcoded colors — search for any hex values (`#`), explicit color classes that aren't token-based
  - This page already uses token-based classes (`bg-muted`, `text-muted-foreground`, `border`, etc.) extensively
  - If the page heading (`<h1>`) exists, consider adding `font-mono` to tracking-tight if it fits the Spark pattern
  - Verify the ParlamentarCard components rendered here will pick up changes from Task 13
  - This task may result in ZERO file changes if audit finds everything is clean — that's fine, the audit itself is the deliverable

  **Must NOT do**:
  - Do NOT restructure the page layout
  - Do NOT change search/filter logic
  - Do NOT modify tRPC queries or Suspense boundaries
  - Do NOT add new visual elements not in the original page

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Audit task — read file, grep for issues, potentially zero changes.
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `next-best-practices`: Not needed for class audit

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 15, 17, 18)
  - **Blocks**: None
  - **Blocked By**: Tasks 2, 13 (tokens and parlamentar card updates)

  **References**:

  **Pattern References**:
  - `src/app/busca/page.tsx:1-216` — Full file to audit. Search for hex patterns and non-token classes.

  **Acceptance Criteria**:
  - [ ] No hardcoded hex colors in busca/page.tsx
  - [ ] Audit documented (even if result is "no changes needed")
  - [ ] File compiles without errors

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Busca page has no hardcoded colors
    Tool: Bash (grep)
    Preconditions: busca/page.tsx audited
    Steps:
      1. Run `grep -nE "#[0-9a-fA-F]{3,8}" src/app/busca/page.tsx` — no hex colors
      2. Run `grep -n "bg-zinc\|bg-gray\|bg-slate" src/app/busca/page.tsx` — check for non-semantic colors
    Expected Result: Step 1 returns empty. Step 2 returns empty or only semantic uses.
    Failure Indicators: Hardcoded hex or non-semantic color class
    Evidence: .sisyphus/evidence/task-16-busca-audit.txt
  ```

  **Commit**: YES (groups with Wave 4 — only if changes were made)
  - Message: `style(pages): update remaining pages and opengraph image`
  - Files: `src/app/busca/page.tsx` (if modified)

- [x] 17. Parlamentar Detail Pages Verification (deputados/[slug]/page.tsx + senadores/[slug]/page.tsx)

  **What to do**:
  - Open `src/app/deputados/[slug]/page.tsx` and `src/app/senadores/[slug]/page.tsx`
  - **Audit both files** for hardcoded colors — these pages are nearly identical in structure
  - Both pages primarily render StatCard (updated in T12), ParlamentarHeader (verified in T13), VotingHistoryCard (updated in T14)
  - Verify the container/wrapper divs use token classes (`bg-card`, `border-border`, etc.)
  - These pages likely need ZERO direct changes since their visual appearance comes from child components updated in earlier tasks
  - If any hardcoded colors found, update them to token classes

  **Must NOT do**:
  - Do NOT change dynamic route params handling or generateMetadata
  - Do NOT modify tRPC data fetching
  - Do NOT restructure the page layout
  - Do NOT change Suspense boundaries

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Two nearly-identical pages to audit. Likely zero changes needed.
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `next-best-practices`: Not needed for class audit

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 15, 16, 18)
  - **Blocks**: None
  - **Blocked By**: Tasks 2, 12 (tokens and stat card updates)

  **References**:

  **Pattern References**:
  - `src/app/deputados/[slug]/page.tsx:1-117` — Full file to audit.
  - `src/app/senadores/[slug]/page.tsx:1-118` — Full file to audit. Nearly identical to deputados.

  **Acceptance Criteria**:
  - [ ] No hardcoded hex colors in either file
  - [ ] Audit documented for both files
  - [ ] Both files compile without errors

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Parlamentar detail pages have no hardcoded colors
    Tool: Bash (grep)
    Preconditions: both pages audited
    Steps:
      1. Run `grep -nE "#[0-9a-fA-F]{3,8}" src/app/deputados/\[slug\]/page.tsx`
      2. Run `grep -nE "#[0-9a-fA-F]{3,8}" src/app/senadores/\[slug\]/page.tsx`
    Expected Result: Both return empty
    Failure Indicators: Any hardcoded hex found
    Evidence: .sisyphus/evidence/task-17-parlamentar-pages.txt
  ```

  **Commit**: YES (groups with Wave 4 — only if changes were made)
  - Message: `style(pages): update remaining pages and opengraph image`
  - Files: `src/app/deputados/[slug]/page.tsx`, `src/app/senadores/[slug]/page.tsx` (if modified)

- [x] 18. Votação Detail Page Verification (votacoes/[id]/page.tsx + test)

  **What to do**:
  - Open `src/app/votacoes/[id]/page.tsx`
  - **Audit for hardcoded colors** — this page uses `bg-muted/50` for the proposição box (token-based, fine), VotoBadge (updated in T6), StatCard (updated in T12), DataTable
  - Verify all class names are token-based
  - Check the proposição section: `bg-muted/50` is correct with new tokens since `--muted` was updated in T2
  - Open `src/app/votacoes/[id]/__tests__/page.test.tsx`
  - **Verify tests pass** — tests mock all components and assert on text content/structure, NOT CSS classes. Run `npx jest src/app/votacoes/\\[id\\]/__tests__/page.test.tsx` to confirm.
  - This page likely needs ZERO direct changes

  **Must NOT do**:
  - Do NOT change tRPC data fetching or vote counting logic
  - Do NOT modify DataTable component (it's a generic data display component)
  - Do NOT restructure the page layout
  - Do NOT change Suspense boundaries or error handling

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Audit task with test verification. Likely zero changes.
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `next-best-practices`: Not needed for audit
    - `systematic-debugging`: Not needed unless tests fail unexpectedly

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 15, 16, 17)
  - **Blocks**: None
  - **Blocked By**: Tasks 2, 6, 12, 14 (tokens, vote badge, stat card, votação cards)

  **References**:

  **Pattern References**:
  - `src/app/votacoes/[id]/page.tsx:1-168` — Full file to audit.

  **Test References**:
  - `src/app/votacoes/[id]/__tests__/page.test.tsx:1-211` — Comprehensive tests mocking tRPC, asserting text content and component rendering. Should pass without changes.

  **Acceptance Criteria**:
  - [ ] No hardcoded hex colors in votacoes/[id]/page.tsx
  - [ ] `npx jest src/app/votacoes/\\[id\\]/__tests__/page.test.tsx` → PASS
  - [ ] Audit documented

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Votação detail page has no hardcoded colors
    Tool: Bash (grep)
    Preconditions: votacoes/[id]/page.tsx audited
    Steps:
      1. Run `grep -nE "#[0-9a-fA-F]{3,8}" src/app/votacoes/\[id\]/page.tsx`
    Expected Result: Returns empty
    Failure Indicators: Any hardcoded hex found
    Evidence: .sisyphus/evidence/task-18-votacao-page.txt

  Scenario: Votação page tests pass
    Tool: Bash (jest)
    Preconditions: page audited (likely unchanged)
    Steps:
      1. Run `npx jest src/app/votacoes/\[id\]/__tests__/page.test.tsx --verbose`
    Expected Result: All tests PASS
    Failure Indicators: Any test failure
    Evidence: .sisyphus/evidence/task-18-votacao-tests.txt
  ```

  **Commit**: YES (groups with Wave 4)
  - Message: `style(pages): update remaining pages and opengraph image`
  - Files: `src/app/votacoes/[id]/page.tsx` (if modified)

---

## Final Verification Wave

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection → fix → re-run.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, grep for pattern). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `npx tsc --noEmit` + `npx jest`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check for hardcoded hex colors that should use tokens. Grep for `#09090b`, `#22c55e`, `#facc15`, `#3b82f6`, `--verde`, `--amarelo`, `--azul` — reject if found outside comments.
  Output: `Build [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start dev server. Use Playwright to navigate EVERY page: `/`, `/buscar`, `/deputados/[any]`, `/senadores/[any]`, `/votacoes/[any]`. Verify: navy background (not zinc), green accents, Space Grotesk font, CEV logo box visible, grid-bg pattern visible on hero, vote badges use correct colors. Screenshot each page. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Pages [N/N pass] | Visual [N/N] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff. Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N touching Task M's files. Flag unaccounted changes. Verify NO tRPC/Prisma/API files were modified.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

| Wave | Commit | Message | Files | Pre-commit |
|------|--------|---------|-------|------------|
| 1 | Yes | `style(tokens): migrate design system to Navy Civic Dark theme` | globals.css, layout.tsx, colors.ts, design-tokens.test.tsx, components.json, public/hero-bg.jpg | `npx jest src/__tests__/design-tokens.test.tsx` |
| 2 | Yes | `style(components): update core components to Navy Civic Dark` | voto-badge.tsx, voto-badge.test.tsx, section-header.tsx, header.tsx, footer.tsx, hero-search-bar.tsx | `npx jest src/components/__tests__/voto-badge.test.tsx` |
| 3 | Yes | `style(pages): redesign home page and data components` | page.tsx, page.test.tsx, stat-card.tsx, empty-state.tsx, parlamentar-card.tsx, parlamentar-header.tsx, parlamentar-card.test.tsx, votacao-card.tsx, voting-history-card.tsx | `npx jest` |
| 4 | Yes | `style(pages): update remaining pages and opengraph image` | opengraph-image.tsx, busca/page.tsx, deputados/page.tsx, senadores/page.tsx, votacoes/page.tsx, votacoes/page.test.tsx | `npx jest` |

---

## Success Criteria

### Verification Commands
```bash
npx tsc --noEmit        # Expected: no errors
npx jest                 # Expected: 38 tests pass, 0 failures
npm run build            # Expected: successful build
grep -r "#09090b" src/   # Expected: no matches (except comments if any)
grep -r "--verde" src/   # Expected: no matches
grep -r "--amarelo" src/ # Expected: no matches  
grep -r "--azul" src/    # Expected: no matches
grep -r "bg-blue-500" src/components/votacao/  # Expected: no matches
```

### Final Checklist
- [ ] All "Must Have" present (navy tokens, acid green, Space fonts, grid-bg, CEV logo, // LABEL, hero-bg, glow orbs, font-mono stats, vote colors)
- [ ] All "Must NOT Have" absent (no theme toggle, no new abstractions, no new packages, no tailwind.config.ts, no backend changes, no Props changes)
- [ ] All 38 tests pass
- [ ] Zero type errors
- [ ] Successful production build
