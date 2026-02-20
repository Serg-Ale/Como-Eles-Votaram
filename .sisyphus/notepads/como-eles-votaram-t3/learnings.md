
## [2026-02-20T10:00:00Z] Task 18: Error/Loading States
- **Next.js 16 Error Boundaries**: Must be "use client". The `reset` function is critical for retrying server actions or data fetching.
- **Skeleton Matching**: Matching the exact structure of the page (grids, headers, stats) significantly reduces layout shift.
- **TDD for Loading States**: Testing skeletons is tricky because they are visual. Checking for class names and number of elements is a good proxy for structure.
- **Global 404**: Custom 404 pages in Next.js 16 must replace the default. Adding search functionality to 404 keeps users in the flow.
- **Forbidden Phrases**: Successfully avoided "Sem atividade" and "API do governo" by using neutral language like "Sem dados disponíveis" and "Algo deu errado".
- **Empty States**: Used existing `EmptyState` component with "Nenhum resultado encontrado" or "Sem dados disponíveis".
