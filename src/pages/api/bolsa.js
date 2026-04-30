const defaultSymbols = [
  "ABEV3", "ALPA4", "ALOS3", "AMER3", "ANIM3", "ARZZ3", "ASAI3", "AZUL4", "B3SA3", "BBAS3",
  "BBDC3", "BBDC4", "BBSE3", "BEEF3", "BPAC11", "BRAP4", "BRFS3", "BRKM5", "CASH3", "CCRO3",
  "CEAB3", "CMIG3", "CMIG4", "CMIN3", "COGN3", "CPFE3", "CPLE3", "CPLE6", "CRFB3", "CSAN3",
  "CSNA3", "CURY3", "CYRE3", "DXCO3", "ECOR3", "EGIE3", "ELET3", "ELET6", "EMBR3", "ENEV3",
  "ENGI11", "EQTL3", "EZTC3", "FLRY3", "GGBR4", "GOAU4", "HAPV3", "HYPE3", "IGTI11", "IRBR3",
  "ITSA4", "ITUB3", "ITUB4", "JBSS3", "KLBN11", "LREN3", "LWSA3", "MDIA3", "MGLU3", "MRFG3",
  "MRVE3", "MULT3", "NTCO3", "PCAR3", "PETR3", "PETR4", "PETZ3", "POSI3", "PRIO3", "QUAL3",
  "RADL3", "RAIL3", "RDOR3", "RECV3", "RENT3", "SANB11", "SBSP3", "SLCE3", "SMTO3", "SUZB3",
  "TAEE11", "TIMS3", "TOTS3", "UGPA3", "USIM5", "VALE3", "VAMO3", "VBBR3", "VIVA3", "VIVT3",
  "WEGE3", "YDUQ3", "AURE3", "TRPL4", "NEOE3", "SAPR11", "CSMG3", "AESB3", "ODPV3", "PSSA3",
  "CXSE3", "DIRR3", "EVEN3", "GFSA3", "JHSF3", "MILS3", "POMO4", "RAPT4", "TEND3", "MOVI3",
  "HBSA3", "LOGG3", "SIMH3", "MYPK3", "TUPY3", "LEVE3", "ALOS3", "BRAV3", "VIVT3", "STBP3"
];

const sectorBySymbol = {
  PETR4: "Petróleo", PETR3: "Petróleo", PRIO3: "Petróleo", RECV3: "Petróleo", CSAN3: "Petróleo", VBBR3: "Petróleo", UGPA3: "Petróleo", BRAV3: "Petróleo",
  VALE3: "Mineração", CMIN3: "Mineração", BRAP4: "Mineração",
  ITUB4: "Bancos", ITUB3: "Bancos", BBDC4: "Bancos", BBDC3: "Bancos", BBAS3: "Bancos", SANB11: "Bancos", BPAC11: "Bancos", ITSA4: "Bancos",
  BBSE3: "Seguros", PSSA3: "Seguros", CXSE3: "Seguros", IRBR3: "Seguros",
  ELET3: "Energia", ELET6: "Energia", CMIG3: "Energia", CMIG4: "Energia", CPLE3: "Energia", CPLE6: "Energia", TAEE11: "Energia", EGIE3: "Energia", CPFE3: "Energia", ENEV3: "Energia", ENGI11: "Energia", EQTL3: "Energia", AURE3: "Energia", TRPL4: "Energia", NEOE3: "Energia", AESB3: "Energia",
  SBSP3: "Saneamento", SAPR11: "Saneamento", CSMG3: "Saneamento",
  WEGE3: "Industrial", EMBR3: "Industrial", POSI3: "Tecnologia", TOTS3: "Tecnologia", LWSA3: "Tecnologia", CASH3: "Tecnologia",
  ABEV3: "Consumo", JBSS3: "Alimentos", BRFS3: "Alimentos", MRFG3: "Alimentos", BEEF3: "Alimentos", MDIA3: "Alimentos", SMTO3: "Alimentos", SLCE3: "Agronegócio",
  MGLU3: "Varejo", LREN3: "Varejo", ARZZ3: "Varejo", ALPA4: "Varejo", CEAB3: "Varejo", VIVA3: "Varejo", AMER3: "Varejo", PETZ3: "Varejo", PCAR3: "Varejo", ASAI3: "Varejo alimentar", CRFB3: "Varejo alimentar",
  CYRE3: "Construção", MRVE3: "Construção", EZTC3: "Construção", CURY3: "Construção", DIRR3: "Construção", EVEN3: "Construção", GFSA3: "Construção", TEND3: "Construção", JHSF3: "Construção",
  HAPV3: "Saúde", RADL3: "Saúde", RDOR3: "Saúde", FLRY3: "Saúde", HYPE3: "Farmacêutico", ODPV3: "Saúde", QUAL3: "Saúde",
  VIVT3: "Telecom", TIMS3: "Telecom",
  CSNA3: "Siderurgia", GGBR4: "Siderurgia", GOAU4: "Siderurgia", USIM5: "Siderurgia", BRKM5: "Química", SUZB3: "Papel e celulose", KLBN11: "Papel e celulose", DXCO3: "Materiais",
  RAIL3: "Logística", CCRO3: "Infraestrutura", ECOR3: "Infraestrutura", RENT3: "Locação", MOVI3: "Locação", VAMO3: "Locação", AZUL4: "Aéreas", GOLL4: "Aéreas", STBP3: "Logística", HBSA3: "Logística", LOGG3: "Logística",
  B3SA3: "Serviços financeiros", MULT3: "Shopping centers", ALOS3: "Shopping centers", IGTI11: "Shopping centers",
  YDUQ3: "Educação", COGN3: "Educação", ANIM3: "Educação",
  POMO4: "Industrial", RAPT4: "Industrial", MILS3: "Industrial", MYPK3: "Autopeças", TUPY3: "Autopeças", LEVE3: "Autopeças", NTCO3: "Consumo", SIMH3: "Serviços"
};

