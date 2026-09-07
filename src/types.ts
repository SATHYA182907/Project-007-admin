export interface EventItem {
  id: string;
  number: string;
  title: string;
  location: string;
  description: string;
  category: 'Children' | 'Women' | 'Families' | 'Community' | 'Schools' | 'Fitness' | 'Awards' | 'Inclusive';
  image: string;
  audience?: string;
  duration?: string;
  featured?: boolean;
  highlights?: string[];
  galleryImages?: string[];
}

export interface StatItem {
  number: string;
  label: string;
  description: string;
  iconName: string;
}

export interface PrincipleItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface CollaborationPath {
  id: string;
  pathNumber: string;
  title: string;
  targetAudience: string;
  description: string;
  programs: string[];
  ctaText: string;
  icon: string;
}

export interface WhyChooseItem {
  title: string;
  description: string;
  icon: string;
}
