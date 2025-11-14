"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Account } from "@/types";

type AuthContextType = {
  user: Account | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; name: string;}) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadUser = () => {
    const stored = localStorage.getItem("authUser");

    if (stored) {
      setUser(JSON.parse(stored));
    }

    setLoading(false);
  };

  loadUser();
}, []);

  const login = async (email: string, password: string) => {
    // json-server: filtra por email e senha
    const res = await api.get<Account[]>("/accounts", { params: { email, password } });
    if (res.data.length === 0) throw new Error("Credenciais inválidas");
    const account = res.data[0];
    localStorage.setItem("authUser", JSON.stringify(account));
    setUser(account);
  };

  const register = async (data: { email: string; password: string; name: string;}) => {
    // checa se existe o email
    const exists = await api.get("/accounts", { params: { email: data.email }});
    if (exists.data.length) throw new Error("Email já cadastrado");
    const res = await api.post<Account>("/accounts", data);
    localStorage.setItem("authUser", JSON.stringify(res.data));
    setUser(res.data);
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
};