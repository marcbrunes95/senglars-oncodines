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
  metadataBase: new URL("https://senglars-oncodines.vercel.app"),
  title: "Senglars de Bardissa | Oncodines Trail",
  description:
    "Una experiència. Un equip. Una gesta. Descobreix la ruta interactiva, les estadístiques i els rècords dels 102 km de cursa.",
  openGraph: {
    title: "Senglars de Bardissa | Oncodines Trail",
    description:
      "Una experiència. Un equip. Una gesta. Descobreix la ruta interactiva, les estadístiques i els rècords dels 102 km de cursa.",
    url: "https://senglars-oncodines.vercel.app",
    siteName: "Senglars de Bardissa",
    images: [
      {
        url: "/foto-equip.jpg",
        width: 1200,
        height: 630,
        alt: "Equip Senglars de Bardissa",
      },
    ],
    locale: "ca_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Senglars de Bardissa | Oncodines Trail",
    description:
      "Una experiència. Un equip. Una gesta. Descobreix la ruta interactiva, les estadístiques i els rècords dels 102 km de cursa.",
    images: ["/foto-equip.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ca"
      className={`${barlow.variable} ${source.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-slate-900 text-slate-50 antialiased font-[family-name:var(--font-source)]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
