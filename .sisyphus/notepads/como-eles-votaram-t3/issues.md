# Issues — Como Eles Votaram T3

Problems found, gotchas, things that broke (and how we fixed them).

---
## [2026-02-20] create-t3-app prompts despite CI flags
- **Issue**: CLI still prompts when directory contains `.sisyphus/`.
- **Fix**: Temporarily move `.sisyphus/` out, run scaffold, then restore.

## [2026-02-20] Jest TS config fails under ESM strict settings
- **Issue**: `jest.config.ts` required `ts-node` and failed under `verbatimModuleSyntax`.
- **Fix**: Use `jest.config.mjs` with ESM syntax.
