import { Activity, Clock, Flag, MapPin, Timer, TrendingUp, Zap } from "lucide-react";

type Etapa = {
  etapa: number;
  corredores: string;
  tramo: string;
  km: number;
  desnivell: number;
  desnivellKm: number;
  ritme: string;
  horaInici: string;
  horaArribada: string;
  tiempo: string;
};

const buildStats = (s: Etapa) => [
  { icon: MapPin,     label: "Distància",  value: `${s.km} km` },
  { icon: TrendingUp, label: "Desnivell",  value: `+${s.desnivell} m` },
  { icon: Activity,   label: "D+/km",      value: `${s.desnivellKm} m/km` },
  { icon: Zap,        label: "Ritme",      value: `${s.ritme} min/km` },
  { icon: Clock,      label: "Inici",      value: s.horaInici },
  { icon: Flag,       label: "Arribada",   value: s.horaArribada },
  { icon: Timer,      label: "Temps",      value: s.tiempo },
];

export default function StageStatistics({ stage }: { stage: Etapa }) {
  return (
    <div className="animate-fade-slide-in rounded-2xl bg-slate-800 border border-slate-700 p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-[family-name:var(--font-barlow)] text-lg font-bold text-amber-400">
          Etapa {stage.etapa}
        </span>
        {stage.corredores && (
          <span className="font-[family-name:var(--font-barlow)] text-base font-semibold text-slate-200">
            {stage.corredores}
          </span>
        )}
        {stage.tramo && (
          <span className="text-slate-500 text-sm">{stage.tramo}</span>
        )}
      </div>

      {/* Stats: 2 cols mobile → 4 cols tablet → 7 cols desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {buildStats(stage).map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex flex-col gap-1.5 bg-slate-700/40 rounded-xl p-3"
          >
            <Icon size={13} className="text-amber-400" />
            <span className="text-slate-500 text-[10px] uppercase tracking-widest leading-none">
              {label}
            </span>
            <span className="text-slate-50 font-bold text-sm leading-snug">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
