import { type Metadata } from "next";
import { api } from "@/trpc/server";

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  // Create a caller for metadata generation
  // Note: Request deduplication depends on tRPC/Prisma caching or React cache
  try {
    const votacao = await api.votacao.getById({ id });

    if (!votacao) {
      return {
        title: "Votação não encontrada — Como Eles Votaram",
      };
    }

    const description = votacao.descricao.length > 60 
      ? `${votacao.descricao.substring(0, 60)}...` 
      : votacao.descricao;

    return {
      title: `Votação: ${description} — Como Eles Votaram`,
      description: `Veja como cada parlamentar votou em: ${votacao.descricao}. Resultado: ${votacao.resultado}.`,
    };
  } catch (error) {
    return {
      title: "Votação — Como Eles Votaram",
    };
  }
}

export default function VotacaoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
