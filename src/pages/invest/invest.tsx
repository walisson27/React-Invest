import { useState } from "react"
import "../../../reset.css"
import "./invest.css"
import Grafico from "./graficos/Graficos";

import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

interface Categoria {
  nome: string;
  valor: number;
}

const Invest = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [nome, setNome] = useState("")
  const [valor, setValor] = useState("")
  const [openModal, setOpenModal] = useState(false)

  const adicionarCategoria = () => {
    if (nome.trim() !== "" && valor !== "") {
      setCategorias([...categorias, { nome, valor: Number(valor) }]) 
      setNome("")
      setValor("")
    }
  }

  const data = {
    labels: categorias.map((c) => c.nome),
    datasets: [
      {
        data: categorias.map((c) => c.valor),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
      },
    ],
  };

  return (
    <>
      <nav className="nav-invest">
        <ul>
          <li onClick={() => setOpenModal(true)}>Rendimentos</li>
          <li>Dashboard</li>
          <li>Payments</li>
          <li>Savings</li>
          <li>Investing</li>
        </ul>
      </nav>

      {openModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Cadastro de Categoria</h2>
            <input
              placeholder="Nome da Categoria"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              placeholder="Valor"
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
            <button onClick={adicionarCategoria}>Adicionar</button>
            <button onClick={() => setOpenModal(false)}>Fechar</button>
          </div>
        </div>
      )}

      <header className="header-invest">
        <aside>
          <h2 className="h2-invest">Categorias Cadastradas</h2>
          <ul>
            {categorias.map((c, index) => (
              <li key={index}>
                <strong>{c.nome}: R$</strong> {c.valor}
              </li>
            ))}
          </ul>
        </aside>
      <article className="article-invest">
          <section className="categories-invest">
            <h2 className="h2-invest">Gráfico em Pizza</h2>
            <div className="grafico-wrapper">
               <Pie data={data} options={{ responsive: true, maintainAspectRatio: false,  }} />
            </div>
           
          </section>
            <section className="current-invest">
            <h2 className="h2-invest">Gráfico em Barras</h2>
            <div className="grafico-wrapper">
              <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </section>
      </article>
      </header>

    </>
  )
}

export default Invest
