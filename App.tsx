
import React, { useState, useMemo, useEffect, useRef } from 'react';
import Header from './components/Header';
import GameTile from './components/GameTile';
import CuratorAI from './components/CuratorAI';
import ContactSection from './components/ContactSection';
import ProjectModal from './components/ProjectModal';
import BeanCharacter from './components/BeanCharacter';
import Footer from './components/Footer';
import PatientlyCaseStudyPage from './components/PatientlyCaseStudyPage';
import { PROJECTS } from './constants';
import { Project } from './types';

// ── About Panel Overlay ──────────────────────────────────────────────────────
const AboutPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <>
      <div
        className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed top-0 right-0 bottom-0 z-[80] w-full max-w-2xl bg-[#FAF9F6] overflow-y-auto shadow-2xl"
        style={{ animation: 'panel-slide-in 0.32s cubic-bezier(0.22, 1, 0.36, 1) both' }}
        role="dialog"
        aria-modal="true"
        aria-label="About Holly Tang"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center bg-black/5 hover:bg-black/10 transition-colors duration-150"
          aria-label="Close about panel"
          style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '14px' }}
        >
          ✕
        </button>

        <div className="px-10 py-14 md:py-16">
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#999] mb-8">About</div>

          <div className="mb-10">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800"
                alt="Holly at work"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="h-[3px] bg-[#FFC83D] w-1/4" />
          </div>

          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#111111] leading-tight mb-8">
            Design is the ultimate puzzle.
          </h2>

          <p className="text-[15px] text-[#555] leading-[1.7] font-sans mb-10">
            I believe great products aren't just seen — they are played. By treating interactions as moves in a game, I build experiences that are intuitive, rewarding, and deeply impactful.
          </p>

          <ul className="space-y-6 border-l-2 border-[#111111] pl-5 mb-12">
            <li>
              <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#999] mb-0.5">Discipline</div>
              <div className="font-sans text-[13px] font-semibold text-[#111111] uppercase tracking-[0.1em]">Strategic Thinking</div>
            </li>
            <li>
              <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#999] mb-0.5">Approach</div>
              <div className="font-sans text-[13px] font-semibold text-[#111111] uppercase tracking-[0.1em]">User-Centric Logic</div>
            </li>
            <li>
              <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#999] mb-0.5">Method</div>
              <div className="font-sans text-[13px] font-semibold text-[#111111] uppercase tracking-[0.1em]">Iterative Prototyping</div>
            </li>
          </ul>

          <button
            onClick={onClose}
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#999] hover:text-[#111111] transition-colors duration-150 underline underline-offset-4 decoration-[#DDDDDD] hover:decoration-[#111111]"
          >
            ← Back to work
          </button>
        </div>
      </div>
    </>
  );
};

