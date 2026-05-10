export type LiveEvent = {
  ts: string;
  channel: string;
  message: string;
  active?: boolean;
};

// PLACEHOLDER: in V2 this connects to a real backend feed (Supabase).
export const liveEvents: LiveEvent[] = [
  { ts: '14:32:08', channel: 'voice_agent.roofing_co_a', message: 'call answered (12s avg)', active: true },
  { ts: '14:31:45', channel: 'chat_agent.dental_group_b', message: 'lead qualified', active: true },
  { ts: '14:31:22', channel: 'outreach.b2b_saas_c', message: '142 emails sent', active: true },
  { ts: '14:30:59', channel: 'doc_processor.legal_firm', message: '23 invoices parsed' },
  { ts: '14:30:31', channel: 'voice_agent.hvac_co_d', message: 'appointment booked' },
  { ts: '14:30:02', channel: 'chat_agent.dental_group_b', message: 'handoff → human (billing)' },
  { ts: '14:29:48', channel: 'outreach.b2b_saas_e', message: 'reply received → hot lead' },
  { ts: '14:29:14', channel: 'voice_agent.roofing_co_a', message: 'call answered (9s avg)', active: true },
];

export const liveStats = [
  { label: 'Calls answered today', value: 312 },
  { label: 'Leads captured this week', value: 1847 },
  { label: 'Hours saved this month', value: 214 },
];

export const liveSystemsMeta = {
  eyebrow: 'LIVE',
  heading: 'SYSTEMS_LIVE',
  subhead: 'A glimpse at what our deployed AI agents are doing right now.',
  disclaimer:
    'Sample data shown — real-time integration available to clients via private dashboard.',
};
