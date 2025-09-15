import type { AppProps } from "next/app"

import "../pages/GlobalCss/reset.css"
import "../pages/GlobalCss/button.css"
import "../pages/Login-Pagina/login.css"


export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
