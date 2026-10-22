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
    "hero.titles_1": "AI Research Assistant",
    "hero.desc": "Detail-oriented Software Engineer with 1 years of experience building scalable web applications, RESTful APIs, and cloud solutions. Proficient in PHP (Laravel, Livewire), Python, JavaScript (React, Next.js, Vue.js), Java Spring, Golang, and Google Cloud Platform (GCP). Currently an AI Research Assistant, with a proven track record in leading cloud computing communities, architecting institutional research platforms, and optimizing high-traffic conference systems. Skilled in Agile practices and committed to delivering secure, efficient, and maintainable software.",
    "exp.title": "Experience & Journey",
    "exp.1.ver": "AI Research",
    "exp.1.title": "AI Research Assistant | UHAMKA",
    "exp.1.desc1": "Support and optimize the entire artificial intelligence research lifecycle, from conducting comprehensive literature reviews to preparing complex datasets.",
    "exp.2.ver": "Mentorship",
    "exp.2.title": "Student Mentor | Junge Leiter",
    "exp.2.desc1": "Provided mentees with in-depth guidance on course completion strategies so they could graduate faster and on time.",
    "exp.2.desc2": "Guided students through strategic IT career roadmaps, maintaining high mentoring standards with a 98% satisfaction rate.",
    "exp.3.ver": "Cloud Computing",
    "exp.3.title": "Facilitator | Google Cloud Arcade",
    "exp.3.desc1": "Led and facilitated a learning community in exploring Google Cloud technologies through Google Cloud Skills Boost.",
    "exp.3.desc2": "Provided technical guidance, held discussion sessions, and kept participants motivated to ensure lab completion and badge acquisition.",
    "exp.4.ver": "Software Engineering",
    "exp.4.title": "Software Engineer | SIMAKIP UHAMKA",
    "exp.4.desc1": "Developed SIMAKIP UHAMKA from scratch as a centralized management platform supporting lecturers in the Tridharma of Higher Education, covering faculty research and community service proposals.",
    "exp.4.desc2": "Designed an optimized MySQL schema to manage complex review workflows and proposal lifecycles, and applied Agile/Scrum to deliver core modules on time.",
    "exp.5.ver": "Robotics Research",
    "exp.5.title": "Robotics Researcher | FTII UHAMKA",
    "exp.5.desc1": "Contributed to innovative robotics technology development (C++, Arduino IDE) as a core team member representing UHAMKA at the 2022 Indonesian Special Robot Contest (KRSI) for the four-legged robot category.",
    "exp.5.desc2": "Conducted research on robot control systems and mechanics to ensure stable maneuvers across various terrains.",
    "exp.6.ver": "Software Engineering",
    "exp.6.title": "Software Engineer | TEKNOKA 10 UHAMKA",
    "exp.6.desc1": "Built web solutions for the 10th FTII UHAMKA TEKNOKA National Seminar, held annually since 2016, to broaden students' insight into digital technology innovation.",
    "exp.6.desc2": "Engineered features for participant registration, paper submission, and review tracking, while optimizing web performance and database queries for high-traffic spikes with zero downtime.",
    "exp.7.ver": "University Systems",
    "exp.7.title": "Library Assistant | FTII UHAMKA",
    "exp.7.desc1": "Maintained academic integrity by checking students' papers for plagiarism using Turnitin.",
    "exp.7.desc2": "Assisted students with library administration required for graduation and provided technical guidance on proper academic citation.",
    "exp.8.ver": "Software Engineering",
    "exp.8.title": "Software Engineer | PKM CENTER FTII UHAMKA",
    "exp.8.desc1": "Designed intuitive and responsive user interfaces using HTML, CSS, JavaScript, and Bootstrap as a Frontend Developer, ensuring cross-device usability.",
    "exp.8.desc2": "Collaborated with the backend team (Laravel, MySQL) to deliver seamless API integration while supporting student projects.",
    "exp.9.ver": "Cloud Computing",
    "exp.9.title": "Cloud Computing Cohort & Capstone Project Manager | Bangkit Academy",
    "exp.9.desc1": "Mastered cloud concepts and Google Cloud Platform (GCP), built API endpoints, and implemented security best practices to deploy scalable applications.",
    "exp.9.desc2": "Led a cross-functional team of cloud, mobile, and machine learning engineers, architected secure RESTful APIs on Compute Engine, Cloud Run, and Cloud Storage, and implemented GCP IAM.",
    "exp.10.ver": "Leadership",
    "exp.10.title": "Head of Cloud Computing Department | GDSC UHAMKA",
    "exp.10.desc1": "Designed a Cloud Computing curriculum covering cloud architecture, Google Cloud services, and security.",
    "exp.10.desc2": "Organized local workshops, developed hands-on practical projects, and taught leadership skills while deepening cloud computing expertise.",
    "sidebar.platform": "Platform",
    "sidebar.projects": "Projects",
    "education.title": "Education",
    "education.desc": "Academic background and relevant coursework.",
    "education.uni": "Universitas Muhammadiyah Prof. Dr. Hamka",
    "education.degree": "Bachelor of Engineering in Computer Science",
    "education.location": "Jakarta, Indonesia",
    "education.years": "2022 – 2026",
    "education.gpa": "GPA: 3.68 / 4.00",
    "education.coursework": "Relevant Coursework",
    "education.coursework_list": "Data Structures & Algorithms, Database Systems, Software Engineering, Cloud Computing, Web Development",
    "projects.title": "Featured Projects",
    "projects.desc": "A collection of my recent work and technical achievements.",
    "pub.title": "Publications",
    "pub.desc": "Research works I have authored and published.",
    "pub.1.title": "“Development of an Edu-Ecotourism Village through Integrated Mentoring of the Arca Domas Thematic Village, Bogor Regency”",
    "pub.2.title": "“Programming Kinematic Angles in Robot Leg Joints to Stabilize Forward Motion of Quadruped Robots”",
    "copyright.title": "Hak Cipta",
    "copyright.desc": "Certificates of copyright for my digital works.",
    "copyright.open": "Open Document",
    "copyright.1.title": "Web-Based DDC Book Classification Using a Large Language Model (LLM)",
    "copyright.2.title": "Qossam-2: Computer Vision Teaching Aid for Colored Object Sensing on Moving Machines",
    "copyright.3.title": "SIPADUWITMI",
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
    "hero.titles_1": "Asisten Riset AI",
    "hero.desc": "Insinyur Perangkat Lunak yang teliti dengan 1 tahun pengalaman membangun aplikasi web yang skalabel, RESTful API, dan solusi cloud. Mahir dalam PHP (Laravel, Livewire), Python, JavaScript (React, Next.js, Vue.js), Java Spring, Golang, dan Google Cloud Platform (GCP). Saat ini menjadi Asisten Riset AI, dengan rekam jejak memimpin komunitas cloud computing, mengarsitektur platform riset institusional, dan mengoptimalkan sistem konferensi bertrafik tinggi. Terampil dalam praktik Agile dan berkomitmen menghadirkan perangkat lunak yang aman, efisien, dan mudah dipelihara.",
    "exp.title": "Pengalaman & Perjalanan",
    "exp.1.ver": "Riset AI",
    "exp.1.title": "Asisten Riset AI | UHAMKA",
    "exp.1.desc1": "Mendukung dan mengoptimalkan seluruh siklus riset kecerdasan buatan, mulai dari tinjauan literatur yang komprehensif hingga penyiapan dataset yang kompleks.",
    "exp.2.ver": "Mentorship",
    "exp.2.title": "Mentor Mahasiswa | Junge Leiter",
    "exp.2.desc1": "Memberikan panduan mendalam kepada mentee mengenai strategi penyelesaian perkuliahan agar lulus lebih cepat dan tepat waktu.",
    "exp.2.desc2": "Membimbing mahasiswa melalui peta jalan karir IT yang strategis, mempertahankan standar mentoring berkualitas tinggi dengan tingkat kepuasan 98%.",
    "exp.3.ver": "Cloud Computing",
    "exp.3.title": "Fasilitator | Google Cloud Arcade",
    "exp.3.desc1": "Memimpin dan memfasilitasi komunitas belajar dalam mengeksplorasi teknologi Google Cloud melalui Google Cloud Skills Boost.",
    "exp.3.desc2": "Memberikan panduan teknis, mengadakan sesi diskusi, dan menjaga antusiasme peserta untuk memastikan penyelesaian lab dan perolehan badge.",
    "exp.4.ver": "Software Engineering",
    "exp.4.title": "Software Engineer | SIMAKIP UHAMKA",
    "exp.4.desc1": "Mengembangkan SIMAKIP UHAMKA dari nol sebagai platform terpusat yang mendukung dosen dalam Tridharma Perguruan Tinggi, mencakup proposal penelitian dan pengabdian masyarakat fakultas.",
    "exp.4.desc2": "Merancang skema MySQL yang dioptimalkan untuk mengelola alur tinjauan dan siklus proposal yang kompleks, serta menerapkan Agile/Scrum untuk mengirimkan modul inti tepat waktu.",
    "exp.5.ver": "Riset Robotika",
    "exp.5.title": "Peneliti Robotika | FTII UHAMKA",
    "exp.5.desc1": "Berkontribusi pada pengembangan teknologi robotika inovatif (C++, Arduino IDE) sebagai anggota tim inti perwakilan UHAMKA di Kontes Robot Spesial Indonesia (KRSI) 2022 untuk kategori robot berkaki empat.",
    "exp.5.desc2": "Melakukan penelitian mengenai sistem kontrol dan mekanika robot untuk memastikan manuver yang stabil di berbagai medan.",
    "exp.6.ver": "Software Engineering",
    "exp.6.title": "Software Engineer | TEKNOKA 10 UHAMKA",
    "exp.6.desc1": "Membangun solusi web untuk Seminar Nasional TEKNOKA ke-10 FTII UHAMKA yang diadakan setiap tahun sejak 2016 guna menambah wawasan mahasiswa mengenai inovasi teknologi digital.",
    "exp.6.desc2": "Mengembangkan fitur pendaftaran peserta, pengumpulan paper, dan pelacakan review, serta mengoptimalkan performa web dan kueri basis data untuk lonjakan trafik tinggi tanpa downtime.",
    "exp.7.ver": "Sistem Universitas",
    "exp.7.title": "Asisten Perpustakaan | FTII UHAMKA",
    "exp.7.desc1": "Menjaga integritas akademik dengan memeriksa makalah mahasiswa dari plagiarisme menggunakan Turnitin.",
    "exp.7.desc2": "Membantu mahasiswa dengan administrasi perpustakaan sebagai syarat kelulusan dan memberikan panduan teknis mengenai kutipan akademik yang benar.",
    "exp.8.ver": "Software Engineering",
    "exp.8.title": "Software Engineer | PKM CENTER FTII UHAMKA",
    "exp.8.desc1": "Merancang antarmuka yang intuitif dan responsif menggunakan HTML, CSS, JavaScript, dan Bootstrap sebagai Frontend Developer, memastikan kenyamanan lintas perangkat.",
    "exp.8.desc2": "Berkolaborasi dengan tim backend (Laravel, MySQL) untuk integrasi API yang lancar sambil mendukung proyek-proyek mahasiswa.",
    "exp.9.ver": "Cloud Computing",
    "exp.9.title": "Kohor Cloud Computing & Manajer Proyek Capstone | Bangkit Academy",
    "exp.9.desc1": "Menguasai konsep cloud dan Google Cloud Platform (GCP), membangun endpoint API, dan mengimplementasikan praktik terbaik keamanan untuk mengembangkan aplikasi yang skalabel.",
    "exp.9.desc2": "Memimpin tim lintas fungsi (cloud, mobile, dan machine learning), mengarsitektur RESTful API yang aman di Compute Engine, Cloud Run, dan Cloud Storage, serta mengimplementasikan GCP IAM.",
    "exp.10.ver": "Kepemimpinan",
    "exp.10.title": "Kepala Departemen Cloud Computing | GDSC UHAMKA",
    "exp.10.desc1": "Merancang kurikulum Cloud Computing yang mencakup arsitektur cloud, layanan Google Cloud, dan keamanan.",
    "exp.10.desc2": "Menyelenggarakan lokakarya lokal, mengembangkan proyek praktikum langsung, dan mengajarkan keterampilan kepemimpinan sambil memperdalam keahlian cloud computing.",
    "education.title": "Pendidikan",
    "education.desc": "Latar belakang akademik dan mata kuliah terkait.",
    "education.uni": "Universitas Muhammadiyah Prof. Dr. Hamka",
    "education.degree": "Sarjana Teknik Ilmu Komputer",
    "education.location": "Jakarta, Indonesia",
    "education.years": "2022 – 2026",
    "education.gpa": "IPK: 3.68 / 4.00",
    "education.coursework": "Mata Kuliah Terkait",
    "education.coursework_list": "Struktur Data & Algoritma, Sistem Basis Data, Rekayasa Perangkat Lunak, Cloud Computing, Pengembangan Web",
    "projects.title": "Proyek Unggulan",
    "projects.desc": "Kumpulan karya dan pencapaian teknis terbaru saya.",
    "pub.title": "Publikasi",
    "pub.desc": "Karya penelitian yang telah saya tulis dan publikasikan.",
    "pub.1.title": "“Pengembangan Desa Edueko Wisata Melalui Pendampingan Terpadu Kampung Tematik Arca Domas, Kabupaten Bogor”",
    "pub.2.title": "“Pemrograman Sudut Kinematik pada Sendi Kaki Robot untuk Menstabilkan Gerak Maju Robot Berkaki Empat”",
    "copyright.title": "Hak Cipta",
    "copyright.desc": "Sertifikat hak cipta atas karya digital saya.",
    "copyright.open": "Buka Dokumen",
    "copyright.1.title": "Klasifikasi Otomatis Buku DDC Berbasis Web Menggunakan Large Language Model (LLM)",
    "copyright.2.title": "Qossam-2: Alat Peraga Fungsi Computer Vision dalam Pengindraan Objek Berwarna pada Mesin Bergerak",
    "copyright.3.title": "SIPADUWITMI",
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
