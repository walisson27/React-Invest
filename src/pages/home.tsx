import "./home.css"
import "../../reset.css"
import Table from "./table/table"
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

const sair = () =>{
      router.push('/login/Login',)
  };

    return(
        <>
        <nav className="nav-home">
            <a href="">Home</a>
            <a href="" onClick={(e) => adicionando(e)}>Adicionar</a>
            <a href="" onClick={sair}>Sair</a>
        </nav>
        <section>
            {showDados && <Table/>}
        </section>
        
        </>
    )
}

export default Home