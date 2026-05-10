export type Tool = {
  name: string;
  wordmark: string;
};

export const tools: Tool[] = [
  { name: 'OpenAI', wordmark: 'OpenAI' },
  { name: 'Anthropic', wordmark: 'Anthropic' },
  { name: 'Twilio', wordmark: 'twilio' },
  { name: 'Make', wordmark: 'Make' },
  { name: 'n8n', wordmark: 'n8n' },
  { name: 'Supabase', wordmark: 'supabase' },
];

export const builtWithMeta = {
  eyebrow: 'BUILT WITH',
  heading: 'BUILT_WITH',
  subhead: "We use the best tools so you get systems that don't break.",
};
