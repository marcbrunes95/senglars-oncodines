"use client";

import { useState } from "react";
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

type Dir = "asc" | "desc";

const etapesRaw = etapesData as unknown as Etapa[];
const membresRaw = (equipoData as unknown as Membre[]).filter((m) => m.distanciaTotal);

function sortData<T>(data: T[], field: keyof T, dir: Dir): T[] {
  return [...data].sort((a, b) => {
    const av = a[field];
    const bv = b[field];
    let cmp = 0;
    if (typeof av === "number" && typeof bv === "number") {
      cmp = av - bv;
    } else {
      cmp = String(av ?? "").localeCompare(String(bv ?? ""), "ca", { numeric: true });
    }
    return dir === "asc" ? cmp : -cmp;
  });
}

type SortHeaderProps<T> = {
  label: string;
  field: keyof T;
  current: keyof T | null;
  dir: Dir;
  onSort: (f: keyof T) => void;
};

function SortHeader<T>({ label, field, current, dir, onSort }: SortHeaderProps<T>) {
  const active = current === field;
  return (
    <th
      onClick={() => onSort(field)}
      className="px-3 py-3 text-left text-[11px] font-semibold tracking-widest uppercase whitespace-nowrap cursor-pointer select-none"
    >
      <span className="flex items-center gap-1">
        <span className={active ? "text-amber-400" : "text-amber-400/60 hover:text-amber-400"}>
          {label}
        </span>
        <span className={`text-[9px] ${active ? "text-amber-400" : "text-slate-600"}`}>
          {active ? (dir === "asc" ? "▲" : "▼") : "▾"}
        </span>
      </span>
    </th>
  );
}

function TableWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700">
      {children}
    </div>
  );
}

export default function StatsTable() {
  const [e1Sort, setE1Sort] = useState<keyof Etapa | null>(null);
  const [e1Dir, setE1Dir] = useState<Dir>("asc");
  const [m1Sort, setM1Sort] = useState<keyof Membre | null>(null);
  const [m1Dir, setM1Dir] = useState<Dir>("asc");

  function handleEtapaSort(field: keyof Etapa) {
    if (e1Sort === field) setE1Dir((d) => (d === "asc" ? "desc" : "asc"));
    else { setE1Sort(field); setE1Dir("asc"); }
  }

  function handleMembreSort(field: keyof Membre) {
    if (m1Sort === field) setM1Dir((d) => (d === "asc" ? "desc" : "asc"));
    else { setM1Sort(field); setM1Dir("asc"); }
  }

  const etapes = e1Sort ? sortData(etapesRaw, e1Sort, e1Dir) : etapesRaw;
  const membres = m1Sort ? sortData(membresRaw, m1Sort, m1Dir) : membresRaw;

  const eH = (label: string, field: keyof Etapa) => (
    <SortHeader<Etapa>
      label={label}
      field={field}
      current={e1Sort}
      dir={e1Dir}
      onSort={handleEtapaSort}
    />
  );

  const mH = (label: string, field: keyof Membre) => (
    <SortHeader<Membre>
      label={label}
      field={field}
      current={m1Sort}
      dir={m1Dir}
      onSort={handleMembreSort}
    />
  );

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
                  {eH("Etapa", "etapa")}
                  {eH("Corredors", "corredores")}
                  {eH("Tram", "tramo")}
                  {eH("Distància", "km")}
                  {eH("D+", "desnivell")}
                  {eH("D+/km", "desnivellKm")}
                  {eH("Ritme", "ritme")}
                  {eH("Inici", "horaInici")}
                  {eH("Temps en mov.", "tiempo")}
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
                    <td className="px-3 py-2.5 font-bold text-amber-400">{e.etapa}</td>
                    <td className="px-3 py-2.5 text-slate-200 font-medium whitespace-nowrap">{e.corredores}</td>
                    <td className="px-3 py-2.5 text-slate-400 whitespace-nowrap">{e.tramo}</td>
                    <td className="px-3 py-2.5 text-slate-200 whitespace-nowrap">{e.km} km</td>
                    <td className="px-3 py-2.5 text-slate-200 whitespace-nowrap">+{e.desnivell} m</td>
                    <td className="px-3 py-2.5 text-slate-400 whitespace-nowrap">{e.desnivellKm} m/km</td>
                    <td className="px-3 py-2.5 text-slate-200 whitespace-nowrap">{e.ritme} min/km</td>
                    <td className="px-3 py-2.5 text-slate-400 whitespace-nowrap">{e.horaInici} → {e.horaArribada}</td>
                    <td className="px-3 py-2.5 text-slate-200 whitespace-nowrap">{e.tiempo}</td>
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
                  {mH("Nom", "nom")}
                  {mH("Etapes", "etapes")}
                  {mH("Distància total", "distanciaTotal")}
                  {mH("Desnivell+", "desnivellTotal")}
                  {mH("Desnivell/km", "desnivellKm")}
                  {mH("Ritme mig", "ritmeMitja")}
                  {mH("Temps en mov.", "tempsTotal")}
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
                    <td className="px-3 py-2.5 font-bold text-amber-400 whitespace-nowrap">{m.nom}</td>
                    <td className="px-3 py-2.5 text-slate-400 whitespace-nowrap">{m.etapes.join(" · ")}</td>
                    <td className="px-3 py-2.5 text-slate-200 whitespace-nowrap">{m.distanciaTotal} km</td>
                    <td className="px-3 py-2.5 text-slate-200 whitespace-nowrap">+{m.desnivellTotal} m</td>
                    <td className="px-3 py-2.5 text-slate-400 whitespace-nowrap">{m.desnivellKm} m/km</td>
                    <td className="px-3 py-2.5 text-slate-200 whitespace-nowrap">{m.ritmeMitja} min/km</td>
                    <td className="px-3 py-2.5 text-slate-200 whitespace-nowrap">{m.tempsTotal}</td>
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
