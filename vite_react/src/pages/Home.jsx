import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <h1>Página Inicial</h1>
            <Link to="fldesk">
                <p>Acessar caixa eletrônico de vendas simples</p>
            </Link>
        </div>
    )
}