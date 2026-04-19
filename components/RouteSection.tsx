"use client";

import { useState } from "react";
import MapWrapper from "@/components/MapWrapper";
import StageStatistics from "@/components/StageStatistics";
import etapesData from "@/app/data/ruta.json";

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
  coords: [number, number];
};

const etapes = etapesData as unknown as Etapa[];

// Zones hardcoded per alinear-les amb les línies verticals del perfil oficial.
// E1-E6: calculades amb CHART_LEFT=3.5, CHART_SPAN=94 (correctes).
// E7-E11: ajustades manualment ~1.3% cap a l'esquerra per corregir la deriva.
const ZONES: { stage: number; left: number; width: number }[] = [
  { stage: 1,  left: 3.50,  width: 8.86  },
  { stage: 2,  left: 12.36, width: 11.15 },
  { stage: 3,  left: 23.51, width: 6.64  },
  { stage: 4,  left: 30.14, width: 8.12  },
  { stage: 5,  left: 38.27, width: 10.87 },
  { stage: 6,  left: 49.14, width: 7.68  },
  { stage: 7,  left: 56.82, width: 8.48  },
  { stage: 8,  left: 65.30, width: 8.35  },
  { stage: 9,  left: 73.65, width: 7.32  },
  { stage: 10, left: 80.97, width: 6.77  },
  { stage: 11, left: 87.74, width: 8.43  },
];

export default function RouteSection() {
  const [selectedId, setSelectedId] = useState(1);
  const selected = etapes.find((e) => e.etapa === selectedId) ?? etapes[0];

  return (
    <section id="ruta" className="bg-slate-800/50 border-y border-slate-800 px-4 py-8 md:py-12">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <h2 className="font-[family-name:var(--font-barlow)] text-2xl font-bold tracking-tight text-slate-50">
          La Ruta
        </h2>

        {/* Header visual: perfil d'elevació oficial amb zones clicables per etapa */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-slate-700 shadow-xl shadow-black/40 select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/header-ruta.jpg"
            alt="Perfil d'elevació oficial · Oncodines Trail"
            className="w-full h-auto block"
            draggable={false}
          />
          <div className="absolute inset-0 pointer-events-none">
            {ZONES.map((zone) => {
              const isSelected = zone.stage === selectedId;
              return (
                <button
                  key={zone.stage}
                  onClick={() => setSelectedId(zone.stage)}
                  className={`absolute top-0 bottom-0 pointer-events-auto transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-2 border-amber-400 bg-amber-400/25 shadow-[inset_0_0_0_1px_rgba(251,191,36,0.4)]"
                      : "border border-transparent hover:bg-white/5 hover:border-white/20"
                  }`}
                  style={{ left: `${zone.left}%`, width: `${zone.width}%` }}
                  aria-label={`Etapa ${zone.stage}`}
                  title={`Etapa ${zone.stage}`}
                />
              );
            })}
          </div>
        </div>

        <MapWrapper selectedId={selectedId} onSelect={setSelectedId} />

        {/* key forces remount → restarts animation on stage change */}
        <StageStatistics key={selectedId} stage={selected} />
      </div>
    </section>
  );
}
