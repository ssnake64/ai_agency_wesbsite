# Project Plan — AI Automation Agency Website (V1)

> Read this entire file before writing any code. Reference images are in the project root (`/reference/`). The goal of V1 is a credible, fast-to-ship marketing site that lets the founder cold-call SMBs and not get laughed off when they Google the brand.

---

## 1. Context

- **What the business does:** AI automation services for SMBs — voice agents, chat agents, lead outreach automation, document processing. Code + no-code.
- **Who it's for:** Broader SMB owners across niches (not just developers). Starting with roofing, expanding outward.
- **What this site must do:**
  1. Look credible enough to survive a cold-call Google
  2. Explain services clearly and outcome-first
  3. Show social proof (testimonial section retained even with placeholder content)
  4. Book a discovery call
- **What it explicitly does NOT need to do in V1:** Blog, pricing page, complex auth, payments, dashboard, AI features on the site itself.
- **Brand name:** TBD — leave as `BRAND_NAME` placeholder throughout. Single point of replacement later.

---

## 2. Tech stack (non-negotiable)

- **Next.js 14+** (App Router, TypeScript)
- **Tailwind CSS** (v3 or v4 — pick the latest stable)
- **Framer Motion** for animations
- **next/font/google** for Anton + Inter (no manual font files)
- **Lucide React** for icons (consistent, free, tree-shakeable)
- **No external CMS in V1** — content lives in `/content/*.ts` typed files
- **Deployment target:** Vercel (free tier)
- **No Supabase needed in V1** — only add when contact form needs persistence (and even then, Formspree or a simple Vercel API route writing to Supabase works fine)

### Folder structure

```
/app
  layout.tsx
  page.tsx
  globals.css
  /api
    /contact
      route.ts        # POST endpoint for the lead form
/components
  /sections           # one file per page section
    Hero.tsx
    Marquee.tsx
    AboutStudio.tsx
    Services.tsx
    HowItWorks.tsx
    Projects.tsx
    LiveSystems.tsx   # the creative section — see §7
    StatsBar.tsx
    Testimonials.tsx
    BuiltWith.tsx     # replaces "team members" — see §6
    FAQ.tsx
    FinalCTA.tsx
    Footer.tsx
  /ui                 # primitive reusable components
    Button.tsx
    Badge.tsx
    PillStep.tsx
    NumberBadge.tsx
    StampBadge.tsx
    Container.tsx
    SectionHeading.tsx
/content
  services.ts
  faq.ts
  testimonials.ts
  projects.ts
  builtWith.ts
/lib
  cn.ts               # tailwind class merger (clsx + tailwind-merge)
/public
  /reference          # the user's screenshot references (do not ship)
```

---

## 3. Design system

The whole site borrows visual DNA from the DigiGo reference (see `/reference/*.png`) but the **content/tone is for an AI automation agency, not a marketing agency**. Match the visual system exactly; rewrite all copy.

### 3.1 Color tokens

Add these to `tailwind.config.ts` under `theme.extend.colors`:

```ts
colors: {
  bg: {
    DEFAULT: '#F8FAF0',   // warm off-white with green tint — primary background
    soft:    '#EFF4DC',   // slightly deeper, used for alternating sections
    dark:    '#0A0A0A',   // footer + dark marquee bar
  },
  ink: {
    DEFAULT: '#1A1A1A',   // primary text — warm near-black, NOT pure #000
    muted:   '#6B6B6B',   // secondary text
    faint:   '#A8A8A8',   // tertiary / metadata
  },
  accent: {
    DEFAULT: '#C5F04E',   // signature lime — used sparingly but consistently
    deep:    '#A8D63A',   // hover state for accent
    soft:    '#E8FAB8',   // very light tint, for backgrounds of badges etc.
  },
  line: {
    DEFAULT: '#E5E7DB',   // subtle borders / dividers
    strong:  '#1A1A1A',   // dark dividers in dark sections
  },
}
```

