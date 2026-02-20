import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { FotoParlamentar } from "./foto-parlamentar";
import { PartidoBadge } from "./partido-badge";
import { CamaraIndicator } from "./camara-indicator";
import { cn } from "@/lib/utils";

interface ParlamentarCardProps {
  id: string;
  nome: string;
  partido: string;
  uf: string;
  camara: string;
  foto: string;
  slug: string;
  className?: string;
}

export const ParlamentarCard = ({
  id,
  nome,
  partido,
  uf,
  camara,
  foto,
  slug,
  className,
}: ParlamentarCardProps) => {
  const isCamara = camara.toLowerCase() === "camara";
  const basePath = isCamara ? "/deputados" : "/senadores";
  const href = `${basePath}/${id}-${slug}`;

  return (
    <Link href={href} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
      <Card className={cn("overflow-hidden h-full bg-card hover:bg-card/80 transition-colors", className)}>
        <CardContent className="p-4 flex flex-col items-center gap-3 text-center">
          <div className="relative">
            <FotoParlamentar 
              url={foto} 
              nome={nome} 
              size={80} 
              className="border-2 border-background shadow-sm group-hover:border-primary/20 transition-colors" 
            />
            <CamaraIndicator 
              camara={camara} 
              className="absolute -bottom-2 -right-2 scale-75 shadow-sm bg-background" 
            />
          </div>
          
          <div className="space-y-1 w-full">
            <h3 className="font-semibold leading-tight truncate px-1 text-foreground" title={nome}>
              {nome}
            </h3>
            
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <PartidoBadge partido={partido} />
              <span className="text-xs font-medium border border-border px-1.5 py-0.5 rounded text-muted-foreground">
                {uf}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
