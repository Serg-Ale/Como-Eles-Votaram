import {
  CamaraWrapperSchema,
  CamaraDeputadoRawSchema,
  CamaraDeputadoDetailRawSchema,
  CamaraVotacaoRawSchema,
  CamaraVotoRawSchema,
  CamaraProposicaoRawSchema,
} from "@/lib/schemas/camara-raw.schema";

describe("CamaraWrapperSchema", () => {
  it("should validate valid wrapper with dados array", () => {
    const valid = {
      dados: [{ id: 1 }, { id: 2 }],
      links: [{ rel: "self", href: "https://example.com/api" }],
    };

    const result = CamaraWrapperSchema.parse(valid);
    expect(result.dados).toHaveLength(2);
  });

  it("should validate wrapper without links", () => {
    const valid = {
      dados: [{ id: 1 }],
    };

    const result = CamaraWrapperSchema.parse(valid);
    expect(result.links).toBeUndefined();
  });

  it("should reject wrapper with invalid dados (not an array)", () => {
    const invalid = {
      dados: "not an array",
    };

    expect(() => CamaraWrapperSchema.parse(invalid)).toThrow();
  });
});

describe("CamaraDeputadoRawSchema", () => {
  it("should validate valid deputado raw data", () => {
    const valid = {
      id: 204521,
      uri: "https://dadosabertos.camara.leg.br/api/v2/deputados/204521",
      nome: "João Silva",
      siglaPartido: "PT",
      uriPartido: "https://dadosabertos.camara.leg.br/api/v2/partidos/36",
      siglaUf: "SP",
      idLegislatura: 57,
      urlFoto: "https://www.camara.leg.br/images/deputados/1234567.jpg",
      email: "joao.silva@camara.leg.br",
    };

    const result = CamaraDeputadoRawSchema.parse(valid);
    expect(result.id).toBe(204521);
  });

  it("should validate deputado without email", () => {
    const valid = {
      id: 204521,
      uri: "https://dadosabertos.camara.leg.br/api/v2/deputados/204521",
      nome: "João Silva",
      siglaPartido: "PT",
      uriPartido: "https://example.com/partidos/36",
      siglaUf: "SP",
      idLegislatura: 57,
      urlFoto: "https://www.camara.leg.br/images/deputados/1234567.jpg",
    };

    const result = CamaraDeputadoRawSchema.parse(valid);
    expect(result.email).toBeUndefined();
  });

  it("should reject deputado with missing required fields", () => {
    const invalid = {
      id: 204521,
      nome: "João Silva",
    };

    expect(() => CamaraDeputadoRawSchema.parse(invalid)).toThrow();
  });
});

describe("CamaraDeputadoDetailRawSchema", () => {
  it("should validate valid detailed deputado data", () => {
    const valid = {
      id: 204521,
      uri: "https://dadosabertos.camara.leg.br/api/v2/deputados/204521",
      nome: "João Silva",
      siglaPartido: "PT",
      uriPartido: "https://example.com/partidos/36",
      siglaUf: "SP",
      idLegislatura: 57,
      urlFoto: "https://example.com/foto.jpg",
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
          nome: "Gabinete do Deputado João Silva",
          predio: "Anexo II",
          sala: "456",
          andar: "4",
          telefone: "(61) 3215-5678",
          email: "joao.silva@camara.leg.br",
        },
        situacao: "Exercício",
        condicaoEleitoral: "Eleito",
      },
    };

    const result = CamaraDeputadoDetailRawSchema.parse(valid);
    expect(result.cpf).toBe("12345678900");
  });

  it("should validate detailed deputado with optional fields", () => {
    const valid = {
      id: 204521,
      uri: "https://example.com/deputados/204521",
      nome: "João Silva",
      siglaPartido: "PT",
      uriPartido: "https://example.com/partidos/36",
      siglaUf: "SP",
      idLegislatura: 57,
      urlFoto: "https://example.com/foto.jpg",
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
          email: "joao@example.com",
        },
        situacao: "Exercício",
        condicaoEleitoral: "Eleito",
      },
      urlWebsite: "https://joaosilva.leg.br",
      redeSocial: ["https://twitter.com/joaosilva"],
    };

    const result = CamaraDeputadoDetailRawSchema.parse(valid);
    expect(result.urlWebsite).toBeDefined();
  });
});

