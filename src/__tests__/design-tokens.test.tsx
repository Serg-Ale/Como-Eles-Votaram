import { render } from '@testing-library/react';

const TestComponent = () => (
  <div style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
    Design Token Test
  </div>
);

describe('Design Tokens', () => {
  it('renders components using CSS custom properties without errors', () => {
    const { container } = render(<TestComponent />);
    expect(container).toBeInTheDocument();
    expect(container.querySelector('div')).toHaveStyle({
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
    });
  });
  
  it('exports brand colors from colors.ts', async () => {
    const { colors } = await import('@/lib/theme/colors');
    expect(colors.verde).toBe('#22c55e');
    expect(colors.amarelo).toBe('#facc15');
    expect(colors.azul).toBe('#3b82f6');
    expect(colors.background).toBe('#09090b');
  });
});
