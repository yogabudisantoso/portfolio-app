"use client";

import React from "react";
import { BookMarked, ExternalLink } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

const publications: { titleKey: string; href?: string }[] = [
  {
    titleKey: "pub.1.title",
    href: "https://journal.ummat.ac.id/index.php/jmm/article/view/27577",
  },
  {
    titleKey: "pub.2.title",
    href: "https://journal.uhamka.ac.id/index.php/teknoka/article/view/13785",
  },
];

export function PublicationsSection() {
  const { t } = useLanguage();

  return (
    <section className="flex flex-col p-10 rounded-3xl border border-border bg-card">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2 text-foreground">
          <BookMarked className="w-8 h-8 text-muted-foreground" /> {t("pub.title")}
        </h2>
        <p className="text-muted-foreground text-lg">{t("pub.desc")}</p>
      </div>

      <ul className="space-y-4">
        {publications.map((pub) => {
          const content = (
            <>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <BookMarked className="w-5 h-5" />
              </div>
              <p className="text-foreground leading-relaxed flex-1">{t(pub.titleKey)}</p>
              {pub.href && (
                <ExternalLink className="w-4 h-4 text-primary flex-shrink-0 mt-1 opacity-70 group-hover/pub:opacity-100 transition-opacity" />
              )}
            </>
          );

          return (
            <li key={pub.titleKey}>
              {pub.href ? (
                <a
                  href={pub.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/pub flex items-start gap-4 rounded-2xl border border-border bg-muted/20 p-5 hover:bg-muted/50 hover:border-primary/30 transition-all"
                >
                  {content}
                </a>
              ) : (
                <div className="flex items-start gap-4 rounded-2xl border border-border bg-muted/20 p-5">
                  {content}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
