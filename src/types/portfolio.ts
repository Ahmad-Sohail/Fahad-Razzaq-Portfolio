export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  project?: string;
  location: string;
  country: 'Pakistan' | 'Saudi Arabia' | 'UAE';
  period: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  highlightSummary: string;
  bullets: string[];
  metrics?: { label: string; value: string }[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Strategic' | 'Operational' | 'Logistics' | 'Compliance';
  description: string;
  keywords: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  validity?: string;
  description: string;
}

export interface CareerHub {
  id: string;
  name: string;
  country: string;
  city: string;
  lat: number;
  lng: number;
  role: string;
  company: string;
  period: string;
  highlight: string;
}
