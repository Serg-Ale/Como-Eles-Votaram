import { render, screen } from "@testing-library/react";
import { ParlamentarCard } from "../parlamentar/parlamentar-card";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ priority, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

describe("ParlamentarCard", () => {
  const mockProps = {
    id: "123",
    nome: "Fulano de Tal",
    partido: "PARTIDO",
    uf: "SP",
    camara: "camara",
    foto: "https://example.com/foto.jpg",
    slug: "fulano-de-tal",
  };

  it("renders parlamentar name and party", () => {
    render(<ParlamentarCard {...mockProps} />);
    expect(screen.getByText("Fulano de Tal")).toBeInTheDocument();
    expect(screen.getByText("PARTIDO")).toBeInTheDocument();
    expect(screen.getByText("SP")).toBeInTheDocument();
  });

  it("generates correct link for Deputado", () => {
    render(<ParlamentarCard {...mockProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/deputados/123-fulano-de-tal");
  });

  it("generates correct link for Senador", () => {
    render(<ParlamentarCard {...mockProps} camara="senado" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/senadores/123-fulano-de-tal");
  });
});
