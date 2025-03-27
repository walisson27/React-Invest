import "./home.css"
import "../../reset.css"
import Table from "./table/table"
import Users from "./FormularioUser/users"
import { useRouter } from "next/router"
import { useState } from "react"


const Home = () => {
    const [showDados, setShowDados] = useState(false)
    const router = useRouter()


const adicionando = (e) => {
    e.preventDefault()
  if(showDados == false) {
        setShowDados(true)
  }  else {
        setShowDados(false)
  }

} 

const sair = (e) =>{
    e.preventDefault()
      router.push('/login/Login')
  };

const filmes = (e) => {
    e.preventDefault()
    router.push('/filmes/filmes')
}  
    return(
        <>
        <nav className="nav-home">
            <a href="">Home</a>
            <a href="" onClick={adicionando}>Adicionar Users</a>
            <a href="" onClick={sair}>Sair</a>
        </nav>
        <section>
            {showDados && <Users/>}
        </section>
        
        </>
    )
}

export default Home