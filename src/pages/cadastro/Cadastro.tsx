import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import "../../../reset.css"
import "../Style-Login/login.css"
import Logi from "../Login-Pagina/Login";
interface cadastroUsuarios {
  email : string,
  senha : string,
}

const Cadastro = () => {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [usuario, setUsuario] = useState<cadastroUsuarios[]>([])
  const router = useRouter()


  const cadastro = () =>{
    if(!email || !senha ){
      alert("cadastrar todos campos")
      return
    }
      setUsuario([...usuario, {email,senha}])
      setEmail("")
      setSenha("")
      router.push('../Login-Pagina/Login')
      console.log(usuario)
  }

  const login = () => {
    router.push('../Login-Pagina/Login')
  }

    return(
        <div className="login-center">
        <section className="login">
            <h1 className="">Cadastro</h1>
          <input
            className="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="senha"
            type="text"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <Link className="button-cadastro" href="../Login-Pagina/Login">
          Não tem conta? Cadastra-se
        </Link>
          <button className="button-cadastro"  onClick={cadastro}>Cadastro</button>
          <button onClick={login}>Login</button>
        </section>
      </div>
    )

}


export default Cadastro;