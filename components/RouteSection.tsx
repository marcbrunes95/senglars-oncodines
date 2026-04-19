"use client";

import { useState } from "react";
import MapWrapper from "@/components/MapWrapper";
import StageStatistics from "@/components/StageStatistics";
import ElevationProfile from "@/components/ElevationProfile";
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

export default function RouteSection() {
  const [selectedId, setSelectedId] = useState(1);
  const selected = etapes.find((e) => e.etapa === selectedId) ?? etapes[0];

  return (
    <section id="ruta" className="bg-slate-800/50 border-y border-slate-800 px-4 py-12">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <h2 className="font-[family-name:var(--font-barlow)] text-2xl font-bold tracking-tight text-slate-50">
          La Ruta
        </h2>

        {/* Header visual */}
        <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-700 shadow-xl shadow-black/40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/header-ruta.jpg"
            alt="Paisatge de l'Oncodines Trail"
            className="w-full h-full object-cover"
          />
        </div>

        <MapWrapper selectedId={selectedId} onSelect={setSelectedId} />

        <ElevationProfile selectedId={selectedId} />

        {/* key forces remount → restarts animation on stage change */}
        <StageStatistics key={selectedId} stage={selected} />
      </div>
    </section>
  );
}
