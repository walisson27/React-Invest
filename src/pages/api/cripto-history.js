export default async function handler(req, res) {
  const { id, days = 7, vs_currency = "brl" } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Informe o id da cripto" });
  }

  const params = new URLSearchParams({
    vs_currency: String(vs_currency),
    days: String(days),
    interval: Number(days) <= 1 ? "" : "daily",
  });

  if (Number(days) <= 1) params.delete("interval");

  const url = `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(String(id))}/market_chart?${params.toString()}`;

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
      throw new Error(`CoinGecko history API error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json({ ...data, dataSource: "CoinGecko", fetchedAt: new Date().toISOString() });
  } catch (error) {
    console.error("Erro na rota /api/cripto-history:", error);
    res.status(502).json({ error: "Erro ao buscar histórico atualizado da cripto" });
  }
}
