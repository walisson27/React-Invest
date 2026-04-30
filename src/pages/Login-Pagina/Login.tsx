import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { criarIdUsuario, normalizarEmail, setUsuarioLogado } from "@/utils/userStorage";

interface CadastroUsuario {
  id?: string;
  email: string;
  senha: string;
}

const Logi = () => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const router = useRouter();

  const login = () => {
    const emailNormalizado = normalizarEmail(email);

    const usuariosSalvos: CadastroUsuario[] = JSON.parse(
      localStorage.getItem("cadastroUsuarios") || "[]"
    );

    const cadastradoUsuario = usuariosSalvos.find(
      (u) => normalizarEmail(u.email) === emailNormalizado && u.senha === senha
    );

    if (cadastradoUsuario) {
      setUsuarioLogado({
        ...cadastradoUsuario,
        email: emailNormalizado,
        id: cadastradoUsuario.id || criarIdUsuario(emailNormalizado),
      });
      router.push("/invest/invest");
    } else {
      alert("E-mail ou senha inválidos");
    }
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
          <h1>Entrar</h1>
          <p>Acesse sua conta para acompanhar seus investimentos.</p>
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
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") login();
            }}
          />
        </label>

        <button className="button-login auth-primary-button" onClick={login} type="button">
          Entrar
        </button>

        <p className="auth-footer-text">
          Ainda não tem conta?{" "}
          <Link className="auth-inline-link" href="../cadastro/Cadastro">
            Criar conta
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Logi;
