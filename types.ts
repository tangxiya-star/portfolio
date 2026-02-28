
export enum ProjectCategory {
  UX_DESIGN = 'UX Design',
  PRODUCT_STRATEGY = 'Strategy',
  RESEARCH = 'Research',
  CRAFT = 'Craft'
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  color: string;
  icon: string;
  coverImage: string; // New property for mockups
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  skills: string[];
  content: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
