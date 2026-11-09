export type EventCategory =
  | 'Community'
  | 'Schools'
  | 'Fitness'
  | 'Awards'
  | 'Inclusive'
  | 'Entertainment'
  | 'Life Skills'
  | 'Public Events';

export type TargetAudience =
  | 'Kids'
  | 'Youth'
  | 'Senior Citizens'
  | 'All ages'
  | 'Women';

export interface EventItem {
  id: string;
  number: string;
  title: string;
  location: string;
  description: string;
  category: EventCategory | string;
  categories: EventCategory[];
  image: string;
  audience?: string;
  targetAudiences?: TargetAudience[];
  sponsor?: string;
  collaborators?: string;
  participantCount?: number;
  screenTimeValue?: number;
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
