// app/users/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { ProtectedRoute } from "@/components/protectedRoute";
import { UserForm } from "@/components/userForm";
import { UserList } from "@/components/userList";
import type { UserEntry } from "@/types";
import { useAuth } from "@/components/authProvider";

export default function UsersPage() {
  const [users, setUsers] = useState<UserEntry[]>([]);
  const [editing, setEditing] = useState<UserEntry | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    (async () => {
      const res = await api.get<UserEntry[]>("/users");
      setUsers(res.data);
    })();
  }, []);

  const handleSaved = (u: UserEntry) => {
    setUsers(prev => {
      const exists = prev.some(p => p.id === u.id);
      if (exists) return prev.map(p => (p.id === u.id ? u : p));
      return [u, ...prev];
    });
    setEditing(null);
  };

  const handleDeleted = (id:number) => setUsers(prev => prev.filter(p => p.id !== id));

  return (
    <ProtectedRoute>
      <main className="max-w-3xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl">Usuários</h1>
          <button onClick={logout} className="btn-ghost">Sair</button>
        </div>

        <UserForm onSaved={handleSaved} editing={editing} onCancel={()=>setEditing(null)} />
        <hr className="my-4" />
        <UserList users={users} onEdit={(u)=>setEditing(u)} onDeleted={handleDeleted} />
      </main>
    </ProtectedRoute>
  );
}
