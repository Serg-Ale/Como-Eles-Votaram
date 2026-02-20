import { render, screen } from "@testing-library/react";
import { VotoBadge } from "../votacao/voto-badge";

describe("VotoBadge", () => {
  it("renders the vote text correctly", () => {
    render(<VotoBadge voto="Sim" />);
    expect(screen.getByText("Sim")).toBeInTheDocument();
  });

  it("applies correct styling for 'Sim'", () => {
    render(<VotoBadge voto="Sim" data-testid="badge" />);
    const badge = screen.getByText("Sim");
    expect(badge).toHaveClass("bg-blue-500");
  });

  it("applies correct styling for 'Não'", () => {
    render(<VotoBadge voto="Não" />);
    const badge = screen.getByText("Não");
    expect(badge).toHaveClass("bg-amber-500");
  });

  it("applies neutral styling for unknown vote types", () => {
    render(<VotoBadge voto="Desconhecido" />);
    const badge = screen.getByText("Desconhecido");
    expect(badge).toHaveClass("bg-muted");
  });
});
