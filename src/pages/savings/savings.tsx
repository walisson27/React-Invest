import { useEffect, useState } from "react"
import "./savings.css"



const savings = () => {
    const [savings, setSavings] = useState([])
    const [dados, setDados] = useState([])
    


    useEffect(() =>{

    const dados = localStorage.getItem("categorias")
        if(dados) {
            setSavings(JSON.parse(dados))
        }
    }, [])

    useEffect(() => {
    localStorage.setItem("dados",JSON.stringify(savings))
  }, [savings])


    return(
        <>
        <h2>Dados Salvos</h2>
        <ul>
            {savings.map((categorias,id) =>(
                <li key={id}>
                    {categorias.nome}
                </li>
            ))}
        </ul>
        <ul>
            {dados.map((categorias,id) =>(
                <li key={id}>
                    {categorias.nome}
                </li>
            ))}
        </ul>
        </>
    )
}

export default savings