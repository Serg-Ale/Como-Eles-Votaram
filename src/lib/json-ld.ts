const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

interface WebSiteSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  potentialAction: {
    "@type": string;
    target: {
      "@type": string;
      urlTemplate: string;
    };
    "query-input": string;
  };
}

interface PersonSchema {
  "@context": string;
  "@type": string;
  name: string;
  alternateName?: string;
  jobTitle: string;
  email?: string;
  image?: string;
  memberOf: {
    "@type": string;
    name: string;
  };
  affiliation: {
    "@type": string;
    name: string;
  };
  address: {
    "@type": string;
    addressRegion: string;
    addressCountry: string;
  };
}

export function generateWebSiteLD(): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Como Eles Votaram",
    description:
      "Transparência legislativa: acompanhe como cada deputado e senador votou no Congresso Nacional.",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/busca?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generatePersonLD(parlamentar: {
  nome: string;
  nomeEleitoral: string;
  partido: string;
  uf: string;
  camara: string;
  email: string | null;
  urlFoto: string | null;
}): PersonSchema {
  const isSenado = parlamentar.camara === "senado";
  const jobTitle = isSenado ? "Senador" : "Deputado Federal";
  const organization = isSenado ? "Senado Federal" : "Câmara dos Deputados";

  const schema: PersonSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: parlamentar.nome,
    alternateName: parlamentar.nomeEleitoral,
    jobTitle,
    memberOf: {
      "@type": "Organization",
      name: organization,
    },
    affiliation: {
      "@type": "Organization",
      name: parlamentar.partido,
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: parlamentar.uf,
      addressCountry: "BR",
    },
  };

  if (parlamentar.email) {
    schema.email = parlamentar.email;
  }

  if (parlamentar.urlFoto) {
    schema.image = parlamentar.urlFoto;
  }

  return schema;
}
