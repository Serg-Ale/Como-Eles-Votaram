import {
  CamaraVotacaoRawSchema,
  CamaraVotoRawSchema,
  CamaraWrapperSchema,
} from "@/lib/schemas";
import { db } from "@/server/db";

import { fetchAllPages, fetchCamara } from "./client";
import { transformVotacao, transformVoto } from "./transformers";

export const syncVotacoes = async (dataInicio: string, dataFim: string) => {
  const errors: string[] = [];
  let votacoes = 0;
  let votos = 0;
  const listEndpoint = `/votacoes?dataInicio=${dataInicio}&dataFim=${dataFim}`;
  const votacoesRaw = await fetchAllPages(listEndpoint);

  for (const raw of votacoesRaw) {
    try {
      const parsed = CamaraVotacaoRawSchema.parse(raw);
      const eventInput = transformVotacao(parsed);

      const event = await db.voteEvent.upsert({
        where: { externalId: eventInput.externalId },
        create: eventInput,
        update: {
          data: eventInput.data,
          descricao: eventInput.descricao,
          resultado: eventInput.resultado,
          camara: eventInput.camara,
        },
      });

      votacoes += 1;

      const votosResponse = await fetchCamara(`/votacoes/${parsed.id}/votos`);
      const votosWrapper = CamaraWrapperSchema.parse(votosResponse);
      const votosData = votosWrapper.dados as unknown[];

      if (votosData.length === 0) {
        continue;
      }

      for (const votoRaw of votosData) {
        const votoParsed = CamaraVotoRawSchema.parse(votoRaw);
        const votoInput = transformVoto(votoParsed, event.id, event.data);

        await db.voteRecord.upsert({
          where: {
            parlamentarId_votacaoId: {
              parlamentarId: votoInput.parlamentarId,
              votacaoId: votoInput.votacaoId,
            },
          },
          create: votoInput,
          update: {
            voto: votoInput.voto,
            data: votoInput.data,
          },
        });

        votos += 1;
      }
    } catch (error) {
      errors.push(
        error instanceof Error ? error.message : "Failed to sync votacao"
      );
    }
  }

  return { votacoes, votos, errors };
};