function limparSymbol(symbol = "") {
  return String(symbol).replace(".SA", "").toUpperCase();
}

function yahooSymbol(symbol = "") {
  const clean = limparSymbol(symbol);
  return clean.endsWith(".SA") ? clean : `${clean}.SA`;
}

function normalizarYahoo(chartResult) {
  const meta = chartResult?.meta || {};
  const quote = chartResult?.indicators?.quote?.[0] || {};
  const timestamps = chartResult?.timestamp || [];
  const cleanSymbol = limparSymbol(meta.symbol || "");
  const closes = quote.close || [];
  const opens = quote.open || [];
  const highs = quote.high || [];
  const lows = quote.low || [];
  const volumes = quote.volume || [];
  const lastClose = [...closes].reverse().find((value) => typeof value === "number" && Number.isFinite(value));
  const price = typeof meta.regularMarketPrice === "number" ? meta.regularMarketPrice : lastClose;
  const previousClose = typeof meta.chartPreviousClose === "number" ? meta.chartPreviousClose : undefined;
  const change = typeof price === "number" && typeof previousClose === "number" ? price - previousClose : undefined;
  const changePercent = typeof change === "number" && previousClose ? (change / previousClose) * 100 : undefined;

  return {
    symbol: cleanSymbol,
    shortName: cleanSymbol,
    longName: meta.longName || meta.shortName || cleanSymbol,
    regularMarketPrice: price || 0,
    regularMarketChange: change,
    regularMarketChangePercent: changePercent,
    regularMarketDayHigh: meta.regularMarketDayHigh || [...highs].reverse().find((value) => typeof value === "number"),
    regularMarketDayLow: meta.regularMarketDayLow || [...lows].reverse().find((value) => typeof value === "number"),
    regularMarketVolume: meta.regularMarketVolume || [...volumes].reverse().find((value) => typeof value === "number"),
    marketCap: meta.marketCap,
    currency: meta.currency || "BRL",
    sector: sectorBySymbol[cleanSymbol] || "Outros",
    updatedAt: meta.regularMarketTime ? new Date(meta.regularMarketTime * 1000).toISOString() : new Date().toISOString(),
    dataSource: "Yahoo Finance",
    historicalDataPrice: timestamps.map((timestamp, index) => ({
      date: Number(timestamp),
      open: opens[index] ?? null,
      high: highs[index] ?? null,
      low: lows[index] ?? null,
      close: closes[index] ?? null,
      volume: volumes[index] ?? null,
    })).filter((item) => typeof item.close === "number" && Number.isFinite(item.close)),
  };
}

async function buscarYahoo(symbol, range, interval) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooSymbol(symbol))}?range=${encodeURIComponent(range)}&interval=${encodeURIComponent(interval)}&includePrePost=false&events=div%2Csplits`;
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept": "application/json",
      "Cache-Control": "no-cache",
    },
  });

  if (!response.ok) {
    throw new Error(`Yahoo Finance API error: ${response.status}`);
  }

  const data = await response.json();
  const result = data?.chart?.result?.[0];
  if (!result) throw new Error("Yahoo Finance sem resultado");
  return normalizarYahoo(result);
}

export default async function handler(req, res) {
  const { symbol, range = "1d", interval = "5m" } = req.query;
  const symbols = String(symbol || defaultSymbols.join(","))
    .split(",")
    .map((item) => limparSymbol(item.trim()))
    .filter(Boolean);

  res.setHeader("Cache-Control", "no-store, max-age=0, must-revalidate");

  try {
    const limite = symbol ? symbols.length : Math.min(symbols.length, 80);
    const lista = symbols.slice(0, limite);
    const results = await Promise.allSettled(lista.map((item) => buscarYahoo(item, String(range), String(interval))));
    const ativos = results
      .filter((item) => item.status === "fulfilled")
      .map((item) => item.value)
      .filter((item) => Number(item.regularMarketPrice) > 0);

    if (!ativos.length) {
      return res.status(502).json({ error: "Não foi possível buscar cotações atualizadas da bolsa." });
    }

    res.status(200).json(ativos);
  } catch (error) {
    console.error("Erro na rota /api/bolsa:", error);
    res.status(500).json({ error: "Erro ao buscar dados atualizados da bolsa" });
  }
}
