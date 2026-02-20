import { Mail, CalendarRange } from "lucide-react";
import { FotoParlamentar } from "./foto-parlamentar";
import { PartidoBadge } from "./partido-badge";
import { CamaraIndicator } from "./camara-indicator";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ParlamentarHeaderProps {
  parlamentar: {
    nome: string;
    nomeCompleto: string;
    partido: string;
    uf: string;
    foto: string;
    email?: string | null;
    legislatura: number;
    camara: string;
  };
}

export const ParlamentarHeader = ({ parlamentar }: ParlamentarHeaderProps) => {
  const { nome, nomeCompleto, partido, uf, foto, email, legislatura, camara } = parlamentar;

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 p-6 md:p-8 bg-card border rounded-xl shadow-sm">
      <div className="relative shrink-0">
        <FotoParlamentar 
          url={foto} 
          nome={nome} 
          size={120} 
          priority 
          className="border-4 border-background shadow-md"
        />
        <CamaraIndicator 
          camara={camara} 
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-background shadow-sm" 
        />
      </div>

      <div className="flex-1 text-center md:text-left space-y-4 w-full">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">{nome}</h1>
          <p className="text-muted-foreground text-sm font-medium">{nomeCompleto}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
          <PartidoBadge partido={partido} className="text-sm px-3 py-1" />
          <span className="text-sm font-medium border px-2 py-0.5 rounded bg-muted/30">
            {uf}
          </span>
          <Separator orientation="vertical" className="h-4 hidden md:block" />
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <CalendarRange className="h-4 w-4" />
            <span>{legislatura}ª Legislatura</span>
          </div>
        </div>

        {email && (
          <div className="pt-2 flex justify-center md:justify-start">
            <Button variant="outline" size="sm" asChild className="gap-2">
              <a href={`mailto:${email}`}>
                <Mail className="h-4 w-4" />
                {email}
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
