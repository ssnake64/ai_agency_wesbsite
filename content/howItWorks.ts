import type { LucideIcon } from 'lucide-react';
import { Compass, Hammer, Rocket } from 'lucide-react';

export type ProcessStep = {
  step: string;
  title: string;
  short: string;
  long: string;
  icon: LucideIcon;
};

export const processSteps: ProcessStep[] = [
  {
    step: 'STEP 01',
    title: 'DISCOVER',
    short: 'Map workflows, find ROI.',
    long:
      'We map your workflows and find the highest-ROI automation opportunities — no guesswork, just the bottlenecks that pay for themselves.',
    icon: Compass,
  },
  {
    step: 'STEP 02',
    title: 'BUILD',
    short: 'Design, build, test.',
    long:
      'We design, build, and test the system on your real data and real edge cases — not a demo. You see it working before it goes live.',
    icon: Hammer,
  },
  {
    step: 'STEP 03',
    title: 'DEPLOY',
    short: 'Launch and improve.',
    long:
      'We launch it live, monitor it for 30 days, and keep improving it. You get a system that gets better, not one that rots.',
    icon: Rocket,
  },
];

export const processMeta = {
  eyebrow: 'OUR PROCESS',
  heading: 'OUR_PROCESS',
  subhead: 'From first call to live system in under 3 weeks.',
};
