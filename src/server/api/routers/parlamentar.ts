import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const parlamentarRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.parlamentar.findUnique({
        where: { id: input.id },
        include: {
          _count: {
            select: { votos: true, proposicoes: true },
          },
          votos: {
            take: 20,
            orderBy: { createdAt: "desc" },
            include: {
              votacao: true,
            },
          },
          proposicoes: {
            take: 20,
            orderBy: { createdAt: "desc" },
          },
        },
      });
    }),

  search: publicProcedure
    .input(
      z.object({
        q: z.string().optional(),
        partido: z.string().optional(),
        uf: z.string().optional(),
        camara: z.enum(["deputados", "senadores"]).optional(),
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { q, partido, uf, camara, limit, cursor } = input;

      const filters: Array<Record<string, unknown>> = [];

      if (q) {
        filters.push({
          OR: [
            { nome: { contains: q, mode: "insensitive" } },
            { nomeEleitoral: { contains: q, mode: "insensitive" } },
          ],
        });
      }

      if (partido) {
        filters.push({ partido: { equals: partido, mode: "insensitive" } });
      }

      if (uf) {
        filters.push({ uf: { equals: uf, mode: "insensitive" } });
      }

      if (camara) {
        filters.push({ camara });
      }

      const items = await ctx.db.parlamentar.findMany({
        where: filters.length > 0 ? { AND: filters } : {},
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { nome: "asc" },
      });

      let nextCursor: string | null = null;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    }),

  getVotingHistory: publicProcedure
    .input(
      z.object({
        parlamentarId: z.string(),
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { parlamentarId, limit, cursor } = input;

      const items = await ctx.db.voteRecord.findMany({
        where: { parlamentarId },
        include: { votacao: true },
        orderBy: { createdAt: "desc" },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
      });

      let nextCursor: string | null = null;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    }),

  getProposicoes: publicProcedure
    .input(
      z.object({
        parlamentarId: z.string(),
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { parlamentarId, limit, cursor } = input;

      const items = await ctx.db.proposicao.findMany({
        where: { autorId: parlamentarId },
        orderBy: { createdAt: "desc" },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
      });

      let nextCursor: string | null = null;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    }),

  listPartidos: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.parlamentar.findMany({
      select: { partido: true },
      distinct: ["partido"],
      orderBy: { partido: "asc" },
    });

    return result.map((p) => p.partido);
  }),

  listUfs: publicProcedure.query(async ({ ctx }) => {
      const result = await ctx.db.parlamentar.findMany({
      select: { uf: true },
      distinct: ["uf"],
      where: { uf: { not: "" } },
      orderBy: { uf: "asc" },
    });

    return result.map((p) => p.uf);
  }),
});
