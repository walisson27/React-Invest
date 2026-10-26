import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getItemUsuario, removeItemUsuario, setItemUsuario } from "@/utils/userStorage";
import Footer from "@/componentes/footer/Footer";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

type CategoriaTipo = "Receita" | "Despesa" | "Investimento";

interface Categoria {
  id: string;
  nome: string;
  valor: number;
  tipo: CategoriaTipo;
  data: string;
}

const storageKey = "react-invest-categorias-v2";
const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const chartColors = [
  "rgba(99, 102, 241, 0.9)",
  "rgba(14, 165, 233, 0.9)",
  "rgba(34, 197, 94, 0.9)",
  "rgba(245, 158, 11, 0.9)",
  "rgba(236, 72, 153, 0.9)",
  "rgba(168, 85, 247, 0.9)",
  "rgba(20, 184, 166, 0.9)",
];

const Invest = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState<CategoriaTipo>("Despesa");
  const [data, setData] = useState(() => new Date().toISOString().slice(0, 10));
  const [salario, setSalario] = useState(0);
  const [metaInvestimento, setMetaInvestimento] = useState(20);
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<"Todos" | CategoriaTipo>("Todos");
  const [dadosCarregados, setDadosCarregados] = useState(false);

  useEffect(() => {
    const dadosSalvos = getItemUsuario(storageKey);
    if (dadosSalvos) setCategorias(JSON.parse(dadosSalvos));

    const salarioSalvo = getItemUsuario("react-invest-salario");
    if (salarioSalvo) setSalario(Number(salarioSalvo));

    const metaSalva = getItemUsuario("react-invest-meta");
    if (metaSalva) setMetaInvestimento(Number(metaSalva));
    setDadosCarregados(true);
  }, []);

  useEffect(() => {
    if (dadosCarregados) setItemUsuario(storageKey, JSON.stringify(categorias));
  }, [categorias, dadosCarregados]);

  useEffect(() => {
    if (dadosCarregados) setItemUsuario("react-invest-salario", String(salario));
  }, [salario, dadosCarregados]);

  useEffect(() => {
    if (dadosCarregados) setItemUsuario("react-invest-meta", String(metaInvestimento));
  }, [metaInvestimento, dadosCarregados]);

  const totais = useMemo(() => {
    const receitaExtra = categorias
      .filter((item) => item.tipo === "Receita")
      .reduce((acc, item) => acc + item.valor, 0);
    const despesas = categorias
      .filter((item) => item.tipo === "Despesa")
      .reduce((acc, item) => acc + item.valor, 0);
    const investimentos = categorias
      .filter((item) => item.tipo === "Investimento")
      .reduce((acc, item) => acc + item.valor, 0);
    const receitaTotal = salario + receitaExtra;
    const saldo = receitaTotal - despesas - investimentos;
    const porcentagemInvestida = receitaTotal > 0 ? (investimentos / receitaTotal) * 100 : 0;

    return { receitaExtra, receitaTotal, despesas, investimentos, saldo, porcentagemInvestida };
  }, [categorias, salario]);

  const listaFiltrada = useMemo(() => {
    return categorias.filter((item) => {
      const bateBusca = item.nome.toLowerCase().includes(busca.toLowerCase());
      const bateTipo = filtroTipo === "Todos" || item.tipo === filtroTipo;
      return bateBusca && bateTipo;
    });
  }, [categorias, busca, filtroTipo]);

  const adicionarCategoria = () => {
    const valorNumerico = Number(valor);
    if (!nome.trim() || !valorNumerico || valorNumerico <= 0) return;

    setCategorias((atual) => [
      ...atual,
      {
        id: crypto.randomUUID(),
        nome: nome.trim(),
        valor: valorNumerico,
        tipo,
        data,
      },
    ]);
    setNome("");
    setValor("");
    setTipo("Despesa");
    setData(new Date().toISOString().slice(0, 10));
  };

  const excluirItem = (id: string) => {
    setCategorias((atual) => atual.filter((item) => item.id !== id));
  };

  const limparTudo = () => {
    setCategorias([]);
    setSalario(0);
    setMetaInvestimento(20);
    removeItemUsuario(storageKey);
    removeItemUsuario("react-invest-salario");
    removeItemUsuario("react-invest-meta");
  };

  const chartBaseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#cbd5e1" } },
    },
    scales: {
      x: { ticks: { color: "#94a3b8" }, grid: { color: "rgba(148, 163, 184, 0.12)" } },
      y: { ticks: { color: "#94a3b8" }, grid: { color: "rgba(148, 163, 184, 0.12)" } },
    },
  };

  const resumoData = {
    labels: ["Receitas", "Despesas", "Investimentos", "Saldo"],
    datasets: [
      {
        label: "Resumo financeiro",
        data: [totais.receitaTotal, totais.despesas, totais.investimentos, Math.max(totais.saldo, 0)],
        backgroundColor: chartColors,
        borderRadius: 14,
      },
    ],
  };

  const categoriasData = {
    labels: categorias.map((c) => c.nome),
    datasets: [
      {
        label: "Distribuição",
        data: categorias.map((c) => c.valor),
        backgroundColor: categorias.map((_, index) => chartColors[index % chartColors.length]),
        borderColor: "rgba(15, 23, 42, 0.8)",
        borderWidth: 4,
      },
    ],
  };

  const evolucaoData = {
    labels: categorias.map((item) => item.data.split("-").reverse().join("/")),
    datasets: [
      {
        label: "Movimentações",
        data: categorias.map((item) => item.valor),
        borderColor: "rgba(14, 165, 233, 0.95)",
        backgroundColor: "rgba(14, 165, 233, 0.18)",
        fill: true,
        tension: 0.35,
      },
    ],
  };

  return (
    <main className="invest-app-shell">
      <nav className="invest-navbar">
        <Link href="/invest/invest" className="brand-invest">React<span>Invest</span></Link>
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>☰</button>
        <ul className={isOpen ? "active" : ""}>
          <li><button onClick={() => setOpenModal(true)}>Nova movimentação</button></li>
          <li><Link href="/Porcentagem/Porcentagem">Porcentagem</Link></li>
          <li><Link href="/invest/dashboard/Dashboard">Mercado</Link></li>
          <li><Link href="/Login-Pagina/Login">Sair</Link></li>
        </ul>
      </nav>

      <section className="hero-invest-pro">
        <div>
          <span className="eyebrow-invest">Dashboard financeiro</span>
          <h1>Controle seus gastos, investimentos e saldo.</h1>
          <p>Cadastre receitas, despesas e aportes para acompanhar evolução, distribuição por categoria e meta de investimento.</p>
        </div>
        <button className="primary-action" onClick={() => setOpenModal(true)}>+ Adicionar lançamento</button>
      </section>

      <section className="summary-grid">
        <div className="summary-card"><span>Receita total</span><strong>{currency.format(totais.receitaTotal)}</strong><small>Salário + receitas extras</small></div>
        <div className="summary-card danger"><span>Despesas</span><strong>{currency.format(totais.despesas)}</strong><small>Gastos cadastrados</small></div>
        <div className="summary-card success"><span>Investido</span><strong>{currency.format(totais.investimentos)}</strong><small>{totais.porcentagemInvestida.toFixed(1)}% da renda</small></div>
        <div className={`summary-card ${totais.saldo < 0 ? "danger" : "success"}`}><span>Saldo disponível</span><strong>{currency.format(totais.saldo)}</strong><small>Após gastos e aportes</small></div>
      </section>

      <section className="goal-card">
        <div>
          <h2>Meta de investimento</h2>
          <p>Meta: {metaInvestimento}% da renda • Atual: {totais.porcentagemInvestida.toFixed(1)}%</p>
        </div>
        <input type="range" min="1" max="80" value={metaInvestimento} onChange={(e) => setMetaInvestimento(Number(e.target.value))} />
        <div className="progress-track"><span style={{ width: `${Math.min((totais.porcentagemInvestida / metaInvestimento) * 100, 100)}%` }} /></div>
      </section>

      <section className="charts-grid">
        <article className="chart-card big"><div className="section-title"><h2>Resumo geral</h2><span>Barras</span></div><div className="chart-wrapper"><Bar data={resumoData} options={chartBaseOptions} /></div></article>
        <article className="chart-card"><div className="section-title"><h2>Distribuição</h2><span>Pizza</span></div><div className="chart-wrapper"><Doughnut data={categoriasData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: "#cbd5e1" } } } }} /></div></article>
        <article className="chart-card full"><div className="section-title"><h2>Evolução por lançamento</h2><span>Linha</span></div><div className="chart-wrapper"><Line data={evolucaoData} options={chartBaseOptions} /></div></article>
      </section>

      <section className="transactions-panel">
        <div className="section-title"><h2>Movimentações</h2><button className="ghost-action" onClick={limparTudo}>Limpar tudo</button></div>
        <div className="filters-row">
          <input placeholder="Buscar categoria..." value={busca} onChange={(e) => setBusca(e.target.value)} />
          <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value as "Todos" | CategoriaTipo)}>
            <option>Todos</option><option>Receita</option><option>Despesa</option><option>Investimento</option>
          </select>
        </div>
        <div className="transaction-list">
          {listaFiltrada.length === 0 && <p className="empty-state">Nenhuma movimentação cadastrada ainda.</p>}
          {listaFiltrada.map((item) => (
            <div className="transaction-item" key={item.id}>
              <div><strong>{item.nome}</strong><span>{item.tipo} • {item.data.split("-").reverse().join("/")}</span></div>
              <b>{currency.format(item.valor)}</b>
              <button onClick={() => excluirItem(item.id)}>Excluir</button>
            </div>
          ))}
        </div>
      </section>

      {openModal && (
        <div className="modal-overlay" onClick={() => setOpenModal(false)}>
          <div className="modal-content pro-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Novo lançamento</h2>
            <label>Salário mensal<input type="number" value={salario || ""} onChange={(e) => setSalario(Number(e.target.value))} placeholder="Ex: 3500" /></label>
            <label>Tipo<select value={tipo} onChange={(e) => setTipo(e.target.value as CategoriaTipo)}><option>Receita</option><option>Despesa</option><option>Investimento</option></select></label>
            <label>Nome<input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Aluguel, Nubank, Aporte" /></label>
            <label>Valor<input type="number" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="Ex: 250" /></label>
            <label>Data<input type="date" value={data} onChange={(e) => setData(e.target.value)} /></label>
            <div className="modal-actions"><button onClick={adicionarCategoria}>Salvar</button><button onClick={() => setOpenModal(false)}>Fechar</button></div>
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
};

export default Invest;
