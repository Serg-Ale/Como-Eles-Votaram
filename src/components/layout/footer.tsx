import Link from "next/link";
import { Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-card">
      <div className="container px-4 md:px-8 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="w-12 h-12 rounded bg-primary flex items-center justify-center mb-2">
            <span className="font-mono text-primary-foreground font-bold text-sm">CEV</span>
          </div>
          <p className="text-lg font-bold">Como Eles <span className="text-primary">Votaram</span></p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="text-xs font-mono text-primary uppercase tracking-widest mb-4">Sobre</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Plataforma apartidária para monitoramento de votações no Congresso Nacional.
              Dados obtidos diretamente das APIs da Câmara dos Deputados e do Senado Federal.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xs font-mono text-primary uppercase tracking-widest mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/sobre" className="hover:text-foreground transition-colors">
                  Sobre o Projeto
                </Link>
              </li>
              <li>
                <Link href="/metodologia" className="hover:text-foreground transition-colors">
                  Metodologia e Neutralidade
                </Link>
              </li>
              <li>
                <Link href="https://dadosabertos.camara.leg.br/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  Dados Abertos - Câmara
                </Link>
              </li>
              <li>
                <Link href="https://www12.senado.leg.br/dados-abertos" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  Dados Abertos - Senado
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xs font-mono text-primary uppercase tracking-widest mb-4">Dados</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Este projeto é open source. Contribua para a transparência legislativa.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/Serg-Ale/vote-tracking-app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-xs text-muted-foreground">
          <p className="font-mono">© {new Date().getFullYear()} Como Eles Votaram. Todos os direitos reservados.</p>
          <p className="mt-1 opacity-70">
            As opiniões expressas pelos parlamentares não refletem a posição desta plataforma.
          </p>
        </div>
      </div>
    </footer>
  );
};