// ── App ──────────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const isPatientlyCaseStudyRoute = window.location.pathname === '/case-studies/patiently';
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(localStorage.getItem('user-profile-photo'));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePhoto(base64String);
        localStorage.setItem('user-profile-photo', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const pelletCount = 12;
  const pellets = useMemo(() => Array.from({ length: pelletCount }), []);

  const handleProjectOpen = (project: Project) => {
    if (project.id === 'spelling-bee-redesign') {
      window.open('/case-studies/patiently', '_blank', 'noopener,noreferrer');
      return;
    }
    setSelectedProject(project);
  };

  if (isPatientlyCaseStudyRoute) {
    return (
      <>
        <PatientlyCaseStudyPage />
        <CuratorAI />
      </>
    );
  }

  return (
    <div className="min-h-screen pb-24 selection:bg-[#F7DA21] selection:text-black overflow-x-hidden">
      <Header onAboutClick={() => setAboutOpen(true)} />

      {/* ── Main content — same container + padding as Selected Work header ── */}
      <main className="max-w-6xl mx-auto px-6 md:px-8 relative mt-14">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="mb-20 pt-12">

          {/* Top rule + kicker — same weight as Selected Work rule */}
          <div className="border-t border-black/15 pt-3 mb-12 flex items-center gap-3 flex-wrap">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#999]">
              Holly Tang
            </span>
            <span className="font-mono text-[10px] text-[#DDDDDD]">·</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#BBBBBB]">
              San Francisco
            </span>
            <span className="font-mono text-[10px] text-[#DDDDDD]">·</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#BBBBBB]">
              Product Design
            </span>
            <span className="font-mono text-[10px] text-[#DDDDDD]">·</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#BBBBBB]">
              2025
            </span>
          </div>

          {/* Two-column layout */}
          <div className="flex flex-col md:flex-row items-start gap-12 md:gap-20">

            {/* LEFT: Headline + body + CTAs */}
            <div className="md:w-3/5 flex flex-col justify-center">

              <h1
                className="font-serif font-bold text-[#111111] leading-[0.9] tracking-[-0.02em] mb-8"
                style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
              >
                Structure
                <br />
                is the product.
              </h1>

              <p className="text-[16px] font-sans text-[#555] leading-[1.65] max-w-[420px] mb-12">
                Founding Product Designer at the intersection of AI infrastructure, healthcare, and systems thinking.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <button
                  onClick={() => {
                    const el = document.getElementById('work');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="border border-[#111111] px-8 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-150 active:scale-95"
                >
                  View Work ↓
                </button>
                <button
                  onClick={() => setAboutOpen(true)}
                  className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#999] hover:text-[#111111] transition-colors duration-150 underline underline-offset-4 decoration-[#DDDDDD] hover:decoration-[#111111]"
                >
                  About →
                </button>
              </div>
            </div>

            {/* RIGHT: Portrait — no overlay, subtle caption */}
            <div className="md:w-2/5 w-full">
              <div className="aspect-[4/5] overflow-hidden bg-[#F0EDE8]">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                  alt="Holly Tang"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              {/* Mustard accent bar */}
              <div className="h-[3px] bg-[#FFC83D] w-full" />
              {/* Caption */}
              <p className="font-serif italic text-[13px] text-[#AAAAAA] mt-2 leading-snug">
                Holly Tang — Product Systems Designer
              </p>
            </div>

          </div>
        </section>

        {/* ── Eating animation ──────────────────────────────────────────── */}
        <section className="relative mb-28 py-24 overflow-hidden bg-white/40 rounded-2xl border border-black/8">
          <div className="max-w-4xl mx-auto relative px-12 flex items-center justify-between h-32">
            <div className="absolute inset-0 flex items-center justify-between px-20">
              {pellets.map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full bg-[#F7DA21] shadow-sm border border-black/10"
                  style={{
                    animation: `pellet-disappear 6s linear infinite`,
                    animationDelay: `${(i / pelletCount) * 6}s`
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 pointer-events-none">
              <div className="h-full flex items-center animate-bean-eat">
                <div className="animate-chomp">
                  <BeanCharacter size={60} className="drop-shadow-xl" />
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <div className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-300">
              CONSUMING CHALLENGES
            </div>
          </div>
        </section>

      </main>

      {/* ── Selected Work header — same container as grid cells ───────── */}
      <div id="work" className="max-w-6xl mx-auto px-6 md:px-8 pt-24 pb-10">
        <div className="border-t border-black/15 pt-3 mb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#999]">Selected Work</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-[#111111]">Selected Work</h2>
          <p className="max-w-sm text-[#666] font-sans text-[14px] leading-relaxed">
            Strategic design across healthcare, fintech, and AI systems.
          </p>
        </div>
      </div>

      {/* ── Selected Work grid — full-bleed, border-based ────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-black/8">
        {PROJECTS.map((project, i) => (
          <div key={project.id} className="border-r border-b border-black/8 px-6 md:px-8 pt-6">
            <GameTile
              project={project}
              onClick={handleProjectOpen}
              index={i}
            />
          </div>
        ))}
      </div>

      {/* ── Footer sections ───────────────────────────────────────────── */}
      <ContactSection />

      <Footer />

      {/* ── Overlays ──────────────────────────────────────────────────── */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <CuratorAI />

      {aboutOpen && <AboutPanel onClose={() => setAboutOpen(false)} />}
    </div>
  );
};

export default App;
