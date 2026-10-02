import Link from 'next/link';
import { Template } from '@/components';

export default function Home() {
  return (
    <Template>
      <div className="flex min-h-[calc(100vh-160px)] w-full items-center justify-center px-4 py-8">
        <main className="w-full max-w-lg rounded-3xl bg-slate-900/80 backdrop-blur-xl p-8 md:p-10 shadow-2xl border border-slate-800 flex flex-col items-center text-center space-y-8 relative overflow-hidden">

          {/* Efeito de luz interna sutil no card */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Cabeçalho */}
          <div className="space-y-2 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 uppercase">
              ImageLite
            </span>

            <h1 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
              Sua galeria de imagens
            </h1>

            <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
              Encontre, visualize e organize suas imagens de forma rápida e simples.
            </p>
          </div>

          {/* Botão de Acesso */}
          <Link
            href="/galeria"
            className="w-full py-4 px-6 text-slate-950 font-bold bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 active:scale-[0.98] rounded-2xl shadow-lg shadow-cyan-500/25 transition-all duration-200 flex items-center justify-center space-x-3 text-sm relative z-10 group"
          >
            <span>Explorar imagens</span>

            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
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

        </main>
      </div>
    </Template>
  );
}
