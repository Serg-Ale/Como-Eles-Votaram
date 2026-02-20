import { db } from "@/server/db";
import { syncVotacoesSenado } from "@/server/sync/senado/votacoes";

jest.mock("@/server/db", () => ({
  db: {
    voteEvent: {
      upsert: jest.fn(),
    },
    voteRecord: {
      createMany: jest.fn(),
    },
    syncLog: {
      create: jest.fn(),
    },
    $transaction: jest.fn(async (callback: (tx: any) => Promise<void>) => {
      await callback({
        voteEvent: {
          upsert: jest.fn().mockResolvedValue({
            id: "cuid-1",
            externalId: "12345",
            data: new Date("2024-02-15"),
          }),
        },
        voteRecord: {
          createMany: jest.fn(),
        },
      });
    }),
  },
}));

describe("syncVotacoesSenado", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  const payload = [
    {
      CodigoSessao: "79948",
      SiglaCasa: "SF",
      NumeroSessao: "5",
      TipoSessao: "Ordinaria",
      DataSessao: "2024-02-15",
      HoraInicio: "14:00:00",
      Votacao: {
        CodigoSessaoVotacao: "12345",
        IdentificacaoVotacao: "Votação 1",
        DescricaoVotacao: "Votação do PL 123/2024",
        Resultado: "Aprovado",
      },
      Votos: [
        {
          CodigoParlamentar: "5012",
          NomeParlamentar: "Maria Costa",
          SiglaPartido: "PSDB",
          SiglaUF: "RJ",
          Voto: "Sim",
        },
      ],
    },
  ];

  it("syncs votacoes with transaction and batches", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => payload,
    });

    const result = await syncVotacoesSenado();

    expect(result.votacoes).toBe(1);
    expect(result.votos).toBe(1);
    expect(db.$transaction).toHaveBeenCalledTimes(1);
  });

  it("handles empty votos gracefully", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => [{ ...payload[0], Votos: [] }],
    });

    const result = await syncVotacoesSenado();

    expect(result.votacoes).toBe(1);
    expect(result.votos).toBe(0);
  });

  it("collects errors on invalid votacao but continues", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => [
        { CodigoSessao: "invalid" },
        ...payload,
      ],
    });

    const result = await syncVotacoesSenado();

    expect(result.votacoes).toBe(1);
    expect(result.errors.length).toBe(1);
  });

  it("creates SyncLog when API returns null", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 503,
      statusText: "Service Unavailable",
      json: async () => ({ message: "down" }),
    });

    const result = await syncVotacoesSenado();

    expect(result.votacoes).toBe(0);
    expect(db.syncLog.create).toHaveBeenCalledTimes(1);
  });

  it("handles single object payload", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => payload[0],
    });

    const result = await syncVotacoesSenado();

    expect(result.votacoes).toBe(1);
  });
});
