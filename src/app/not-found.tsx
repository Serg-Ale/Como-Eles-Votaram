import Link from "next/link";
import { HeroSearchBar } from "@/components/search/hero-search-bar";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-5xl font-bold mb-4">Página não encontrada</h1>
      <p className="text-muted-foreground mb-8">
        O endereço que você acessou não existe ou foi removido.
      </p>
      <div className="max-w-lg mx-auto mb-8">
        <HeroSearchBar />
      </div>
      <Link href="/" className="text-primary hover:underline">
        Voltar para a página inicial
      </Link>
    </div>
  );
}