**Usage rules:**
- `bg.DEFAULT` is the page background. `bg.soft` is for sections that need to visually separate (Services, Projects).
- `accent.DEFAULT` is the **only** bright color on the site. Use it for: CTA highlights, number badges, the marquee bar, photo backdrops, hover states. **Never use it for body text.**
- Borders should be `line.DEFAULT` 1px — no heavy shadows anywhere.

### 3.2 Typography

Install via `next/font/google`:

```ts
import { Anton, Inter } from 'next/font/google'

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
```

Map in Tailwind:

```ts
fontFamily: {
  display: ['var(--font-anton)', 'sans-serif'],   // all H1/H2 — condensed bold
  sans:    ['var(--font-inter)', 'sans-serif'],   // body + UI
}
```

**Type scale (desktop):**
- H1 hero: `text-7xl md:text-8xl lg:text-9xl` (Anton, tight leading, uppercase, slight letter-spacing)
- H2 section: `text-5xl md:text-6xl` (Anton, uppercase)
- H3 card: `text-2xl md:text-3xl` (Anton, uppercase)
- Body: `text-base md:text-lg` (Inter, regular, `leading-relaxed`)
- Eyebrow/label: `text-xs uppercase tracking-widest` (Inter, medium)

**Important typographic detail:**
The reference treats the H1 like a filename: `DIGITAL_MARKETING`. For your site, use the same trick with the H1 — keep underscores between words to give it a "code/system" feel. Examples to choose from for the hero:
- `AI_AUTOMATION_FOR_REAL_BUSINESSES`
- `AUTOMATE_THE_WORK_YOUR_TEAM_SHOULDNT_BE_DOING`
- `SHIP_AI_THAT_ACTUALLY_RUNS`

The underscore styling is part of the brand signature — keep it.

### 3.3 Spacing & layout

- **Container:** `max-w-[1200px] mx-auto px-6 md:px-8`
- **Section vertical padding:** `py-24 md:py-32` (generous)
- **Card radius:** `rounded-2xl` (16px) or `rounded-3xl` (24px) — pick one and stick with it
- **No shadows.** Depth comes from background color shifts and 1px borders only. If a card needs to "lift," use `bg.soft` against `bg.DEFAULT` — that's it.

### 3.4 Reusable primitives (build these first in `/components/ui/`)

- **`Button`** — pill-shaped, dark bg (`bg.dark`) with white text + arrow icon, lime hover. Variants: `primary` (dark pill), `ghost` (transparent with border).
- **`Badge`** — small pill, lime bg, dark text, uppercase tracking-widest. Used for tags ("Marketing", "Advertising" in blog cards in reference).
- **`NumberBadge`** — circular lime badge with a number ("01"). Used on project cards and as the (01)/(02)/(03)/(04) in services list.
- **`PillStep`** — outlined pill containing "STEP 01" etc., connected by dotted lines in HowItWorks.
- **`StampBadge`** — circular "AWARD WINNING AGENCY • SINCE 2016" style stamp. For your version use: `BUILDING_AI_SYSTEMS • EST_2025` rotating around a center letter or icon. Continuously rotates (slow, ~20s per loop).
- **`Container`** — wraps section content with max-w-1200 + padding.
- **`SectionHeading`** — big Anton uppercase H2 + optional eyebrow + optional muted subhead. Reused everywhere.

---

## 4. Page structure (single-page, scroll)

Order, top to bottom:

