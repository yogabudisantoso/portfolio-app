"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { AppHeader } from "./components/app-header";
import { TypingAnimation } from "@/components/ui/typing-animation";
import AnimatedText from "@/components/ui/animated-text";
import Image from "next/image";
import {
  Changelog,
  ChangelogItem,
  ChangelogItemTitle,
  ChangelogItemDescription,
  ChangelogItemVersion,
} from "@/components/ui/changelog";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { CopyrightSection } from "@/components/copyright-section";
import { useLanguage } from "@/components/language-provider";

export default function PortfolioLayout({ children }: { children?: React.ReactNode }) {
  const { t } = useLanguage();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-1 flex-col gap-6 p-8 pt-4 w-full">
          {/* Hero Section */}
          <section
            className="relative overflow-hidden rounded-3xl p-10 border border-border"
          >
            <Image
              src="/background.png"
              alt="Background"
              fill
              className="object-cover absolute inset-0 z-0"
              priority
            />
            
            <div className="relative z-10 space-y-4 md:w-3/4">
              <TypingAnimation
                words={[t("hero.titles_0"), t("hero.titles_1"), t("hero.titles_2")]}
                className="text-left text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight drop-shadow-lg"
                loop={true}
                duration={100}
                pauseDelay={2000}
              />
              <AnimatedText
                key={t("hero.desc")}
                text={t("hero.desc")}
                className="max-w-2xl text-lg text-white/90 font-medium drop-shadow-md"
                animationType="words"
                staggerDelay={0.02}
                duration={0.6}
              />
            </div>
          </section>

          {/* Experience Section */}
          <section className="flex flex-col p-10 rounded-3xl border border-border bg-card">
            <h2 className="text-3xl font-bold mb-8 text-foreground">
              {t("exp.title")}
            </h2>
            
            <Changelog>
              <ChangelogItem date="Sep 2025 - Present">
                <ChangelogItemVersion>{t("exp.1.ver")}</ChangelogItemVersion>
                <ChangelogItemTitle>{t("exp.1.title")}</ChangelogItemTitle>
                <ChangelogItemDescription>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>{t("exp.1.desc1")}</li>
                    <li>{t("exp.1.desc2")}</li>
                  </ul>
                </ChangelogItemDescription>
              </ChangelogItem>

              <ChangelogItem date="Oct 2025 - Apr 2026">
                <ChangelogItemVersion>{t("exp.2.ver")}</ChangelogItemVersion>
                <ChangelogItemTitle>{t("exp.2.title")}</ChangelogItemTitle>
                <ChangelogItemDescription>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>{t("exp.2.desc1")}</li>
                    <li>{t("exp.2.desc2")}</li>
                  </ul>
                </ChangelogItemDescription>
              </ChangelogItem>

              <ChangelogItem date="Mar 2026 - Jun 2026">
                <ChangelogItemVersion>{t("exp.3.ver")}</ChangelogItemVersion>
                <ChangelogItemTitle>{t("exp.3.title")}</ChangelogItemTitle>
                <ChangelogItemDescription>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>{t("exp.3.desc1")}</li>
                    <li>{t("exp.3.desc2")}</li>
                  </ul>
                </ChangelogItemDescription>
              </ChangelogItem>

              <ChangelogItem date="Jun 2026">
                <ChangelogItemVersion>{t("exp.4.ver")}</ChangelogItemVersion>
                <ChangelogItemTitle>{t("exp.4.title")}</ChangelogItemTitle>
                <ChangelogItemDescription>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>{t("exp.4.desc1")}</li>
                    <li>{t("exp.4.desc2")}</li>
                  </ul>
                </ChangelogItemDescription>
              </ChangelogItem>

              <ChangelogItem date="Mar 2025 - Jun 2026">
                <ChangelogItemVersion>{t("exp.5.ver")}</ChangelogItemVersion>
                <ChangelogItemTitle>{t("exp.5.title")}</ChangelogItemTitle>
                <ChangelogItemDescription>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>{t("exp.5.desc1")}</li>
                  </ul>
                </ChangelogItemDescription>
              </ChangelogItem>

              <ChangelogItem date="Feb 2025 - Jun 2026">
                <ChangelogItemVersion>{t("exp.6.ver")}</ChangelogItemVersion>
                <ChangelogItemTitle>{t("exp.6.title")}</ChangelogItemTitle>
                <ChangelogItemDescription>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>{t("exp.6.desc1")}</li>
                    <li>{t("exp.6.desc2")}</li>
                  </ul>
                </ChangelogItemDescription>
              </ChangelogItem>

              <ChangelogItem date="Oct 2024 - Jun 2026">
                <ChangelogItemVersion>{t("exp.7.ver")}</ChangelogItemVersion>
                <ChangelogItemTitle>{t("exp.7.title")}</ChangelogItemTitle>
                <ChangelogItemDescription>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>{t("exp.7.desc1")}</li>
                    <li>{t("exp.7.desc2")}</li>
                  </ul>
                </ChangelogItemDescription>
              </ChangelogItem>

              <ChangelogItem date="Sep 2024 - Jun 2026">
                <ChangelogItemVersion>{t("exp.8.ver")}</ChangelogItemVersion>
                <ChangelogItemTitle>{t("exp.8.title")}</ChangelogItemTitle>
                <ChangelogItemDescription>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>{t("exp.8.desc1")}</li>
                    <li>{t("exp.8.desc2")}</li>
                  </ul>
                </ChangelogItemDescription>
              </ChangelogItem>

              <ChangelogItem date="Sep 2023 - Jun 2026">
                <ChangelogItemVersion>{t("exp.9.ver")}</ChangelogItemVersion>
                <ChangelogItemTitle>{t("exp.9.title")}</ChangelogItemTitle>
                <ChangelogItemDescription>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>{t("exp.9.desc1")}</li>
                    <li>{t("exp.9.desc2")}</li>
                  </ul>
                </ChangelogItemDescription>
              </ChangelogItem>
            </Changelog>
          </section>

          {/* Skills Section */}
          <SkillsSection />
          
          {/* Projects Section */}
          <ProjectsSection />

          {/* Copyright Section */}
          <CopyrightSection />

          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
