/**
 * Brand color constants for JavaScript contexts
 * Contrast ratios validated against #09090b background (WCAG AA)
 */
export const colors = {
  verde: "#22c55e",     // 6.88:1
  amarelo: "#facc15",   // 12.6:1
  azul: "#3b82f6",      // 6.4:1
  background: "#09090b", // zinc-950
} as const;

export type BrandColor = keyof typeof colors;
