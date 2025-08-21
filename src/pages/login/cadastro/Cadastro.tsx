import { useState } from "react";
import { useRouter } from "next/router";

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
      router.push('/login/Login')
      console.log(usuario)
  }

  const login = () => {
    router.push('/login/Login')
  }

    return(
        <div className="login-center">
        <section className="login">
            <h1>Cadastro</h1>
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
          <button onClick={cadastro}>Cadastro</button>
          <button onClick={login}>Login</button>
        </section>
      </div>
    )

}


export default Cadastro;