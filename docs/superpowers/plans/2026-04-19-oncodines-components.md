# Oncodines Trail — Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the Senglars de Bardissa web app with a reusable SVG boar logo, interactive Leaflet map, bento-grid dashboard, and integrated hero page.

**Architecture:** SenglarLogo is a pure SVG component accepting `className` for sizing, reused in Navbar (w-8 h-8) and Hero (w-24 h-24). InteractiveMap is a `"use client"` component loaded via `next/dynamic({ ssr: false })` to avoid Leaflet's `window` dependency at SSR. DashboardRecords is a Server Component that computes records from JSON at render time.

**Tech Stack:** Next.js 16 App Router, Tailwind v4, react-leaflet v5, TypeScript, lucide-react v1.x

---

### Task 1: Update ruta.json with 11-stage complete dataset

**Files:**
- Modify: `app/data/ruta.json`

- [ ] **Step 1: Replace file with complete dataset**

Write this exact content to `app/data/ruta.json`:

```json
[
  {"etapa": 1, "corredores": "JOSEP - MARC", "tramo": "Castellterçol - Castellcir", "km": 9.51, "desnivell": 257, "ritme": "06:21", "tiempo": "01:00:19", "coords": [41.7513, 2.1205]},
  {"etapa": 2, "corredores": "XAVI - PALAU", "tramo": "Castellcir - St. Miquel Sesperxes", "km": 12.99, "desnivell": 453, "ritme": "06:34", "tiempo": "01:25:13", "coords": [41.7483, 2.2133]},
  {"etapa": 3, "corredores": "PERE - JOAN", "tramo": "St. Miquel Sesperxes - El Figaró", "km": 7.54, "desnivell": 79, "ritme": "06:09", "tiempo": "00:46:24", "coords": [41.7225, 2.2736]},
  {"etapa": 4, "corredores": "JOSEP - PALAU", "tramo": "El Figaró - La Garriga", "km": 9.24, "desnivell": 386, "ritme": "07:07", "tiempo": "01:05:44", "coords": [41.6845, 2.2861]},
  {"etapa": 5, "corredores": "JOSEP - MARC", "tramo": "La Garriga - Sta. Eulàlia Ronçana", "km": 11.23, "desnivell": 240, "ritme": "06:40", "tiempo": "01:14:58", "coords": [41.6541, 2.2263]},
  {"etapa": 6, "corredores": "JOAN - XAVI", "tramo": "Sta. Eulàlia - Caldes de Montbui", "km": 9.02, "desnivell": 222, "ritme": "05:56", "tiempo": "00:53:28", "coords": [41.6331, 2.1622]},
  {"etapa": 7, "corredores": "JOAN - ORIOL", "tramo": "Caldes - St. Sebastià Montmajor", "km": 11.98, "desnivell": 571, "ritme": "10:33", "tiempo": "02:06:22", "coords": [41.6331, 2.1150]},
  {"etapa": 8, "corredores": "XAVI - PERE", "tramo": "St. Sebastià - Caldes de Montbui", "km": 9.21, "desnivell": 343, "ritme": "08:37", "tiempo": "01:19:18", "coords": [41.6331, 2.1622]},
  {"etapa": 9, "corredores": "Josep - MARC", "tramo": "Caldes - Bigues i Riells", "km": 8.37, "desnivell": 340, "ritme": "09:46", "tiempo": "01:21:49", "coords": [41.6775, 2.2231]},
  {"etapa": 10, "corredores": "JOSEP - XAVI", "tramo": "Bigues - St. Miquel del Fai", "km": 7.57, "desnivell": 273, "ritme": "09:53", "tiempo": "01:14:49", "coords": [41.7142, 2.1908]},
  {"etapa": 11, "corredores": "JOAN - PERE", "tramo": "St. Miquel del Fai - St. Feliu Codines", "km": 8.79, "desnivell": 313, "ritme": "08:03", "tiempo": "01:10:43", "coords": [41.6872, 2.1642]}
]
```

- [ ] **Step 2: Verify JSON**
```bash
node -e "const d=require('./app/data/ruta.json'); console.log('etapes:',d.length,'totalKm:',d.reduce((s,e)=>s+e.km,0).toFixed(2))"
```
Expected: `etapes: 11 totalKm: 105.45`

