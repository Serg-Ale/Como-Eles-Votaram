
## Design System & Theme (Task 2)
- **Dark Mode Strategy**: Enforced via `color-scheme: dark` in `globals.css`. No light mode classes or toggles used.
- **Brazilian Flag Colors**:
  - Raw flag colors fail WCAG AA on dark backgrounds.
  - **Verde**: Used `#22c55e` (Green-500) for better visibility (6.88:1 contrast on Zinc-950).
  - **Amarelo**: Used `#facc15` (Yellow-400) for high visibility (12.6:1 contrast).
  - **Azul**: Used `#3b82f6` (Blue-500) for accents (6.4:1 contrast).
- **Tailwind v4 Config**: Defined tokens in `globals.css` using `@theme` block instead of JS config.
- **Shadcn Compatibility**: Mapped semantic tokens (`--primary`, `--secondary`) to Zinc scale for neutral UI elements, reserving flag colors for specific accents/data visualization.
