import { type Metadata } from "next";
import { api } from "@/trpc/server";
import { parseSlug } from "@/lib/search/slug";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { id } = parseSlug(slug);

  if (!id) {
    return {
      title: "Senador não encontrado | Como Eles Votaram",
    };
  }

  const parlamentar = await api.parlamentar.getById({ id });

  if (!parlamentar || parlamentar.camara !== "senado") {
    return {
      title: "Senador não encontrado | Como Eles Votaram",
    };
  }

  return {
    title: `${parlamentar.nome} (${parlamentar.partido}-${parlamentar.uf}) — Como Eles Votaram`,
    description: `Veja como ${parlamentar.nome} votou no Senado Federal. Acompanhe seu histórico de votações e proposições.`,
  };
}

export default function SenadorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
