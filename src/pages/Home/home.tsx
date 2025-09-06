import "../Home/home.css"
import { useRouter } from "next/router"
import "../../../reset.css"
import Link from "next/link"
import { DarkModeProvider } from "@/Contexte/Context"
import "../../pages/invest/navbar/navbar.css"
import ModeDark from "../Darkmode/ModeDark"

const Home = () => {
    const router = useRouter()

const sair = (e:any) =>{
    e.preventDefault()
      router.push('../Login-Pagina/Login')
  };

const fintench = (e:any) =>{
  e.preventDefault()
   router.push("../../")
}

    return(
        
    <DarkModeProvider>
    <nav className="nav-invest">
        <ul>
          <li><Link href={"/invest/invest"}>Finanças</Link></li>
          <li><Link href={"/"}>Sair</Link></li>
        </ul>
    </nav>
        <header className="header-home">
        </header>
      <footer className="footer">
        <div className="footer-container">
        <p className="footer-text">© {new Date().getFullYear()} Todos os direitos reservados.</p>
        <div className="footer-links">
        <a href="#">Termos</a>
        <a href="#">Privacidade</a>
        </div>
        </div>
      </footer>
      </DarkModeProvider>
    )
}

export default Home