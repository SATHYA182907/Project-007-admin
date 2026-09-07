import type { EventItem } from '../types';

import p10_1 from '../assets/events/portfolio_p10_img1.jpeg';
import p10_2 from '../assets/events/portfolio_p10_img2.jpeg';
import p10_3 from '../assets/events/portfolio_p10_img3.jpeg';
import p10_4 from '../assets/events/portfolio_p10_img4.jpeg';

import p11_1 from '../assets/events/portfolio_p11_img1.jpeg';
import p11_2 from '../assets/events/portfolio_p11_img2.jpeg';
import p11_3 from '../assets/events/portfolio_p11_img3.jpeg';
import p11_4 from '../assets/events/portfolio_p11_img4.jpeg';

import p12_1 from '../assets/events/portfolio_p12_img1.jpeg';
import p12_2 from '../assets/events/portfolio_p12_img2.jpeg';
import p12_3 from '../assets/events/portfolio_p12_img3.jpeg';
import p12_4 from '../assets/events/portfolio_p12_img4.jpeg';
import p12_5 from '../assets/events/portfolio_p12_img5.jpeg';
import p12_6 from '../assets/events/portfolio_p12_img6.jpeg';
import p12_7 from '../assets/events/portfolio_p12_img7.jpeg';

import p13_1 from '../assets/events/portfolio_p13_img1.jpeg';
import p13_2 from '../assets/events/portfolio_p13_img2.jpeg';
import p13_3 from '../assets/events/portfolio_p13_img3.jpeg';
import p13_4 from '../assets/events/portfolio_p13_img4.jpeg';
import p13_5 from '../assets/events/portfolio_p13_img5.jpeg';
import p13_6 from '../assets/events/portfolio_p13_img6.jpeg';
import p13_7 from '../assets/events/portfolio_p13_img7.jpeg';

