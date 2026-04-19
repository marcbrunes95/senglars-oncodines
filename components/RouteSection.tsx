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

const etapes = etapesData as Etapa[];

export default function RouteSection() {
  const [selectedId, setSelectedId] = useState(1);
  const selected = etapes.find((e) => e.etapa === selectedId) ?? etapes[0];

  return (
    <section id="ruta" className="bg-slate-800/50 border-y border-slate-800 px-4 py-12">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <h2 className="font-[family-name:var(--font-barlow)] text-2xl font-bold tracking-tight text-slate-50">
          La Ruta
        </h2>

        <MapWrapper selectedId={selectedId} onSelect={setSelectedId} />

        {/* key força remuntatge → rellança l'animació en canviar d'etapa */}
        <StageStatistics key={selectedId} stage={selected} />
      </div>
    </section>
  );
}
