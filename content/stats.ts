export type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
};

// PLACEHOLDER: tune to honest numbers before launch.
export const stats: Stat[] = [
  { value: 12, suffix: '+', label: 'Systems shipped' },
  { value: 99.4, suffix: '%', label: 'Uptime across deployed agents', decimals: 1 },
  { value: 1, prefix: '<', suffix: 's', label: 'Average response time' },
];
