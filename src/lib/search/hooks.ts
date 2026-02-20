"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { parseSearchParams, buildSearchParams, type SearchFilters } from "./filters";

export function useSearchFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filters = parseSearchParams(searchParams);

  const setFilters = (newFilters: SearchFilters) => {
    const queryString = buildSearchParams(newFilters);
    const newUrl = queryString ? `/busca?${queryString}` : "/busca";
    router.push(newUrl);
  };

  return { filters, setFilters };
}

export function useDebouncedValue<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
