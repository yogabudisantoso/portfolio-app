"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiLaravel,
  SiNextdotjs,
  SiJavascript,
  SiSpring,
  SiGo,
  SiDotnet,
  SiOllama,
  SiGithub,
  SiGit,
  SiExpress,
  SiNodedotjs,
  SiMysql,
  SiTailwindcss,
  SiBootstrap,
  SiDocker,
  SiPostman,
  SiGooglecloud,
  SiGnubash,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { cn } from "@/lib/utils";

const TWEEN = { type: "tween" as const, ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number], duration: 0.25 };

interface Skill {
  name: string;
  Icon: React.ElementType;
  color: string;
  category: "Frontend" | "Backend" | "Database" | "Tools";
}

const skills: Skill[] = [
  { name: "Laravel", Icon: SiLaravel, color: "#FF2D20", category: "Backend" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF", category: "Frontend" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", category: "Frontend" },
  { name: "Java Spring", Icon: SiSpring, color: "#6DB33F", category: "Backend" },
  { name: "Golang", Icon: SiGo, color: "#00ADD8", category: "Backend" },
  { name: ".NET", Icon: SiDotnet, color: "#512BD4", category: "Backend" },
  { name: "Ollama", Icon: SiOllama, color: "#FFFFFF", category: "Tools" },
  { name: "GitHub", Icon: SiGithub, color: "#FFFFFF", category: "Tools" },
  { name: "Git", Icon: SiGit, color: "#F05032", category: "Tools" },
  { name: "Express", Icon: SiExpress, color: "#FFFFFF", category: "Backend" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933", category: "Backend" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1", category: "Database" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4", category: "Frontend" },
  { name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3", category: "Frontend" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED", category: "Tools" },
  { name: "Postman", Icon: SiPostman, color: "#FF6C37", category: "Tools" },
  { name: "AWS", Icon: FaAws, color: "#FFFFFF", category: "Backend" },
  { name: "Google Cloud", Icon: SiGooglecloud, color: "#4285F4", category: "Backend" },
  { name: "Bash", Icon: SiGnubash, color: "#4EAA25", category: "Tools" },
];

const categories = ["All", "Frontend", "Backend", "Database", "Tools"];

export function SkillsSection() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );

  return (
    <section className="flex flex-col p-10 rounded-3xl border border-border bg-card">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-2 text-foreground">
            <span className="text-muted-foreground">{"</>"}</span> {t("tech.title")}
          </h2>
          <p className="text-muted-foreground text-lg">{t("tech.desc")}</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "relative px-4 py-1.5 rounded-full text-sm font-medium border",
                activeCategory === cat
                  ? "border-transparent text-background"
                  : "bg-transparent text-foreground hover:bg-muted border-border"
              )}
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={TWEEN}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <AnimatePresence initial={false}>
          {filteredSkills.map((skill, i) => {
            const isNeutral = skill.color === "#FFFFFF" || skill.color === "#000000";

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0, transition: { ...TWEEN, delay: i * 0.025 } }}
                exit={{ opacity: 0, y: -4, transition: { ...TWEEN, delay: 0, duration: 0.15 } }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full border cursor-default hover:opacity-80",
                  isNeutral
                    ? "bg-foreground/5 border-foreground/10 text-foreground"
                    : "text-foreground"
                )}
                style={
                  !isNeutral
                    ? {
                      backgroundColor: `${skill.color}15`,
                      borderColor: `${skill.color}40`,
                    }
                    : undefined
                }
              >
                <skill.Icon
                  className={cn("w-5 h-5 object-contain", isNeutral && "text-foreground")}
                  style={!isNeutral ? { color: skill.color } : undefined}
                />
                <span className="text-sm font-medium">{skill.name}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
