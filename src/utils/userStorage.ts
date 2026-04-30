export interface UsuarioLogado {
  id?: string;
  email: string;
  senha?: string;
}

const USER_KEY = "Usuario Logado";

export const normalizarEmail = (email: string) => email.trim().toLowerCase();

export const criarIdUsuario = (email: string) =>
  normalizarEmail(email).replace(/[^a-z0-9]/gi, "_") || "usuario";

export const getUsuarioLogado = (): UsuarioLogado | null => {
  if (typeof window === "undefined") return null;

  try {
    const usuario = localStorage.getItem(USER_KEY);
    if (!usuario) return null;

    const dados = JSON.parse(usuario) as UsuarioLogado;
    if (!dados?.email) return null;

    return {
      ...dados,
      email: normalizarEmail(dados.email),
      id: dados.id || criarIdUsuario(dados.email),
    };
  } catch {
    return null;
  }
};

export const setUsuarioLogado = (usuario: UsuarioLogado) => {
  if (typeof window === "undefined") return;

  const email = normalizarEmail(usuario.email);
  localStorage.setItem(
    USER_KEY,
    JSON.stringify({
      ...usuario,
      email,
      id: usuario.id || criarIdUsuario(email),
    })
  );
};

export const getChaveUsuario = (chave: string) => {
  const usuario = getUsuarioLogado();
  const id = usuario?.id || "visitante";
  return `react-invest:${id}:${chave}`;
};

export const getItemUsuario = (chave: string) => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(getChaveUsuario(chave));
};

export const setItemUsuario = (chave: string, valor: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(getChaveUsuario(chave), valor);
};

export const removeItemUsuario = (chave: string) => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(getChaveUsuario(chave));
};
