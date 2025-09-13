import { useEffect, useState } from "react"
import "../../componentes/navbar/navbar.css"
import "./savings.css"
import Link from "next/link"

interface types{
    nome: string
    descricao: string
    valor: number
}

const savings = () => {
    const [savings, setSavings] = useState<types[]>([])
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
        <nav className="nav-invest">
            <ul>
            <li><Link href={"/invest/invest"}>Sair</Link></li>
            </ul>
        </nav>
        <h2>Dados Salvos</h2>
        <div className="accordion-savings">
        {savings.map((categorias, id) => (
            <details className="accordion-item" key={id}>
            <summary className="accordion-title">
                {categorias.nome}
            </summary>
            <div className="accordion-content">
                <p>{categorias.nome}</p>
                <p>Descrição: {categorias.descricao}</p>
                <p>Valor: {categorias.valor}</p>
            </div>
            </details>
        ))}
        </div>
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