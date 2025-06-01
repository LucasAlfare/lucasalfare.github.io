import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Minha lista de conteúdos:</h1>
      <ul>
        <li>
          <Link href="/one_piece">One Piece</Link>
        </li>

        <li>
          <Link href="/divina_comedia">Divina Comedia</Link>
        </li>
      </ul>
    </main>
  );
}
