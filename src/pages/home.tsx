import "./home.css"
import "../../reset.css"
import Users from "./FormularioUser/users"
import ListaUsuarios from "./FormularioUser/listauser"
import { useRouter } from "next/router"
import { useState } from "react"



const Home = () => {
    const [showDados, setShowDados] = useState(false)
    const [showLista, setShowLista] = useState(false)
    const router = useRouter()


const adicionando = (e) => {
    e.preventDefault()
  if(showDados == false) {
        setShowDados(true)
  }  else {
        setShowDados(false)
  }

} 


const lista = (e) => {
    e.preventDefault()
  if(showLista == false) {
        setShowLista(true)
  }  else {
        setShowLista(false)
  }

} 

const sair = (e) =>{
    e.preventDefault()
      router.push('/login/Login')
  };

    return(
        <>
        <nav className="nav-home">
            <a href="">Home</a>
            <a href="" onClick={adicionando}>Adicionar Users</a>
            <a href="" onClick={lista}>lista de users</a>
            <a href="" onClick={sair}>Sair</a>
        </nav>
        <section>
            {showDados && <Users/>}
            {showLista && <ListaUsuarios/>}
        </section>
        
        
        </>
    )
}

export default Home