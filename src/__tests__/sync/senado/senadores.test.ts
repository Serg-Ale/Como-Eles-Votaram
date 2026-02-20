import { db } from "@/server/db";
import { syncSenadores } from "@/server/sync/senado/senadores";

jest.mock("@/server/db", () => ({
  db: {
    parlamentar: {
      upsert: jest.fn(),
    },
    syncLog: {
      create: jest.fn(),
    },
  },
}));

describe("syncSenadores", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  const payload = {
    ListaParlamentarEmExercicio: {
      Parlamentares: {
        Parlamentar: [
          {
            CodigoParlamentar: "5012",
            IdentificacaoParlamentar: {
              CodigoParlamentar: "5012",
              NomeParlamentar: "Maria Costa",
              NomeCompletoParlamentar: "Maria Costa",
              SexoParlamentar: "F",
              FormaTratamento: "Senadora",
              UrlFotoParlamentar:
                "http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5012.jpg",
              UrlPaginaParlamentar: "https://www.senado.leg.br",
              EmailParlamentar: "maria@senado.leg.br",
              SiglaPartidoParlamentar: "PSDB",
              UfParlamentar: "RJ",
            },
          },
        ],
      },
    },
  };

  it("syncs senadores with nested unwrap", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => payload,
    });

    const result = await syncSenadores();

    expect(result.synced).toBe(1);
    expect(result.errors).toEqual([]);
    expect(db.parlamentar.upsert).toHaveBeenCalledTimes(1);
  });

  it("rewrites photo URLs to https", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => payload,
    });

    await syncSenadores();

    const args = (db.parlamentar.upsert as jest.Mock).mock.calls[0]?.[0];
    expect(args?.create?.foto).toMatch(/^https:\/\//);
  });

  it("collects errors on invalid item but continues", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        ...payload,
        ListaParlamentarEmExercicio: {
          Parlamentares: {
            Parlamentar: [
              { CodigoParlamentar: "invalid" },
              ...payload.ListaParlamentarEmExercicio.Parlamentares.Parlamentar,
            ],
          },
        },
      }),
    });

    const result = await syncSenadores();

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

    const result = await syncSenadores();

    expect(result.synced).toBe(0);
    expect(db.syncLog.create).toHaveBeenCalledTimes(1);
  });

  it("returns error when response shape is invalid", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ invalid: true }),
    });

    const result = await syncSenadores();

    expect(result.synced).toBe(0);
    expect(result.errors.length).toBe(1);
    expect(db.syncLog.create).toHaveBeenCalledTimes(1);
  });
});
