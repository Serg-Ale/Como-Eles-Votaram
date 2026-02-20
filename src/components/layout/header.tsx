import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-lg tracking-tight">Como Eles Votaram</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/deputados" className="transition-colors hover:text-foreground text-muted-foreground">
              Deputados
            </Link>
            <Link href="/senadores" className="transition-colors hover:text-foreground text-muted-foreground">
              Senadores
            </Link>
            <Link href="/votacoes" className="transition-colors hover:text-foreground text-muted-foreground">
              Votações
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <p className="hidden md:block text-xs text-muted-foreground mr-2 font-mono">
            Fiscalize seus representantes
          </p>
          <Button variant="ghost" size="icon" asChild className="hover:bg-muted">
            <Link href="/buscar">
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
