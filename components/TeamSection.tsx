import equip from "@/app/data/equipo.json";

type Membre = {
  id: number;
  nom: string;
  titol: string;
  descripcio: string;
  etapes: number[];
};

const membres = equip as Membre[];

function MemberCard({ membre }: { membre: Membre }) {
  return (
    <div className="group bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col gap-4 transition-transform duration-200 hover:-translate-y-1 hover:border-slate-600 hover:shadow-xl hover:shadow-black/40">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <span className="font-[family-name:var(--font-barlow)] text-xs font-semibold tracking-widest uppercase text-amber-400/70">
          {membre.titol}
        </span>
        <h3 className="font-[family-name:var(--font-barlow)] text-2xl font-bold tracking-tight text-amber-400">
          {membre.nom}
        </h3>
      </div>

      {/* Descripció */}
      <p className="text-slate-400 text-sm leading-relaxed flex-1">
        {membre.descripcio}
      </p>

      {/* Etapes — renderitzat condicional */}
      {membre.etapes.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {membre.etapes.map((etapa) => (
            <span
              key={etapa}
              className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold flex items-center justify-center"
            >
              {etapa}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TeamSection() {
  return (
    <section id="equip" className="bg-slate-800/50 border-t border-slate-800 px-4 py-12">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <h2 className="font-[family-name:var(--font-barlow)] text-2xl font-bold tracking-tight text-slate-50">
          L&apos;Equip: Llegenda a l&apos;Oncodines
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {membres.map((m) => (
            <MemberCard key={m.id} membre={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
