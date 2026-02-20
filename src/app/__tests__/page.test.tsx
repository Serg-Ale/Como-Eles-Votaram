import { render, screen, fireEvent } from "@testing-library/react";
import Page from "../page";
import { HeroSearchBar } from "@/components/search/hero-search-bar";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock trpc server
jest.mock("@/trpc/server", () => ({
  api: {
    stats: {
      getCounts: jest.fn().mockResolvedValue({
        totalDeputados: 513,
        totalSenadores: 81,
        totalVotacoes: 1500,
        totalProposicoes: 5000,
        lastSync: new Date("2023-10-27T10:00:00Z"),
      }),
    },
  },
  HydrateClient: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock child components to avoid deep rendering issues if any
jest.mock("@/components/search/hero-search-bar", () => ({
  HeroSearchBar: () => <div data-testid="hero-search-bar">Search Bar</div>,
}));

describe("Home Page", () => {
  it("renders the hero section with correct text", async () => {
    const page = await Page();
    render(page);
    
    expect(screen.getByRole("heading", { name: /Como Eles Votaram/i })).toBeInTheDocument();
    expect(screen.getByText("Menos discurso. Mais registro.")).toBeInTheDocument();
    expect(screen.getByTestId("hero-search-bar")).toBeInTheDocument();
  });

  it("renders the manifesto section", async () => {
    const page = await Page();
    render(page);
    
    expect(screen.getByText("Tornar visível o que já é público")).toBeInTheDocument();
    expect(screen.getByText(/O dado faz o confronto/)).toBeInTheDocument();
  });

  it("renders the how it works section with 3 steps", async () => {
    const page = await Page();
    render(page);
    
    expect(screen.getByText("Como funciona")).toBeInTheDocument();
    expect(screen.getByText("Busque")).toBeInTheDocument();
    expect(screen.getByText("Veja como votou")).toBeInTheDocument();
    expect(screen.getByText("Tire conclusões")).toBeInTheDocument();
  });

  it("renders the stats section with data from api", async () => {
    const page = await Page();
    render(page);
    
    // Check if the numbers are present (regex for formatted numbers might be needed if formatted)
    expect(screen.getByText("513")).toBeInTheDocument(); // Deputados
    expect(screen.getByText("81")).toBeInTheDocument(); // Senadores
    expect(screen.getByText("1.500")).toBeInTheDocument(); // Votações
  });

  it("renders source attribution links", async () => {
    const page = await Page();
    render(page);
    
    const camaraLink = screen.getByText("Dados Abertos - Câmara");
    const senadoLink = screen.getByText("Dados Abertos - Senado");
    
    expect(camaraLink).toBeInTheDocument();
    expect(senadoLink).toBeInTheDocument();
  });
});
