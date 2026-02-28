
import React from 'react';
import { 
  Puzzle, 
  Search, 
  Brain, 
  Layers, 
  Shapes, 
  Target 
} from 'lucide-react';
import { Project, ProjectCategory } from './types';

export const COLORS = {
  yellow: '#F7DA21', // Spelling Bee
  green: '#6AAA64',  // Wordle
  purple: '#BC70AD', // Connections
  red: '#F05A5A',    // Letter Boxed
  blue: '#00B4D8',   // Tiles
  aqua: '#81C784',   // Vertex
  neutral: '#FAF9F6', // Paper
  border: 'rgba(0,0,0,0.08)'
};

// NYT Games-inspired graphics (maintained for subtle background layering)
const WordleGrid = () => (
  <div className="grid grid-cols-5 gap-1.5 w-28 opacity-20">
    {[...Array(20)].map((_, i) => (
      <div key={i} className={`h-5 w-5 rounded-sm ${i < 5 ? 'bg-black' : i < 10 ? 'bg-[#6AAA64]' : i < 15 ? 'bg-[#C9B458]' : 'bg-[#787C7E]'}`} />
    ))}
  </div>
);

const BeeHoneycomb = () => (
  <div className="relative w-24 h-24 opacity-20">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black rotate-90 clip-path-hex" />
    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-black rotate-90 clip-path-hex" />
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-black rotate-90 clip-path-hex" />
    <div className="absolute top-1/4 left-2 w-8 h-8 bg-black rotate-90 clip-path-hex" />
    <div className="absolute top-1/4 right-2 w-8 h-8 bg-black rotate-90 clip-path-hex" />
    <div className="absolute bottom-1/4 left-2 w-8 h-8 bg-black rotate-90 clip-path-hex" />
    <div className="absolute bottom-1/4 right-2 w-8 h-8 bg-black rotate-90 clip-path-hex" />
  </div>
);

const ConnectionsPattern = () => (
  <div className="flex flex-col gap-2 w-28 opacity-20">
    <div className="h-4 w-full bg-black rounded-sm" />
    <div className="h-4 w-full bg-black rounded-sm opacity-80" />
    <div className="h-4 w-full bg-black rounded-sm opacity-60" />
    <div className="h-4 w-full bg-black rounded-sm opacity-40" />
  </div>
);

const TilesArt = () => (
  <div className="grid grid-cols-3 gap-1 w-24 opacity-20">
    {[...Array(9)].map((_, i) => (
      <div key={i} className={`h-6 w-6 border-2 border-black rounded-sm ${i % 2 === 0 ? 'bg-black' : 'bg-transparent'}`} />
    ))}
  </div>
);

export const PROJECTS: Project[] = [
  {
    id: 'spelling-bee-redesign',
    title: 'Patiently',
    description: 'AI turns clinical conversations into clear summaries and next steps for families.',
    category: ProjectCategory.UX_DESIGN,
    color: COLORS.yellow,
    icon: 'Brain',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
    difficulty: 'Medium',
    skills: ['Interaction Design', 'Usability Testing'],
    content: `
      ## The Challenge
      How can we maintain engagement in repetitive cognitive tasks without causing mental fatigue?
    `
  },
  {
    id: 'wordle-analytics',
    title: 'Word Wisdom',
    description: 'A data-driven deep dive into social sharing mechanics and viral loop design.',
    category: ProjectCategory.RESEARCH,
    color: COLORS.green,
    icon: 'Target',
    coverImage: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=600',
    difficulty: 'Hard',
    skills: ['Data Analysis', 'Psychology'],
    content: `
      ## The Research
      We investigated why 5x6 grid emojis became the universal language of early 2022.
    `
  },
  {
    id: 'connections-system',
    title: 'Semantic Sort',
    description: 'Building an AI-assisted taxonomy system for enterprise knowledge management.',
    category: ProjectCategory.PRODUCT_STRATEGY,
    color: COLORS.purple,
    icon: 'Puzzle',
    coverImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600',
    difficulty: 'Expert',
    skills: ['Information Architecture', 'AI Strategy'],
    content: `
      ## Problem Statement
      Enterprise data is often siloed and lacks meaningful connections between departments.
    `
  },
  {
    id: 'tiles-craft',
    title: 'Pattern Play',
    description: 'Crafting a modular design system for rapid multi-platform product deployment.',
    category: ProjectCategory.CRAFT,
    color: COLORS.red,
    icon: 'Shapes',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600',
    difficulty: 'Easy',
    skills: ['Design Systems', 'React'],
    content: `
      ## Objective
      Standardize UI across 4 distinct web applications while maintaining unique brand identities.
    `
  }
];

export const getIcon = (name: string, size = 24) => {
  switch (name) {
    case 'Puzzle': return <Puzzle size={size} />;
    case 'Search': return <Search size={size} />;
    case 'Brain': return <Brain size={size} />;
    case 'Layers': return <Layers size={size} />;
    case 'Shapes': return <Shapes size={size} />;
    case 'Target': return <Target size={size} />;
    default: return <Puzzle size={size} />;
  }
};

export const getGameGraphic = (id: string) => {
  switch (id) {
    case 'spelling-bee-redesign': return <BeeHoneycomb />;
    case 'wordle-analytics': return <WordleGrid />;
    case 'connections-system': return <ConnectionsPattern />;
    case 'tiles-craft': return <TilesArt />;
    default: return null;
  }
};
