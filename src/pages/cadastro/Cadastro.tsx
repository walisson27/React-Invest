import { useState } from "react";
import { useRouter } from "next/router";
import { LoginCenter, LoginBox, Title, Input, Button, LinkCadastro } from "./cadastroStyle"
//import "../../pages/Login-Pagina/login.css"

interface cadastroUsuario {
  email : string,
  senha : string,
}

const Cadastro = () => {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const router = useRouter()


  const cadastro = () =>{
    if(!email || !senha ){
      alert("cadastrar todos campos")
      return
    }
    
    // Recupera usuarios salvos
    const usuariosSalvos: cadastroUsuario[] = JSON.parse(localStorage.getItem("cadastroUsuarios") || "[]")

    // Verifica se ja existem
    const existe = usuariosSalvos.find((u) => u.email === email)
    if(existe) {
      alert("Esse email já está cadastrado")
      return
    }

    // Adiciona novo usuário
    usuariosSalvos.push({email, senha})
    localStorage.setItem("cadastroUsuarios", JSON.stringify(usuariosSalvos))

    alert("Usuário cadstrado com sucesso")
    router.push('../Login-Pagina/Login')
  }

  const login = () => {
    router.push('../Login-Pagina/Login')
  }

    return(
    <LoginCenter>
      <LoginBox>
        <Title>Cadastro</Title>
        <Input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
        <Button onClick={cadastro} >Cadastrar</Button>
        <Button onClick={login} >Login</Button>
      </LoginBox>
    </LoginCenter>      
    )

}

export default Cadastro;

