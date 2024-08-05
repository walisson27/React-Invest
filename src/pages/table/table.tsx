import { useState } from "react"
import Buscar from "@/app/components/busca"; "../../app/components/Busca.tsx"
import "./table.css"

interface TableCadastro {
    nome: string;
    carro: string;
    data: string;
    img: string;
  }
  
  const Table = (/*props: TableCadastro*/) => {
    const [nome, setNome] = useState<string>("");
    const [carro, setCarro] = useState<string>("");
    const [data, setData] = useState<string>("");
    const [img, setImg] = useState<string>("");
    const [dadosCadastro, setDadosCadastro] = useState<TableCadastro[]>([]);
    const [editando, setEditando] = useState<number | null>(null)
  
    const tableDados = () => {
      if( editando !== null) {
        const updateDados = dadosCadastro.map((item, index) => (
          index === editando ? {nome,carro,data,img} : item
        ))
        setDadosCadastro(updateDados)
        setEditando(null)
      } else{
      setDadosCadastro([...dadosCadastro, { nome, carro, data, img }]);
    };
      setNome("");
      setCarro("");
      setData("");
      setImg("");
  }
    const editar = (index:number) => {

      const item = dadosCadastro[index]
      setNome(item.nome)
      setCarro(item.carro)
      setData(item.data)
      setImg(item.img)
      setEditando(index)

    }

    const apagar = (index:number) => {
      const apagando = [...dadosCadastro]
      apagando.splice(index,1)
      setDadosCadastro(apagando)

    }
    return(
        <>
        <section className="section-table">
            <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            <input type="text" placeholder="Carro" value={carro} onChange={(e) => setCarro(e.target.value)} />
            <input type="text" placeholder="Data" value={data} onChange={(e) => setData(e.target.value)} />
            <input type="text" placeholder="Img" value={img} onChange={(e) => setImg(e.target.value)} />
            <button onClick={tableDados}>{editando !== null ? "Atualizar" : "Gravar"}</button>
        </section>
        <Buscar/>
        <section className="section-lista">
        <ul>
        <tr className="names-tr">
              <td><strong>Nome:</strong> </td>
              <td><strong>Carro:</strong> </td>
              <td><strong>Data:</strong> </td>
              <td><strong>Imagem:</strong> </td>
        </tr>
          {dadosCadastro.map((dado, index) => (
            <tr key={index}>
              <td>{dado.nome}</td>
              <td> {dado.carro}</td>
              <td>{dado.data}</td>
              <td>{dado.img}</td>
              <button onClick={()=>apagar(index)}>Apagar</button> 
              <button onClick={()=>editar(index)}>Editar</button>
            </tr>
          ))}
        </ul>
      </section>
      </>
    )
}



export default Table