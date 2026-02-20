import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Perfil do Deputado | Vote Tracking",
  description: "Acompanhe o histórico de votações e proposições dos deputados federais.",
};

export default function DeputadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