- [ ] **Step 3: Commit**
```bash
git add app/data/ruta.json
git commit -m "feat: complete 11-stage race dataset in ruta.json"
```

---

### Task 2: Create SenglarLogo.tsx

**Files:**
- Create: `components/SenglarLogo.tsx`

- [ ] **Step 1: Create the component**

```tsx
interface SenglarLogoProps {
  className?: string;
}

export default function SenglarLogo({ className = "w-10 h-10" }: SenglarLogoProps) {
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Senglars de Bardissa logo"
      role="img"
    >
      {/* Main head */}
      <ellipse cx="52" cy="40" rx="28" ry="26"
        fill="white" fillOpacity="0.08"
        stroke="white" strokeWidth="2.5" />

      {/* Ear — pointed, top right */}
      <path d="M 62,15 L 68,3 L 76,17"
        stroke="white" strokeWidth="2.5" fill="none" strokeLinejoin="round" />

      {/* Snout — left */}
      <ellipse cx="18" cy="42" rx="10" ry="8"
        fill="white" fillOpacity="0.18" stroke="white" strokeWidth="2" />
      <circle cx="15" cy="40" r="2" fill="#0f172a" fillOpacity="0.5" />
      <circle cx="21" cy="40" r="2" fill="#0f172a" fillOpacity="0.5" />

      {/* Eye */}
      <circle cx="58" cy="32" r="4.5" fill="white" />
      <circle cx="59" cy="31" r="1.8" fill="#0f172a" />

      {/* Tusk — amber */}
      <path d="M 22,50 C 18,58 16,67 24,68"
        stroke="#f59e0b" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Bristles */}
      <path d="M 36,14 C 42,8 52,6 62,11"
        stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"
        strokeDasharray="2 3" />

      {/* Bramble branches — amber, right */}
      <path d="M 86,18 L 98,13" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 92,15 L 90,6"  stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 86,38 L 99,36" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 92,37 L 91,28" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 86,58 L 98,61" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 92,59 L 91,68" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add components/SenglarLogo.tsx
git commit -m "feat: SenglarLogo SVG boar head with bramble details"
```

---

### Task 3: Update Navbar.tsx

**Files:**
- Modify: `components/Navbar.tsx`

- [ ] **Step 1: Swap Mountain for SenglarLogo**

```diff
- import { Menu, X, Mountain } from "lucide-react";
+ import { Menu, X } from "lucide-react";
+ import SenglarLogo from "@/components/SenglarLogo";
```

```diff
- <Mountain size={20} strokeWidth={2} />
+ <SenglarLogo className="w-8 h-8" />
```

- [ ] **Step 2: Commit**
```bash
git add components/Navbar.tsx
git commit -m "feat: replace Mountain icon with SenglarLogo in Navbar"
```

---

### Task 4: Create DashboardRecords.tsx

**Files:**
- Create: `components/DashboardRecords.tsx`

- [ ] **Step 1: Create the component**

