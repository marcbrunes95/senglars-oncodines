import dynamic from "next/dynamic";
import { Users } from "lucide-react";
import SenglarLogo from "@/components/SenglarLogo";
import DashboardRecords from "@/components/DashboardRecords";

const InteractiveMap = dynamic(() => import("@/components/InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[50vh] rounded-2xl bg-slate-800 animate-pulse border border-slate-700" />
  ),
});

export default function Home() {
  const eventName = "Oncodines Trail";
  const teamName = "Senglars de Bardissa";
  const subtitle = "Una etapa. Un equip. Una gesta.";

  return (
    <main className="flex-1 flex flex-col w-full">

      {/* ── Hero ──────────────────────────────────── */}
      <section className="bg-slate-900 flex flex-col items-center px-4 py-14 gap-8 max-w-3xl mx-auto w-full">
        <SenglarLogo className="w-24 h-24" />

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

        {/* Team photo placeholder */}
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold tracking-wide uppercase">
            <Users size={14} />
            <span>L&apos;Equip</span>
          </div>
          <div className="w-full aspect-video rounded-2xl bg-slate-800 border border-slate-700 shadow-xl shadow-black/50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-slate-600">
              <Users size={40} strokeWidth={1} />
              <p className="text-sm tracking-wide">Foto de l&apos;equip</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mapa ──────────────────────────────────── */}
      <section className="bg-slate-800/50 border-y border-slate-800 px-4 py-12">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          <h2 className="font-[family-name:var(--font-barlow)] text-2xl font-bold tracking-tight text-slate-50">
            La Ruta
          </h2>
          <InteractiveMap />
        </div>
      </section>

      {/* ── Dashboard ─────────────────────────────── */}
      <section className="bg-slate-900 px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <DashboardRecords />
        </div>
      </section>

    </main>
  );
}
