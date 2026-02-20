# Decisions — Como Eles Votaram T3

Architectural choices, trade-offs, "why we did X not Y".

---
## [2026-02-20] Jest config format

**Decision**: Use `jest.config.mjs` with ESM syntax (not TypeScript).

**Context**:
- Project uses `type: module` and `verbatimModuleSyntax` in tsconfig.
- TypeScript-based Jest config requires `ts-node` and still errors under ESM rules.

**Rationale**:
- ESM config works with Next.js `next/jest` without extra loaders.
- Keeps test runs stable in CI and local scripts.
## [2026-02-20 T04:00 UTC] Task 1: ESLint Script Fix

**Decision**: Changed `package.json` lint script from `next lint` to `eslint . --max-warnings 0`

**Context**:
- `next lint` fails in Next.js 16.1.6 with error: "Invalid project directory provided, no such directory: /path/to/project/lint"
- This is a known bug in Next.js 16.1.6
- Direct ESLint execution (`npx eslint`) works perfectly

**Rationale**:
- Subagent documented this issue and created minimal eslint.config.mjs as workaround
- Changed lint script to bypass broken `next lint` command
- ESLint still validates code successfully — just via direct invocation instead of Next.js wrapper
- This unblocks QA verification for all future tasks

**Impact**:
- `pnpm lint` now works reliably
- All linting functionality preserved
- May need to revisit if Next.js fixes the bug in future version

**Alternatives Considered**:
- Downgrade Next.js to 15.x: Rejected (Task explicitly requires 16.x)
- Use `next lint --dir .`: Rejected (same error)
- Leave broken and use `npx eslint` manually: Rejected (breaks automation)
