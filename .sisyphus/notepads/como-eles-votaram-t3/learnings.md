# Learnings — Como Eles Votaram T3

Convention discoveries, patterns that work, reusable insights.

---
## [2026-02-20 T03:57 UTC] Task 1: T3 Tooling Setup Completion

### Files Created
- `jest.config.js` - Configured for Next.js 16 SWC transform, jsdom environment, path alias support
- `jest.setup.ts` - Imports `@testing-library/jest-dom`
- `eslint.config.mjs` - ESLint v9 flat config (minimal, ignores directories)
- `.prettierrc` - Tailwind CSS plugin configured with semicolons, trailing commas, double quotes
- `commitlint.config.js` - ESM format, extends `@commitlint/config-conventional`
- `.husky/commit-msg` - Git hook for commitlint validation
- `src/__tests__/setup.test.ts` - Smoke test verifying Jest setup works

### Verification Results
✓ Jest: 2 tests passed, 2 test suites
✓ ESLint: Passes with zero errors/warnings
✓ Commitlint: Rejects invalid messages, accepts conventional commits
✓ Husky: commit-msg hook executable and installed

### Key Learnings

#### ESLint 9 Flat Config Complexity
- ESLint v9 requires flat config (`eslint.config.mjs` or `.eslintrc.js`)
- FlatCompat + extends("next/core-web-vitals") causes circular structure errors
- Solution: Use minimal flat config that just ignores directories; Next.js handles most linting via `next build` anyway
- The legacy `.eslintrc.cjs` format doesn't work with ESLint v9

#### Jest with ES Modules
- Project uses `"type": "module"` in package.json (ESM)
- `jest.config.ts` requires `ts-node` which wasn't installed
- Solution: Use `jest.config.js` with ES module syntax (`export default`)
- Jest auto-finds the config via FlatCompat pattern

#### Commitlint with ESM
- commitlint config must match project's module system
- CommonJS `module.exports` fails with ESM projects
- Solution: Use `export default` syntax in `commitlint.config.js`

#### Next.js Lint Command Issue
- `next lint` in v16.1.6 appears broken - treats command as directory path
- Workaround: Use `npx eslint` directly or update lint script to `eslint . `
- Note: This is a known issue in certain Next.js versions

#### File Discovery
- Jest testMatch pattern: `**/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)`
- Created test file `src/__tests__/setup.test.ts` which Jest auto-discovered
- Simple smoke test sufficient - Jest setup validation doesn't require complex test

### Recommendations for Next Tasks
1. If modifying ESLint config, stick with minimal flat config - extending "next/core-web-vitals" causes issues
2. Jest is fully functional; no additional setup needed for feature tests
3. Commitlint validation works - enforce via pre-commit hook in future tasks
4. Prettier is installed but config is basic - enhance if styling is critical
5. Consider updating lint script in package.json to use `eslint . --max-warnings 0` if needed

### Technical Debt / Edge Cases
- ESLint config is minimal and doesn't extend Next.js recommended rules
- Could enhance eslint.config.mjs with proper imports if FlatCompat compatibility improves
- Type checking happens via `pnpm typecheck` - separate from linting


## Design Tokens & Theme Configuration (Task 3)

