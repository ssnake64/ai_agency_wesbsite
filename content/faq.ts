export type FAQ = {
  q: string;
  a: string;
};

export const faqs: FAQ[] = [
  {
    q: 'What services do you offer?',
    a: 'Voice agents, chat agents, lead outreach automation, and document/data processing — all custom-built for your business.',
  },
  {
    q: 'Who do you work with?',
    a: 'Small and mid-sized businesses across niches: home services, dental, legal, B2B SaaS, e-commerce. If you have repetitive ops, we can probably help.',
  },
  {
    q: 'How do you approach a new project?',
    a: "A free audit call first. If we can build something with clear ROI, we'll quote a fixed-fee setup contract and a monthly retainer for ongoing care — clear scope, fair terms.",
  },
  {
    q: 'How long does it take to see results?',
    a: 'Most clients see the system running live within 2–3 weeks. Measurable impact (leads captured, hours saved) usually shows up in the first 30 days.',
  },
  {
    q: 'Do you offer customized solutions?',
    a: "Every system we build is custom. We don't sell templates — we sell systems that fit how your business actually works.",
  },
];

export const faqMeta = {
  eyebrow: 'FAQ',
  heading: 'FREQUENTLY_ASKED_QUESTIONS',
  subhead: 'Tied-down answers to the questions we get most.',
};
