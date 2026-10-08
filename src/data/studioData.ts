export interface ServiceItem {
  number: string;
  title: string;
  pillar: 'We build' | 'We maintain' | 'We scale';
  description: string;
  deliverables: string[];
  typicalTimeline: string;
  directorNote: string;
}

export interface ProcessStage {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  artifacts: string[];
  duration: string;
  annotation: string;
}

export interface StudioValue {
  number: string;
  name: string;
  greekOrOrigin: string;
  statement: string;
  detail: string;
  annotation: string;
}

export interface PillarItem {
  index: string;
  label: string;
  headline: string;
  description: string;
  annotation: string;
}

export const THREE_PILLARS: PillarItem[] = [
  {
    index: '01',
    label: '-We build',
    headline: 'CONSTRUCTING DREAMS INTO LIVING CODE.',
    description:
      'From blank canvas to custom-engineered website. We turn your vision, identity, and ideas into a tactile digital presence built from the ground up.',
    annotation: 'Dream it. Express it.',
  },
  {
    index: '02',
    label: '-We maintain',
    headline: 'STEADY HANDS LONG AFTER LAUNCH DAY.',
    description:
      'A great website is a living structure. We keep your platform fast, secure, updated, and refined so you never have to worry about what happens behind the curtain.',
    annotation: 'Always in your corner.',
  },
  {
    index: '03',
    label: '-We scale',
    headline: 'BUILT TO GROW AS BIG AS YOUR AMBITION.',
    description:
      'As your vision expands, your digital foundation expands with it—new pages, new capabilities, deeper storytelling, and resilient architecture.',
    annotation: 'Let it be powered by baby',
  },
];

