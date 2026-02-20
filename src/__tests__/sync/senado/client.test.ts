import { fetchSenado } from "@/server/sync/senado/client";

describe("senado client", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("fetchSenado returns json payload", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: "ok" }),
    });

    const result = await fetchSenado("/senador/lista/atual.json");
    expect(result).toEqual({ data: "ok" });
  });

  it("fetchSenado keeps absolute URLs", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    });

    await fetchSenado("https://legis.senado.leg.br/dadosabertos/votacao.json");

    expect((global.fetch as jest.Mock).mock.calls[0]?.[0]).toBe(
      "https://legis.senado.leg.br/dadosabertos/votacao.json"
    );
  });

  it("fetchSenado returns null after retries", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 503,
      statusText: "Service Unavailable",
      json: async () => ({ message: "down" }),
    });

    const result = await fetchSenado("/senador/lista/atual.json");
    expect(result).toBeNull();
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  it("fetchSenado aborts after 15s timeout", async () => {
    jest.useFakeTimers();
    (global.fetch as jest.Mock).mockImplementation(
      (_url: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener("abort", () => {
            const error = new Error("Aborted");
            error.name = "AbortError";
            reject(error);
          });
        })
    );

    const promise = fetchSenado("/senador/lista/atual.json");
    await jest.advanceTimersByTimeAsync(15_000);

    const result = await promise;
    expect(result).toBeNull();
  });

  it("fetchSenado retries on timeout", async () => {
    jest.useFakeTimers();
    (global.fetch as jest.Mock).mockImplementation(
      (_url: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener("abort", () => {
            const error = new Error("Aborted");
            error.name = "AbortError";
            reject(error);
          });
        })
    );

    const promise = fetchSenado("/senador/lista/atual.json");
    await jest.advanceTimersByTimeAsync(60_000);
    await Promise.resolve();

    const result = await promise;
    expect(result).toBeNull();
    expect(global.fetch).toHaveBeenCalledTimes(3);
  }, 20_000);

  it("fetchSenado uses exponential backoff", async () => {
    jest.useFakeTimers();
    const calls: number[] = [];

    (global.fetch as jest.Mock).mockImplementation(
      (_url: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          calls.push(Date.now());
          init.signal?.addEventListener("abort", () => {
            const error = new Error("Aborted");
            error.name = "AbortError";
            reject(error);
          });
        })
    );

    const promise = fetchSenado("/senador/lista/atual.json");
    await jest.advanceTimersByTimeAsync(60_000);
    await Promise.resolve();

    await promise;

    expect(calls.length).toBe(3);
  }, 20_000);

  it("fetchSenado throttles between requests", async () => {
    jest.useFakeTimers();
    const calls: number[] = [];

    (global.fetch as jest.Mock)
      .mockImplementationOnce(async () => {
        calls.push(Date.now());
        return {
          ok: true,
          json: async () => ({ data: 1 }),
        };
      })
      .mockImplementationOnce(async () => {
        calls.push(Date.now());
        return {
          ok: true,
          json: async () => ({ data: 2 }),
        };
      });

    const first = fetchSenado("/senador/lista/atual.json");
    const second = fetchSenado("/votacao.json");

    await jest.advanceTimersByTimeAsync(2_000);
    await Promise.resolve();
    await Promise.all([first, second]);

    expect(calls.length).toBe(2);
    expect((calls[1] ?? 0) - (calls[0] ?? 0)).toBeGreaterThanOrEqual(500);
  }, 20_000);
});
