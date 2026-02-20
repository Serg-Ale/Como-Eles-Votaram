# Como Eles Votaram — MVP Build Plan

## TL;DR

> **Quick Summary**: Build a Brazilian legislative transparency platform that surfaces public voting records, attendance, and propositions for all federal congresspeople (Câmara + Senado) in a modern dark-themed analytics UI. Core philosophy: neutral, data-driven, no editorialization — "o dado faz o confronto, não você."
>
> **Deliverables**:
> - Institutional landing page with manifesto and search
> - Parliamentarian profile pages (deputados + senadores) with voting history, propositions, and attendance (Câmara only)
> - Bill detail pages
> - Unified data layer consuming Câmara + Senado APIs
> - Dark mode UI with Brazilian flag accent colors, dashboard/analytics aesthetic
> - SEO-optimized with shareable URLs per parliamentarian
>
> **Estimated Effort**: Large
> **Parallel Execution**: YES — 4 waves
> **Critical Path**: Task 1 → Task 4 → Task 7 → Task 9 → Task 11 → Task 13

---

## Context

### Original Request
Build "Como Eles Votaram" — a platform allowing Brazilian citizens to easily access legislative voting records, attendance data, and bill information. Must be modern, elegant, inviting, and accessible to non-technical users. Purpose: help Brazilians make informed voting decisions by analyzing each candidate's actual legislative record.

### Interview Summary
**Key Discussions**:
- **Brand identity**: Deeply defined — manifesto, values (registro acima de narrativa, neutralidade ativa, transparência radical), tone (confrontador com dados, nunca acusatório), cultural DNA (football statistics analogy)
- **MVP scope**: Landing page, search, parlamentar profile, voting history, bill details, attendance (Câmara only), propositions. NO rankings, NO comparisons, NO auth
- **Data sources**: Câmara dos Deputados REST API (stable, JSON, paginated) + Senado Federal API (JSON with XML-like nesting, deprecated endpoints being replaced)
- **Design**: Dark mode ONLY, Brazilian flag colors (green/yellow/blue) as accents, dashboard/analytics style — "estatísticas de jogador" inspiration
- **Technical**: Next.js 16 App Router + API routes + ISR, pnpm, TDD with Jest + RTL, Vercel hosting
- **URLs**: Separate routes — `/deputados/[slug]` and `/senadores/[slug]`
- **Attendance**: Câmara only (Senado has no viable API endpoint)
- **Historical**: Multiple legislatures, not just current
- **i18n**: PT-BR only for MVP

### Research Findings
- **Câmara API**: RESTful, JSON `{ dados: [...], links: [...] }`, pagination via `pagina`/`itens`, endpoints for `/deputados`, `/votacoes`, `/proposicoes`. Stable, well-documented.
- **Senado API**: Old endpoints **deprecated** (shutdown date 2026-02-01 already passed but still working). New endpoints use flat arrays (`/votacao.json`, `/processo.json`). Senator listing still uses deeply nested XML-heritage JSON. Photos served over HTTP (not HTTPS).
- **Attendance**: Câmara uses bulk yearly event files, not per-deputado API. Senado has NO attendance endpoint.
- **Rate limits**: Undocumented for both APIs — must implement aggressive ISR caching.
- **Payload sizes**: Senado `/votacao.json` returns ~2.4MB — cannot fetch per request. Must cache heavily.

### Metis Review
**Identified Gaps (addressed)**:
- Senado API deprecated endpoints → Plan targets NEW endpoints
- Senado attendance data missing → Câmara-only for attendance, "dados não disponíveis" for Senado
- Senado photo HTTP→HTTPS → Handled in normalization layer
- Empty vote arrays → Show "Votação sem registro individual" (not editorializing)
- Party changes mid-legislature → Show current party with "partido atual" label
- Large Senado payloads → ISR 6h+ cache, server-side filtering
- Data freshness → 1h lists, 6h profiles, 24h historical
- API failure handling → stale-while-revalidate + visible "última atualização" timestamp

---

## Work Objectives

### Core Objective
Build a production-ready legislative transparency platform that normalizes data from two Brazilian government APIs into a unified, beautiful, neutral interface accessible to everyday citizens.

### Concrete Deliverables
- Next.js 16 application deployed to Vercel
- Landing page with manifesto, purpose explanation, search CTA
- Search functionality (by name, filterable by party/state/chamber)
- Deputado profile pages at `/deputados/[id]-[slug]`
- Senador profile pages at `/senadores/[id]-[slug]`
- Voting history per parliamentarian
- Bill detail pages at `/votacoes/[id]`
- Attendance data for deputados (Câmara only)
- Propositions authored per parliamentarian
- Full SEO (OG tags, JSON-LD, sitemap)
- WCAG AA accessibility
- Lighthouse Performance >80, Accessibility >90

### Definition of Done
- [ ] `pnpm build` succeeds with zero TypeScript errors
- [ ] `pnpm test` passes all tests (unit + integration)
- [ ] `pnpm lint` passes with zero warnings
- [ ] Lighthouse audit: Performance >80, Accessibility >90
- [ ] All pages render correctly on mobile (375px) and desktop (1440px)
- [ ] Search returns results for known parlamentar names
- [ ] Profile pages show: photo, name, party, state, voting history, propositions
- [ ] Deputado profile shows attendance data
- [ ] Senador profile shows "Dados de presença não disponíveis" for attendance
- [ ] All data has visible source attribution
- [ ] No editorialized content (no rankings, no judgment labels, no opinion)

### Must Have
- Neutral presentation of all data (registro acima de narrativa)
- Source attribution on every data point (transparência radical)
- "Última atualização" timestamps on all data
- Graceful error states ("Sem dados disponíveis" not "Sem atividade")
- Photo fallback (initials avatar when photo URL is 404)
- Responsive design (mobile-first)
- Accessible (keyboard navigation, screen reader, WCAG AA)

### Must NOT Have (Guardrails)
- NO rankings or comparisons between parliamentarians
- NO computed "judgment" fields (loyalty scores, activity ratings, alignment metrics)
- NO color-coding that implies good/bad (e.g., red for low attendance)
- NO editorialized labels ("Active"/"Inactive", "Good"/"Bad")
- NO news/context integration
- NO expense/CEAP data
- NO cross-chamber bill linking
- NO party/state aggregate pages
- NO parliamentary fronts/groups data
- NO light mode toggle (dark mode only)
- NO authentication or user accounts
- NO "Sem atividade" — use "Sem dados disponíveis" instead
- NO summarization that distorts (respect intelligence of citizen)

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO (greenfield)
- **Automated tests**: TDD (RED → GREEN → REFACTOR)
- **Framework**: Jest + React Testing Library (set up in Task 1)
- **If TDD**: Each task follows RED (failing test) → GREEN (minimal impl) → REFACTOR

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright — Navigate, interact, assert DOM, screenshot
- **API/Backend**: Use Bash (curl) — Send requests, assert status + response fields
- **Library/Module**: Use Bash (node/bun REPL) — Import, call functions, compare output

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — foundation):
├── Task 1: Project scaffolding + tooling config [deep]
├── Task 2: Design system tokens + dark theme [visual-engineering]
└── Task 3: Unified type definitions + Zod schemas [deep]

Wave 2 (After Wave 1 — API services, MAX PARALLEL):
├── Task 4: Câmara API service layer (depends: 1, 3) [deep]
├── Task 5: Senado API service layer (depends: 1, 3) [deep]
└── Task 6: Search service + utilities (depends: 1, 3) [quick]

Wave 3 (After Wave 2 — API routes + pages):
├── Task 7: Next.js API Route Handlers (depends: 4, 5, 6) [deep]
├── Task 8: Reusable UI components library (depends: 2) [visual-engineering]
├── Task 9: Landing page (depends: 2, 8) [visual-engineering]
├── Task 10: Search page + results (depends: 7, 8) [visual-engineering]
├── Task 11: Deputado profile page (depends: 7, 8) [visual-engineering]
├── Task 12: Senador profile page (depends: 7, 8) [visual-engineering]
└── Task 13: Bill/Votação detail page (depends: 7, 8) [visual-engineering]

Wave 4 (After Wave 3 — polish + SEO + final QA):
├── Task 14: SEO + metadata + sitemap (depends: 11, 12, 13) [unspecified-high]
├── Task 15: Error states + loading states + empty states (depends: 11, 12, 13) [visual-engineering]
└── Task 16: Performance optimization + final polish (depends: 14, 15) [deep]

Wave FINAL (After ALL tasks — independent review, 4 parallel):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high)
└── Task F4: Scope fidelity check (deep)

Critical Path: Task 1 → Task 4 → Task 7 → Task 11 → Task 14 → Task 16 → F1-F4
Parallel Speedup: ~55% faster than sequential
Max Concurrent: 7 (Wave 3)
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| 1 | — | 4, 5, 6, 7 | 1 |
| 2 | — | 8, 9 | 1 |
| 3 | — | 4, 5, 6 | 1 |
| 4 | 1, 3 | 7 | 2 |
| 5 | 1, 3 | 7 | 2 |
| 6 | 1, 3 | 7 | 2 |
| 7 | 4, 5, 6 | 10, 11, 12, 13 | 3 |
| 8 | 2 | 9, 10, 11, 12, 13 | 3 |
| 9 | 2, 8 | — | 3 |
| 10 | 7, 8 | — | 3 |
| 11 | 7, 8 | 14, 15 | 3 |
| 12 | 7, 8 | 14, 15 | 3 |
| 13 | 7, 8 | 14, 15 | 3 |
| 14 | 11, 12, 13 | 16 | 4 |
| 15 | 11, 12, 13 | 16 | 4 |
| 16 | 14, 15 | F1-F4 | 4 |

### Agent Dispatch Summary

- **Wave 1**: **3 tasks** — T1 → `deep`, T2 → `visual-engineering`, T3 → `deep`
- **Wave 2**: **3 tasks** — T4 → `deep`, T5 → `deep`, T6 → `quick`
- **Wave 3**: **7 tasks** — T7 → `deep`, T8 → `visual-engineering`, T9 → `visual-engineering`, T10 → `visual-engineering`, T11 → `visual-engineering`, T12 → `visual-engineering`, T13 → `visual-engineering`
- **Wave 4**: **3 tasks** — T14 → `unspecified-high`, T15 → `visual-engineering`, T16 → `deep`
- **FINAL**: **4 tasks** — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

> Implementation + Test = ONE Task. Never separate.
> EVERY task MUST have: Recommended Agent Profile + Parallelization info + QA Scenarios.
> **A task WITHOUT QA Scenarios is INCOMPLETE. No exceptions.**

- [ ] 1. Project Scaffolding + Tooling Config

  **What to do**:
  - Initialize Next.js 16 project with `pnpm create next-app@latest` (App Router, TypeScript, Tailwind v4, ESLint)
  - Configure `tsconfig.json` with strict mode, path aliases (`@/` → `src/`)
  - Set up Jest + React Testing Library + `jest.config.ts` + `jest.setup.ts` (with jsdom, Next.js SWC transform)
  - Configure ESLint: `eslint-plugin-simple-import-sort`, strict rules, no default exports rule (except `page.tsx`/`layout.tsx`/`route.ts`)
  - Set up Prettier (`.prettierrc`)
  - Set up Husky + lint-staged + Commitlint (conventional commits)
  - Install core dependencies: `zod@^3.24`, `@tanstack/react-query`, shadcn/ui init (dark mode, neutral base)
  - Create folder structure skeleton: `src/app/`, `src/components/`, `src/lib/`, `src/types/`, `src/styles/`
  - Add `.env.example` with API base URLs:
    ```
    CAMARA_API_BASE=https://dadosabertos.camara.leg.br/api/v2
    SENADO_API_BASE=https://legis.senado.leg.br/dadosabertos
    ```
  - Write a smoke test: `src/__tests__/setup.test.ts` — verifies Jest runs, React renders a `<div>Hello</div>`
  - Verify: `pnpm build`, `pnpm test`, `pnpm lint` all pass with zero errors

  **Must NOT do**:
  - Do NOT add any page content beyond the default Next.js page
  - Do NOT install libraries for future features (charts, animations)
  - Do NOT configure deployment or CI/CD
  - Do NOT set up any API routes yet

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Multiple config files, dependency resolution, tooling integration requires methodical setup
  - **Skills**: [`next-best-practices`]
    - `next-best-practices`: Next.js 16 file conventions, App Router config, tsconfig patterns
  - **Skills Evaluated but Omitted**:
    - `vercel-react-best-practices`: Not needed yet — performance optimization is Task 16
    - `playwright`: Not needed — no UI to test at this stage

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 2, 3)
  - **Parallel Group**: Wave 1 (with Tasks 2, 3)
  - **Blocks**: Tasks 4, 5, 6
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - Sérgio's global AGENTS.md (`/home/lxndr/.config/opencode/AGENTS.md`) — Import order conventions, named export rules, kebab-case files, Commitlint setup, strict TypeScript
  - Union Audio MVP at `/home/lxndr/Projects/Work/mvp-union-audio-frontend` — Reference for Jest config, ESLint config, Husky setup, folder structure. Look at `jest.config.ts`, `.eslintrc`, `tsconfig.json`, `package.json` scripts section.

  **API/Type References**:
  - Câmara API base: `https://dadosabertos.camara.leg.br/api/v2/`
  - Senado API base: `https://legis.senado.leg.br/dadosabertos/`

  **External References**:
  - Next.js 16 docs (use `next-best-practices` skill for file conventions)
  - shadcn/ui init: `pnpm dlx shadcn@latest init` — select "new-york" style, slate base, dark mode default
  - Tailwind v4 uses CSS-based config, NOT `tailwind.config.ts`

  **Acceptance Criteria**:

  - [ ] `pnpm build` exits 0
  - [ ] `pnpm test` exits 0, at least 1 test passes
  - [ ] `pnpm lint` exits 0 with zero warnings
  - [ ] `tsconfig.json` has `"strict": true` and path alias `"@/*": ["./src/*"]`
  - [ ] Folder structure exists: `src/app/`, `src/components/`, `src/lib/`, `src/types/`
  - [ ] `.env.example` exists with both API base URLs
  - [ ] Commitlint rejects non-conventional commit messages
  - [ ] ESLint rejects default exports on non-page files

  **QA Scenarios**:

  ```
  Scenario: Build succeeds on clean project
    Tool: Bash
    Preconditions: Fresh project, all deps installed
    Steps:
      1. Run `pnpm build`
      2. Check exit code is 0
      3. Verify `.next/` directory was created
    Expected Result: Build completes with exit code 0, `.next/` exists
    Failure Indicators: Non-zero exit code, TypeScript errors in output
    Evidence: .sisyphus/evidence/task-1-build-success.txt

  Scenario: Tests pass with Jest
    Tool: Bash
    Preconditions: Jest configured, smoke test written
    Steps:
      1. Run `pnpm test -- --verbose`
      2. Check output contains "1 passed" (or more)
      3. Check exit code is 0
    Expected Result: At least 1 test passes, exit code 0
    Failure Indicators: "FAIL" in output, non-zero exit code
    Evidence: .sisyphus/evidence/task-1-tests-pass.txt

  Scenario: Lint passes with zero warnings
    Tool: Bash
    Preconditions: ESLint configured
    Steps:
      1. Run `pnpm lint`
      2. Check exit code is 0
      3. Verify no "warning" or "error" in output
    Expected Result: Clean lint, exit code 0
    Failure Indicators: Warnings or errors in output
    Evidence: .sisyphus/evidence/task-1-lint-clean.txt

  Scenario: Commitlint rejects bad commits
    Tool: Bash
    Preconditions: Husky + Commitlint configured
    Steps:
      1. Run `echo "bad message" | pnpm commitlint`
      2. Check exit code is non-zero
      3. Run `echo "feat: valid message" | pnpm commitlint`
      4. Check exit code is 0
    Expected Result: Bad message rejected, good message accepted
    Failure Indicators: Bad message accepted or good message rejected
    Evidence: .sisyphus/evidence/task-1-commitlint.txt
  ```

  **Commit**: YES
  - Message: `chore: scaffold next.js 16 project with tooling`
  - Files: `package.json`, `tsconfig.json`, `jest.config.ts`, `.eslintrc.*`, `.prettierrc`, `.husky/`, `src/`
  - Pre-commit: `pnpm build && pnpm test && pnpm lint`

