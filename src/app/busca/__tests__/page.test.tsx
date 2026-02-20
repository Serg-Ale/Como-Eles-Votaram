import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchPage from "../page";
import { useSearchParams, useRouter } from "next/navigation";
import { useSearchFilters, useDebouncedValue } from "@/lib/search/hooks";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock("@/lib/search/hooks", () => ({
  useSearchFilters: jest.fn(),
  useDebouncedValue: jest.fn((val) => val),
}));

jest.mock("@/trpc/react", () => ({
  api: {
    parlamentar: {
      search: {
        useInfiniteQuery: jest.fn(),
      },
      listPartidos: {
        useQuery: jest.fn(),
      },
      listUfs: {
        useQuery: jest.fn(),
      },
    },
  },
}));

jest.mock("@/components/parlamentar/parlamentar-card", () => ({
  ParlamentarCard: ({ nome }: { nome: string }) => <div data-testid="parlamentar-card">{nome}</div>,
}));

jest.mock("@/components/data/empty-state", () => ({
  EmptyState: ({ title }: { title: string }) => <div data-testid="empty-state">{title}</div>,
}));

jest.mock("@/components/ui/skeleton", () => ({
  Skeleton: () => <div data-testid="skeleton" />,
}));

const mockUseInfiniteQuery = require("@/trpc/react").api.parlamentar.search.useInfiniteQuery;
const mockListPartidos = require("@/trpc/react").api.parlamentar.listPartidos.useQuery;
const mockListUfs = require("@/trpc/react").api.parlamentar.listUfs.useQuery;
const mockUseRouter = useRouter as jest.Mock;
const mockUseSearchParams = useSearchParams as jest.Mock;
const mockUseSearchFilters = useSearchFilters as jest.Mock;

describe("SearchPage", () => {
  const pushMock = jest.fn();
  const setFiltersMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({ push: pushMock });
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
    mockUseSearchFilters.mockReturnValue({
      filters: {},
      setFilters: setFiltersMock,
    });

    mockListPartidos.mockReturnValue({ data: ["PT", "PL"], isLoading: false });
    mockListUfs.mockReturnValue({ data: ["SP", "RJ"], isLoading: false });
    mockUseInfiniteQuery.mockReturnValue({
      data: {
        pages: [
          {
            items: [],
            nextCursor: null,
          },
        ],
      },
      isLoading: false,
      status: "success",
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });
  });

  it("renders search input and filters", () => {
    render(<SearchPage />);
    
    expect(screen.getByPlaceholderText(/nome, apelido/i)).toBeInTheDocument();
    expect(screen.getByText(/partido/i)).toBeInTheDocument();
    expect(screen.getByText(/estado/i)).toBeInTheDocument();
  });

  it("shows loading skeletons when fetching", () => {
    mockUseInfiniteQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      status: "pending",
      fetchNextPage: jest.fn(),
      hasNextPage: false,
    });

    render(<SearchPage />);
    
    expect(screen.getAllByTestId("skeleton").length).toBeGreaterThan(0);
  });

  it("displays search results", () => {
    mockUseInfiniteQuery.mockReturnValue({
      data: {
        pages: [
          {
            items: [
              { id: "1", nome: "Fulano", partido: "PT", uf: "SP", camara: "deputados", foto: "url", slug: "fulano" },
            ],
            nextCursor: null,
          },
        ],
      },
      isLoading: false,
      status: "success",
      fetchNextPage: jest.fn(),
      hasNextPage: false,
    });

    render(<SearchPage />);
    
    expect(screen.getByTestId("parlamentar-card")).toHaveTextContent("Fulano");
  });

  it("displays empty state when no results found", () => {
    mockUseSearchFilters.mockReturnValue({
      filters: { q: "inexistente" },
      setFilters: setFiltersMock,
    });

    mockUseInfiniteQuery.mockReturnValue({
      data: {
        pages: [
          {
            items: [],
            nextCursor: null,
          },
        ],
      },
      isLoading: false,
      status: "success",
      fetchNextPage: jest.fn(),
      hasNextPage: false,
    });

    render(<SearchPage />);
    
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("updates filters when input changes", async () => {
    render(<SearchPage />);
    
    const input = screen.getByPlaceholderText(/nome, apelido/i);
    fireEvent.change(input, { target: { value: "novo termo" } });
    
    await waitFor(() => {
        expect(setFiltersMock).toHaveBeenCalledWith(expect.objectContaining({ q: "novo termo" }));
    });
  });
});
