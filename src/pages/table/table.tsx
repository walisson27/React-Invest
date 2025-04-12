import { useState } from "react"
import Buscar from "../../app/components/Busca"
import "./table.css"

interface TableCadastro {
    nome: string;
  }
  
  const Table = (/*props: TableCadastro*/) => {
    const [nome, setNome] = useState<string>("");
    const [dadosCadastro, setDadosCadastro] = useState<TableCadastro[]>([]);
    const [editando, setEditando] = useState<number | null>(null)
  
    const [buscar, setBuscar] = useState<string>("")

    const tableDados = () => {
      if( editando !== null) {
        const updateDados = dadosCadastro.map((item, index) => (
          index === editando ? {nome} : item
        ))
        setDadosCadastro(updateDados)
        setEditando(null)
      } else{
      setDadosCadastro([...dadosCadastro, { nome }]);
    };
      setNome("");
  }
    const editar = (index:number) => {

      const item = dadosCadastro[index]
      setNome(item.nome)
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
            <button onClick={tableDados}>{editando !== null ? "Atualizar" : "Gravar"}</button>
            <Buscar buscar={buscar} setBuscar={setBuscar}/>
        </section>
        <section className="section-lista">
        <ul>
        <tr className="names-tr">
              <td><strong>Nome:</strong> </td>
        </tr>
        {dadosCadastro
          .filter((dado) => 
            dado.nome.toLowerCase().includes(buscar.toLowerCase())
          )
          .map((dado, index) => (    
            <tr key={index}>
              <td>{dado.nome}</td>
              <td>
                <button onClick={() => apagar(index)}>Apagar</button> 
                <button onClick={() => editar(index)}>Editar</button>
              </td>
            </tr>
          ))}
        </ul>
      </section>
      </>
    )
}

export default Table