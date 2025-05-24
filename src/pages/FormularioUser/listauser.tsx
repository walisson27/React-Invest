import { useEffect, useState } from "react";

interface EnderecoProps {
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string;
  pontoReferencia: string;
}

interface FormularioUsers {
  name: string;
  email: string;
  telefone: number;
  endereco?: EnderecoProps;
  dataCadastro: DateInputProps;
}

type DateInputProps = {
  onDateChange: (date: string) => void;
  label?: string;
  value?: string;
};

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState<FormularioUsers[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [nomeEditado, setNomeEditado] = useState("");
  const [emailEditado, setEmailEditado] = useState("");
  const [buscar, setBuscar] = useState<string>("");

  useEffect(() => {
    const dados = localStorage.getItem("usuarios");
    if (dados) {
      const usuariosConvertidos = JSON.parse(dados);

      // Corrigir estrutura caso os dados estejam no formato { usuario, endereco }
      const normalizados = usuariosConvertidos.map((item: any) => {
        if (item.usuario) {
          return {
            ...item.usuario,
            endereco: item.endereco || undefined,
          };
        }
        return item;
      });

      setUsuarios(normalizados);
    }
  }, []);

  const salvarEdicao = () => {
    if (editIndex !== null) {
      const atualizados = [...usuarios];
      atualizados[editIndex] = {
        ...atualizados[editIndex],
        name: nomeEditado,
        email: emailEditado,
      };
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

  const usersFiltrados = usuarios.filter((user) =>
    (user.name?.toLowerCase() || "").includes(buscar.toLowerCase()) ||
    (user.email?.toLowerCase() || "").includes(buscar.toLowerCase())
  );

  return (
    
    <div className="mt-4">
      <input
        type="text"
        value={buscar}
        onChange={(e) => setBuscar(e.target.value)}
        className="form-control mb-3"
        placeholder="Buscar por nome ou email"
      />
      <h2>Lista de Usuários</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usersFiltrados.map((user, index) => (
            <tr key={index}>
              <td>
                {editIndex === index ? (
                  <input
                    value={nomeEditado}
                    onChange={(e) => setNomeEditado(e.target.value)}
                    className="form-control"
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
                    className="form-control"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>{user.telefone}</td>
              <td>
                {user.endereco ? (
                  `${user.endereco.rua}, Nº ${user.endereco.numero} - ${user.endereco.bairro}, ${user.endereco.cidade} - ${user.endereco.estado}`
                ) : (
                  "Endereço não informado"
                )}
              </td>
              <td>
                {user.dataCadastro ? (
                  `${user.dataCadastro}`
                ) : (
                  <span className="text-muted">Sem endereço</span>
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={salvarEdicao}
                  >
                    Salvar
                  </button>
                ) : (
                  <>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => editar(index)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => apagar(index)}
                    >
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
