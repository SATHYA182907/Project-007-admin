import type { CollaborationPath } from '../types';

export const collaborationData: CollaborationPath[] = [
  {
    id: 'schools',
    pathNumber: 'PATH 01',
    title: 'Schools & Educational Institutions',
    targetAudience: 'Schools, Colleges & Academies',
    description: 'Build a culture of creativity, confidence, and life skills beyond the classroom. Partner with us to make learning more engaging and experiential.',
    programs: [
      'Life Skills Clubs',
      'Debate & Public Speaking Competitions',
      'Creative Arts & STEM Workshops',
      'Mental Health & Awareness Programs',
      'Leadership & Team-Building Activities',
      'Reading & Communication Sessions',
      'Special Event Collaborations'
    ],
    ctaText: 'Partner as a School',
    icon: 'GraduationCap'
  },
  {
    id: 'parents',
    pathNumber: 'PATH 02',
    title: 'Parents & Families',
    targetAudience: 'Parents, Children & Seniors',
    description: 'Create meaningful moments that your children will remember for a lifetime. Addressing screen time concerns with joyful real-world activities.',
    programs: [
      'Parent-Child Bonding Sessions',
      'Hobby Discovery Workshops',
      'Family Activity Days',
      'Screen-Time Balance Programs',
      'Creative Weekend Experiences',
      'Women Community Circles'
    ],
    ctaText: 'Explore Family Programs',
    icon: 'Heart'
  },
  {
    id: 'brands-csr',
    pathNumber: 'PATH 03',
    title: 'Brands, Organizations & CSR Partners',
    targetAudience: 'Corporates, Brands & CSR Teams',
    description: 'Create lasting social impact while investing in the next generation and building vibrant community goodwill.',
    programs: [
      'CSR Initiatives',
      'Event Sponsorships',
      'Employee Engagement & Volunteering',
      'Corporate Workshops',
      'Community Outreach Programs',
      'Skill-Based Partnerships',
      'Large-Scale Awareness Campaigns'
    ],
    ctaText: 'Become a Partner',
    icon: 'Building2'
  }
];
