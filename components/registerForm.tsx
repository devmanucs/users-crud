"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "./ui/field";
import { Input } from "./ui/input";

type RegisterFormProps = {
  name: string;
  email: string;
  password: string;
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  className?: string;
  loading?: boolean;
};

export function RegisterForm({
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
  handleSubmit,
  className,
  loading,
  ...props
}: RegisterFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Crie sua conta</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {/* Campo Nome */}
              <Field>
                <FieldLabel htmlFor="name">Nome</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Field>

              {/* Campo Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </Field>

              {/* Campo Senha */}
              <Field>
                <FieldLabel htmlFor="password">Senha</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="**********"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </Field>

              {/* Ações */}
              <Field>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Criando conta..." : "Cadastrar"}
                </Button>

                <FieldDescription className="text-center mt-4">
                  Já possui uma conta? <Link href="/login" className="text-primary hover:underline">Faça login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}