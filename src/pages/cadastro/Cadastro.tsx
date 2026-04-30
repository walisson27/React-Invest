import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { criarIdUsuario, normalizarEmail } from "@/utils/userStorage";

interface CadastroUsuario {
  id?: string;
  email: string;
  senha: string;
}

const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const cadastro = () => {
    if (!email || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    const emailNormalizado = normalizarEmail(email);

    const usuariosSalvos: CadastroUsuario[] = JSON.parse(
      localStorage.getItem("cadastroUsuarios") || "[]"
    );

    const existe = usuariosSalvos.find((u) => normalizarEmail(u.email) === emailNormalizado);
    if (existe) {
      alert("Esse e-mail já está cadastrado");
      return;
    }

    usuariosSalvos.push({ id: criarIdUsuario(emailNormalizado), email: emailNormalizado, senha });
    localStorage.setItem("cadastroUsuarios", JSON.stringify(usuariosSalvos));

    alert("Usuário cadastrado com sucesso");
    router.push("../Login-Pagina/Login");
  };

  return (
    <main className="auth-page auth-page-clean">
      <div className="auth-background-grid" />
      <div className="auth-light auth-light-one" />
      <div className="auth-light auth-light-two" />

      <section className="auth-card clean-card">
        <div className="auth-brand">
          <div className="auth-logo">RI</div>
          <span>React Invest</span>
        </div>

        <div className="auth-header-clean">
          <h1>Criar conta</h1>
          <p>Cadastre seus dados para começar a organizar sua carteira.</p>
        </div>

        <label className="auth-field">
          E-mail
          <input
            className="email"
            type="email"
            placeholder="seuemail@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="auth-field">
          Senha
          <input
            className="senha"
            type="password"
            placeholder="Crie uma senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") cadastro();
            }}
          />
        </label>

        <button className="button-login auth-primary-button" onClick={cadastro} type="button">
          Criar conta
        </button>

        <p className="auth-footer-text">
          Já tem uma conta?{" "}
          <Link className="auth-inline-link" href="../Login-Pagina/Login">
            Entrar
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Cadastro;
