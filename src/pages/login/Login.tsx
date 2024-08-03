"use client"; // Adicione esta linha no topo do arquivo
import { useState } from "react";
import Link from "next/link";
import "./login.css"
import "../../../reset.css";
import { useRouter } from "next/router";

interface UserLogin {
  email: string;
  senha: string;
}

const Logi = (props:any) => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [usuarios, setUsuarios] = useState<UserLogin[]>([]);
  const router = useRouter()

  const login = () => {
    setUsuarios([...usuarios, { email, senha }]);
    setEmail("");
    setSenha("");
    autentificacao()
  };

  const autentificacao = () =>{
    if (email === "walisson27" && senha === "souza") {
      router.push('/home',); // Passando o email como estado
    } else {
      alert("Login inválido");
    }
  };

  return (
    <div className="login-center">
      <section className="login">
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
        <Link href="../cadastro/Cadastro">
          Não tem conta? Cadastra-se
        </Link>
      </section>
    </div>
  );
};

export default Logi;
