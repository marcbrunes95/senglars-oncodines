# Senglars de Bardissa — Oncodines Trail: Component Design

**Date:** 2026-04-19
**Status:** Approved by user

## Scope

Create 3 new components + update 2 files to complete the Oncodines Trail web app.

## Architecture Decisions

### SSR Strategy for Leaflet
Leaflet requires `window`. The `InteractiveMap` component is a Client Component (`"use client"`), but it must also be imported via `next/dynamic({ ssr: false })` in `page.tsx` to prevent hydration errors.

### SenglarLogo — Reusable SVG
- Accepts a `className` prop for sizing
- Renders a stylized boar head with bramble/spine lines
- Colors: amber-400 and white
- Used at `w-8 h-8` in Navbar, `w-24 h-24` in Hero

### InteractiveMap — Client Component
- Centered on Vallès/Moianès region (~41.70, 2.18)
- Polyline connecting all 11 stage coords
- Markers with Popup: Etapa #, Corredors, Distància
- Mobile: map at 50vh height + scrollable stage list below
- Desktop: map fills available height

### DashboardRecords — Server Component
Calculates dynamically from imported JSON:
- El Correcaminos: min ritme (fastest pace)
- El Escalador: max desnivell
- La Etapa Reina: max km
- Resum Total: sum of km and desnivell

### page.tsx — Section Layout
1. Hero: logo + title + team photo (bg-slate-900)
2. Mapa section (bg-slate-800/50)
3. Dashboard section (bg-slate-900)

## Files to Create/Modify

| File | Action |
|---|---|
| `app/data/ruta.json` | Replace with 11-stage complete dataset |
| `components/SenglarLogo.tsx` | Create — SVG boar logo |
| `components/InteractiveMap.tsx` | Create — react-leaflet map, client |
| `components/DashboardRecords.tsx` | Create — bento grid records |
| `app/page.tsx` | Update — integrate all components |
| `components/Navbar.tsx` | Update — replace Mountain icon with SenglarLogo |
