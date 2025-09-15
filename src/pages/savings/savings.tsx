import { useEffect, useState } from "react"
//import "../../pages/navbar/navbar.css"
//import "./savings.css"
import Link from "next/link"

interface Types{
    nome: string
    descricao: string
    valor: number
}

const Savings = () => {
    const [savings, setSavings] = useState<Types[]>([])
    
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
        </>
    )
}

export default Savings