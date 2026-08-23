"use client";

import React from "react";
import { useLanguage } from "@/components/language-provider";
import { FileBadge, ExternalLink } from "lucide-react";

const certificates = [
  {
    id: 1,
    title: "Sertifikat Hak Cipta 1",
    file: "/sertifikat_2026-06-25 (1)-2.pdf"
  },
  {
    id: 2,
    title: "Sertifikat Hak Cipta 2",
    file: "/sertifikat_EC00202465860-1.pdf"
  },
  {
    id: 3,
    title: "Sertifikat Hak Cipta 3",
    file: "/sertifikat_EC002024218461_SIPADUWITMI.pdf"
  }
];

export function CopyrightSection() {
  const { t } = useLanguage();

  // Create enough items to fill a wide screen multiple times for seamless looping
  const baseItems = [...certificates, ...certificates, ...certificates];

  return (
    <section className="flex flex-col p-10 rounded-3xl border border-border bg-card mt-6 overflow-hidden">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2 text-foreground">
          <span className="text-muted-foreground">©</span> {t("copyright.title")}
        </h2>
        <p className="text-muted-foreground text-lg">
          {t("copyright.desc")}
        </p>
      </div>

      <div className="relative flex overflow-hidden group -mx-10 px-10">
        {/* Left and Right Fade effect */}
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />
        
        {/* Marquee Container */}
        <div className="flex w-full group-hover:[animation-play-state:paused] py-4">
          <div className="flex gap-4 pr-4 w-max shrink-0 animate-[marquee_20s_linear_infinite] group-hover:[animation-play-state:paused]">
            {baseItems.map((cert, i) => (
              <a 
                key={i}
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[280px] md:w-[320px] flex-shrink-0 p-5 rounded-2xl border border-border bg-muted/20 hover:bg-muted/50 hover:border-primary/30 transition-all flex items-center gap-4 group/card shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover/card:scale-110 group-hover/card:bg-primary/20 transition-all flex-shrink-0">
                  <FileBadge className="w-6 h-6" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="font-semibold text-foreground text-sm truncate">{cert.title}</span>
                  <span className="text-xs text-primary mt-1 flex items-center gap-1 opacity-80 group-hover/card:opacity-100 transition-opacity">
                    Buka Dokumen <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
          <div className="flex gap-4 pr-4 w-max shrink-0 animate-[marquee_20s_linear_infinite] group-hover:[animation-play-state:paused]" aria-hidden="true">
            {baseItems.map((cert, i) => (
              <a 
                key={`dup-${i}`}
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[280px] md:w-[320px] flex-shrink-0 p-5 rounded-2xl border border-border bg-muted/20 hover:bg-muted/50 hover:border-primary/30 transition-all flex items-center gap-4 group/card shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover/card:scale-110 group-hover/card:bg-primary/20 transition-all flex-shrink-0">
                  <FileBadge className="w-6 h-6" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="font-semibold text-foreground text-sm truncate">{cert.title}</span>
                  <span className="text-xs text-primary mt-1 flex items-center gap-1 opacity-80 group-hover/card:opacity-100 transition-opacity">
                    Buka Dokumen <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
