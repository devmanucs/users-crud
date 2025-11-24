"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import type { UserEntry } from "@/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface UserFormProps {
  onSaved: (user: UserEntry) => void;
  editing?: UserEntry | null;
  onCancel?: () => void;
}

export function UserForm({ onSaved, editing, onCancel }: UserFormProps) {
  const [name, setName] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setGithubUsername(editing.githubUsername);
    } else {
      setName("");
      setGithubUsername("");
    }
  }, [editing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !githubUsername.trim()) {
      setError("Preencha todos os campos!");
      return;
    }

    setIsLoading(true);

    const payload = { name, githubUsername };

    try {
      let res;
      if (editing?.id) {
        res = await api.put(`/users/${editing.id}`, payload);
      } else {
        res = await api.post("/users", payload);
      }
      onSaved(res.data);
      
      if (!editing) {
        setName("");
        setGithubUsername("");
      }
    } catch (err) {
      console.error("Erro ao salvar:", err);
      setError("Erro ao salvar usuário.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-muted/50 border p-4 rounded-xl space-y-4"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-2">
          <Label htmlFor="name" className="sr-only">Nome</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do usuário"
            disabled={isLoading}
            className="bg-background"
          />
        </div>
        
        <div className="flex-1 space-y-2">
          <Label htmlFor="username" className="sr-only">Github Username</Label>
          <Input
            id="username"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            placeholder="@github_username"
            disabled={isLoading}
            className="bg-background"
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive font-medium">{error}</p>
      )}

      <div className="flex gap-2 justify-center">
        {editing && onCancel && (
          <Button 
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
        )}
        
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Salvando..." : editing ? "Salvar Alterações" : "Cadastrar Usuário"}
        </Button>
      </div>
    </form>
  );
}