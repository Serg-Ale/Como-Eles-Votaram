export type SearchFilters = {
  q?: string;
  partido?: string;
  uf?: string;
  camara?: "camara" | "senado" | "todas";
};

export function parseSearchParams(
  searchParams: URLSearchParams
): SearchFilters {
  const filters: SearchFilters = {};

  const q = searchParams.get("q");
  if (q) filters.q = q;

  const partido = searchParams.get("partido");
  if (partido) filters.partido = partido;

  const uf = searchParams.get("uf");
  if (uf) filters.uf = uf;

  const camara = searchParams.get("camara");
  if (camara && ["camara", "senado", "todas"].includes(camara)) {
    filters.camara = camara as "camara" | "senado" | "todas";
  }

  return filters;
}

export function buildSearchParams(filters: SearchFilters): string {
  const params = new URLSearchParams();

  if (filters.q) params.append("q", filters.q);
  if (filters.partido) params.append("partido", filters.partido);
  if (filters.uf) params.append("uf", filters.uf);
  if (filters.camara) params.append("camara", filters.camara);

  const queryString = params.toString();
  return queryString;
}
