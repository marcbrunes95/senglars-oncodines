"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";
import etapesData from "@/app/data/ruta.json";

type Etapa = {
  etapa: number;
  km: number;
  desnivell: number;
};

// Approximate elevation (m) at each stage boundary: index 0 = start, index 11 = finish
const BOUNDARY_ELEVS = [600, 650, 890, 215, 215, 245, 200, 730, 200, 350, 455, 355];

type DataPoint = { km: number; elev: number };
type StageBound = { stage: number; start: number; end: number };

function buildProfile(etapes: Etapa[]): { points: DataPoint[]; bounds: StageBound[] } {
  const points: DataPoint[] = [];
  const bounds: StageBound[] = [];
  let cumKm = 0;

  points.push({ km: 0, elev: BOUNDARY_ELEVS[0] });

  etapes.forEach((e, i) => {
    const startElev = BOUNDARY_ELEVS[i];
    const endElev = BOUNDARY_ELEVS[i + 1];
    const peakElev = startElev + e.desnivell;
    const goingUp = endElev >= startElev;
    const peakFrac = goingUp ? 0.62 : 0.32;

    points.push({
      km: parseFloat((cumKm + e.km * peakFrac).toFixed(2)),
      elev: peakElev,
    });
    points.push({
      km: parseFloat((cumKm + e.km).toFixed(2)),
      elev: endElev,
    });

    bounds.push({ stage: e.etapa, start: cumKm, end: cumKm + e.km });
    cumKm += e.km;
  });

  return { points, bounds };
}

const etapes = etapesData as unknown as Etapa[];
const { points, bounds } = buildProfile(etapes);

interface ElevationProfileProps {
  selectedId: number;
}

export default function ElevationProfile({ selectedId }: ElevationProfileProps) {
  const selected = bounds.find((b) => b.stage === selectedId);

  return (
    <div className="rounded-2xl bg-slate-800 border border-slate-700 p-4 flex flex-col gap-3">
      <span className="font-[family-name:var(--font-barlow)] text-xs font-semibold tracking-widest uppercase text-slate-400">
        Perfil d&apos;Elevació · aproximat
      </span>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={points} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.28} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="km"
            tickFormatter={(v: number) => `${v.toFixed(0)}km`}
            tick={{ fontSize: 10, fill: "#64748b" }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#64748b" }}
            tickLine={false}
            axisLine={false}
            width={42}
            tickFormatter={(v: number) => `${v}m`}
            domain={["dataMin - 50", "dataMax + 80"]}
          />
          <Tooltip
            contentStyle={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: 8,
              fontSize: 12,
              color: "#f1f5f9",
            }}
            labelFormatter={(v: number) => `${v} km`}
            formatter={(v: number) => [`${v} m`, "Elevació"]}
          />
          {selected && (
            <ReferenceArea
              x1={parseFloat(selected.start.toFixed(2))}
              x2={parseFloat(selected.end.toFixed(2))}
              fill="#f59e0b"
              fillOpacity={0.18}
              stroke="#f59e0b"
              strokeOpacity={0.5}
              strokeWidth={1}
            />
          )}
          <Area
            type="monotone"
            dataKey="elev"
            stroke="#f59e0b"
            strokeWidth={2}
            fill="url(#elevGrad)"
            dot={false}
            activeDot={{ r: 4, fill: "#f59e0b", stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
