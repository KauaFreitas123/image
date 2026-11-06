'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Template } from '@/components/Template';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export default function CadastroPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok || response.status === 201) {
        alert('Conta criada com sucesso!');
        window.location.href = '/login';
      } else {
        alert('Erro ao criar conta.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Template>
      <div className="flex min-h-[calc(100vh-160px)] w-full items-center justify-center px-4 py-8">
        <main className="relative flex w-full max-w-md flex-col items-center space-y-6 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center shadow-2xl backdrop-blur-xl md:p-10">
          <h2 className="text-2xl font-bold text-white">Criar Conta</h2>

          <form onSubmit={handleSubmit} className="w-full text-left space-y-4">
            <Input
              label="Nome Completo"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="bg-slate-950 text-white border-slate-700"
            />

            <Input
              label="E-mail"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="bg-slate-950 text-white border-slate-700"
            />

            <Input
              label="Senha"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-slate-950 text-white border-slate-700"
            />

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="w-full mt-2"
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </form>

          <p className="text-xs text-slate-400">
            Já tem uma conta?{' '}
            <Link href="/login" className="font-semibold text-cyan-400 hover:underline">
              Faça Login
            </Link>
          </p>
        </main>
      </div>
    </Template>
  );
}