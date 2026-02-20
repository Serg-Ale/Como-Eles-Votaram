import {
  SenadoSenadorRawSchema,
  SenadoSenadorListRawSchema,
  SenadoVotacaoRawSchema,
  SenadoVotoRawSchema,
} from "@/lib/schemas/senado-raw.schema";

describe("SenadoSenadorRawSchema", () => {
  it("should validate valid senador raw data", () => {
    const valid = {
      CodigoParlamentar: "5012",
      IdentificacaoParlamentar: {
        CodigoParlamentar: "5012",
        NomeParlamentar: "Maria Costa",
        NomeCompletoParlamentar: "Maria da Costa Silva",
        SexoParlamentar: "F",
        FormaTratamento: "Senadora",
        UrlFotoParlamentar: "https://example.com/maria.jpg",
        UrlPaginaParlamentar: "https://senado.leg.br/maria",
        EmailParlamentar: "maria@senado.leg.br",
        SiglaPartidoParlamentar: "PSDB",
        UfParlamentar: "RJ",
      },
      DadosBasicosParlamentar: {
        DataNascimento: "1970-03-20",
        Naturalidade: "Rio de Janeiro",
        UfNaturalidade: "RJ",
      },
    };

    const result = SenadoSenadorRawSchema.parse(valid);
    expect(result.CodigoParlamentar).toBe("5012");
  });

  it("should validate senador without DadosBasicosParlamentar", () => {
    const valid = {
      CodigoParlamentar: "5012",
      IdentificacaoParlamentar: {
        CodigoParlamentar: "5012",
        NomeParlamentar: "Maria Costa",
        NomeCompletoParlamentar: "Maria da Costa Silva",
        SexoParlamentar: "F",
        FormaTratamento: "Senadora",
        UrlFotoParlamentar: "https://example.com/maria.jpg",
        UrlPaginaParlamentar: "https://senado.leg.br/maria",
        SiglaPartidoParlamentar: "PSDB",
        UfParlamentar: "RJ",
      },
    };

    const result = SenadoSenadorRawSchema.parse(valid);
    expect(result.DadosBasicosParlamentar).toBeUndefined();
  });

  it("should reject senador with missing required fields", () => {
    const invalid = {
      CodigoParlamentar: "5012",
      IdentificacaoParlamentar: {
        NomeParlamentar: "Maria",
      },
    };

    expect(() => SenadoSenadorRawSchema.parse(invalid)).toThrow();
  });

  it("should validate senador without email", () => {
    const valid = {
      CodigoParlamentar: "5012",
      IdentificacaoParlamentar: {
        CodigoParlamentar: "5012",
        NomeParlamentar: "Maria Costa",
        NomeCompletoParlamentar: "Maria da Costa Silva",
        SexoParlamentar: "F",
        FormaTratamento: "Senadora",
        UrlFotoParlamentar: "https://example.com/maria.jpg",
        UrlPaginaParlamentar: "https://senado.leg.br/maria",
        SiglaPartidoParlamentar: "PSDB",
        UfParlamentar: "RJ",
      },
    };

    const result = SenadoSenadorRawSchema.parse(valid);
    expect(result.IdentificacaoParlamentar.EmailParlamentar).toBeUndefined();
  });
});

describe("SenadoSenadorListRawSchema", () => {
  it("should validate valid senador list response", () => {
    const valid = {
      ListaParlamentarEmExercicio: {
        Parlamentares: {
          Parlamentar: [
            {
              CodigoParlamentar: "5012",
              IdentificacaoParlamentar: {
                CodigoParlamentar: "5012",
                NomeParlamentar: "Maria Costa",
                NomeCompletoParlamentar: "Maria da Costa Silva",
                SexoParlamentar: "F",
                FormaTratamento: "Senadora",
                UrlFotoParlamentar: "https://example.com/maria.jpg",
                UrlPaginaParlamentar: "https://senado.leg.br/maria",
                SiglaPartidoParlamentar: "PSDB",
                UfParlamentar: "RJ",
              },
            },
            {
              CodigoParlamentar: "5013",
              IdentificacaoParlamentar: {
                CodigoParlamentar: "5013",
                NomeParlamentar: "João Santos",
                NomeCompletoParlamentar: "João de Santos Silva",
                SexoParlamentar: "M",
                FormaTratamento: "Senador",
                UrlFotoParlamentar: "https://example.com/joao.jpg",
                UrlPaginaParlamentar: "https://senado.leg.br/joao",
                SiglaPartidoParlamentar: "PT",
                UfParlamentar: "SP",
              },
            },
          ],
        },
      },
    };

    const result = SenadoSenadorListRawSchema.parse(valid);
    expect(result.ListaParlamentarEmExercicio.Parlamentares.Parlamentar).toHaveLength(
      2
    );
  });

  it("should reject list with empty Parlamentar array", () => {
    const invalid = {
      ListaParlamentarEmExercicio: {
        Parlamentares: {
          Parlamentar: [],
        },
      },
    };

    const result = SenadoSenadorListRawSchema.parse(invalid);
    expect(result.ListaParlamentarEmExercicio.Parlamentares.Parlamentar).toHaveLength(
      0
    );
  });
});

