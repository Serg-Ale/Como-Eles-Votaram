import { render, screen } from "@testing-library/react";
import NotFound from "../not-found";

jest.mock("@/components/search/hero-search-bar", () => ({
  HeroSearchBar: () => <div data-testid="hero-search-bar">Search Bar</div>,
}));

describe("Global Not Found Page", () => {
  it("renders the 404 heading", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { name: /página não encontrada/i })).toBeInTheDocument();
  });

  it("renders the descriptive text", () => {
    render(<NotFound />);
    expect(screen.getByText("O endereço que você acessou não existe ou foi removido.")).toBeInTheDocument();
  });

  it("renders the search bar", () => {
    render(<NotFound />);
    expect(screen.getByTestId("hero-search-bar")).toBeInTheDocument();
  });

  it("renders a link back to home", () => {
    render(<NotFound />);
    const link = screen.getByRole("link", { name: /voltar para a página inicial/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
