import CTA from "@/components/sections/cta/default"
import FAQ from "@/components/sections/faq/default"
import Footer from "@/components/sections/footer/default"
import Hero from "@/components/sections/hero/default"
import Items from "@/components/sections/items/default"
import Logos from "@/components/sections/logos/default"
import Mission from "@/components/sections/mission/default"
import Navbar from "@/components/sections/navbar/default"
import Skills from "@/components/sections/skills/default"
import Stats from "@/components/sections/stats/default"
import Team from "@/components/sections/team/default"

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <Navbar />
      <Hero />
      <Logos />
      <Mission />
      <Items />
      <Stats />
      <Skills />
      <Team />
      <FAQ />
      <CTA />
      <Footer showModeToggle={false} />
    </main>
  )
}