```tsx
import etapes from "@/app/data/ruta.json";

type Etapa = {
  etapa: number;
  corredores: string;
  tramo: string;
  km: number;
  desnivell: number;
  ritme: string;
  tiempo: string;
  coords: [number, number];
};

const data = etapes as Etapa[];

const fastest  = data.reduce((a, b) => (a.ritme < b.ritme ? a : b));
const steepest = data.reduce((a, b) => (a.desnivell > b.desnivell ? a : b));
const longest  = data.reduce((a, b) => (a.km > b.km ? a : b));
const totalKm       = data.reduce((sum, e) => sum + e.km, 0);
const totalDesnivell = data.reduce((sum, e) => sum + e.desnivell, 0);

interface RecordCardProps {
  emoji: string;
  title: string;
  subtitle?: string;
  value: string;
  detail?: string;
  accent?: boolean;
}

function RecordCard({ emoji, title, subtitle, value, detail, accent }: RecordCardProps) {
  return (
    <div className={`rounded-2xl p-5 flex flex-col gap-3 border ${
      accent
        ? "bg-amber-400/10 border-amber-400/30"
        : "bg-slate-800 border-slate-700"
    }`}>
      <div className="flex items-center gap-2">
        <span className="text-xl">{emoji}</span>
        <span className="font-[family-name:var(--font-barlow)] text-xs font-semibold tracking-widest uppercase text-slate-400">
          {title}
        </span>
      </div>
      {subtitle && <p className="text-slate-300 text-sm">{subtitle}</p>}
      <p className={`font-[family-name:var(--font-barlow)] text-2xl font-bold tracking-tight ${
        accent ? "text-amber-400" : "text-slate-50"
      }`}>
        {value}
      </p>
      {detail && <p className="text-slate-500 text-xs">{detail}</p>}
    </div>
  );
}

export default function DashboardRecords() {
  return (
    <section className="w-full flex flex-col gap-4">
      <h2 className="font-[family-name:var(--font-barlow)] text-2xl font-bold tracking-tight text-slate-50">
        Records de l&apos;Equip
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RecordCard
          emoji="⚡"
          title="El Correcaminos"
          subtitle={`Etapa ${fastest.etapa} · ${fastest.corredores}`}
          value={`${fastest.ritme} min/km`}
          detail={fastest.tramo}
        />
        <RecordCard
          emoji="🏔️"
          title="L'Escalador"
          subtitle={`Etapa ${steepest.etapa} · ${steepest.corredores}`}
          value={`+${steepest.desnivell} m`}
          detail={steepest.tramo}
        />
        <RecordCard
          emoji="👑"
          title="L'Etapa Reina"
          subtitle={`Etapa ${longest.etapa} · ${longest.corredores}`}
          value={`${longest.km} km`}
          detail={longest.tramo}
          accent
        />
        <RecordCard
          emoji="🐗"
          title="Resum Total"
          value={`${totalKm.toFixed(1)} km`}
          detail={`+${totalDesnivell} m desnivell acumulat`}
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add components/DashboardRecords.tsx
git commit -m "feat: DashboardRecords bento grid with dynamic record calculation"
```

---

### Task 5: Create InteractiveMap.tsx

**Files:**
- Create: `components/InteractiveMap.tsx`

Must be `"use client"` AND imported via `next/dynamic({ ssr: false })` in page.tsx.
Uses a custom `divIcon` to avoid Leaflet's broken default webpack marker.

- [ ] **Step 1: Create the component**

```tsx
"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import etapes from "@/app/data/ruta.json";

type Etapa = {
  etapa: number;
  corredores: string;
  tramo: string;
  km: number;
  desnivell: number;
  ritme: string;
  tiempo: string;
  coords: [number, number];
};

const data = etapes as Etapa[];
const positions = data.map((e) => e.coords as [number, number]);

const markerIcon = L.divIcon({
  className: "",
  html: `<div style="width:14px;height:14px;border-radius:50%;background:#f59e0b;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.5)"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const CENTER: [number, number] = [41.69, 2.21];

