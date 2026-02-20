import { CamaraWrapperSchema } from "@/lib/schemas";

const BASE_URL = "https://dadosabertos.camara.leg.br/api/v2";
const REQUEST_TIMEOUT_MS = 10_000;
const THROTTLE_MS = 200;

const sleep = async (ms: number): Promise<void> =>
  await new Promise((resolve) => setTimeout(resolve, ms));

export const fetchCamara = async (endpoint: string) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(
        `Camara API request failed: ${response.status} ${response.statusText}`
      );
    }

    const json = (await response.json()) as unknown;
    return CamaraWrapperSchema.parse(json);
  } catch (error) {
    if (
      error instanceof DOMException ||
      (error instanceof Error && error.name === "AbortError")
    ) {
      throw new Error("Camara API request timed out after 10s");
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

export const fetchAllPages = async (endpoint: string) => {
  const items: unknown[] = [];
  let nextUrl: string | undefined = endpoint;

  while (nextUrl) {
    const data = await fetchCamara(nextUrl);
    items.push(...data.dados);

    const nextLink = data.links?.find((link) => link.rel === "next");
    nextUrl = nextLink?.href;

    if (nextUrl) {
      await sleep(THROTTLE_MS);
    }
  }

  return items;
};
