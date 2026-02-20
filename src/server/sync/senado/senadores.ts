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
    const parsed = SenadoSenadorListRawSchema.safeParse(response);
    const senadores = parsed.success
      ? parsed.data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar
      : ((response as { ListaParlamentarEmExercicio?: { Parlamentares?: { Parlamentar?: unknown[] } } })
          .ListaParlamentarEmExercicio?.Parlamentares?.Parlamentar ?? []);

    if (!Array.isArray(senadores) || senadores.length === 0) {
      throw new Error("Failed to parse Senado data");
    }

    if (!parsed.success) {
      errors.push("Partial Senado payload validation failed");
    }
    let synced = 0;

    for (const raw of senadores) {
      try {
        const parlamentar = transformSenador(
          SenadoSenadorListRawSchema.shape.ListaParlamentarEmExercicio.shape.Parlamentares.shape.Parlamentar.element.parse(
            raw
          )
        );
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
