"use client";

import dynamic from "next/dynamic";

interface MapWrapperProps {
  selectedId: number;
  onSelect: (id: number) => void;
}

const InteractiveMap = dynamic(() => import("@/components/InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[50vh] rounded-2xl bg-slate-800 animate-pulse border border-slate-700" />
  ),
});

export default function MapWrapper({ selectedId, onSelect }: MapWrapperProps) {
  return <InteractiveMap selectedId={selectedId} onSelect={onSelect} />;
}
