import { render, screen } from "@testing-library/react";
import DeputadoPage from "../page";
import { notFound } from "next/navigation";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => { throw new Error("NEXT_NOT_FOUND"); }),
}));

jest.mock("@/lib/search/slug", () => ({
  parseSlug: jest.fn((slug) => {
    if (slug === "just-name") return { id: undefined, nameSlug: "" };
    if (slug.startsWith("dep-")) {
      const parts = slug.split("-");
      return { id: `${parts[0]}-${parts[1]}`, nameSlug: parts.slice(2).join("-") };
    }
    return { id: slug, nameSlug: "" };
  }),
}));

jest.mock("@/components/parlamentar/parlamentar-header", () => ({
  ParlamentarHeader: ({ parlamentar }: { parlamentar: any }) => (
    <div data-testid="parlamentar-header">{parlamentar.nome}</div>
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
  FonteBadge: () => <div data-testid="fonte-badge">Fonte</div>,
}));

jest.mock("@/components/data/ultima-atualizacao", () => ({
  UltimaAtualizacao: () => <div data-testid="ultima-atualizacao">Atualizado</div>,
}));

const mockGetById = jest.fn();

jest.mock("@/trpc/server", () => ({
  api: {
    parlamentar: {
      getById: (...args: any[]) => mockGetById(...args),
    },
  },
}));

describe("DeputadoPage", () => {
  const mockParlamentar = {
    id: "dep-123",
    nome: "Fulano de Tal",
    nomeEleitoral: "Fulano",
    partido: "PARTIDO",
    uf: "UF",
    foto: "https://example.com/foto.jpg",
    email: "fulano@example.com",
    camara: "camara",
    updatedAt: new Date(),
    votos: [
      { id: "1", votacao: { id: "v1", titulo: "Votação 1" }, voto: "Sim" },
    ],
    proposicoes: [
      { id: "1", tipo: "PL", numero: 123, ano: 2023, ementa: "Projeto de Lei" },
    ],
    _count: {
      votos: 100,
      proposicoes: 50,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders successfully when parlamentar is found", async () => {
    mockGetById.mockResolvedValue(mockParlamentar);

    const page = await DeputadoPage({
      params: Promise.resolve({ slug: "dep-123-fulano-de-tal" }),
    });
    
    render(page);

    expect(mockGetById).toHaveBeenCalledWith({ id: "dep-123" });
    expect(screen.getByTestId("parlamentar-header")).toHaveTextContent("Fulano de Tal");
    expect(screen.getByText("Votações participadas: 100")).toBeInTheDocument();
    expect(screen.getByText("Proposições apresentadas: 50")).toBeInTheDocument();
    expect(screen.getByTestId("voting-history")).toBeInTheDocument();
    expect(screen.getByTestId("data-table")).toBeInTheDocument();
  });

  it("calls notFound when id is missing from slug", async () => {
    await expect(
      DeputadoPage({
        params: Promise.resolve({ slug: "just-name" }),
      })
    ).rejects.toThrow("NEXT_NOT_FOUND");

    expect(notFound).toHaveBeenCalled();
    expect(mockGetById).not.toHaveBeenCalled();
  });

  it("calls notFound when parlamentar is not found in api", async () => {
    mockGetById.mockResolvedValue(null);

    await expect(
      DeputadoPage({
        params: Promise.resolve({ slug: "dep-999-not-found" }),
      })
    ).rejects.toThrow("NEXT_NOT_FOUND");

    expect(mockGetById).toHaveBeenCalledWith({ id: "dep-999" });
    expect(notFound).toHaveBeenCalled();
  });

  it("calls notFound when parlamentar is not from camara", async () => {
    mockGetById.mockResolvedValue({
      ...mockParlamentar,
      camara: "senado",
    });

    await expect(
      DeputadoPage({
        params: Promise.resolve({ slug: "dep-123-senador" }),
      })
    ).rejects.toThrow("NEXT_NOT_FOUND");

    expect(mockGetById).toHaveBeenCalledWith({ id: "dep-123" });
    expect(notFound).toHaveBeenCalled();
  });
});
