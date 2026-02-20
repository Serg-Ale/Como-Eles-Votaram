"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <span className="font-mono text-primary-foreground font-bold text-xs">CEV</span>
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">
            Como Eles <span className="text-primary">Votaram</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/deputados" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Deputados
          </Link>
          <Link href="/senadores" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Senadores
          </Link>
          <Link href="/votacoes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Votações
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/busca">
            <Button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-md font-mono">
              Explorar →
            </Button>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-muted-foreground"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-4">
          <Link href="/deputados" className="text-sm text-muted-foreground hover:text-foreground">
            Deputados
          </Link>
          <Link href="/senadores" className="text-sm text-muted-foreground hover:text-foreground">
            Senadores
          </Link>
          <Link href="/votacoes" className="text-sm text-muted-foreground hover:text-foreground">
            Votações
          </Link>
          <Link href="/busca">
            <Button className="w-full px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-md font-mono">
              Explorar →
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};
