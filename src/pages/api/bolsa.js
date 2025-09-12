export default async function handler(req, res) {
  const url = `https://brapi.dev/api/quote/PETR4,VALE3,ITUB4?range=1d&interval=1d&fundamental=true`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Brapi API error: ${response.status}`);
    }

    const data = await response.json();

    res.status(200).json(data.results || []);
  } catch (error) {
    console.error("Erro na rota /api/bolsa:", error);
    res.status(500).json({ error: "Erro ao buscar dados da Brapi" });
  }
}
