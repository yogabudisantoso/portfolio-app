"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

import { GlyphMatrix } from "@/components/ui/glyph-matrix"

export function GlyphMatrixDemo() {
  const { resolvedTheme } = useTheme()
  // Start neutral so the first frame is visible in both themes, then adopt
  // the resolved theme color once it's known.
  const [color, setColor] = useState("#6B7280")

  useEffect(() => {
    if (!resolvedTheme) return
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000")
  }, [resolvedTheme])

  return (
    <div className="absolute inset-0 bg-background z-0 overflow-hidden flex items-center justify-center">
      {/* Ambient glowing orbs for depth */}
      <div className="absolute -top-[40%] -left-[10%] w-[70%] h-[70%] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen dark:bg-blue-500/10"></div>
      <div className="absolute -bottom-[40%] -right-[10%] w-[70%] h-[70%] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen dark:bg-purple-500/10"></div>
      
      <GlyphMatrix
        glyphs="01·•+*/\<>="
        cellSize={14}
        mutationRate={0.04}
        interval={90}
        fadeBottom={0.6}
        color={color}
      />
      
      {/* Vignette effect to fade edges into background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40 pointer-events-none" />
    </div>
  )
}
