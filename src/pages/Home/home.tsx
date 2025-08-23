import "../Home/home.css"
import { useRouter } from "next/router"
import "../../../reset.css"
import Link from "next/link"
import { DarkModeProvider } from "@/Contexte/Context"
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
      <div className="full-page">   
        <nav className="nav-home">
          <h1 className="website">WebSite</h1>
          <ModeDark/> 
            <Link href="/Home/home">Home</Link>
            <Link href="/">Sair</Link>
        </nav>
        <header className="header-home">
        </header>
      </div> 
      </DarkModeProvider>
    )
}

export default Home