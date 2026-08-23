"use client";

import dynamic from "next/dynamic";

// Memuat komponen secara dinamis hanya saat di environment development
// Ini memastikan 'agentation' tidak akan dimasukkan ke dalam bundle production
const Agentation = process.env.NODE_ENV === "development" 
  ? dynamic(() => import("agentation").then((mod) => mod.Agentation), { ssr: false }) 
  : () => null;

export function AgentationWrapper() {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <Agentation
      endpoint="http://localhost:4747"
      onSessionCreated={(sessionId: string) => {
        console.log("Session started:", sessionId);
      }}
    />
  );
}
