export const hero = {
  eyebrow: 'AI AUTOMATION STUDIO',
  // Single trailing decorative underscore on the first line — matches the
  // DigiGo "DIGITAL_ / MARKETING" treatment without the noisy per-word
  // underscores we had before.
  headlineLine1: 'AI AUTOMATION',
  headlineLine2: 'THAT SHIPS',
  subhead:
    "We build AI systems that handle the work your team shouldn't be doing — voice agents, chat agents, lead outreach, and document processing. Live in weeks, not quarters.",
  cta: { label: 'Book a free audit', href: '#contact' },
  stamp: 'BUILDING_AI_SYSTEMS • EST_2025 • ',
};

// A scripted simulation of a working AI voice agent. The terminal component
// loops through these scenes, typing one line at a time and clearing between
// scenes. Each scene = a short slice of one agent's day.
export type AgentLine = {
  text: string;
  // tone of the line — drives colour
  kind?: 'log' | 'in' | 'out' | 'ok' | 'warn' | 'meta' | 'sys';
  // delay (ms) before this line appears (after typing the previous one)
  delayBefore?: number;
};

export type AgentScene = {
  title: string;
  lines: AgentLine[];
};

export const agentScenes: AgentScene[] = [
  {
    title: 'voice_agent.roofing_co — inbound call',
    lines: [
      { text: '$ agent.voice --start --niche roofing', kind: 'sys' },
      { text: 'listening on +1 (555) 0142  ▸ ready', kind: 'meta' },
      { text: '◉ incoming_call  +1 (737) 555-0184', kind: 'in', delayBefore: 600 },
      { text: '▸ greeting played  (1.1s)', kind: 'log' },
      { text: '▸ intent detected  → "roof leak quote"', kind: 'log' },
      { text: '▸ qualifying caller…', kind: 'log' },
      { text: '   name=Mike   zip=78704   urgency=this_week', kind: 'meta' },
      { text: '✓ lead_captured', kind: 'ok' },
      { text: '✓ booked  → tue 2pm  with on-call rep', kind: 'ok' },
      { text: '─ session ended  (47s)', kind: 'meta' },
    ],
  },
  {
    title: 'chat_agent.dental_group — website',
    lines: [
      { text: '$ agent.chat --channel web', kind: 'sys' },
      { text: 'connected  ▸ widget online', kind: 'meta' },
      { text: '◉ visitor  → "do you take Delta Dental?"', kind: 'in', delayBefore: 700 },
      { text: '▸ knowledge_base  → match (0.92)', kind: 'log' },
      { text: '✓ replied  → "yes, we do — want to book?"', kind: 'out' },
      { text: '◉ visitor  → "tomorrow 9am pls"', kind: 'in' },
      { text: '▸ calendar  → slot held', kind: 'log' },
      { text: '✓ appointment_booked', kind: 'ok' },
      { text: '─ handoff  → front_desk (notify only)', kind: 'meta' },
    ],
  },
  {
    title: 'outreach.b2b_saas — sequence run',
    lines: [
      { text: '$ outreach.run --list q4_warm --channel email', kind: 'sys' },
      { text: 'enriching 312 leads  ▸ clearbit + apollo', kind: 'meta' },
      { text: '▸ personalised drafts  → 312 / 312', kind: 'log' },
      { text: '▸ send queue  → throttle 35/hr', kind: 'log' },
      { text: '✓ 142 sent  · 0 bounced', kind: 'ok' },
      { text: '◉ reply  → priya@northstar.io  "interested"', kind: 'in', delayBefore: 500 },
      { text: '✓ hot_lead routed → CRM (priority)', kind: 'ok' },
      { text: '─ next pass  in 02:00:00', kind: 'meta' },
    ],
  },
];
