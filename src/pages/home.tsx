import "./Home/home.css"
import "../../reset.css"
import Fintench from "../app/Fintech/Pages/ProdutosTech"
import { useRouter } from "next/router"
import { useState } from "react"
import { DarkModeProvider } from "@/Contexte/Context"
import ModeDark from "./Darkmode/ModeDark"


const Home = () => {
    const [showDados, setShowDados] = useState(false)
    const [showLista, setShowLista] = useState(false)
    const [showProduto, setShowProduto] = useState(false)
    const [showFintench, setShowFintench] = useState(false)
    const router = useRouter()


const adicionando = (e:any) => {
    e.preventDefault()
  if(showDados == false) {
        setShowDados(true)
  }  else {
        setShowDados(false)
  }

} 

const produto = (e:any) => {
    e.preventDefault()
  if(showProduto == false) {
        setShowProduto(true)
  }  else {
        setShowProduto(false)
  }

}

const fintench = (e:any) => {
    e.preventDefault()
  if(showFintench == false) {
        setShowFintench(true)
  }  else {
        setShowFintench(false)
  }

}

const lista = (e:any) => {
    e.preventDefault()
  if(showLista == false) {
        setShowLista(true)
  }  else {
        setShowLista(false)
  }

} 

const sair = (e:any) =>{
    e.preventDefault()
      router.push('/login/Login')
  };

    return(
        
        <DarkModeProvider>
        <nav className="nav-home">
            <a href="">Home</a>
            <a href="" onClick={fintench}>Fintench</a>
            <a href="" onClick={sair}>Sair</a>
        <ModeDark/> 
        </nav>
        <section>
            {showFintench && <Fintench/>}
        </section>
      </DarkModeProvider>
    )
}

export default Home