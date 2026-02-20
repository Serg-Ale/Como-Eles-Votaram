import type { ReactNode } from "react";

import { render, screen } from "@testing-library/react";

export const SmokeTest = (): ReactNode => {
  return <div>Hello</div>;
};

describe("smoke test", () => {
  it("renders Hello", () => {
    render(<SmokeTest />);

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
