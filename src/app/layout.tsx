import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Chakra_Petch } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Archipunct Studio | Arhitektura, Enterijeri i Pejzažno Uređenje — Novi Sad",
  description:
    "Archipunct Studio — autorski arhitektonski studio koji vodi master inž. arh. Boris Dačić. Arhitektonsko projektovanje, unikatni dizajn enterijera, pejzažna arhitektura, adaptacije i fotorealistični 3D renderi. Novi Sad, Srbija.",
  keywords: [
    "Archipunct",
    "Boris Dačić",
    "arhitektura novi sad",
    "dizajn enterijera novi sad",
    "pejzažna arhitektura",
    "uređenje enterijera",
    "projektovanje enterijera",
    "arhi viz",
    "3d modelovanje i animacija",
    "arhitektonski biro novi sad",
    "adaptacije i renoviranje",
    "dizajner enterijera novi sad",
  ],
  openGraph: {
    title: "Archipunct Studio | Arhitektura · Enterijeri · Pejzažno Uređenje · 3D Viz",
    description:
      "Arhitektonsko projektovanje, dizajn enterijera, pejzažna arhitektura, adaptacije i 3D vizuelizacija. Master inž. arh. Boris Dačić — Novi Sad, Srbija.",
    type: "website",
    locale: "sr_RS",
    siteName: "Archipunct Studio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sr" className={`${inter.variable} ${cormorant.variable} ${chakra.variable} antialiased`}>
      <body className="flex flex-col bg-[#0a0a0a] text-[#f5f4f0] overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
