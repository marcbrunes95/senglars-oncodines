import type { Metadata } from "next";
import { Barlow_Condensed, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const source = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Senglars de Bardissa · Oncodines Trail",
  description:
    "Seguiment en directe de l'equip Senglars de Bardissa a l'Oncodines Trail. Etapes, mapa i estadístiques.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ca"
      className={`${barlow.variable} ${source.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-slate-900 text-slate-50 antialiased font-[family-name:var(--font-source)]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
