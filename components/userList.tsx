"use client";
import React from "react";
import { api } from "@/lib/api";
import Image from "next/image";
import type { UserEntry } from "@/types";

export const UserList: React.FC<{
  users: UserEntry[];
  onEdit: (u: UserEntry) => void;
  onDeleted: (id:number) => void;
}> = ({ users, onEdit, onDeleted }) => {
  const handleDelete = async (id?: number) => {
    if (!id) return;
    await api.delete(`/users/${id}`);
    onDeleted(id);
  };

  return (
    <ul className="space-y-3">
      {users.map(u => (
        <li key={u.id} className="flex items-center gap-3 p-3 shadow rounded">
          <Image
          src={`https://github.com/${u.githubUsername}.png`} 
          alt={u.githubUsername}
          width={48}
          height={48}
          className="rounded-full" />

          <div className="flex-1">
            <div className="font-semibold">{u.name}</div>
            <div className="text-sm text-gray-500">@{u.githubUsername}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>onEdit(u)} className="btn-ghost">Editar</button>
            <button onClick={()=>handleDelete(u.id)} className="btn-danger">Excluir</button>
          </div>
        </li>
      ))}
    </ul>
  );
};