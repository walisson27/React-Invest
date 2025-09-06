import axios from "axios";
import { useEffect, useState } from "react";
import "../../../componentes/navbar/navbar.css"
import "../../../../reset.css"
import "../dashboard/dashboard.css"
import Link from "next/link";
interface Moeda {
    id: string;
    name: string;
    image: string;
    current_price: number;
    usd: number;
}

const Dashboard = () =>{
  const [dados, setDados] = useState<Moeda[]>([])
  const [pagina, setPagina] = useState(1)
  const [buscar, setBuscar] = useState("")
  const [abriCripto, setAbrirCripto] = useState(false)
  const [modalCripto, setModalCripto] = useState(false)
  const [selectItem, setSelectItem] = useState<Moeda | null >(null)


useEffect(() => {
  axios.get("/api/cripto", {
    params: {
      vs_currency: "brl",
      order: "market_cap_desc",
      per_page: 200,
      page: pagina,
    },
  })
  .then((resposta) => setDados(resposta.data))
  .catch((error) => console.log("Erro ao buscar dados:", error));
}, [pagina]);

const filtrados = dados.filter((p) =>
    p.name.toLowerCase().includes(buscar.toLocaleLowerCase())
)

/*useEffect (() =>{
    if(abriCripto){
        document.body.classList.add("cripto")
    }else{
        document.body.classList.remove("cripto")
    }
},[abriCripto])*/


const buttonItem = (item: Moeda) => {
  setSelectItem(item);
  setModalCripto(true);
};

console.log(modalCripto)
    return(
        <>
    <nav className="nav-invest">
        <ul>
          <li><input type="text" placeholder="Buscar" name="buscar" value={buscar} onChange={(e)=>setBuscar(e.target.value)}/></li>
          <li><Link href="" onClick={() => setAbrirCripto(prev => !prev)}>{abriCripto ? "Cripto" : "Cripto"}</Link></li>
          <li><Link href="/invest/invest">Sair</Link></li>
        </ul>
    </nav>
        {abriCripto && (
        <div className={`dashboard-container ${abriCripto ? "cripto" : ""}`}>
        <ul className="dashboard-ul">
            {filtrados.map((item) => (
            <li key={item.id} onClick={() => buttonItem(item)}>
                <img src={item.image} alt={item.name} width={24} height={24} />
                {item.name} - R${item.current_price}
                
            </li>
            ))}
        </ul>
        {modalCripto && selectItem && (
         <div className="modal-overlay" onClick={() => setModalCripto(false)}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // evita fechar clicando dentro
      >
        <h2>{selectItem.name}</h2>
        <img src={selectItem.image} alt={selectItem.name} width={92} height={94} />
        <p>
            Data: <strong>{selectItem.last_updated}</strong>
        </p>
        <p>
          💰 Preço atual: <strong>${selectItem.current_price}</strong>
        </p>
        <p>
          📊 Volume total: <strong>{selectItem.total_volume}</strong>
        </p>
        
        <button onClick={() => setModalCripto(false)} className="modal-close">
          Fechar
        </button>
      </div>
    </div>
      )}
        </div>
        )}
        {/*<button onClick={() => setPagina((p) => Math.max(1, p - 1))}>Anterior</button>
        <button onClick={() => setPagina((p) =>  p + 1)}>Próxima</button>*/}
    </>
    )
}

export default Dashboard;