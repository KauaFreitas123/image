interface TemplateProps {
  children: React.ReactNode;
}

export const Template: React.FC<TemplateProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">

      <Header />

      <div className="flex-1">
        {children}
      </div>

      <Footer />

    </div>
  );
}

const Header: React.FC = () => {
  return (
    <header className="bg-slate-950 text-white py-4 border-b border-cyan-400/20 shadow-lg shadow-cyan-500/5">
      <div className="container mx-auto px-4 flex justify-between items-center">

        <h1 className="text-2xl font-extrabold tracking-tight">
          Image<span className="text-cyan-400">Lite</span>
        </h1>

      </div>
    </header>
  );
}

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white py-4 border-t border-cyan-400/20 shadow-[0_-5px_20px_rgba(6,182,212,0.05)]">
      <div className="container mx-auto px-4 flex justify-between items-center">

        <h1 className="text-sm text-slate-500">
          Developed by{" "}
          <span className="text-slate-300 font-medium">
            Kauã Cavalcante
          </span>
        </h1>

      </div>
    </footer>
  );
}