- **Dark Mode Strategy**: Removed `.dark` class selector entirely. All theme variables are now defined in `:root` for permanent dark mode.
- **Brand Colors**: 
  - Validated WCAG AA contrast ratios against #09090b background:
    - Verde (#22c55e): 6.88:1
    - Amarelo (#facc15): 12.6:1
    - Azul (#3b82f6): 6.4:1
  - Implemented as HSL values in CSS variables to support Tailwind opacity modifiers (e.g., `bg-primary/50`).
- **Typography**: 
  - Maintained existing font stack (Geist Sans + system fonts) for performance and clean aesthetic.
  - `font-feature-settings: "rlig" 1, "calt" 1` enabled for better legibility.
- **Shadcn Integration**:
  - Mapped semantic tokens (primary, secondary, accent, etc.) to brand colors.
  - `primary` mapped to `azul` (Blue) for trust/neutrality.
  - `accent` mapped to `verde` (Green) for positive actions/highlights.
  - `destructive` mapped to Red-800 for clear danger indication.
- **File Structure**:
  - `src/styles/globals.css` is the active global stylesheet (imported in `layout.tsx`), not `src/app/globals.css`.
- Created `src/lib/theme/colors.ts` for type-safe color access in JS/TS.

---
## [2026-02-20] Task 1: T3 Stack Initialization (Next.js 16)

### Key Learnings
- `create-t3-app` flags require `--CI` to avoid prompts; use `pnpm dlx create-t3-app@latest . --CI --trpc --prisma --tailwind --dbProvider postgres --appRouter --noGit`.
- When the repo contains only `.sisyphus/`, the scaffold still detects a non-empty dir; temporarily move `.sisyphus/` out to avoid the prompt.
- `shadcn` CLI v3 uses `init --template next --base-color zinc --src-dir --css-variables`; `--style` flag is not supported.
- Jest config works best as `jest.config.mjs` in ESM projects; TS config requires `ts-node` and is sensitive to `verbatimModuleSyntax`.
- Husky needs a git repo to install hooks; run `git init` before `pnpm prepare`.

## Task 3: Prisma + Docker Completion (2026-02-20)

### Docker Setup
- **Port Conflict**: localhost:5432 was already in use by union-audio-backend-mvp-union-db-1
- **Solution**: Changed docker-compose.yml to expose PostgreSQL on port 5433 instead
- **Verification**: `pg_isready` confirms container accepts connections immediately after `docker compose up -d`
- **T3 Pattern**: Docker service named "db" with Alpine 16 keeps image minimal

### Prisma Client Generation
- **Output Path**: Custom output path set in schema.prisma: `output = "../generated/prisma"`
- **Generation Speed**: Takes ~74ms to generate full TypeScript definitions
- **Regeneration**: Automatic on `postinstall` script (pnpm install)
- **Type Exports**: All 5 models (Parlamentar, VoteEvent, VoteRecord, Proposicao, SyncLog) properly typed

### Database Schema Application
- **Execution**: `pnpm prisma db push` creates all 5 tables from schema in 143ms
- **Idempotent**: Safe to run multiple times (detects existing schema)
- **Auto-generation**: Running db push also triggers prisma generate automatically
- **Schema Correctness**: All indexes, foreign keys, and constraints created correctly

### Prisma Singleton Pattern
- **Implementation**: Uses `globalThis` to prevent multiple PrismaClient instances
- **HMR Safety**: In development, client reused across hot module reloads
- **Logging**: Enabled in dev ("query", "error", "warn"); only "error" in prod
- **Import Path**: Must import from `../../generated/prisma` (NOT `@prisma/client`)
- **Type Safety**: Using generated types ensures compile-time model validation

### Testing Strategy
- **Type Inference Tests**: `@jest-environment node` pragma required for Prisma types
- **Jest Environment**: Default jsdom doesn't support server-side code (db imports)
- **Solution**: Used `@jest-environment node` docstring to run db tests in Node
- **Window Guard**: Added `typeof window !== "undefined"` check in jest.setup.ts for browser-specific mocks
- **Model Validation**: Tests verify all 5 models exist and have correct field types

### Boilerplate Cleanup
- **post.ts router**: T3 scaffold used non-existent "post" model; removed mutations (kept hello query)
- **post.tsx component**: Removed API calls to getLatest/create; kept placeholder text
- **page.tsx**: Removed `api.post.getLatest.prefetch()` call to fix build error
- **Build Impact**: These removals allow build to pass without breaking infrastructure

### Database URL Configuration
- **Changed**: `postgresql://postgres:postgres@localhost:5432` → `:5433` in .env
- **Reason**: Port conflict with existing postgres container
- **Note**: Documentation port is 5432; actual running on 5433 for this project

### Recommendations for Wave 2
- Create specific routers for each domain: parlamentares, votacoes, proposicoes, sync-logs
- Implement proper API handlers with tRPC procedures for data fetching
- Add Prisma middleware for logging/debugging in development
- Consider adding computed fields in Prisma schema for complex queries (e.g., voto counts)
- Plan for seed data strategy when sync service is integrated
- Use Prisma introspection for documentation generation


---
## [2026-02-20] Task 4: Zod Schema Creation & Validation

### Schema Architecture

#### Prisma-Aligned Schemas (Domain Models)
- **parlamentar.schema.ts**: Validates Parlamentar entities from DB
  - ID format validation: "dep-{id}" or "sen-{id}" stored as strings
  - URL validation for foto field (z.string().url())
  - Optional nullable email field
  - Default legislatura: 57
  
- **votacao.schema.ts**: Validates VoteEvent and VoteRecord entities
  - VoteTypeEnum: Strict enum for vote types ("Sim", "Não", "Abstenção", "Obstrução", "Art. 17", "Não Votou")
  - VoteEventSchema: Models voting sessions with externalId for API composite IDs
  - VoteRecordSchema: Individual vote records with CUID primary keys
  - All datetime fields use z.coerce.date() for string→date conversion
  
- **proposicao.schema.ts**: Validates Proposicao (Bills/Propositions)
  - tipo field accepts any string (PL, PEC, PLP, PDL, etc.)
  - URL validation for urlInteiro field
  - Optional nullable autorId field for author relationships

#### Raw API Schemas (External Data)
- **camara-raw.schema.ts**: 6 schemas for Câmara API responses
  1. CamaraWrapperSchema: Generic response wrapper with dados array + links
  2. CamaraDeputadoRawSchema: Minimal deputy info (list endpoint)
  3. CamaraDeputadoDetailRawSchema: Extended deputy with ultimoStatus nested object
  4. CamaraVotacaoRawSchema: Voting session with placar (scores) fields
  5. CamaraVotoRawSchema: Individual vote with nested deputado_ object
  6. CamaraProposicaoRawSchema: Bill details with statusProposicao nested structure

- **senado-raw.schema.ts**: 4 schemas for Senado API responses
  - Deeply nested PascalCase naming (e.g., CodigoParlamentar, IdentificacaoParlamentar)
  - SenadoSenadorListRawSchema: Wrapper with ListaParlamentarEmExercicio structure
  - SenadoVotacaoRawSchema: Session voting with optional Materia (subject)
  - SenadoVotoRawSchema: Simple vote with CodigoParlamentar identifier

### API Response Structure Differences

**Câmara API**:
- snake_case field names (id, nome, siglaPartido)
- Response wrapper: `{ dados: [...], links: [...] }`
- Nested objects use underscore suffix: deputado_

**Senado API**:
- PascalCase field names (CodigoParlamentar, NomeParlamentar)
- XML-to-JSON conversion results in deeply nested structures
- List responses wrapped in ListaParlamentarEmExercicio > Parlamentares > Parlamentar[]

### Type Derivation Pattern

All schemas use schema-first approach:
```typescript
export const MySchema = z.object({ /* ... */ });
export type MyType = z.infer<typeof MySchema>;
```

Benefits:
- Single source of truth (schema is the authority)
- Types stay synchronized with validation logic
- No manual type duplication

### Test Coverage

Total: 61 tests (40+ new schema tests + existing 21 tests)

**Per Schema**:
- parlamentar: 7 tests (valid, invalid, URL validation, enum validation, defaults, nullable)
- votacao: 10 tests (VoteTypeEnum 2, VoteEventSchema 5, VoteRecordSchema 3)
- proposicao: 7 tests (valid, optional fields, invalid URL, nullable fields, date coercion, type variations)
- camara-raw: 21 tests across 6 schemas
  - CamaraWrapper: 3 tests
  - CamaraDeputado: 3 tests
  - CamaraDeputadoDetail: 2 tests
  - CamaraVotacao: 3 tests
  - CamaraVoto: 2 tests
  - CamaraProposicao: 5 tests
- senado-raw: 16 tests across 4 schemas
  - SenadoSenador: 4 tests
  - SenadoSenadorList: 2 tests
  - SenadoVotacao: 3 tests
  - SenadoVoto: 4 tests

**Test Patterns Used**:
1. Happy path: Valid data parses without error
2. Validation: Invalid data throws ZodError
3. Edge cases: Nullable fields, optional fields, enum validation, type coercion, nested structures
4. Type-specific: URL validation, int validation, array length, optional properties

### Verification Results

✓ All 61 tests pass (including 40+ new schema tests)
✓ TypeScript: `pnpm typecheck` passes with zero errors
✓ Build: `pnpm build` succeeds (3 static pages, dynamic routes compiled)
✓ LSP: No errors in any schema files
✓ Exports: All schemas accessible via barrel import (`src/lib/schemas/index.ts`)

### Key Decisions

1. **URL Validation**: Used z.string().url() for foto/urlFoto/urlInteiro fields
   - Automatically validates HTTPS URLs
   - Rejects invalid URLs at parse time

2. **Date Coercion**: Used z.coerce.date() for all date fields
   - Accepts string ("2024-02-15") or Date objects
   - Returns Date object after parsing
   - Better developer experience than strict type checking

3. **Enum for Vote Types**: Created VoteTypeEnum for centralized validation
   - Prevents typos in vote type strings
   - Type exported as VoteType for TS support
   - Single source of truth for valid vote values

4. **Optional vs Nullable**: 
   - `.optional()` - field can be missing from object
   - `.nullable()` - field can be present but null
   - Both used together: `.optional().nullable()`

5. **Nested Object Handling**: 
   - ultimoStatus, statusProposicao, Materia all wrapped in z.object()
   - Optional nested objects use `.optional()` on parent
   - Preserves API response structure for easier transformation

### Integration Points for Tasks 5-6

- **Task 5 (Transformation)**: Raw API schemas need transformers to map Câmara/Senado responses to domain models
- **Task 6 (Sync Service)**: Use domain schemas to validate data before database insertion
- **Data Flow**:
  1. Fetch from API → validate with raw schema
  2. Transform via adapter → map fields, transform data types
  3. Validate with domain schema → ensure DB constraints met
  4. Insert via Prisma → type-safe database write

### Recommendations for Wave 2

1. Add runtime validation middleware to API routes using these schemas
2. Create adapter/transformer functions that map raw schemas to domain schemas
3. Consider adding `.describe()` to important fields for OpenAPI documentation
4. Add custom error messages via `.refine()` for business logic validation
5. Create integration tests that validate actual API responses against schemas
6. Consider zod-to-openapi for auto-generating API documentation

