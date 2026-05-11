'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { agentScenes, type AgentLine } from '@/content/hero';
import { cn } from '@/lib/cn';

const KIND_CLASS: Record<NonNullable<AgentLine['kind']>, string> = {
  log: 'text-white/75',
  in: 'text-accent',
  out: 'text-sky-300',
  ok: 'text-emerald-300',
  warn: 'text-amber-300',
  meta: 'text-white/40',
  sys: 'text-white/55',
};

const PREFIX: Record<NonNullable<AgentLine['kind']>, string> = {
  log: '',
  in: '',
  out: '',
  ok: '',
  warn: '',
  meta: '',
  sys: '',
};

type RenderedLine = {
  id: number;
  text: string;
  full: string;
  kind: NonNullable<AgentLine['kind']>;
  done: boolean;
};

const TYPE_SPEED = 14; // ms / char
const LINE_GAP = 90; // ms after a line completes
const SCENE_GAP = 1800; // ms before scene resets
const MAX_LINES = 7;

let lineCounter = 0;

export function AgentTerminal() {
  const reduce = useReducedMotion();
  const [sceneIdx, setSceneIdx] = useState(0);
  const [lines, setLines] = useState<RenderedLine[]>([]);
  const [uptime, setUptime] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setUptime((u) => u + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Drive the scene
  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLines([]);

    if (reduce) {
      // Show the full scene at once for reduced motion users
      const scene = agentScenes[sceneIdx];
      setLines(
        scene.lines.map((l) => ({
          id: ++lineCounter,
          text: l.text,
          full: l.text,
          kind: l.kind ?? 'log',
          done: true,
        }))
      );
      const reset = setTimeout(
        () => setSceneIdx((i) => (i + 1) % agentScenes.length),
        6000
      );
      timers.current.push(reset);
      return () => {
        timers.current.forEach(clearTimeout);
      };
    }

    const scene = agentScenes[sceneIdx];
    let cursor = 0;

    const playLine = (idx: number) => {
      if (idx >= scene.lines.length) {
        const reset = setTimeout(() => {
          setSceneIdx((i) => (i + 1) % agentScenes.length);
        }, SCENE_GAP);
        timers.current.push(reset);
        return;
      }
      const l = scene.lines[idx];
      const startDelay = l.delayBefore ?? 0;
      const id = ++lineCounter;
      const begin = setTimeout(() => {
        setLines((prev) =>
          [...prev, { id, text: '', full: l.text, kind: l.kind ?? 'log', done: false }].slice(
            -MAX_LINES
          )
        );
        let charIdx = 0;
        const typeOnce = () => {
          charIdx += 1;
          setLines((prev) =>
            prev.map((p) =>
              p.id === id
                ? { ...p, text: l.text.slice(0, charIdx), done: charIdx >= l.text.length }
                : p
            )
          );
          if (charIdx < l.text.length) {
            const t = setTimeout(typeOnce, TYPE_SPEED);
            timers.current.push(t);
          } else {
            const next = setTimeout(() => playLine(idx + 1), LINE_GAP);
            timers.current.push(next);
          }
        };
        const t0 = setTimeout(typeOnce, TYPE_SPEED);
        timers.current.push(t0);
      }, startDelay);
      timers.current.push(begin);
    };

    playLine(cursor);
    return () => timers.current.forEach(clearTimeout);
  }, [sceneIdx, reduce]);

  // Auto-scroll to bottom of feed
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const scene = agentScenes[sceneIdx];
  const upH = String(Math.floor(uptime / 3600)).padStart(2, '0');
  const upM = String(Math.floor((uptime % 3600) / 60)).padStart(2, '0');
  const upS = String(uptime % 60).padStart(2, '0');

  return (
    <div className="relative rounded-[24px] border border-white/10 bg-bg-dark p-4 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)] md:p-5">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45 truncate px-3">
          {scene.title}
        </span>
        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-accent">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          live
        </span>
      </div>

      {/* Status bar */}
      <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-white/[0.03] px-3 py-2 font-mono text-[10px] text-white/55 md:text-[11px]">
        <span className="flex items-center gap-2">
          <span className="text-white/35">uptime</span>
          <span className="text-white">{upH}:{upM}:{upS}</span>
        </span>
        <span className="hidden items-center gap-2 sm:flex">
          <span className="text-white/35">conn</span>
          <span className="text-accent">3 active</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="text-white/35">lat</span>
          <span className="text-emerald-300">412 ms</span>
        </span>
      </div>

      {/* Feed — kept short so the panel stays landscape, like the reference photo */}
      <div
        ref={scrollRef}
        className="mt-3 h-[160px] overflow-hidden font-mono text-[12px] leading-[1.6] md:h-[180px] md:text-[12.5px]"
      >
        {lines.map((l) => (
          <div
            key={l.id}
            className={cn('whitespace-pre-wrap break-words', KIND_CLASS[l.kind])}
          >
            {PREFIX[l.kind]}
            {l.text}
            {!l.done && (
              <span className="ml-0.5 inline-block h-[0.95em] w-[7px] -mb-[2px] animate-pulse bg-accent align-middle motion-reduce:hidden" />
            )}
          </div>
        ))}
      </div>

      {/* Bottom progress strip */}
      <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3 text-[10px] uppercase tracking-[0.28em] text-white/40">
        <span className="font-mono">scene</span>
        <div className="flex flex-1 gap-1.5">
          {agentScenes.map((_, i) => (
            <span
              key={i}
              className={cn(
                'h-1 flex-1 rounded-full transition-colors duration-500',
                i === sceneIdx ? 'bg-accent' : 'bg-white/10'
              )}
            />
          ))}
        </div>
        <span className="font-mono text-white/60">
          {String(sceneIdx + 1).padStart(2, '0')} / {String(agentScenes.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
