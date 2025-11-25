import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="fr">
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
