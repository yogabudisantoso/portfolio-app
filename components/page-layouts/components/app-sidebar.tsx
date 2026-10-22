"use client";

import * as React from "react";
import Image from "next/image";
import {
  Command,
  FileText,
  Home,
} from "lucide-react";

import { Linkedin } from "@/components/icons/linkedin";
import { Github } from "@/components/icons/github";
import { ThemeToggle } from "@/components/theme-toggle";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { AnimatedThemeTogglerDemo } from "@/components/ui/animated-theme-toggler-demo";
import { useLanguage } from "@/components/language-provider";
import { DockDemo } from "@/components/ui/dock-demo-2";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarFooter
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useLanguage();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="flex-col justify-center h-auto py-6 gap-3" render={<a href="#" />}>
              <div className="flex aspect-square size-24 items-center justify-center rounded-full overflow-hidden border-2 border-border shadow-sm bg-muted relative">
                <Image
                  src="/foto-saya.png"
                  alt="Yoga Budi Santoso"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center text-sm mt-1">
                <span className="font-semibold text-base block mb-1">Yoga Budi Santoso</span>
                <span className="text-muted-foreground block">{t("sidebar.role")}</span>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-yellow-500/50 bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-500">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-500"></span>
                  </span>
                  {t("sidebar.hire")}
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="pb-2 flex justify-center w-full">
            <AnimatedThemeTogglerDemo />
          </SidebarMenuItem>
          <SidebarMenuItem className="pb-4 flex justify-center w-full">
            <DockDemo />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>{t("sidebar.resume")}</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <a href="/cv-yoga-budi-santoso.pdf" target="_blank" rel="noopener noreferrer" className="w-full block mt-2">
                <HoverBorderGradient
                  containerClassName="w-full rounded-lg"
                  className="w-full dark:bg-black bg-white text-black dark:text-white flex items-center justify-center space-x-2 text-sm py-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>{t("sidebar.view_cv")}</span>
                </HoverBorderGradient>
              </a>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  );
}
