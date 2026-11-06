'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Template } from '@/components/Template';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/v1/users/autenticar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        window.location.href = '/galeria';
      } else {
        alert('Credenciais inválidas!');
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
          <h2 className="text-2xl font-bold text-white">Login</h2>

          <form onSubmit={handleSubmit} className="w-full text-left space-y-4">
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
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <p className="text-xs text-slate-400">
            Ainda não tem uma conta?{' '}
            <Link href="/cadastro" className="font-semibold text-cyan-400 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </main>
      </div>
    </Template>
  );
}