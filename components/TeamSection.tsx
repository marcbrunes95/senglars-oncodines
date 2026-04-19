"use client";

import Image from "next/image";
import { useState } from "react";
import { Clock, MapPin, Timer, TrendingUp } from "lucide-react";
import equip from "@/app/data/equipo.json";

type Membre = {
  id: number;
  nom: string;
  titol: string;
  foto: string;
  descripcio: string;
  etapes: number[];
  distanciaTotal?: number;
  desnivellTotal?: number;
  ritmeMitja?: string;
  tempsTotal?: string;
};

const membres = equip as unknown as Membre[];

function MemberCard({ membre }: { membre: Membre }) {
  const [imgSrc, setImgSrc] = useState(membre.foto ?? "/senglar-placeholder.jpg");

  return (
    <div className="group bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:border-slate-600 hover:shadow-xl hover:shadow-black/40">
      <div className="relative w-full h-44 bg-slate-700 shrink-0">
        <Image
          src={imgSrc}
          alt={`${membre.nom} · Senglars de Bardissa`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          onError={() => setImgSrc("/senglar-placeholder.jpg")}
        />
      </div>

      <div className="p-5 flex flex-col gap-4 flex-1">
        <div className="flex flex-col gap-0.5">
          <span className="font-[family-name:var(--font-barlow)] text-xs font-semibold tracking-widest uppercase text-amber-400/70">
            {membre.titol}
          </span>
          <h3 className="font-[family-name:var(--font-barlow)] text-2xl font-bold tracking-tight text-amber-400">
            {membre.nom}
          </h3>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed flex-1">
          {membre.descripcio}
        </p>

        {membre.etapes.length > 0 && (
          <div className="flex flex-wrap gap-2">
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

        {membre.distanciaTotal && (
          <div className="border-t border-slate-700 pt-3 grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex items-center gap-2">
              <MapPin size={13} className="text-amber-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide leading-none">
                  Distància
                </p>
                <p className="text-slate-200 text-xs font-semibold">
                  {membre.distanciaTotal} km
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={13} className="text-amber-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide leading-none">
                  Desnivell
                </p>
                <p className="text-slate-200 text-xs font-semibold">
                  +{membre.desnivellTotal} m
                </p>
              </div>
            </div>
            {membre.ritmeMitja && (
              <div className="flex items-center gap-2">
                <Timer size={13} className="text-amber-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide leading-none">
                    Ritme mitjà
                  </p>
                  <p className="text-slate-200 text-xs font-semibold">
                    {membre.ritmeMitja} min/km
                  </p>
                </div>
              </div>
            )}
            {membre.tempsTotal && (
              <div className="flex items-center gap-2">
                <Clock size={13} className="text-amber-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide leading-none">
                    Temps total
                  </p>
                  <p className="text-slate-200 text-xs font-semibold">
                    {membre.tempsTotal}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
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
