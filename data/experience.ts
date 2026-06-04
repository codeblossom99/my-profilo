import type { ExperienceItem } from '../types';

// ============================================================
// Timeline — Replace with your own education & work history!
// ============================================================
export const experienceData: ExperienceItem[] = [
  {
    id: 'highschool',
    type: 'education',
    duration: '2015 - 2017',
    title: 'High School',
    location: 'Your High School Name',
    details: [
      'Your High School Name',
    ],
    alignment: 'right',
    galleryImages: [],
  },
  {
    id: 'university',
    type: 'education',
    duration: '2017 - 2022',
    title: 'National ilan University',
    location: 'National ilan University',
    details: [
      'National ilan University',
      'Electronic Engineering',
    ],
    alignment: 'left',
    galleryImages: [],
  },
  {
    id: 'company',
    type: 'work',
    duration: '2022.06 - 2025.05',
    title: 'Network Validation Engineer',
    location: 'Intel Corporation',
    details: [
      'Intel Corporation',
      'Department',
      'Your role description',
    ],
    alignment: 'left',
    galleryImages: [],
  },
  {
    id: 'company',
    type: 'work',
    duration: '2025.06 - Present',
    title: 'Software Engineer',
    location: 'IKG',
    details: [
      'IKG',
      'Department',
      'Your role description',
    ],
    alignment: 'left',
    galleryImages: [],
  },
];
