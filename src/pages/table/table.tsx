import { useState } from "react"


interface TableCadastro {
    nome: string;
    carro: string;
    data: string;
    img: string;
  }
  
  const Table = (props: TableCadastro) => {
    const [nome, setNome] = useState<string>("");
    const [carro, setCarro] = useState<string>("");
    const [data, setData] = useState<string>("");
    const [img, setImg] = useState<string>("");
    const [dadosCadastro, setDadosCadastro] = useState<TableCadastro[]>([]);
  
    const tableDados = () => {
      setDadosCadastro([...dadosCadastro, { nome, carro, data, img }]);
      setNome("");
      setCarro("");
      setData("");
      setImg("");
    };

    return(
        <>
        <section>
            <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            <input type="text" placeholder="Carro" value={carro} onChange={(e) => setCarro(e.target.value)} />
            <input type="text" placeholder="Data" value={data} onChange={(e) => setData(e.target.value)} />
            <input type="text" placeholder="Img" value={img} onChange={(e) => setImg(e.target.value)} />
            <button onClick={tableDados}>Salve</button>
        </section>
        <section>
        <ul>
          {dadosCadastro.map((dado, index) => (
            <li key={index}>
              <p><strong>Nome:</strong> {dado.nome}</p>
              <p><strong>Carro:</strong> {dado.carro}</p>
              <p><strong>Data:</strong> {dado.data}</p>
              <p><strong>Imagem:</strong> {dado.img}</p>
            </li>
          ))}
        </ul>
      </section>
      </>
    )
}



export default Table