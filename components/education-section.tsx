"use client";

import React from "react";
import { GraduationCap } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function EducationSection() {
  const { t } = useLanguage();

  return (
    <section className="flex flex-col p-10 rounded-3xl border border-border bg-card">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2 text-foreground">
          <GraduationCap className="w-8 h-8 text-muted-foreground" /> {t("education.title")}
        </h2>
        <p className="text-muted-foreground text-lg">{t("education.desc")}</p>
      </div>

      <div className="rounded-2xl border border-border bg-muted/20 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground">{t("education.uni")}</h3>
          <p className="text-muted-foreground mt-1">{t("education.degree")}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {t("education.years")} · {t("education.location")}
          </p>
        </div>
        <span className="self-start md:self-center inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
          {t("education.gpa")}
        </span>
      </div>

      <div className="mt-5">
        <span className="text-sm font-semibold text-foreground">{t("education.coursework")}</span>
        <div className="flex flex-wrap gap-2 mt-3">
          {t("education.coursework_list")
            .split(", ")
            .map((course) => (
              <span
                key={course}
                className="px-3 py-1 rounded-full border border-border bg-muted/20 text-sm text-foreground"
              >
                {course}
              </span>
            ))}
        </div>
      </div>
    </section>
  );
}
