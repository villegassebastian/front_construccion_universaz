import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Universaz · Estamos construyendo algo grande",
  description: "Universaz está llegando — algo grande se está construyendo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/LogoSinFondoTamanoGrande.png" />
      </head>
      <body className="bg-black">{children}</body>
    </html>
  );
}