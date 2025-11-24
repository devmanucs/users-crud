"use client";

import React from "react";
import { api } from "@/lib/api";
import Image from "next/image";
import type { UserEntry } from "@/types";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Trash2, Pencil } from "lucide-react"; // Ícones para ficar profissional

interface UserListProps {
  users: UserEntry[];
  onEdit: (u: UserEntry) => void;
  onDeleted: (id: number) => void;
}

export function UserList({ users, onEdit, onDeleted }: UserListProps) {
  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;
    
    try {
      await api.delete(`/users/${id}`);
      onDeleted(id);
    } catch (error) {
      console.error("Erro ao deletar", error);
      alert("Erro ao deletar usuário");
    }
  };

  if (users.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Nenhum usuário cadastrado ainda.
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {users.map((u) => (
        <Card key={u.id} className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors">
          {/* Avatar */}
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border bg-muted">
            <Image
              src={`https://github.com/${u.githubUsername}.png`}
              alt={u.githubUsername}
              fill
              className="object-cover"
              onError={(e) => {
                // Fallback simples se a imagem falhar (opcional)
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* Informações */}
          <div className="flex-1 min-w-0">
            <p className="font-medium leading-none truncate">{u.name}</p>
            <p className="text-sm text-muted-foreground truncate">@{u.githubUsername}</p>
          </div>

          {/* Ações */}
          <div className="flex items-center gap-2">
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => onEdit(u)}
              title="Editar"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            
            <Button 
              size="icon" 
              variant="ghost" 
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => handleDelete(u.id)}
              title="Excluir"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}