/**
 * @jest-environment node
 */
import { db } from "@/server/db";

jest.mock("@/server/db", () => ({
  db: {
    parlamentar: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    voteRecord: {
      findMany: jest.fn(),
    },
    proposicao: {
      findMany: jest.fn(),
    },
  },
}));

jest.mock("superjson", () => ({ default: {} }));

const mockDb = db as jest.Mocked<typeof db>;

let parlamentarRouter: any;
let createCaller: () => any;

beforeAll(async () => {
  const router = await import("@/server/api/routers/parlamentar");
  parlamentarRouter = router.parlamentarRouter;
  createCaller = () => {
    return parlamentarRouter.createCaller({
      db: mockDb,
      headers: new Headers(),
    });
  };
});

describe("parlamentarRouter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getById", () => {
    it("should return parlamentar with votos and proposicoes", async () => {
      const mockParlamentar = {
        id: "dep-123",
        nome: "João Silva",
        nomeCompleto: "João da Silva",
        camara: "deputados",
        partido: "PT",
        uf: "SP",
        votos: [],
        proposicoes: [],
      };

      mockDb.parlamentar.findUnique.mockResolvedValue(mockParlamentar as any);

      const caller = createCaller();
      const result = await caller.getById({ id: "dep-123" });

      expect(result).toEqual(mockParlamentar);
      expect(mockDb.parlamentar.findUnique).toHaveBeenCalledWith({
        where: { id: "dep-123" },
        include: {
          votos: {
            take: 20,
            orderBy: { createdAt: "desc" },
            include: { votacao: true },
          },
          proposicoes: {
            take: 20,
            orderBy: { createdAt: "desc" },
          },
        },
      });
    });

    it("should return null if parlamentar not found", async () => {
      mockDb.parlamentar.findUnique.mockResolvedValue(null);

      const caller = createCaller();
      const result = await caller.getById({ id: "dep-999" });

      expect(result).toBeNull();
    });
  });

  describe("search", () => {
    it("should search by name (q parameter)", async () => {
      mockDb.parlamentar.findMany.mockResolvedValue([
        { id: "dep-1", nome: "João Silva" },
        { id: "dep-2", nome: "João Santos" },
      ] as any);

      const caller = createCaller();
      const result = await caller.search({ q: "joão" });

      expect(result.items).toHaveLength(2);
      expect(result.nextCursor).toBeNull();
      expect(mockDb.parlamentar.findMany).toHaveBeenCalledWith({
        where: {
          AND: [
            {
              OR: [
                { nome: { contains: "joão", mode: "insensitive" } },
                { nomeEleitoral: { contains: "joão", mode: "insensitive" } },
              ],
            },
          ],
        },
        take: 21,
        cursor: undefined,
        orderBy: { nome: "asc" },
      });
    });

    it("should filter by partido", async () => {
      mockDb.parlamentar.findMany.mockResolvedValue([{ id: "dep-1" }] as any);

      const caller = createCaller();
      await caller.search({ partido: "PT" });

      expect(mockDb.parlamentar.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            AND: [{ partido: { equals: "PT", mode: "insensitive" } }],
          },
        })
      );
    });

    it("should filter by uf", async () => {
      mockDb.parlamentar.findMany.mockResolvedValue([{ id: "dep-1" }] as any);

      const caller = createCaller();
      await caller.search({ uf: "SP" });

      expect(mockDb.parlamentar.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            AND: [{ uf: { equals: "SP", mode: "insensitive" } }],
          },
        })
      );
    });

    it("should filter by camara", async () => {
      mockDb.parlamentar.findMany.mockResolvedValue([{ id: "sen-1" }] as any);

      const caller = createCaller();
      await caller.search({ camara: "senadores" });

      expect(mockDb.parlamentar.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            AND: [{ camara: "senadores" }],
          },
        })
      );
    });

    it("should combine multiple filters", async () => {
      mockDb.parlamentar.findMany.mockResolvedValue([{ id: "dep-1" }] as any);

      const caller = createCaller();
      await caller.search({ q: "joão", partido: "PT", uf: "SP" });

      expect(mockDb.parlamentar.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            AND: [
              {
                OR: [
                  { nome: { contains: "joão", mode: "insensitive" } },
                  { nomeEleitoral: { contains: "joão", mode: "insensitive" } },
                ],
              },
              { partido: { equals: "PT", mode: "insensitive" } },
              { uf: { equals: "SP", mode: "insensitive" } },
            ],
          },
        })
      );
    });

    it("should use default limit of 20", async () => {
      mockDb.parlamentar.findMany.mockResolvedValue([{ id: "dep-1" }] as any);

      const caller = createCaller();
      await caller.search({});

      expect(mockDb.parlamentar.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ take: 21 })
      );
    });

    it("should handle custom limit", async () => {
      mockDb.parlamentar.findMany.mockResolvedValue([{ id: "dep-1" }] as any);

      const caller = createCaller();
      await caller.search({ limit: 50 });

      expect(mockDb.parlamentar.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ take: 51 })
      );
    });

    it("should return nextCursor when more results available", async () => {
      const items = Array.from({ length: 21 }, (_, i) => ({
        id: `dep-${i}`,
        nome: `Parlamentar ${i}`,
      }));
      mockDb.parlamentar.findMany.mockResolvedValue(items as any);

      const caller = createCaller();
      const result = await caller.search({ limit: 20 });

      expect(result.items).toHaveLength(20);
      expect(result.nextCursor).toBe("dep-20");
    });

    it("should use cursor for pagination", async () => {
      mockDb.parlamentar.findMany.mockResolvedValue([{ id: "dep-21" }] as any);

      const caller = createCaller();
      await caller.search({ cursor: "dep-20" });

      expect(mockDb.parlamentar.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          cursor: { id: "dep-20" },
        })
      );
    });
  });

  describe("getVotingHistory", () => {
    it("should return vote records with votacao relation", async () => {
      const mockVotes = [
        { id: "vote-1", parlamentarId: "dep-1", votacao: { id: "vot-1" } },
        { id: "vote-2", parlamentarId: "dep-1", votacao: { id: "vot-2" } },
      ];
      mockDb.voteRecord.findMany.mockResolvedValue(mockVotes as any);

      const caller = createCaller();
      const result = await caller.getVotingHistory({ parlamentarId: "dep-1" });

      expect(result.items).toHaveLength(2);
      expect(result.nextCursor).toBeNull();
      expect(mockDb.voteRecord.findMany).toHaveBeenCalledWith({
        where: { parlamentarId: "dep-1" },
        include: { votacao: true },
        orderBy: { createdAt: "desc" },
        take: 21,
        cursor: undefined,
      });
    });

    it("should return nextCursor when more votes available", async () => {
      const items = Array.from({ length: 21 }, (_, i) => ({
        id: `vote-${i}`,
        parlamentarId: "dep-1",
      }));
      mockDb.voteRecord.findMany.mockResolvedValue(items as any);

      const caller = createCaller();
      const result = await caller.getVotingHistory({
        parlamentarId: "dep-1",
        limit: 20,
      });

      expect(result.items).toHaveLength(20);
      expect(result.nextCursor).toBe("vote-20");
    });
  });

  describe("getProposicoes", () => {
    it("should return proposicoes authored by parlamentar", async () => {
      const mockProps = [
        { id: "prop-1", autorId: "dep-1", tipo: "PL" },
        { id: "prop-2", autorId: "dep-1", tipo: "PEC" },
      ];
      mockDb.proposicao.findMany.mockResolvedValue(mockProps as any);

      const caller = createCaller();
      const result = await caller.getProposicoes({ parlamentarId: "dep-1" });

      expect(result.items).toHaveLength(2);
      expect(result.nextCursor).toBeNull();
      expect(mockDb.proposicao.findMany).toHaveBeenCalledWith({
        where: { autorId: "dep-1" },
        orderBy: { createdAt: "desc" },
        take: 21,
        cursor: undefined,
      });
    });

    it("should paginate proposicoes", async () => {
      const items = Array.from({ length: 21 }, (_, i) => ({
        id: `prop-${i}`,
        autorId: "dep-1",
      }));
      mockDb.proposicao.findMany.mockResolvedValue(items as any);

      const caller = createCaller();
      const result = await caller.getProposicoes({
        parlamentarId: "dep-1",
        limit: 20,
      });

      expect(result.items).toHaveLength(20);
      expect(result.nextCursor).toBe("prop-20");
    });
  });

  describe("listPartidos", () => {
    it("should return distinct partido values", async () => {
      mockDb.parlamentar.findMany.mockResolvedValue([
        { partido: "PT" },
        { partido: "PSDB" },
        { partido: "MDB" },
      ] as any);

      const caller = createCaller();
      const result = await caller.listPartidos();

      expect(result).toEqual(["PT", "PSDB", "MDB"]);
      expect(mockDb.parlamentar.findMany).toHaveBeenCalledWith({
        select: { partido: true },
        distinct: ["partido"],
        orderBy: { partido: "asc" },
      });
    });
  });

  describe("listUfs", () => {
    it("should return distinct UF values", async () => {
      mockDb.parlamentar.findMany.mockResolvedValue([
        { uf: "SP" },
        { uf: "RJ" },
        { uf: "MG" },
      ] as any);

      const caller = createCaller();
      const result = await caller.listUfs();

      expect(result).toEqual(["SP", "RJ", "MG"]);
      expect(mockDb.parlamentar.findMany).toHaveBeenCalledWith({
        select: { uf: true },
        distinct: ["uf"],
        where: { uf: { not: "" } },
        orderBy: { uf: "asc" },
      });
    });
  });
});
