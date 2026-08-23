"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "US" | "ID";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  US: {
    "sidebar.role": "Software Engineer",
    "sidebar.hire": "Hire Me",
    "sidebar.resume": "Resume",
    "sidebar.view_cv": "View CV / Resume",
    "nav.home": "Home",
    "tech.title": "Tech Stack",
    "tech.desc": "Tools & Technologies I use.",
    "hero.titles_0": "Software Engineer",
    "hero.titles_1": "Research Assistant",
    "hero.titles_2": "Library Assistant",
    "hero.desc": "I am a final-year Informatics Engineering student and Software Engineer with 4 years of experience building web apps and cloud solutions. Currently an AI Research Assistant and former Cloud Computing Lead at GDSC, I am passionate about crafting innovative, efficient, and user-centered digital experiences.",
    "exp.title": "Experience & Journey",
    "exp.1.ver": "Mentorship",
    "exp.1.title": "Student Mentor | Junge Leiter",
    "exp.1.desc1": "Provided mentees with in-depth understanding of course completion strategies for timely graduation.",
    "exp.1.desc2": "Mentored students through strategic IT career roadmaps, maintaining a high-quality mentoring standard with a 98% satisfaction rate.",
    "exp.2.ver": "Cloud Computing",
    "exp.2.title": "Facilitator | Google Cloud Arcade",
    "exp.2.desc1": "Led and facilitated a learning community exploring Google Cloud technologies via Google Cloud Skills Boost.",
    "exp.2.desc2": "Provided technical troubleshooting guidance, hosted sharing sessions, and maintained high participant engagement to ensure successful lab completions and digital badge acquisitions.",
    "exp.3.ver": "Software Engineering",
    "exp.3.title": "Software Engineer | SIMAKIP UHAMKA",
    "exp.3.desc1": "Developed the internal platform for Universitas Muhammadiyah Prof. Dr. HAMKA to support lecturers in the Tridharma of Higher Education.",
    "exp.3.desc2": "Streamlined the administration of academic research and community service programs.",
    "exp.4.ver": "Research",
    "exp.4.title": "Robotics Researcher | FTII UHAMKA",
    "exp.4.desc1": "Contributed to innovative robotics technology development as part of the core team representing UHAMKA at the Indonesia Specialist Robot Competition (KSRI) 2022 for quadruped robots.",
    "exp.4.desc2": "Conducted in-depth research on robot control systems and mechanics to ensure stable maneuvering across various terrains.",
    "exp.5.ver": "Software Engineering",
    "exp.5.title": "Software Engineer | TEKNOKA 10 UHAMKA",
    "exp.5.desc1": "Built web solutions for the 10th TEKNOKA Seminar agenda, held annually to build student insights into digital technology innovations.",
    "exp.6.ver": "University Systems",
    "exp.6.title": "Assistant Library | FTII UHAMKA",
    "exp.6.desc1": "Maintained academic integrity by checking student papers for plagiarism using Turnitin.",
    "exp.6.desc2": "Assisted students with graduation-required library administration and provided technical guidance on proper academic citation.",
    "exp.7.ver": "Software Engineering",
    "exp.7.title": "Software Engineer | PKM CENTER UHAMKA",
    "exp.7.desc1": "Designed an intuitive and responsive UI using HTML, CSS, JavaScript, and Bootstrap as a Frontend Developer.",
    "exp.7.desc2": "Collaborated with the backend team for seamless API integration, enhancing personal web development skills while supporting student projects.",
    "exp.8.ver": "Cloud Computing",
    "exp.8.title": "Cloud Computing Cohort | Bangkit Academy",
    "exp.8.desc1": "Mastered cloud concepts and Google Cloud Platform, created API endpoints, developed scalable applications, and implemented security best practices.",
    "exp.8.desc2": "Served as Capstone Project Manager, demonstrating strong leadership and expertise in delivering advanced technological solutions.",
    "exp.9.ver": "Leadership",
    "exp.9.title": "Core Team Curriculum & Cloud Computing Lead | GDSC UHAMKA",
    "exp.9.desc1": "Designed the Cloud Computing curriculum covering cloud architecture, Google Cloud services, and security.",
    "exp.9.desc2": "Organized workshops, developed hands-on practicum projects, and honed leadership skills while deepening cloud computing expertise.",
    "sidebar.platform": "Platform",
    "sidebar.projects": "Projects",
    "copyright.title": "Hak Cipta",
    "copyright.desc": "Certificates of copyright for my digital works.",
    "testimonials.title": "Testimonials",
    "testimonials.desc": "What people say about me.",
  },
  ID: {
    "sidebar.role": "Insinyur Perangkat Lunak",
    "sidebar.hire": "Rekrut Saya",
    "sidebar.resume": "Riwayat Hidup",
    "sidebar.view_cv": "Lihat CV / Resume",
    "sidebar.platform": "Menu Utama",
    "sidebar.projects": "Proyek",
    "nav.home": "Beranda",
    "tech.title": "Tumpukan Teknologi",
    "tech.desc": "Alat & Teknologi yang saya gunakan.",
    "hero.titles_0": "Insinyur Perangkat Lunak",
    "hero.titles_1": "Asisten Peneliti",
    "hero.titles_2": "Asisten Perpustakaan",
    "hero.desc": "Saya adalah mahasiswa Teknik Informatika tingkat akhir dan Insinyur Perangkat Lunak dengan 4 tahun pengalaman membangun aplikasi web dan solusi cloud. Saat ini saya adalah Asisten Peneliti AI dan mantan Lead Cloud Computing di GDSC, bersemangat dalam menciptakan pengalaman digital yang inovatif, efisien, dan berpusat pada pengguna.",
    "exp.title": "Pengalaman & Perjalanan",
    "exp.1.ver": "Mentorship",
    "exp.1.title": "Mentor Mahasiswa | Junge Leiter",
    "exp.1.desc1": "Memberikan pemahaman mendalam kepada mentee mengenai strategi penyelesaian perkuliahan agar lulus tepat waktu.",
    "exp.1.desc2": "Membimbing mahasiswa melalui peta jalan karir IT yang strategis, mempertahankan standar mentoring berkualitas tinggi dengan tingkat kepuasan 98%.",
    "exp.2.ver": "Cloud Computing",
    "exp.2.title": "Fasilitator | Google Cloud Arcade",
    "exp.2.desc1": "Memimpin dan memfasilitasi komunitas belajar dalam mengeksplorasi teknologi Google Cloud melalui Google Cloud Skills Boost.",
    "exp.2.desc2": "Memberikan panduan teknis, mengadakan sesi berbagi, dan menjaga antusiasme peserta untuk memastikan penyelesaian lab dan perolehan badge digital.",
    "exp.3.ver": "Software Engineering",
    "exp.3.title": "Software Engineer | SIMAKIP UHAMKA",
    "exp.3.desc1": "Mengembangkan platform internal Universitas Muhammadiyah Prof. Dr. HAMKA untuk mendukung dosen dalam pelaksanaan Tridharma Perguruan Tinggi.",
    "exp.3.desc2": "Menyederhanakan proses administrasi program penelitian dan pengabdian masyarakat.",
    "exp.4.ver": "Riset & Penelitian",
    "exp.4.title": "Peneliti Robotika | FTII UHAMKA",
    "exp.4.desc1": "Berkontribusi pada pengembangan teknologi robotika inovatif sebagai tim inti perwakilan UHAMKA di Kontes Robot Spesial Indonesia (KSRI) 2022 untuk robot berkaki empat.",
    "exp.4.desc2": "Melakukan penelitian mendalam mengenai sistem kontrol dan mekanika robot untuk memastikan manuver yang stabil di berbagai medan.",
    "exp.5.ver": "Software Engineering",
    "exp.5.title": "Software Engineer | TEKNOKA 10 UHAMKA",
    "exp.5.desc1": "Membangun solusi web untuk agenda Seminar Nasional TEKNOKA ke-10 yang diadakan setiap tahun guna menambah wawasan mahasiswa mengenai inovasi teknologi digital.",
    "exp.6.ver": "Sistem Universitas",
    "exp.6.title": "Asisten Perpustakaan | FTII UHAMKA",
    "exp.6.desc1": "Menjaga integritas akademik dengan memeriksa makalah mahasiswa dari plagiarisme menggunakan Turnitin.",
    "exp.6.desc2": "Membantu mahasiswa dengan administrasi perpustakaan sebagai syarat kelulusan dan memberikan panduan teknis mengenai kutipan akademik yang benar.",
    "exp.7.ver": "Software Engineering",
    "exp.7.title": "Software Engineer | PKM CENTER UHAMKA",
    "exp.7.desc1": "Merancang UI yang intuitif dan responsif menggunakan HTML, CSS, JavaScript, dan Bootstrap sebagai Frontend Developer.",
    "exp.7.desc2": "Berkolaborasi dengan tim backend untuk integrasi API yang lancar, meningkatkan keahlian pengembangan web pribadi sekaligus mendukung proyek mahasiswa.",
    "exp.8.ver": "Cloud Computing",
    "exp.8.title": "Kohor Cloud Computing | Bangkit Academy",
    "exp.8.desc1": "Menguasai konsep cloud dan Google Cloud Platform, membuat endpoint API, mengembangkan aplikasi yang dapat diskalakan, dan mengimplementasikan praktik terbaik keamanan.",
    "exp.8.desc2": "Bertindak sebagai Manajer Proyek Capstone, menunjukkan kepemimpinan dan keahlian yang kuat dalam memberikan solusi teknologi yang canggih.",
    "exp.9.ver": "Kepemimpinan",
    "exp.9.title": "Tim Inti Kurikulum & Lead Cloud Computing | GDSC UHAMKA",
    "exp.9.desc1": "Merancang kurikulum Cloud Computing yang mencakup arsitektur cloud, layanan Google Cloud, dan keamanan.",
    "exp.9.desc2": "Menyelenggarakan lokakarya, mengembangkan proyek praktikum langsung, dan mengasah keterampilan kepemimpinan sambil memperdalam keahlian cloud computing.",
    "copyright.title": "Hak Cipta",
    "copyright.desc": "Sertifikat hak cipta atas karya digital saya.",
    "testimonials.title": "Testimoni",
    "testimonials.desc": "Apa yang mereka katakan tentang saya.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("US");

  useEffect(() => {
    const saved = localStorage.getItem("app_lang") as Language;
    if (saved === "US" || saved === "ID") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app_lang", lang);
  };

  const t = (key: string) => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
