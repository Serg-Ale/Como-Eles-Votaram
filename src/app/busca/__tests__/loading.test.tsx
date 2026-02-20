import { render, screen } from "@testing-library/react";
import Loading from "../loading";

jest.mock("@/components/ui/skeleton", () => ({
  Skeleton: (props: any) => <div data-testid="skeleton" {...props} />,
}));

describe("Search Page Loading State", () => {
  it("renders the loading container", () => {
    const { container } = render(<Loading />);
    expect(container.firstChild).toHaveClass("container");
  });

  it("renders the header skeleton", () => {
    render(<Loading />);
    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons.length).toBeGreaterThan(0);
    // The first one is the title
    expect(skeletons[0]).toHaveClass("h-10");
    expect(skeletons[0]).toHaveClass("w-48");
  });

  it("renders a grid of skeletons for results", () => {
    render(<Loading />);
    const grid = screen.getByTestId("loading-grid");
    expect(grid).toHaveClass("grid-cols-1");
    expect(grid).toHaveClass("sm:grid-cols-2");
    expect(grid).toHaveClass("md:grid-cols-3");
    expect(grid).toHaveClass("lg:grid-cols-4");
  });

  it("renders correct number of skeletons", () => {
    render(<Loading />);
    // 1 title + 4 filters + 8 cards = 13 skeletons
    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons).toHaveLength(13);
  });
});
