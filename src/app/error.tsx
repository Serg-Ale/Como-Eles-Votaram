"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold mb-4">
        Algo deu errado ao carregar os dados
      </h2>
      <p className="text-muted-foreground mb-8">
        Tente novamente ou volte para a página inicial.
      </p>
      <Button onClick={reset}>Tentar novamente</Button>
      <details className="mt-8 text-left max-w-2xl mx-auto">
        <summary className="cursor-pointer text-sm text-muted-foreground">
          Detalhes técnicos
        </summary>
        <pre className="mt-4 p-4 bg-muted rounded text-xs overflow-auto">
          {error.message}
        </pre>
      </details>
    </div>
  );
}