- [ ] 2. Design System Tokens + Dark Theme

  **What to do**:
  - Define CSS custom properties for the full design token system in Tailwind v4 CSS config (`src/app/globals.css` or `src/styles/tokens.css`):
    - **Brand palette** (Brazilian flag accents):
      - `--verde`: Deep green (#006B3F or similar) — primary accent
      - `--amarelo`: Gold/yellow (#FFDF00 or similar) — secondary accent, CTAs
      - `--azul`: Deep blue (#00205B or similar) — tertiary accent, links
    - **Neutral scale**: Dark backgrounds (zinc-900 → zinc-950 for surfaces), zinc-400→zinc-100 for text
    - **Semantic tokens**: `--foreground`, `--background`, `--card`, `--card-foreground`, `--popover`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`
    - All mapped to shadcn/ui CSS variable convention
  - Configure shadcn/ui theme to use these tokens (dark mode only — no `.dark` class toggle needed, just set as root)
  - Create `src/lib/theme/colors.ts` — exported color constants for use in JS contexts (charts, dynamic styles)
  - Define typography scale: font sizes, line heights, font weights. Use system fonts or Inter/Plus Jakarta Sans (modern, clean)
  - Define spacing scale (consistent with Tailwind defaults)
  - Define border-radius tokens (rounded corners consistent across components)
  - Write a visual test: a Storybook-style test component `src/__tests__/design-tokens.test.tsx` that renders sample elements using every token and asserts they render without errors

  **Must NOT do**:
  - Do NOT build actual UI components (that's Task 8)
  - Do NOT add light mode or theme toggle
  - Do NOT add any animations or transitions yet
  - Do NOT use color-coding that implies good/bad (no red=bad, green=good semantic)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Design system work requires visual/design expertise
  - **Skills**: [`frontend-design`, `ui-ux-pro-max`]
    - `frontend-design`: Production-grade design tokens, creative dark themes
    - `ui-ux-pro-max`: Color palette science, typography pairings, design system architecture
  - **Skills Evaluated but Omitted**:
    - `web-design-guidelines`: Better suited for reviewing existing UI, not creating tokens
    - `frontend-ui-ux`: Overlaps with `ui-ux-pro-max`, which is more comprehensive

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 1, 3)
  - **Parallel Group**: Wave 1 (with Tasks 1, 3)
  - **Blocks**: Tasks 8, 9
  - **Blocked By**: None (can start immediately — but needs Task 1's shadcn init to be present. If running in parallel, Task 2 agent should wait for `package.json` + shadcn config to exist before writing CSS)

  **References**:

  **Pattern References**:
  - shadcn/ui theming convention: Uses CSS custom properties in `globals.css` with HSL values mapped to component slots. Use `shadcn-ui_get_component` MCP to inspect how components reference `--primary`, `--secondary`, etc.
  - Brazilian flag official colors: Verde (#009739 flag spec, adjust for dark UI contrast), Amarelo (#FFDF00), Azul (#002776)

  **API/Type References**:
  - None (design-only task)

  **External References**:
  - shadcn/ui theming: Use `shadcn-ui_get_component_metadata` MCP for `button`, `card` to see which CSS vars they consume
  - Tailwind v4 custom properties: CSS-first config, `@theme` directive in CSS files
  - Color contrast tool: Ensure all text passes WCAG AA (4.5:1 ratio minimum for normal text on dark backgrounds)

  **WHY Each Reference Matters**:
  - shadcn CSS vars are the backbone — every component reads from them, so getting tokens right here cascades everywhere
  - Brazilian flag colors need to be ADAPTED for dark backgrounds (raw flag green on zinc-950 may not pass contrast)
  - Tailwind v4 CSS-first approach means NO `tailwind.config.ts` — tokens go in CSS `@theme` blocks

  **Acceptance Criteria**:

  - [ ] `src/app/globals.css` (or equivalent) defines all semantic color tokens
  - [ ] Brand colors (verde, amarelo, azul) are defined and accessible
  - [ ] All text-on-background combinations pass WCAG AA contrast ratio (4.5:1)
  - [ ] `src/lib/theme/colors.ts` exports brand color constants
  - [ ] shadcn/ui components render correctly with the custom theme (test with `Button`, `Card`)
  - [ ] No light mode classes or toggle anywhere
  - [ ] `pnpm build` still succeeds after theme changes
  - [ ] Design tokens test passes (`pnpm test`)

  **QA Scenarios**:

  ```
  Scenario: shadcn Button renders with brand theme
    Tool: Playwright
    Preconditions: Dev server running (`pnpm dev`), theme applied
    Steps:
      1. Navigate to `http://localhost:3000`
      2. Evaluate JS: `getComputedStyle(document.documentElement).getPropertyValue('--primary')`
      3. Assert the CSS variable is defined (not empty string)
      4. Evaluate: `getComputedStyle(document.documentElement).getPropertyValue('--background')`
      5. Assert background is a dark color (HSL lightness < 15%)
    Expected Result: CSS custom properties are defined, background is dark
    Failure Indicators: CSS variables return empty strings, background is light/white
    Evidence: .sisyphus/evidence/task-2-theme-vars.png

  Scenario: Color contrast passes WCAG AA
    Tool: Bash
    Preconditions: Color tokens defined
    Steps:
      1. Extract foreground and background HSL values from globals.css
      2. Convert to relative luminance and compute contrast ratio
      3. Assert ratio >= 4.5 for body text, >= 3.0 for large text
    Expected Result: All primary text/background combos pass 4.5:1
    Failure Indicators: Any combo below 4.5:1 ratio
    Evidence: .sisyphus/evidence/task-2-contrast-check.txt

  Scenario: No light mode classes exist
    Tool: Bash
    Preconditions: Theme files created
    Steps:
      1. Run `grep -r "\.light" src/styles/ src/app/globals.css` or equivalent
      2. Run `grep -r "data-theme" src/` 
      3. Run `grep -r "theme-toggle\|ThemeToggle\|useTheme" src/`
      4. Assert all return empty (no matches)
    Expected Result: Zero matches — dark mode only, no toggle infrastructure
    Failure Indicators: Any matches found
    Evidence: .sisyphus/evidence/task-2-no-light-mode.txt
  ```

  **Commit**: YES
  - Message: `feat(ui): add design system tokens and dark theme`
  - Files: `src/app/globals.css`, `src/lib/theme/colors.ts`, `src/styles/tokens.css` (if separate)
  - Pre-commit: `pnpm build && pnpm test`

- [ ] 3. Unified Type Definitions + Zod Schemas

  **What to do**:
  - Create `src/types/parlamentar.ts` — unified `Parlamentar` type that normalizes both deputados and senadores:
    ```typescript
    type Parlamentar = {
      id: string;              // prefixed: "dep-{id}" or "sen-{id}"
      idOriginal: number;      // raw API ID
      camara: "camara" | "senado";
      nome: string;            // nome civil
      nomeCompleto: string;
      partido: string;         // partido ATUAL
      uf: string;              // sigla do estado
      foto: string;            // HTTPS URL (rewritten for Senado)
      slug: string;            // URL-safe: "nome-completo"
      email?: string;
      legislaturas: number[];
    }
    ```
  - Create `src/types/votacao.ts` — `VoteEvent` (a voting session) and `VoteRecord` (individual vote):
    ```typescript
    type VoteEvent = {
      id: string;
      data: string;            // ISO date
      descricao: string;
      proposicao?: { id: number; ementa: string };
      resultado?: string;
      camara: "camara" | "senado";
    }
    type VoteRecord = {
      parlamentarId: string;
      voto: "Sim" | "Não" | "Abstenção" | "Obstrução" | "Art. 17" | "Não Votou";
      votacaoId: string;
      data: string;
    }
    ```
  - Create `src/types/proposicao.ts` — `Proposicao` (bill/proposition):
    ```typescript
    type Proposicao = {
      id: number;
      tipo: string;            // PL, PEC, PLP, etc.
      numero: number;
      ano: number;
      ementa: string;
      dataApresentacao: string;
      urlInteiro?: string;
      camara: "camara" | "senado";
    }
    ```
  - Create `src/types/presenca.ts` — `Presenca` (attendance, Câmara only):
    ```typescript
    type Presenca = {
      parlamentarId: string;
      totalSessoes: number;
      presencas: number;
      ausencias: number;
      ausenciasJustificadas: number;
      periodo: { inicio: string; fim: string };
    }
    ```
  - Create `src/types/index.ts` — barrel export of all types
  - Create `src/lib/schemas/` with Zod schemas for EVERY type above — used for runtime API response validation:
    - `src/lib/schemas/parlamentar.schema.ts` — `ParlamentarSchema` (with `.parse()` usage)
    - `src/lib/schemas/votacao.schema.ts` — `VoteEventSchema`, `VoteRecordSchema`
    - `src/lib/schemas/proposicao.schema.ts` — `ProposicaoSchema`
    - `src/lib/schemas/presenca.schema.ts` — `PresencaSchema`
    - `src/lib/schemas/index.ts` — barrel export
  - Create Zod schemas for RAW API responses (before normalization):
    - `src/lib/schemas/camara-raw.schema.ts` — Schemas matching `{ dados: [...], links: [...] }` wrapper and specific endpoint shapes
    - `src/lib/schemas/senado-raw.schema.ts` — Schemas matching Senado's nested XML-heritage JSON structures
  - Write unit tests for every schema: valid data passes, invalid data is rejected, edge cases (empty strings, missing optional fields, unknown vote types)
  - ALL types use `export type` (named exports, not default)

  **Must NOT do**:
  - Do NOT write API fetch logic (that's Tasks 4-5)
  - Do NOT write normalization/transformation functions (that's Tasks 4-5)
  - Do NOT add fields for computed metrics (scores, percentages, ratings)
  - Do NOT add ranking/comparison types

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Type system design requires careful data modeling, Zod schema precision, and thorough test coverage
  - **Skills**: []
    - No special skills needed — pure TypeScript + Zod work
  - **Skills Evaluated but Omitted**:
    - `next-best-practices`: Not relevant — no Next.js APIs or routing here

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 1, 2)
  - **Parallel Group**: Wave 1 (with Tasks 1, 2)
  - **Blocks**: Tasks 4, 5, 6
  - **Blocked By**: None (can start immediately — types don't depend on project scaffold if agent creates files standalone)

  **References**:

  **Pattern References**:
  - Sérgio's Zod preference: `type X = z.infer<typeof XSchema>` — derive types FROM schemas, not duplicate
  - Sérgio's AGENTS.md: "No implicit any", strict TypeScript

  **API/Type References**:
  - Câmara `/deputados` response shape: `{ dados: [{ id, nome, siglaPartido, siglaUf, uriPartido, urlFoto, email, ... }], links: [...] }`
  - Câmara `/deputados/{id}` response: `{ dados: { id, nomeCivil, cpf, dataNascimento, ... ultimoStatus: { siglaPartido, siglaUf, nomeEleitoral, urlFoto, ... } } }`
  - Câmara `/votacoes/{id}/votos` response: `{ dados: [{ deputado_: { id, nome, siglaPartido, siglaUf, urlFoto, uri }, tipoVoto }] }`
  - Senado senator listing: `ListaParlamentarEmExercicio.Parlamentares.Parlamentar[].IdentificacaoParlamentar.{NomeParlamentar, SiglaPartidoParlamentar, UfParlamentar, UrlFotoParlamentar, CodigoParlamentar, EmailParlamentar}`
  - Senado `/votacao.json` response shape (new flat endpoint): Array of vote sessions with inline senators
  - Vote types (Câmara): `"Sim"`, `"Não"`, `"Abstenção"`, `"Obstrução"`, `"Art. 17"`, plus absent (no vote record exists)

  **External References**:
  - Zod v3 docs: `z.object()`, `z.enum()`, `z.union()`, `z.optional()`, `z.array()`

  **WHY Each Reference Matters**:
  - Câmara and Senado have COMPLETELY different response shapes — raw schemas must match each API's exact structure
  - The unified `Parlamentar` type is the KEY abstraction — it bridges both APIs into one interface
  - Zod schemas serve double duty: runtime validation + TypeScript type inference

  **Acceptance Criteria**:

  - [ ] All type files exist in `src/types/` with barrel export
  - [ ] All Zod schemas exist in `src/lib/schemas/` with barrel export
  - [ ] Types are derived from schemas: `type X = z.infer<typeof XSchema>`
  - [ ] No computed/judgment fields exist (no scores, ratings, percentages)
  - [ ] All schemas have unit tests (valid + invalid + edge cases)
  - [ ] `pnpm test` passes all schema tests
  - [ ] `pnpm tsc --noEmit` passes with zero errors

  **QA Scenarios**:

  ```
  Scenario: Zod schemas validate real Câmara API structure
    Tool: Bash
    Preconditions: Schemas written, test file exists
    Steps:
      1. Run `pnpm test src/lib/schemas/ --verbose`
      2. Check all tests pass
      3. Verify test count >= 15 (at least 3 per schema type)
    Expected Result: All schema tests pass, covering valid data, invalid data, and edge cases
    Failure Indicators: Any test failures, fewer than 15 tests
    Evidence: .sisyphus/evidence/task-3-schema-tests.txt

  Scenario: Invalid vote type is rejected
    Tool: Bash
    Preconditions: VoteRecord schema exists
    Steps:
      1. In test: call `VoteRecordSchema.parse({ voto: "Invalido", ... })`
      2. Assert it throws ZodError
      3. Verify error message mentions invalid enum value
    Expected Result: ZodError thrown for invalid vote type
    Failure Indicators: Parse succeeds with invalid data
    Evidence: .sisyphus/evidence/task-3-invalid-vote.txt

  Scenario: Barrel exports work correctly
    Tool: Bash
    Preconditions: All type/schema files exist
    Steps:
      1. Create temp file importing from `@/types` and `@/lib/schemas`
      2. Run `pnpm tsc --noEmit` to verify imports resolve
      3. Assert zero errors
    Expected Result: All exports accessible via barrel imports
    Failure Indicators: Import resolution errors
    Evidence: .sisyphus/evidence/task-3-barrel-exports.txt
  ```

  **Commit**: YES
  - Message: `feat(types): add unified types and zod schemas for legislative data`
  - Files: `src/types/*.ts`, `src/lib/schemas/*.ts`, `src/__tests__/schemas/`
  - Pre-commit: `pnpm tsc --noEmit && pnpm test`

- [ ] 4. Câmara API Service Layer

  **What to do**:
  - Create `src/lib/api/camara/client.ts` — HTTP client for Câmara API:
    - Base URL from env: `process.env.CAMARA_API_BASE || "https://dadosabertos.camara.leg.br/api/v2"`
    - Generic fetch wrapper with: timeout (10s), error handling, JSON parsing, Zod validation using raw schemas
    - Pagination helper: auto-paginate through `links[rel="next"]` or `pagina` param
    - Rate limiting awareness: retry with backoff on 429
  - Create `src/lib/api/camara/deputados.ts` — Deputado-specific service:
    - `listarDeputados(params?: { legislatura?, siglaPartido?, siglaUf?, pagina?, itens? })` → `Parlamentar[]`
    - `obterDeputado(id: number)` → `Parlamentar` (detailed profile)
    - `obterVotacoesDeputado(id: number)` → `VoteRecord[]` (fetches voting events + individual votes)
    - `obterProposicoesDeputado(id: number)` → `Proposicao[]`
    - Each function: fetches raw data → validates with raw Zod schema → transforms to unified types
  - Create `src/lib/api/camara/votacoes.ts` — Votação-specific service:
    - `listarVotacoes(params?: { dataInicio?, dataFim?, pagina?, itens? })` → `VoteEvent[]`
    - `obterVotacao(id: string)` → `VoteEvent` with full details
    - `obterVotosDaVotacao(votacaoId: string)` → `VoteRecord[]` (individual votes per voting session)
    - Handle empty `dados: []` responses gracefully (symbolic votes without individual records)
  - Create `src/lib/api/camara/presenca.ts` — Attendance service:
    - `obterPresencaDeputado(id: number, ano?: number)` → `Presenca`
    - Note: This may need to fetch from bulk yearly event files, not a clean per-deputado endpoint
    - If bulk file approach is needed, document the strategy clearly
  - Create `src/lib/api/camara/proposicoes.ts` — Proposição service:
    - `obterProposicao(id: number)` → `Proposicao` (single bill detail)
  - Create `src/lib/api/camara/index.ts` — barrel export
  - Create `src/lib/api/camara/transformers.ts` — functions to transform raw Câmara API shapes into unified types:
    - `transformDeputado(raw: CamaraDeputadoRaw): Parlamentar`
    - `transformVotacao(raw: CamaraVotacaoRaw): VoteEvent`
    - `transformVoto(raw: CamaraVotoRaw): VoteRecord`
    - `transformProposicao(raw: CamaraProposicaoRaw): Proposicao`
    - Photo URL: use `https://www.camara.leg.br/internet/deputado/bandep/{id}.jpg` (more reliable than API-provided URL)
    - Slug generation: `nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")`
  - Write unit tests for EVERY function: mock `fetch`, validate transforms, test error handling, test empty data responses, test pagination

  **Must NOT do**:
  - Do NOT add caching logic here (ISR handles caching in API routes, Task 7)
  - Do NOT add Senado API code (that's Task 5)
  - Do NOT compute aggregates, scores, or rankings
  - Do NOT store data in any database

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Complex API integration with pagination, error handling, data transformation, and thorough mocking/testing
  - **Skills**: []
    - No special skills needed — pure TypeScript API client work
  - **Skills Evaluated but Omitted**:
    - `next-best-practices`: Not relevant — this is a library module, not a Next.js page/route

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 5, 6)
  - **Parallel Group**: Wave 2 (with Tasks 5, 6)
  - **Blocks**: Task 7
  - **Blocked By**: Tasks 1, 3

  **References**:

  **Pattern References**:
  - Task 3's Zod schemas (raw + unified) — import and use for validation
  - Slug generation pattern: normalize accented characters, lowercase, hyphenate

  **API/Type References**:
  - Câmara API v2 docs: `https://dadosabertos.camara.leg.br/swagger/api.html`
  - Pagination: `{ dados: [...], links: [{ rel: "self"|"next"|"prev"|"last", href: "..." }] }`
  - Deputado endpoint: `GET /deputados?siglaPartido=PT&siglaUf=SP&pagina=1&itens=100`
  - Deputado detail: `GET /deputados/{id}` — returns `ultimoStatus` nested object
  - Votações: `GET /votacoes?dataInicio=2023-01-01&dataFim=2023-12-31`
  - Votos individuais: `GET /votacoes/{id}/votos` — may return empty `dados: []`
  - Photo URL pattern: `https://www.camara.leg.br/internet/deputado/bandep/{id}.jpg`
  - Proposições do deputado: `GET /deputados/{id}/proposicoes`

  **External References**:
  - Zod `.parse()` vs `.safeParse()` — use `.safeParse()` for API responses to handle gracefully

  **WHY Each Reference Matters**:
  - The Câmara API pagination through `links` array is non-standard — must follow `rel="next"` URLs, not just increment page number
  - Photo URLs from `/deputados` endpoint are unreliable — the `bandep/{id}.jpg` pattern is more stable
  - Empty `dados: []` in votos is COMMON (committee votes, symbolic votes) — must handle without throwing

  **Acceptance Criteria**:

  - [ ] All service files exist in `src/lib/api/camara/`
  - [ ] `listarDeputados()` returns `Parlamentar[]` with correct field mapping
  - [ ] `obterVotacoesDeputado(id)` returns `VoteRecord[]`
  - [ ] Empty `dados: []` returns empty array (not error)
  - [ ] Transformer functions correctly map Câmara fields to unified types
  - [ ] Slug generation handles accented characters (e.g., "José" → "jose")
  - [ ] Photo URL uses bandep pattern
  - [ ] All functions have unit tests with mocked fetch
  - [ ] `pnpm test src/lib/api/camara/` passes all tests

  **QA Scenarios**:

  ```
  Scenario: Fetch real deputados list (integration test)
    Tool: Bash
    Preconditions: Internet access, no rate limiting
    Steps:
      1. Run a test script that calls `listarDeputados({ itens: 5 })`
      2. Assert result is array of length 5
      3. Assert each item has: id, nome, partido, uf, foto, slug
      4. Assert foto URL starts with "https://"
      5. Assert slug contains no spaces or accented characters
    Expected Result: 5 Parlamentar objects with all required fields
    Failure Indicators: Network error, validation failure, missing fields
    Evidence: .sisyphus/evidence/task-4-real-deputados.txt

  Scenario: Handle empty votos gracefully
    Tool: Bash
    Preconditions: Mock fetch returning `{ dados: [], links: [] }`
    Steps:
      1. Run test calling `obterVotosDaVotacao("fake-id")` with mocked empty response
      2. Assert result is empty array `[]`
      3. Assert no error thrown
    Expected Result: Empty array returned, no errors
    Failure Indicators: Error thrown, undefined returned
    Evidence: .sisyphus/evidence/task-4-empty-votos.txt

  Scenario: Pagination fetches all pages
    Tool: Bash
    Preconditions: Mock fetch with 3 pages of data (links with rel="next")
    Steps:
      1. Run pagination test with mock returning 3 pages
      2. Assert final result combines all 3 pages
      3. Assert fetch was called 3 times
    Expected Result: All pages aggregated into single result array
    Failure Indicators: Only first page returned, infinite loop
    Evidence: .sisyphus/evidence/task-4-pagination.txt
  ```

  **Commit**: YES
  - Message: `feat(api): add câmara dos deputados api service layer`
  - Files: `src/lib/api/camara/*.ts`, `src/__tests__/api/camara/`
  - Pre-commit: `pnpm tsc --noEmit && pnpm test`

- [ ] 5. Senado API Service Layer

  **What to do**:
  - Create `src/lib/api/senado/client.ts` — HTTP client for Senado API:
    - Base URL from env: `process.env.SENADO_API_BASE || "https://legis.senado.leg.br/dadosabertos"`
    - Generic fetch wrapper with: timeout (15s — Senado is slower), error handling, JSON parsing
    - Handle the 2.4MB `/votacao.json` response — this endpoint returns ALL votes, not paginated
    - Retry with backoff (Senado API is less stable than Câmara)
  - Create `src/lib/api/senado/senadores.ts` — Senator listing service:
    - `listarSenadores()` → `Parlamentar[]`
    - Handles deeply nested response: `ListaParlamentarEmExercicio.Parlamentares.Parlamentar[].IdentificacaoParlamentar`
    - Photo URL rewriting: HTTP → HTTPS (`http://www.senado.leg.br/...` → `https://www.senado.leg.br/...`)
    - Slug generation (same pattern as Câmara)
  - Create `src/lib/api/senado/votacoes.ts` — Senado voting service:
    - `listarVotacoesSenado()` → `VoteEvent[]` (from new `/votacao.json` endpoint)
    - `obterVotosSenador(senadorId: number)` → `VoteRecord[]` (filter from bulk data)
    - Must handle the massive payload: parse once, filter by senator
  - Create `src/lib/api/senado/proposicoes.ts` — Senado propositions:
    - `obterProposicoesSenador(senadorId: number)` → `Proposicao[]`
    - Use `/processo.json` or legacy endpoints as available
  - Create `src/lib/api/senado/transformers.ts` — transform Senado raw shapes to unified types:
    - `transformSenador(raw: SenadoSenadorRaw): Parlamentar` — unwrap nested XML-heritage JSON
    - `transformVotacaoSenado(raw: SenadoVotacaoRaw): VoteEvent`
    - `transformVotoSenado(raw: SenadoVotoRaw): VoteRecord`
    - Photo URL: force HTTPS protocol
    - ID prefix: `"sen-{CodigoParlamentar}"`
  - Create `src/lib/api/senado/index.ts` — barrel export
  - Write unit tests for ALL functions: mock the deeply nested responses, test photo URL rewriting, test empty/missing data, test massive payload handling
  - **CRITICAL**: Senado API is in transition (old endpoints deprecated). If an endpoint fails at runtime, the service should log a warning and return empty data with a `source: "unavailable"` indicator — NOT crash

  **Must NOT do**:
  - Do NOT add Câmara API code (that's Task 4)
  - Do NOT add attendance/presença for Senado (no endpoint exists)
  - Do NOT compute aggregates or rankings
  - Do NOT cache responses here (ISR in Task 7)

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Complex nested API with deprecated endpoints, massive payloads, and protocol rewriting requires careful handling
  - **Skills**: []
    - No special skills needed
  - **Skills Evaluated but Omitted**:
    - `systematic-debugging`: Useful if issues arise but not needed proactively

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 4, 6)
  - **Parallel Group**: Wave 2 (with Tasks 4, 6)
  - **Blocks**: Task 7
  - **Blocked By**: Tasks 1, 3

  **References**:

  **Pattern References**:
  - Task 4's client pattern (`src/lib/api/camara/client.ts`) — follow same structure for consistency
  - Task 3's raw schemas (`senado-raw.schema.ts`) — use for validation

  **API/Type References**:
  - Senator listing: `GET /senador/lista/atual.json` → `ListaParlamentarEmExercicio.Parlamentares.Parlamentar[]`
  - Each senator: `.IdentificacaoParlamentar.{NomeParlamentar, SiglaPartidoParlamentar, UfParlamentar, UrlFotoParlamentar, CodigoParlamentar, EmailParlamentar}`
  - Senado voting (new): `GET /votacao.json` → flat array of vote sessions (~2.4MB)
  - Senado processes: `GET /processo.json` → propositions
  - Photo URL example: `http://www.senado.leg.br/senadores/img/fotos-oficiais/senador{id}.jpg` (note: HTTP not HTTPS)

  **External References**:
  - Senado API docs: `https://legis.senado.leg.br/dadosabertos/docs/` (may be incomplete due to transition)

  **WHY Each Reference Matters**:
  - Senado's XML-heritage JSON nesting is 4-5 levels deep — transformers must carefully unwrap without assumptions about structure
  - Photo HTTP→HTTPS rewriting is mandatory (mixed content blocked by browsers)
  - The `/votacao.json` 2.4MB payload CANNOT be fetched on every request — must be cached server-side (ISR in Task 7)
  - Deprecated endpoint fallbacks are critical for resilience during Senado's API transition

  **Acceptance Criteria**:

  - [ ] All service files exist in `src/lib/api/senado/`
  - [ ] `listarSenadores()` returns `Parlamentar[]` with correct field mapping
  - [ ] Photo URLs are HTTPS (not HTTP)
  - [ ] Transformer unwraps nested Senado JSON correctly
  - [ ] Graceful handling when endpoint is down (returns empty data, not crash)
  - [ ] ID prefix is `"sen-{id}"` (not raw number)
  - [ ] All functions have unit tests with mocked responses
  - [ ] `pnpm test src/lib/api/senado/` passes all tests

  **QA Scenarios**:

  ```
  Scenario: Transform nested Senado senator response
    Tool: Bash
    Preconditions: Mock with real Senado nested structure
    Steps:
      1. Run test with mock `ListaParlamentarEmExercicio.Parlamentares.Parlamentar[0]`
      2. Assert transformed result has flat structure: { id: "sen-XXX", nome, partido, uf, foto }
      3. Assert foto starts with "https://"
      4. Assert id starts with "sen-"
    Expected Result: Flat Parlamentar object with correct prefixed ID and HTTPS photo
    Failure Indicators: Nested structure leaked, HTTP photo URL, unprefixed ID
    Evidence: .sisyphus/evidence/task-5-senado-transform.txt

  Scenario: Senado endpoint failure returns empty data
    Tool: Bash
    Preconditions: Mock fetch that throws network error
    Steps:
      1. Mock fetch to throw `TypeError: Failed to fetch`
      2. Call `listarSenadores()`
      3. Assert returns empty array (not thrown error)
      4. Assert warning was logged
    Expected Result: Empty array returned, warning logged, no crash
    Failure Indicators: Unhandled exception, undefined returned
    Evidence: .sisyphus/evidence/task-5-senado-fallback.txt

  Scenario: Photo URL rewriting from HTTP to HTTPS
    Tool: Bash
    Preconditions: Mock data with HTTP photo URLs
    Steps:
      1. Mock senator with `UrlFotoParlamentar: "http://www.senado.leg.br/..."`
      2. Transform to Parlamentar
      3. Assert `foto` field starts with "https://"
    Expected Result: Photo URL protocol rewritten to HTTPS
    Failure Indicators: Photo URL still starts with "http://"
    Evidence: .sisyphus/evidence/task-5-photo-https.txt
  ```

  **Commit**: YES
  - Message: `feat(api): add senado federal api service layer`
  - Files: `src/lib/api/senado/*.ts`, `src/__tests__/api/senado/`
  - Pre-commit: `pnpm tsc --noEmit && pnpm test`

- [ ] 6. Search Service + Slug Utilities

  **What to do**:
  - Create `src/lib/search/search-service.ts` — unified search across both chambers:
    - `buscarParlamentares(query: string, filters?: { partido?, uf?, camara?: "camara"|"senado" })` → `Parlamentar[]`
    - Combines results from Câmara + Senado services
    - Client-side fuzzy matching on name (handle accented characters: "jose" matches "José")
    - Filter by: party (siglaPartido), state (uf), chamber
    - Sort results: exact match first, then startsWith, then contains
    - Debouncing is NOT in this service (that's a UI concern)
  - Create `src/lib/utils/slug.ts` — slug generation utilities:
    - `generateSlug(nome: string): string` — URL-safe slug from name
    - `normalizeForSearch(text: string): string` — accent-stripped lowercase for matching
    - Handle edge cases: multiple spaces, special characters, empty strings
  - Create `src/lib/utils/format.ts` — formatting utilities:
    - `formatDate(dateString: string): string` — format ISO date to "DD/MM/YYYY" (Brazilian format)
    - `formatDateRelative(dateString: string): string` — "há 3 dias", "há 1 mês" (for "última atualização")
    - `formatVoteType(voto: string): string` — display-friendly vote labels (passthrough, but validates known types)
  - Create `src/lib/utils/index.ts` — barrel export
  - Write unit tests: search ranking accuracy, accent handling, slug generation edge cases, date formatting

  **Must NOT do**:
  - Do NOT implement API calls (those come from Tasks 4-5)
  - Do NOT add search autocomplete or suggestions
  - Do NOT add search history or recent searches
  - Do NOT add ranking or scoring logic

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Utility functions with clear inputs/outputs, minimal complexity
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - All skills irrelevant for utility function writing

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 4, 5)
  - **Parallel Group**: Wave 2 (with Tasks 4, 5)
  - **Blocks**: Task 7
  - **Blocked By**: Tasks 1, 3

  **References**:

  **Pattern References**:
  - Task 3's `Parlamentar` type — search returns this type
  - Portuguese accent normalization: `text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")`

  **API/Type References**:
  - `Parlamentar` from `src/types/parlamentar.ts`

  **External References**:
  - JavaScript `Intl.DateTimeFormat` for locale-aware date formatting (`pt-BR`)
  - `String.prototype.normalize("NFD")` for accent stripping

  **WHY Each Reference Matters**:
  - Brazilian names are heavily accented (José, João, Cláudio) — search MUST handle accent-insensitive matching
  - Date formatting must use DD/MM/YYYY (Brazilian convention), not MM/DD/YYYY

  **Acceptance Criteria**:

  - [ ] `buscarParlamentares("jose")` matches "José da Silva" (accent insensitive)
  - [ ] Filters correctly narrow results by partido, uf, camara
  - [ ] `generateSlug("José Maria da Silva")` → `"jose-maria-da-silva"`
  - [ ] `formatDate("2024-03-15")` → `"15/03/2024"`
  - [ ] All utility functions have unit tests
  - [ ] `pnpm test src/lib/search/ src/lib/utils/` passes

  **QA Scenarios**:

  ```
  Scenario: Accent-insensitive search
    Tool: Bash
    Preconditions: Mock parlamentar list with accented names
    Steps:
      1. Call `buscarParlamentares("joao")` with list containing "João Souza"
      2. Assert "João Souza" is in results
      3. Call `buscarParlamentares("João")` 
      4. Assert same result found
    Expected Result: Both "joao" and "João" find "João Souza"
    Failure Indicators: No results for unaccented query
    Evidence: .sisyphus/evidence/task-6-accent-search.txt

  Scenario: Slug handles edge cases
    Tool: Bash
    Preconditions: Slug utility exists
    Steps:
      1. Assert `generateSlug("")` returns `""` (or throws)
      2. Assert `generateSlug("  João   Maria  ")` → `"joao-maria"` (trimmed, single hyphens)
      3. Assert `generateSlug("José D'Angelo")` → `"jose-dangelo"` (no apostrophes)
    Expected Result: Clean slugs for all edge cases
    Failure Indicators: Double hyphens, leading/trailing hyphens, accented characters in slug
    Evidence: .sisyphus/evidence/task-6-slug-edges.txt
  ```

  **Commit**: YES
  - Message: `feat(search): add search service and slug utilities`
  - Files: `src/lib/search/*.ts`, `src/lib/utils/*.ts`
  - Pre-commit: `pnpm tsc --noEmit && pnpm test`

- [ ] 7. Next.js API Route Handlers

  **What to do**:
  - Create API route handlers that serve as the unified data layer between frontend pages and the two government APIs. ALL routes use ISR caching via Next.js `revalidate` option.
  - Create `src/app/api/parlamentares/route.ts` — GET: search/list parliamentarians:
    - Query params: `?q=nome&partido=PT&uf=SP&camara=camara|senado`
    - Calls `buscarParlamentares()` from search service
    - Returns unified `Parlamentar[]` JSON
    - ISR revalidate: 3600 (1 hour)
  - Create `src/app/api/deputados/[id]/route.ts` — GET: single deputado profile:
    - Calls `obterDeputado(id)` from Câmara service
    - Returns `Parlamentar` JSON with full details
    - ISR revalidate: 21600 (6 hours)
  - Create `src/app/api/deputados/[id]/votacoes/route.ts` — GET: deputado voting history:
    - Calls `obterVotacoesDeputado(id)`
    - Returns `VoteRecord[]` JSON
    - ISR revalidate: 21600 (6 hours)
  - Create `src/app/api/deputados/[id]/proposicoes/route.ts` — GET: deputado propositions:
    - Returns `Proposicao[]` JSON
    - ISR revalidate: 86400 (24 hours)
  - Create `src/app/api/deputados/[id]/presenca/route.ts` — GET: deputado attendance:
    - Returns `Presenca` JSON
    - ISR revalidate: 86400 (24 hours)
  - Create `src/app/api/senadores/[id]/route.ts` — GET: single senator profile:
    - Returns `Parlamentar` JSON
    - ISR revalidate: 21600 (6 hours)
  - Create `src/app/api/senadores/[id]/votacoes/route.ts` — GET: senator voting history:
    - Returns `VoteRecord[]` JSON
    - ISR revalidate: 21600 (6 hours — bulk data, cached heavily)
  - Create `src/app/api/senadores/[id]/proposicoes/route.ts` — GET: senator propositions:
    - Returns `Proposicao[]` JSON
    - ISR revalidate: 86400 (24 hours)
  - Create `src/app/api/votacoes/[id]/route.ts` — GET: single voting event detail:
    - Returns `VoteEvent` with all individual `VoteRecord[]` 
    - ISR revalidate: 86400 (24 hours)
  - ALL route handlers must:
    - Return proper HTTP status codes (200, 404 for not found, 500 for upstream failure)
    - Include `X-Data-Source` header: `"camara"` or `"senado"`
    - Include `X-Last-Updated` header with ISO timestamp
    - Use Zod validation on incoming query params
    - Handle upstream API failures gracefully: return `{ error: "Fonte de dados indisponível", source: "camara"|"senado" }` with 503
  - Write integration tests: mock service layer, test route handler responses, test error scenarios, test cache headers

  **Must NOT do**:
  - Do NOT implement POST/PUT/DELETE routes (read-only platform)
  - Do NOT add authentication middleware
  - Do NOT add rate limiting (Vercel handles this)
  - Do NOT add database calls

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Many route files, complex error handling, ISR configuration, integration with multiple service layers
  - **Skills**: [`next-best-practices`]
    - `next-best-practices`: Next.js 16 route handler conventions, ISR revalidate config, async params API
  - **Skills Evaluated but Omitted**:
    - `vercel-react-best-practices`: Focused on React components, not API routes

  **Parallelization**:
  - **Can Run In Parallel**: NO (needs Wave 2 complete)
  - **Parallel Group**: Wave 3 (with Tasks 8-13, but 8-13 are UI tasks that don't depend on 7 except 10-13)
  - **Blocks**: Tasks 10, 11, 12, 13
  - **Blocked By**: Tasks 4, 5, 6

  **References**:

  **Pattern References**:
  - Task 4 service functions: `listarDeputados()`, `obterDeputado()`, etc.
  - Task 5 service functions: `listarSenadores()`, etc.
  - Task 6 search service: `buscarParlamentares()`

  **API/Type References**:
  - All unified types from `src/types/`
  - Next.js 16 route handlers: `export async function GET(request: Request, { params }: { params: Promise<{ id: string }> })`
  - ISR: `export const revalidate = 3600` at module level

  **External References**:
  - Next.js 16 Route Handlers: use `next-best-practices` skill or `nextjs_docs` MCP for exact API

  **WHY Each Reference Matters**:
  - Next.js 16 changed `params` to be async (`Promise<{}>`) — must await params
  - ISR `revalidate` export at module level controls stale-while-revalidate behavior
  - Custom headers (`X-Data-Source`, `X-Last-Updated`) provide transparency metadata the frontend will display

  **Acceptance Criteria**:

  - [ ] All route files exist under `src/app/api/`
  - [ ] `GET /api/parlamentares?q=lula` returns JSON array
  - [ ] `GET /api/deputados/123` returns single Parlamentar or 404
  - [ ] `GET /api/senadores/456/votacoes` returns VoteRecord array
  - [ ] Upstream failure returns 503 with Portuguese error message
  - [ ] All responses include `X-Data-Source` and `X-Last-Updated` headers
  - [ ] ISR revalidate values set correctly per route
  - [ ] Integration tests pass with mocked services

  **QA Scenarios**:

  ```
  Scenario: Search endpoint returns results
    Tool: Bash (curl)
    Preconditions: Dev server running, Câmara/Senado services available
    Steps:
      1. curl -s http://localhost:3000/api/parlamentares?q=silva
      2. Parse JSON response
      3. Assert HTTP status 200
      4. Assert response is non-empty array
      5. Assert each item has `id`, `nome`, `partido`, `uf`
    Expected Result: JSON array of Parlamentar objects matching "silva"
    Failure Indicators: 500 error, empty response for common name, missing fields
    Evidence: .sisyphus/evidence/task-7-search-endpoint.txt

  Scenario: Non-existent deputado returns 404
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/deputados/999999999
      2. Assert HTTP status 404
      3. curl -s http://localhost:3000/api/deputados/999999999 | jq .error
      4. Assert error message is in Portuguese
    Expected Result: 404 status with Portuguese error message
    Failure Indicators: 500 error, 200 with null data
    Evidence: .sisyphus/evidence/task-7-not-found.txt

  Scenario: Upstream failure returns 503
    Tool: Bash
    Preconditions: Mock service layer to throw
    Steps:
      1. In test: mock Câmara service to throw network error
      2. Call route handler
      3. Assert response status 503
      4. Assert body contains `{ error: "Fonte de dados indisponível" }`
    Expected Result: 503 with graceful error response
    Failure Indicators: Unhandled 500, generic error message
    Evidence: .sisyphus/evidence/task-7-upstream-failure.txt
  ```

  **Commit**: YES
  - Message: `feat(api): add next.js route handlers for unified api`
  - Files: `src/app/api/**/*.ts`
  - Pre-commit: `pnpm tsc --noEmit && pnpm test`

- [ ] 8. Reusable UI Components Library

  **What to do**:
  - Build the shared component library that ALL pages will use. Every component uses the design tokens from Task 2, shadcn/ui primitives, and follows the dark analytics dashboard aesthetic.
  - Create `src/components/ui/` — enhanced shadcn components (add via CLI then customize):
    - Add shadcn components: `button`, `card`, `input`, `badge`, `skeleton`, `avatar`, `separator`, `tooltip`, `scroll-area`, `tabs`
    - Customize each to use brand tokens (verde/amarelo/azul accents)
  - Create `src/components/parlamentar/` — domain-specific components:
    - `parlamentar-card.tsx` — Card showing: photo (with initials fallback), name, party badge, state badge, chamber indicator. Used in search results.
    - `parlamentar-header.tsx` — Profile page header: large photo, name, partido, UF, email, legislature info
    - `foto-parlamentar.tsx` — Photo with fallback to initials avatar (handles 404 photos gracefully via `onError`)
    - `partido-badge.tsx` — Party badge (neutral styling, NO color-coding per party)
    - `camara-indicator.tsx` — Small badge showing "Câmara" or "Senado" with subtle icon
  - Create `src/components/votacao/` — voting-related components:
    - `voto-badge.tsx` — Badge displaying vote type (Sim, Não, Abstenção, etc.) with NEUTRAL colors (no green=good/red=bad — use distinct but non-judgmental hues)
    - `votacao-card.tsx` — Card showing a voting event: date, description, proposition reference, result
    - `votacao-list.tsx` — Scrollable list of VotacaoCard items with pagination
  - Create `src/components/layout/` — layout components:
    - `header.tsx` — Site header: logo/brand name "Como Eles Votaram", navigation (Home, Buscar), manifesto tagline
    - `footer.tsx` — Footer: source attribution links (Dados Abertos Câmara, Dados Abertos Senado), "última atualização" timestamp, disclaimer about data neutrality
    - `page-container.tsx` — Max-width container with responsive padding
    - `section-header.tsx` — Section title with optional description and "fonte" attribution
  - Create `src/components/data/` — data display components:
    - `stat-card.tsx` — Single statistic: label + value (e.g., "Votações Participadas" → "142"). NO judgment colors.
    - `data-table.tsx` — Simple responsive table for structured data (votes, propositions)
    - `empty-state.tsx` — "Sem dados disponíveis" with icon and optional explanation. NEVER "Sem atividade".
    - `fonte-badge.tsx` — Small attribution badge showing data source ("Fonte: Dados Abertos Câmara") with link
    - `ultima-atualizacao.tsx` — Timestamp component: "Última atualização: há 3 horas" (uses formatDateRelative from Task 6)
  - Write tests for key components: render tests, accessibility (role attributes, aria labels), prop variations

  **Must NOT do**:
  - Do NOT color-code votes as good/bad (no green for Sim, red for Não)
  - Do NOT color-code parties
  - Do NOT create ranking or comparison components
  - Do NOT build page-level layouts (those are per-page tasks)
  - Do NOT add animations (Task 16 handles polish)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI component library with design system integration, dark theme, analytics aesthetic
  - **Skills**: [`frontend-design`, `ui-ux-pro-max`]
    - `frontend-design`: Production-grade component design, dark mode patterns
    - `ui-ux-pro-max`: Component design patterns, accessibility, shadcn customization
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed — unit render tests are sufficient for components
    - `web-design-guidelines`: Better for reviewing, not building

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 7)
  - **Parallel Group**: Wave 3 (with Tasks 7, 9-13)
  - **Blocks**: Tasks 9, 10, 11, 12, 13
  - **Blocked By**: Task 2 (design tokens)

  **References**:

  **Pattern References**:
  - Task 2's design tokens (`globals.css`) — all components consume these CSS variables
  - Task 3's types (`Parlamentar`, `VoteRecord`, `VoteEvent`, `Proposicao`) — components receive these as props
  - Sérgio's component pattern: `export const MyComponent = ({ prop }: MyComponentProps) => { ... }` (named export, arrow function)
  - shadcn/ui component source: use `shadcn-ui_get_component` MCP to inspect base component structure

  **API/Type References**:
  - `Parlamentar` type — for `parlamentar-card`, `parlamentar-header`, `foto-parlamentar`
  - `VoteRecord` type — for `voto-badge`, `votacao-list`
  - `VoteEvent` type — for `votacao-card`

  **External References**:
  - shadcn/ui MCP: `shadcn-ui_get_component_demo` for usage patterns
  - WCAG AA: all interactive elements need `aria-label`, focus indicators, keyboard nav

  **WHY Each Reference Matters**:
  - Named exports are MANDATORY (Sérgio's convention) — every component file
  - Vote badge colors must be NEUTRAL — this is a core guardrail. Use hues like blue/purple/gray/amber that don't imply judgment
  - "Sem dados disponíveis" (not "Sem atividade") is explicitly required in guardrails
  - Source attribution (`fonte-badge`) implements the "transparência radical" brand value

  **Acceptance Criteria**:

  - [ ] All component files exist in `src/components/` subdirectories
  - [ ] All components use named exports (not default)
  - [ ] `voto-badge` uses neutral colors (no green=good, red=bad)
  - [ ] `empty-state` displays "Sem dados disponíveis" (not "Sem atividade")
  - [ ] `fonte-badge` links to data source
  - [ ] `foto-parlamentar` handles image 404 with initials fallback
  - [ ] All components render without errors in tests
  - [ ] `pnpm test src/components/` passes

  **QA Scenarios**:

  ```
  Scenario: Vote badge uses neutral colors
    Tool: Playwright
    Preconditions: Dev server with test page rendering all vote badges
    Steps:
      1. Navigate to test page with all vote types rendered
      2. Screenshot all vote badges
      3. Check "Sim" badge does NOT use pure green (#00ff00 family)
      4. Check "Não" badge does NOT use pure red (#ff0000 family)
      5. Verify all badges are visually distinct but non-judgmental
    Expected Result: Vote badges use neutral, distinct colors (not green=good/red=bad)
    Failure Indicators: Green "Sim" badge, red "Não" badge
    Evidence: .sisyphus/evidence/task-8-vote-badges.png

  Scenario: Photo fallback renders initials
    Tool: Bash
    Preconditions: Component test file exists
    Steps:
      1. Run test rendering `foto-parlamentar` with broken image URL
      2. Assert fallback element contains initials (e.g., "JS" for "João Silva")
      3. Assert no broken image icon visible
    Expected Result: Initials avatar displayed when photo fails
    Failure Indicators: Broken image icon, empty avatar
    Evidence: .sisyphus/evidence/task-8-photo-fallback.txt

  Scenario: Empty state shows correct message
    Tool: Bash
    Preconditions: EmptyState component exists
    Steps:
      1. Render `<EmptyState />` in test
      2. Assert text "Sem dados disponíveis" is present
      3. Assert text "Sem atividade" is NOT present
    Expected Result: "Sem dados disponíveis" displayed
    Failure Indicators: "Sem atividade" or any editorialized label
    Evidence: .sisyphus/evidence/task-8-empty-state.txt
  ```

  **Commit**: YES
  - Message: `feat(ui): add reusable component library`
  - Files: `src/components/**/*.tsx`, `src/__tests__/components/`
  - Pre-commit: `pnpm build && pnpm test`

- [ ] 9. Landing Page

  **What to do**:
  - Create `src/app/page.tsx` — institutional landing page:
    - Hero section: Brand name "Como Eles Votaram", tagline ("Menos discurso. Mais registro." or "Não é o que dizem. É o que votam."), prominent search bar CTA
    - Manifesto section: Brief institutional text explaining the purpose — "Tornar visível o que já é público, mas ninguém vê." Use brand tone: confrontational with data, never accusatory. Adapted from `/home/lxndr/Documents/notes/como votou/ideas/como eles votaram/manifesto.md`
    - "Como funciona" section: 3 simple steps — 1) Busque um parlamentar, 2) Veja como votou, 3) Tire suas conclusões
    - Source attribution section: Links to Dados Abertos Câmara + Senado with explanation of data provenance
    - The search bar on the hero should navigate to `/busca?q={query}` on submit
  - Create `src/app/layout.tsx` — root layout:
    - HTML lang="pt-BR"
    - Font loading (Inter or Plus Jakarta Sans)
    - `<Header />` and `<Footer />` from Task 8
    - React Query provider wrapper (`src/components/providers/query-provider.tsx` — client component)
    - Metadata: `title: "Como Eles Votaram"`, `description: "..."` 
  - Create `src/components/providers/query-provider.tsx` — React Query `QueryClientProvider` wrapper (client component with `"use client"`)
  - Style the landing page with the analytics/dashboard dark theme aesthetic: subtle gradients, Brazilian flag accent colors for highlights, clean typography
  - Write render tests for key sections

  **Must NOT do**:
  - Do NOT add animations or transitions yet (Task 16)
  - Do NOT add featured parlamentar spotlights or "trending" sections (editorialization)
  - Do NOT add news or current events
  - Do NOT add any ranking or "most active" lists

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Landing page design with brand identity, hero layout, dark theme aesthetic
  - **Skills**: [`frontend-design`, `ui-ux-pro-max`]
    - `frontend-design`: Production landing page design, hero patterns
    - `ui-ux-pro-max`: Layout composition, visual hierarchy, typography
  - **Skills Evaluated but Omitted**:
    - `next-best-practices`: Minimal Next.js complexity (just page + layout)
    - `playwright`: Not needed at build time

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 7, 10-13 — but practically needs Task 8 complete)
  - **Parallel Group**: Wave 3
  - **Blocks**: None
  - **Blocked By**: Tasks 2, 8

  **References**:

  **Pattern References**:
  - Task 8 layout components (`header.tsx`, `footer.tsx`, `page-container.tsx`)
  - Task 2 design tokens
  - Brand manifesto: `/home/lxndr/Documents/notes/como votou/ideas/como eles votaram/manifesto.md`
  - Brand tone: `/home/lxndr/Documents/notes/como votou/Tom da marca.md`

  **API/Type References**:
  - None (landing page is static content + search CTA)

  **External References**:
  - Next.js App Router `layout.tsx` and `page.tsx` conventions
  - React Query setup: `QueryClient` + `QueryClientProvider` in client component

  **WHY Each Reference Matters**:
  - The manifesto text must be adapted (not copied verbatim) from brand docs — maintain the tone but write for web
  - React Query provider must be a `"use client"` component wrapping children in layout

  **Acceptance Criteria**:

  - [ ] `http://localhost:3000` renders landing page
  - [ ] Hero shows brand name, tagline, search bar
  - [ ] Search bar navigates to `/busca?q={query}` on submit
  - [ ] Manifesto section is present with neutral, institutional tone
  - [ ] Source attribution links to both API portals
  - [ ] HTML `lang="pt-BR"` is set
  - [ ] Header and Footer render
  - [ ] No featured/trending/ranking content
  - [ ] `pnpm build` succeeds
  - [ ] Render tests pass

  **QA Scenarios**:

  ```
  Scenario: Landing page renders correctly
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to `http://localhost:3000`
      2. Assert page title contains "Como Eles Votaram"
      3. Assert h1 or hero text contains "Como Eles Votaram"
      4. Assert search input exists (selector: `input[type="search"]` or `input[placeholder*="Buscar"]`)
      5. Assert source attribution section contains "Dados Abertos"
      6. Take full-page screenshot
    Expected Result: Landing page with brand name, search, and source attribution
    Failure Indicators: 404, blank page, missing search input
    Evidence: .sisyphus/evidence/task-9-landing.png

  Scenario: Search navigates to /busca
    Tool: Playwright
    Preconditions: Dev server running, landing page loads
    Steps:
      1. Navigate to `http://localhost:3000`
      2. Type "silva" into search input
      3. Press Enter or click search button
      4. Assert URL is now `/busca?q=silva`
    Expected Result: Navigation to search page with query param
    Failure Indicators: Stays on home page, no query param, JS error
    Evidence: .sisyphus/evidence/task-9-search-nav.png

  Scenario: No editorialized content on landing
    Tool: Bash
    Preconditions: Landing page source exists
    Steps:
      1. grep for "ranking", "mais ativo", "melhor", "pior", "destaque" in src/app/page.tsx
      2. Assert zero matches
    Expected Result: No editorialized language present
    Failure Indicators: Any judgment words found
    Evidence: .sisyphus/evidence/task-9-no-editorial.txt
  ```

  **Commit**: YES
  - Message: `feat(page): add institutional landing page`
  - Files: `src/app/page.tsx`, `src/app/layout.tsx`, `src/components/providers/query-provider.tsx`
  - Pre-commit: `pnpm build && pnpm test`

- [ ] 10. Search Page + Results

  **What to do**:
  - Create `src/app/busca/page.tsx` — search results page:
    - Reads `?q=` query param from URL (via `searchParams`)
    - Search input (pre-filled with current query)
    - Filter bar: partido dropdown, UF dropdown, câmara/senado toggle (or "Todas")
    - Results grid: `ParlamentarCard` components from Task 8
    - Loading skeleton while fetching
    - Empty state: "Nenhum parlamentar encontrado" with suggestion to try different terms
    - Pagination or infinite scroll for large result sets
  - Fetch data from `/api/parlamentares?q=...&partido=...&uf=...` (internal API from Task 7)
  - Use React Query for data fetching with:
    - `useQuery` hook
    - Debounced search input (300ms)
    - Stale time: 60s
  - Create `src/app/busca/layout.tsx` — metadata for search page
  - Write tests: renders search input, shows loading skeleton, shows results, shows empty state

  **Must NOT do**:
  - Do NOT add search suggestions/autocomplete
  - Do NOT add sorting by "activity" or "relevance score"
  - Do NOT add saved searches or history
  - Do NOT add comparison features

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Search UI with filters, results grid, loading states, responsive layout
  - **Skills**: [`frontend-design`, `vercel-react-best-practices`]
    - `frontend-design`: Search page layout, filter UI, results grid
    - `vercel-react-best-practices`: React Query patterns, debouncing, data fetching best practices
  - **Skills Evaluated but Omitted**:
    - `next-best-practices`: Search page is mostly client-side (React Query), minimal Next.js-specific patterns

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 11, 12, 13)
  - **Parallel Group**: Wave 3
  - **Blocks**: None
  - **Blocked By**: Tasks 7, 8

  **References**:

  **Pattern References**:
  - Task 8's `ParlamentarCard` component — used in results grid
  - Task 8's `empty-state` — used when no results
  - Task 8's `skeleton` — used during loading
  - Task 7's `/api/parlamentares` endpoint — data source

  **API/Type References**:
  - `GET /api/parlamentares?q=&partido=&uf=&camara=` → `Parlamentar[]`
  - React Query: `useQuery({ queryKey: ['parlamentares', { q, partido, uf }], queryFn })`

  **External References**:
  - React Query `useQuery` with `keepPreviousData` for smooth transitions
  - URL search params sync: `useSearchParams()` from Next.js

  **WHY Each Reference Matters**:
  - `keepPreviousData` prevents flash of empty state when changing search params
  - URL params must stay in sync with filters so URLs are shareable

  **Acceptance Criteria**:

  - [ ] `/busca?q=silva` renders search results
  - [ ] Search input is pre-filled with query from URL
  - [ ] Filter dropdowns for partido and UF work
  - [ ] Results show `ParlamentarCard` grid
  - [ ] Loading state shows skeleton cards
  - [ ] Empty state shows "Nenhum parlamentar encontrado"
  - [ ] Clicking a card navigates to profile page
  - [ ] URL updates when filters change (shareable URLs)
  - [ ] Tests pass

  **QA Scenarios**:

  ```
  Scenario: Search returns results for common name
    Tool: Playwright
    Preconditions: Dev server running, APIs accessible
    Steps:
      1. Navigate to `http://localhost:3000/busca?q=silva`
      2. Wait for loading to complete (skeleton disappears)
      3. Assert at least 1 ParlamentarCard is visible (selector: `[data-testid="parlamentar-card"]` or similar)
      4. Assert card shows name, party badge, state badge
      5. Take screenshot
    Expected Result: Multiple parlamentar cards displayed for "silva"
    Failure Indicators: Empty state for common name, infinite loading, error
    Evidence: .sisyphus/evidence/task-10-search-results.png

  Scenario: Empty search shows appropriate message
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to `http://localhost:3000/busca?q=zzzzxxxxxxxxxnonexistent`
      2. Wait for loading to complete
      3. Assert empty state text "Nenhum parlamentar encontrado" is visible
      4. Assert no ParlamentarCard visible
    Expected Result: Empty state message, no results
    Failure Indicators: Error page, infinite loading, wrong message
    Evidence: .sisyphus/evidence/task-10-empty-search.png

  Scenario: Filter by UF narrows results
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to `http://localhost:3000/busca?q=silva`
      2. Select "SP" from UF filter dropdown
      3. Wait for results to update
      4. Assert URL contains `uf=SP`
      5. Assert all visible cards show "SP" in state badge
    Expected Result: Only SP parlamentares shown, URL updated
    Failure Indicators: Results not filtered, URL not updated
    Evidence: .sisyphus/evidence/task-10-filter-uf.png
  ```

  **Commit**: YES
  - Message: `feat(page): add search page with results`
  - Files: `src/app/busca/page.tsx`, `src/app/busca/layout.tsx`
  - Pre-commit: `pnpm build && pnpm test`

- [ ] 11. Deputado Profile Page

  **What to do**:
  - Create `src/app/deputados/[slug]/page.tsx` — full deputado profile:
    - Dynamic route: slug format is `{id}-{name-slug}` (e.g., `73433-joao-silva`)
    - Extract `id` from slug (split on first hyphen, parse number)
    - Server component: fetch data at render time using Câmara service directly (or via internal API)
    - **Header section**: `ParlamentarHeader` with photo, name, partido badge, UF badge, email, "Câmara dos Deputados" indicator
    - **Stats overview**: Row of `StatCard` components showing key numbers:
      - "Votações participadas": count of VoteRecords
      - "Proposições apresentadas": count of Proposicoes
      - "Presença em sessões": percentage from Presença data
      - ALL stats are raw numbers — no judgment, no comparison, no color-coding
    - **Voting history tab/section**: Scrollable list of votes via `VotacaoList`, each showing: date, bill reference, vote cast (via `VotoBadge`). Paginated (show 20, load more).
    - **Propositions tab/section**: List of authored/co-authored bills. Each showing: type (PL/PEC/PLP), number, year, ementa, date.
    - **Attendance section**: If Presença data available, show totals (sessions, presences, justified absences, unjustified absences). NO percentage color-coding.
    - **Source attribution**: `FonteBadge` on every section — "Fonte: Dados Abertos da Câmara dos Deputados"
    - **"Última atualização"** timestamp on the page
  - Create `src/app/deputados/[slug]/layout.tsx` — metadata (dynamic title: "{nome} — Como Eles Votaram")
  - Handle edge cases:
    - Invalid slug → 404 page (next.js `notFound()`)
    - API returns no data → "Sem dados disponíveis" empty state per section
    - Photo 404 → initials fallback
  - Write tests: renders profile header, renders stats, handles missing data, 404 for invalid ID

  **Must NOT do**:
  - Do NOT compute loyalty scores, activity ratings, or alignment metrics
  - Do NOT color-code attendance (no red for low, green for high)
  - Do NOT compare this deputado to any other
  - Do NOT add "similar parlamentares" or recommendations
  - Do NOT add charts/graphs (can be added later, not MVP)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Complex profile page layout with multiple sections, data-heavy dashboard aesthetic
  - **Skills**: [`frontend-design`, `ui-ux-pro-max`, `next-best-practices`]
    - `frontend-design`: Profile page layout, section composition, data display
    - `ui-ux-pro-max`: Dashboard aesthetic, stat card patterns, information hierarchy
    - `next-best-practices`: Dynamic routes, server components, metadata API, `notFound()`
  - **Skills Evaluated but Omitted**:
    - `playwright`: QA scenario covers this

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 10, 12, 13)
  - **Parallel Group**: Wave 3
  - **Blocks**: Tasks 14, 15
  - **Blocked By**: Tasks 7, 8

  **References**:

  **Pattern References**:
  - Task 8 components: `ParlamentarHeader`, `StatCard`, `VotacaoList`, `VotoBadge`, `FonteBadge`, `UltimaAtualizacao`, `EmptyState`
  - Task 7 API routes: `/api/deputados/[id]`, `/api/deputados/[id]/votacoes`, `/api/deputados/[id]/proposicoes`, `/api/deputados/[id]/presenca`

  **API/Type References**:
  - `Parlamentar`, `VoteRecord`, `Proposicao`, `Presenca` types
  - Next.js dynamic route: `params: Promise<{ slug: string }>` (async in Next.js 16)

  **External References**:
  - Next.js `generateMetadata` for dynamic page titles
  - Next.js `notFound()` from `next/navigation` for 404

  **WHY Each Reference Matters**:
  - Stats MUST be raw numbers only — the guardrails explicitly forbid computed judgment fields
  - `notFound()` is the correct Next.js way to trigger 404, not returning a custom 404 component

  **Acceptance Criteria**:

  - [ ] `/deputados/{id}-{slug}` renders profile page
  - [ ] Photo, name, partido, UF displayed in header
  - [ ] Stats show raw counts (no percentages colored by judgment)
  - [ ] Voting history section shows votes with dates and vote badges
  - [ ] Propositions section lists authored bills
  - [ ] Attendance section shows raw numbers
  - [ ] Source attribution on every section
  - [ ] "Última atualização" timestamp visible
  - [ ] Invalid slug returns 404
  - [ ] Missing data sections show "Sem dados disponíveis"
  - [ ] Page title is dynamic: "{nome} — Como Eles Votaram"

  **QA Scenarios**:

  ```
  Scenario: Deputado profile renders with real data
    Tool: Playwright
    Preconditions: Dev server running, Câmara API accessible
    Steps:
      1. Navigate to `http://localhost:3000/deputados/73433-nome-deputado` (use a known real ID)
      2. Wait for page load
      3. Assert profile header shows deputado name
      4. Assert partido badge is visible
      5. Assert at least one section has "Fonte: Dados Abertos" text
      6. Assert page title contains deputado name
      7. Take full-page screenshot
    Expected Result: Full profile page with all sections populated
    Failure Indicators: 404 for valid ID, missing sections, no source attribution
    Evidence: .sisyphus/evidence/task-11-deputado-profile.png

  Scenario: Invalid deputado slug returns 404
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to `http://localhost:3000/deputados/999999-ninguem`
      2. Assert 404 page or "not found" text visible
      3. Assert HTTP status is 404 (check via response)
    Expected Result: 404 page displayed
    Failure Indicators: 500 error, blank page, profile rendered with no data
    Evidence: .sisyphus/evidence/task-11-deputado-404.png

  Scenario: No judgment colors on stats
    Tool: Playwright
    Preconditions: Deputado profile loaded
    Steps:
      1. Navigate to a real deputado profile
      2. Inspect all stat-card elements
      3. Assert none use red (#ff0000 family) or green (#00ff00 family) backgrounds/text
      4. All stats display plain numbers
    Expected Result: Neutral-colored stats with raw numbers
    Failure Indicators: Color-coded stats implying good/bad
    Evidence: .sisyphus/evidence/task-11-neutral-stats.png
  ```

  **Commit**: YES
  - Message: `feat(page): add deputado profile page`
  - Files: `src/app/deputados/[slug]/page.tsx`, `src/app/deputados/[slug]/layout.tsx`
  - Pre-commit: `pnpm build && pnpm test`

- [ ] 12. Senador Profile Page

  **What to do**:
  - Create `src/app/senadores/[slug]/page.tsx` — full senator profile:
    - Nearly identical structure to deputado profile (Task 11), but with Senado-specific data handling
    - Dynamic route: slug format is `{id}-{name-slug}`
    - **Header section**: Same as deputado but shows "Senado Federal" indicator
    - **Stats overview**: Same stat cards but WITHOUT attendance (no Senado attendance endpoint)
    - **Voting history**: Votes from Senado API, same `VotacaoList` + `VotoBadge` components
    - **Propositions**: From Senado API
    - **Attendance section**: Show `EmptyState` with message "Dados de presença não disponíveis via API do Senado" — this is NOT editorializing, it's transparently stating a data limitation
    - **Source attribution**: "Fonte: Dados Abertos do Senado Federal"
  - Create `src/app/senadores/[slug]/layout.tsx` — dynamic metadata
  - Handle same edge cases as deputado: invalid slug → 404, missing data → "Sem dados disponíveis", photo 404 → initials
  - Write tests: renders profile, attendance shows unavailable message, handles missing data

  **Must NOT do**:
  - Same guardrails as Task 11
  - Do NOT fake attendance data or compute it from voting participation
  - Do NOT say "Sem atividade" for missing attendance — say "Dados de presença não disponíveis via API do Senado"

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Profile page layout, reuses components from Task 8, Senado-specific adaptations
  - **Skills**: [`frontend-design`, `next-best-practices`]
    - `frontend-design`: Profile page layout
    - `next-best-practices`: Dynamic routes, metadata, `notFound()`
  - **Skills Evaluated but Omitted**:
    - `ui-ux-pro-max`: Most design work was done in Task 11 — this follows the same pattern

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 10, 11, 13)
  - **Parallel Group**: Wave 3
  - **Blocks**: Tasks 14, 15
  - **Blocked By**: Tasks 7, 8

  **References**:

  **Pattern References**:
  - Task 11 (`src/app/deputados/[slug]/page.tsx`) — follow same page structure, adapt for Senado
  - Task 8 components: same set as Task 11
  - Task 7 API routes: `/api/senadores/[id]`, `/api/senadores/[id]/votacoes`, `/api/senadores/[id]/proposicoes`

  **API/Type References**:
  - `Parlamentar`, `VoteRecord`, `Proposicao` types (same unified types)
  - No `Presenca` type for Senado (endpoint doesn't exist)

  **External References**:
  - Same as Task 11

  **WHY Each Reference Matters**:
  - The attendance unavailability message is CRITICAL — it must explain WHY data is missing (API limitation), not imply the senator is inactive
  - Code reuse from Task 11 should be high — consider extracting shared profile layout if patterns are identical

  **Acceptance Criteria**:

  - [ ] `/senadores/{id}-{slug}` renders profile page
  - [ ] Shows "Senado Federal" indicator (not "Câmara")
  - [ ] Attendance section shows "Dados de presença não disponíveis via API do Senado"
  - [ ] Source attribution says "Dados Abertos do Senado Federal"
  - [ ] Photo uses HTTPS URL (not HTTP)
  - [ ] Invalid slug returns 404
  - [ ] All other criteria match Task 11 (stats, votes, propositions)

  **QA Scenarios**:

  ```
  Scenario: Senador profile shows attendance unavailable message
    Tool: Playwright
    Preconditions: Dev server running, Senado API accessible
    Steps:
      1. Navigate to a known senator profile (use real CodigoParlamentar)
      2. Scroll to attendance section
      3. Assert text "Dados de presença não disponíveis via API do Senado" is visible
      4. Assert text does NOT contain "Sem atividade"
      5. Take screenshot
    Expected Result: Clear explanation of data limitation, not editorialized label
    Failure Indicators: "Sem atividade", missing section, fake data
    Evidence: .sisyphus/evidence/task-12-senador-attendance.png

  Scenario: Senador photo is HTTPS
    Tool: Playwright
    Preconditions: Senador profile loaded
    Steps:
      1. Navigate to senator profile
      2. Find photo element (img tag)
      3. Assert `src` attribute starts with "https://"
      4. Assert `src` does NOT start with "http://" (non-secure)
    Expected Result: Photo URL is HTTPS
    Failure Indicators: HTTP photo URL (mixed content warning)
    Evidence: .sisyphus/evidence/task-12-senador-photo-https.txt

  Scenario: Senador profile shows Senado indicator
    Tool: Playwright
    Preconditions: Senador profile loaded
    Steps:
      1. Navigate to senator profile
      2. Assert "Senado Federal" text or badge is visible in header
      3. Assert "Câmara" is NOT the chamber indicator
    Expected Result: "Senado Federal" indicator displayed
    Failure Indicators: "Câmara" displayed, no indicator
    Evidence: .sisyphus/evidence/task-12-senado-indicator.png
  ```

  **Commit**: YES
  - Message: `feat(page): add senador profile page`
  - Files: `src/app/senadores/[slug]/page.tsx`, `src/app/senadores/[slug]/layout.tsx`
  - Pre-commit: `pnpm build && pnpm test`

- [ ] 13. Bill/Votação Detail Page

  **What to do**:
  - Create `src/app/votacoes/[id]/page.tsx` — voting event detail page:
    - Shows full details of a single voting session (plenary vote)
    - **Header**: Date, description, associated proposition (if any), result
    - **Proposition details** (if linked): Type, number, year, ementa, full text link
    - **Individual votes table**: All parlamentares who voted, showing: name (linked to profile), party, state, vote cast (VotoBadge). Sortable by name or party.
    - **Vote summary**: Counts of Sim, Não, Abstenção, Obstrução, Art. 17 — presented as raw numbers, NOT as percentages with judgment colors. Simple neutral stat cards.
    - **Empty votes handling**: If `dados: []` (no individual vote records), show "Votação sem registro individual de votos — votações simbólicas ou em comissão podem não ter registro nominal." This is NOT editorializing — it's explaining a data structure reality.
    - **Source attribution**: `FonteBadge` with link to original data
    - **"Última atualização"** timestamp
  - Create `src/app/votacoes/[id]/layout.tsx` — dynamic metadata
  - Data fetching: call `/api/votacoes/[id]` from Task 7
  - Each parlamentar name in the vote table links to their profile page (`/deputados/[slug]` or `/senadores/[slug]`)
  - Handle edge cases: invalid votação ID → 404, mixed chamber votes (unlikely but handle gracefully)
  - Write tests: renders vote details, renders empty state for symbolic votes, links to profiles

  **Must NOT do**:
  - Do NOT color-code the vote summary (no green bar for Sim, red bar for Não)
  - Do NOT add "context" or "analysis" of the vote
  - Do NOT show which side "won" with celebration styling
  - Do NOT add party-level aggregations

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Data-heavy page with table, vote summary, complex layout
  - **Skills**: [`frontend-design`, `next-best-practices`]
    - `frontend-design`: Data table layout, vote summary cards, responsive design
    - `next-best-practices`: Dynamic routes, server components
  - **Skills Evaluated but Omitted**:
    - `ui-ux-pro-max`: Design patterns already established in prior tasks

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 10, 11, 12)
  - **Parallel Group**: Wave 3
  - **Blocks**: Tasks 14, 15
  - **Blocked By**: Tasks 7, 8

  **References**:

  **Pattern References**:
  - Task 8 components: `VotoBadge`, `StatCard`, `DataTable`, `FonteBadge`, `EmptyState`, `UltimaAtualizacao`
  - Task 7 API route: `/api/votacoes/[id]`
  - Task 11/12 profile links: need to generate correct `/deputados/[slug]` or `/senadores/[slug]` URLs

  **API/Type References**:
  - `VoteEvent` type with nested `VoteRecord[]`
  - `Proposicao` type for linked bill details

  **External References**:
  - Next.js `Link` component for parlamentar profile navigation

  **WHY Each Reference Matters**:
  - Empty vote arrays are COMMON — the explanation text is pre-defined and neutral
  - Profile links must use correct chamber prefix (deputados vs senadores) based on `camara` field

  **Acceptance Criteria**:

  - [ ] `/votacoes/{id}` renders voting event details
  - [ ] Vote summary shows raw counts (Sim, Não, etc.) without judgment colors
  - [ ] Individual vote table lists parlamentares with vote badges
  - [ ] Parlamentar names link to their profiles (correct chamber URL)
  - [ ] Empty votes show explanatory message (not error)
  - [ ] Source attribution present
  - [ ] Invalid ID returns 404
  - [ ] Tests pass

  **QA Scenarios**:

  ```
  Scenario: Votação page with individual votes
    Tool: Playwright
    Preconditions: Dev server, known votação ID with individual records
    Steps:
      1. Navigate to `http://localhost:3000/votacoes/{known-id}`
      2. Assert page shows vote date and description
      3. Assert vote table has rows with parlamentar names
      4. Assert at least one VotoBadge is visible
      5. Click a parlamentar name
      6. Assert navigation to `/deputados/...` or `/senadores/...`
      7. Take screenshot
    Expected Result: Full vote detail page with interactive parlamentar links
    Failure Indicators: Empty page, missing table, broken links
    Evidence: .sisyphus/evidence/task-13-votacao-detail.png

  Scenario: Symbolic vote shows explanatory message
    Tool: Playwright
    Preconditions: Dev server, known votação ID with empty individual records
    Steps:
      1. Navigate to votação with no individual vote records
      2. Assert text "Votação sem registro individual" is visible
      3. Assert no error displayed
      4. Assert vote table is NOT rendered (no empty table)
    Expected Result: Explanatory message instead of empty table
    Failure Indicators: Error, empty table rendered, "Sem atividade"
    Evidence: .sisyphus/evidence/task-13-symbolic-vote.png

  Scenario: Vote summary uses neutral colors
    Tool: Playwright
    Preconditions: Votação page loaded with vote summary
    Steps:
      1. Navigate to votação with individual records
      2. Find vote summary stat cards
      3. Assert "Sim" count card does NOT use green background
      4. Assert "Não" count card does NOT use red background
      5. All summary cards use neutral brand colors
    Expected Result: Neutral-colored vote summary
    Failure Indicators: Green=Sim, Red=Não color coding
    Evidence: .sisyphus/evidence/task-13-neutral-summary.png
  ```

  **Commit**: YES
  - Message: `feat(page): add votação detail page`
  - Files: `src/app/votacoes/[id]/page.tsx`, `src/app/votacoes/[id]/layout.tsx`
  - Pre-commit: `pnpm build && pnpm test`

- [ ] 14. SEO + Metadata + Sitemap

  **What to do**:
  - Enhance root `src/app/layout.tsx` metadata:
    - `title.template`: "%s — Como Eles Votaram"
    - `title.default`: "Como Eles Votaram — Transparência Legislativa"
    - `description`: Institutional description in PT-BR
    - `openGraph`: title, description, site_name, locale ("pt_BR"), type ("website"), images (OG image)
    - `twitter`: card ("summary_large_image"), title, description
    - `robots`: index, follow
    - `icons`: favicon (create simple favicon with brand colors)
  - Create dynamic `generateMetadata` in each dynamic page:
    - Deputado: `"João Silva (PT-SP) — Como Eles Votaram"`
    - Senador: same pattern
    - Votação: `"Votação: PL 123/2024 — Como Eles Votaram"`
  - Create `src/app/sitemap.ts` — dynamic sitemap:
    - Static routes: `/`, `/busca`
    - Dynamic routes: all deputados, all senadores (fetch from API)
    - Use `MetadataRoute.Sitemap` return type
    - Set `changeFrequency` and `priority` appropriately
  - Create `src/app/robots.ts` — robots.txt:
    - Allow all crawlers
    - Sitemap URL reference
  - Add JSON-LD structured data where appropriate:
    - Landing page: `WebSite` schema with `SearchAction`
    - Profile pages: `Person` schema with name, party, role
  - Create a simple OG image (can be static for MVP): dark background, brand name, Brazilian flag accent stripe
  - Write tests: metadata exists on pages, sitemap returns valid URLs

  **Must NOT do**:
  - Do NOT add analytics/tracking scripts (GA, Plausible, etc.)
  - Do NOT add cookie consent banners
  - Do NOT add structured data that editorializes (no "rating", no "review")

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: SEO is technical but not visual — metadata, sitemaps, structured data
  - **Skills**: [`next-best-practices`]
    - `next-best-practices`: Next.js metadata API, `generateMetadata`, sitemap conventions, robots.ts
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: No visual work in this task
    - `vercel-react-best-practices`: Not about React component performance

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 15)
  - **Parallel Group**: Wave 4 (with Tasks 15, 16 — but 16 depends on 14+15)
  - **Blocks**: Task 16
  - **Blocked By**: Tasks 11, 12, 13 (needs pages to exist for metadata)

  **References**:

  **Pattern References**:
  - Sérgio's portfolio (`/home/lxndr/Projects/Personal/LXNDR-PORTIFOLIO`) — has SEO setup with OG images, check `src/app/[locale]/layout.tsx` for metadata pattern (i18n-wrapped layout)

  **API/Type References**:
  - Next.js `Metadata` type, `generateMetadata` function signature
  - Next.js `MetadataRoute.Sitemap` type
  - JSON-LD `WebSite` and `Person` schemas

  **External References**:
  - Next.js metadata docs (use `next-best-practices` skill or `nextjs_docs` MCP)
  - Schema.org `Person`: `https://schema.org/Person`
  - Schema.org `WebSite` with `SearchAction`: `https://schema.org/WebSite`

  **WHY Each Reference Matters**:
  - SEO is critical for this project — shareable URLs on X/WhatsApp are a core use case
  - JSON-LD `SearchAction` helps Google understand the search functionality
  - Dynamic metadata ensures each parlamentar profile has unique OG tags for social sharing

  **Acceptance Criteria**:

  - [ ] Root layout has complete metadata (title, description, OG, Twitter, robots)
  - [ ] Dynamic pages have `generateMetadata` with parlamentar-specific titles
  - [ ] `/sitemap.xml` returns valid XML with all routes
  - [ ] `/robots.txt` allows crawling and references sitemap
  - [ ] JSON-LD structured data on landing + profile pages
  - [ ] OG image exists and is referenced in metadata
  - [ ] Sharing a profile URL on social media shows rich preview

  **QA Scenarios**:

  ```
  Scenario: Sitemap includes dynamic routes
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl http://localhost:3000/sitemap.xml
      2. Assert response is valid XML
      3. Assert contains `/deputados/` URLs
      4. Assert contains `/senadores/` URLs
      5. Assert contains `/` and `/busca`
    Expected Result: Valid sitemap with static and dynamic routes
    Failure Indicators: 404, empty sitemap, invalid XML
    Evidence: .sisyphus/evidence/task-14-sitemap.txt

  Scenario: Dynamic page has correct OG metadata
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl http://localhost:3000/deputados/{known-id}-{slug}
      2. Parse HTML for `<meta property="og:title">`
      3. Assert og:title contains deputado name
      4. Assert og:description is not empty
      5. Assert og:image is present
    Expected Result: OG tags with parlamentar-specific content
    Failure Indicators: Generic/missing OG tags, default title
    Evidence: .sisyphus/evidence/task-14-og-tags.txt

  Scenario: Robots.txt is valid
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl http://localhost:3000/robots.txt
      2. Assert contains "Allow: /"
      3. Assert contains "Sitemap:" URL
    Expected Result: Valid robots.txt allowing crawling
    Failure Indicators: 404, disallow all, missing sitemap reference
    Evidence: .sisyphus/evidence/task-14-robots.txt
  ```

  **Commit**: YES
  - Message: `feat(seo): add metadata, og tags, json-ld, sitemap`
  - Files: `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.*`
  - Pre-commit: `pnpm build && pnpm test`

- [ ] 15. Error States + Loading States + Empty States

  **What to do**:
  - Create Next.js error/loading boundaries for every route segment:
    - `src/app/error.tsx` — root error boundary (client component with `"use client"`)
    - `src/app/loading.tsx` — root loading state
    - `src/app/not-found.tsx` — global 404 page
    - `src/app/busca/loading.tsx` — search loading skeleton (grid of card skeletons)
    - `src/app/busca/error.tsx` — search error state
    - `src/app/deputados/[slug]/loading.tsx` — profile loading skeleton
    - `src/app/deputados/[slug]/error.tsx` — profile error state
    - `src/app/senadores/[slug]/loading.tsx` — profile loading skeleton (same as deputado)
    - `src/app/senadores/[slug]/error.tsx` — profile error state
    - `src/app/votacoes/[id]/loading.tsx` — votação loading skeleton
    - `src/app/votacoes/[id]/error.tsx` — votação error state
  - Error boundary pattern:
    - Display friendly error message in Portuguese: "Algo deu errado ao carregar os dados"
    - Show "Tentar novamente" retry button (calls `reset()`)
    - Show technical error detail in collapsible (for debugging)
    - Include source attribution: explain this may be due to government API unavailability
    - Log error to console (but no external error tracking in MVP)
  - Loading skeleton pattern:
    - Use shadcn `Skeleton` component
    - Match the exact layout of the loaded page (profile header skeleton, stat card skeletons, list skeletons)
    - Animate with subtle pulse
  - Empty states (review all pages):
    - Search: "Nenhum parlamentar encontrado para '{query}'"
    - Profile sections with no data: "Sem dados disponíveis" (NEVER "Sem atividade")
    - Votação without individual records: "Votação sem registro individual de votos"
  - Global 404 page:
    - "Página não encontrada" heading
    - Search bar CTA to redirect users
    - Link back to home
  - Write tests: error boundary renders retry button, loading skeletons render, 404 page renders

  **Must NOT do**:
  - Do NOT use "Sem atividade" anywhere (use "Sem dados disponíveis")
  - Do NOT add external error tracking (Sentry, etc.)
  - Do NOT add error pages that blame the user
  - Do NOT add humorous/cute error messages — maintain institutional tone

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Skeleton design, error page layout, empty state illustrations
  - **Skills**: [`frontend-design`, `next-best-practices`]
    - `frontend-design`: Skeleton patterns, error page design
    - `next-best-practices`: `error.tsx`, `loading.tsx`, `not-found.tsx` conventions
  - **Skills Evaluated but Omitted**:
    - `ui-ux-pro-max`: Error/loading states are simpler than full page design

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 14)
  - **Parallel Group**: Wave 4 (with Task 14)
  - **Blocks**: Task 16
  - **Blocked By**: Tasks 11, 12, 13 (needs pages to exist for matching skeleton layouts)

  **References**:

  **Pattern References**:
  - Task 8 components: `Skeleton` (shadcn), `EmptyState`
  - Task 11/12 page layouts — skeletons must match these structures
  - Task 2 design tokens — error/loading pages use same dark theme

  **API/Type References**:
  - Next.js `ErrorBoundary` props: `{ error: Error & { digest?: string }; reset: () => void }`
  - Next.js `loading.tsx` — exports default React component

  **External References**:
  - Next.js error handling: use `next-best-practices` skill for `error.tsx` conventions
  - shadcn `Skeleton` component: use `shadcn-ui_get_component` MCP

  **WHY Each Reference Matters**:
  - Error boundaries MUST be `"use client"` components — Next.js requirement
  - Skeletons should match page layout exactly to prevent layout shift
  - The "Sem dados disponíveis" vs "Sem atividade" distinction is a CORE guardrail

  **Acceptance Criteria**:

  - [ ] Every route segment has `error.tsx` and `loading.tsx`
  - [ ] `not-found.tsx` renders 404 page with search bar
  - [ ] Error boundary shows Portuguese message + retry button
  - [ ] Loading skeletons match page layouts (no layout shift)
  - [ ] ZERO instances of "Sem atividade" in entire codebase
  - [ ] Empty states use "Sem dados disponíveis" consistently
  - [ ] `pnpm build` succeeds
  - [ ] Tests pass

  **QA Scenarios**:

  ```
  Scenario: Global 404 page renders
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to `http://localhost:3000/pagina-que-nao-existe`
      2. Assert text "Página não encontrada" or "404" is visible
      3. Assert search input or link to home exists
      4. Take screenshot
    Expected Result: Friendly 404 page with navigation options
    Failure Indicators: Default Next.js 404, blank page, 500 error
    Evidence: .sisyphus/evidence/task-15-404-page.png

  Scenario: Zero instances of "Sem atividade" in codebase
    Tool: Bash
    Preconditions: All pages built
    Steps:
      1. Run `grep -ri "sem atividade" src/`
      2. Assert zero matches
      3. Run `grep -ri "sem dados disponíveis" src/`
      4. Assert at least 1 match (confirming the correct phrase is used)
    Expected Result: "Sem atividade" absent, "Sem dados disponíveis" present
    Failure Indicators: Any match for "Sem atividade"
    Evidence: .sisyphus/evidence/task-15-no-sem-atividade.txt

  Scenario: Loading skeleton matches profile layout
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to a deputado profile with network throttling (slow 3G)
      2. Take screenshot during loading state
      3. Assert skeleton elements are visible (pulse animation)
      4. Wait for full load
      5. Take screenshot of loaded state
      6. Compare: skeleton layout should roughly match loaded layout (header, stats, list areas)
    Expected Result: Skeleton matches final layout structure
    Failure Indicators: Spinner only, blank page during load, major layout shift
    Evidence: .sisyphus/evidence/task-15-skeleton-loading.png
  ```

  **Commit**: YES
  - Message: `feat(ui): add error, loading, and empty states`
  - Files: `src/app/**/error.tsx`, `src/app/**/loading.tsx`, `src/app/not-found.tsx`
  - Pre-commit: `pnpm build && pnpm test`

- [ ] 16. Performance Optimization + Final Polish

  **What to do**:
  - **Next.js config optimization** (`next.config.ts`):
    - Image optimization: configure `remotePatterns` for Câmara (`www.camara.leg.br`) and Senado (`www.senado.leg.br`) image domains
    - Enable `output: "standalone"` if deploying to Vercel (check Vercel recommendations)
    - Review and optimize ISR revalidate values based on actual API response times
  - **Bundle optimization**:
    - Run `pnpm build` and analyze output sizes
    - Ensure no unnecessary client-side JavaScript (keep server components default)
    - Verify tree-shaking works (no full library imports where partial imports suffice)
    - Lazy load heavy components if any (e.g., data tables with many rows)
  - **Image optimization**:
    - Use Next.js `<Image>` component for all parlamentar photos (not raw `<img>`)
    - Set proper `width`, `height`, `sizes` attributes
    - Add `priority` to above-the-fold images (profile photo, hero)
    - Blur placeholder for photos (use `placeholder="blur"` with `blurDataURL` — generate small data URL)
  - **Font optimization**:
    - Use `next/font` for custom fonts (Inter or Plus Jakarta Sans)
    - Ensure font is loaded with `display: "swap"` for no CLS
  - **Accessibility audit**:
    - Keyboard navigation: all interactive elements focusable and operable
    - Screen reader: proper heading hierarchy (h1 → h2 → h3), alt text on images, aria-labels on buttons
    - Color contrast: verify all text passes WCAG AA (should be done in Task 2, verify here)
    - Focus indicators: visible focus rings on all interactive elements
  - **Lighthouse audit**:
    - Run Lighthouse on key pages: `/`, `/busca?q=silva`, `/deputados/{id}`, `/senadores/{id}`
    - Target: Performance >80, Accessibility >90, Best Practices >90, SEO >90
    - Fix any issues found
  - **Final review sweep**:
    - Verify ALL source attributions present on every data section
    - Verify ALL "última atualização" timestamps present
    - Verify NO editorialized content anywhere
    - Verify NO default exports on non-page files
    - Verify import order follows convention (external → internal → types)
    - Run `pnpm tsc --noEmit && pnpm lint && pnpm test` — all must pass
  - Write performance tests if applicable (e.g., ensure API route response time < 2s)

  **Must NOT do**:
  - Do NOT add third-party analytics
  - Do NOT add service workers or PWA features
  - Do NOT add code splitting beyond what Next.js does automatically
  - Do NOT refactor architecture (this is polish, not restructure)

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Performance optimization requires methodical auditing, config tuning, and cross-cutting concerns
  - **Skills**: [`vercel-react-best-practices`, `next-best-practices`, `playwright`]
    - `vercel-react-best-practices`: React performance patterns, bundle optimization, server component usage
    - `next-best-practices`: Image optimization, font loading, next.config, ISR tuning
    - `playwright`: Lighthouse audit automation, accessibility testing
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: No design work, just optimization
    - `systematic-debugging`: Only needed if issues are found

  **Parallelization**:
  - **Can Run In Parallel**: NO (needs 14 + 15 complete — this is the final polish pass)
  - **Parallel Group**: Wave 4 (sequential after 14 + 15)
  - **Blocks**: F1-F4 (final verification)
  - **Blocked By**: Tasks 14, 15

  **References**:

  **Pattern References**:
  - ALL prior task outputs — this task reviews the entire codebase
  - Sérgio's import order convention (AGENTS.md): external → internal → types
  - Sérgio's named export convention

  **API/Type References**:
  - `next.config.ts`: `images.remotePatterns`, `output`, ISR settings
  - `next/font`: Google Fonts integration
  - `next/image`: `Image` component props

  **External References**:
  - Lighthouse CI: `npx lighthouse http://localhost:3000 --output=json`
  - Vercel deployment checklist
  - WCAG 2.1 AA checklist

  **WHY Each Reference Matters**:
  - `remotePatterns` must include both government image domains — without it, `<Image>` won't optimize external photos
  - `next/font` eliminates font CLS — critical for Lighthouse performance score
  - The final sweep is the LAST guardrail check before human review

  **Acceptance Criteria**:

  - [ ] `next.config.ts` has `remotePatterns` for Câmara + Senado image domains
  - [ ] All `<img>` tags replaced with `<Image>` from `next/image`
  - [ ] Fonts loaded via `next/font` with `display: "swap"`
  - [ ] Lighthouse Performance >80 on all key pages
  - [ ] Lighthouse Accessibility >90 on all key pages
  - [ ] All interactive elements keyboard navigable
  - [ ] All images have alt text
  - [ ] Heading hierarchy is correct (no skipped levels)
  - [ ] `pnpm build` output shows no unnecessarily large bundles
  - [ ] `pnpm tsc --noEmit && pnpm lint && pnpm test` all pass
  - [ ] Zero editorialized content in final sweep
  - [ ] All source attributions present
  - [ ] All "última atualização" timestamps present

  **QA Scenarios**:

  ```
  Scenario: Lighthouse audit passes thresholds
    Tool: Playwright (or Bash with lighthouse CLI)
    Preconditions: Production build running (`pnpm build && pnpm start`)
    Steps:
      1. Run Lighthouse on http://localhost:3000 (landing page)
      2. Assert Performance >= 80
      3. Assert Accessibility >= 90
      4. Assert Best Practices >= 90
      5. Assert SEO >= 90
      6. Run Lighthouse on http://localhost:3000/deputados/{known-id}
      7. Assert same thresholds
    Expected Result: All Lighthouse scores above thresholds
    Failure Indicators: Any score below threshold
    Evidence: .sisyphus/evidence/task-16-lighthouse.json

  Scenario: Keyboard navigation works on search
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to /busca?q=silva
      2. Press Tab to focus first result card
      3. Assert card has visible focus indicator (outline/ring)
      4. Press Enter on focused card
      5. Assert navigation to profile page
    Expected Result: Full keyboard navigation with visible focus
    Failure Indicators: No focus visible, Tab skips elements, Enter doesn't navigate
    Evidence: .sisyphus/evidence/task-16-keyboard-nav.png

  Scenario: Images use Next.js Image component
    Tool: Bash
    Preconditions: All components built
    Steps:
      1. grep -r '<img ' src/ (raw img tags)
      2. Assert zero matches (all replaced with <Image>)
      3. grep -r 'from "next/image"' src/
      4. Assert at least 3 matches (photo components use <Image>)
    Expected Result: No raw <img> tags, Next.js <Image> used everywhere
    Failure Indicators: Raw <img> tags found
    Evidence: .sisyphus/evidence/task-16-next-image.txt

  Scenario: No editorialized content in final sweep
    Tool: Bash
    Preconditions: Complete codebase
    Steps:
      1. grep -ri "sem atividade" src/ → assert 0
      2. grep -ri "ranking\|score\|rating\|pontuação" src/ → assert 0 (excluding type/schema definitions of raw API fields)
      3. grep -ri "mais ativo\|menos ativo\|melhor\|pior" src/ → assert 0
      4. grep -ri "lealdade\|fidelidade\|alinhamento" src/ → assert 0
    Expected Result: Zero instances of editorialized language
    Failure Indicators: Any matches found
    Evidence: .sisyphus/evidence/task-16-no-editorial.txt
  ```

  **Commit**: YES
  - Message: `perf: optimize bundle, images, caching`
  - Files: `next.config.ts`, various component updates
  - Pre-commit: `pnpm build && pnpm test && pnpm lint`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection → fix → re-run.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `pnpm tsc --noEmit` + `pnpm lint` + `pnpm test`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names (data/result/item/temp). Verify named exports everywhere (no default exports except page.tsx/layout.tsx). Verify import order (external → internal → types). Verify kebab-case file names.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration (search → profile → voting history → bill detail flow). Test edge cases: empty state, invalid IDs, broken photos, slow network. Test mobile viewport (375px). Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT Have" compliance — search for rankings, scores, color-coded judgments, editorialized labels. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

| Task | Commit Message | Files |
|------|---------------|-------|
| 1 | `chore: scaffold next.js 16 project with tooling` | package.json, tsconfig.json, jest.config.ts, .eslintrc, etc. |
| 2 | `feat(ui): add design system tokens and dark theme` | src/styles/, src/lib/theme/, tailwind config |
| 3 | `feat(types): add unified types and zod schemas for legislative data` | src/types/, src/lib/schemas/ |
| 4 | `feat(api): add câmara dos deputados api service layer` | src/lib/api/camara/ |
| 5 | `feat(api): add senado federal api service layer` | src/lib/api/senado/ |
| 6 | `feat(search): add search service and slug utilities` | src/lib/search/, src/lib/utils/ |
| 7 | `feat(api): add next.js route handlers for unified api` | src/app/api/ |
| 8 | `feat(ui): add reusable component library` | src/components/ |
| 9 | `feat(page): add institutional landing page` | src/app/page.tsx |
| 10 | `feat(page): add search page with results` | src/app/busca/ |
| 11 | `feat(page): add deputado profile page` | src/app/deputados/ |
| 12 | `feat(page): add senador profile page` | src/app/senadores/ |
| 13 | `feat(page): add votação detail page` | src/app/votacoes/ |
| 14 | `feat(seo): add metadata, og tags, json-ld, sitemap` | src/app/layout.tsx, src/app/sitemap.ts |
| 15 | `feat(ui): add error, loading, and empty states` | src/app/**/error.tsx, loading.tsx |
| 16 | `perf: optimize bundle, images, caching` | next.config.ts, various |

---

## Success Criteria

### Verification Commands
```bash
pnpm build          # Expected: Build succeeds, 0 TypeScript errors
pnpm test           # Expected: All tests pass
pnpm lint           # Expected: 0 warnings, 0 errors
```

### Final Checklist
- [ ] All "Must Have" items present and verified
- [ ] All "Must NOT Have" items absent — zero violations
- [ ] All tests pass (`pnpm test`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Lint clean (`pnpm lint`)
- [ ] Lighthouse: Performance >80, Accessibility >90
- [ ] Mobile responsive (375px viewport)
- [ ] All data shows source attribution
- [ ] "Última atualização" timestamps visible
- [ ] Search works for known names
- [ ] Profile pages render for both deputados and senadores
- [ ] Senador attendance shows "Dados de presença não disponíveis via API do Senado"
- [ ] No editorialized content anywhere
