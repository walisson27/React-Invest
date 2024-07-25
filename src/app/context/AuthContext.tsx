// context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string) => {
    // Aqui você pode adicionar a lógica para autenticar o usuário
    // Exemplo simples: definir qualquer nome de usuário como autenticado
    setUser(username);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
