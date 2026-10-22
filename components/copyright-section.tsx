"use client";

import React from "react";
import { useLanguage } from "@/components/language-provider";
import { Copyright, FileBadge, ExternalLink } from "lucide-react";

const certificates = [
  {
    id: 1,
    titleKey: "copyright.1.title",
    file: "/sertifikat_2026-06-25 (1)-2.pdf",
  },
  {
    id: 2,
    titleKey: "copyright.2.title",
    file: "/sertifikat_EC00202465860-1.pdf",
  },
  {
    id: 3,
    titleKey: "copyright.3.title",
    file: "/sertifikat_EC002024218461_SIPADUWITMI.pdf",
  },
];

export function CopyrightSection() {
  const { t } = useLanguage();

  return (
    <section className="flex flex-col p-10 rounded-3xl border border-border bg-card">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2 text-foreground">
          <Copyright className="w-8 h-8 text-muted-foreground" /> {t("copyright.title")}
        </h2>
        <p className="text-muted-foreground text-lg">{t("copyright.desc")}</p>
      </div>

      <ul className="space-y-4">
        {certificates.map((cert) => (
          <li key={cert.id}>
            <a
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-2xl border border-border bg-muted/20 p-5 hover:bg-muted/50 hover:border-primary/30 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <FileBadge className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-foreground leading-relaxed">{t(cert.titleKey)}</p>
                <span className="text-xs text-primary mt-1 flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
                  {t("copyright.open")} <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
