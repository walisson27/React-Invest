import { useEffect, useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Link from "next/link";
import { getItemUsuario, removeItemUsuario, setItemUsuario } from "@/utils/userStorage";

ChartJS.register(ArcElement, Tooltip, Legend);

type ItemPorcentagem = {
  nome: string;
  valor: number;
};

const formatarMoeda = (valor: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number.isFinite(valor) ? valor : 0);

const calcularPorcentagem = (valorItem: number, total: number) => {
  if (!total || total <= 0) return 0;
  return (valorItem / total) * 100;
};

const cores = [
  "#38bdf8",
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
  "#f43f5e",
  "#14b8a6",
  "#a855f7",
  "#eab308",
];

const Porcentagem = () => {
  const [itens, setItens] = useState<ItemPorcentagem[]>([]);
  const [valor, setValor] = useState<number>(500);
  const [novoNome, setNovoNome] = useState("");
  const [entrada, setEntrada] = useState<number>(0);
  const [modo, setModo] = useState<"valor" | "porcentagem">("valor");
  const [dadosCarregados, setDadosCarregados] = useState(false);

  useEffect(() => {
    const dadosItens = getItemUsuario("itens");
    if (dadosItens) setItens(JSON.parse(dadosItens));

    const valorItem = getItemUsuario("valor");
    if (valorItem) setValor(Number(valorItem));
    setDadosCarregados(true);
  }, []);

  useEffect(() => {
    if (dadosCarregados) setItemUsuario("itens", JSON.stringify(itens));
  }, [itens, dadosCarregados]);

  useEffect(() => {
    if (dadosCarregados) setItemUsuario("valor", String(valor));
  }, [valor, dadosCarregados]);

  const somaValores = useMemo(
    () => itens.reduce((total, item) => total + item.valor, 0),
    [itens]
  );

  const restanteValor = Math.max(valor - somaValores, 0);
  const porcentagemUsada = calcularPorcentagem(somaValores, valor);
  const maiorItem = itens.length
    ? itens.reduce((maior, item) => (item.valor > maior.valor ? item : maior), itens[0])
    : null;

  const data = {
    labels: [
      ...itens.map(
        (item) => `${item.nome} - ${formatarMoeda(item.valor)} (${calcularPorcentagem(item.valor, valor).toFixed(1)}%)`
      ),
      "Restante",
    ],
    datasets: [
      {
        data: [...itens.map((item) => item.valor), restanteValor],
        backgroundColor: [...cores, "#334155"],
        borderColor: "rgba(15, 23, 42, 0.9)",
        borderWidth: 4,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "72%",
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#cbd5e1",
          usePointStyle: true,
          boxWidth: 8,
          padding: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = Number(context.raw || 0);
            return ` ${formatarMoeda(value)} (${calcularPorcentagem(value, valor).toFixed(1)}%)`;
          },
        },
      },
    },
  };

  const adicionarItem = () => {
    if (!valor || valor <= 0) {
      alert("Informe um valor total maior que zero.");
      return;
    }

    if (!novoNome.trim() || entrada <= 0) return;

    const valorFinal = modo === "porcentagem" ? (valor * entrada) / 100 : entrada;

    if (somaValores + valorFinal > valor) {
      alert("A soma dos valores não pode ultrapassar " + formatarMoeda(valor));
      return;
    }

    setItens([...itens, { nome: novoNome.trim(), valor: valorFinal }]);
    setNovoNome("");
    setEntrada(0);
  };

  const limparItem = (id: number) => {
    setItens((listaAtual) => listaAtual.filter((_, index) => index !== id));
  };

  const limparTudo = () => {
    setItens([]);
    removeItemUsuario("itens");
  };

  return (
    <main className="porcentagem-page">
      <div className="porcentagem-bg porcentagem-bg-one" />
      <div className="porcentagem-bg porcentagem-bg-two" />

      <nav className="porcentagem-nav">
        <Link href="../invest/invest" className="porcentagem-back">
          ← Voltar para investimentos
        </Link>
      </nav>

      <section className="porcentagem-hero">
        <span className="porcentagem-badge">Controle inteligente</span>
        <h1>Divisão de orçamento por porcentagem</h1>
        <p>
          Organize gastos, metas e reservas de forma visual. Cadastre valores em reais ou porcentagem e acompanhe tudo pelo gráfico.
        </p>
      </section>

      <section className="porcentagem-grid">
        <div className="porcentagem-panel porcentagem-form-card">
          <div className="porcentagem-card-header">
            <div>
              <span>Configuração</span>
              <h2>Novo planejamento</h2>
            </div>
            <button className="porcentagem-link-button" onClick={limparTudo} type="button">
              Limpar tudo
            </button>
          </div>

          <label className="porcentagem-label">
            Valor total
            <input
              type="number"
              className="input-porcentagem"
              value={valor || ""}
              onChange={(e) => setValor(Number(e.target.value))}
              placeholder="Ex: 3000"
            />
          </label>

          <div className="porcentagem-form-row">
            <label className="porcentagem-label">
              Nome da categoria
              <input
                type="text"
                className="input-porcentagem"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                placeholder="Ex: Aluguel, mercado, lazer"
              />
            </label>

            <label className="porcentagem-label">
              Entrada
              <input
                type="number"
                className="input-porcentagem"
                value={entrada || ""}
                onChange={(e) => setEntrada(Number(e.target.value))}
                placeholder={modo === "valor" ? "Valor em R$" : "Percentual %"}
              />
            </label>
          </div>

          <div className="porcentagem-mode-group" aria-label="Tipo de entrada">
            <button
              type="button"
              className={modo === "valor" ? "active" : ""}
              onClick={() => setModo("valor")}
            >
              Valor em R$
            </button>
            <button
              type="button"
              className={modo === "porcentagem" ? "active" : ""}
              onClick={() => setModo("porcentagem")}
            >
              Porcentagem %
            </button>
          </div>

          <button className="porcentagem-primary" onClick={adicionarItem} type="button">
            Adicionar categoria
          </button>
        </div>

        <div className="porcentagem-panel porcentagem-chart-card">
          <div className="porcentagem-card-header">
            <div>
              <span>Distribuição</span>
              <h2>{formatarMoeda(valor)}</h2>
            </div>
            <strong>{porcentagemUsada.toFixed(1)}% usado</strong>
          </div>

          <div className="porcentagem-progress-wrap">
            <div className="porcentagem-progress-bar">
              <span style={{ width: `${Math.min(porcentagemUsada, 100)}%` }} />
            </div>
            <small>{formatarMoeda(restanteValor)} restante</small>
          </div>

          <div className="grafico-porcentagem">
            <Doughnut data={data} options={options} />
          </div>
        </div>
      </section>

      <section className="porcentagem-stats">
        <article>
          <span>Total usado</span>
          <strong>{formatarMoeda(somaValores)}</strong>
        </article>
        <article>
          <span>Restante</span>
          <strong>{formatarMoeda(restanteValor)}</strong>
        </article>
        <article>
          <span>Categorias</span>
          <strong>{itens.length}</strong>
        </article>
        <article>
          <span>Maior gasto</span>
          <strong>{maiorItem ? maiorItem.nome : "-"}</strong>
        </article>
      </section>

      <section className="porcentagem-panel porcentagem-list-card">
        <div className="porcentagem-card-header">
          <div>
            <span>Detalhamento</span>
            <h2>Categorias cadastradas</h2>
          </div>
        </div>

        {itens.length === 0 ? (
          <div className="porcentagem-empty">
            Nenhuma categoria cadastrada ainda. Adicione uma categoria para visualizar o detalhamento.
          </div>
        ) : (
          <div className="porcentagem-list">
            {itens.map((item, index) => {
              const percentual = calcularPorcentagem(item.valor, valor);
              return (
                <article className="porcentagem-item" key={`${item.nome}-${index}`}>
                  <div className="porcentagem-item-info">
                    <span className="porcentagem-dot" style={{ background: cores[index % cores.length] }} />
                    <div>
                      <strong>{item.nome}</strong>
                      <small>{percentual.toFixed(1)}% do total</small>
                    </div>
                  </div>

                  <div className="porcentagem-item-value">
                    <strong>{formatarMoeda(item.valor)}</strong>
                    <button type="button" onClick={() => limparItem(index)}>
                      Remover
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default Porcentagem;
