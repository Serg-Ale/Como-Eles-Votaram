import { type Metadata } from "next";
import { api } from "@/trpc/server";
import { parseSlug } from "@/lib/search/slug";
import { generatePersonLD } from "@/lib/json-ld";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { id } = parseSlug(slug);

  if (!id) {
    return {
      title: "Deputado não encontrado | Como Eles Votaram",
    };
  }

  try {
    const parlamentar = await api.parlamentar.getById({ id });

    if (!parlamentar || parlamentar.camara !== "camara") {
      return {
        title: "Deputado não encontrado | Como Eles Votaram",
      };
    }

    return {
      title: `${parlamentar.nome} (${parlamentar.partido}-${parlamentar.uf})`,
      description: `Veja como ${parlamentar.nome} votou na Câmara dos Deputados. Acompanhe seu histórico de votações e proposições.`,
      openGraph: {
        title: `${parlamentar.nome} (${parlamentar.partido}-${parlamentar.uf}) — Como Eles Votaram`,
        description: `Veja como ${parlamentar.nome} votou na Câmara dos Deputados. Acompanhe seu histórico de votações e proposições.`,
        images: ["/opengraph-image.png"],
        type: "profile",
      },
      twitter: {
        card: "summary_large_image",
        title: `${parlamentar.nome} (${parlamentar.partido}-${parlamentar.uf})`,
        description: `Veja como ${parlamentar.nome} votou na Câmara dos Deputados.`,
      },
    };
  } catch {
    return {
      title: "Deputado | Como Eles Votaram",
    };
  }
}

export default async function DeputadoLayout({
  children,
  params,
}: Props) {
  const { slug } = await params;
  const { id } = parseSlug(slug);

  let personSchema = null;

  if (id) {
    try {
      const parlamentar = await api.parlamentar.getById({ id });
      
      if (parlamentar && parlamentar.camara === "camara") {
        personSchema = generatePersonLD({
          nome: parlamentar.nome,
          nomeEleitoral: parlamentar.nomeCompleto,
          partido: parlamentar.partido,
          uf: parlamentar.uf,
          camara: parlamentar.camara,
          email: parlamentar.email,
          urlFoto: parlamentar.foto,
        });
      }
    } catch {
      // Schema generation failed, continue without JSON-LD
    }
  }

  return (
    <>
      {personSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      )}
      {children}
    </>
  );
}