export const STUDIO_VALUES: StudioValue[] = [
  {
    number: '01',
    name: 'Authenticity',
    greekOrOrigin: 'ORIGINAL VOICE · ZERO PRETENSE',
    statement: 'We build what is real—never hiding behind fake flash or borrowed templates.',
    detail:
      'Every brand has an unmistakable truth. We strip away generic internet noise so your website sounds, looks, and feels unmistakably like you.',
    annotation: 'Real recognizes real.',
  },
  {
    number: '02',
    name: 'Arete',
    greekOrOrigin: 'Arete · EXCELLENCE OF CRAFT',
    statement: 'Moral virtue and the relentless pursuit of excellence in every unseen detail.',
    detail:
      'Borrowed from the classical Greek ideal of fulfilling one’s highest potential: we treat typography, spacing, and clean code as a discipline of highest craft.',
    annotation: 'Excellence as a habit.',
  },
  {
    number: '03',
    name: 'Abundance',
    greekOrOrigin: 'EXPANSIVE THINKING · GENEROUS SPIRIT',
    statement: 'Creating with an open hand—where bold ideas and shared growth multiply.',
    detail:
      'We don’t operate from scarcity. We pour generous energy, thoughtful visual surprises, and expansive care into every project we touch.',
    annotation: 'Room to breathe & grow.',
  },
  {
    number: '04',
    name: 'Creativity',
    greekOrOrigin: 'IMAGINATION MADE TANGIBLE',
    statement: 'Dream it. Express it. We turn raw imagination into living digital architecture.',
    detail:
      'Code is our medium and curiosity is our engine. We pair playful experimentation with disciplined editorial structure.',
    annotation: 'Never ordinary.',
  },
  {
    number: '05',
    name: 'Integrity',
    greekOrOrigin: 'WHOLENESS · HONESTY IN WORK',
    statement: 'Our word, our timelines, and our craft stand solid when nobody is watching.',
    detail:
      'Founded on 07.10.2026 with a simple promise: honest communication, transparent collaboration, and work we are proud to sign our name to.',
    annotation: 'Est 07.10.2026.',
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    number: '01',
    title: 'WEBSITE DESIGN',
    pillar: 'We build',
    description:
      'Beautiful, intentional interfaces designed around your brand, audience and goals.',
    deliverables: [
      'Editorial Art Direction & Visual Language',
      'Bespoke Typography & Grid Architecture',
      'Interactive Prototyping & Motion Systems',
      'Responsive Multi-Screen Design Systems',
    ],
    typicalTimeline: '2–4 Weeks',
    directorNote: 'No templates. Ever.',
  },
  {
    number: '02',
    title: 'WEBSITE DEVELOPMENT',
    pillar: 'We build',
    description:
      'Fast, responsive and technically solid websites built for the real world.',
    deliverables: [
      'Custom React, Next.js & TypeScript Architecture',
      'Fluid Motion & Micro-Interaction Engineering',
      'Clean Semantic Code & Speed Optimization',
      'Accessibility & Search Readiness',
    ],
    typicalTimeline: '3–5 Weeks',
    directorNote: 'Constructed for the real world.',
  },
  {
    number: '03',
    title: 'BRAND EXPERIENCE',
    pillar: 'We build',
    description:
      'Turning your identity into a digital experience people remember.',
    deliverables: [
      'Digital Brand Positioning & Story Architecture',
      'Signature Visual Motifs & Interactive Details',
      'Art Direction & Custom Visual Systems',
      'Cohesive Digital Style Guides',
    ],
    typicalTimeline: '2–3 Weeks',
    directorNote: 'Dream it. Express it.',
  },
  {
    number: '04',
    title: 'LANDING PAGES',
    pillar: 'We scale',
    description:
      'Focused pages designed around a product, campaign, service or conversion goal.',
    deliverables: [
      'High-Clarity Narrative & Action Architecture',
      'Product Launch & Campaign Microsites',
      'Expressive Visual Storytelling',
      'Rapid Deployment & Iteration',
    ],
    typicalTimeline: '1–2 Weeks',
    directorNote: 'Focused impact.',
  },
  {
    number: '05',
    title: 'WEBSITE REDESIGN',
    pillar: 'We scale',
    description:
      'Transforming outdated websites into modern digital experiences.',
    deliverables: [
      'UX, Visual & Technical Audit',
      'Fresh Editorial Repositioning',
      'Seamless Content & Structure Migration',
      'Modern Component System Overhaul',
    ],
    typicalTimeline: '4–6 Weeks',
    directorNote: 'A fresh chapter.',
  },
  {
    number: '06',
    title: 'MAINTENANCE & GROWTH',
    pillar: 'We maintain',
    description:
      'Ongoing improvements, updates and optimization after launch.',
    deliverables: [
      'Continuous Care, Updates & Content Evolution',
      'Performance & Speed Tuning',
      'New Sections & Feature Expansions as You Scale',
      'Direct Access to Your Builder',
    ],
    typicalTimeline: 'Ongoing',
    directorNote: 'We build. We maintain. We scale.',
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    number: '01',
    title: 'DISCOVER',
    subtitle: '● Dream it',
    description: 'We listen to your vision, understand your world, and map out the blueprint.',
    artifacts: [
      'Deep-Dive Vision & Goals Session',
      'Audience & Direction Mapping',
      'Site Architecture & Story Flow',
      'Clear Scope & Milestone Plan',
    ],
    duration: 'Stage 01',
    annotation: 'Dream it first.',
  },
  {
    number: '02',
    title: 'DESIGN',
    subtitle: '● Express it',
    description: 'We turn strategy and imagination into a bold visual direction and interface.',
    artifacts: [
      'Editorial Mood & Typography Direction',
      'Spacious Desktop & Mobile Layouts',
      'Interactive Motion & Visual Flare',
      'Collaborative Design Refinement',
    ],
    duration: 'Stage 02',
    annotation: 'Express it boldly.',
  },
  {
    number: '03',
    title: 'BUILD',
    subtitle: '● Construct it',
    description:
      'We construct your dreams into the real world with clean, resilient, living code.',
    artifacts: [
      'Bespoke Frontend & Interactive Engineering',
      'Fluid Animations & Tactile Details',
      'Full Mobile & Tablet Responsiveness',
      'Rigorous Real-World Testing',
    ],
    duration: 'Stage 03',
    annotation: 'Crafted line by line.',
  },
  {
    number: '04',
    title: 'LAUNCH & SCALE',
    subtitle: '● powered by baby',
    description:
      'We take your website live, maintain its pulse, and help you scale into the future.',
    artifacts: [
      'Smooth Live Domain Deployment',
      'Search & Social Share Readiness',
      'Ongoing Maintenance & Care',
      'Scaling New Features as You Grow',
    ],
    duration: 'Stage 04',
    annotation: 'powered by baby',
  },
];
