import Link from 'next/link';
import { Template } from '@/components';

export default function Home() {
  return (
    <Template>
      <div className="flex min-h-[calc(100vh-160px)] w-full items-center justify-center px-4 py-8">
        <main className="relative flex w-full max-w-lg flex-col items-center space-y-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center shadow-2xl backdrop-blur-xl md:p-10">

          {/* Efeito de luz interna sutil no card */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-cyan-500/15 blur-3xl" />

          {/* Cabeçalho */}
          <div className="relative z-10 space-y-2">
            <span className="inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              ImageLite
            </span>

            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Sua galeria de imagens
            </h1>

            <p className="mx-auto max-w-sm text-sm leading-relaxed text-slate-400">
              Encontre, visualize e organize suas imagens de forma rápida e simples.
            </p>
          </div>

          {/* Opções de Acesso */}
          <div className="relative z-10 flex w-full flex-col gap-3">
            {/* Botão Entrar / Login */}
            <Link
              href="/login"
              className="group relative z-10 flex w-full items-center justify-center space-x-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-4 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:from-cyan-300 hover:to-blue-400 active:scale-[0.98]"
            >
              <span>Entrar na minha conta</span>
              <svg
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>

            {/* Botão Criar Conta / Cadastro */}
            <Link
              href="/cadastro"
              className="flex w-full items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/50 px-6 py-3.5 text-sm font-bold text-slate-300 transition-all duration-200 hover:border-cyan-500/50 hover:bg-slate-800 hover:text-white active:scale-[0.98]"
            >
              <span>Criar nova conta</span>
            </Link>
          </div>

        </main>
      </div>
    </Template>
  );
}