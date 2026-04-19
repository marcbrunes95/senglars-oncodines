"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, LayersControl } from "react-leaflet";
import etapes from "@/app/data/ruta.json";

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

interface InteractiveMapProps {
  selectedId: number;
  onSelect: (id: number) => void;
}

const data = etapes as Etapa[];
const positions = data.map((e) => e.coords as [number, number]);

const defaultIcon = L.divIcon({
  className: "",
  html: `<div style="width:12px;height:12px;border-radius:50%;background:#f59e0b;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.5)"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

const activeIcon = L.divIcon({
  className: "",
  html: `<div style="width:20px;height:20px;border-radius:50%;background:#f59e0b;border:3px solid white;box-shadow:0 0 0 4px rgba(245,158,11,0.35),0 2px 8px rgba(0,0,0,0.6)"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const CENTER: [number, number] = [41.69, 2.21];

export default function InteractiveMap({ selectedId, onSelect }: InteractiveMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row gap-4">
      {/* Map */}
      <div className="w-full md:w-2/3 h-[42vh] md:h-[480px] rounded-2xl overflow-hidden border border-slate-700 shadow-xl shadow-black/40">
        <MapContainer
          ref={mapRef}
          center={CENTER}
          zoom={11}
          style={{ width: "100%", height: "100%" }}
          scrollWheelZoom={true}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Satèl·lit">
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="Tiles &copy; Esri &mdash; Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP"
              />
            </LayersControl.BaseLayer>
          </LayersControl>
          <Polyline
            positions={positions}
            pathOptions={{ color: "#f59e0b", weight: 3, opacity: 0.85 }}
          />
          {data.map((etapa) => (
            <Marker
              key={etapa.etapa}
              position={etapa.coords as [number, number]}
              icon={etapa.etapa === selectedId ? activeIcon : defaultIcon}
              eventHandlers={{ click: () => onSelect(etapa.etapa) }}
            >
              <Popup>
                <div style={{ fontFamily: "sans-serif", fontSize: "13px", lineHeight: "1.5" }}>
                  <p style={{ fontWeight: 700, marginBottom: 2 }}>Etapa {etapa.etapa}</p>
                  {etapa.corredores && (
                    <p style={{ color: "#475569" }}>{etapa.corredores}</p>
                  )}
                  {etapa.km && (
                    <p style={{ color: "#475569" }}>{etapa.km} km · +{etapa.desnivell} m</p>
                  )}
                  {etapa.tramo && (
                    <p style={{ color: "#94a3b8", fontSize: "11px", marginTop: 4 }}>{etapa.tramo}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Llista d'etapes clicable */}
      <div className="w-full md:w-1/3 max-h-[42vh] md:max-h-[480px] overflow-y-auto flex flex-col gap-2 pr-1">
        {data.map((etapa) => (
          <button
            key={etapa.etapa}
            onClick={() => onSelect(etapa.etapa)}
            className={`w-full text-left rounded-xl border px-4 py-3 flex flex-col gap-1 transition-all duration-150 ${
              etapa.etapa === selectedId
                ? "bg-amber-400/10 border-amber-400 ring-2 ring-amber-400/30"
                : "bg-slate-800 border-slate-700 hover:border-slate-500 hover:bg-slate-700/50"
            }`}
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
          </button>
        ))}
      </div>
    </div>
  );
}
