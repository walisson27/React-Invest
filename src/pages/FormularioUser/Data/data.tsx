import React from "react";
import { useState } from "react";
import Input from "./input"

type Venda = {
    id: string
    nome: string
    status: string
}

const Data = () => {
    const [data, setData] = useState<null | Venda[]>(null);
    const [inicio, setInicio] = useState("");
    const [final, setFinal] = useState("");


React.useEffect(() => {
    if(inicio !== "" && final !== "") 
       fetch(`https://data.origamid.dev/vendas/?inicio=${inicio}&final=${final}`)
        .then((r) => r.json())
        .then((json) => setData(json as Venda[]))
        .catch((error) => console.log(error))
}, [inicio, final]);  
    return (
        <>
            <div>
                <Input label="Inicio" setState={setInicio} value={inicio} type="date" />
                <Input label="Final" setState={setFinal} value={final} type="date" />
            </div>
            <ul>
                {data && data.map((venda) => (
                    <li key={venda.id}>
                        <h2>{venda.nome}</h2>
                        <p>{venda.status}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Data;