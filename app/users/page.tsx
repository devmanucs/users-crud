"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { ProtectedRoute } from "@/components/protectedRoute";
import { UserForm } from "@/components/userForm";
import { UserList } from "@/components/userList";
import type { UserEntry } from "@/types";
import { useAuth } from "@/components/authProvider";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { ModeToggle } from "@/components/modeToggle";

export default function UsersPage() {
  const [users, setUsers] = useState<UserEntry[]>([]);
  const [editing, setEditing] = useState<UserEntry | null>(null);
  const { logout, user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<UserEntry[]>("/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Erro ao carregar usuários", error);
      }
    })();
  }, []);

  const handleSaved = (u: UserEntry) => {
    setUsers((prev) => {
      const exists = prev.some((p) => p.id === u.id);
      if (exists) return prev.map((p) => (p.id === u.id ? u : p));
      return [u, ...prev];
    });
    setEditing(null);
  };

  const handleDeleted = (id: number) => {
    setUsers((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background pb-10 transition-colors duration-300">
        {/* Cabeçalho */}
        <header className="border-b mb-8 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-3xl mx-auto p-4 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Olá, {user?.name}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <ModeToggle />

              <Button size="icon" onClick={logout} title="Sair">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-3xl mx-auto p-4 space-y-8">
          {/* Área de Cadastro/Edição */}
          <section>
            <h2 className="text-lg font-semibold mb-4">
              {editing ? "Editando Usuário" : "Novo Usuário"}
            </h2>
            <UserForm
              onSaved={handleSaved}
              editing={editing}
              onCancel={() => setEditing(null)}
            />
          </section>

          {/* Lista */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Usuários Cadastrados</h2>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                Total: {users.length}
              </span>
            </div>
            <UserList
              users={users}
              onEdit={(u) => {
                setEditing(u);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onDeleted={handleDeleted}
            />
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}