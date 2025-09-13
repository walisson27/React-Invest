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
        <div className="savings-container">
        {savings.map((usuario, id) => (
            <div className="savings-card" key={id}>
            <h3 className="savings-nome">{usuario.nome}</h3>
            <p><strong>Descrição:</strong> {usuario.descricao}</p>
            <p><strong>Valor:</strong> R$ {usuario.valor}</p>
            </div>
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