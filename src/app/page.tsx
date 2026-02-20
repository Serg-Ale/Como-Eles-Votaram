import Link from "next/link";

import { api, HydrateClient } from "@/trpc/server";
import { HeroSearchBar } from "@/components/search/hero-search-bar";
import { generateWebSiteLD } from "@/lib/json-ld";

export default async function Home() {
  const stats = await api.stats.getCounts();
  const websiteSchema = generateWebSiteLD();

  return (
    <HydrateClient>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <div className="flex flex-col min-h-screen">
        <section className="relative flex flex-col items-center justify-center py-24 md:py-32 bg-gradient-to-b from-[#09090b] to-[#1a1b2e] text-center px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
              Como Eles <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-400 to-blue-500">Votaram</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-medium max-w-2xl mx-auto">
              Menos discurso. Mais registro.
            </p>
            <div className="w-full max-w-lg mx-auto pt-4">
              <HeroSearchBar />
            </div>
          </div>
        </section>

        <section className="py-20 bg-background border-y border-border/40">
          <div className="container mx-auto px-4 max-w-4xl text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Tornar visível o que já é público
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              O dado faz o confronto. Sem opiniões, sem viés, apenas o registro histórico de cada voto.
              Acompanhe como seus representantes se posicionam quando realmente importa.
            </p>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Como funciona</h2>
            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-2">1</div>
                <h3 className="text-xl font-bold">Busque</h3>
                <p className="text-muted-foreground">
                  Encontre deputados e senadores por nome, partido ou estado.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-2">2</div>
                <h3 className="text-xl font-bold">Veja como votou</h3>
                <p className="text-muted-foreground">
                  Acesse o histórico completo de votações em propostas legislativas.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-2">3</div>
                <h3 className="text-xl font-bold">Tire conclusões</h3>
                <p className="text-muted-foreground">
                  Compare o discurso com a prática através dos dados oficiais.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border/40">
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  {stats.totalDeputados.toLocaleString('pt-BR')}
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Deputados</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  {stats.totalSenadores.toLocaleString('pt-BR')}
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Senadores</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  {stats.totalVotacoes.toLocaleString('pt-BR')}
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Votações</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  {stats.totalProposicoes.toLocaleString('pt-BR')}
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Proposições</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#09090b] text-center border-t border-border/10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white/90">
              O registro permanece.
            </h2>
          </div>
        </section>

        <section className="py-8 bg-muted text-center text-sm text-muted-foreground">
          <div className="container mx-auto px-4 space-x-4">
            <span>Dados oficiais:</span>
            <Link 
              href="https://dadosabertos.camara.leg.br" 
              target="_blank" 
              className="underline hover:text-foreground transition-colors"
            >
              Dados Abertos - Câmara
            </Link>
            <span>•</span>
            <Link 
              href="https://legis.senado.leg.br/dadosabertos/docs/ui/index.html" 
              target="_blank" 
              className="underline hover:text-foreground transition-colors"
            >
              Dados Abertos - Senado
            </Link>
          </div>
        </section>
      </div>
    </HydrateClient>
  );
}
