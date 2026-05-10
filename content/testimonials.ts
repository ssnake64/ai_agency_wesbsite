export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

// PLACEHOLDER: swap with real testimonial once available.
export const testimonials: Testimonial[] = [
  {
    quote:
      "They built our after-hours voice agent in under two weeks. It now handles 70% of our incoming calls and we haven't missed a lead since.",
    author: 'Owner',
    role: 'Regional Roofing Co. (sample testimonial)',
  },
];

export const testimonialsMeta = {
  eyebrow: 'TESTIMONIAL',
  heading: 'WHAT_CLIENTS_SAY',
  satisfiedClients: '0.0K+',
  satisfiedLabel: 'Satisfied clients',
};
