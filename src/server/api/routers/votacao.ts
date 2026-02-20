import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const votacaoRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.voteEvent.findUnique({
        where: { id: input.id },
        include: {
          proposicao: true,
          votos: {
            include: { parlamentar: true },
            orderBy: { voto: "asc" },
          },
        },
      });
    }),

  getVoteSummary: publicProcedure
    .input(z.object({ votacaoId: z.string() }))
    .query(async ({ ctx, input }) => {
      const counts = await ctx.db.voteRecord.groupBy({
        by: ["voto"],
        where: { votacaoId: input.votacaoId },
        _count: { voto: true },
      });

      return counts.reduce(
        (acc, item) => {
          acc[item.voto] = item._count.voto;
          return acc;
        },
        {} as Record<string, number>
      );
    }),
});
