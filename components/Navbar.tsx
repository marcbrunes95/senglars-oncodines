"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import SenglarLogo from "@/components/SenglarLogo";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/mapa", label: "El Mapa" },
  { href: "/equip", label: "El Equipo" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-[family-name:var(--font-barlow)] text-lg font-semibold tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
        >
          <SenglarLogo className="w-8 h-8" />
          Senglars de Bardissa
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-[family-name:var(--font-barlow)] text-sm font-semibold tracking-widest uppercase text-slate-400 hover:text-amber-400 transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-slate-400 hover:text-amber-400 transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Tancar menú" : "Obrir menú"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900">
          <ul className="flex flex-col px-4 py-4 gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block font-[family-name:var(--font-barlow)] text-base font-semibold tracking-widest uppercase text-slate-300 hover:text-amber-400 transition-colors py-1"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
