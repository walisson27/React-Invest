import type { AppProps } from "next/app"

import "../pages/GlobalCss/reset.css"
import "../pages/GlobalCss/button.css"
import "../pages/Login-Pagina/login.css"
import "../pages/navbar/navbar.css"
import "../pages/invest/Styles/button.css"
import "../pages/invest/invest.css"
import "../pages/invest/dashboard/dashboard.css"
import "../pages/Porcentagem/porcentagem.css"
import "../componentes/footer/footer.css"

//import "../pages/invest/dados/dados.css"

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
