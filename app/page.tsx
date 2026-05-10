import { Nav } from '@/components/sections/Nav';
import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { AboutStudio } from '@/components/sections/AboutStudio';
import { Services } from '@/components/sections/Services';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Projects } from '@/components/sections/Projects';
import { StatsBar } from '@/components/sections/StatsBar';
import { LiveSystems } from '@/components/sections/LiveSystems';
import { BuiltWith } from '@/components/sections/BuiltWith';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <AboutStudio />
        <Services />
        <HowItWorks />
        <Projects />
        <StatsBar />
        <LiveSystems />
        <BuiltWith />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
