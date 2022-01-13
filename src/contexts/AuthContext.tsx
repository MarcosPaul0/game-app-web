import { AxiosError } from "axios";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useNotify } from "../hooks/useNotify";
import { api } from '../services/apiClient';

interface User {
  name: string;
  email: string;
  avatar_url: string;
  is_developer: boolean;
}

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn: (credentials: Credentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthContextProvider {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProvider) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  const { errorNotify } = useNotify();

  useEffect(() => {
    const { 'zombieGames.token': token } = parseCookies();

    if(token) {
      api.get('/users/me')
        .then(response => {
          const { user } = response.data;

          setUser(user);

          Router.push('/home');
        })
        .catch(() => signOut());
    }
  }, []);

  function signOut(): void {
    setUser(null);

    destroyCookie(undefined, 'zombieGames.token');
    destroyCookie(undefined, 'zombieGames.refreshToken');

    Router.push('/');
  }

  async function signIn({ email, password }: Credentials): Promise<void> {
    try {
      const response = await api.post('/users/login', {
        email,
        password,
      });

      const { token, refreshToken, user } = response.data;
      
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      
      setUser(user);

      setCookie(undefined, 'zombieGames.token', token, {
        maxAge: 60 * 60 * 15,
        path: '/'
      });

      setCookie(undefined, 'zombieGames.refreshToken', refreshToken.id, {
        maxAge: 60 * 60 * 24 * 15,
        path: '/'
      });

      Router.push('/home');
    } catch(err: any) {
      errorNotify({ 
        message: err.response.data.message
      });
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user, setUser }}>
      { children }
    </AuthContext.Provider>
  );
}