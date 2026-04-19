type CardColor = "amber" | "blue" | "emerald" | "rose" | "violet" | "cyan";

const colorMap: Record<CardColor, { card: string; value: string }> = {
  amber:   { card: "bg-amber-400/10 border-amber-400/30",   value: "text-amber-400" },
  blue:    { card: "bg-blue-400/10 border-blue-400/30",     value: "text-blue-300" },
  emerald: { card: "bg-emerald-400/10 border-emerald-400/30", value: "text-emerald-400" },
  rose:    { card: "bg-rose-400/10 border-rose-400/30",     value: "text-rose-400" },
  violet:  { card: "bg-violet-400/10 border-violet-400/30", value: "text-violet-400" },
  cyan:    { card: "bg-cyan-400/10 border-cyan-400/30",     value: "text-cyan-300" },
};

interface RecordCardProps {
  emoji: string;
  title: string;
  subtitle?: string;
  value: string;
  detail?: string;
  color?: CardColor;
}

function RecordCard({ emoji, title, subtitle, value, detail, color = "amber" }: RecordCardProps) {
  const styles = colorMap[color];
  return (
    <div className={`rounded-2xl p-5 flex flex-col gap-3 border ${styles.card}`}>
      <div className="flex items-center gap-2">
        <span className="text-2xl">{emoji}</span>
        <span className="font-[family-name:var(--font-barlow)] text-base font-bold tracking-wide uppercase text-slate-200">
          {title}
        </span>
      </div>
      {subtitle && <p className="text-slate-300 text-sm">{subtitle}</p>}
      <p className={`font-[family-name:var(--font-barlow)] text-2xl font-bold tracking-tight ${styles.value}`}>
        {value}
      </p>
      {detail && <p className="text-slate-500 text-xs leading-relaxed">{detail}</p>}
    </div>
  );
}

export default function DashboardRecords() {
  return (
    <section className="w-full flex flex-col gap-4">
      <h2 className="font-[family-name:var(--font-barlow)] text-2xl font-bold tracking-tight text-slate-50">
        Records de l&apos;Equip
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <RecordCard
          emoji="⚡"
          title="El Correcaminos"
          subtitle="Etapa 6 · MARC-XAVI"
          value="05:56 min/km"
          detail="Santa Eulàlia de Ronçana → Caldes de Montbui. La més ràpida de la cursa."
          color="blue"
        />
        <RecordCard
          emoji="🏔️"
          title="L'Escalador (Etapa Reina)"
          subtitle="Etapa 7 · JOAN-PALAU"
          value="+571 m D+"
          detail="Caldes de Montbui → Sant Sebastià de Montmajor. El desnivell més bèstia."
          color="amber"
        />
        <RecordCard
          emoji="💪"
          title="Distància Seguida"
          subtitle="Etapes 4+5 · JOSEP"
          value="20 km sense parar"
          detail="+660m D+ · El Figaró → Santa Eulàlia de Ronçana. Una barbaritat."
          color="emerald"
        />
        <RecordCard
          emoji="🚀"
          title="Baixada Èpica"
          subtitle="Etapa 3 · PERE-JOAN"
          value="A putu sprint!"
          detail="Sant Miquel Sesperxes → El Figaró · 06:09 min/km · 79m D+."
          color="rose"
        />
        <RecordCard
          emoji="🦾"
          title="Míster de Ferro"
          subtitle="MIQUEL"
          value="~10km amb crosses"
          detail="Entre avituallaments. Quasi 10km sense córrer i sense queixar-se. Una barbaritat!"
          color="violet"
        />
        <RecordCard
          emoji="🐗"
          title="Resum Total"
          value="102.51 km"
          detail="+3.512 m desnivell acumulat · 11 etapes · 1 equip"
          color="cyan"
        />
      </div>
    </section>
  );
}
