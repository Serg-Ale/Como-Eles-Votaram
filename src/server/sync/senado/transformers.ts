import { z } from "zod";

import {
  ParlamentarSchema,
  ProposicaoSchema,
  SenadoSenadorRawSchema,
  SenadoVotacaoRawSchema,
  SenadoVotoRawSchema,
  VoteEventSchema,
  VoteTypeEnum,
  type SenadoSenadorRaw,
  type SenadoVotacaoRaw,
  type SenadoVotoRaw,
} from "@/lib/schemas";
import type { Prisma } from "../../../../generated/prisma";

import { slugify } from "../camara/transformers";

const validateWithSchema = <T>(schema: z.ZodSchema<T>, value: unknown): T =>
  schema.parse(value);

export const rewritePhotoUrl = (url: string): string =>
  url.startsWith("http://") ? url.replace("http://", "https://") : url;

export const transformSenador = (
  raw: SenadoSenadorRaw
): Prisma.ParlamentarCreateInput => {
  const parsed = validateWithSchema(SenadoSenadorRawSchema, raw);
  const identificacao = parsed.IdentificacaoParlamentar;
  const senador = {
    id: `sen-${identificacao.CodigoParlamentar}`,
    idOriginal: Number(identificacao.CodigoParlamentar),
    camara: "senado",
    nome: identificacao.NomeParlamentar,
    nomeCompleto: identificacao.NomeCompletoParlamentar,
    partido: identificacao.SiglaPartidoParlamentar,
    uf: identificacao.UfParlamentar,
    foto: rewritePhotoUrl(identificacao.UrlFotoParlamentar),
    slug: slugify(identificacao.NomeCompletoParlamentar),
    email: identificacao.EmailParlamentar ?? null,
    legislatura: 57,
  };

  return validateWithSchema(ParlamentarSchema, senador);
};

export const transformVotacaoSenado = (
  raw: SenadoVotacaoRaw
): Prisma.VoteEventCreateInput => {
  const parsed = validateWithSchema(SenadoVotacaoRawSchema, raw);
  const votacao = {
    externalId: parsed.Votacao.CodigoSessaoVotacao,
    data: parsed.DataSessao,
    descricao: parsed.Votacao.DescricaoVotacao,
    resultado: parsed.Votacao.Resultado ?? null,
    camara: "senado",
    proposicao: undefined,
  };

  const VoteEventCreateSchema = VoteEventSchema.omit({
    id: true,
    proposicaoId: true,
  });
  return validateWithSchema(VoteEventCreateSchema, votacao);
};

export const transformVotoSenado = (
  raw: SenadoVotoRaw,
  votacaoId: string,
  data: Date
): Prisma.VoteRecordCreateManyInput => {
  const parsed = validateWithSchema(SenadoVotoRawSchema, raw);
  const voto = VoteTypeEnum.safeParse(parsed.Voto);

  return {
    voto: voto.success ? voto.data : "Não Votou",
    parlamentarId: `sen-${parsed.CodigoParlamentar}`,
    votacaoId,
    data,
  };
};

type SenadoProposicaoRaw = {
  CodigoMateria?: string | number;
  SiglaSubtipoMateria?: string;
  SiglaTipo?: string;
  NumeroMateria?: string | number;
  AnoMateria?: string | number;
  EmentaMateria?: string;
  DataApresentacao?: string;
  UrlTextoIntegral?: string | null;
};

const isSenadoProposicaoRaw = (value: unknown): value is SenadoProposicaoRaw =>
  typeof value === "object" && value !== null;

export const transformProposicaoSenado = (
  raw: unknown,
  autorId: string
): Prisma.ProposicaoCreateInput => {
  if (!isSenadoProposicaoRaw(raw)) {
    throw new Error("Invalid Senado proposicao payload");
  }

  if (!raw.CodigoMateria) {
    throw new Error("Invalid Senado proposicao id");
  }

  const proposicao = {
    externalId: Number(raw.CodigoMateria),
    tipo: raw.SiglaSubtipoMateria ?? raw.SiglaTipo ?? "Nao informado",
    numero: Number(raw.NumeroMateria ?? 0),
    ano: Number(raw.AnoMateria ?? 0),
    ementa: raw.EmentaMateria ?? "Nao informado",
    dataApresentacao: raw.DataApresentacao ?? new Date().toISOString(),
    urlInteiro: raw.UrlTextoIntegral ?? null,
    camara: "senado",
    autor: {
      connect: {
        id: autorId,
      },
    },
  };

  return proposicao;
};