export default function InteractiveMap() {
  return (
    <div className="w-full flex flex-col md:flex-row gap-4">
      {/* Map */}
      <div className="w-full md:w-2/3 h-[50vh] md:h-[520px] rounded-2xl overflow-hidden border border-slate-700 shadow-xl shadow-black/40">
        <MapContainer
          center={CENTER}
          zoom={11}
          style={{ width: "100%", height: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <Polyline
            positions={positions}
            pathOptions={{ color: "#f59e0b", weight: 3, opacity: 0.85 }}
          />
          {data.map((etapa) => (
            <Marker
              key={etapa.etapa}
              position={etapa.coords as [number, number]}
              icon={markerIcon}
            >
              <Popup>
                <div style={{ fontFamily: "sans-serif", fontSize: "13px" }}>
                  <p style={{ fontWeight: 700, marginBottom: 2 }}>Etapa {etapa.etapa}</p>
                  {etapa.corredores && <p style={{ color: "#475569" }}>{etapa.corredores}</p>}
                  {etapa.km && <p style={{ color: "#475569" }}>{etapa.km} km · +{etapa.desnivell} m</p>}
                  {etapa.tramo && <p style={{ color: "#94a3b8", fontSize: "11px", marginTop: 4 }}>{etapa.tramo}</p>}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Stage list */}
      <div className="w-full md:w-1/3 max-h-[50vh] md:max-h-[520px] overflow-y-auto flex flex-col gap-2 pr-1">
        {data.map((etapa) => (
          <div key={etapa.etapa}
            className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-barlow)] text-xs font-semibold tracking-widest uppercase text-amber-400">
                Etapa {etapa.etapa}
              </span>
              {etapa.km && <span className="text-slate-400 text-xs">{etapa.km} km</span>}
            </div>
            {etapa.corredores && <p className="text-slate-200 text-sm font-medium">{etapa.corredores}</p>}
            {etapa.tramo && <p className="text-slate-500 text-xs">{etapa.tramo}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add components/InteractiveMap.tsx
git commit -m "feat: InteractiveMap with react-leaflet, amber markers, mobile list sidebar"
```

---

### Task 6: Update page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Rewrite page.tsx**

```tsx
import dynamic from "next/dynamic";
import { Users } from "lucide-react";
import SenglarLogo from "@/components/SenglarLogo";
import DashboardRecords from "@/components/DashboardRecords";

const InteractiveMap = dynamic(() => import("@/components/InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[50vh] rounded-2xl bg-slate-800 animate-pulse border border-slate-700" />
  ),
});

export default function Home() {
  const eventName = "Oncodines Trail";
  const teamName = "Senglars de Bardissa";
  const subtitle = "Una etapa. Un equip. Una gesta.";

  return (
    <main className="flex-1 flex flex-col w-full">

      {/* ── Hero ───────────────────────────────── */}
      <section className="bg-slate-900 flex flex-col items-center px-4 py-14 gap-8 max-w-3xl mx-auto w-full">
        <SenglarLogo className="w-24 h-24" />

        <div className="flex flex-col items-center gap-4 text-center">
          {eventName && (
            <span className="inline-block px-4 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold tracking-widest uppercase">
              {eventName}
            </span>
          )}
          {teamName && (
            <h1 className="font-[family-name:var(--font-barlow)] text-4xl sm:text-6xl font-bold tracking-tight text-slate-50 leading-tight">
              {teamName}
            </h1>
          )}
          {subtitle && (
            <p className="text-slate-400 text-lg sm:text-xl max-w-md leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold tracking-wide uppercase">
            <Users size={14} />
            <span>L&apos;Equip</span>
          </div>
          <div className="w-full aspect-video rounded-2xl bg-slate-800 border border-slate-700 shadow-xl shadow-black/50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-slate-600">
              <Users size={40} strokeWidth={1} />
              <p className="text-sm tracking-wide">Foto de l&apos;equip</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mapa ───────────────────────────────── */}
      <section className="bg-slate-800/50 border-y border-slate-800 px-4 py-12">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          <h2 className="font-[family-name:var(--font-barlow)] text-2xl font-bold tracking-tight text-slate-50">
            La Ruta
          </h2>
          <InteractiveMap />
        </div>
      </section>

      {/* ── Dashboard ──────────────────────────── */}
      <section className="bg-slate-900 px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <DashboardRecords />
        </div>
      </section>

    </main>
  );
}
```

- [ ] **Step 2: Verify types compile**
```bash
npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit all**
```bash
git add app/page.tsx
git commit -m "feat: integrate hero, mapa and dashboard into page.tsx"
```

---

## Self-Review

**Spec coverage:**
- ✅ 11-stage `ruta.json` with `coords`, `ritme`, `desnivell`, `km`, `tiempo`, `corredores`
- ✅ `SenglarLogo` SVG: boar head profile + bristles + amber tusk + amber bramble branches
- ✅ `SenglarLogo` reusable via `className` prop — `w-8 h-8` in Navbar, `w-24 h-24` in Hero
- ✅ `InteractiveMap`: centered [41.69, 2.21], Polyline, Markers, Popup with Etapa/Corredores/km
- ✅ Mobile: map `h-[50vh]`, stage list stacks below; Desktop: side-by-side `md:flex-row`
- ✅ `DashboardRecords`: fastest ritme, max desnivell, max km, total km+desnivell
- ✅ `page.tsx`: 3 sections with `bg-slate-900` / `bg-slate-800/50` alternation
- ✅ Conditional rendering `{dato && ...}` throughout
- ✅ `Navbar` updated with `SenglarLogo`

**Type consistency:** `Etapa` type shape is identical in both `DashboardRecords.tsx` and `InteractiveMap.tsx`. Field `corredores` used consistently (matches source JSON).

**Placeholder scan:** No TBDs, no incomplete steps.
