

const Cadastro = () => {

    return(
        <div className="login-center">
        <section className="login">
            <h1>Cadastro</h1>
          <input
            className="email"
            type="text"
            placeholder="Email"
            /*value={email}
            onChange={(e) => setEmail(e.target.value)}*/
          />
          <input
            className="senha"
            type="text"
            placeholder="Senha"
            /*value={senha}
            onChange={(e) => setSenha(e.target.value)}*/
          />
          <button>Cadastro</button>
          <button>Login</button>
        </section>
      </div>
    )

}


export default Cadastro;