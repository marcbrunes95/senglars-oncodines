import Image from "next/image";
import SenglarLogo from "@/components/SenglarLogo";
import DashboardRecords from "@/components/DashboardRecords";
import RouteSection from "@/components/RouteSection";
import StatsTable from "@/components/StatsTable";
import TeamSection from "@/components/TeamSection";

type StatItem = {
  emoji: string;
  label: string;
  value: string;
  accent?: boolean;
};

const raceStats: StatItem[] = [
  { emoji: "🎽", label: "Dorsal",         value: "#256",            accent: true },
  { emoji: "🏅", label: "Classificació",  value: "13è / 34 equips", accent: true },
  { emoji: "📍", label: "Distància",      value: "102.42 km" },
  { emoji: "⛰️",  label: "Desnivell",     value: "+3.512 m" },
  { emoji: "⏱️",  label: "Temps en mov.", value: "13h 18' 47\"" },
  { emoji: "⚡",  label: "Velocitat",      value: "7.69 km/h" },
  { emoji: "🟢", label: "Sortida",        value: "08:01:20" },
  { emoji: "🏁", label: "Arribada",       value: "21:20:07" },
];

function StatBadge({ emoji, label, value, accent }: StatItem) {
  return (
    <div
      className={`rounded-xl px-3 py-3 sm:px-4 flex flex-col gap-1.5 border ${
        accent
          ? "bg-amber-400/10 border-amber-400/30"
          : "bg-slate-800 border-slate-700"
      }`}
    >
      <div className="flex items-center gap-1.5">
        <span className="text-sm">{emoji}</span>
        <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-500 leading-none">
          {label}
        </span>
      </div>
      <p
        className={`font-[family-name:var(--font-barlow)] text-xl font-bold tracking-tight leading-none ${
          accent ? "text-amber-400" : "text-slate-50"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex-1 flex flex-col w-full">

      {/* ── Hero ──────────────────────────────────── */}
      <section className="bg-slate-900 flex flex-col items-center px-4 py-8 md:py-14 gap-6 md:gap-8 max-w-3xl mx-auto w-full">
        <SenglarLogo className="w-20 h-20 md:w-24 md:h-24" />

        <div className="flex flex-col items-center gap-3 text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold tracking-widest uppercase">
            Oncodines Trail
          </span>
          <h1 className="font-[family-name:var(--font-barlow)] text-4xl sm:text-6xl font-bold tracking-tight text-slate-50 leading-tight">
            Senglars de Bardissa
          </h1>
          <p className="text-slate-400 text-base sm:text-xl max-w-md leading-relaxed">
            Una experiència. Un equip. Una gesta.
          </p>
        </div>

        {/* Stats de la cursa */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {raceStats.map((s) => (
            <StatBadge key={s.label} {...s} />
          ))}
        </div>

        {/* Foto de l'equip */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-700 shadow-xl shadow-black/50">
          <Image
            src="/foto-equip.jpg"
            alt="L'equip Senglars de Bardissa a l'Oncodines Trail"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* ── Ruta interactiva ──────────────────────── */}
      <RouteSection />

      {/* ── Records ───────────────────────────────── */}
      <section id="records" className="bg-slate-900 px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <DashboardRecords />
        </div>
      </section>

      {/* ── Estadístiques ─────────────────────────── */}
      <StatsTable />

      {/* ── Equip ─────────────────────────────────── */}
      <TeamSection />

    </main>
  );
}
