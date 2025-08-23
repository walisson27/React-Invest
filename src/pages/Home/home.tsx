import "../Home/home.css"
import Fintench from "../../app/Fintech/Pages/ProdutosTech"
import { useRouter } from "next/router"
import { useState } from "react"
import "../../../reset.css"
import { DarkModeProvider } from "@/Contexte/Context"
import ModeDark from "../Darkmode/ModeDark"


const Home = () => {
    const [showFintench, setShowFintench] = useState(false)
    const router = useRouter()


const fintench = (e:any) => {
    e.preventDefault()
  if(showFintench == false) {
        setShowFintench(true)
  }  else {
        setShowFintench(false)
  }

}

const sair = (e:any) =>{
    e.preventDefault()
      router.push('/login/Login')
  };

    return(
        
        <DarkModeProvider>
      <div className="full-page">   
        <nav className="nav-home">
          <h1 className="website">WebSite</h1>
          <ModeDark/> 
            <a href="">Home</a>
            <a href="" onClick={fintench}>Fintench</a>
            <a href="" onClick={sair}>Sair</a>
        </nav>
        <section>
            {showFintench && <Fintench/>}
        </section>
        <header className="header-home">
          <h2>Welcome</h2>
        </header>
      </div> 
      </DarkModeProvider>
    )
}

export default Home