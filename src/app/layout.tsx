import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

const dancingScript = Dancing_Script({ 
  subsets: ["latin"],
  variable: "--font-dancing",
});

export const metadata: Metadata = {
  title: "Hôtel de Luxe - Expérience Unique",
  description: "Découvrez notre hôtel de luxe où élégance et confort se rencontrent pour créer une expérience inoubliable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} ${dancingScript.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
