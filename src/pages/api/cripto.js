export default async function handler(req, res) {
  const { vs_currency = "usd", order = "market_cap_desc", per_page = 100, page = 1 } = req.query;

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&order=${order}&per_page=${per_page}&page=${page}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    const data = await response.json();
    // CoinGecko devolve array mesmo — ok para setDados()
    res.status(200).json(data);
  } catch (error) {
    console.error("Erro na rota /api/cripto:", error);
    res.status(500).json({ error: 'Erro ao buscar dados de criptos' });
  }
}
