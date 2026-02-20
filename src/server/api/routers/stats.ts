import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const statsRouter = createTRPCRouter({
  getCounts: publicProcedure.query(async ({ ctx }) => {
    const [
      totalDeputados,
      totalSenadores,
      totalVotacoes,
      totalProposicoes,
      lastSyncLog,
    ] = await Promise.all([
      ctx.db.parlamentar.count({
        where: { camara: "camara" },
      }),
      ctx.db.parlamentar.count({
        where: { camara: "senado" },
      }),
      ctx.db.voteEvent.count(),
      ctx.db.proposicao.count(),
      ctx.db.syncLog.findFirst({
        where: { status: "completed" },
        orderBy: { completedAt: "desc" },
        select: { completedAt: true },
      }),
    ]);

    return {
      totalDeputados,
      totalSenadores,
      totalVotacoes,
      totalProposicoes,
      lastSync: lastSyncLog?.completedAt ?? null,
    };
  }),
});
