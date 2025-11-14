"use client";
import React, { useState} from "react";
import { api } from "@/lib/api";
import type { UserEntry } from "@/types";

export const UserForm: React.FC<{
  onSaved: (user: UserEntry) => void;
  editing?: UserEntry | null;
  onCancel?: () => void;
}> = ({ onSaved, editing, onCancel }) => {

  const [form, setForm] = useState({
    name: editing?.name ?? "",
    githubUsername: editing?.githubUsername ?? "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: UserEntry = {
      name: form.name,
      githubUsername: form.githubUsername,
    };

    if (editing?.id) {
      const res = await api.put(`/users/${editing.id}`, payload);
      onSaved(res.data);
    } else {
      const res = await api.post("/users", payload);
      onSaved(res.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={form.name}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, name: e.target.value }))
        }
      />

      <input
        value={form.githubUsername}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, githubUsername: e.target.value }))
        }
      />

      <button type="submit">
        {editing ? "Salvar alterações" : "Cadastrar"}
      </button>

      {editing && onCancel && (
        <button type="button" onClick={onCancel}>Cancelar</button>
      )}
    </form>
  );
};