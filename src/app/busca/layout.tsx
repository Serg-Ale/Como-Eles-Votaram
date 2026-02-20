import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Buscar Parlamentares | Vote Tracking",
  description: "Pesquise deputados e senadores por nome, partido ou estado.",
};

export default function BuscaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