1. **Nav** (sticky, transparent on hero, gains bg on scroll)
2. **Hero**
3. **Marquee bar** (the diagonal one — signature element)
4. **About Studio**
5. **Services** (numbered list with expand-on-hover)
6. **How It Works** (3-step pill timeline)
7. **Projects** (placeholder cards for future case studies — see §6 for handling)
8. **Stats bar** (numbers + a second marquee strip, like the reference)
9. **Live Systems** (the creative section — see §7)
10. **Built With** (replaces team — logos of the tools you integrate)
11. **Testimonials** (kept per founder's note — see §6)
12. **FAQ**
13. **Final CTA** (with embedded scheduler placeholder)
14. **Footer**

---

## 5. Section-by-section spec

### 5.1 Nav
- Left: logo wordmark (`BRAND_NAME` in Anton, with a small lime square or icon)
- Center: pill-shaped nav menu (`Home | About | Services | Process | Contact`) — matches the reference's centered pill nav
- Right: dark "Contact Us" pill button + hamburger icon (icon is visible on desktop too, like the reference)
- Sticky, with a subtle bg-blur when scrolled past hero
- Mobile: collapses to hamburger, slides in a full-screen overlay menu

### 5.2 Hero
- Left column (60%):
  - Massive H1 in Anton uppercase, with underscores between words (`AI_AUTOMATION_THAT_ACTUALLY_SHIPS` or similar)
  - Subhead in Inter, muted, max 2 lines: "We build AI systems that handle the work your team shouldn't be doing — voice agents, chat agents, lead outreach, document processing."
  - Primary CTA pill button: "Book a free audit →"
- Right column (40%):
  - **Instead of the stock photo of a smiling marketer**, render an abstract visual:
    - A "terminal" / "console" mock with lime-green text typing out lines like:
      ```
      > deploy.agent --type voice --niche roofing
      > listening on +1 (555) 0142
      > call_received → qualifying lead...
      > lead_captured ✓ booked: tue 2pm
      ```
    - Animated typewriter effect on load (Framer Motion)
    - Wrap it in a soft-rounded card with a lime bleed behind it (mimics the reference's photo backdrop technique)
  - Overlapping `StampBadge` rotating slowly (top-right of the terminal card)
- Background: faint dashed grid lines (CSS background-image with repeating linear gradients)
- Bottom of hero: the diagonal marquee bar bleeds in

### 5.3 Marquee bar (the signature element)
- Two parallel rotated bars (~ -6° rotation)
- **Top bar:** lime bg (`accent.DEFAULT`), dark text
- **Bottom bar:** dark bg (`bg.dark`), white text
- Both scroll infinitely (use Framer Motion `animate` with `x: [-100%, 0]` looping, or CSS `@keyframes`)
- Top bar scrolls left → right, bottom bar scrolls right → left (creates visual tension)
- Text content (rotate through these — separated by small 8-point star/asterisk icons):
  - `BUILT_TO_AUTOMATE`
  - `SHIPPED_IN_DAYS_NOT_MONTHS`
  - `NO_LONG_CONTRACTS`
  - `MEASURABLE_OUTCOMES`
  - `HUMAN_REVIEWED`
- Reusable component — used again later before the stats bar

### 5.4 About Studio
- Layout: 3 columns
  - Left: eyebrow label "ABOUT STUDIO" + small "supports clients worldwide" mini-card with a globe icon
  - Center: an actual screenshot or abstract dashboard visual (not a stock photo)
  - Right: large H2 in Anton, muted body paragraph, dark "Contact Us" button
- Copy direction (rewrite): "We build practical AI systems for businesses that need real outcomes — not pitch decks."

### 5.5 Services (numbered, expand-on-hover)
- Section bg: `bg.soft`
- Heading: "SERVICES" + subhead "Practical AI systems built to remove repetitive work and capture missed revenue."
- 4 service rows, each:
  - Row layout: `(01)` number badge — service name (Anton, uppercase) — arrow circle button on right (lime, dark icon)
  - Thin border-bottom between rows (`line.DEFAULT`)
  - **On hover/click**, the row expands vertically to reveal:
    - A short description
    - 3 bullet sub-services
    - A small abstract visual on the right (NOT a stock photo — use icon compositions or simple illustrations)
- The 4 services (use as-is):
  1. **AI Voice Agents** — Never miss a call. 24/7 answering, lead qualification, appointment booking. Sub-bullets: Inbound answering, Outbound follow-up, CRM sync.
  2. **AI Chat Agents** — Instant responses across website, WhatsApp, and SMS. Sub-bullets: Website widget, WhatsApp integration, Handoff to humans.
  3. **Lead Outreach Automation** — Find leads, personalize, follow up — automatically. Sub-bullets: Lead enrichment, Personalized cold email, Multi-step sequences.
  4. **Document & Data Processing** — Extract structured data from PDFs, invoices, and forms. Sub-bullets: Invoice processing, Form extraction, CRM data entry.

### 5.6 How It Works
- Heading: "OUR PROCESS" + subhead "From first call to live system in under 3 weeks."
- 3 horizontal `PillStep` components connected by dotted lines (exactly mirror the reference)
  - STEP 01 — **DISCOVER** — "We map your workflows and find the highest-ROI automation opportunities."
  - STEP 02 — **BUILD** — "We design, build, and test the system on your real data and edge cases."
  - STEP 03 — **DEPLOY** — "We launch it live, monitor it for 30 days, and keep improving it."
- Below the pill row: 3 detail cards (one per step), each with a small icon in a lime circle

### 5.7 Projects (placeholder for future case studies)
- Section bg: `bg.soft`
- Heading: "RECENT_WORK"
- 3 horizontal cards with `NumberBadge` 01/02/03 in lime circles
- On hover, the hovered card expands horizontally and reveals an image preview (mirror the reference behavior)
- **V1 content (placeholder):** Use generic anonymized projects to make the section feel populated. Examples:
  - 01 — **Voice Agent for a Roofing Co.** — "Captured 34 after-hours leads in 45 days for a regional roofing contractor."
  - 02 — **Chat Agent for a Dental Group** — "Handled 60% of routine patient inquiries; cut front-desk load by 18 hours/week."
  - 03 — **Lead Outreach for a B2B SaaS** — "8,400 personalized cold emails sent; 41 booked demos in month one."
- Add a `data-placeholder="true"` attribute on the cards so they're easy to identify and swap later.

### 5.8 Stats bar
- Mirror the reference: a horizontal bar with 2 marquee strips (one rotated) sandwiching a stats block
- Stats (3 of them, big Anton numbers):
  - `12+` — Systems shipped (placeholder — start at 0 if more honest)
  - `99.4%` — Uptime across deployed agents
  - `<1s` — Average response time
- Animate counter on scroll into view (Framer Motion `useInView` + a counter component)

### 5.9 Live Systems (the creative section — see §7)
See section 7 below for full spec.

### 5.10 Built With (replaces "Team Members")
- Heading: "BUILT_WITH"
- Subhead: "We use the best tools so you get systems that don't break."
- Grid of 5–6 logo pill cards (mirror the reference's "Partner with +150 brands" row exactly)
- Each pill: rounded outlined container, logo centered, monochrome
- Logos to include (use simple SVG marks, or just text wordmarks for V1):
  - OpenAI
  - Anthropic
  - Twilio
  - Make.com
  - n8n
  - Supabase
- Hover: pill bg shifts to `accent.soft`

### 5.11 Testimonials (placeholder, but kept)
- Heading: "WHAT_CLIENTS_SAY"
- Layout: mirror the reference exactly — a big quote card on the right with a soft `accent.soft` bg, small "TESTIMONIAL" label and avatar stack on the left, "0.0K+ Satisfied clients" stat
- **V1 content:** Use a single placeholder testimonial with realistic but generic wording. Make it clearly labeled as a sample in a `data-placeholder` attribute and a subtle code comment in the file so the founder knows to swap it. Suggested placeholder:
  > "They built our after-hours voice agent in under two weeks. It now handles 70% of our incoming calls and we haven't missed a lead since."
  > — *Owner, Regional Roofing Co. (sample testimonial)*
- A small "+ add yours" placeholder slot signals more are coming

### 5.12 FAQ
- 5 questions in collapsible accordion cards (mirror the reference's pill-shaped accordion exactly — `accent.soft` bg, + icon on right that rotates to × on open)
- Questions (use as-is):
  1. **What services do you offer?** — Voice agents, chat agents, lead outreach automation, and document/data processing — all custom-built for your business.
  2. **Who do you work with?** — Small and mid-sized businesses across niches: home services, dental, legal, B2B SaaS, e-commerce. If you have repetitive ops, we can probably help.
  3. **How do you approach a new project?** — A free audit call first. If we can build something with clear ROI, we'll quote a fixed setup fee and a monthly retainer. No long contracts.
  4. **How long does it take to see results?** — Most clients see the system running live within 2–3 weeks. Measurable impact (leads captured, hours saved) usually shows up in the first 30 days.
  5. **Do you offer customized solutions?** — Every system we build is custom. We don't sell templates — we sell systems that fit how your business actually works.

### 5.13 Final CTA
- Full-width section, `bg.soft`
- Centered: massive H2 in Anton ("READY_TO_AUTOMATE?"), short subhead, single dark pill CTA ("Book a free audit →")
- Below: a placeholder for a Cal.com / Calendly embed (use a `<div id="scheduler-placeholder">` with a comment instructing where to drop the embed script later)

### 5.14 Footer
- Dark bg (`bg.dark`), white text, lime accent for active/hover
- Mirror the reference exactly:
  - Left column: "SUBSCRIBE TO OUR NEWSLETTER" + email input + lime "Get Started" pill button (V1: hook up to a no-op or a Vercel API route that logs the email)
  - Right columns: Menus (Home, About, Services, Process, Contact) + Pages (Style Guide, License, Changelog, 404, Password)
  - Bottom row: socials (Twitter/X, LinkedIn, Instagram), contact email, address line, copyright
- Below footer: oversized brand wordmark ghosted into the bg (the way the reference does `DigiGo` at the very bottom — see image 2). Use `BRAND_NAME` here.

---

## 6. Important content rules

- **No stock photos of people** anywhere on the site. The founder is solo and doesn't have a team. Replace every "person photo" slot in the reference with either: an abstract visual, a tool logo, a screenshot of a system in action, or geometric/illustrative art.
- **Every placeholder section** (Projects, Testimonials, Stats) must have a `data-placeholder="true"` attribute on its container AND a clear `{/* PLACEHOLDER: swap with real content once available */}` JSX comment so the founder can find them later.
- **All copy is editable from `/content/*.ts` typed objects.** Don't hardcode strings in components. Example:

```ts
// content/services.ts
export const services = [
  {
    id: '01',
    title: 'AI Voice Agents',
    description: 'Never miss a call.',
    bullets: ['Inbound answering', 'Outbound follow-up', 'CRM sync'],
  },
  // ...
]
```

- **Brand name is `BRAND_NAME`** everywhere. Single replace later.

---

## 7. The creative section — `LiveSystems`

This is the section that earns the agency credibility *because* it's about AI. Most agency sites talk about what they do; this one demonstrates it.

### Concept

A live "system status" panel. Styled like a developer console / observability dashboard, but readable by non-technical SMB owners. It shows (placeholder) real-time signals from the agency's deployed systems.

### Layout

- Heading: "SYSTEMS_LIVE" + small green pulsing dot
- Subhead: "A glimpse at what our deployed AI agents are doing right now."
- A wide card with `bg.dark` background, mono font for accents, lime for active states
- Inside the card:
  - **Left half:** a vertical scrolling feed of "events" (auto-scrolls slowly)
    ```
    14:32:08 ▸ voice_agent.roofing_co_a  → call answered (12s avg)
    14:31:45 ▸ chat_agent.dental_group_b → lead qualified
    14:31:22 ▸ outreach.b2b_saas_c       → 142 emails sent
    14:30:59 ▸ doc_processor.legal_firm  → 23 invoices parsed
    ```
    Each event has a tiny colored dot (lime = active, muted gray = idle)
  - **Right half:** 3 stacked mini-stats with subtle counter animation
    - "Calls answered today: **312**"
    - "Leads captured this week: **1,847**"
    - "Hours saved this month: **214**"

### Behavior

- The feed lines fade in one at a time on an interval (~every 2.5s, new line at top, oldest scrolls out)
- All numbers are static placeholders for V1 (set in `content/liveSystems.ts`) but the **fade-in animation is real** so it feels alive
- Add a small `data-placeholder="true"` and a comment: in V2 this connects to a real backend feed
- Below the card: small disclaimer in muted text: "Sample data shown — real-time integration available to clients via private dashboard."

### Why this section earns its place

- It does what every AI agency *claims* to do (build systems that run) but visually
- It's the strongest possible answer to "okay but does this stuff actually work?"
- It's distinctive — no other AI agency site in your niche does this
- It compounds in value: in V2, it can be hooked to real backend data (Supabase) and become real social proof

---

## 8. Animations spec (Framer Motion)

Implement only what's listed. Don't over-animate.

- **Hero terminal:** typewriter effect on lines, one after the other, ~50ms per char
- **Stamp badge:** continuous rotation, 20s loop, linear easing
- **Marquee bars:** infinite horizontal scroll, 30–40s per loop, top bar leftward, bottom bar rightward
- **Section reveals:** simple fade-up on scroll (`opacity: 0 → 1`, `y: 20 → 0`), 0.5s ease-out
- **Service rows:** height auto-expand on hover (CSS grid trick or `framer-motion` `AnimatePresence`)
- **Project cards:** flex-basis grows on hover to reveal image
- **Stats counters:** number counts from 0 to target on scroll into view (1.5s ease-out)
- **Live Systems feed:** new lines fade-in at top every 2.5s with a slight slide
- **FAQ accordion:** smooth height transition + + → × icon rotation

Respect `prefers-reduced-motion` — disable all motion if true.

---

## 9. Accessibility & performance non-negotiables

- All interactive elements keyboard-accessible (tab order, focus rings in lime)
- All animations skip if `prefers-reduced-motion`
- Real `<button>` and `<a>` tags, never `<div>` with onClick
- Alt text on every image (even decorative ones get `alt=""`)
- Color contrast: body text (`ink.DEFAULT` on `bg.DEFAULT`) passes WCAG AA. Never use `accent` for body text.
- Images: `next/image` everywhere, lazy by default
- Fonts: `display: swap` via next/font defaults
- Lighthouse target: 95+ on all four metrics for desktop, 85+ for mobile

---

## 10. Build order (do it in this order — don't skip ahead)

1. **Setup:** `create-next-app` with TS + Tailwind, install Framer Motion + Lucide + clsx + tailwind-merge
2. **Design tokens:** wire up colors + fonts in `tailwind.config.ts` + `app/layout.tsx`
3. **UI primitives:** Button, Badge, NumberBadge, PillStep, StampBadge, Container, SectionHeading
4. **Content files:** populate all `/content/*.ts` with the copy from this plan
5. **Sections (in page order):** Hero → Marquee → AboutStudio → Services → HowItWorks → Projects → StatsBar → LiveSystems → BuiltWith → Testimonials → FAQ → FinalCTA → Footer
6. **Animations pass:** add all motion last, after layout is solid
7. **Responsive pass:** mobile-first audit, fix any breakpoint issues
8. **Final CTA wiring:** placeholder Cal.com embed div + working contact API route that logs to console (Supabase comes later)
9. **Deploy preview to Vercel**

---

## 11. Out of scope for V1 (do not build)

- Blog / CMS
- Pricing page
- Auth / Supabase / database
- Real-time backend for LiveSystems (placeholder data only)
- Multi-page routing (everything is on `/`)
- Multi-language
- Dark mode toggle
- Analytics dashboard
- E-commerce / Stripe

These come in V2. Resist the urge.

---

## 12. Definition of done for V1

- [ ] Site renders end-to-end on `localhost:3000`
- [ ] All sections present in correct order
- [ ] All placeholder content has `data-placeholder` attributes
- [ ] All animations honor `prefers-reduced-motion`
- [ ] Lighthouse desktop ≥ 95 across all four metrics
- [ ] Mobile layout works at 375px width
- [ ] All copy lives in `/content/` — zero hardcoded marketing strings in components
- [ ] `BRAND_NAME` placeholder appears exactly where the founder will replace it
- [ ] Deployed to Vercel with a public preview URL
