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

// Stage zones from the official image km markers (total 101.37 km)
// CHART_LEFT: left margin for the y-axis labels (~3.5% of image width)
// CHART_SPAN: usable chart area width (~91% of image width)
const CHART_LEFT = 3.5;
const CHART_SPAN = 91;
const IMAGE_KM = [9.56, 12.02, 7.16, 8.76, 11.72, 8.28, 10.58, 9.00, 7.90, 7.30, 9.09];
const TOTAL_KM = IMAGE_KM.reduce((a, b) => a + b, 0);

const ZONES = (() => {
  const zones: { stage: number; left: number; width: number }[] = [];
  let cumFrac = 0;
  IMAGE_KM.forEach((km, i) => {
    const frac = km / TOTAL_KM;
    zones.push({
      stage: i + 1,
      left: CHART_LEFT + cumFrac * CHART_SPAN,
      width: frac * CHART_SPAN,
    });
    cumFrac += frac;
  });
  return zones;
})();

export default function RouteSection() {
  const [selectedId, setSelectedId] = useState(1);
  const selected = etapes.find((e) => e.etapa === selectedId) ?? etapes[0];

  return (
    <section id="ruta" className="bg-slate-800/50 border-y border-slate-800 px-4 py-12">
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
