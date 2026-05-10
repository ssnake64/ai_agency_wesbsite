import type { LucideIcon } from 'lucide-react';
import { PhoneCall, MessagesSquare, Send, FileSearch } from 'lucide-react';

export type Service = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: '01',
    title: 'AI VOICE AGENTS',
    description:
      'Never miss a call. 24/7 answering, lead qualification, and appointment booking — sounds human, runs on autopilot.',
    bullets: ['Inbound answering', 'Outbound follow-up', 'CRM sync'],
    icon: PhoneCall,
  },
  {
    id: '02',
    title: 'AI CHAT AGENTS',
    description:
      'Instant responses across website, WhatsApp, and SMS. Trained on your business — handoff to humans when it matters.',
    bullets: ['Website widget', 'WhatsApp integration', 'Handoff to humans'],
    icon: MessagesSquare,
  },
  {
    id: '03',
    title: 'LEAD OUTREACH AUTOMATION',
    description:
      'Find leads, personalize, follow up — automatically. From cold list to booked call without burning your team.',
    bullets: ['Lead enrichment', 'Personalized cold email', 'Multi-step sequences'],
    icon: Send,
  },
  {
    id: '04',
    title: 'DOCUMENT & DATA PROCESSING',
    description:
      'Extract structured data from PDFs, invoices, and forms. Stop typing the same fields into your CRM all day.',
    bullets: ['Invoice processing', 'Form extraction', 'CRM data entry'],
    icon: FileSearch,
  },
];

export const servicesMeta = {
  eyebrow: 'SERVICES',
  heading: 'SERVICES',
  subhead:
    'Practical AI systems built to remove repetitive work and capture missed revenue.',
};
