"use client";

import React from "react";
import Image from "next/image";
import { FolderGit2, BookOpen, Globe } from "lucide-react";
import { BentoCard } from "@/components/ui/bento-grid";
import { useLanguage } from "@/components/language-provider";

const features = [
  {
    Icon: FolderGit2,
    name: "SIMAKIP UHAMKA",
    description:
      "Research, community service, and publication performance management information system with real-time proposal tracking, objective reviewer assessment, and an integrated publication catalog.",
    href: "https://simakip.uhamka.ac.id",
    cta: "Visit Platform",
    className: "",
    background: (
      <div className="absolute top-0 right-0 h-full w-full transition-all duration-300 ease-out group-hover:scale-105">
        <Image
          src="/simakip-project.png"
          alt="SIMAKIP UHAMKA"
          fill
          className="object-cover object-top"
        />
        {/* Gradient overlay to protect text legibility in both light and dark mode */}
        <div className="absolute inset-0 bg-gradient-to-t from-background from-20% via-background/80 via-50% to-transparent to-100%" />
      </div>
    ),
  },
  {
    Icon: Globe,
    name: "TEKNOKA 10 UHAMKA",
    description:
      "Website for the 10th FTII UHAMKA TEKNOKA National Seminar, covering participant registration, paper submission, and review tracking.",
    href: "https://teknoka.uhamka.ac.id",
    cta: "Visit Website",
    className: "",
    background: (
      <div className="absolute top-0 right-0 h-full w-full transition-all duration-300 ease-out group-hover:scale-105">
        <Image
          src="/teknoka-project.png"
          alt="TEKNOKA UHAMKA"
          fill
          className="object-cover object-top"
        />
        {/* Gradient overlay to protect text legibility in both light and dark mode */}
        <div className="absolute inset-0 bg-gradient-to-t from-background from-20% via-background/80 via-50% to-transparent to-100%" />
      </div>
    ),
  },
  {
    Icon: BookOpen,
    name: "Library UHAMKA",
    description:
      "Web-based digital library system (Laravel, modular architecture) managing book inventories, student borrowing records, and automated return tracking.",
    href: "https://library.uhamka.ac.id",
    cta: "Visit Library",
    className: "",
    background: (
      <div className="absolute top-0 right-0 h-full w-full transition-all duration-300 ease-out group-hover:scale-105">
        <Image
          src="/library-project.png"
          alt="Library UHAMKA"
          fill
          className="object-cover object-top"
        />
        {/* Gradient overlay to protect text legibility in both light and dark mode */}
        <div className="absolute inset-0 bg-gradient-to-t from-background from-20% via-background/80 via-50% to-transparent to-100%" />
      </div>
    ),
  },
];

export function ProjectsSection() {
  const { t } = useLanguage();

  // Dua track identik agar looping marquee mulus (tanpa jeda)
  const tracks = [features, features];

  return (
    <section className="flex flex-col p-10 rounded-3xl border border-border bg-card overflow-hidden">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2 text-foreground">
          <FolderGit2 className="w-8 h-8 text-muted-foreground" />
          {t("projects.title")}
        </h2>
        <p className="text-muted-foreground text-lg">
          {t("projects.desc")}
        </p>
      </div>

      <div className="relative group -mx-10 px-10">
        {/* Fade effect kiri & kanan */}
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />

        <div className="flex w-full py-2">
          {tracks.map((track, trackIndex) => (
            <div
              key={trackIndex}
              aria-hidden={trackIndex === 1}
              className="flex gap-4 pr-4 w-max shrink-0 animate-[marquee_60s_linear_infinite] group-hover:[animation-play-state:paused]"
            >
              {track.map((feature, idx) => (
                <BentoCard
                  key={`${trackIndex}-${idx}`}
                  {...feature}
                  className="w-[300px] md:w-[460px] h-[22rem] shrink-0"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
