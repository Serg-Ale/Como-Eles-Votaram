import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-3xl font-bold tracking-tight">Votação não encontrada</h2>
      <p className="text-muted-foreground">
        Não foi possível encontrar a votação solicitada. Ela pode ter sido removida ou o ID está incorreto.
      </p>
      <Button asChild className="mt-4">
        <Link href="/busca">Voltar para a busca</Link>
      </Button>
    </div>
  );
}
