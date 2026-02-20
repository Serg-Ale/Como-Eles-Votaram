import {
  CamaraDeputadoDetailRawSchema,
  CamaraProposicaoRawSchema,
  CamaraVotacaoRawSchema,
  CamaraVotoRawSchema,
} from "@/lib/schemas";

import {
  buildPhotoUrl,
  slugify,
  transformDeputado,
  transformProposicao,
  transformVotacao,
  transformVoto,
} from "@/server/sync/camara/transformers";

const deputyDetail = CamaraDeputadoDetailRawSchema.parse({
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
});

const votacaoRaw = CamaraVotacaoRawSchema.parse({
  id: "2600277",
  uri: "https://dadosabertos.camara.leg.br/api/v2/votacoes/2600277",
  data: "2024-02-15",
  dataHoraRegistro: "2024-02-15T14:30:00",
  siglaOrgao: "Plen",
  descricao: "Votação da PL 123/2024",
  aprovacao: 100.5,
  placarSim: 300,
  placarNao: 50,
  placarAbstencao: 10,
});

const votoRaw = CamaraVotoRawSchema.parse({
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
});

const proposicaoRaw = CamaraProposicaoRawSchema.parse({
  id: 2223095,
  uri: "https://dadosabertos.camara.leg.br/api/v2/proposicoes/2223095",
  siglaTipo: "PL",
  codTipo: 1,
  numero: 1234,
  ano: 2023,
  ementa: "Dispõe sobre...",
  dataApresentacao: "2023-02-15",
  descricaoTipo: "Projeto de Lei",
  urlInteiroTeor: "https://example.com/inteiro.pdf",
});

describe("camara transformers", () => {
  it("slugify removes accents and trims", () => {
    expect(slugify("São Paulo")).toBe("sao-paulo");
    expect(slugify("  União  Audio ")).toBe("uniao-audio");
  });

  it("slugify strips special characters", () => {
    expect(slugify("Ação & Reação!")).toBe("acao-reacao");
  });

  it("buildPhotoUrl uses bandep pattern", () => {
    expect(buildPhotoUrl(204521)).toBe(
      "https://www.camara.leg.br/internet/deputado/bandep/204521.jpg"
    );
  });

  it("transformDeputado maps fields and slugifies", () => {
    const result = transformDeputado(deputyDetail);

    expect(result.id).toBe("dep-204521");
    expect(result.nomeCompleto).toBe("João Silva");
    expect(result.nome).toBe("JOAO SILVA");
    expect(result.slug).toBe("joao-silva");
    expect(result.foto).toContain("bandep/204521.jpg");
    expect(result.camara).toBe("camara");
  });

  it("transformVotacao builds vote event input", () => {
    const result = transformVotacao(votacaoRaw);

    expect(result.externalId).toBe("2600277");
    expect(result.camara).toBe("camara");
    expect(result.resultado).toBe("100.5");
  });

  it("transformVotacao coerces date", () => {
    const result = transformVotacao({
      ...votacaoRaw,
      data: "2024-02-16",
    });

    expect(result.data).toEqual(new Date("2024-02-16"));
  });

  it("transformVoto builds vote record input", () => {
    const data = new Date("2024-02-15T00:00:00Z");
    const result = transformVoto(votoRaw, "cuid-123", data);

    expect(result.parlamentarId).toBe("dep-204521");
    expect(result.voto).toBe("Sim");
    expect(result.data).toEqual(data);
  });

  it("transformProposicao maps fields and autorId", () => {
    const result = transformProposicao(proposicaoRaw, "dep-204521");

    expect(result.externalId).toBe(2223095);
    expect(result.autor).toBeUndefined();
    expect(result.urlInteiro).toBe("https://example.com/inteiro.pdf");
  });

  it("transformProposicao handles nullable url", () => {
    const result = transformProposicao(
      { ...proposicaoRaw, urlInteiroTeor: null },
      "dep-204521"
    );

    expect(result.urlInteiro).toBeNull();
  });
});
