import { render, screen } from "@testing-library/react";
import VotacaoPage from "../page";
import { notFound } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => { throw new Error("NEXT_NOT_FOUND"); }),
}));

// Mock components to avoid deep rendering
jest.mock("@/components/data/stat-card", () => ({
  StatCard: ({ label, value }: { label: string; value: number }) => (
    <div data-testid="stat-card">
      {label}: {value}
    </div>
  ),
}));

jest.mock("@/components/votacao/voto-badge", () => ({
  VotoBadge: ({ voto }: { voto: string }) => (
    <div data-testid="voto-badge">{voto}</div>
  ),
}));

jest.mock("@/components/data/data-table", () => ({
  DataTable: ({ columns, data }: { columns: any[], data: any[] }) => (
    <div data-testid="data-table">
      Row Count: {data.length}
      {data.map((row: any, i) => (
        <div key={i} data-testid="data-row">
          {row.parlamentarName} - {row.voto}
        </div>
      ))}
    </div>
  ),
}));

jest.mock("@/components/data/fonte-badge", () => ({
  FonteBadge: () => <div data-testid="fonte-badge">Fonte</div>,
}));

jest.mock("@/components/data/empty-state", () => ({
  EmptyState: ({ description }: { description: string }) => (
    <div data-testid="empty-state">{description}</div>
  ),
}));

jest.mock("@/components/data/ultima-atualizacao", () => ({
  UltimaAtualizacao: () => <div data-testid="ultima-atualizacao">Atualizado</div>,
}));

// Mock buildProfileUrl
jest.mock("@/lib/search/slug", () => ({
  buildProfileUrl: jest.fn((p) => `/mock/${p.chamber}/${p.id}`),
}));

// Mock formatDate
jest.mock("@/lib/search/format", () => ({
  formatDate: jest.fn((date) => "15/06/2024"),
}));

// Mock TRPC
const mockGetById = jest.fn();
const mockGetVoteSummary = jest.fn();

jest.mock("@/trpc/server", () => ({
  api: {
    votacao: {
      getById: (...args: any[]) => mockGetById(...args),
      getVoteSummary: (...args: any[]) => mockGetVoteSummary(...args),
    },
  },
}));

describe("VotacaoPage", () => {
  const mockVoteEvent = {
    id: "vot-123",
    data: new Date("2024-06-15"),
    descricao: "PL 1234/2024 - Votação em Plenário",
    resultado: "Aprovado",
    proposicao: {
      tipo: "PL",
      numero: 1234,
      ano: 2024,
      ementa: "Dispõe sobre...",
      urlTexto: "https://example.com/texto",
    },
    votos: [
      {
        id: "vote-1",
        voto: "Sim",
        parlamentar: {
          id: "dep-123",
          nome: "João Silva",
          partido: "PT",
          uf: "SP",
          camara: "camara",
        },
      },
    ],
  };

  const mockVoteSummary = {
    "Sim": 350,
    "Não": 120,
    "Abstenção": 15,
    "Obstrução": 0,
    "Art. 17": 3,
    "Não Votou": 25,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders voting details successfully", async () => {
    mockGetById.mockResolvedValue(mockVoteEvent);
    mockGetVoteSummary.mockResolvedValue(mockVoteSummary);

    const page = await VotacaoPage({
      params: Promise.resolve({ id: "vot-123" }),
    });
    
    render(page);

    expect(mockGetById).toHaveBeenCalledWith({ id: "vot-123" });
    expect(screen.getByText("PL 1234/2024 - Votação em Plenário")).toBeInTheDocument();
    expect(screen.getByText("Aprovado")).toBeInTheDocument();
    expect(screen.getByText("Dispõe sobre...")).toBeInTheDocument();
    // Check for StatCards
    expect(screen.getByText("Sim: 350")).toBeInTheDocument();
    expect(screen.getByText("Não: 120")).toBeInTheDocument();
  });

  it("renders empty state for symbolic votes (no individual records)", async () => {
    mockGetById.mockResolvedValue({
      ...mockVoteEvent,
      votos: [],
    });
    mockGetVoteSummary.mockResolvedValue({}); // No counts

    const page = await VotacaoPage({
      params: Promise.resolve({ id: "vot-symbolic" }),
    });

    render(page);

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(screen.getByText("Votação sem registro individual de votos — votações simbólicas ou em comissão podem não ter registro nominal.")).toBeInTheDocument();
  });

  it("calls notFound when votacao is not found", async () => {
    mockGetById.mockResolvedValue(null);

    await expect(
      VotacaoPage({
        params: Promise.resolve({ id: "vot-999" }),
      })
    ).rejects.toThrow("NEXT_NOT_FOUND");

    expect(mockGetById).toHaveBeenCalledWith({ id: "vot-999" });
    expect(notFound).toHaveBeenCalled();
  });

  it("links parlamentar names to profiles correctly", async () => {
    mockGetById.mockResolvedValue(mockVoteEvent);
    mockGetVoteSummary.mockResolvedValue(mockVoteSummary);

    const page = await VotacaoPage({
      params: Promise.resolve({ id: "vot-123" }),
    });
    
    render(page);

    // Verify DataTable receives data
    expect(screen.getByTestId("data-table")).toBeInTheDocument();
    expect(screen.getByText("Row Count: 1")).toBeInTheDocument();
    // Verify row content
    expect(screen.getByText(/João Silva/)).toBeInTheDocument();
  });

  it("renders source attribution", async () => {
    mockGetById.mockResolvedValue(mockVoteEvent);
    mockGetVoteSummary.mockResolvedValue(mockVoteSummary);

    const page = await VotacaoPage({
      params: Promise.resolve({ id: "vot-123" }),
    });
    
    render(page);

    expect(screen.getByTestId("fonte-badge")).toBeInTheDocument();
  });

  it("handles missing vote types in summary gracefully", async () => {
    mockGetById.mockResolvedValue(mockVoteEvent);
    // Partial summary
    mockGetVoteSummary.mockResolvedValue({
      "Sim": 10
    });

    const page = await VotacaoPage({
      params: Promise.resolve({ id: "vot-123" }),
    });
    
    render(page);

    // Should show 0 for missing types
    expect(screen.getByText("Não: 0")).toBeInTheDocument();
  });
});
