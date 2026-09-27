import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { About } from "@/components/sections/about";
import { Testimonials } from "@/components/sections/testimonials";
import { Founder } from "@/components/sections/founder";
import { Trial } from "@/components/sections/trial";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Services />
        <Process />
        <About />
        <Testimonials />
        <Founder />
        <Trial />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
