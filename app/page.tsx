import { Mountain, Users } from "lucide-react";

export default function Home() {
  const eventName = "Oncodines Trail";
  const teamName = "Senglars de Bardissa";
  const subtitle = "Una etapa. Un equip. Una gesta.";

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-12 gap-12 max-w-3xl mx-auto w-full">
      {/* Logo placeholder */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center gap-1 shadow-lg shadow-black/40">
          <Mountain size={36} className="text-amber-400" strokeWidth={1.5} />
          <span className="text-slate-500 text-[10px] font-semibold tracking-widest uppercase">
            Logo Senglar
          </span>
        </div>
      </div>

      {/* Hero text */}
      <div className="flex flex-col items-center gap-4 text-center">
        {eventName && (
          <span className="inline-block px-4 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold tracking-widest uppercase">
            {eventName}
          </span>
        )}

        {teamName && (
          <h1 className="font-[family-name:var(--font-barlow)] text-4xl sm:text-6xl font-bold tracking-tight text-slate-50 leading-tight">
            {teamName}
          </h1>
        )}

        {subtitle && (
          <p className="text-slate-400 text-lg sm:text-xl max-w-md leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Team photo container */}
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold tracking-wide uppercase">
          <Users size={14} />
          <span>L&apos;Equip</span>
        </div>

        <div className="w-full aspect-video rounded-2xl bg-slate-800 border border-slate-700 shadow-xl shadow-black/50 overflow-hidden relative flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-slate-600">
            <Users size={40} strokeWidth={1} />
            <p className="text-sm tracking-wide">Foto de l&apos;equip</p>
          </div>
        </div>
      </div>
    </main>
  );
}
