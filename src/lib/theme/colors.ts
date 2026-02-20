/** Navy Civic Dark palette — acid green primary on navy deep background */
export const colors = {
  primary: "#34d399",    // acid green (hsl 142 76% 52%)
  background: "#071018", // navy deep (hsl 220 50% 4%)
} as const;

export type BrandColor = keyof typeof colors;
