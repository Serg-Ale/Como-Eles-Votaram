import { z } from "zod";

import {
  CamaraDeputadoDetailRawSchema,
  CamaraProposicaoRawSchema,
  CamaraVotacaoRawSchema,
  CamaraVotoRawSchema,
  ParlamentarSchema,
  ProposicaoSchema,
  VoteEventSchema,
  VoteTypeEnum,
  type CamaraDeputadoDetailRaw,
  type CamaraProposicaoRaw,
  type CamaraVotacaoRaw,
  type CamaraVotoRaw,
} from "@/lib/schemas";
import type { Prisma } from "../../../../generated/prisma";

export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");

export const buildPhotoUrl = (id: number): string =>
  `https://www.camara.leg.br/internet/deputado/bandep/${id}.jpg`;

const validateWithSchema = <T>(schema: z.ZodSchema<T>, value: unknown): T =>
  schema.parse(value);

export const transformDeputado = (
  raw: CamaraDeputadoDetailRaw
): Prisma.ParlamentarCreateInput => {
  const parsed = validateWithSchema(CamaraDeputadoDetailRawSchema, raw);
  const parlamentar = {
    id: `dep-${parsed.id}`,
    idOriginal: parsed.id,
    camara: "camara",
    nome: parsed.ultimoStatus.nomeEleitoral,
    nomeCompleto: parsed.nome,
    partido: parsed.ultimoStatus.siglaPartido,
    uf: parsed.ultimoStatus.siglaUf,
    foto: buildPhotoUrl(parsed.id),
    slug: slugify(parsed.nome),
    email: parsed.ultimoStatus.gabinete.email,
    legislatura: parsed.ultimoStatus.idLegislatura,
  };

  return validateWithSchema(ParlamentarSchema, parlamentar);
};

export const transformVotacao = (
  raw: CamaraVotacaoRaw
): Prisma.VoteEventCreateInput => {
  const parsed = validateWithSchema(CamaraVotacaoRawSchema, raw);
  const votoEvent = {
    externalId: parsed.id,
    data: parsed.data,
    descricao: parsed.descricao,
    resultado: parsed.aprovacao.toString(),
    camara: "camara",
    proposicao: undefined,
  };

  return validateWithSchema(VoteEventCreateSchema, votoEvent);
};

export const transformVoto = (
  raw: CamaraVotoRaw,
  votacaoId: string,
  data: Date
): Prisma.VoteRecordCreateManyInput => {
  const parsed = validateWithSchema(CamaraVotoRawSchema, raw);
  return {
    voto: VoteTypeEnum.parse(parsed.tipoVoto),
    parlamentarId: `dep-${parsed.deputado_.id}`,
    votacaoId,
    data,
  };
};

export const transformProposicao = (
  raw: CamaraProposicaoRaw,
  autorId: string
): Prisma.ProposicaoCreateInput => {
  const parsed = validateWithSchema(CamaraProposicaoRawSchema, raw);
  const proposicao = {
    externalId: parsed.id,
    tipo: parsed.siglaTipo,
    numero: parsed.numero,
    ano: parsed.ano,
    ementa: parsed.ementa,
    dataApresentacao: parsed.dataApresentacao,
    urlInteiro: parsed.urlInteiroTeor ?? null,
    camara: "camara",
    autor: {
      connect: {
        id: autorId,
      },
    },
  };

  return validateWithSchema(ProposicaoCreateSchema, proposicao);
};
const VoteEventCreateSchema = VoteEventSchema.omit({ id: true, proposicaoId: true });
const ProposicaoCreateSchema = ProposicaoSchema.omit({ id: true, autorId: true });
