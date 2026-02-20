import {
  SenadoSenadorRawSchema,
  SenadoVotacaoRawSchema,
  SenadoVotoRawSchema,
} from "@/lib/schemas";

import {
  rewritePhotoUrl,
  transformProposicaoSenado,
  transformSenador,
  transformVotacaoSenado,
  transformVotoSenado,
} from "@/server/sync/senado/transformers";

const senadorRaw = SenadoSenadorRawSchema.parse({
  CodigoParlamentar: "5012",
  IdentificacaoParlamentar: {
    CodigoParlamentar: "5012",
    NomeParlamentar: "José da Silva",
    NomeCompletoParlamentar: "José da Silva",
    SexoParlamentar: "M",
    FormaTratamento: "Senador",
    UrlFotoParlamentar:
      "http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5012.jpg",
    UrlPaginaParlamentar: "https://www.senado.leg.br/",
    EmailParlamentar: "jose@senado.leg.br",
    SiglaPartidoParlamentar: "PT",
    UfParlamentar: "SP",
  },
});

const votacaoRaw = SenadoVotacaoRawSchema.parse({
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
});

const votoRaw = SenadoVotoRawSchema.parse({
  CodigoParlamentar: "5012",
  NomeParlamentar: "José da Silva",
  SiglaPartido: "PT",
  SiglaUF: "SP",
  Voto: "Sim",
});

describe("senado transformers", () => {
  it("rewritePhotoUrl rewrites http to https", () => {
    expect(
      rewritePhotoUrl(
        "http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5012.jpg"
      )
    ).toBe(
      "https://www.senado.leg.br/senadores/img/fotos-oficiais/senador5012.jpg"
    );
  });

  it("rewritePhotoUrl keeps https URLs intact", () => {
    expect(
      rewritePhotoUrl(
        "https://www.senado.leg.br/senadores/img/fotos-oficiais/senador5012.jpg"
      )
    ).toBe(
      "https://www.senado.leg.br/senadores/img/fotos-oficiais/senador5012.jpg"
    );
  });

  it("transformSenador maps fields and slugifies", () => {
    const result = transformSenador(senadorRaw);

    expect(result.id).toBe("sen-5012");
    expect(result.nome).toBe("José da Silva");
    expect(result.slug).toBe("jose-da-silva");
    expect(result.foto).toMatch(/^https:\/\//);
    expect(result.camara).toBe("senado");
  });

  it("transformVotacaoSenado builds vote event input", () => {
    const result = transformVotacaoSenado(votacaoRaw);

    expect(result.externalId).toBe("12345");
    expect(result.camara).toBe("senado");
    expect(result.resultado).toBe("Aprovado");
  });

  it("transformVotacaoSenado coerces date", () => {
    const result = transformVotacaoSenado({
      ...votacaoRaw,
      DataSessao: "2024-02-16",
    });

    expect(result.data).toEqual(new Date("2024-02-16"));
  });

  it("transformVotoSenado builds vote record input", () => {
    const data = new Date("2024-02-15T00:00:00Z");
    const result = transformVotoSenado(votoRaw, "cuid-123", data);

    expect(result.parlamentarId).toBe("sen-5012");
    expect(result.voto).toBe("Sim");
    expect(result.data).toEqual(data);
  });

  it("transformVotoSenado defaults to Não Votou for unknown vote", () => {
    const data = new Date("2024-02-15T00:00:00Z");
    const result = transformVotoSenado(
      {
        ...votoRaw,
        Voto: "Licença",
      },
      "cuid-123",
      data
    );

    expect(result.voto).toBe("Não Votou");
  });

  it("transformProposicaoSenado maps raw fields", () => {
    const result = transformProposicaoSenado(
      {
        CodigoMateria: "123",
        SiglaSubtipoMateria: "PL",
        NumeroMateria: "456",
        AnoMateria: "2024",
        EmentaMateria: "Dispõe sobre",
        DataApresentacao: "2024-02-01",
        UrlTextoIntegral: "https://example.com/inteiro.pdf",
      },
      "sen-5012"
    );

    expect(result.externalId).toBe(123);
    expect(result.autor).toBeDefined();
    expect(result.camara).toBe("senado");
  });

  it("transformProposicaoSenado throws on invalid payload", () => {
    expect(() => transformProposicaoSenado(null, "sen-5012")).toThrow(
      "Invalid Senado proposicao payload"
    );
  });

  it("transformProposicaoSenado throws when missing id", () => {
    expect(() =>
      transformProposicaoSenado(
        {
          SiglaSubtipoMateria: "PL",
          NumeroMateria: "456",
          AnoMateria: "2024",
          EmentaMateria: "Dispõe sobre",
          DataApresentacao: "2024-02-01",
        },
        "sen-5012"
      )
    ).toThrow("Invalid Senado proposicao id");
  });
});
