import axios from "axios";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler, Tooltip, Legend);

type AbaMercado = "cripto" | "bolsa";
type PeriodoGrafico = "1D" | "7D" | "30D" | "90D" | "1A";
type FiltroSetor = "Todos" | string;

interface Cripto {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h?: number;
  market_cap?: number;
  total_volume: number;
  last_updated: string;
  symbol: string;
  high_24h?: number;
  low_24h?: number;
  circulating_supply?: number;
  sparkline_in_7d?: { price: number[] };
}

interface HistoricoBolsa {
  date: number;
  close: number;
  open?: number;
  high?: number;
  low?: number;
  volume?: number;
}

interface Acao {
  shortName: string;
  longName?: string;
  symbol: string;
  regularMarketPrice: number | string;
  regularMarketChange?: number;
  regularMarketChangePercent?: number;
  regularMarketDayHigh?: number;
  regularMarketDayLow?: number;
  regularMarketVolume?: number;
  marketCap?: number;
  currency?: string;
  historicalDataPrice?: HistoricoBolsa[];
  logourl?: string;
  sector?: string;
  updatedAt?: string;
  dataSource?: string;
}

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const compact = new Intl.NumberFormat("pt-BR", { notation: "compact", maximumFractionDigits: 2 });

const criptoFallback: Cripto[] = [
  { id: "bitcoin", name: "Bitcoin", symbol: "btc", image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png", current_price: 342000, price_change_percentage_24h: 1.85, market_cap: 34200000000000, total_volume: 2224000000000, high_24h: 353970.0, low_24h: 330030.0, circulating_supply: 1000000000, last_updated: new Date().toISOString() },
  { id: "ethereum", name: "Ethereum", symbol: "eth", image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png", current_price: 16850, price_change_percentage_24h: -0.62, market_cap: 1769250000000, total_volume: 110525000000, high_24h: 17439.75, low_24h: 16260.25, circulating_supply: 500000000, last_updated: new Date().toISOString() },
  { id: "tether", name: "Tether", symbol: "usdt", image: "https://assets.coingecko.com/coins/images/325/large/Tether.png", current_price: 5.18, price_change_percentage_24h: 0.08, market_cap: 569800000, total_volume: 1033670000, high_24h: 5.3613, low_24h: 4.9987, circulating_supply: 333333333, last_updated: new Date().toISOString() },
  { id: "binancecoin", name: "BNB", symbol: "bnb", image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png", current_price: 3120, price_change_percentage_24h: 0.94, market_cap: 358800000000, total_volume: 21280000000, high_24h: 3229.2, low_24h: 3010.8, circulating_supply: 250000000, last_updated: new Date().toISOString() },
  { id: "solana", name: "Solana", symbol: "sol", image: "https://assets.coingecko.com/coins/images/4128/large/solana.png", current_price: 740, price_change_percentage_24h: 3.41, market_cap: 88800000000, total_volume: 5810000000, high_24h: 765.9, low_24h: 714.1, circulating_supply: 200000000, last_updated: new Date().toISOString() },
  { id: "ripple", name: "XRP", symbol: "xrp", image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png", current_price: 2.72, price_change_percentage_24h: -1.12, market_cap: 340000000, total_volume: 1017680000, high_24h: 2.8152, low_24h: 2.6248, circulating_supply: 166666666, last_updated: new Date().toISOString() },
  { id: "usd-coin", name: "USDC", symbol: "usdc", image: "https://assets.coingecko.com/coins/images/6319/large/usdc.png", current_price: 5.17, price_change_percentage_24h: 0.03, market_cap: 672100000, total_volume: 1033605000, high_24h: 5.3509, low_24h: 4.989, circulating_supply: 142857142, last_updated: new Date().toISOString() },
  { id: "cardano", name: "Cardano", symbol: "ada", image: "https://assets.coingecko.com/coins/images/975/large/cardano.png", current_price: 2.28, price_change_percentage_24h: 2.22, market_cap: 307800000, total_volume: 1014820000, high_24h: 2.3598, low_24h: 2.2002, circulating_supply: 125000000, last_updated: new Date().toISOString() },
  { id: "dogecoin", name: "Dogecoin", symbol: "doge", image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png", current_price: 0.82, price_change_percentage_24h: 4.16, market_cap: 114800000, total_volume: 1005330000, high_24h: 0.8487, low_24h: 0.7913, circulating_supply: 111111111, last_updated: new Date().toISOString() },
  { id: "tron", name: "TRON", symbol: "trx", image: "https://assets.coingecko.com/coins/images/1094/large/tron-logo.png", current_price: 0.61, price_change_percentage_24h: 0.72, market_cap: 88450000, total_volume: 1003965000, high_24h: 0.6313, low_24h: 0.5887, circulating_supply: 100000000, last_updated: new Date().toISOString() },
  { id: "polkadot", name: "Polkadot", symbol: "dot", image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png", current_price: 34.4, price_change_percentage_24h: -0.91, market_cap: 5160000000, total_volume: 1223600000, high_24h: 35.604, low_24h: 33.196, circulating_supply: 90909090, last_updated: new Date().toISOString() },
  { id: "chainlink", name: "Chainlink", symbol: "link", image: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png", current_price: 76.8, price_change_percentage_24h: 1.49, market_cap: 11904000000, total_volume: 1499200000, high_24h: 79.488, low_24h: 74.112, circulating_supply: 83333333, last_updated: new Date().toISOString() },
  { id: "avalanche-2", name: "Avalanche", symbol: "avax", image: "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png", current_price: 179.2, price_change_percentage_24h: 2.86, market_cap: 28672000000, total_volume: 2164800000, high_24h: 185.472, low_24h: 172.928, circulating_supply: 76923076, last_updated: new Date().toISOString() },
  { id: "litecoin", name: "Litecoin", symbol: "ltc", image: "https://assets.coingecko.com/coins/images/2/large/litecoin.png", current_price: 426, price_change_percentage_24h: -0.38, market_cap: 70290000000, total_volume: 3769000000, high_24h: 440.91, low_24h: 411.09, circulating_supply: 71428571, last_updated: new Date().toISOString() },
  { id: "polygon", name: "Polygon", symbol: "matic", image: "https://assets.coingecko.com/coins/images/4713/large/polygon.png", current_price: 3.58, price_change_percentage_24h: 1.18, market_cap: 608600000, total_volume: 1023270000, high_24h: 3.7053, low_24h: 3.4547, circulating_supply: 66666666, last_updated: new Date().toISOString() },
  { id: "stellar", name: "Stellar", symbol: "xlm", image: "https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png", current_price: 0.58, price_change_percentage_24h: 0.64, market_cap: 101499999, total_volume: 1003770000, high_24h: 0.6003, low_24h: 0.5597, circulating_supply: 62500000, last_updated: new Date().toISOString() },
  { id: "uniswap", name: "Uniswap", symbol: "uni", image: "https://assets.coingecko.com/coins/images/12504/large/uniswap-logo.png", current_price: 42.7, price_change_percentage_24h: -2.04, market_cap: 7686000000, total_volume: 1277550000, high_24h: 44.1945, low_24h: 41.2055, circulating_supply: 58823529, last_updated: new Date().toISOString() },
  { id: "near", name: "NEAR Protocol", symbol: "near", image: "https://assets.coingecko.com/coins/images/10365/large/near.jpg", current_price: 29.8, price_change_percentage_24h: 2.51, market_cap: 5513000000, total_volume: 1193700000, high_24h: 30.843, low_24h: 28.757, circulating_supply: 55555555, last_updated: new Date().toISOString() },
  { id: "cosmos", name: "Cosmos Hub", symbol: "atom", image: "https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png", current_price: 46.2, price_change_percentage_24h: 0.31, market_cap: 8778000000, total_volume: 1300300000, high_24h: 47.817, low_24h: 44.583, circulating_supply: 52631578, last_updated: new Date().toISOString() },
  { id: "internet-computer", name: "Internet Computer", symbol: "icp", image: "https://assets.coingecko.com/coins/images/14495/large/Internet_Computer_logo.png", current_price: 61.4, price_change_percentage_24h: -1.76, market_cap: 11973000000, total_volume: 1399100000, high_24h: 63.549, low_24h: 59.251, circulating_supply: 50000000, last_updated: new Date().toISOString() },
  { id: "the-open-network", name: "Toncoin", symbol: "ton", image: "https://assets.coingecko.com/coins/images/17980/large/photo_2024-09-10_17.09.00.jpeg", current_price: 27.5, price_change_percentage_24h: 1.12, market_cap: 68400000000, total_volume: 1420000000, high_24h: 28.46, low_24h: 26.54, circulating_supply: 2400000000, last_updated: new Date().toISOString() },
  { id: "shiba-inu", name: "Shiba Inu", symbol: "shib", image: "https://assets.coingecko.com/coins/images/11939/large/shiba.png", current_price: 0.000075, price_change_percentage_24h: 2.41, market_cap: 44200000000, total_volume: 1660000000, high_24h: 0.000078, low_24h: 0.000072, circulating_supply: 589000000000000, last_updated: new Date().toISOString() },
  { id: "bitcoin-cash", name: "Bitcoin Cash", symbol: "bch", image: "https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png", current_price: 2280, price_change_percentage_24h: -0.74, market_cap: 45400000000, total_volume: 1840000000, high_24h: 2336, low_24h: 2212, circulating_supply: 19800000, last_updated: new Date().toISOString() },
  { id: "aptos", name: "Aptos", symbol: "apt", image: "https://assets.coingecko.com/coins/images/26455/large/aptos_round.png", current_price: 42.9, price_change_percentage_24h: 0.92, market_cap: 26800000000, total_volume: 1180000000, high_24h: 44.0, low_24h: 41.4, circulating_supply: 625000000, last_updated: new Date().toISOString() },
  { id: "arbitrum", name: "Arbitrum", symbol: "arb", image: "https://assets.coingecko.com/coins/images/16547/large/arb.jpg", current_price: 4.86, price_change_percentage_24h: -1.38, market_cap: 22100000000, total_volume: 920000000, high_24h: 5.02, low_24h: 4.71, circulating_supply: 4550000000, last_updated: new Date().toISOString() },
  { id: "optimism", name: "Optimism", symbol: "op", image: "https://assets.coingecko.com/coins/images/25244/large/Optimism.png", current_price: 12.35, price_change_percentage_24h: 1.76, market_cap: 16100000000, total_volume: 780000000, high_24h: 12.88, low_24h: 11.94, circulating_supply: 1300000000, last_updated: new Date().toISOString() },
  { id: "render-token", name: "Render", symbol: "rndr", image: "https://assets.coingecko.com/coins/images/11636/large/rndr.png", current_price: 44.2, price_change_percentage_24h: 3.08, market_cap: 17200000000, total_volume: 690000000, high_24h: 46.1, low_24h: 42.3, circulating_supply: 389000000, last_updated: new Date().toISOString() },
  { id: "injective-protocol", name: "Injective", symbol: "inj", image: "https://assets.coingecko.com/coins/images/12882/large/Secondary_Symbol.png", current_price: 138.4, price_change_percentage_24h: -0.52, market_cap: 13400000000, total_volume: 610000000, high_24h: 142.2, low_24h: 134.7, circulating_supply: 97000000, last_updated: new Date().toISOString() },
  { id: "aave", name: "Aave", symbol: "aave", image: "https://assets.coingecko.com/coins/images/12645/large/AAVE.png", current_price: 1120, price_change_percentage_24h: 1.07, market_cap: 16800000000, total_volume: 540000000, high_24h: 1154, low_24h: 1088, circulating_supply: 15000000, last_updated: new Date().toISOString() },
  { id: "maker", name: "Maker", symbol: "mkr", image: "https://assets.coingecko.com/coins/images/1364/large/Mark_Maker.png", current_price: 14650, price_change_percentage_24h: -0.84, market_cap: 13500000000, total_volume: 420000000, high_24h: 15090, low_24h: 14280, circulating_supply: 920000, last_updated: new Date().toISOString() },
  { id: "filecoin", name: "Filecoin", symbol: "fil", image: "https://assets.coingecko.com/coins/images/12817/large/filecoin.png", current_price: 31.2, price_change_percentage_24h: 1.68, market_cap: 19200000000, total_volume: 760000000, high_24h: 32.5, low_24h: 30.1, circulating_supply: 615000000, last_updated: new Date().toISOString() },
  { id: "pepe", name: "Pepe", symbol: "pepe", image: "https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg", current_price: 0.000052, price_change_percentage_24h: 4.73, market_cap: 21900000000, total_volume: 980000000, high_24h: 0.000055, low_24h: 0.000049, circulating_supply: 420690000000000, last_updated: new Date().toISOString() },
].map((item) => ({ ...item, sparkline_in_7d: { price: montarHistoricoSintetico(item.current_price, 80) } }));

const acoesFallback: Acao[] = [
  { symbol: "PETR4", shortName: "Petrobras PN", regularMarketPrice: 38.42, regularMarketChangePercent: 1.24, regularMarketVolume: 43890000, sector: "Petróleo", regularMarketDayHigh: 39.38, regularMarketDayLow: 37.46, marketCap: 303525684000 },
  { symbol: "PETR3", shortName: "Petrobras ON", regularMarketPrice: 40.18, regularMarketChangePercent: 0.88, regularMarketVolume: 18900000, sector: "Petróleo", regularMarketDayHigh: 41.18, regularMarketDayLow: 39.18, marketCap: 136692360000 },
  { symbol: "VALE3", shortName: "Vale ON", regularMarketPrice: 61.8, regularMarketChangePercent: -0.84, regularMarketVolume: 31200000, sector: "Mineração", regularMarketDayHigh: 63.34, regularMarketDayLow: 60.25, marketCap: 347068800000 },
  { symbol: "ITUB4", shortName: "Itaú Unibanco PN", regularMarketPrice: 34.15, regularMarketChangePercent: 0.42, regularMarketVolume: 24500000, sector: "Bancos", regularMarketDayHigh: 35.0, regularMarketDayLow: 33.3, marketCap: 150601500000 },
  { symbol: "ITSA4", shortName: "Itaúsa PN", regularMarketPrice: 10.02, regularMarketChangePercent: 0.35, regularMarketVolume: 19200000, sector: "Holding", regularMarketDayHigh: 10.27, regularMarketDayLow: 9.77, marketCap: 34629120000 },
  { symbol: "BBDC4", shortName: "Bradesco PN", regularMarketPrice: 14.9, regularMarketChangePercent: -1.12, regularMarketVolume: 21100000, sector: "Bancos", regularMarketDayHigh: 15.27, regularMarketDayLow: 14.53, marketCap: 56590200000 },
  { symbol: "BBDC3", shortName: "Bradesco ON", regularMarketPrice: 12.88, regularMarketChangePercent: -0.74, regularMarketVolume: 8200000, sector: "Bancos", regularMarketDayHigh: 13.2, regularMarketDayLow: 12.56, marketCap: 19010880000 },
  { symbol: "BBAS3", shortName: "Banco do Brasil ON", regularMarketPrice: 27.52, regularMarketChangePercent: 0.78, regularMarketVolume: 15800000, sector: "Bancos", regularMarketDayHigh: 28.21, regularMarketDayLow: 26.83, marketCap: 78266880000 },
  { symbol: "SANB11", shortName: "Santander Brasil Units", regularMarketPrice: 29.4, regularMarketChangePercent: -0.28, regularMarketVolume: 3600000, sector: "Bancos", regularMarketDayHigh: 30.13, regularMarketDayLow: 28.66, marketCap: 19051200000 },
  { symbol: "ABEV3", shortName: "Ambev ON", regularMarketPrice: 12.38, regularMarketChangePercent: 0.16, regularMarketVolume: 18700000, sector: "Consumo", regularMarketDayHigh: 12.69, regularMarketDayLow: 12.07, marketCap: 41671080000 },
  { symbol: "WEGE3", shortName: "WEG ON", regularMarketPrice: 39.74, regularMarketChangePercent: 1.76, regularMarketVolume: 7100000, sector: "Industrial", regularMarketDayHigh: 40.73, regularMarketDayLow: 38.75, marketCap: 50787720000 },
  { symbol: "MGLU3", shortName: "Magazine Luiza ON", regularMarketPrice: 1.92, regularMarketChangePercent: -2.54, regularMarketVolume: 50800000, sector: "Varejo", regularMarketDayHigh: 1.97, regularMarketDayLow: 1.87, marketCap: 17556480000 },
  { symbol: "PRIO3", shortName: "PRIO ON", regularMarketPrice: 45.1, regularMarketChangePercent: 2.08, regularMarketVolume: 9000000, sector: "Petróleo", regularMarketDayHigh: 46.23, regularMarketDayLow: 43.97, marketCap: 73062000000 },
  { symbol: "B3SA3", shortName: "B3 ON", regularMarketPrice: 11.27, regularMarketChangePercent: -0.35, regularMarketVolume: 13200000, sector: "Serviços financeiros", regularMarketDayHigh: 11.55, regularMarketDayLow: 10.99, marketCap: 26777520000 },
  { symbol: "SUZB3", shortName: "Suzano ON", regularMarketPrice: 55.7, regularMarketChangePercent: 1.05, regularMarketVolume: 4800000, sector: "Papel e celulose", regularMarketDayHigh: 57.09, regularMarketDayLow: 54.31, marketCap: 48124800000 },
  { symbol: "KLBN11", shortName: "Klabin Units", regularMarketPrice: 21.36, regularMarketChangePercent: 0.52, regularMarketVolume: 6200000, sector: "Papel e celulose", regularMarketDayHigh: 21.89, regularMarketDayLow: 20.83, marketCap: 23837760000 },
  { symbol: "JBSS3", shortName: "JBS ON", regularMarketPrice: 31.2, regularMarketChangePercent: -0.44, regularMarketVolume: 6900000, sector: "Alimentos", regularMarketDayHigh: 31.98, regularMarketDayLow: 30.42, marketCap: 38750400000 },
  { symbol: "BRFS3", shortName: "BRF ON", regularMarketPrice: 18.74, regularMarketChangePercent: 1.41, regularMarketVolume: 8500000, sector: "Alimentos", regularMarketDayHigh: 19.21, regularMarketDayLow: 18.27, marketCap: 28672200000 },
  { symbol: "LREN3", shortName: "Lojas Renner ON", regularMarketPrice: 15.88, regularMarketChangePercent: -1.18, regularMarketVolume: 7700000, sector: "Varejo", regularMarketDayHigh: 16.28, regularMarketDayLow: 15.48, marketCap: 22009680000 },
  { symbol: "RENT3", shortName: "Localiza ON", regularMarketPrice: 44.35, regularMarketChangePercent: 0.66, regularMarketVolume: 6100000, sector: "Locação", regularMarketDayHigh: 45.46, regularMarketDayLow: 43.24, marketCap: 48696300000 },
  { symbol: "RAIL3", shortName: "Rumo ON", regularMarketPrice: 20.71, regularMarketChangePercent: 1.11, regularMarketVolume: 9100000, sector: "Logística", regularMarketDayHigh: 21.23, regularMarketDayLow: 20.19, marketCap: 33922980000 },
  { symbol: "ELET3", shortName: "Eletrobras ON", regularMarketPrice: 40.82, regularMarketChangePercent: 0.95, regularMarketVolume: 7600000, sector: "Energia", regularMarketDayHigh: 41.84, regularMarketDayLow: 39.8, marketCap: 55841760000 },
  { symbol: "ELET6", shortName: "Eletrobras PNB", regularMarketPrice: 44.18, regularMarketChangePercent: 0.73, regularMarketVolume: 2500000, sector: "Energia", regularMarketDayHigh: 45.28, regularMarketDayLow: 43.08, marketCap: 19881000000 },
  { symbol: "CMIG4", shortName: "Cemig PN", regularMarketPrice: 11.86, regularMarketChangePercent: -0.22, regularMarketVolume: 11900000, sector: "Energia", regularMarketDayHigh: 12.16, regularMarketDayLow: 11.56, marketCap: 25404120000 },
  { symbol: "CPLE6", shortName: "Copel PNB", regularMarketPrice: 10.91, regularMarketChangePercent: 0.58, regularMarketVolume: 8900000, sector: "Energia", regularMarketDayHigh: 11.18, regularMarketDayLow: 10.64, marketCap: 17477820000 },
  { symbol: "TAEE11", shortName: "Taesa Units", regularMarketPrice: 35.27, regularMarketChangePercent: 0.24, regularMarketVolume: 2100000, sector: "Energia", regularMarketDayHigh: 36.15, regularMarketDayLow: 34.39, marketCap: 13332060000 },
  { symbol: "EGIE3", shortName: "Engie Brasil ON", regularMarketPrice: 42.64, regularMarketChangePercent: -0.11, regularMarketVolume: 1100000, sector: "Energia", regularMarketDayHigh: 43.71, regularMarketDayLow: 41.57, marketCap: 8442720000 },
  { symbol: "CSNA3", shortName: "CSN ON", regularMarketPrice: 12.22, regularMarketChangePercent: -1.46, regularMarketVolume: 9800000, sector: "Siderurgia", regularMarketDayHigh: 12.53, regularMarketDayLow: 11.91, marketCap: 21556080000 },
  { symbol: "GGBR4", shortName: "Gerdau PN", regularMarketPrice: 19.8, regularMarketChangePercent: 0.39, regularMarketVolume: 10600000, sector: "Siderurgia", regularMarketDayHigh: 20.29, regularMarketDayLow: 19.3, marketCap: 37778400000 },
  { symbol: "USIM5", shortName: "Usiminas PNA", regularMarketPrice: 7.31, regularMarketChangePercent: -0.69, regularMarketVolume: 6300000, sector: "Siderurgia", regularMarketDayHigh: 7.49, regularMarketDayLow: 7.13, marketCap: 8289540000 },
  { symbol: "HAPV3", shortName: "Hapvida ON", regularMarketPrice: 3.88, regularMarketChangePercent: 2.64, regularMarketVolume: 42100000, sector: "Saúde", regularMarketDayHigh: 3.98, regularMarketDayLow: 3.78, marketCap: 29402640000 },
  { symbol: "RADL3", shortName: "RaiaDrogasil ON", regularMarketPrice: 25.48, regularMarketChangePercent: 0.91, regularMarketVolume: 5200000, sector: "Saúde", regularMarketDayHigh: 26.12, regularMarketDayLow: 24.84, marketCap: 23849280000 },
  { symbol: "VIVT3", shortName: "Vivo ON", regularMarketPrice: 51.18, regularMarketChangePercent: 0.34, regularMarketVolume: 2600000, sector: "Telecom", regularMarketDayHigh: 52.46, regularMarketDayLow: 49.9, marketCap: 23952240000 },
  { symbol: "TIMS3", shortName: "TIM ON", regularMarketPrice: 17.64, regularMarketChangePercent: 0.12, regularMarketVolume: 3900000, sector: "Telecom", regularMarketDayHigh: 18.08, regularMarketDayLow: 17.2, marketCap: 12383280000 },
  { symbol: "EQTL3", shortName: "Equatorial ON", regularMarketPrice: 33.1, regularMarketChangePercent: 1.02, regularMarketVolume: 7400000, sector: "Energia", regularMarketDayHigh: 33.93, regularMarketDayLow: 32.27, marketCap: 44089200000 },
  { symbol: "SBSP3", shortName: "Sabesp ON", regularMarketPrice: 83.45, regularMarketChangePercent: -0.19, regularMarketVolume: 3100000, sector: "Saneamento", regularMarketDayHigh: 85.54, regularMarketDayLow: 81.36, marketCap: 46565100000 },
  { symbol: "TOTS3", shortName: "Totvs ON", regularMarketPrice: 29.82, regularMarketChangePercent: 1.44, regularMarketVolume: 3600000, sector: "Tecnologia", regularMarketDayHigh: 30.57, regularMarketDayLow: 29.07, marketCap: 19323360000 },
  { symbol: "LWSA3", shortName: "LWSA ON", regularMarketPrice: 4.52, regularMarketChangePercent: -2.08, regularMarketVolume: 6700000, sector: "Tecnologia", regularMarketDayHigh: 4.63, regularMarketDayLow: 4.41, marketCap: 5451119999 },
  { symbol: "CYRE3", shortName: "Cyrela ON", regularMarketPrice: 22.16, regularMarketChangePercent: 0.73, regularMarketVolume: 4300000, sector: "Construção", regularMarketDayHigh: 22.71, regularMarketDayLow: 21.61, marketCap: 17151840000 },
  { symbol: "MRVE3", shortName: "MRV ON", regularMarketPrice: 7.74, regularMarketChangePercent: -1.31, regularMarketVolume: 9800000, sector: "Construção", regularMarketDayHigh: 7.93, regularMarketDayLow: 7.55, marketCap: 13653360000 },
  { symbol: "EMBR3", shortName: "Embraer ON", regularMarketPrice: 37.25, regularMarketChangePercent: 2.35, regularMarketVolume: 6100000, sector: "Aeroespacial", regularMarketDayHigh: 38.18, regularMarketDayLow: 36.32, marketCap: 40900500000 },
  { symbol: "AZUL4", shortName: "Azul PN", regularMarketPrice: 5.92, regularMarketChangePercent: -3.12, regularMarketVolume: 14200000, sector: "Aéreas", regularMarketDayHigh: 6.07, regularMarketDayLow: 5.77, marketCap: 15131520000 },
  { symbol: "GOLL4", shortName: "Gol PN", regularMarketPrice: 1.18, regularMarketChangePercent: -4.2, regularMarketVolume: 22500000, sector: "Aéreas", regularMarketDayHigh: 1.21, regularMarketDayLow: 1.15, marketCap: 4779000000 },
  { symbol: "MULT3", shortName: "Multiplan ON", regularMarketPrice: 24.54, regularMarketChangePercent: 0.57, regularMarketVolume: 2900000, sector: "Shopping centers", regularMarketDayHigh: 25.15, regularMarketDayLow: 23.93, marketCap: 12809880000 },
  { symbol: "YDUQ3", shortName: "Yduqs ON", regularMarketPrice: 12.72, regularMarketChangePercent: -0.88, regularMarketVolume: 3400000, sector: "Educação", regularMarketDayHigh: 13.04, regularMarketDayLow: 12.4, marketCap: 7784640000 },
  { symbol: "COGN3", shortName: "Cogna ON", regularMarketPrice: 2.18, regularMarketChangePercent: -1.74, regularMarketVolume: 18400000, sector: "Educação", regularMarketDayHigh: 2.23, regularMarketDayLow: 2.13, marketCap: 7220160000 },
  { symbol: "ASAI3", shortName: "Assaí ON", regularMarketPrice: 11.56, regularMarketChangePercent: 1.29, regularMarketVolume: 6200000, sector: "Varejo alimentar", regularMarketDayHigh: 11.85, regularMarketDayLow: 11.27, marketCap: 12900960000 },
  { symbol: "CRFB3", shortName: "Carrefour Brasil ON", regularMarketPrice: 9.06, regularMarketChangePercent: -0.53, regularMarketVolume: 4700000, sector: "Varejo alimentar", regularMarketDayHigh: 9.29, regularMarketDayLow: 8.83, marketCap: 7664760000 },
  { symbol: "HYPE3", shortName: "Hypera ON", regularMarketPrice: 27.8, regularMarketChangePercent: 0.68, regularMarketVolume: 4100000, sector: "Farmacêutico", regularMarketDayHigh: 28.49, regularMarketDayLow: 27.11, marketCap: 20516400000 },
  { symbol: "FLRY3", shortName: "Fleury ON", regularMarketPrice: 15.42, regularMarketChangePercent: -0.35, regularMarketVolume: 2200000, sector: "Saúde", regularMarketDayHigh: 15.81, regularMarketDayLow: 15.03, marketCap: 6106320000 },
];

function montarHistoricoSintetico(precoAtual: number, pontos = 36) {
  // Não cria oscilação fictícia. Quando a API não devolve histórico,
  // mantém uma linha neutra para não mostrar alta/queda incorreta.
  return Array.from({ length: pontos }, () => Number((precoAtual || 0).toFixed(2)));
}

function historicoAcao(acao: Acao) {
  const serie = acao.historicalDataPrice?.map((item) => Number(item.close)).filter(Boolean) || [];
  return serie.length > 3 ? serie : montarHistoricoSintetico(Number(acao.regularMarketPrice) || 0, 120);
}

const periodosGrafico: { label: PeriodoGrafico; titulo: string; descricao: string }[] = [
  { label: "1D", titulo: "Hoje", descricao: "intraday" },
  { label: "7D", titulo: "7 dias", descricao: "semana" },
  { label: "30D", titulo: "30 dias", descricao: "mês" },
  { label: "90D", titulo: "90 dias", descricao: "trimestre" },
  { label: "1A", titulo: "1 ano", descricao: "longo prazo" },
];

function diasPeriodo(periodo: PeriodoGrafico) {
  const mapa = { "1D": 1, "7D": 7, "30D": 30, "90D": 90, "1A": 365 };
  return mapa[periodo];
}

function rangeBolsa(periodo: PeriodoGrafico) {
  const mapa = { "1D": "1d", "7D": "5d", "30D": "1mo", "90D": "3mo", "1A": "1y" };
  return mapa[periodo];
}

function intervaloBolsa(periodo: PeriodoGrafico) {
  return periodo === "1D" ? "15m" : "1d";
}

function pontosPeriodo(periodo: PeriodoGrafico) {
  const mapa = { "1D": 48, "7D": 80, "30D": 90, "90D": 120, "1A": 180 };
  return mapa[periodo];
}

function labelsPeriodo(periodo: PeriodoGrafico, total: number) {
  const dias = diasPeriodo(periodo);
  return Array.from({ length: total }, (_, index) => {
    const data = new Date();
    const passo = total > 1 ? dias / (total - 1) : dias;
    data.setDate(data.getDate() - Math.round((total - 1 - index) * passo));
    return periodo === "1D" ? `${String(index).padStart(2, "0")}h` : data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
  });
}


const LoadingSpinner = ({ texto = "Carregando dados da API..." }: { texto?: string }) => (
  <div className="loading-card" role="status" aria-live="polite">
    <div className="spinner-ring" aria-hidden="true" />
    <div>
      <strong>{texto}</strong>
      <span>Buscando cotações, variações e histórico do mercado.</span>
    </div>
  </div>
);

const ChartLoadingOverlay = ({ texto = "Atualizando gráfico..." }: { texto?: string }) => (
  <div className="chart-loading-overlay" role="status" aria-live="polite">
    <div className="spinner-ring small" aria-hidden="true" />
    <span>{texto}</span>
  </div>
);

const ordemSetores = [
  "Todos", "Bancos", "Energia", "Petróleo", "Mineração", "Varejo", "Varejo alimentar", "Tecnologia",
  "Saúde", "Construção", "Alimentos", "Siderurgia", "Industrial", "Logística", "Telecom", "Seguros", "Serviços financeiros", "Outros"
];

function limparSymbol(symbol = "") {
  return symbol.replace(".SA", "").toUpperCase();
}

function enriquecerSetorAcao(acao: Acao): Acao {
  const symbol = limparSymbol(acao.symbol);
  const fallback = acoesFallback.find((item) => limparSymbol(item.symbol) === symbol);
  return {
    ...acao,
    symbol,
    sector: acao.sector || fallback?.sector || "Outros",
  };
}

const Dashboard = () => {
  const [criptos, setCriptos] = useState<Cripto[]>([]);
  const [acoes, setAcoes] = useState<Acao[]>([]);
  const [buscar, setBuscar] = useState("");
  const [filtroSetor, setFiltroSetor] = useState<FiltroSetor>("Todos");
  const [aba, setAba] = useState<AbaMercado>("cripto");
  const [criptoSelecionada, setCriptoSelecionada] = useState<Cripto | null>(null);
  const [acaoSelecionada, setAcaoSelecionada] = useState<Acao | null>(null);
  const [periodoGrafico, setPeriodoGrafico] = useState<PeriodoGrafico>("7D");
  const [historicoDetalhado, setHistoricoDetalhado] = useState<number[]>([]);
  const [loadingHistorico, setLoadingHistorico] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erroMercado, setErroMercado] = useState("");
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<Date | null>(null);

  useEffect(() => {
    let ativo = true;

    async function carregarMercado() {
      try {
        setErroMercado("");
        const [criptoResposta, bolsaResposta] = await Promise.all([
          axios.get("/api/cripto", { params: { vs_currency: "brl", order: "market_cap_desc", per_page: 150, page: 1, sparkline: true, price_change_percentage: "24h,7d,30d", t: Date.now() } }),
          axios.get("/api/bolsa", { params: { range: "1d", interval: "5m", t: Date.now() } }),
        ]);
        if (!ativo) return;

        const criptoApi = Array.isArray(criptoResposta.data) ? criptoResposta.data : [];
        const bolsaApi = Array.isArray(bolsaResposta.data) ? bolsaResposta.data : [];

        // Não usa valores fictícios como cotação. Se a API falhar, mantém o estado anterior.
        if (criptoApi.length > 0) setCriptos(criptoApi);
        if (bolsaApi.length > 0) setAcoes(bolsaApi.map(enriquecerSetorAcao));
        setUltimaAtualizacao(new Date());
      } catch (error) {
        console.log("Erro ao buscar dados de mercado:", error);
        if (ativo) setErroMercado("Não foi possível atualizar as cotações agora. Tente novamente em alguns instantes.");
      } finally {
        if (ativo) setLoading(false);
      }
    }

    carregarMercado();
    const intervalo = window.setInterval(carregarMercado, 60000);

    return () => {
      ativo = false;
      window.clearInterval(intervalo);
    };
  }, []);

  useEffect(() => {
    const ativoAbertoAtual = criptoSelecionada || acaoSelecionada;
    if (!ativoAbertoAtual) return;

    async function carregarHistoricoDetalhado() {
      setLoadingHistorico(true);
      try {
        if (criptoSelecionada) {
          const resposta = await axios.get("/api/cripto-history", {
            params: { id: criptoSelecionada.id, days: diasPeriodo(periodoGrafico), vs_currency: "brl", t: Date.now() },
          });
          const precos = Array.isArray(resposta.data?.prices)
            ? resposta.data.prices.map((item: number[]) => Number(item[1])).filter(Boolean)
            : [];
          setHistoricoDetalhado(precos.length > 2 ? precos : []);
        } else if (acaoSelecionada) {
          const resposta = await axios.get("/api/bolsa", {
            params: { symbol: acaoSelecionada.symbol, range: rangeBolsa(periodoGrafico), interval: intervaloBolsa(periodoGrafico), t: Date.now() },
          });
          const ativo = Array.isArray(resposta.data) ? resposta.data[0] : null;
          const precos = ativo?.historicalDataPrice?.map((item: HistoricoBolsa) => Number(item.close)).filter(Boolean) || [];
          setHistoricoDetalhado(precos.length > 2 ? precos : []);
        }
      } catch (error) {
        console.log("Erro ao carregar histórico detalhado:", error);
        setHistoricoDetalhado([]);
      } finally {
        setLoadingHistorico(false);
      }
    }

    carregarHistoricoDetalhado();
  }, [criptoSelecionada, acaoSelecionada, periodoGrafico]);

  const resumoSetores = useMemo(() => {
    const contagem = acoes.reduce<Record<string, number>>((acc, item) => {
      const setor = item.sector || "Outros";
      acc[setor] = (acc[setor] || 0) + 1;
      return acc;
    }, {});

    const setoresEncontrados = Object.keys(contagem);
    const setoresOrdenados = [
      ...ordemSetores.filter((setor) => setor === "Todos" || setoresEncontrados.includes(setor)),
      ...setoresEncontrados.filter((setor) => !ordemSetores.includes(setor)).sort(),
    ];

    return setoresOrdenados.map((setor) => ({
      nome: setor,
      total: setor === "Todos" ? acoes.length : contagem[setor] || 0,
    }));
  }, [acoes]);

  const setorSelecionadoInfo = resumoSetores.find((setor) => setor.nome === filtroSetor);

  const ativosFiltrados = useMemo(() => {
    const termo = buscar.toLowerCase();
    const listaCripto = criptos.filter((item) => `${item.name} ${item.symbol}`.toLowerCase().includes(termo));
    const listaBolsa = acoes.filter((item) => {
      const combinaBusca = `${item.shortName} ${item.longName || ""} ${item.symbol} ${item.sector || ""}`.toLowerCase().includes(termo);
      const combinaSetor = filtroSetor === "Todos" || (item.sector || "Outros") === filtroSetor;
      return combinaBusca && combinaSetor;
    });
    return { listaCripto, listaBolsa };
  }, [criptos, acoes, buscar, filtroSetor]);

  const dadosAtuais = aba === "cripto" ? ativosFiltrados.listaCripto : ativosFiltrados.listaBolsa;
  const topCripto = ativosFiltrados.listaCripto.slice(0, 12);
  const topAcoes = ativosFiltrados.listaBolsa.slice(0, 12);
  const melhorAltaCripto = [...criptos].sort((a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0))[0];
  const melhorAltaBolsa = [...acoes].sort((a, b) => (b.regularMarketChangePercent || 0) - (a.regularMarketChangePercent || 0))[0];
  const maiorVolumeCripto = [...criptos].sort((a, b) => (b.total_volume || 0) - (a.total_volume || 0))[0];

  const graficoPrecos = {
    labels: (aba === "cripto" ? topCripto.map((item) => item.symbol.toUpperCase()) : topAcoes.map((item) => item.symbol)),
    datasets: [
      {
        label: aba === "cripto" ? "Preço das criptos" : "Preço das ações",
        data: aba === "cripto" ? topCripto.map((item) => item.current_price) : topAcoes.map((item) => Number(item.regularMarketPrice) || 0),
        backgroundColor: "rgba(56, 189, 248, 0.75)",
        borderRadius: 14,
      },
    ],
  };

  const graficoVariacao = {
    labels: (aba === "cripto" ? topCripto.map((item) => item.symbol.toUpperCase()) : topAcoes.map((item) => item.symbol)),
    datasets: [
      {
        label: "Variação do dia (%)",
        data: aba === "cripto" ? topCripto.map((item) => item.price_change_percentage_24h || 0) : topAcoes.map((item) => item.regularMarketChangePercent || 0),
        borderColor: "rgba(34, 197, 94, 0.95)",
        backgroundColor: "rgba(34, 197, 94, 0.15)",
        fill: true,
        tension: 0.35,
      },
    ],
  };

  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: "#cbd5e1" } } },
    scales: {
      x: { ticks: { color: "#94a3b8" }, grid: { color: "rgba(148, 163, 184, 0.12)" } },
      y: { ticks: { color: "#94a3b8" }, grid: { color: "rgba(148, 163, 184, 0.12)" } },
    },
  };

  const abrirDetalhe = (ativo: Cripto | Acao) => {
    setHistoricoDetalhado([]);
    setPeriodoGrafico("7D");
    if ("current_price" in ativo) {
      setAcaoSelecionada(null);
      setCriptoSelecionada(ativo);
    } else {
      setCriptoSelecionada(null);
      setAcaoSelecionada(ativo);
    }
  };

  const ativoAberto = criptoSelecionada || acaoSelecionada;
  const precoAberto = criptoSelecionada ? criptoSelecionada.current_price : Number(acaoSelecionada?.regularMarketPrice) || 0;
  const variacaoAberta = criptoSelecionada ? criptoSelecionada.price_change_percentage_24h || 0 : acaoSelecionada?.regularMarketChangePercent || 0;

  const historicoBase = criptoSelecionada
    ? criptoSelecionada.sparkline_in_7d?.price || montarHistoricoSintetico(criptoSelecionada.current_price, pontosPeriodo(periodoGrafico))
    : acaoSelecionada
      ? historicoAcao(acaoSelecionada)
      : [];

  const historicoSelecionado = historicoDetalhado.length > 2
    ? historicoDetalhado
    : historicoBase.length > pontosPeriodo(periodoGrafico)
      ? historicoBase.slice(-pontosPeriodo(periodoGrafico))
      : montarHistoricoSintetico(precoAberto || Number(historicoBase[historicoBase.length - 1]) || 0, pontosPeriodo(periodoGrafico));

  const precoInicial = historicoSelecionado[0] || 0;
  const precoFinal = historicoSelecionado[historicoSelecionado.length - 1] || 0;
  const variacaoDetalhe = precoInicial > 0 ? ((precoFinal - precoInicial) / precoInicial) * 100 : 0;

  const graficoDetalhe = {
    labels: labelsPeriodo(periodoGrafico, historicoSelecionado.length),
    datasets: [
      {
        label: `Evolução do valor • ${periodoGrafico}`,
        data: historicoSelecionado,
        borderColor: variacaoDetalhe >= 0 ? "rgba(34, 197, 94, 0.95)" : "rgba(251, 113, 133, 0.95)",
        backgroundColor: variacaoDetalhe >= 0 ? "rgba(34, 197, 94, 0.14)" : "rgba(251, 113, 133, 0.14)",
        fill: true,
        tension: 0.32,
        pointRadius: 0,
      },
    ],
  };

  return (
    <main className="market-shell">
      <nav className="invest-navbar market-nav-pro">
        <Link href="/invest/invest" className="brand-invest">React<span>Invest</span></Link>
        <ul className="active desktop-menu">
          <li><button className={aba === "cripto" ? "tab-active" : ""} onClick={() => setAba("cripto")}>Criptomoedas</button></li>
          <li><button className={aba === "bolsa" ? "tab-active" : ""} onClick={() => setAba("bolsa")}>Bolsa BR</button></li>
          <li><Link href="/invest/invest">Voltar</Link></li>
        </ul>
      </nav>

      <section className="market-hero market-hero-pro">
        <div>
          <span className="eyebrow-invest">Mercado detalhado</span>
          <h1>Bolsa e cripto com visão profissional, gráficos e detalhes por ativo.</h1>
          <p>Clique em qualquer ativo para abrir um painel com evolução do preço, variação, volume, máxima, mínima e resumo completo.</p>
        </div>
        <div className="market-search-card">
          <label>Buscar ativo</label>
          <input value={buscar} onChange={(e) => setBuscar(e.target.value)} placeholder="Ex: PETR4, Bitcoin, Itaú..." />
        </div>
      </section>

      <section className="market-tabs-mobile">
        <button className={aba === "cripto" ? "tab-active" : ""} onClick={() => setAba("cripto")}>Criptos</button>
        <button className={aba === "bolsa" ? "tab-active" : ""} onClick={() => setAba("bolsa")}>Bolsa</button>
      </section>

      {aba === "bolsa" && (
        <section className="sector-filter-card sector-filter-pro">
          <div className="sector-filter-intro">
            <span className="eyebrow-invest">Filtro inteligente B3</span>
            <h2>Ações organizadas por setor</h2>
            <p>Use os chips ou o seletor para filtrar bancos, energia, petróleo, varejo, tecnologia, saúde e outros segmentos.</p>
            <div className="sector-stats-line">
              <span><strong>{acoes.length}</strong> ações carregadas</span>
              <span><strong>{resumoSetores.length - 1}</strong> setores</span>
              <span><strong>{setorSelecionadoInfo?.total || dadosAtuais.length}</strong> no filtro</span>
            </div>
          </div>

          <div className="sector-filter-tools">
            <div className="sector-select-box">
              <label>Selecionar setor</label>
              <select value={filtroSetor} onChange={(e) => setFiltroSetor(e.target.value)}>
                {resumoSetores.map((setor) => (
                  <option key={setor.nome} value={setor.nome}>{setor.nome} ({setor.total})</option>
                ))}
              </select>
            </div>

            <div className="sector-chip-list sector-chip-grid">
              {resumoSetores.map((setor) => (
                <button
                  key={setor.nome}
                  className={filtroSetor === setor.nome ? "sector-active" : ""}
                  onClick={() => setFiltroSetor(setor.nome)}
                >
                  <span>{setor.nome}</span>
                  <small>{setor.total}</small>
                </button>
              ))}
            </div>

            {filtroSetor !== "Todos" && (
              <button className="clear-sector-filter" onClick={() => setFiltroSetor("Todos")}>Limpar filtro</button>
            )}
          </div>
        </section>
      )}

      <section className="market-kpis market-kpis-pro">
        <div><span>Ativos exibidos</span><strong>{dadosAtuais.length}</strong><small>{aba === "cripto" ? "Top cripto por valor de mercado" : `Filtro: ${filtroSetor}`}</small></div>
        <div><span>Maior alta</span><strong>{aba === "cripto" ? (melhorAltaCripto ? `${melhorAltaCripto.symbol.toUpperCase()} ${(melhorAltaCripto.price_change_percentage_24h || 0).toFixed(2)}%` : "-") : (melhorAltaBolsa ? `${melhorAltaBolsa.symbol} ${(melhorAltaBolsa.regularMarketChangePercent || 0).toFixed(2)}%` : "-")}</strong><small>Variação diária</small></div>
        <div><span>Maior volume cripto</span><strong>{maiorVolumeCripto ? maiorVolumeCripto.symbol.toUpperCase() : "-"}</strong><small>{maiorVolumeCripto ? brl.format(maiorVolumeCripto.total_volume || 0) : "-"}</small></div>
      </section>

      {loading && <LoadingSpinner />}
      {!loading && erroMercado && <div className="loading-card"><strong>{erroMercado}</strong><span>As cotações dependem das APIs externas CoinGecko e Yahoo Finance.</span></div>}
      {!loading && ultimaAtualizacao && <div className="loading-card"><strong>Cotações atualizadas</strong><span>{ultimaAtualizacao.toLocaleString("pt-BR")} • atualização automática a cada 60 segundos.</span></div>}

      {!loading && (
        <>
          <section className="market-charts market-charts-pro">
            <article className="chart-card"><div className="section-title"><h2>{aba === "cripto" ? "Top criptos por preço" : "Ações por preço"}</h2><span>BRL</span></div><div className="chart-wrapper"><Bar data={graficoPrecos} options={chartOptions} /></div></article>
            <article className="chart-card"><div className="section-title"><h2>Variação do dia</h2><span>%</span></div><div className="chart-wrapper"><Line data={graficoVariacao} options={chartOptions} /></div></article>
          </section>

          <section className="market-table-card">
            <div className="section-title"><h2>{aba === "cripto" ? "Criptomoedas" : "Ações da bolsa"}</h2><span>Clique para ver detalhes</span></div>
            <div className="market-table">
              <div className="market-row market-head"><span>Ativo</span><span>Preço</span><span>Variação</span><span>Volume</span></div>
              {(aba === "cripto" ? ativosFiltrados.listaCripto : ativosFiltrados.listaBolsa).map((item) => {
                const isCripto = "current_price" in item;
                const preco = isCripto ? item.current_price : Number(item.regularMarketPrice) || 0;
                const variacao = isCripto ? item.price_change_percentage_24h || 0 : item.regularMarketChangePercent || 0;
                const volume = isCripto ? item.total_volume || 0 : item.regularMarketVolume || 0;
                return (
                  <button className="market-row" key={isCripto ? item.id : item.symbol} onClick={() => abrirDetalhe(item)}>
                    <span className="asset-name-line">
                      {isCripto ? <img src={item.image} alt={item.name} /> : <span className="stock-avatar">{item.symbol.slice(0, 2)}</span>}
                      <span><strong>{isCripto ? item.name : item.shortName}</strong><small>{isCripto ? item.symbol.toUpperCase() : `${item.symbol} • ${item.sector || "Bolsa BR"}`}</small></span>
                    </span>
                    <span>{brl.format(preco)}</span>
                    <span className={variacao >= 0 ? "positive" : "negative"}>{variacao.toFixed(2)}%</span>
                    <span>{compact.format(volume)}</span>
                  </button>
                );
              })}
            </div>
          </section>
        </>
      )}

      {ativoAberto && (
        <div className="modal-overlay" onClick={() => { setCriptoSelecionada(null); setAcaoSelecionada(null); setHistoricoDetalhado([]); }}>
          <div className="modal-content pro-modal market-modal market-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="detail-header">
              {criptoSelecionada ? <img src={criptoSelecionada.image} alt={criptoSelecionada.name} /> : <span className="stock-avatar big">{acaoSelecionada?.symbol.slice(0, 2)}</span>}
              <div>
                <span className="eyebrow-invest">Detalhes do ativo</span>
                <h2>{criptoSelecionada ? criptoSelecionada.name : acaoSelecionada?.shortName}</h2>
                <p>{criptoSelecionada ? criptoSelecionada.symbol.toUpperCase() : acaoSelecionada?.symbol}</p>
              </div>
              <button className="close-detail" onClick={() => { setCriptoSelecionada(null); setAcaoSelecionada(null); setHistoricoDetalhado([]); }}>×</button>
            </div>

            <div className="detail-price-line">
              <strong>{brl.format(precoAberto)}</strong>
              <span className={variacaoAberta >= 0 ? "positive pill" : "negative pill"}>{variacaoAberta >= 0 ? "+" : ""}{variacaoAberta.toFixed(2)}%</span>
              <small>{loadingHistorico ? "Carregando histórico..." : `Período selecionado: ${periodoGrafico}`}</small>
            </div>

            <div className="range-panel">
              <div className="range-panel-header">
                <div>
                  <span className="eyebrow-invest">Período do gráfico</span>
                  <h3>{periodosGrafico.find((periodo) => periodo.label === periodoGrafico)?.titulo}</h3>
                </div>
                <strong className={variacaoDetalhe >= 0 ? "positive" : "negative"}>{variacaoDetalhe >= 0 ? "+" : ""}{variacaoDetalhe.toFixed(2)}%</strong>
              </div>
              <div className="range-switcher modern-range" aria-label="Selecionar período do gráfico">
                {periodosGrafico.map((periodo) => (
                  <button
                    key={periodo.label}
                    className={periodoGrafico === periodo.label ? "range-active" : ""}
                    onClick={() => setPeriodoGrafico(periodo.label)}
                  >
                    <strong>{periodo.label}</strong>
                    <span>{periodo.titulo}</span>
                    <small>{periodo.descricao}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="detail-chart detail-chart-loading-wrap">
              {loadingHistorico && <ChartLoadingOverlay texto="Atualizando histórico do ativo..." />}
              <Line data={graficoDetalhe} options={chartOptions} />
            </div>

            <div className="detail-grid">
              <div><span>Preço inicial</span><strong>{brl.format(precoInicial)}</strong></div>
              <div><span>Preço final</span><strong>{brl.format(precoFinal)}</strong></div>
              <div><span>Variação gráfico</span><strong className={variacaoDetalhe >= 0 ? "positive" : "negative"}>{variacaoDetalhe.toFixed(2)}%</strong></div>
              <div><span>Máxima</span><strong>{brl.format(criptoSelecionada?.high_24h || acaoSelecionada?.regularMarketDayHigh || Math.max(...historicoSelecionado))}</strong></div>
              <div><span>Mínima</span><strong>{brl.format(criptoSelecionada?.low_24h || acaoSelecionada?.regularMarketDayLow || Math.min(...historicoSelecionado))}</strong></div>
              <div><span>Volume</span><strong>{compact.format(criptoSelecionada?.total_volume || acaoSelecionada?.regularMarketVolume || 0)}</strong></div>
              <div><span>Valor de mercado</span><strong>{compact.format(criptoSelecionada?.market_cap || acaoSelecionada?.marketCap || 0)}</strong></div>
              <div><span>Atualização</span><strong>{criptoSelecionada?.last_updated ? new Date(criptoSelecionada.last_updated).toLocaleString("pt-BR") : acaoSelecionada?.updatedAt ? new Date(acaoSelecionada.updatedAt).toLocaleString("pt-BR") : "API"}</strong></div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
