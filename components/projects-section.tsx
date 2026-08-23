import React from "react";
import Image from "next/image";
import { FolderGit2, BookOpen, Globe, LayoutTemplate } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    Icon: FolderGit2,
    name: "SIMAKIP UHAMKA",
    description: "Internal platform for UHAMKA to support lecturers in the Tridharma of Higher Education.",
    href: "https://simakip.uhamka.ac.id",
    cta: "Visit Platform",
    className: "col-span-3 lg:col-span-2",
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
    name: "Teknoka Uhamka 10",
    description: "Web solutions for the 10th TEKNOKA Seminar agenda, building student insights into digital technology innovations.",
    href: "https://teknoka.uhamka.ac.id",
    cta: "Visit Website",
    className: "col-span-3 lg:col-span-1",
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
    name: "Library Uhamka",
    description: "A comprehensive digital library system for managing book inventories, student borrowing records, and automated return tracking.",
    href: "https://library.uhamka.ac.id",
    cta: "Visit Library",
    className: "col-span-3 lg:col-span-3",
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
  return (
    <section className="flex flex-col p-10 rounded-3xl border border-border bg-card">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2 text-foreground">
          <FolderGit2 className="w-8 h-8 text-muted-foreground" /> 
          Featured Projects
        </h2>
        <p className="text-muted-foreground text-lg">
          A collection of my recent work and technical achievements.
        </p>
      </div>

      <BentoGrid>
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
    </section>
  );
}
