import { db } from "@/server/db";
import { syncProposicoesByDeputado } from "@/server/sync/camara/proposicoes";

jest.mock("@/server/db", () => ({
  db: {
    proposicao: {
      upsert: jest.fn(),
    },
  },
}));

describe("syncProposicoesByDeputado", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  it("syncs proposicoes for deputado", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        dados: [
          {
            id: 2223095,
            uri: "https://dadosabertos.camara.leg.br/api/v2/proposicoes/2223095",
            siglaTipo: "PL",
            codTipo: 1,
            numero: 1234,
            ano: 2023,
            ementa: "Dispõe sobre...",
            dataApresentacao: "2023-02-15",
            descricaoTipo: "Projeto de Lei",
          },
        ],
        links: [],
      }),
    });

    const result = await syncProposicoesByDeputado(204521);

    expect(result.synced).toBe(1);
    expect(result.errors).toHaveLength(0);
    expect(db.proposicao.upsert).toHaveBeenCalledTimes(1);
  });

  it("collects errors on invalid proposicao", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        dados: [{ id: "invalid" }],
      }),
    });

    const result = await syncProposicoesByDeputado(204521);

    expect(result.synced).toBe(0);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("continues syncing when one proposicao fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        dados: [
          { id: "invalid" },
          {
            id: 2223095,
            uri: "https://dadosabertos.camara.leg.br/api/v2/proposicoes/2223095",
            siglaTipo: "PL",
            codTipo: 1,
            numero: 1234,
            ano: 2023,
            ementa: "Dispõe sobre...",
            dataApresentacao: "2023-02-15",
            descricaoTipo: "Projeto de Lei",
          },
        ],
        links: [],
      }),
    });

    const result = await syncProposicoesByDeputado(204521);

    expect(result.synced).toBe(1);
    expect(result.errors.length).toBe(1);
  });
});
