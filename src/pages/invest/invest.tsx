import {  useEffect, useState } from "react"
import "../../../reset.css"
import "./invest.css"
import "../../componentes/navbar/navbar.css"
import "./Styles/button.css"
import "../../GlobalCss/button.css"
import "../../componentes/navbar/navbar.css"
import Link from "next/link"
import { DarkModeProvider } from "@/Contexte/Context"
import ModeDark from "../Darkmode/ModeDark"
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { DraftMode } from "next/dist/client/components/draft-mode"

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
  const [aside, setAside] = useState(false)
  const [salario, setSalario] = useState<number>(0)

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("categorias")
    if(dadosSalvos) {
      setCategorias(JSON.parse(dadosSalvos))
    }

    const salarioSalvo = localStorage.getItem("salario")
    if(salarioSalvo) {
      setSalario(Number(salarioSalvo))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("categorias",JSON.stringify(categorias))
  }, [categorias])

  useEffect(() =>{
    localStorage.setItem("salario",String(salario))
  }, [salario])

  const limpar = () =>{
    localStorage.clear();
    console.log("hello")

  }

  const LimpaDado = (id:number) => {
    const novaLista = categorias.filter((algo,indiceAtual)=> indiceAtual !== id
        );
    setCategorias(novaLista)
    localStorage.setItem("categorias",JSON.stringify(novaLista))

   console.log("hello") 
 }

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

const total = categorias.map(c => c.valor).reduce((a, b) => a + b, 0)

const SomaTotal = salario - total

  return (
    <>
      <nav className="nav-invest">
        <ul>
          <li><Link href={""} onClick={() => setOpenModal(true)}>Redimentos</Link></li>
          <li><Link href={"./dashboard/Dashboard"}>Dashboard</Link></li>
          <li><Link href={"../savings/savings"}>Savings</Link></li>
          <li><Link href={"/Home/home"}>Sair</Link></li>
        </ul>
    </nav>

      {openModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Cadastro de Categoria</h2>
            <input placeholder="Salario" value={salario} onChange={(e) => setSalario(Number(e.target.value))} />
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
        <button className="btn-animated" onClick={() => setAside(prev => !prev)}>
          {aside ? "Fechar" : "Abrir"}
        </button>
        {aside && (
        <aside className="aside-categorias">
          <h2 className="aside-titulo" onClick={() => setAside(prev => !prev)}>
            Categorias Cadastradas
          </h2>
          <ul className="lista-categorias">
            {categorias.map((c, index) => (
              <li key={index} className="categoria-item">
                <span className="categoria-nome">{c.nome}</span>
                <span className="categoria-valor">R$ {c.valor}</span>
                <button className="btn btn-sm" onClick={() => LimpaDado(index)}>Excluir</button>
              </li>
            ))}
          </ul>
          <div className="total-wrapper">
            <strong>Total:</strong> <span>R$ {total}</span>
          </div>
          <div className="total-wrapper">
            <strong>Salario:</strong> <span>R$ {SomaTotal}</span>
          </div>
          <div>
          </div>
        </aside>  
          )}
      <article className="article-invest">
          <section className="categories-invest">
            <h2 className="h2-invest">Gráfico em Pizza</h2>
            <div className="grafico-wrapper">
              <Pie
                  data={data}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        labels: {
                          color: "#ffffff", 
                        },
                      },
                    },
                  }}
                />
            </div>
          </section>
            <section className="current-invest">
            <h2 className="h2-invest">Gráfico em Barras</h2>
            <div className="grafico-wrapper">
              <Bar
                    data={data}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          labels: {
                            color: "#ffffff", 
                          },
                        },
                      },
                      scales: {
                        x: {
                          ticks: {
                            color: "#ffffff", 
                          },
                          grid: {
                            color: "rgba(255,255,255,0.2)", 
                          },
                        },
                        y: {
                          ticks: {
                            color: "#ffffff", 
                          },
                          grid: {
                            color: "rgba(255,255,255,0.2)", 
                          },
                        },
                      },
                    }}
                  />
            </div>
          </section>
      </article>
      </header>
    </>
  )
}

export default Invest
