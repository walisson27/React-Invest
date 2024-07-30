import "./home.css"
import "../../reset.css"
import Table from "./table/table"
import { useState } from "react"


const Home = () => {
    const [showDados, setShowDados] = useState(false)



const adicionando = (e) => {
    e.preventDefault()
  if(showDados == false) {
        setShowDados(true)
  }  else {
        setShowDados(false)
  }

} 


    return(
        <>
        <nav className="nav-home">
            <a href="">Home</a>
            <a href="" onClick={(e) => adicionando(e)}>Adicionar</a>
        </nav>
        <section>
            {showDados && <Table/>}
        </section>
        
        </>
    )
}

export default Home