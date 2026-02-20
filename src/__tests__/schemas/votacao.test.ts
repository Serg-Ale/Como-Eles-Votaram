import {
  VoteTypeEnum,
  VoteEventSchema,
  VoteRecordSchema,
} from "@/lib/schemas/votacao.schema";

describe("VoteTypeEnum", () => {
  it("should accept valid vote types", () => {
    const validVotes = [
      "Sim",
      "Não",
      "Abstenção",
      "Obstrução",
      "Art. 17",
      "Não Votou",
    ];

    validVotes.forEach((vote) => {
      expect(() => VoteTypeEnum.parse(vote)).not.toThrow();
    });
  });

  it("should reject invalid vote types", () => {
    const invalidVotes = ["Sim não", "Nope", "abstencao", ""];

    invalidVotes.forEach((vote) => {
      expect(() => VoteTypeEnum.parse(vote)).toThrow();
    });
  });
});

describe("VoteEventSchema", () => {
  it("should validate valid vote event data", () => {
    const valid = {
      id: "clz4x8h7k0000qz8h8h8h8h8h",
      externalId: "2600277-9",
      data: new Date("2024-02-15"),
      descricao: "Votação da PL 123/2024",
      resultado: "Aprovado",
      camara: "camara",
      proposicaoId: "clz4x8h7k0000qz8h8h8h8h8h",
    };

    const result = VoteEventSchema.parse(valid);
    expect(result.externalId).toBe("2600277-9");
  });

  it("should validate vote event with null resultado", () => {
    const valid = {
      id: "clz4x8h7k0000qz8h8h8h8h8h",
      externalId: "2600277-9",
      data: new Date("2024-02-15"),
      descricao: "Votação",
      resultado: null,
      camara: "senado",
    };

    const result = VoteEventSchema.parse(valid);
    expect(result.resultado).toBeNull();
  });

  it("should reject vote event with invalid data format", () => {
    const invalid = {
      id: "not-a-cuid",
      externalId: "2600277-9",
      data: "invalid-date",
      descricao: "Votação",
      camara: "camara",
    };

    expect(() => VoteEventSchema.parse(invalid)).toThrow();
  });

  it("should coerce string to date for data field", () => {
    const valid = {
      id: "clz4x8h7k0000qz8h8h8h8h8h",
      externalId: "2600277-9",
      data: "2024-02-15",
      descricao: "Votação",
      camara: "camara",
    };

    const result = VoteEventSchema.parse(valid);
    expect(result.data instanceof Date).toBe(true);
  });

  it("should handle missing optional proposicaoId", () => {
    const valid = {
      id: "clz4x8h7k0000qz8h8h8h8h8h",
      externalId: "2600277-9",
      data: new Date(),
      descricao: "Votação",
      camara: "camara",
    };

    const result = VoteEventSchema.parse(valid);
    expect(result.proposicaoId).toBeUndefined();
  });
});

describe("VoteRecordSchema", () => {
  it("should validate valid vote record data", () => {
    const valid = {
      id: "clz4x8h7k0000qz8h8h8h8h8h",
      voto: "Sim",
      parlamentarId: "dep-204521",
      votacaoId: "clz4x8h7k0000qz8h8h8h8h8h",
      data: new Date("2024-02-15"),
    };

    const result = VoteRecordSchema.parse(valid);
    expect(result.voto).toBe("Sim");
  });

  it("should validate vote record with different vote types", () => {
    const voteTypes = [
      "Sim",
      "Não",
      "Abstenção",
      "Obstrução",
      "Art. 17",
      "Não Votou",
    ];

    voteTypes.forEach((voto) => {
      const record = {
        id: "clz4x8h7k0000qz8h8h8h8h8h",
        voto,
        parlamentarId: "dep-123",
        votacaoId: "clz4x8h7k0000qz8h8h8h8h8h",
        data: new Date(),
      };

      expect(() => VoteRecordSchema.parse(record)).not.toThrow();
    });
  });

  it("should reject vote record with invalid voto enum", () => {
    const invalid = {
      id: "clz4x8h7k0000qz8h8h8h8h8h",
      voto: "Maybe",
      parlamentarId: "dep-123",
      votacaoId: "clz4x8h7k0000qz8h8h8h8h8h",
      data: new Date(),
    };

    expect(() => VoteRecordSchema.parse(invalid)).toThrow();
  });

  it("should coerce string to date for data field", () => {
    const valid = {
      id: "clz4x8h7k0000qz8h8h8h8h8h",
      voto: "Sim",
      parlamentarId: "dep-123",
      votacaoId: "clz4x8h7k0000qz8h8h8h8h8h",
      data: "2024-02-15",
    };

    const result = VoteRecordSchema.parse(valid);
    expect(result.data instanceof Date).toBe(true);
  });
});
