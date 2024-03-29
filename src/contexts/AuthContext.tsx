import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Swal from 'sweetalert2'

import { api } from "../services/api";

interface AuthContextProps {
  token: string | null
  setToken: (token: string) => void
  role: string | null
  setRole: (role: string) => void
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = sessionStorage.getItem("@cinemais/token")
    const storedRole = sessionStorage.getItem("@cinemais/role")

    if (storedToken) {
      setToken(storedToken)
    }
    if (storedRole) {
      setRole(storedRole)
    }
  }, [])

  async function login(email: string, password: string) {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      })

      const token = response.data.data.token
      const role = response.data.data.role

      setToken(token)
      setRole(role)

      sessionStorage.setItem('@cinemais/token', token)
      sessionStorage.setItem('@cinemais/role', role)
      
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        html: 'Login efetuado!'
      })

      return true
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro de Login',
        html: 'Não foi possível fazer o login! Verifique o usuário e a senha utilizados.'
      })
      
      return false
    }
  }

  function logout() {
    sessionStorage.removeItem('@cinemais/token')
    sessionStorage.removeItem('@cinemais/role')

    setToken(null)
    setRole(null)
  }

  return (
    <AuthContext.Provider value={{
      token,
      setToken,
      role,
      setRole,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };