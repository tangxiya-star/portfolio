import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Mail, ClipboardList, Pill, Bandage, Stethoscope } from 'lucide-react';
import Header from './Header';
import ContactSection from './ContactSection';
import Footer from './Footer';
import { Badge, MediaPlaceholder, StatusChip } from './CaseStudyPrimitives';

const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const phases = [
  {
    title: 'Capture',
    quarter: 'Q1 2025',
    status: 'Shipped',
    text: 'We established recording, transcript, and summary reliability first, because guidance quality depends on capture fidelity.',
  },
  {
    title: 'Structure',
    quarter: 'Q1 2025',
    status: 'Shipped',
    text: 'Flat topic dumps caused overload; we shifted to categorized topics aligned to patient mental models.',
  },
  {
    title: 'Friction',
    quarter: 'Q2 2025',
    status: 'Shipped',
    text: 'We shipped a 3-tab model for discoverability, while framing a clear A/B path for embedded follow-up.',
  },
  {
    title: 'Context',
    quarter: 'Q2 2025',
    status: 'Proposed',
    text: 'Family-member switching exposed a system gap; we designed persistent context as a cross-feature state pattern.',
  },
  {
    title: 'Trust',
    quarter: 'Q3 2025',
    status: 'In Progress',
    text: 'We introduced article explainability and citations so users could evaluate and act on AI outputs with confidence.',
  },
];

// --- Decision A image components (before/after phone screenshots) ---
const DecisionABeforeImage: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);
  const candidates = ['/decision-a-before.png', '/decision-a-before.jpg'];
  if (failed) return (
    <div className="w-full bg-[#F7F7F5] border border-[#E8E8E8] py-16 flex items-center justify-center">
      <p className="font-sans text-[11px] text-[#CCCCCC] uppercase tracking-[0.18em]">Before — screenshot</p>
    </div>
  );
  return (
    <img src={candidates[idx]} alt="Before — Flat Topic Extraction" className="w-full h-auto block"
      onError={() => { idx < candidates.length - 1 ? setIdx(v => v + 1) : setFailed(true); }} />
  );
};

const DecisionAAfterImage: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);
  const candidates = ['/decision-a-after.png', '/decision-a-after.jpg'];
  if (failed) return (
    <div className="w-full bg-[#F7F7F5] border border-[#E8E8E8] py-16 flex items-center justify-center">
      <p className="font-sans text-[11px] text-[#CCCCCC] uppercase tracking-[0.18em]">After — screenshot</p>
    </div>
  );
  return (
    <img src={candidates[idx]} alt="After — Categorized Health Model" className="w-full h-auto block"
      onError={() => { idx < candidates.length - 1 ? setIdx(v => v + 1) : setFailed(true); }} />
  );
};

// --- Decision B image components (before/after article preview screenshots) ---
const DecisionBBeforeImage: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);
  const candidates = ['/decision-b-before.png', '/decision-b-before.jpg'];
  if (failed) return (
    <div className="w-full bg-[#F7F7F5] border border-[#E8E8E8] py-16 flex items-center justify-center">
      <p className="font-sans text-[11px] text-[#CCCCCC] uppercase tracking-[0.18em]">Before — screenshot</p>
    </div>
  );
  return (
    <img src={candidates[idx]} alt="Before — Low Context Preview" className="w-full h-auto block"
      onError={() => { idx < candidates.length - 1 ? setIdx(v => v + 1) : setFailed(true); }} />
  );
};

const DecisionBAfterImage: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);
  const candidates = ['/decision-b-after.png', '/decision-b-after.jpg'];
  if (failed) return (
    <div className="w-full bg-[#F7F7F5] border border-[#E8E8E8] py-16 flex items-center justify-center">
      <p className="font-sans text-[11px] text-[#CCCCCC] uppercase tracking-[0.18em]">After — screenshot</p>
    </div>
  );
  return (
    <img src={candidates[idx]} alt="After — Contextual Preview Model" className="w-full h-auto block"
      onError={() => { idx < candidates.length - 1 ? setIdx(v => v + 1) : setFailed(true); }} />
  );
};

const DECISION_NAV_ITEMS = [
  { id: 'decision-a', label: 'Decision A', subtitle: 'Topic categorization' },
  { id: 'decision-b', label: 'Decision B', subtitle: 'Preview density' },
] as const;

const DecisionNavigator: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    DECISION_NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { threshold: 0.25, rootMargin: '-15% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="mb-10">
      <nav
        className="flex overflow-x-auto border border-[#DDDDDD] bg-white"
        aria-label="Decision deep-dive sections"
        style={{ scrollbarWidth: 'none' }}
      >
        {DECISION_NAV_ITEMS.map(({ id, label, subtitle }, i) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={[
                'group relative flex-1 min-w-[160px] text-left px-5 py-4 cursor-pointer',
                'transition-colors duration-150',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC83D] focus-visible:ring-inset',
                i < DECISION_NAV_ITEMS.length - 1 ? 'border-r border-[#E8E8E8]' : '',
                isActive ? 'bg-[#FFFDF5]' : 'hover:bg-[#F7F6F3]',
              ].join(' ')}
              aria-current={isActive ? 'true' : undefined}
            >
              {/* bottom accent bar — active indicator */}
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-150"
                style={{ background: isActive ? '#FFC83D' : 'transparent' }}
              />
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className={`font-sans text-[11px] uppercase tracking-[0.18em] leading-none mb-[5px] font-semibold ${isActive ? 'text-[#111111]' : 'text-[#333333] group-hover:text-[#111111]'}`}>
                    {label}
                  </p>
                  <p className={`font-sans text-[11px] leading-snug ${isActive ? 'text-[#666666]' : 'text-[#999999] group-hover:text-[#666666]'}`}>
                    {subtitle}
                  </p>
                </div>
                <span className={`font-mono text-[12px] shrink-0 transition-transform duration-150 group-hover:translate-x-[3px] ${isActive ? 'text-[#FFC83D]' : 'text-[#999999] group-hover:text-[#333333]'}`}>→</span>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

const decisions = [
  {
    title: 'Health Topic Restructuring',
    problem: `Early AI output generated a flat list — often exceeding 100 items with no hierarchy or orientation cues. Information existed, but meaning did not.\n\nUsers scan in mental buckets: Conditions, Medications, Procedures, Symptoms. Orientation precedes engagement. A flat list forced users to impose structure themselves at the moment of highest cognitive load.\n\nA second problem compounded the first: even after selecting a topic, article previews showed only a title. Users had no way to judge relevance before tapping in — creating a friction loop of open, scan, back, repeat.`,
    decision: '',
    subDecisions: [
      {
        label: 'A — Topic Categorization',
        headline: 'Flat list → grouped categories',
        body: 'Aligned to patient mental models. Categories introduced scan anchors — users could orient before reading. Not visual cleanup. A shift in how the system communicated relevance.',
      },
      {
        label: 'B — Preview Density',
        headline: 'Expand summaries + show sources',
        body: 'Users needed enough context to judge relevance before tapping. Reducing friction required more information per item, not less.',
      },
      {
        label: 'Tradeoff',
        headline: 'Structure vs. overload',
        body: 'Adding structure and density simultaneously risks visual overload. Restraint in spacing and type weight kept added information from becoming noise.',
      },
    ],
    whyMatters: `AI output surfaces information. Architecture makes it navigable.`,
    status: 'Shipped',
    visual: 'Decision Visual — Flat to Categorized Topics (16:9)',
  },
  {
    title: '2 Tabs vs 3 Tabs',
    problem: 'The core trade-off was clarity versus discoverability: fewer tabs simplify structure, while a dedicated follow-up tab increases action visibility.',
    decision: 'Ship three tabs in the current release and preserve an A/B path for an embedded follow-up model.',
    whyMatters: 'This reduced early-stage action friction while keeping structural simplification testable.',
    status: 'Shipped',
    visual: 'Decision Visual — 2 vs 3 Tab Comparison (16:9)',
  },
  {
    title: 'Unified Family Context System (Proposed)',
    problem: 'Users repeatedly selected family member context across core surfaces, which introduced friction and context-switch errors.',
    decision: 'Introduce persistent global context with quick member switching and cross-feature synchronization.',
    whyMatters: 'State coherence lowers repetitive effort and prevents context mistakes in family workflows.',
    status: 'Proposed',
    visual: 'Decision Visual — Context Flow + Quick Switch (16:9)',
  },
  {
    title: 'Explainability and Trust Layer',
    problem: 'Dense source material and uncited AI responses made healthcare guidance feel opaque at critical moments.',
    decision: 'Design article explainability layers and citation-aware AI responses.',
    whyMatters: 'Transparent reasoning builds user confidence where consequences are high.',
    status: 'In Progress',
    visual: 'Decision Visual — Explainability + Citations (16:9)',
  },
];

const PhaseRow: React.FC<{ title: string; quarter: string; status: string; text: string; isLast: boolean; index: number }> = ({ title, quarter, status, text, isLast, index }) => (
  <li className="grid grid-cols-1 lg:grid-cols-[34%_66%] gap-6 lg:gap-10 items-start py-10 border-t border-dashed border-[#E0E0E0]">
    <div className="relative lg:pr-8">
      <div className={`absolute left-[7px] top-6 w-px border-l border-dashed border-[#CCCCCC] ${isLast ? 'h-0' : 'h-[calc(100%+2.5rem)]'}`} />
      <div className="relative flex items-start gap-4">
        <span className="mt-[3px] inline-flex h-[15px] w-[15px] shrink-0 border border-[#CCCCCC] bg-white items-center justify-center" style={{ transform: 'rotate(45deg)' }}>
          <span className="h-[5px] w-[5px] bg-[#999999]" style={{ transform: 'rotate(-45deg)' }} />
        </span>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#999999] mb-1">{quarter}</p>
          <h3 className="font-sans text-[13px] font-semibold uppercase tracking-[0.18em] text-[#111111]">
            Phase {index + 1} — {title}
          </h3>
        </div>
      </div>
    </div>
    <div className="lg:pl-2 flex justify-between items-start gap-4">
      <p className="text-[17px] leading-[1.75] text-[#2f2f2f] max-w-[60ch]">{text}</p>
      <div className="hidden lg:block shrink-0 pt-0.5">
        <StatusChip status={status} />
      </div>
    </div>
  </li>
);

const Rule = () => <hr className="my-24 md:my-28 border-0 border-t border-[#E8E8E8]" />;
const ImageCaption: React.FC<{ text: string }> = ({ text }) => (
  <p className="mt-3 text-[12px] tracking-[0.08em] uppercase text-black/50">{text}</p>
);
const LayerLabel: React.FC<{ text: string }> = ({ text }) => (
  <p className="mb-2 font-sans text-[11px] uppercase tracking-[0.2em] text-[#999999]">{text}</p>
);
const SectionHeading: React.FC<{ label: string; title: string }> = ({ label, title }) => (
  <div className="group w-fit">
    <LayerLabel text={label} />
    <h2 className="font-sans text-4xl md:text-5xl lg:text-[58px] font-semibold tracking-[-0.015em] leading-[1.05] text-[#111111]">{title}</h2>
    <div className="mt-4 relative h-1 flex items-center">
      <span className="h-px w-12 bg-[#111111] transition-all duration-200 ease-out group-hover:w-[72px] group-focus-within:w-[72px]" />
      <span className="ml-2 h-1 w-1 bg-[#FFC83D] opacity-0 transition-all duration-200 ease-out group-hover:opacity-100 group-focus-within:opacity-100 group-hover:translate-x-0.5 group-focus-within:translate-x-0.5" />
    </div>
  </div>
);
const CognitiveGapsSystemDiagram: React.FC = () => (
  <div className="w-full max-w-[760px] mx-auto">
    <CognitiveGapsSystemImage />
  </div>
);

const CognitiveGapsSystemImage: React.FC = () => {
  const candidates = [
    '/cognitive-gaps-system-map-v1.png',
    '/cognitive-gaps-system-map-v1.jpg',
    '/cognitive-gaps-system-map.png',
    '/cognitive-gaps-system-map.jpg',
    '/cognitive-gaps-system-map.webp',
  ];
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const currentSrc = candidates[index];
  const hasNext = index < candidates.length - 1;

  return (
    <figure>
      <img
        src={currentSrc}
        alt="Cognitive Gaps System Map"
        className="h-auto w-full"
        onError={() => {
          if (hasNext) {
            setIndex((v) => v + 1);
            return;
          }
          setFailed(true);
        }}
      />
      <figcaption className="mt-3 text-[11px] uppercase tracking-[0.14em] text-[#8A8A8A]">Cognitive Gaps System Map</figcaption>
      {failed && (
        <p className="mt-2 text-[12px] text-[#8A8A8A]">
          Image not found. Put file in <code>public/</code> and name it <code>cognitive-gaps-system-map-v1.png</code>.
        </p>
      )}
    </figure>
  );
};
const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduced;
};
const ParallaxWrap: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [xy, setXy] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (reducedMotion) return;
    const finePointer = window.matchMedia('(pointer:fine)').matches;
    const wide = window.matchMedia('(min-width: 768px)').matches;
    setEnabled(finePointer && wide);
  }, [reducedMotion]);
  return (
    <div
      className={className}
      onMouseMove={(e) => {
        if (!enabled) return;
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        setXy({ x: px * 3.5, y: py * 3.5 });
      }}
      onMouseLeave={() => setXy({ x: 0, y: 0 })}
      style={{
        transform: enabled ? `translate3d(${xy.x}px, ${xy.y}px, 0)` : 'none',
        transition: 'transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
    >
      {children}
    </div>
  );
};
const ReasoningTraceSnippet: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [replayTick, setReplayTick] = useState(-1);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  useEffect(() => {
    if (reducedMotion || hasAutoPlayed) return;
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReplayTick((v) => v + 1);
          setHasAutoPlayed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, hasAutoPlayed]);
  const lines: Array<{ no: string; delay: number; content: React.ReactNode }> = [
    {
      no: '01',
      delay: 0,
      content: <><span className="trace-comment">// INPUT → ASSUMPTION → PREDICTED OUTCOME</span></>,
    },
    { no: '02', delay: 1, content: <>&nbsp;</> },
    {
      no: '03',
      delay: 2,
      content: (
        <>
          <span className="trace-keyword">const</span>
          <span className="trace-symbol"> </span>
          <span className="trace-variable">INPUT</span>
          <span className="trace-symbol"> = </span>
          <span className="trace-string">&quot;Medical conversations are dense and difficult to retain.&quot;</span>
        </>
      ),
    },
    { no: '04', delay: 3, content: <>&nbsp;</> },
    {
      no: '05',
      delay: 4,
      content: (
        <>
          <span className="trace-keyword">const</span>
          <span className="trace-symbol"> </span>
          <span className="trace-variable">ASSUMPTION</span>
          <span className="trace-symbol"> = </span>
          <span className="trace-string">&quot;Structured categorization improves comprehension.&quot;</span>
        </>
      ),
    },
    { no: '06', delay: 5, content: <>&nbsp;</> },
    {
      no: '07',
      delay: 6,
      content: (
        <>
          <span className="trace-keyword">const</span>
          <span className="trace-symbol"> </span>
          <span className="trace-variable">PREDICTED_OUTCOME</span>
          <span className="trace-symbol"> = [</span>
        </>
      ),
    },
    {
      no: '08',
      delay: 7,
      content: (
        <>
          <span className="trace-symbol">  </span>
          <span className="trace-string">
            &quot;Understanding <span className="trace-arrow" style={{ ['--pulse-delay' as string]: '940ms' }}>↑</span>&quot;,
          </span>
        </>
      ),
    },
    {
      no: '09',
      delay: 8,
      content: (
        <>
          <span className="trace-symbol">  </span>
          <span className="trace-string">
            &quot;Engagement <span className="trace-arrow" style={{ ['--pulse-delay' as string]: '1060ms' }}>↑</span>&quot;,
          </span>
        </>
      ),
    },
    { no: '10', delay: 9, content: <span className="trace-symbol">]</span> },
  ];

  return (
    <div ref={rootRef} className="w-full rounded-[18px] overflow-hidden border border-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.22)] bg-gradient-to-b from-[#0B1220] to-[#0F1A2B]">
      <style>{`
        .trace-line {
          opacity: 0;
          transform: translateY(8px);
          animation: traceLineIn 360ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          animation-delay: calc(var(--line-delay) * 120ms);
          position: relative;
        }
        .trace-line::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 4px;
          height: 28px;
          background: linear-gradient(90deg, rgba(255,200,61,0) 0%, rgba(255,200,61,0.10) 45%, rgba(255,200,61,0) 100%);
          transform: translateX(-105%);
          animation: traceScan 520ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          animation-delay: calc(var(--line-delay) * 120ms);
          pointer-events: none;
        }
        .trace-arrow {
          color: #FFC83D;
          animation: traceArrowPulse 220ms ease-out forwards;
          animation-delay: var(--pulse-delay, 0ms);
        }
        .trace-keyword { color: #FFB454; }
        .trace-variable { color: #8AD8FF; }
        .trace-comment { color: #6B7D94; }
        .trace-symbol { color: #9FB3C8; }
        .trace-string { color: #C9D6E2; }
        @keyframes traceLineIn {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes traceScan {
          to { transform: translateX(105%); }
        }
        @keyframes traceArrowPulse {
          0% { color: #FFC83D; }
          45% { color: #FFD56A; }
          100% { color: #FFC83D; }
        }
        @media (prefers-reduced-motion: reduce) {
          .trace-line {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }
          .trace-line::after, .trace-arrow {
            animation: none !important;
          }
        }
        .trace-static .trace-line {
          opacity: 1 !important;
          transform: none !important;
          animation: none !important;
        }
        .trace-static .trace-line::after, .trace-static .trace-arrow {
          animation: none !important;
        }
      `}</style>
      <div className="h-12 bg-[#111C2E] border-b border-white/10 px-4 flex items-center justify-between">
        <span className='font-mono text-[12px] text-[#9FB3C8] tracking-[0.01em]'>reasoning.trace.ts</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setReplayTick((v) => v + 1)}
            className="h-7 px-3 rounded-full bg-white/5 text-[#9FB3C8] text-[11px] font-sans transition-colors hover:text-[#B9CCE0]"
          >
            Run
          </button>
          <button type="button" aria-label="Copy snippet" className="h-7 w-7 rounded border border-white/20 flex items-center justify-center group">
            <span className="relative block h-3 w-3">
              <span className="absolute inset-0 border border-[#7F96B3] rounded-[1px] group-hover:border-[#B9CCE0]" />
              <span className="absolute -right-1 -top-1 h-3 w-3 border border-[#7F96B3] rounded-[1px] bg-transparent group-hover:border-[#B9CCE0]" />
            </span>
          </button>
        </div>
      </div>
      <div className="px-6 py-[22px] pb-[26px] overflow-x-auto">
        <pre key={replayTick} className={`m-0 min-w-[760px] font-mono text-[15px] leading-[1.9] text-[#C9D6E2] ${replayTick < 0 ? 'trace-static' : ''}`}>
          {lines.map((line) => (
            <div key={`${line.no}-${line.delay}`} className="trace-line grid grid-cols-[44px_1fr] gap-3" style={{ ['--line-delay' as string]: String(line.delay) }}>
              <span className="text-white/30 select-none">{line.no}</span>
              <code>{line.content}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};

const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0,0,0)' : 'translate3d(0,10px,0)',
        transitionProperty: 'opacity, transform',
        transitionDuration: '480ms',
        transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

const CountUpMetric: React.FC<{ value: number; suffix?: string; durationMs?: number; className?: string }> = ({
  value,
  suffix = '',
  durationMs = 1300,
  className = '',
}) => {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(value);
      return;
    }
    const node = ref.current;
    if (!node) return;

    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        const start = performance.now();

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(value * eased));
          if (t < 1) {
            requestAnimationFrame(tick);
          }
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.45 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, durationMs, reducedMotion]);

  return <span ref={ref} className={className}>{display}{suffix}</span>;
};

const navItems = [
  { id: 'hero',       label: 'Overview' },
  { id: 'summary',    label: 'Summary' },
  { id: 'problem',    label: 'Framing' },
  { id: 'metrics',    label: 'Signals' },
  { id: 'ownership',  label: 'Ownership' },
  { id: 'progression',label: 'Progression' },
  { id: 'decisions',  label: 'Decisions' },
  { id: 'system',     label: 'System' },
  { id: 'validation', label: 'Validation' },
  { id: 'next',       label: 'Next Steps' },
  { id: 'closing',    label: 'Closing' },
];

// ── Patiently Hero Frames — same 4-frame crossfade as the home page card ─────
const PATIENTLY_HERO_FRAMES = [
  '/patiently-frame-0.jpg',
  '/patiently-frame-1.jpg',
  '/patiently-frame-2.jpg',
  '/patiently-frame-3.jpg',
];

const PatientlyHeroFrames: React.FC = () => {
  const [activeFrame, setActiveFrame] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) return;
    intervalRef.current = setInterval(() => {
      setActiveFrame(f => (f + 1) % 4);
    }, 2400);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [prefersReducedMotion]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.10)] transition-transform duration-500 ease-out hover:-translate-y-1"
      style={{ aspectRatio: '4/3' }}
    >
      {PATIENTLY_HERO_FRAMES.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Patiently — frame ${i + 1}`}
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            opacity: activeFrame === i ? 1 : 0,
            transition: prefersReducedMotion ? 'none' : 'opacity 800ms ease-in-out',
            willChange: 'opacity',
          }}
        />
      ))}
    </div>
  );
};

const PatientlyCaseStudyPage: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0;
      setProgress(ratio * 100);

      // Determine active section
      let current = 'hero';
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) current = item.id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="patiently-case min-h-screen pb-24 selection:bg-[#E8E8E8] selection:text-black overflow-x-hidden bg-[#FAFAF8] text-[#111111]">
      <style>{`
        .patiently-case {
          --bg: #FAFAF8;
          --text: #111111;
          --muted: #666666;
          --label: #999999;
          --rule: #E8E8E8;
          --accent: #FFC83D;
        }
        .ambient-blob {
          animation: ambientDrift 14s cubic-bezier(0.2, 0.8, 0.2, 1) infinite alternate;
        }
        .ambient-blob.cool {
          animation-duration: 18s;
        }
        @keyframes ambientDrift {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(22px, -12px, 0) scale(1.05); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ambient-blob { animation: none !important; }
        }
      `}</style>
      <div className="fixed inset-x-0 top-0 z-[70] h-[2px] pointer-events-none">
        <div
          className="h-full bg-[#121212] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </div>
      <Header />

      {/* ── Fixed sidenav — only on xl+ ─────────────────── */}
      <aside className="hidden xl:flex flex-col fixed left-6 2xl:left-10 top-1/2 -translate-y-1/2 z-50 w-[140px]">
        <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#BBBBBB] mb-4">Contents</p>
        <nav>
          <ul className="space-y-0">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(item.id)}
                    className="group flex items-center gap-2.5 w-full text-left py-[6px] transition-colors"
                  >
                    <span
                      className="shrink-0 h-px transition-all duration-200"
                      style={{
                        width: isActive ? '16px' : '8px',
                        background: isActive ? '#111111' : '#D0D0D0',
                      }}
                    />
                    <span
                      className="font-sans text-[11px] tracking-[0.06em] transition-colors duration-200 leading-none"
                      style={{ color: isActive ? '#111111' : '#AAAAAA' }}
                    >
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* ── Main content — left-padded on xl to clear fixed nav ── */}
      <div className="max-w-[1100px] mx-auto px-6 md:px-8 xl:pl-[200px] 2xl:pl-[180px] mt-10">
        <main>
        <section id="hero" className="scroll-mt-28 pt-10 pb-20 md:pb-24 relative">
          <div className="pointer-events-none absolute -top-6 -left-10 h-52 w-52 rounded-full blur-3xl ambient-blob" style={{ background: 'radial-gradient(circle, rgba(255,200,61,0.10) 0%, rgba(255,200,61,0) 72%)' }} />
          <div className="pointer-events-none absolute top-20 right-0 h-56 w-56 rounded-full blur-3xl ambient-blob cool" style={{ background: 'radial-gradient(circle, rgba(111,168,255,0.10) 0%, rgba(111,168,255,0) 72%)' }} />
          <Reveal>
            <div>
              {/* Editorial top rule */}
              <div className="mb-10 flex items-center gap-6">
                <div className="h-px flex-1 bg-[#111111]" />
                <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#999999]">Case Study 01 — Health AI · 2025</p>
                <div className="h-px w-8 bg-[#E8E8E8]" />
              </div>

              <div className="mb-6 h-10 w-1 bg-[#FFC83D]" />
              <h1 className="font-serif text-[72px] md:text-[96px] leading-[0.90] text-[#121212]">Patiently</h1>
              <p className="mt-6 font-serif italic text-[22px] leading-[1.45] text-[#2f2f2f] max-w-[30rem]">
                Doctor conversations, turned into structured action.
              </p>

              {/* Editorial byline dateline */}
              <div className="mt-8 flex flex-wrap items-center gap-2 font-sans text-[13px] tracking-[0.04em] text-[#666666]">
                <span>Founding Product Designer</span>
                <span className="text-[#CCCCCC]">·</span>
                <span>Founder + 2 Engineers</span>
                <span className="text-[#CCCCCC]">·</span>
                <span>Early-stage Health AI</span>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
                <button
                  onClick={() => scrollTo('decisions')}
                  className="bg-[#121212] text-white px-8 py-4 rounded-xl font-semibold hover:bg-black transition-all shadow-[0_8px_20px_rgba(0,0,0,0.15)] active:scale-95 font-sans uppercase tracking-[0.14em] text-xs"
                >
                  Jump to Key Decisions
                </button>
                <a
                  href="https://apps.apple.com/us/app/patiently-medical-ai-notes/id6748413070"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-sans text-[13px] tracking-[0.04em] text-[#111111] underline underline-offset-4 decoration-[#CCCCCC] hover:decoration-[#111111] transition-all"
                >
                  View on App Store <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-12 md:mt-14 space-y-3">
            <PatientlyHeroFrames />
            <ImageCaption text="Hero product mockup — Summary, topics, and follow-up entry point." />
          </Reveal>
        </section>

        <Rule />

        <section id="summary" className="scroll-mt-28 py-8 md:py-10">
          <Reveal>
            <SectionHeading label="System Layer" title="Summary" />
            {/* Punchline — replaces tagline paragraph */}
            <p className="mt-8 font-serif font-semibold text-[38px] md:text-[52px] leading-[1.08] tracking-[-0.02em] text-[#111111]">
              Clinical noise.<br />Structured knowledge.
            </p>
            {/* System descriptor — concise, declarative */}
            <p className="mt-4 max-w-[48ch] font-sans text-[15px] leading-[1.65] text-[#666666]">
              Audio capture to actionable summary — designed for how families actually follow up.
            </p>
            {/* Scope block — trimmed */}
            <div className="mt-8">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[#999999]">Scope</p>
              <div className="mt-3 space-y-1">
                <p className="font-sans text-[17px] leading-tight text-[#2f2f2f]">0 → 1 MVP</p>
                <p className="mt-1 font-sans text-[13px] leading-[1.4] text-black/50 tracking-[0.04em]">
                  Recording · AI Summarization · Follow-up Q&amp;A · Family Health
                </p>
              </div>
            </div>
            <hr className="mt-12 border-0 border-t border-[#E8E8E8]" />
          </Reveal>

          {/* Flow row — directional system diagram, left-aligned */}
          <Reveal delay={40}>
            <div className="mt-8 hidden md:flex items-end gap-0">
              <div className="flex flex-col items-start gap-1.5">
                <p className="font-mono text-[9px] tracking-[0.18em] text-[#CCCCCC]">01</p>
                <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-black/45">Audio</span>
              </div>
              <span className="mx-3 mb-[1px] font-mono text-[11px] text-[#CCCCCC]">→</span>
              <div className="flex flex-col items-start gap-1.5">
                <p className="font-mono text-[9px] tracking-[0.18em] text-[#CCCCCC]">02</p>
                <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-black/45">AI Processing</span>
              </div>
              <span className="mx-3 mb-[1px] font-mono text-[11px] text-[#CCCCCC]">→</span>
              {/* Node 03 — mustard accent highlight */}
              <div className="flex flex-col items-start gap-1.5">
                <p className="font-mono text-[9px] tracking-[0.18em] text-[#FFC83D]">03</p>
                <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-[#FFC83D] font-semibold">Structured Output</span>
              </div>
              <span className="mx-3 mb-[1px] font-mono text-[11px] text-[#CCCCCC]">→</span>
              <div className="flex flex-col items-start gap-1.5">
                <p className="font-mono text-[9px] tracking-[0.18em] text-[#CCCCCC]">04</p>
                <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-black/45">Action</span>
              </div>
            </div>
          </Reveal>

          {/* Asymmetric card grid — large left + two stacked right */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Card 01 — Product Translation — dominant left block */}
            <Reveal delay={30}>
              <article className="relative h-full rounded-[12px] border border-[#E8E8E8] bg-white p-8 md:p-10 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-transform duration-200 hover:-translate-y-0.5 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FFC83D]" />
                <p className="font-mono text-[11px] tracking-[0.12em] text-[#999999]">01</p>
                <div className="mt-3 h-px w-12 bg-[#E8E8E8]" />
                <h3 className="mt-3 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#111111]">
                  Product Translation
                </h3>
                <p className="mt-4 font-sans text-[20px] leading-[1.6] text-[#2f2f2f] max-w-[22ch]">
                  Clinical audio → structured summaries and follow-up guidance.
                </p>
              </article>
            </Reveal>

            {/* Right column — two stacked cards */}
            <div className="flex flex-col gap-4">
              <Reveal delay={110}>
                <article className="relative rounded-[12px] border border-[#E8E8E8] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-transform duration-200 hover:-translate-y-0.5 overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E8E8E8]" />
                  <p className="font-mono text-[11px] tracking-[0.12em] text-[#999999]">02</p>
                  <div className="mt-3 h-px w-12 bg-[#E8E8E8]" />
                  <h3 className="mt-3 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#111111]">
                    System Ownership
                  </h3>
                  <p className="mt-3 font-sans text-[15px] leading-[1.65] text-[#2f2f2f]">
                    Founding Product Designer. IA, interaction systems, <strong>trust patterns</strong>.
                  </p>
                </article>
              </Reveal>
              <Reveal delay={190}>
                <article className="relative rounded-[12px] border border-[#111111] bg-[#111111] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-transform duration-200 hover:-translate-y-0.5 overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FFC83D]" />
                  <p className="font-mono text-[11px] tracking-[0.12em] text-white/40">03</p>
                  <div className="mt-3 h-px w-12 bg-white/20" />
                  <h3 className="mt-3 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                    Behavioral Impact
                  </h3>
                  <p className="mt-3 font-sans text-[15px] leading-[1.65] text-white/80">
                    Friction reduced from <strong className="text-white">capture to action</strong>.
                  </p>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        <Rule />

        <section id="problem" className="scroll-mt-28 py-10 md:py-12 relative">
          <Reveal className="max-w-[980px] mx-auto">
            <SectionHeading label="Strategic Framing" title="Strategic Framing" />

            <div className="mt-24">
              <p className="mb-[10px] font-sans text-[11px] uppercase tracking-[0.2em] text-[#999999]">MARKET CONTEXT</p>
              <h3 className="font-sans text-[30px] md:text-[36px] font-semibold leading-[1.12] text-[#111111]">Market Problem</h3>
              <p className="mt-7 text-[17px] leading-[1.65] text-[#111111] max-w-[72ch]">
                Modern medicine generates precision. The patient experience does not.
              </p>
            </div>

            <div className="mt-10 h-px w-full bg-[#E8E8E8]" />

            <div className="mt-10">
              <span className="block h-2 w-2 rounded-full bg-[#FFC83D]" />
            </div>

            <div className="mt-12">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#999999]">COGNITIVE GAPS</p>
              <div className="mt-10">
                <CognitiveGapsSystemDiagram />
              </div>

              {/* Annotation grid — sits directly under the diagram like figure captions */}
              <div className="mt-6 max-w-[760px] mx-auto border-t border-[#E8E8E8] pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
                  {[
                    { label: 'Memory Decay', desc: 'Patients retain less than 50% of clinical information. Anxiety reduces encoding.' },
                    { label: 'Terminology Ambiguity', desc: 'Medical language operates outside everyday comprehension. Translation happens after the visit, if at all.' },
                    { label: 'Search-driven Reconstruction', desc: 'Context is rebuilt through fragmented web searches — conflicting sources, outdated recommendations.' },
                    { label: 'Fragmented Care Coordination', desc: 'Families managing multiple members repeat the same information-gathering cycle across disconnected appointments.' },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-3">
                      <span className="mt-[5px] h-[4px] w-[4px] shrink-0 bg-[#FFC83D]" />
                      <div>
                        <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#999999] mb-1">{item.label}</p>
                        <p className="text-[13px] leading-[1.6] text-[#555555]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <hr className="my-16 border-0 border-t border-[#E8E8E8]" />

            <div className="mt-0 max-w-[72ch]">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#999999]">STRUCTURAL READ</p>
              <div className="mt-10 py-10 text-center">
                <div className="h-px w-full bg-[#E8E8E8] mb-8" />
                <p className="font-serif italic text-[32px] md:text-[40px] leading-[1.25] text-[#111111] max-w-[22ch] mx-auto">
                  "This is not a memory issue. It is a knowledge architecture failure."
                </p>
                <div className="h-px w-full bg-[#E8E8E8] mt-8" />
              </div>
            </div>

            <div className="mt-24">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#999999]">HYPOTHESIS</p>
              <p className="mt-3 font-sans text-[12px] tracking-[0.01em] text-[#999999]">
                Model: Patiently-Reasoner v0  •  Mode: Inference  •  Confidence: Medium
              </p>
              <ParallaxWrap className="mt-12 max-w-[70ch]">
                <ReasoningTraceSnippet />
                <div className="mt-2 flex flex-wrap items-center gap-4 font-mono text-[10px] tracking-[0.08em] text-[#999999]">
                  <span>MODEL: Patiently-Reasoner v0</span>
                  <span className="text-[#DDDDDD]">·</span>
                  <span>CONFIDENCE: Medium</span>
                  <span className="text-[#DDDDDD]">·</span>
                  <span>~240 tokens</span>
                  <span className="text-[#DDDDDD]">·</span>
                  <span>1.2s</span>
                </div>
              </ParallaxWrap>
              <hr className="mt-12 mb-0 border-0 border-t border-[#E8E8E8]" />
            </div>
          </Reveal>
        </section>

        <Rule />

        <section id="metrics" className="scroll-mt-28 py-8 md:py-10">
          <Reveal>
            <SectionHeading label="Impact" title="Early Impact & Validation Signals" />
            <p className="mt-4 text-[15px] leading-[1.7] text-[#666666] max-w-[70ch]">
              These are directional signals from launch and early testing—not statistically significant results. They informed strategic decisions and shaped the next design iteration.
            </p>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-0">
            <Reveal delay={30}>
              <article className="pt-8 pb-10 md:pr-10 md:border-r border-t border-[#111111]">
                <ParallaxWrap className="inline-block">
                  <p className="font-serif text-[72px] md:text-[84px] leading-none text-[#111111]">
                    <CountUpMetric value={88} />
                    {/* Wordle-tile accent */}
                    <span className="ml-3 inline-block w-4 h-4 bg-[#FFC83D] align-middle" style={{ marginBottom: '8px' }} />
                  </p>
                </ParallaxWrap>
                <p className="mt-1 font-sans text-[11px] tracking-[0.12em] text-[#AAAAAA] uppercase">Early Adopters · 2025</p>
                <div className="mt-4 h-px w-full bg-[#E8E8E8]" />
                <p className="mt-4 text-[15px] leading-[1.7] text-[#666666] max-w-[22ch]">Organic App Store downloads following initial launch. No paid acquisition.</p>
              </article>
            </Reveal>
            <Reveal delay={110}>
              <article className="pt-8 pb-10 md:px-10 md:border-r border-t border-[#111111]">
                <ParallaxWrap className="inline-block">
                  <p className="font-serif text-[72px] md:text-[84px] leading-none text-[#111111]"><CountUpMetric value={1} /></p>
                </ParallaxWrap>
                <p className="mt-1 font-sans text-[11px] tracking-[0.12em] text-[#AAAAAA] uppercase">Physician Interview · Q2 2025</p>
                <div className="mt-4 h-px w-full bg-[#E8E8E8]" />
                <p className="mt-4 text-[15px] leading-[1.7] text-[#666666] max-w-[22ch]">Challenged core assumption around recording acceptance. Triggered strategic repositioning of recording from primary feature to optional tool.</p>
              </article>
            </Reveal>
            <Reveal delay={190}>
              <article className="pt-8 pb-10 md:pl-10 border-t border-[#111111]">
                <ParallaxWrap className="inline-block">
                  <p className="font-serif text-[72px] md:text-[84px] leading-none text-[#111111]"><CountUpMetric value={3} />×</p>
                </ParallaxWrap>
                <p className="mt-1 font-sans text-[11px] tracking-[0.12em] text-[#AAAAAA] uppercase">Directional Observation · Internal Testing</p>
                <div className="mt-4 h-px w-full bg-[#E8E8E8]" />
                <p className="mt-4 text-[15px] leading-[1.7] text-[#666666] max-w-[22ch]">Improved topic scan efficiency in structured layout versus flat transcript flow. Based on internal usability walkthroughs. Instrumentation ongoing.</p>
              </article>
            </Reveal>
          </div>
          <p className="mt-5 font-sans text-[11px] tracking-[0.04em] text-[#BBBBBB]">Signals reflect early-stage validation and strategic learning. Quantitative instrumentation in progress.</p>
        </section>

        <Rule />

        <section id="ownership" className="scroll-mt-28 py-8 md:py-10">
          <Reveal>
            <SectionHeading label="Architecture" title="Ownership" />
            <p className="mt-4 text-[15px] leading-[1.6] text-[#666666] max-w-[48ch]">
              Product design lead within a founder-paced, engineering-constrained team.
            </p>
          </Reveal>

          <Reveal delay={60} className="mt-10">
            {/* My Focus row */}
            <div className="border-t border-[#111111] pt-6 pb-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-8">
                <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#999999] shrink-0 w-28">My Focus</p>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {['IA Architecture', 'Topic Restructuring', 'Notes UX', 'Trust Patterns', 'Design System'].map((item) => (
                    <span key={item} className="font-sans text-[15px] text-[#111111] after:content-['·'] after:ml-5 after:text-[#DDDDDD] last:after:content-['']">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Constraints row */}
            <div className="border-t border-[#E8E8E8] pt-6 pb-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-8">
                <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#999999] shrink-0 w-28">Constraints</p>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {['Founder Roadmap', 'AI / BE Limits', 'Early-stage Speed', 'Eng Bandwidth', 'Founder Go / No-go'].map((item) => (
                    <span key={item} className="font-sans text-[15px] text-[#666666] after:content-['·'] after:ml-5 after:text-[#DDDDDD] last:after:content-['']">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-[#E8E8E8]" />
          </Reveal>
        </section>

        <Rule />

        <section id="progression" className="scroll-mt-28 py-8 md:py-10">
          <Reveal>
            <SectionHeading label="Iteration" title="Progression" />
          </Reveal>
          <ol className="mt-4">
            {phases.map((phase, index) => (
              <Reveal key={phase.title} delay={index * 70}>
                <PhaseRow
                  title={phase.title}
                  quarter={phase.quarter}
                  status={phase.status}
                  text={phase.text}
                  isLast={index === phases.length - 1}
                  index={index}
                />
              </Reveal>
            ))}
          </ol>
        </section>

        <Rule />

        <section id="decisions" className="scroll-mt-28 py-8 md:py-10">
          <Reveal>
            <SectionHeading label="Architecture" title="Key Design Decisions" />
          </Reveal>
          <div className="mt-16 space-y-0">
            {decisions.map((decision, index) => (
              <Reveal key={decision.title} delay={index * 90}>
                <article className="relative pt-10 pb-14 border-t border-[#E8E8E8]">
                  {/* Title row — full width at top */}
                  <div className="flex items-start justify-between gap-6 mb-8">
                    <div className="flex items-baseline gap-4">
                      <p className="font-mono text-[14px] tracking-[0.18em] text-[#CCCCCC] shrink-0">— {String(index + 1).padStart(2, '0')} —</p>
                      <h3 className="font-sans text-[22px] font-semibold text-[#111111] leading-snug">
                        {decision.title}
                      </h3>
                    </div>
                    <div className="shrink-0 pt-1">
                      <StatusChip status={decision.status} />
                    </div>
                  </div>

                  {/* Sub-decisions (rich cards) or single decision text */}
                  {'subDecisions' in decision && decision.subDecisions ? (
                    <>
                      {/* 1. PROBLEM — two cards, same style as decision tiles */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="p-5 border border-[#111111] bg-white">
                          <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#AAAAAA] mb-3">Problem A</p>
                          <p className="font-sans text-[15px] font-semibold leading-snug mb-3 text-[#111111]">Flat list — no orientation</p>
                          <div className="h-px w-full bg-[#E8E8E8] mb-3" />
                          <p className="text-[13px] leading-[1.65] text-[#666666]">AI output produced 100+ items with no hierarchy — forcing users to build structure at the moment of highest cognitive load.</p>
                        </div>
                        <div className="p-5 border border-[#111111] bg-white">
                          <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#AAAAAA] mb-3">Problem B</p>
                          <p className="font-sans text-[15px] font-semibold leading-snug mb-3 text-[#111111]">Title-only preview — no relevance signal</p>
                          <div className="h-px w-full bg-[#E8E8E8] mb-3" />
                          <p className="text-[13px] leading-[1.65] text-[#666666]">Even after selecting a topic, article previews showed only a title. Users had no way to judge relevance before tapping in — creating a friction loop of open, scan, back, repeat.</p>
                        </div>
                      </div>

                      {/* Tradeoff — inline constraint note */}
                      {(() => {
                        const tradeoff = (decision.subDecisions as { label: string; headline: string; body: string }[])[2];
                        return (
                          <div className="flex items-start gap-4 px-5 py-4 border border-[#E8E8E8] bg-[#FAFAF8] mb-10">
                            <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#AAAAAA] shrink-0 pt-[2px]">{tradeoff.label}</p>
                            <div className="w-px self-stretch bg-[#E8E8E8] shrink-0" />
                            <div>
                              <p className="font-sans text-[13px] font-semibold text-[#888888] mb-1">{tradeoff.headline}</p>
                              <p className="text-[13px] leading-[1.65] text-[#AAAAAA]">{tradeoff.body}</p>
                            </div>
                          </div>
                        );
                      })()}

                      {/* 3. Why It Matters — full width */}
                      <div className="mb-10">
                        <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#CCCCCC] mb-2">Why It Matters</p>
                        <p className="text-[15px] leading-[1.7] text-[#555555] whitespace-pre-line max-w-[72ch]">{decision.whyMatters}</p>
                      </div>

                      {/* Navigator — jump to decision deep-dives */}
                      <DecisionNavigator />

                      {/* 4. Decision A header + Before → After diagram */}
                      <div id="decision-a" className="scroll-mt-24 mb-10">
                        {/* Decision A header — chip + meta + title */}
                        <div className="w-full bg-white border border-[#E8E8E8] border-b-0">
                          <div className="flex items-start justify-between px-6 py-4 border-b border-[#E8E8E8]">
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#FFC83D] border border-[#FFC83D] px-2 py-0.5">Decision A</span>
                              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#AAAAAA]">
                                Health Topic Architecture · Categorization System · Implementation Proof
                              </p>
                            </div>
                            <div className="text-right shrink-0 ml-4">
                              <p className="font-sans text-[11px] text-[#AAAAAA]">Patient Health Topic System</p>
                              <p className="font-sans text-[11px] text-[#AAAAAA]">Real Screenshots · Live Product · 2026</p>
                            </div>
                          </div>
                          <div className="px-6 py-4">
                            <p className="font-sans text-[17px] font-semibold text-[#111111]">Topic Categorization — Restructuring Health Knowledge</p>
                          </div>
                        </div>
                        {/* Before → After diagram */}
                        <div className="flex items-stretch gap-0 border border-[#E8E8E8] overflow-hidden">
                        {/* Before */}
                        <div className="flex-1 p-5 bg-white">
                          <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#CCCCCC] mb-3">Before — Flat list</p>
                          <div className="space-y-[5px]">
                            {['Stage 4 breast cancer', 'Metastatic breast cancer', 'Chemotherapy', 'Antibiotics', 'Palliative chemotherapy', 'Intravenous treatments', 'Pain management', 'Hormone therapy', 'Immunotherapy', 'Radiation therapy', 'Fatigue', 'Nausea', 'Pneumonia'].map((t, i) => (
                              <div key={t} className="flex items-center gap-2">
                                <span className="h-[3px] w-[3px] shrink-0 bg-[#CCCCCC]" />
                                <p className={`font-mono text-[11px] text-[#AAAAAA] ${i > 6 ? 'opacity-40' : ''}`}>{t}</p>
                              </div>
                            ))}
                            <p className="font-mono text-[10px] text-[#DDDDDD] mt-1">+ 87 more</p>
                          </div>
                        </div>
                        {/* Arrow */}
                        <div className="shrink-0 px-4 flex flex-col items-center gap-1 bg-[#FAFAF8] justify-center border-x border-[#E8E8E8]">
                          <div className="h-px w-6 bg-[#FFC83D]" />
                          <div style={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '6px solid #FFC83D' }} />
                        </div>
                        {/* After */}
                        <div className="flex-1 p-5 bg-white">
                          <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#CCCCCC] mb-3">After — Grouped by category</p>
                          <div className="space-y-3">
                            {[
                              { cat: 'Conditions',  items: ['Stage 4 breast cancer', 'Metastatic breast cancer', 'Pneumonia'],                          Icon: ClipboardList, color: '#F87171' },
                              { cat: 'Medications', items: ['Chemotherapy', 'Antibiotics', 'Hormone therapy'],                                           Icon: Pill,          color: '#60A5FA' },
                              { cat: 'Procedures',  items: ['Palliative chemotherapy', 'Intravenous treatments', 'Radiation therapy'],                   Icon: Bandage,       color: '#A78BFA' },
                              { cat: 'Symptoms',    items: ['Fatigue', 'Nausea', 'Pain management'],                                                     Icon: Stethoscope,   color: '#FB7185' },
                            ].map(({ cat, items, Icon, color }) => (
                              <div key={cat}>
                                <div className="flex items-center gap-1.5 mb-[4px]">
                                  <Icon size={11} strokeWidth={1.75} color={color} />
                                  <p className="font-sans text-[11px] uppercase tracking-[0.18em]" style={{ color }}>{cat}</p>
                                </div>
                                {items.map((item) => (
                                  <div key={item} className="flex items-center gap-2">
                                    <span className="h-[3px] w-[3px] shrink-0 bg-[#CCCCCC]" />
                                    <p className="font-mono text-[11px] text-[#555555]">{item}</p>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                        </div>{/* end diagram */}
                      </div>{/* end outer decision-a wrapper */}

                      {/* 5. Implementation Proof panel — screenshots + logic */}
                      <div className="w-full bg-white border border-[#E8E8E8] scroll-mt-24">

                        {/* 3-column body */}
                        <div className="grid grid-cols-[1fr_auto_1fr] border-b border-[#E8E8E8]">

                          {/* LEFT — Before */}
                          <div className="px-5 py-6 border-r border-[#E8E8E8]">
                            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#AAAAAA] mb-2">Before</p>
                            <p className="font-sans text-[13px] font-semibold text-[#111111] mb-4">Flat Topic Extraction</p>
                            <div className="rounded-xl overflow-hidden border border-[#E8E8E8]">
                              <DecisionABeforeImage />
                            </div>
                          </div>

                          {/* CENTER — Logic flow */}
                          <div className="px-5 py-6 border-r border-[#E8E8E8] flex flex-col justify-center" style={{ minWidth: '180px' }}>
                            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#AAAAAA] mb-2">Logic</p>
                            <p className="font-sans text-[13px] font-semibold text-[#111111] mb-5">Information Architecture Redesign</p>
                            <div className="flex flex-col items-stretch">
                              {['Raw AI Extraction', 'Cognitive Pattern Analysis', 'Category Mapping', 'Structured Topic System'].map((node, i) => (
                                <React.Fragment key={node}>
                                  <div className="border border-[#E8E8E8] px-3 py-2 text-[11px] text-center text-[#555555] font-mono">{node}</div>
                                  {i < 3 && <p className="font-mono text-[10px] text-[#CCCCCC] my-1 text-center">+</p>}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>

                          {/* RIGHT — After */}
                          <div className="px-5 py-6">
                            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#AAAAAA] mb-2">After</p>
                            <p className="font-sans text-[13px] font-semibold text-[#111111] mb-4">Categorized Health Model</p>
                            <div className="rounded-xl overflow-hidden border border-[#E8E8E8]">
                              <DecisionAAfterImage />
                            </div>
                            {/* Visual Encoding legend */}
                            <div className="mt-5 pt-4 border-t border-[#F0F0EE]">
                              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#CCCCCC] mb-3">Visual Encoding</p>
                              <div className="space-y-2">
                                {[
                                  { Icon: ClipboardList, label: 'Conditions',  color: '#F87171' },
                                  { Icon: Pill,          label: 'Medications', color: '#60A5FA' },
                                  { Icon: Bandage,       label: 'Procedures',  color: '#A78BFA' },
                                  { Icon: Stethoscope,   label: 'Symptoms',    color: '#FB7185' },
                                ].map(({ Icon, label, color }) => (
                                  <div key={label} className="flex items-center gap-2">
                                    <Icon size={12} strokeWidth={1.75} color={color} />
                                    <p className="font-sans text-[11px] text-[#888888]">{label}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Bottom metrics bar */}
                        <div className="flex items-start justify-between gap-6 px-6 py-4 flex-wrap">
                          <div className="flex items-start gap-8 flex-wrap">
                            {[
                              { arrow: '↓', label: 'Cognitive Load', desc: 'Reduced scanning effort per session' },
                              { arrow: '↑', label: 'Scan Efficiency', desc: 'Faster topic recognition by category' },
                              { arrow: '↑', label: 'Perceived Clarity', desc: 'Mental model alignment with patient context' },
                            ].map((m) => (
                              <div key={m.label}>
                                <p className="font-sans text-[18px] text-[#111111] leading-none">{m.arrow}</p>
                                <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.18em] text-[#111111]">{m.label}</p>
                                <p className="mt-0.5 font-sans text-[11px] text-[#AAAAAA]">{m.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* 6. Decision B — Implementation Proof panel */}
                      <div id="decision-b" className="w-full bg-white border border-[#E8E8E8] mt-10 scroll-mt-24">

                        {/* Top metadata bar */}
                        <div className="flex items-start justify-between px-6 py-4 border-b border-[#E8E8E8]">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#FFC83D] border border-[#FFC83D] px-2 py-0.5">Decision B</span>
                            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#AAAAAA]">
                              Health Article Surface · Preview Density · Implementation Proof
                            </p>
                          </div>
                          <div className="text-right shrink-0 ml-4">
                            <p className="font-sans text-[11px] text-[#AAAAAA]">Article Relevance Evaluation Model</p>
                            <p className="font-sans text-[11px] text-[#AAAAAA]">Real Screenshots · Live Product · 2026</p>
                          </div>
                        </div>

                        {/* Title row */}
                        <div className="px-6 py-4 border-b border-[#E8E8E8]">
                          <p className="font-sans text-[17px] font-semibold text-[#111111]">Preview Density — Reducing Decision Latency</p>
                        </div>

                        {/* 3-column body */}
                        <div className="grid grid-cols-[1fr_auto_1fr] border-b border-[#E8E8E8]">

                          {/* LEFT — Before */}
                          <div className="px-5 py-6 border-r border-[#E8E8E8]">
                            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#AAAAAA] mb-1">Before</p>
                            <p className="font-sans text-[15px] font-semibold text-[#111111] mb-4">Low Context Preview</p>
                            <div className="rounded-xl overflow-hidden border border-[#E8E8E8]">
                              <DecisionBBeforeImage />
                            </div>
                            <div className="mt-5 pt-5 border-t border-[#E8E8E8]">
                              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#AAAAAA] mb-3">Observed Friction Signals</p>
                              <div className="space-y-3">
                                {[
                                  { signal: 'No body context above fold', reason: 'Title alone cannot signal medical relevance.' },
                                  { signal: 'Summary truncated at one line', reason: 'Relevance unresolvable before tapping.' },
                                  { signal: 'Source reduced to icon only', reason: 'Credibility suppressed at card level.' },
                                  { signal: 'Tap required to evaluate', reason: 'Every navigation event carries unknown value.' },
                                ].map(({ signal, reason }) => (
                                  <div key={signal}>
                                    <p className="font-sans text-[13px] font-medium text-[#333333] leading-snug">{signal}</p>
                                    <p className="font-sans text-[13px] text-[#666666] leading-[1.6] mt-0.5">{reason}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* CENTER — Logic flow */}
                          <div className="px-5 py-6 border-r border-[#E8E8E8] flex flex-col" style={{ minWidth: '180px' }}>
                            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#AAAAAA] mb-2">Logic</p>
                            <p className="font-sans text-[13px] font-semibold text-[#111111] mb-4">Re-Designing the Decision Surface</p>
                            <div className="flex flex-col items-stretch mb-4">
                              {['Low Information Preview', 'Ambiguous Relevance', 'Tap-Based Guesswork', 'Evaluation Friction'].map((node, i) => (
                                <React.Fragment key={node}>
                                  <div className="border border-[#E8E8E8] px-3 py-2 text-[11px] text-center text-[#555555] font-mono">{node}</div>
                                  {i < 3 && <p className="font-mono text-[10px] text-[#CCCCCC] my-1 text-center">+</p>}
                                </React.Fragment>
                              ))}
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex-1 h-px bg-[#E8E8E8]" />
                              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#CCCCCC]">Redesign</p>
                              <div className="flex-1 h-px bg-[#E8E8E8]" />
                            </div>
                            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#AAAAAA] mb-2">Density Additions</p>
                            <div className="border border-[#E8E8E8] px-3 py-2 mb-3 space-y-1">
                              {['Expanded summary', 'Source visibility', 'Clear visual boundaries', 'AI explain entry point'].map(item => (
                                <div key={item} className="flex items-start gap-1.5">
                                  <span className="font-sans text-[11px] text-[#CCCCCC]">·</span>
                                  <p className="font-sans text-[11px] text-[#555555]">{item}</p>
                                </div>
                              ))}
                            </div>
                            <p className="font-mono text-[10px] text-[#CCCCCC] my-1 text-center">+</p>
                            <div className="border border-[#FFC83D] px-3 py-2 text-[11px] text-center text-[#FFC83D] font-mono">
                              Pre-Tap Relevance Judgment
                            </div>
                          </div>

                          {/* RIGHT — After */}
                          <div className="px-5 py-6">
                            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#AAAAAA] mb-1">After</p>
                            <p className="font-sans text-[15px] font-semibold text-[#111111] mb-4">Contextual Preview Model</p>
                            <div className="rounded-xl overflow-hidden border border-[#E8E8E8]">
                              <DecisionBAfterImage />
                            </div>
                            <div className="mt-5 pt-5 border-t border-[#E8E8E8]">
                              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#AAAAAA] mb-3">System Response & Improvements</p>
                              <div className="space-y-3">
                                {[
                                  { change: 'Expanded 2–3 line summary', outcome: 'Relevance judgment possible before tapping.' },
                                  { change: 'Source surfaced with icon and label', outcome: 'Credibility visible at card level.' },
                                  { change: 'Increased whitespace per card', outcome: 'Discrete article boundaries. Reduced visual noise.' },
                                  { change: 'AI entry point at card surface', outcome: 'Informed evaluation becomes the default state.' },
                                ].map(({ change, outcome }) => (
                                  <div key={change}>
                                    <p className="font-sans text-[13px] font-medium text-[#333333] leading-snug">{change}</p>
                                    <p className="font-sans text-[13px] text-[#666666] leading-[1.6] mt-0.5">{outcome}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Bottom bar */}
                        <div className="px-6 py-4">
                          <p className="font-sans text-[13px] italic text-[#AAAAAA] mb-4">"Preview density is not about adding content. It is about reducing decision latency."</p>
                          <div className="flex items-start gap-8 flex-wrap">
                            {[
                              { arrow: '↓', label: 'Tap Uncertainty', desc: 'Fewer uninformed navigation events' },
                              { arrow: '↓', label: 'Cognitive Friction', desc: 'Relevance signal available pre-interaction' },
                              { arrow: '↑', label: 'Deliberate Interaction', desc: 'Taps carry informed intent' },
                            ].map((m) => (
                              <div key={m.label}>
                                <p className="font-sans text-[18px] text-[#111111] leading-none">{m.arrow}</p>
                                <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.18em] text-[#111111]">{m.label}</p>
                                <p className="mt-0.5 font-sans text-[11px] text-[#AAAAAA]">{m.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </>
                  ) : decision.title === '2 Tabs vs 3 Tabs' ? (
                    /* ── DECISION 02 — Editorial Strategic Layout ── */
                    <div className="w-full py-2">

                      {/* Kicker */}
                      <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#C9A227] mb-5 font-medium">
                        Navigation Architecture · Decision Memo
                      </p>

                      {/* Serif headline */}
                      <h3 className="font-serif text-[32px] md:text-[42px] font-normal text-[#111111] leading-[1.15] mb-3" style={{ letterSpacing: '-0.01em' }}>
                        2 Tabs vs 3 Tabs
                      </h3>
                      <p className="font-serif italic text-[18px] md:text-[22px] text-[#666666] leading-snug mb-10">
                        Navigating Product Tension
                      </p>

                      {/* Rule */}
                      <div className="h-px w-full mb-12" style={{ background: 'linear-gradient(to right, #C9A227 48px, #E8E8E8 48px)' }} />

                      {/* Two-column debate */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

                        {/* LEFT — Designer Proposal */}
                        <div>
                          {/* Mustard tag */}
                          <span
                            className="inline-block font-sans text-[10px] uppercase tracking-[0.2em] font-semibold mb-5 px-2.5 py-1"
                            style={{ color: '#C9A227', border: '1px solid #C9A227', background: '#FDFAF2' }}
                          >
                            Designer Proposal
                          </span>
                          <h4 className="font-sans text-[22px] font-semibold text-[#111111] mb-2 leading-snug">
                            2-Tab Model
                          </h4>
                          <p className="font-serif italic text-[15px] mb-5" style={{ color: '#C9A227' }}>
                            Minimize surface complexity.
                          </p>
                          <p className="font-sans text-[15px] leading-[1.8] text-[#555555]">
                            I advocated for restraint — two tabs, tighter surface, lower cognitive overhead. Structural simplicity would serve users better than explicit hierarchy at this content density.
                          </p>
                        </div>

                        {/* RIGHT — Founder Direction */}
                        <div>
                          {/* Mustard tag */}
                          <span
                            className="inline-block font-sans text-[10px] uppercase tracking-[0.2em] font-semibold mb-5 px-2.5 py-1"
                            style={{ color: '#C9A227', border: '1px solid #C9A227', background: '#FDFAF2' }}
                          >
                            Founder Direction
                          </span>
                          <h4 className="font-sans text-[22px] font-semibold text-[#111111] mb-2 leading-snug">
                            3-Tab Model
                          </h4>
                          <p className="font-serif italic text-[15px] mb-5" style={{ color: '#C9A227' }}>
                            Make structure explicit.
                          </p>
                          <p className="font-sans text-[15px] leading-[1.8] text-[#555555]">
                            The founder wanted a dedicated third tab — explicit structure prevents ambiguity as the product scales. Follow-up deserved first-class visibility, not contextual embedding.
                          </p>
                        </div>

                      </div>

                      {/* Bottom divider + Final Decision */}
                      <div className="mt-14 pt-10 border-t border-[#E8E8E8] flex flex-col items-center text-center gap-4">
                        <div className="h-[3px] w-10 mb-2" style={{ background: '#C9A227' }} />
                        <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#AAAAAA]">
                          Final Decision
                        </p>
                        <p className="font-serif text-[20px] md:text-[24px] font-normal text-[#111111] leading-snug">
                          We shipped the 3-tab model.
                        </p>
                        <p className="font-serif italic text-[15px] text-[#888888] leading-[1.75] max-w-[52ch]">
                          I chose alignment over preference — recognizing that explicit structure was the stronger signal at this stage of product maturity.
                        </p>
                      </div>

                      {/* ── Execution Comparison ── */}
                      <div className="mt-20 pt-14 border-t border-[#E8E8E8]">

                        {/* Section kicker + title */}
                        <p className="font-sans text-[11px] uppercase tracking-[0.22em] font-medium mb-4" style={{ color: '#C9A227' }}>
                          Execution Comparison
                        </p>
                        <h4 className="font-sans text-[24px] md:text-[30px] font-semibold text-[#111111] leading-snug mb-2" style={{ letterSpacing: '-0.01em' }}>
                          Navigation Architecture
                        </h4>
                        <div className="h-px w-full mt-8 mb-12" style={{ background: 'linear-gradient(to right, #C9A227 48px, #E8E8E8 48px)' }} />

                        {/* Two columns — phone mocks */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

                          {/* LEFT — 2-Tab: full image, slightly smaller */}
                          <div className="mx-auto w-full max-w-[320px] md:max-w-none md:w-[78%]">
                            <div className="flex items-baseline gap-3 mb-7">
                              <h5 className="font-sans text-[15px] font-semibold text-[#111111]">2-Tab Flow</h5>
                              <span className="font-sans text-[11px] text-[#AAAAAA] uppercase tracking-[0.14em]">My Proposal</span>
                            </div>
                            <div className="flex flex-col gap-5">
                              {([
                                { label: 'Step 1', src: '/decision-02-2tab-step1.png' },
                                { label: 'Step 2', src: '/decision-02-2tab-step2.png' },
                                { label: 'Step 3', src: '/decision-02-2tab-step3.png' },
                              ] as const).map(({ label, src }) => (
                                <div key={label}>
                                  <div
                                    className="w-full overflow-hidden"
                                    style={{
                                      borderRadius: '16px',
                                      boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
                                      border: '1px solid #EBEBEB',
                                    }}
                                  >
                                    <img
                                      src={src}
                                      alt={`2-tab flow ${label}`}
                                      className="w-full h-auto block"
                                    />
                                  </div>
                                  <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#AAAAAA] mt-2.5 ml-1">{label}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* RIGHT — 3-Tab: crop top nav bar, slightly smaller */}
                          <div className="mx-auto w-full max-w-[320px] md:max-w-none md:w-[78%]">
                            <div className="flex items-baseline gap-3 mb-7">
                              <h5 className="font-sans text-[15px] font-semibold text-[#111111]">3-Tab Flow</h5>
                              <span className="font-sans text-[11px] uppercase tracking-[0.14em]" style={{ color: '#C9A227' }}>Final Shipped</span>
                            </div>
                            <div className="flex flex-col gap-5">
                              {([
                                { label: 'Step 1', src: '/decision-02-3tab-step1.png' },
                                { label: 'Step 2', src: '/decision-02-3tab-step2.png' },
                                { label: 'Step 3', src: '/decision-02-3tab-step3.png' },
                              ] as const).map(({ label, src }) => (
                                <div key={label}>
                                  {/* overflow-hidden + negative margin-top crops the top nav bar (~11% of image height) */}
                                  <div
                                    className="w-full overflow-hidden"
                                    style={{
                                      borderRadius: '16px',
                                      boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
                                      border: '1px solid #C9A227',
                                    }}
                                  >
                                    <img
                                      src={src}
                                      alt={`3-tab flow ${label}`}
                                      className="w-full h-auto block"
                                      style={{ marginTop: '-11%' }}
                                    />
                                  </div>
                                  <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#AAAAAA] mt-2.5 ml-1">{label}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>

                        {/* Bottom summary */}
                        <div className="mt-14 pt-8 border-t border-[#E8E8E8] flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 justify-center">
                          <div className="flex items-start gap-3">
                            <div className="w-[3px] h-full self-stretch min-h-[32px] shrink-0 bg-[#E8E8E8] mt-1" />
                            <p className="font-sans text-[15px] text-[#666666] leading-snug">
                              2 Tabs reduced surface complexity.
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-[3px] h-full self-stretch min-h-[32px] shrink-0 mt-1" style={{ background: '#C9A227' }} />
                            <p className="font-sans text-[15px] text-[#111111] leading-snug font-normal">
                              3 Tabs increased structural clarity.
                            </p>
                          </div>
                        </div>

                      </div>

                    </div>
                  ) : decision.title === 'Unified Family Context System (Proposed)' ? (
                    /* ── DECISION 03 — System Architecture + Prototype Layout ── */
                    <div className="w-full py-2">

                      {/* Kicker */}
                      <p className="font-sans text-[11px] uppercase tracking-[0.22em] font-medium mb-5" style={{ color: '#C9A227' }}>
                        System Design · Designer Proposal
                      </p>

                      {/* Serif headline */}
                      <h3 className="font-serif text-[32px] md:text-[42px] font-normal text-[#111111] leading-[1.15] mb-2" style={{ letterSpacing: '-0.01em' }}>
                        Unified Context as Infrastructure
                      </h3>
                      <p className="font-serif italic text-[16px] md:text-[18px] text-[#888888] leading-snug mb-10">
                        Designer-initiated structural improvement
                      </p>

                      {/* Gradient rule */}
                      <div className="h-px w-full mb-12" style={{ background: 'linear-gradient(to right, #C9A227 48px, #E8E8E8 48px)' }} />

                      {/* SECTION 1 — Problem & Insight */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-14">

                        {/* Left — Problem bullets */}
                        <div>
                          <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#AAAAAA] mb-5">Problem in Current Implementation</p>
                          <ul className="space-y-3">
                            {[
                              'Context selection repeated across core surfaces',
                              'State resets between workflows',
                              'Increased friction and context-switch risk',
                            ].map(item => (
                              <li key={item} className="flex items-start gap-3">
                                <span className="mt-[9px] shrink-0 w-[4px] h-[4px] rounded-full bg-[#DDDDDD]" />
                                <p className="font-sans text-[15px] leading-[1.7] text-[#555555]">{item}</p>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Right — Structural Insight */}
                        <div>
                          <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#AAAAAA] mb-5">Structural Insight</p>
                          <p className="font-sans text-[17px] font-semibold leading-[1.65] text-[#111111] mb-4">
                            Context is infrastructure, not feature-level UI.
                          </p>
                          <p className="font-sans text-[15px] leading-[1.75] text-[#666666]">
                            Family state should persist globally and propagate across workflows — reducing repetitive selection and preventing context errors at the point of use.
                          </p>
                        </div>

                      </div>

                      {/* Full-width divider */}
                      <div className="h-px w-full bg-[#E8E8E8] mb-12" />

                      {/* SECTION 2 — Architecture Diagram + Prototype Placeholder */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">

                        {/* Left — System diagram */}
                        <div>
                          <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#AAAAAA] mb-8">System Diagram</p>
                          <div className="flex flex-col items-start gap-0 pl-4">
                            {/* Global context node */}
                            <div
                              className="px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em]"
                              style={{ border: '1px solid #C9A227', color: '#C9A227', background: '#FDFAF2' }}
                            >
                              Global Context Layer
                            </div>
                            {/* Arrow stem */}
                            <div className="flex flex-col items-center ml-[60px]">
                              <div className="w-px h-7" style={{ background: '#C9A227' }} />
                              <span className="font-sans text-[13px] leading-none -mt-[2px]" style={{ color: '#C9A227' }}>↓</span>
                            </div>
                            {/* Propagation label */}
                            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#CCCCCC] mb-3 ml-1">Propagates to</p>
                            {/* Surface nodes — 2×2 grid separated by 1px gap */}
                            <div className="grid grid-cols-2 gap-px w-full max-w-[300px]" style={{ background: '#E8E8E8' }}>
                              {['Appointments', 'Medications', 'Notes', 'Insurance'].map(surface => (
                                <div key={surface} className="bg-white px-4 py-3 font-mono text-[11px] text-[#555555]">
                                  {surface}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right — Prototype placeholder */}
                        <div>
                          <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#AAAAAA] mb-8">Prototype</p>
                          <div
                            className="w-full flex flex-col items-center justify-center gap-3"
                            style={{
                              aspectRatio: '16/9',
                              borderRadius: '16px',
                              background: '#F5F5F3',
                              border: '1px solid #E8E8E8',
                            }}
                          >
                            <p className="font-serif italic text-[14px] text-center px-8 leading-snug" style={{ color: '#BBBBBB' }}>
                              Prototype UI — Persistent Context Bar + Quick Switch
                            </p>
                            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-center px-8" style={{ color: '#CCCCCC' }}>
                              Context persists across surfaces and updates globally
                            </p>
                          </div>
                        </div>

                      </div>

                      {/* SECTION 3 — Impact */}
                      <div className="mt-14 pt-10 border-t border-[#E8E8E8]">
                        <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#AAAAAA] mb-6">Impact</p>
                        <div className="flex flex-col gap-3">
                          {[
                            'Reduces repetitive selection and cognitive load across surfaces.',
                            'Establishes system-wide state coherence for family workflows.',
                          ].map(item => (
                            <div key={item} className="flex items-start gap-3">
                              <span className="font-sans text-[15px] shrink-0 mt-[1px]" style={{ color: '#C9A227' }}>→</span>
                              <p className="font-sans text-[15px] leading-[1.7] text-[#333333]">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  ) : (
                    /* ── Generic fallback for Decision 04+ ── */
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-[28%_1fr] gap-8 lg:gap-14 items-start">
                        <div className="lg:pr-4">
                          <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#CCCCCC] mb-2">Problem</p>
                          <p className="text-[15px] leading-[1.7] text-[#555555]">{decision.problem}</p>
                        </div>
                        <div className="border-l-2 border-[#FFC83D] pl-6 lg:pl-8">
                          <p className="font-sans text-[17px] font-medium leading-[1.75] text-[#111111] mb-6">{decision.decision}</p>
                          <div className="border-t border-[#F0F0F0] pt-4">
                            <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#CCCCCC] mb-2">Why It Matters</p>
                            <p className="text-[15px] leading-[1.7] text-[#555555]">{decision.whyMatters}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-10">
                        <div className="transition-transform duration-500 ease-out hover:-translate-y-1">
                          <MediaPlaceholder label={decision.visual} ratio="16:9" />
                        </div>
                        <ImageCaption text={`${decision.title} — supporting visual`} />
                      </div>
                    </>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <Rule />

        <section id="system" className="scroll-mt-28 py-8 md:py-10">
          <Reveal className="max-w-[980px] mx-auto">
            <SectionHeading label="Architecture" title="System-Level Considerations" />
            <div className="mt-10 rounded-[16px] bg-[#F7F7F5] border border-[#EBEBEB] p-8 md:p-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[70ch]">
                {[
                  { label: 'Cognitive Load', desc: 'Manage density across transcript and decision urgency.' },
                  { label: 'Progressive Disclosure', desc: 'Move from overview to detail without context loss.' },
                  { label: 'State Architecture', desc: 'Family-level persistence across multi-feature journeys.' },
                  { label: 'HIPAA Awareness', desc: 'Boundary condition for interaction and trust patterns.' },
                ].map((item) => (
                  <div key={item.label} className="bg-white border border-[#E8E8E8] rounded-[8px] p-4">
                    <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-[#FFC83D] mb-1">Constraint</p>
                    <p className="font-sans text-[13px] font-semibold text-[#111111]">{item.label}</p>
                    <p className="mt-1 font-sans text-[13px] leading-[1.6] text-[#666666]">{item.desc}</p>
                  </div>
                ))}
              </div>
              {/* System flow nodes */}
              <div className="mt-10 overflow-x-auto">
                <div className="flex items-stretch gap-0 min-w-max">
                  {[
                    { node: 'Record', type: '[Audio]' },
                    { node: 'Transcript', type: '[Text]' },
                    { node: 'Summary', type: '[ML]' },
                    { node: 'Topics', type: '[Taxonomy]' },
                    { node: 'Follow-up', type: '[Action]' },
                  ].map((item, i) => (
                    <React.Fragment key={item.node}>
                      <div className="flex flex-col items-center">
                        <div className="border border-[#CCCCCC] bg-white px-4 py-2 rounded-[4px] min-w-[80px] text-center">
                          <p className="font-mono text-[11px] tracking-[0.08em] text-[#111111] font-semibold">{item.node}</p>
                          <p className="font-mono text-[9px] tracking-[0.1em] text-[#999999] mt-0.5">{item.type}</p>
                        </div>
                      </div>
                      {i < 4 && (
                        <div className="flex items-center px-1">
                          <div className="h-px w-6 bg-[#CCCCCC]" />
                          <span className="font-mono text-[10px] text-[#AAAAAA]">→</span>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="mt-12 space-y-3">
                <div className="transition-transform duration-500 ease-out hover:-translate-y-1">
                  <MediaPlaceholder label="System map (16:9)" ratio="16:9" />
                </div>
                <ImageCaption text="Cross-feature loop: Record → Transcript → Summary → Topics → Follow-up." />
              </div>
            </div>
          </Reveal>
        </section>

        <Rule />

        <section id="validation" className="scroll-mt-28 py-8 md:py-10">
          <Reveal className="max-w-[980px] mx-auto">
            <SectionHeading label="Validation" title="Observations" />
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
              <div className="space-y-4">
                {[
                  { n: '01', text: 'Scroll fatigue spiked when summaries lacked prioritization.' },
                  { n: '02', text: 'Topic overload rose fast as visit complexity increased.' },
                  { n: '03', text: 'Follow-up actions clustered right after comprehension moments.' },
                ].map(({ n, text }) => (
                  <div key={n} className="flex items-start gap-4 border-b border-[#E8E8E8] pb-4 last:border-b-0">
                    <span className="font-mono text-[11px] text-[#CCCCCC] shrink-0 mt-[3px]">{n}</span>
                    <p className="font-sans text-[15px] leading-[1.65] text-[#333333]">{text}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-[12px] border border-[#E8E8E8] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="transition-transform duration-500 ease-out hover:-translate-y-1">
                  <MediaPlaceholder label="Validation snapshot (4:3)" ratio="4:3" />
                </div>
                <ImageCaption text="Research notes and annotated evidence from early usage patterns." />
              </div>
            </div>
          </Reveal>
        </section>

        <Rule />

        <section id="next" className="scroll-mt-28 py-8 md:py-10">
          <Reveal className="max-w-[980px] mx-auto">
            <SectionHeading label="Iteration" title="Next" />
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { n: '01', text: 'Instrument the full funnel from recording to follow-up completion.' },
                { n: '02', text: 'A/B test embedded vs. tabbed follow-up entry points.' },
                { n: '03', text: 'Prioritize topics by urgency to reduce post-visit decision latency.' },
                { n: '04', text: 'Add source-quality and uncertainty cues for high-risk content.' },
                { n: '05', text: 'Extend family workflows with shared reminders and care coordination.' },
              ].map(({ n, text }) => (
                <div key={n} className="border border-[#E8E8E8] bg-white rounded-[10px] p-5">
                  <p className="font-mono text-[11px] text-[#CCCCCC] mb-3">{n}</p>
                  <p className="font-sans text-[13px] leading-[1.65] text-[#444444]">{text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <Rule />

        <section id="closing" className="scroll-mt-28 py-8 md:py-10 pb-24">
          <Reveal className="max-w-[720px] mx-auto">
            <SectionHeading label="Impact" title="Closing" />
            <p className="mt-6 text-[15px] leading-[1.7] text-[#111111] max-w-[58ch]">
              Built a 0→1 AI healthcare product end-to-end — from capture to structure to trust.
            </p>
            {/* Skills strip */}
            <div className="mt-8 flex flex-wrap gap-2">
              {['0→1 Execution', 'IA', 'Trade-off Reasoning', 'AI UX', 'Systems Thinking', 'Cross-functional Delivery'].map((s) => (
                <span key={s} className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#666666] border border-[#E8E8E8] px-3 py-1.5 rounded-full">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-10 flex flex-col md:flex-row gap-4">
              <a
                href="/"
                className="flex-1 bg-[#121212] text-white px-8 py-4 rounded-xl font-semibold hover:bg-black transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_20px_rgba(0,0,0,0.15)] active:scale-95 font-sans uppercase tracking-[0.14em] text-xs text-center"
              >
                View Next Case Study
              </a>
              <a
                href="mailto:tangxiya9906@gmail.com"
                className="flex-1 bg-white border border-[#E8E8E8] py-4 px-8 rounded-xl flex items-center justify-center space-x-3 group hover:bg-[#FAFAF8] transition-all duration-300 hover:-translate-y-0.5"
              >
                <Mail size={18} />
                <span className="font-sans font-semibold uppercase tracking-[0.14em] text-xs">Contact</span>
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </Reveal>
        </section>
      </main>
      </div>{/* end content wrapper */}

      <ContactSection />
      <Footer />
    </div>
  );
};

export default PatientlyCaseStudyPage;
