"use client"; // Adicione esta linha no topo do arquivo
import { useState } from "react";
import Link from "next/link";
import "../Style-Login/login.css"
import "../../../reset.css"
import { useRouter } from "next/router";

interface cadastroUsuario {
  email: string;
  senha: string;
}


const Logi = () => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const router = useRouter()

  const login = () => {
    const usuariosSalvos: cadastroUsuario[] = JSON.parse(localStorage.getItem("cadastroUsuarios") || "[]")

    const cadastradoUsuario = usuariosSalvos.find(
      (u) => u.email === email && u.senha === senha 
    )

    if(cadastradoUsuario) {
      localStorage.setItem("Usuario Logado", JSON.stringify(cadastradoUsuario))
      alert("Login Realizado com Sucesso")
      router.push("../Home/home")
    }else{
      alert("Email ou Senha Inválidos")
    }
  };


  return (
    <>
    <div className="login-center">
      <section className="login">
        <h1 className="titulo-login">Welcome</h1>
        <input
          className="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="senha"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button onClick={login}>Login</button>
        <Link className="link-cadatro" href="../cadastro/Cadastro">
          Não tem conta? Cadastra-se
        </Link>
      </section>
    </div>
    </>
  );
};

export default Logi;