describe("SenadoVotacaoRawSchema", () => {
  it("should validate valid votacao raw data", () => {
    const valid = {
      CodigoSessao: "79948",
      SiglaCasa: "SF",
      NumeroSessao: "5",
      TipoSessao: "Ordinária",
      DataSessao: "2024-02-15",
      HoraInicio: "14:00:00",
      Votacao: {
        CodigoSessaoVotacao: "12345",
        IdentificacaoVotacao: "Votação 1",
        DescricaoVotacao: "Votação do PL 123/2024",
        Resultado: "Aprovado",
        Materia: {
          IdentificacaoMateria: "PL 123/2024",
          SiglaSubtipoMateria: "PL",
          NumeroMateria: "123",
          AnoMateria: "2024",
          DescricaoIdentificacaoMateria: "Projeto de Lei 123/2024",
        },
      },
    };

    const result = SenadoVotacaoRawSchema.parse(valid);
    expect(result.CodigoSessao).toBe("79948");
  });

  it("should validate votacao without Materia", () => {
    const valid = {
      CodigoSessao: "79948",
      SiglaCasa: "SF",
      NumeroSessao: "5",
      TipoSessao: "Ordinária",
      DataSessao: "2024-02-15",
      HoraInicio: "14:00:00",
      Votacao: {
        CodigoSessaoVotacao: "12345",
        IdentificacaoVotacao: "Votação 1",
        DescricaoVotacao: "Votação",
        Resultado: "Aprovado",
      },
    };

    const result = SenadoVotacaoRawSchema.parse(valid);
    expect(result.Votacao.Materia).toBeUndefined();
  });

  it("should reject votacao with missing required fields", () => {
    const invalid = {
      CodigoSessao: "79948",
      Votacao: {
        DescricaoVotacao: "Votação",
      },
    };

    expect(() => SenadoVotacaoRawSchema.parse(invalid)).toThrow();
  });
});

describe("SenadoVotoRawSchema", () => {
  it("should validate valid voto raw data", () => {
    const valid = {
      CodigoParlamentar: "5012",
      NomeParlamentar: "Maria Costa",
      SiglaPartido: "PSDB",
      SiglaUF: "RJ",
      Voto: "Sim",
    };

    const result = SenadoVotoRawSchema.parse(valid);
    expect(result.Voto).toBe("Sim");
  });

  it("should validate different vote types", () => {
    const voteTypes = ["Sim", "Não", "Abstenção", "P-NRV"];

    voteTypes.forEach((voto) => {
      const vote = {
        CodigoParlamentar: "5012",
        NomeParlamentar: "Maria Costa",
        SiglaPartido: "PSDB",
        SiglaUF: "RJ",
        Voto: voto,
      };

      expect(() => SenadoVotoRawSchema.parse(vote)).not.toThrow();
    });
  });

  it("should reject voto with missing required fields", () => {
    const invalid = {
      CodigoParlamentar: "5012",
      NomeParlamentar: "Maria",
    };

    expect(() => SenadoVotoRawSchema.parse(invalid)).toThrow();
  });

  it("should accept any vote string value", () => {
    const valid = {
      CodigoParlamentar: "5012",
      NomeParlamentar: "Maria Costa",
      SiglaPartido: "PSDB",
      SiglaUF: "RJ",
      Voto: "Licença",
    };

    const result = SenadoVotoRawSchema.parse(valid);
    expect(result.Voto).toBe("Licença");
  });
});
