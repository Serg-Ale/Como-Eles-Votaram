import { render, screen } from "@testing-library/react";
import SenadorPage from "../page";
import { notFound } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => { throw new Error("NEXT_NOT_FOUND"); }),
}));

// Mock slug parsing
jest.mock("@/lib/search/slug", () => ({
  parseSlug: jest.fn((slug) => {
    if (!slug || !slug.startsWith("sen-")) return { id: undefined, nameSlug: "" };
    const parts = slug.split("-");
    // e.g. sen-123-nome-sobrenome -> id: sen-123, nameSlug: nome-sobrenome
    const id = `${parts[0]}-${parts[1]}`;
    const nameSlug = parts.slice(2).join("-");
    return { id, nameSlug };
  }),
}));

// Mock components
jest.mock("@/components/parlamentar/parlamentar-header", () => ({
  ParlamentarHeader: ({ parlamentar }: { parlamentar: any }) => (
    <div data-testid="parlamentar-header">
      {parlamentar.nome} - {parlamentar.camara === "camara" ? "Câmara" : "Senado Federal"}
    </div>
  ),
}));

jest.mock("@/components/data/stat-card", () => ({
  StatCard: ({ label, value }: { label: string; value: number }) => (
    <div data-testid="stat-card">
      {label}: {value}
    </div>
  ),
}));

jest.mock("@/components/parlamentar/voting-history", () => ({
  VotingHistory: () => <div data-testid="voting-history">Voting History</div>,
}));

jest.mock("@/components/data/data-table", () => ({
  DataTable: () => <div data-testid="data-table">Data Table</div>,
}));

jest.mock("@/components/data/fonte-badge", () => ({
  FonteBadge: ({ label }: { label: string }) => <div data-testid="fonte-badge">{label}</div>,
}));

jest.mock("@/components/data/ultima-atualizacao", () => ({
  UltimaAtualizacao: () => <div data-testid="ultima-atualizacao">Atualizado</div>,
}));

// Mock TRPC
const mockGetById = jest.fn();

jest.mock("@/trpc/server", () => ({
  api: {
    parlamentar: {
      getById: (...args: any[]) => mockGetById(...args),
    },
  },
}));

describe("SenadorPage", () => {
  const mockSenador = {
    id: "sen-123",
    nome: "Senador Teste",
    nomeEleitoral: "Senador",
    partido: "PARTIDO",
    uf: "UF",
    foto: "https://legis.senado.leg.br/foto.jpg", // HTTPS check
    email: "senador@senado.leg.br",
    camara: "senado", // Senado
    updatedAt: new Date(),
    votos: [
      { id: "1", votacao: { id: "v1", titulo: "Votação 1" }, voto: "Sim" },
    ],
    proposicoes: [
      { id: "1", tipo: "PL", numero: 123, ano: 2023, ementa: "Projeto de Lei" },
    ],
    _count: {
      votos: 50,
      proposicoes: 20,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders successfully when senador is found", async () => {
    mockGetById.mockResolvedValue(mockSenador);

    const page = await SenadorPage({
      params: Promise.resolve({ slug: "sen-123-senador-teste" }),
    });
    
    render(page);

    expect(mockGetById).toHaveBeenCalledWith({ id: "sen-123" });
    
    // Check header for Senado context
    expect(screen.getByTestId("parlamentar-header")).toHaveTextContent("Senador Teste - Senado Federal");
    
    // Check stats (Vote and Proposition counts)
    expect(screen.getByText("Votações participadas: 50")).toBeInTheDocument();
    expect(screen.getByText("Proposições apresentadas: 20")).toBeInTheDocument();
    
    // Check NO attendance stats (should not be present)
    expect(screen.queryByText(/presença/i)).not.toBeInTheDocument();

    // Check history and table
    expect(screen.getByTestId("voting-history")).toBeInTheDocument();
    expect(screen.getByTestId("data-table")).toBeInTheDocument();

    // Check source attribution
    const badges = screen.getAllByTestId("fonte-badge");
    badges.forEach(badge => {
      expect(badge).toHaveTextContent("Dados Abertos do Senado Federal");
    });
  });

  it("calls notFound when id is missing/invalid slug format", async () => {
    // parseSlug mock returns undefined id for "invalid-slug"
    await expect(
      SenadorPage({
        params: Promise.resolve({ slug: "invalid-slug" }),
      })
    ).rejects.toThrow("NEXT_NOT_FOUND");

    expect(notFound).toHaveBeenCalled();
    expect(mockGetById).not.toHaveBeenCalled();
  });

  it("calls notFound when senador is not found in api", async () => {
    mockGetById.mockResolvedValue(null);

    await expect(
      SenadorPage({
        params: Promise.resolve({ slug: "sen-999-not-found" }),
      })
    ).rejects.toThrow("NEXT_NOT_FOUND");

    expect(mockGetById).toHaveBeenCalledWith({ id: "sen-999" });
    expect(notFound).toHaveBeenCalled();
  });

  it("calls notFound when parlamentar is from camara (camara: camara)", async () => {
    mockGetById.mockResolvedValue({
      ...mockSenador,
      camara: "camara", // Not a senator
    });

    await expect(
      SenadorPage({
        params: Promise.resolve({ slug: "sen-123-deputado-fake" }),
      })
    ).rejects.toThrow("NEXT_NOT_FOUND");

    expect(mockGetById).toHaveBeenCalledWith({ id: "sen-123" });
    expect(notFound).toHaveBeenCalled();
  });
});
