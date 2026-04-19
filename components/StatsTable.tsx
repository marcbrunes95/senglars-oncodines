import etapesData from "@/app/data/ruta.json";
import equipoData from "@/app/data/equipo.json";

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

type Membre = {
  id: number;
  nom: string;
  etapes: number[];
  distanciaTotal?: number;
  desnivellTotal?: number;
  desnivellKm?: string;
  ritmeMitja?: string;
  tempsTotal?: string;
};

const etapes = etapesData as unknown as Etapa[];
const membres = (equipoData as unknown as Membre[]).filter((m) => m.distanciaTotal);

const thClass =
  "px-3 py-3 text-left text-[11px] font-semibold tracking-widest uppercase text-amber-400 whitespace-nowrap";

function TableWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700">
      {children}
    </div>
  );
}

export default function StatsTable() {
  return (
    <section id="estadistiques" className="bg-slate-900 px-4 py-12">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <h2 className="font-[family-name:var(--font-barlow)] text-2xl font-bold tracking-tight text-slate-50">
          Estadístiques
        </h2>

        {/* Taula 1: Etapes */}
        <div className="flex flex-col gap-3">
          <h3 className="font-[family-name:var(--font-barlow)] text-xs font-semibold tracking-widest uppercase text-amber-400">
            Etapes
          </h3>
          <TableWrapper>
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800">
                  {[
                    "Etapa",
                    "Corredors",
                    "Tram",
                    "Distància",
                    "D+",
                    "D+/km",
                    "Ritme",
                    "Horaris",
                    "Temps en mov.",
                  ].map((h) => (
                    <th key={h} className={thClass}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {etapes.map((e, i) => (
                  <tr
                    key={e.etapa}
                    className={`border-b border-slate-800 transition-colors ${
                      i % 2 === 0 ? "bg-slate-900" : "bg-slate-800/40"
                    }`}
                  >
                    <td className="px-3 py-2.5 font-bold text-amber-400">
                      {e.etapa}
                    </td>
                    <td className="px-3 py-2.5 text-slate-200 font-medium whitespace-nowrap">
                      {e.corredores}
                    </td>
                    <td className="px-3 py-2.5 text-slate-400 whitespace-nowrap">
                      {e.tramo}
                    </td>
                    <td className="px-3 py-2.5 text-slate-200 whitespace-nowrap">
                      {e.km} km
                    </td>
                    <td className="px-3 py-2.5 text-slate-200 whitespace-nowrap">
                      +{e.desnivell} m
                    </td>
                    <td className="px-3 py-2.5 text-slate-400 whitespace-nowrap">
                      {e.desnivellKm} m/km
                    </td>
                    <td className="px-3 py-2.5 text-slate-200 whitespace-nowrap">
                      {e.ritme} min/km
                    </td>
                    <td className="px-3 py-2.5 text-slate-400 whitespace-nowrap">
                      {e.horaInici} → {e.horaArribada}
                    </td>
                    <td className="px-3 py-2.5 text-slate-200 whitespace-nowrap">
                      {e.tiempo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrapper>
        </div>

        {/* Taula 2: Totals per Corredor */}
        <div className="flex flex-col gap-3">
          <h3 className="font-[family-name:var(--font-barlow)] text-xs font-semibold tracking-widest uppercase text-amber-400">
            Totals per Corredor
          </h3>
          <TableWrapper>
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800">
                  {[
                    "Nom",
                    "Etapes",
                    "Distància total",
                    "Desnivell+",
                    "Desnivell/km",
                    "Ritme mig global",
                    "Temps en mov.",
                  ].map((h) => (
                    <th key={h} className={thClass}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {membres.map((m, i) => (
                  <tr
                    key={m.id}
                    className={`border-b border-slate-800 transition-colors ${
                      i % 2 === 0 ? "bg-slate-900" : "bg-slate-800/40"
                    }`}
                  >
                    <td className="px-3 py-2.5 font-bold text-amber-400 whitespace-nowrap">
                      {m.nom}
                    </td>
                    <td className="px-3 py-2.5 text-slate-400 whitespace-nowrap">
                      {m.etapes.join(" · ")}
                    </td>
                    <td className="px-3 py-2.5 text-slate-200 whitespace-nowrap">
                      {m.distanciaTotal} km
                    </td>
                    <td className="px-3 py-2.5 text-slate-200 whitespace-nowrap">
                      +{m.desnivellTotal} m
                    </td>
                    <td className="px-3 py-2.5 text-slate-400 whitespace-nowrap">
                      {m.desnivellKm} m/km
                    </td>
                    <td className="px-3 py-2.5 text-slate-200 whitespace-nowrap">
                      {m.ritmeMitja} min/km
                    </td>
                    <td className="px-3 py-2.5 text-slate-200 whitespace-nowrap">
                      {m.tempsTotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrapper>
        </div>
      </div>
    </section>
  );
}
