const BASE_URL = "https://legis.senado.leg.br/dadosabertos";
const REQUEST_TIMEOUT_MS = 15_000;
const THROTTLE_MS = 500;
const MAX_RETRIES = 3;

let lastRequestAt = 0;

const sleep = async (ms: number): Promise<void> =>
  await new Promise((resolve) => setTimeout(resolve, ms));

const throttle = async () => {
  const now = Date.now();
  const elapsed = now - lastRequestAt;

  if (elapsed < THROTTLE_MS) {
    await sleep(THROTTLE_MS - elapsed);
  }

  lastRequestAt = Date.now();
};

const buildTimeoutError = () =>
  new Error("Senado API request timed out after 15s");

export const fetchSenado = async (
  endpoint: string
): Promise<unknown | null> => {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      REQUEST_TIMEOUT_MS
    );

    try {
      await throttle();
      const url = endpoint.startsWith("http")
        ? endpoint
        : `${BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(
          `Senado API request failed: ${response.status} ${response.statusText}`
        );
      }

      const json = (await response.json()) as unknown;
      return json;
    } catch (error) {
      const isTimeout =
        error instanceof DOMException ||
        (error instanceof Error && error.name === "AbortError");
      const message = isTimeout
        ? buildTimeoutError().message
        : error instanceof Error
          ? error.message
          : "Senado API request failed";

      if (attempt >= MAX_RETRIES) {
        console.warn(message);
        return null;
      }

      const backoffMs = Math.pow(2, attempt - 1) * 1000;
      await sleep(backoffMs);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return null;
};
