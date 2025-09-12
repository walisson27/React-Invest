import "../Home/home.css"
import "../../componentes/footer/footer.css"
import "../../../reset.css"
import Link from "next/link"
import { DarkModeProvider } from "@/Contexte/Context"
import "../../componentes/navbar/navbar.css"
import ModeDark from "../Darkmode/ModeDark"
import Footer from "@/componentes/footer/Footer"
import { useEffect, useState } from "react"

interface types{
  title : string,
  description: string,
  image: string,
  name: string
}

const Home = () => {
  const [dados, setDados] = useState<types[]>([])

 useEffect(() => {
  fetch("../api/bolsa")
    .then(res => res.json())
    .then(data => setDados(data)) 
    .catch(err => console.error("Erro ao buscar notícias:", err));
}, []);

    return(
    <DarkModeProvider>
    <nav className="nav-invest">
        <ul>
          <li><Link href={"/invest/invest"}>Finanças</Link></li>
          <li><Link href={"/"}>Sair</Link></li>
        </ul>
    </nav>
        <header className="header-home">
    <div>
      <h1>Últimas notícias de Tecnologia</h1>
        <ul className="ul-news">
          {dados.map((bolsa, index) => (
            <li className="li-news" key={index}>
              <div className="stock-card">
                <h2>{bolsa.shortName} ({bolsa.symbol})</h2>
                <p><strong>Preço:</strong> R$ {bolsa.regularMarketPrice}</p>
                <p><strong>Moeda:</strong> {bolsa.currency}</p>
              </div>
            </li>
          ))}
        </ul>
    </div>
        </header>
        <Footer/>
      </DarkModeProvider>
    )
}

export default Home