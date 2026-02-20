import { SenadoSenadorListRawSchema } from "@/lib/schemas";
import { db } from "@/server/db";

import { fetchSenado } from "./client";
import { transformSenador } from "./transformers";

export const syncSenadores = async () => {
  const errors: string[] = [];
  const listEndpoint = "/senador/lista/atual.json";
  const response = await fetchSenado(listEndpoint);

  if (!response) {
    const message = "Senado API returned null for senadores";
    console.warn(message);
    await db.syncLog.create({
      data: {
        source: "senado",
        entity: "senadores",
        status: "failed",
        error: message,
      },
    });
    return { synced: 0, errors: [message] };
  }

  try {
    const parsed = SenadoSenadorListRawSchema.parse(response);
    const senadores =
      parsed.ListaParlamentarEmExercicio.Parlamentares.Parlamentar;
    let synced = 0;

    for (const raw of senadores) {
      try {
        const parlamentar = transformSenador(raw);
        await db.parlamentar.upsert({
          where: { id: parlamentar.id },
          create: parlamentar,
          update: {
            nome: parlamentar.nome,
            nomeCompleto: parlamentar.nomeCompleto,
            partido: parlamentar.partido,
            uf: parlamentar.uf,
            foto: parlamentar.foto,
            slug: parlamentar.slug,
            email: parlamentar.email,
            legislatura: parlamentar.legislatura,
          },
        });

        synced += 1;
      } catch (error) {
        errors.push(
          error instanceof Error ? error.message : "Failed to sync senador"
        );
      }
    }

    return { synced, errors };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to parse Senado data";
    console.warn(message);
    await db.syncLog.create({
      data: {
        source: "senado",
        entity: "senadores",
        status: "failed",
        error: message,
      },
    });
    return { synced: 0, errors: [message] };
  }
};
