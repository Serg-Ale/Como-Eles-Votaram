import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] py-12 px-4 space-y-6 text-center">
      <div className="bg-muted p-6 rounded-full">
        <Search className="h-12 w-12 text-muted-foreground" />
      </div>
      
      <div className="space-y-2 max-w-md">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Parlamentar não encontrado
        </h1>
        <p className="text-muted-foreground">
          Não conseguimos encontrar o senador que você está procurando. O link pode estar quebrado ou o parlamentar não existe em nossa base de dados.
        </p>
      </div>

      <div className="flex gap-4">
        <Button asChild variant="default">
          <Link href="/">
            Voltar para o início
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/busca">
            Fazer uma nova busca
          </Link>
        </Button>
      </div>
    </div>
  );
}
