import { db } from "@/server/db";
import { syncDeputados } from "@/server/sync/camara/deputados";

jest.mock("@/server/db", () => ({
  db: {
    parlamentar: {
      upsert: jest.fn(),
    },
  },
}));

describe("syncDeputados", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  const detailResponse = {
    id: 204521,
    uri: "https://dadosabertos.camara.leg.br/api/v2/deputados/204521",
    nome: "João Silva",
    siglaPartido: "PT",
    uriPartido: "https://dadosabertos.camara.leg.br/api/v2/partidos/36",
    siglaUf: "SP",
    idLegislatura: 57,
    urlFoto: "https://www.camara.leg.br/images/deputados/1234567.jpg",
    cpf: "12345678900",
    sexo: "M",
    dataNascimento: "1980-01-15",
    ufNascimento: "SP",
    municipioNascimento: "São Paulo",
    escolaridade: "Superior completo",
    ultimoStatus: {
      id: 204521,
      uri: "https://example.com/status",
      nome: "João Silva",
      siglaPartido: "PT",
      uriPartido: "https://example.com/partidos/36",
      siglaUf: "SP",
      idLegislatura: 57,
      urlFoto: "https://example.com/foto.jpg",
      data: "2024-02-15",
      nomeEleitoral: "JOAO SILVA",
      gabinete: {
        nome: "Gabinete",
        predio: "Anexo",
        sala: "456",
        andar: "4",
        telefone: "(61) 3215-5678",
        email: "joao.silva@camara.leg.br",
      },
      situacao: "Exercício",
      condicaoEleitoral: "Eleito",
    },
  };

  it("syncs deputados with detail fetch", async () => {

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          dados: [
            {
              id: 204521,
              uri: "https://dadosabertos.camara.leg.br/api/v2/deputados/204521",
              nome: "João Silva",
              siglaPartido: "PT",
              uriPartido:
                "https://dadosabertos.camara.leg.br/api/v2/partidos/36",
              siglaUf: "SP",
              idLegislatura: 57,
              urlFoto:
                "https://www.camara.leg.br/images/deputados/1234567.jpg",
              email: "joao.silva@camara.leg.br",
            },
          ],
          links: [{ rel: "self", href: "https://example.com" }],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          dados: [detailResponse],
          links: [],
        }),
      });

    const result = await syncDeputados(57);

    expect(result.errors).toEqual([]);
    expect(result.synced).toBe(1);
    expect(db.parlamentar.upsert).toHaveBeenCalledTimes(1);
  });

  it("collects errors on invalid data", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        dados: [{ id: "invalid" }],
      }),
    });

    const result = await syncDeputados(57);

    expect(result.synced).toBe(0);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("continues syncing when one deputado fails", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          dados: [
            { id: "invalid" },
            {
              id: 204521,
              uri: "https://dadosabertos.camara.leg.br/api/v2/deputados/204521",
              nome: "João Silva",
              siglaPartido: "PT",
              uriPartido:
                "https://dadosabertos.camara.leg.br/api/v2/partidos/36",
              siglaUf: "SP",
              idLegislatura: 57,
              urlFoto:
                "https://www.camara.leg.br/images/deputados/1234567.jpg",
              email: "joao.silva@camara.leg.br",
            },
          ],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          dados: [detailResponse],
          links: [],
        }),
      });

    const result = await syncDeputados(57);

    expect(result.errors.length).toBe(1);
    expect(result.synced).toBe(1);
  });
});
