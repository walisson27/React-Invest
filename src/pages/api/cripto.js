export default async function handler(req, res) {
  const {
    vs_currency = "brl",
    order = "market_cap_desc",
    per_page = 150,
    page = 1,
    sparkline = "true",
    price_change_percentage = "24h,7d,30d",
  } = req.query;

  const params = new URLSearchParams({
    vs_currency: String(vs_currency),
    order: String(order),
    per_page: String(per_page),
    page: String(page),
    sparkline: String(sparkline),
    price_change_percentage: String(price_change_percentage),
    locale: "pt",
  });

  const url = `https://api.coingecko.com/api/v3/coins/markets?${params.toString()}`;

  res.setHeader("Cache-Control", "no-store, max-age=0, must-revalidate");

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "Accept": "application/json",
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    const normalizado = Array.isArray(data)
      ? data.map((item) => ({ ...item, dataSource: "CoinGecko", fetchedAt: new Date().toISOString() }))
      : [];

    res.status(200).json(normalizado);
  } catch (error) {
    console.error("Erro na rota /api/cripto:", error);
    res.status(502).json({ error: "Erro ao buscar dados atualizados de criptos" });
  }
}