export const eventsData: EventItem[] = [
  {
    id: 'walkathon-kovaipudur',
    number: '01',
    title: 'Walkathon, Kovaipudur',
    location: 'Kovaipudur, Coimbatore',
    description: 'A grand public event promoting healthy living, active wellness, and screen-free awareness, with overwhelming community participation.',
    category: 'Fitness',
    image: p10_1,
    audience: 'Public & Community Members',
    featured: true,
    highlights: ['Public Fitness Movement', 'Screen-Free Life Awareness', 'Mass Community Participation']
  },
  {
    id: 'diwali-carnival',
    number: '02',
    title: 'Diwali Carnival',
    location: 'Kovaipudur, Coimbatore',
    description: 'A massive hit Diwali Carnival in Kovaipudur with approximately 2000+ floating crowd engaged through different activities, traditional games, and dance programs.',
    category: 'Community',
    image: p11_4,
    audience: '2000+ Floating Crowd',
    featured: true,
    highlights: ['2000+ Floating Crowd', 'Traditional Games & Dance', 'Family Festive Engagement']
  },
  {
    id: 'womens-day-ananya',
    number: '03',
    title: 'Women’s Day Celebration',
    location: 'Ananya’s Nana Nani Phase 3, Kovaipudur',
    description: 'A heartwarming Women’s Day celebration conducted with 500+ senior citizens and elderly women, honoring women’s sacrifices, emotional journeys, happiness, and togetherness through engaging activities and joyful interaction.',
    category: 'Women',
    image: p11_1,
    audience: '500+ Senior Citizens & Elderly Women',
    featured: false,
    highlights: ['500+ Elderly Women Honored', 'Emotional Journey Sharing', 'Intergenerational Joy']
  },
  {
    id: 'childrens-day-kidscom',
    number: '04',
    title: 'Children’s Day Celebration',
    location: 'Kids.com Play School',
    description: 'An engaging celebration for parents and children featuring interactive activities, competitions, and fun bonding sessions. Participants were awarded prizes and certificates, creating joyful family moments and meaningful interaction.',
    category: 'Children',
    image: p10_2,
    audience: 'Parents & Children',
    featured: false,
    highlights: ['Parent-Child Competitions', 'Prize & Certificate Distribution', 'Meaningful Family Bonding']
  },
  {
    id: 'mom-and-me-ramp-walk',
    number: '05',
    title: '“Mom & Me” Inclusive Ramp Walk',
    location: 'Sri Maruti Gana Sabha, R.S. Puram',
    description: 'Conducted at Sri Maruti Gana Sabha, R.S. Puram, this emotional inclusive ramp walk brought together neurotypical and neurodiverse mothers & children, promoting autism awareness, inclusion, love, and acceptance before an overwhelming crowd of around 750 attendees.',
    category: 'Inclusive',
    image: p12_1,
    audience: '750+ Attendees',
    featured: true,
    highlights: ['Autism Awareness & Inclusion', '750+ Audience Response', 'Neurodiverse & Neurotypical Bond'],
    galleryImages: [p12_1, p12_2, p12_3, p12_4, p12_5, p12_6, p12_7]
  },
  {
    id: 'komagal-award-event',
    number: '06',
    title: 'Komagal Award Event — Women’s Day',
    location: 'Coimbatore',
    description: 'A large-scale women empowerment initiative recognizing 250+ women under categories including Entrepreneur, Social Worker, and Homemaker. Featuring cultural performances, dance, debate sessions, and award ceremonies creating nearly 6 hours of screen-free engagement.',
    category: 'Awards',
    image: p13_1,
    audience: '400+ Audience | 250+ Awardees',
    duration: 'Nearly 6 Hours Screen-Free',
    featured: true,
    highlights: ['250+ Women Honored', '6 Hours Screen-Free Impact', 'Entrepreneurs, Social Workers & Homemakers'],
    galleryImages: [p13_1, p13_2, p13_3, p13_4, p13_5, p13_6, p13_7]
  },
  {
    id: 'alveal-mall-workshops',
    number: '07',
    title: 'Alveal Mall Kids Workshops',
    location: 'Alveal Mall, Coimbatore',
    description: 'Conducted 6+ competitions and interactive workshops for kids, helping them reduce screen time, improve social interaction, and develop creative and problem-solving skills in a lively public hub.',
    category: 'Children',
    image: p10_3,
    audience: 'Children & Families',
    featured: false,
    highlights: ['6+ Competitions & Workshops', 'Screen Time Reduction', 'Creative Problem Solving']
  },
  {
    id: 'vedanta-projects',
    number: '08',
    title: 'Vedanta Community Projects',
    location: 'Vedanta Projects, Kovaipudur',
    description: 'Organized 10+ events, workshops, and competitions, including cultural and festive programs for senior citizens, promoting active engagement, companionship, and mental fitness.',
    category: 'Community',
    image: p11_2,
    audience: 'Senior Citizens & Residents',
    featured: false,
    highlights: ['10+ Workshops & Programs', 'Senior Citizen Cultural Engagement', 'Mental Fitness & Joy']
  },
  {
    id: 'ganapathy-silk-brain-gym',
    number: '09',
    title: 'Ganapathy Silk Brain Gym & Senior Sangamam',
    location: 'Oppanakara Street & Kovaipudur',
    description: 'Ongoing Brain Gym activities for kids and parents boosting focus and bonding at Oppanakara Street. Also worked as part of the Marketing Team for Senior Sangamam by Vedanta, Kovaipudur, driving publicity and engagement.',
    category: 'Community',
    image: p10_4,
    audience: 'Kids, Parents & Senior Citizens',
    featured: false,
    highlights: ['Ongoing Brain Gym Exercises', 'Senior Sangamam Marketing & Publicity', 'Focus & Cognitive Boosting']
  },
  {
    id: 'public-challenges-talent-shows',
    number: '10',
    title: 'Public Challenges & Talent Shows',
    location: 'Public Arenas & Community Spaces',
    description: 'Challenges, competitions, ramp walks, talent shows, and debate sessions organized in public areas, encouraging children, youth, and adults to express creativity, confidence, and communication skills in an open, inclusive environment.',
    category: 'Community',
    image: p11_3,
    audience: 'Youth, Children & Adults',
    featured: false,
    highlights: ['Public Arena Talent Platforms', 'Confidence & Public Speaking', 'Inclusive Age Groups']
  },
  {
    id: 'womens-badminton-tournament',
    number: '11',
    title: 'Women’s Badminton Tournament',
    location: 'Kovaipudur, Coimbatore',
    description: 'Conducted to encourage sportsmanship, physical fitness, stress-free living, and community bonding specifically for women.',
    category: 'Fitness',
    image: p11_1,
    audience: 'Women Sports Enthusiasts',
    featured: false,
    highlights: ['Fitness & Active Living', 'Stress-Free Environment', 'Women Sports Community']
  },
  {
    id: 'onam-celebration-nana-nani',
    number: '12',
    title: 'Onam Celebration',
    location: 'Ananya’s Nana Nani Phase 3',
    description: 'A massive success with over 400 participants, filled with traditional dance, music, cultural performances, and pookalam by our OSH Crew — an enthusiastic group of parents and kids.',
    category: 'Families',
    image: p11_2,
    audience: '400+ Participants',
    featured: false,
    highlights: ['400+ Participants', 'OSH Parent-Kid Crew Performances', 'Cultural Heritage & Music']
  },
  {
    id: 'brain-gym-school-programs',
    number: '13',
    title: 'Brain Gym Programs in Schools',
    location: 'Kids.com Play School, Shrustisi Matriculation, Government Schools, Veni Matriculation, etc.',
    description: 'Comprehensive cognitive enhancement programs conducted across multiple educational institutions — helping children enhance memory, patience, concentration, and emotional balance through playful learning.',
    category: 'Schools',
    image: p10_2,
    audience: 'School Students & Educators',
    featured: false,
    highlights: ['Multiple School Partnerships', 'Cognitive & Focus Exercises', 'Stress-Free Playful Learning']
  },
  {
    id: 'lets-dance-alveal-mall',
    number: '14',
    title: '“Let’s Dance” Event',
    location: 'Alveal Mall, Coimbatore',
    description: 'A vibrant dance event for women and children focused on stress relief, confidence building, positivity, and social interaction through music and movement, successfully reducing screen time for nearly 4 hours.',
    category: 'Fitness',
    image: p10_3,
    audience: 'Women & Children',
    duration: 'Nearly 4 Hours Screen-Free',
    featured: false,
    highlights: ['Nearly 4 Hours Off-Screen', 'Dance & Rhythm Stress Relief', 'Women & Kids Confidence']
  },
  {
    id: 'pet-ramp-walk-kalapatti',
    number: '15',
    title: 'Pet Ramp Walk',
    location: 'Kalapatti, Coimbatore',
    description: 'A joyful community event for pet lovers and families that encouraged real-world interaction, fun activities, and meaningful bonding, promoting happiness beyond screens for nearly 4 hours.',
    category: 'Families',
    image: p11_3,
    audience: 'Pet Lovers & Families',
    duration: 'Nearly 4 Hours Screen-Free',
    featured: false,
    highlights: ['Pet & Family Bonding', '4 Hours Screen-Free Time', 'Unique Community Engagement']
  },
  {
    id: 'republic-day-drawing-competition',
    number: '16',
    title: 'Republic Day Drawing Competition',
    location: 'Kumaran Mahal, Kovaipudur',
    description: 'A large-scale Republic Day drawing competition with 500+ children participating enthusiastically. Mothers were also engaged through debate sessions and interactive activities, creating nearly 5 hours of screen-free engagement.',
    category: 'Children',
    image: p10_4,
    audience: '500+ Children & Mothers',
    duration: 'Nearly 5 Hours Screen-Free',
    featured: true,
    highlights: ['500+ Child Participants', 'Mother Debate Sessions', '5 Hours Screen-Free Creativity']
  },
  {
    id: 'dhaniya-event-kovaipudur',
    number: '17',
    title: 'Dhaniya Event',
    location: 'Kovaipudur, Coimbatore',
    description: 'Another major achievement with around 200 participants, celebrating women entrepreneurs and engaging children through interactive games.',
    category: 'Women',
    image: p13_2,
    audience: '200+ Participants',
    featured: false,
    highlights: ['200+ Attendees', 'Women Entrepreneur Showcase', 'Child Activity Zones']
  }
];
