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
                <div style={{ fontFamily: "sans-serif", fontSize: "13px", lineHeight: "1.5" }}>
                  <p style={{ fontWeight: 700, marginBottom: 2 }}>Etapa {etapa.etapa}</p>
                  {etapa.corredores && (
                    <p style={{ color: "#475569" }}>{etapa.corredores}</p>
                  )}
                  {etapa.km && (
                    <p style={{ color: "#475569" }}>
                      {etapa.km} km · +{etapa.desnivell} m
                    </p>
                  )}
                  {etapa.tramo && (
                    <p style={{ color: "#94a3b8", fontSize: "11px", marginTop: 4 }}>
                      {etapa.tramo}
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Stage list — scrollable sidebar */}
      <div className="w-full md:w-1/3 max-h-[50vh] md:max-h-[520px] overflow-y-auto flex flex-col gap-2 pr-1">
        {data.map((etapa) => (
          <div
            key={etapa.etapa}
            className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 flex flex-col gap-1"
          >
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-barlow)] text-xs font-semibold tracking-widest uppercase text-amber-400">
                Etapa {etapa.etapa}
              </span>
              {etapa.km && (
                <span className="text-slate-400 text-xs">{etapa.km} km</span>
              )}
            </div>
            {etapa.corredores && (
              <p className="text-slate-200 text-sm font-medium">{etapa.corredores}</p>
            )}
            {etapa.tramo && (
              <p className="text-slate-500 text-xs">{etapa.tramo}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
