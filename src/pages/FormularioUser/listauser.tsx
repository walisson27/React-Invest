import { useEffect, useState } from "react";

interface FormularioUsers {
  name: string;
  email: string;
}

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState<FormularioUsers[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [nomeEditado, setNomeEditado] = useState("");
  const [emailEditado, setEmailEditado] = useState("");

  useEffect(() => {
    const dados = localStorage.getItem("usuarios");
    if (dados) {
      setUsuarios(JSON.parse(dados));
    }
  }, []);

  const salvarEdicao = () => {
    if (editIndex !== null) {
      const atualizados = [...usuarios];
      atualizados[editIndex] = { name: nomeEditado, email: emailEditado };
      setUsuarios(atualizados);
      localStorage.setItem("usuarios", JSON.stringify(atualizados));
      setEditIndex(null);
      setNomeEditado("");
      setEmailEditado("");
    }
  };

  const editar = (index: number) => {
    setEditIndex(index);
    setNomeEditado(usuarios[index].name);
    setEmailEditado(usuarios[index].email);
  };

  const apagar = (index: number) => {
    const atualizados = [...usuarios];
    atualizados.splice(index, 1);
    setUsuarios(atualizados);
    localStorage.setItem("usuarios", JSON.stringify(atualizados));
  };

  return (
    <div className="mt-4">
      <h2>Lista de Usuários</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user, index) => (
            <tr key={index}>
              <td>
                {editIndex === index ? (
                  <input
                    value={nomeEditado}
                    onChange={(e) => setNomeEditado(e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    value={emailEditado}
                    onChange={(e) => setEmailEditado(e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <button className="btn btn-success btn-sm" onClick={salvarEdicao}>
                    Salvar
                  </button>
                ) : (
                  <>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => editar(index)}>
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => apagar(index)}>
                      Excluir
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaUsuarios;

