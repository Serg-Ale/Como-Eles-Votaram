import "@/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: {
    template: "%s — Como Eles Votaram",
    default: "Como Eles Votaram — Transparência Legislativa",
  },
  description:
    "Acompanhe como cada deputado e senador votou no Congresso Nacional. Dados oficiais da Câmara e do Senado.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Como Eles Votaram — Transparência Legislativa",
    description:
      "Acompanhe como cada deputado e senador votou no Congresso Nacional. Dados oficiais da Câmara e do Senado.",
    siteName: "Como Eles Votaram",
    locale: "pt_BR",
    type: "website",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Como Eles Votaram — Transparência Legislativa",
    description:
      "Acompanhe como cada deputado e senador votou no Congresso Nacional.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${inter.variable} antialiased`}>
        <TRPCReactProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
