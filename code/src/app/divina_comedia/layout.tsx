import type { Metadata } from "next";
import "../globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Divina Comédia",
  description: "Conteúdos de Lucas sobre a Divina Comédia, de Dante Alighieri",
};

export default function OnePieceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Link href="/divina_comedia">{"Divina Comédia"}</Link>
      {children}
    </div>
  );
}
