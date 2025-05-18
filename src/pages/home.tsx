import "./home.css"
import "../../reset.css"
import Users from "./FormularioUser/users"
import Produtor from "../pages/produto/ProductPage"
import ListaUsuarios from "./FormularioUser/listauser"
import { useRouter } from "next/router"
import { useState } from "react"


const Home = () => {
    const [showDados, setShowDados] = useState(false)
    const [showLista, setShowLista] = useState(false)
    const [showProduto, setShowProduto] = useState(false)
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
        <>
        <nav className="nav-home">
            <a href="">Home</a>
            <a href="" onClick={adicionando}>Cadastro</a>
            <a href="" onClick={lista}>Lista de Usuarios</a>
            <a href="" onClick={produto}>Produto</a>
            <a href="" onClick={sair}>Sair</a>
        </nav>
        <section>
            {showDados && <Users/>}
            {showLista && <ListaUsuarios/>}
            {showProduto && <Produtor/>}
        </section>


        </>
    )
}

export default Home