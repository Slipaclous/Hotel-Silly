import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-accent",
});

export const metadata: Metadata = {
  title: "Hôtel de Silly - Luxe & Raffinement",
  description: "Découvrez notre hôtel de luxe où élégance et confort se rencontrent pour créer une expérience inoubliable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${montserrat.variable} ${playfair.variable}`}>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
