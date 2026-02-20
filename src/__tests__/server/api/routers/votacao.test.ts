/**
 * @jest-environment node
 */
import { db } from "@/server/db";

jest.mock("@/server/db", () => ({
  db: {
    voteEvent: {
      findUnique: jest.fn() as jest.MockedFunction<any>,
    },
    voteRecord: {
      groupBy: jest.fn() as jest.MockedFunction<any>,
    },
  },
}));

jest.mock("superjson", () => ({ default: {} }));

const mockDb = {
  voteEvent: {
    findUnique: jest.fn() as jest.MockedFunction<any>,
  },
  voteRecord: {
    groupBy: jest.fn() as jest.MockedFunction<any>,
  },
} as any;

let votacaoRouter: any;
let createCaller: () => any;

beforeAll(async () => {
  const router = await import("@/server/api/routers/votacao");
  votacaoRouter = router.votacaoRouter;
  createCaller = () => {
    return votacaoRouter.createCaller({
      db: mockDb,
      headers: new Headers(),
    });
  };
});

describe("votacaoRouter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getById", () => {
    it("should return vote event with proposicao and votos", async () => {
      const mockVoteEvent = {
        id: "vote-123",
        externalId: "PL-123-2024",
        data: new Date("2024-02-15"),
        descricao: "Votação do PL 123/2024",
        resultado: "Aprovado",
        camara: "deputados",
        proposicaoId: "prop-456",
        proposicao: {
          id: "prop-456",
          tipo: "PL",
          numero: 123,
          ano: 2024,
          ementa: "Altera a lei...",
        },
        votos: [
          {
            id: "voto-1",
            voto: "Sim",
            parlamentar: {
              id: "dep-789",
              nome: "João Silva",
              partido: "PT",
              uf: "SP",
            },
          },
          {
            id: "voto-2",
            voto: "Não",
            parlamentar: {
              id: "dep-101",
              nome: "Maria Santos",
              partido: "PSDB",
              uf: "RJ",
            },
          },
        ],
      };

      mockDb.voteEvent.findUnique.mockResolvedValue(mockVoteEvent as any);

      const caller = createCaller();
      const result = await caller.getById({ id: "vote-123" });

      expect(result).toEqual(mockVoteEvent);
      expect(mockDb.voteEvent.findUnique).toHaveBeenCalledWith({
        where: { id: "vote-123" },
        include: {
          proposicao: true,
          votos: {
            include: { parlamentar: true },
            orderBy: { voto: "asc" },
          },
        },
      });
    });

    it("should return null when vote event not found", async () => {
      mockDb.voteEvent.findUnique.mockResolvedValue(null);

      const caller = createCaller();
      const result = await caller.getById({ id: "nonexistent" });

      expect(result).toBeNull();
      expect(mockDb.voteEvent.findUnique).toHaveBeenCalledWith({
        where: { id: "nonexistent" },
        include: {
          proposicao: true,
          votos: {
            include: { parlamentar: true },
            orderBy: { voto: "asc" },
          },
        },
      });
    });
  });

  describe("getVoteSummary", () => {
    it("should return vote counts by type", async () => {
      const mockGroupByResult = [
        { voto: "Sim", _count: { voto: 250 } },
        { voto: "Não", _count: { voto: 30 } },
        { voto: "Abstenção", _count: { voto: 5 } },
      ];

      mockDb.voteRecord.groupBy.mockResolvedValue(mockGroupByResult);

      const caller = createCaller();
      const result = await caller.getVoteSummary({ votacaoId: "vote-123" });

      expect(result).toEqual({
        Sim: 250,
        Não: 30,
        Abstenção: 5,
      });
      expect(mockDb.voteRecord.groupBy).toHaveBeenCalledWith({
        by: ["voto"],
        where: { votacaoId: "vote-123" },
        _count: { voto: true },
      });
    });

    it("should return empty object when no votes exist", async () => {
      mockDb.voteRecord.groupBy.mockResolvedValue([]);

      const caller = createCaller();
      const result = await caller.getVoteSummary({ votacaoId: "vote-empty" });

      expect(result).toEqual({});
      expect(mockDb.voteRecord.groupBy).toHaveBeenCalledWith({
        by: ["voto"],
        where: { votacaoId: "vote-empty" },
        _count: { voto: true },
      });
    });
  });
});
