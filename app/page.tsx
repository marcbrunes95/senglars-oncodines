import Image from "next/image";
import SenglarLogo from "@/components/SenglarLogo";
import DashboardRecords from "@/components/DashboardRecords";
import RouteSection from "@/components/RouteSection";
import TeamSection from "@/components/TeamSection";

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

        {/* Foto de l'equip */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-700 shadow-xl shadow-black/50">
          <Image
            src="/foto-equip.jpg"
            alt="L'equip Senglars de Bardissa a l'Oncodines Trail"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* ── Ruta interactiva + Estadístiques ──────── */}
      <RouteSection />

      {/* ── Records ───────────────────────────────── */}
      <section id="records" className="bg-slate-900 px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <DashboardRecords />
        </div>
      </section>

      {/* ── Equip ─────────────────────────────────── */}
      <TeamSection />

    </main>
  );
}
