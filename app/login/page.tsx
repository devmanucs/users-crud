"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/authProvider";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/users");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErr(error.message || "Erro no login");
    }
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl mb-4">Login</h1>
      {err && <p className="text-red-500">{err}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" className="input" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="senha" type="password" className="input" />
        <button className="btn gap-2">Entrar</button>
      </form>
    </main>
  );
}