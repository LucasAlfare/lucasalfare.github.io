import Link from "next/link";

export default function DivinaComediaHome() {
  return (
    <div>
      <h1>Coleção da Divina Comédia</h1>

      <p>
        Aqui eu tenho minha coleção de coisas que coletado e/ou produzido sobre
        a Divina Comédia. Vou deixar principalmente minha adaptação em prosa
        aqui, e também o link para as playlists dessas adaptações em forma de
        narração, que estão no youtube.
      </p>

      <h2>Playlists narradas (Youtube)</h2>
      <ul>
        <li>
          <Link href="https://youtube.com/playlist?list=PLhLOnH9KU7x-miI6I3OXZftMeoq_IOFF9&si=QgELSxY2B9KtlQNJ">
            {"Inferno de Dante narrado (prosa)"}
          </Link>
        </li>

        <li>
          <Link href="https://youtube.com/playlist?list=PLhLOnH9KU7x-CfaEWVYRcSj0YAhmuyTtS&si=PifPyFc8m1S-oqDq">
            {"Purgatório de Dante narrado (prosa)"}
          </Link>
        </li>

        <li>
          <Link href="https://youtube.com/playlist?list=PLhLOnH9KU7x9TSVvE47M5eQNjbxYqscSy&si=SeDfaMbVsg-3UKB3">
            {"Paraíso de Dante narrado (prosa)"}
          </Link>
        </li>
      </ul>

      <h2>Adaptações prosa (texto)</h2>
      <ul>
        <li>
          <Link href="/divina_comedia/inferno">{"Inferno"}</Link>
        </li>
        
        <li>
          <Link href="/divina_comedia/purgatorio">{"Purgatório"}</Link>
        </li>
        
        <li>
          <Link href="/divina_comedia/paraiso">{"Paraíso"}</Link>
        </li>
      </ul>
    </div>
  );
}
