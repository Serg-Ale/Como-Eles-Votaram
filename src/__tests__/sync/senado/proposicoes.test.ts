import { db } from "@/server/db";
import { syncProposicoesSenado } from "@/server/sync/senado/proposicoes";

jest.mock("@/server/db", () => ({
  db: {
    proposicao: {
      upsert: jest.fn(),
    },
    syncLog: {
      create: jest.fn(),
    },
  },
}));

describe("syncProposicoesSenado", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  const payload = {
    Materias: {
      Materia: [
        {
          CodigoMateria: "123",
          SiglaSubtipoMateria: "PL",
          NumeroMateria: "456",
          AnoMateria: "2024",
          EmentaMateria: "Dispõe sobre",
          DataApresentacao: "2024-02-01",
          UrlTextoIntegral: "https://example.com/inteiro.pdf",
        },
      ],
    },
  };

  it("syncs proposicoes for senador", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => payload,
    });

    const result = await syncProposicoesSenado(5012);

    expect(result.synced).toBe(1);
    expect(result.errors).toEqual([]);
    expect(db.proposicao.upsert).toHaveBeenCalledTimes(1);
  });

  it("collects errors on invalid proposicao but continues", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        Materias: {
          Materia: [{}, ...payload.Materias.Materia],
        },
      }),
    });

    const result = await syncProposicoesSenado(5012);

    expect(result.synced).toBe(1);
    expect(result.errors.length).toBe(1);
  });

  it("creates SyncLog when API returns null", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 503,
      statusText: "Service Unavailable",
      json: async () => ({ message: "down" }),
    });

    const result = await syncProposicoesSenado(5012);

    expect(result.synced).toBe(0);
    expect(db.syncLog.create).toHaveBeenCalledTimes(1);
  });

  it("returns error on invalid payload structure", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ invalid: true }),
    });

    const result = await syncProposicoesSenado(5012);

    expect(result.synced).toBe(0);
    expect(result.errors.length).toBe(1);
  });
});
