"use client";

import { useEffect, useState, Suspense } from "react";
import { Search, Loader2 } from "lucide-react";

import { api } from "@/trpc/react";
import { useSearchFilters, useDebouncedValue } from "@/lib/search/hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ParlamentarCard } from "@/components/parlamentar/parlamentar-card";
import { EmptyState } from "@/components/data/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

function BuscaPageContent() {
  const { filters, setFilters } = useSearchFilters();
  const [searchTerm, setSearchTerm] = useState(filters.q || "");
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

  useEffect(() => {
    setSearchTerm(filters.q || "");
  }, [filters.q]);

  useEffect(() => {
    if (debouncedSearchTerm !== (filters.q || "")) {
      setFilters({ ...filters, q: debouncedSearchTerm || undefined });
    }
  }, [debouncedSearchTerm, filters, setFilters]);

  const apiCamaraFilter =
    filters.camara === "camara"
      ? "deputados"
      : filters.camara === "senado"
      ? "senadores"
      : undefined;

  const { data: partidos } = api.parlamentar.listPartidos.useQuery();
  const { data: ufs } = api.parlamentar.listUfs.useQuery();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = api.parlamentar.search.useInfiniteQuery(
    {
      q: filters.q,
      partido: filters.partido,
      uf: filters.uf,
      camara: apiCamaraFilter,
      limit: 20,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialCursor: undefined,
    }
  );

  const allItems = data?.pages.flatMap((page) => page.items) || [];
  const showEmptyState = status === "success" && allItems.length === 0;

  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Buscar Parlamentares</h1>
        
        <div className="grid gap-4 md:grid-cols-[2fr,1fr,1fr,auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Nome, apelido..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select
            value={filters.partido || "todos"}
            onValueChange={(val) =>
              setFilters({ ...filters, partido: val === "todos" ? undefined : val })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Partido" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os partidos</SelectItem>
              {partidos?.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.uf || "todos"}
            onValueChange={(val) =>
              setFilters({ ...filters, uf: val === "todos" ? undefined : val })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os estados</SelectItem>
              {ufs?.map((uf) => (
                <SelectItem key={uf} value={uf}>
                  {uf}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Tabs
            value={filters.camara || "todas"}
            onValueChange={(val) =>
              setFilters({
                ...filters,
                camara: val as "todas" | "camara" | "senado",
              })
            }
            className="w-full md:w-auto"
          >
            <TabsList>
              <TabsTrigger value="todas">Todos</TabsTrigger>
              <TabsTrigger value="camara">Câmara</TabsTrigger>
              <TabsTrigger value="senado">Senado</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="space-y-3">
              <Skeleton className="h-[280px] w-full rounded-lg" />
            </div>
          ))}
        </div>
      ) : showEmptyState ? (
        <EmptyState
          title={`Nenhum parlamentar encontrado para "${filters.q || ""}"`}
          description="Tente pesquisar por nome completo, partido (ex: PT, PSDB) ou estado (ex: SP, RJ)."
        />
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allItems.map((parlamentar) => (
              <ParlamentarCard
                key={parlamentar.id}
                id={parlamentar.id}
                nome={parlamentar.nome}
                partido={parlamentar.partido}
                uf={parlamentar.uf}
                camara={parlamentar.camara === "deputados" ? "camara" : "senado"}
                foto={parlamentar.foto}
                slug={parlamentar.slug}
              />
            ))}
          </div>
          
          {hasNextPage && (
            <div className="flex justify-center py-8">
              <Button
                variant="outline"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Carregando...
                  </>
                ) : (
                  "Carregar mais"
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function BuscaPage() {
  return (
    <Suspense fallback={
      <div className="container py-8 space-y-8">
        <div className="h-10 w-48 bg-muted rounded animate-pulse" />
        <div className="h-10 w-full bg-muted rounded animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`fallback-skeleton-${i}`} className="space-y-3">
              <Skeleton className="h-[280px] w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    }>
      <BuscaPageContent />
    </Suspense>
  );
}
