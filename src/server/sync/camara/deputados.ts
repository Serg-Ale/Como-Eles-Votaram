import {
  CamaraDeputadoDetailRawSchema,
  CamaraDeputadoRawSchema,
} from "@/lib/schemas";
import { db } from "@/server/db";

import { fetchAllPages, fetchCamara } from "./client";
import { transformDeputado } from "./transformers";

export const syncDeputados = async (legislatura: number = 57) => {
  const errors: string[] = [];
  const listEndpoint = `/deputados?idLegislatura=${legislatura}&pagina=1&itens=100`;
  const deputados = await fetchAllPages(listEndpoint);
  let synced = 0;

  for (const raw of deputados) {
    try {
      const listItem = CamaraDeputadoRawSchema.parse(raw);
      const detail = await fetchCamara(`/deputados/${listItem.id}`);
      const detailItems = detail.dados as unknown[];
      const data = CamaraDeputadoDetailRawSchema.parse(detailItems[0]);

      const parlamentar = transformDeputado({
        ...data,
        urlFoto: listItem.urlFoto,
      });
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
        error instanceof Error
          ? error.message
          : "Failed to sync deputado"
      );
    }
  }

  return { synced, errors };
};
