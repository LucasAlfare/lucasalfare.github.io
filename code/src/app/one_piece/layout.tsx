import type { Metadata } from "next";
import "../globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "One Piece",
  description: "Conteúdos de Lucas sobre One Piece :D",
};

export default function OnePieceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Link href="/one_piece">{"One Piece"}</Link>
      {children}
    </div>
  );
}
