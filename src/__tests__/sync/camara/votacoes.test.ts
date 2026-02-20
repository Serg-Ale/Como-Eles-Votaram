import { db } from "@/server/db";
import { syncVotacoes } from "@/server/sync/camara/votacoes";

jest.mock("@/server/db", () => ({
  db: {
    voteEvent: {
      upsert: jest.fn(),
    },
    voteRecord: {
      upsert: jest.fn(),
    },
  },
}));

describe("syncVotacoes", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  it("syncs votacoes and votes", async () => {
    (db.voteEvent.upsert as jest.Mock).mockResolvedValue({
      id: "cuid-1",
      externalId: "2600277",
      data: new Date("2024-02-15"),
    });

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          dados: [
            {
              id: "2600277",
              uri: "https://dadosabertos.camara.leg.br/api/v2/votacoes/2600277",
              data: "2024-02-15",
              dataHoraRegistro: "2024-02-15T14:30:00",
              siglaOrgao: "Plen",
              descricao: "Votação da PL 123/2024",
              aprovacao: 100.5,
            },
          ],
          links: [],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          dados: [
            {
              tipoVoto: "Sim",
              deputado_: {
                id: 204521,
                uri: "https://example.com/deputados/204521",
                nome: "João Silva",
                siglaPartido: "PT",
                uriPartido: "https://example.com/partidos/36",
                siglaUf: "SP",
                idLegislatura: 57,
                urlFoto: "https://example.com/foto.jpg",
              },
            },
          ],
          links: [],
        }),
      });

    const result = await syncVotacoes("2024-02-01", "2024-02-28");

    expect(result.votacoes).toBe(1);
    expect(result.votos).toBe(1);
    expect(db.voteRecord.upsert).toHaveBeenCalledTimes(1);
  });

  it("handles empty votos without errors", async () => {
    (db.voteEvent.upsert as jest.Mock).mockResolvedValue({
      id: "cuid-2",
      externalId: "2600278",
      data: new Date("2024-02-16"),
    });

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          dados: [
            {
              id: "2600278",
              uri: "https://dadosabertos.camara.leg.br/api/v2/votacoes/2600278",
              data: "2024-02-16",
              dataHoraRegistro: "2024-02-16T10:00:00",
              siglaOrgao: "Plen",
              descricao: "Votação simbólica",
              aprovacao: 90.0,
            },
          ],
          links: [],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ dados: [], links: [] }),
      });

    const result = await syncVotacoes("2024-02-01", "2024-02-28");

    expect(result.votacoes).toBe(1);
    expect(result.votos).toBe(0);
    expect(db.voteRecord.upsert).not.toHaveBeenCalled();
  });

  it("collects errors on invalid votacao", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        dados: [{ id: "invalid" }],
      }),
    });

    const result = await syncVotacoes("2024-02-01", "2024-02-28");

    expect(result.votacoes).toBe(0);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("continues syncing when a votacao fails", async () => {
    (db.voteEvent.upsert as jest.Mock).mockResolvedValue({
      id: "cuid-3",
      externalId: "2600279",
      data: new Date("2024-02-17"),
    });

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          dados: [
            { id: "invalid" },
            {
              id: "2600279",
              uri: "https://dadosabertos.camara.leg.br/api/v2/votacoes/2600279",
              data: "2024-02-17",
              dataHoraRegistro: "2024-02-17T10:00:00",
              siglaOrgao: "Plen",
              descricao: "Votação válida",
              aprovacao: 80.0,
            },
          ],
          links: [],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ dados: [], links: [] }),
      });

    const result = await syncVotacoes("2024-02-01", "2024-02-28");

    expect(result.votacoes).toBe(1);
    expect(result.errors.length).toBe(1);
  });
});