describe("CamaraVotacaoRawSchema", () => {
  it("should validate valid votacao raw data", () => {
    const valid = {
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
    };

    const result = CamaraVotacaoRawSchema.parse(valid);
    expect(result.id).toBe("2600277");
  });

  it("should validate votacao with optional fields", () => {
    const valid = {
      id: "2600277",
      uri: "https://example.com/votacoes/2600277",
      data: "2024-02-15",
      dataHoraRegistro: "2024-02-15T14:30:00",
      siglaOrgao: "Plen",
      uriOrgao: "https://example.com/orgao",
      uriEvento: "https://example.com/evento",
      proposicaoObjeto: "PL 123/2024",
      uriProposicaoObjeto: "https://example.com/proposicao/123",
      descricao: "Votação",
      aprovacao: 100.5,
    };

    const result = CamaraVotacaoRawSchema.parse(valid);
    expect(result.proposicaoObjeto).toBeDefined();
  });

  it("should reject votacao with missing required fields", () => {
    const invalid = {
      id: "2600277",
      data: "2024-02-15",
    };

    expect(() => CamaraVotacaoRawSchema.parse(invalid)).toThrow();
  });
});

describe("CamaraVotoRawSchema", () => {
  it("should validate valid voto raw data", () => {
    const valid = {
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
    };

    const result = CamaraVotoRawSchema.parse(valid);
    expect(result.tipoVoto).toBe("Sim");
  });

  it("should validate different vote types", () => {
    const voteTypes = ["Sim", "Não", "Abstenção", "Obstrução"];

    voteTypes.forEach((tipo) => {
      const voto = {
        tipoVoto: tipo,
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
      };

      expect(() => CamaraVotoRawSchema.parse(voto)).not.toThrow();
    });
  });
});

describe("CamaraProposicaoRawSchema", () => {
  it("should validate valid proposicao raw data", () => {
    const valid = {
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
    };

    const result = CamaraProposicaoRawSchema.parse(valid);
    expect(result.numero).toBe(1234);
  });

  it("should validate proposicao with statusProposicao", () => {
    const valid = {
      id: 2223095,
      uri: "https://example.com/proposicoes/2223095",
      siglaTipo: "PL",
      codTipo: 1,
      numero: 1234,
      ano: 2023,
      ementa: "Ementa",
      dataApresentacao: "2023-02-15",
      descricaoTipo: "Projeto de Lei",
      statusProposicao: {
        dataHora: "2024-02-15T14:30:00",
        sequencia: 1,
        siglaOrgao: "PLEN",
        descricaoTramitacao: "Distribuído",
        descricaoSituacao: "Em tramitação",
      },
    };

    const result = CamaraProposicaoRawSchema.parse(valid);
    expect(result.statusProposicao).toBeDefined();
  });

  it("should validate proposicao without optional fields", () => {
    const valid = {
      id: 2223095,
      uri: "https://example.com/proposicoes/2223095",
      siglaTipo: "PL",
      codTipo: 1,
      numero: 1234,
      ano: 2023,
      ementa: "Ementa",
      dataApresentacao: "2023-02-15",
      descricaoTipo: "Projeto de Lei",
    };

    const result = CamaraProposicaoRawSchema.parse(valid);
    expect(result.urlInteiroTeor).toBeUndefined();
  });

  it("should handle nullable text fields", () => {
    const valid = {
      id: 2223095,
      uri: "https://example.com/proposicoes/2223095",
      siglaTipo: "PL",
      codTipo: 1,
      numero: 1234,
      ano: 2023,
      ementa: "Ementa",
      dataApresentacao: "2023-02-15",
      descricaoTipo: "Projeto de Lei",
      texto: null,
      justificativa: null,
    };

    const result = CamaraProposicaoRawSchema.parse(valid);
    expect(result.texto).toBeNull();
  });
});
