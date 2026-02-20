import { render, screen, fireEvent } from "@testing-library/react";
import ErrorBoundary from "../error";

// Mock the console.error to avoid polluting test output
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe("Global Error Boundary", () => {
  it("renders the error message", () => {
    const error = new Error("Test error message");
    const reset = jest.fn();

    render(<ErrorBoundary error={error} reset={reset} />);

    expect(screen.getByText("Algo deu errado ao carregar os dados")).toBeInTheDocument();
    expect(screen.getByText("Tente novamente ou volte para a página inicial.")).toBeInTheDocument();
  });

  it("calls reset when the retry button is clicked", () => {
    const error = new Error("Test error message");
    const reset = jest.fn();

    render(<ErrorBoundary error={error} reset={reset} />);

    const button = screen.getByRole("button", { name: /tentar novamente/i });
    fireEvent.click(button);

    expect(reset).toHaveBeenCalled();
  });

  it("renders error details in a collapsible section", () => {
    const error = new Error("Test error message");
    const reset = jest.fn();

    render(<ErrorBoundary error={error} reset={reset} />);

    expect(screen.getByText("Detalhes técnicos")).toBeInTheDocument();
    // The details content might be hidden, but present in the DOM
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });
});
