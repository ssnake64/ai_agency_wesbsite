export type Project = {
  id: string;
  title: string;
  blurb: string;
  tag: string;
};

// PLACEHOLDER: swap with real case studies once available.
export const projects: Project[] = [
  {
    id: '01',
    title: 'VOICE AGENT FOR A ROOFING CO.',
    blurb:
      'Captured 34 after-hours leads in 45 days for a regional roofing contractor.',
    tag: 'Voice / Home services',
  },
  {
    id: '02',
    title: 'CHAT AGENT FOR A DENTAL GROUP',
    blurb:
      'Handled 60% of routine patient inquiries; cut front-desk load by 18 hours/week.',
    tag: 'Chat / Healthcare',
  },
  {
    id: '03',
    title: 'LEAD OUTREACH FOR A B2B SAAS',
    blurb:
      '8,400 personalized cold emails sent; 41 booked demos in month one.',
    tag: 'Outreach / SaaS',
  },
];

export const projectsMeta = {
  eyebrow: 'RECENT WORK',
  heading: 'RECENT_WORK',
  subhead:
    'Real systems running in production. Anonymised — happy to walk you through specifics on a call.',
};
