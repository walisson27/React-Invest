import axios from "axios";
import { useEffect, useState } from "react";

interface Moeda {
    id: string;
    name: string;
    image: string;
    current_price: number;
}


const Dashboard = () =>{
  const [dados, setDados] = useState([])
  const [pagina, setPagina] = useState(1)

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets", {
        params:{
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
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


    return(
        <>
        <ul>
            {dados.map((item: any) => (
                <li key={item.id}>
                    <img src={item.image} alt={item.name} width={24} height={24} />
                    {item.name} - ${item.current_price}                  
                </li>
            
            ))}
        </ul>
        <button onClick={() => setPagina((p) => Math.max(1, p - 1))}>Anterior</button>
        <button onClick={() => setPagina((p) =>  p + 1)}>Próxima</button>
        </>
    )
}

export default Dashboard;