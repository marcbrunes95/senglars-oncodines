import etapes from "@/app/data/ruta.json";

type Etapa = {
  etapa: number;
  corredores: string;
  tramo: string;
  km: number;
  desnivell: number;
  ritme: string;
  tiempo: string;
  coords: [number, number];
};

const data = etapes as Etapa[];

const fastest   = data.reduce((a, b) => (a.ritme < b.ritme ? a : b));
const steepest  = data.reduce((a, b) => (a.desnivell > b.desnivell ? a : b));
const longest   = data.reduce((a, b) => (a.km > b.km ? a : b));
const totalKm        = data.reduce((sum, e) => sum + e.km, 0);
const totalDesnivell = data.reduce((sum, e) => sum + e.desnivell, 0);

interface RecordCardProps {
  emoji: string;
  title: string;
  subtitle?: string;
  value: string;
  detail?: string;
  accent?: boolean;
}

function RecordCard({ emoji, title, subtitle, value, detail, accent }: RecordCardProps) {
  return (
    <div
      className={`rounded-2xl p-5 flex flex-col gap-3 border ${
        accent
          ? "bg-amber-400/10 border-amber-400/30"
          : "bg-slate-800 border-slate-700"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">{emoji}</span>
        <span className="font-[family-name:var(--font-barlow)] text-xs font-semibold tracking-widest uppercase text-slate-400">
          {title}
        </span>
      </div>
      {subtitle && <p className="text-slate-300 text-sm">{subtitle}</p>}
      <p
        className={`font-[family-name:var(--font-barlow)] text-2xl font-bold tracking-tight ${
          accent ? "text-amber-400" : "text-slate-50"
        }`}
      >
        {value}
      </p>
      {detail && <p className="text-slate-500 text-xs">{detail}</p>}
    </div>
  );
}

export default function DashboardRecords() {
  return (
    <section className="w-full flex flex-col gap-4">
      <h2 className="font-[family-name:var(--font-barlow)] text-2xl font-bold tracking-tight text-slate-50">
        Records de l&apos;Equip
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RecordCard
          emoji="⚡"
          title="El Correcaminos"
          subtitle={`Etapa ${fastest.etapa} · ${fastest.corredores}`}
          value={`${fastest.ritme} min/km`}
          detail={fastest.tramo}
        />
        <RecordCard
          emoji="🏔️"
          title="L'Escalador"
          subtitle={`Etapa ${steepest.etapa} · ${steepest.corredores}`}
          value={`+${steepest.desnivell} m`}
          detail={steepest.tramo}
        />
        <RecordCard
          emoji="👑"
          title="L'Etapa Reina"
          subtitle={`Etapa ${longest.etapa} · ${longest.corredores}`}
          value={`${longest.km} km`}
          detail={longest.tramo}
          accent
        />
        <RecordCard
          emoji="🐗"
          title="Resum Total"
          value={`${totalKm.toFixed(1)} km`}
          detail={`+${totalDesnivell} m desnivell acumulat`}
        />
      </div>
    </section>
  );
}
