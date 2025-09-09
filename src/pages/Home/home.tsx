import "../Home/home.css"
import "../../componentes/footer/footer.css"
import "../../../reset.css"
import Link from "next/link"
import { DarkModeProvider } from "@/Contexte/Context"
import "../../componentes/navbar/navbar.css"
import ModeDark from "../Darkmode/ModeDark"
import Footer from "@/componentes/footer/Footer"
import { useEffect, useState } from "react"


const Home = () => {
  const [news, setNews] = useState([])

 useEffect(() => {
  fetch("../api/news")
    .then(res => {
      if (!res.ok) throw new Error("Falha ao carregar notícias");
      return res.json();
    })
    .then(data => setNews(data.articles || []))
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
        {news.map((dados,index) =>(
          <li className="li-news" key={index}>
            <p>{dados.title}</p>
            <img className="img-news" src={dados.image} alt={dados.name} width={400} height={200} />
            <strong>{dados.description}</strong> 
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