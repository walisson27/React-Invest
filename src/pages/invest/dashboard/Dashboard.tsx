import axios from "axios";
import { useEffect, useState } from "react";
import "../navbar/Navbar.css"
import "../../../../reset.css"
import "../dashboard/dashboard.css"
import Link from "next/link";



interface Moeda {
    id: string;
    name: string;
    image: string;
    current_price: number;
}


const Dashboard = () =>{
  const [dados, setDados] = useState<Moeda[]>([])
  const [pagina, setPagina] = useState(1)
  const [buscar, setBuscar] = useState("")
  const [abriCripto, setAbrirCripto] = useState(false)

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets", {
        params:{
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 200,
            page: pagina,
        },
    })
    .then((resposta) => {
        setDados(resposta.data)
    })
    .catch((error) => {
        console.log("Erro ao buscar dados:", error)
    })
  }, [])

const filtrados = dados.filter((p) =>
    p.name.toLowerCase().includes(buscar.toLocaleLowerCase())
)

useEffect (() =>{
},[pagina])


const criptbutton = () => {

}

    return(
        <>
    <nav className="nav-invest">
        <ul>
          <li><input type="text" name="buscar" value={buscar} onChange={(e)=>setBuscar(e.target.value)}/></li>
          <li><Link href="/invest/invest">Sair</Link></li>
          <li><button onClick={() => setAbrirCripto(true)}>Cripto</button></li>
          <li><button onClick={() => setAbrirCripto(false)}>Cripto fechar</button></li>
        </ul>
    </nav>
        {abriCripto && (
        <ul className="dashboard-ul">
            {filtrados.map((item: any) => (
                <li key={item.id}>
                    <img src={item.image} alt={item.name} width={24} height={24} />
                    {item.name} - ${item.current_price}                  
                </li>
            
            ))}
        </ul>  
        )}
        <button onClick={() => setPagina((p) => Math.max(1, p - 1))}>Anterior</button>
        <button onClick={() => setPagina((p) =>  p + 1)}>Próxima</button>
        
        </>
    )
}

export default Dashboard;