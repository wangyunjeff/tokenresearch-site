"use client"

import {
  BookOpen,
  Bot,
  BrainCircuit,
  FileSearch,
  FileText,
  FlaskConical,
  Layers3,
  Microscope,
  Search,
  ScrollText,
} from "lucide-react"

import { useLanguage } from "@/components/language-provider"
import CTA from "@/components/sections/cta/default"
import FAQ from "@/components/sections/faq/default"
import Footer from "@/components/sections/footer/default"
import Hero from "@/components/sections/hero/default"
import Items from "@/components/sections/items/default"
import Logos from "@/components/sections/logos/default"
import Mission from "@/components/sections/mission/default"
import Navbar from "@/components/sections/navbar/default"
import ResearchSignal from "@/components/sections/research-signal/default"
import Skills from "@/components/sections/skills/default"
import Stats from "@/components/sections/stats/default"
import Team from "@/components/sections/team/default"
import { Badge } from "@/components/ui/badge"
import { getSiteCopy } from "@/lib/site-copy"

const workflowIcons = [
  <BookOpen key="literature" className="size-5" />,
  <BrainCircuit key="ideation" className="size-5" />,
  <FlaskConical key="experiment" className="size-5" />,
  <Search key="analysis" className="size-5" />,
  <FileText key="writing" className="size-5" />,
]

const capabilityIcons = [
  <BookOpen key="literature-review" className="stroke-1.5 size-5" />,
  <Bot key="research-agent" className="stroke-1.5 size-5" />,
  <FileSearch key="ai-search" className="stroke-1.5 size-5" />,
  <Layers3 key="extract-data" className="stroke-1.5 size-5" />,
  <FlaskConical key="sop-skills" className="stroke-1.5 size-5" />,
  <Microscope key="deep-research" className="stroke-1.5 size-5" />,
  <FileText key="reports" className="stroke-1.5 size-5" />,
  <ScrollText key="handoffs" className="stroke-1.5 size-5" />,
]

const researchSignalIcons = [
  <Search key="pricing-signal" className="stroke-1.5 size-5" />,
  <Layers3 key="cache-signal" className="stroke-1.5 size-5" />,
  <Bot key="agent-loop-signal" className="stroke-1.5 size-5" />,
]

export default function HomePage() {
  const { language } = useLanguage()
  const copy = getSiteCopy(language)

  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <Navbar
        name={copy.brand.localizedName}
        homeUrl="/"
        links={copy.navbar.links}
        dashboardLabel={copy.navbar.dashboard}
        dashboardHref="/gateway"
        menuLabel={copy.navbar.menuLabel}
      />
      <Hero
        badgeStatus={copy.hero.badge.status}
        badgeText={copy.hero.badge.text}
        eyebrow={copy.hero.eyebrow}
        titlePrefix={copy.hero.titlePrefix}
        researchFields={copy.hero.researchFields}
        researchFieldsLabel={copy.hero.researchFieldsLabel}
        description={copy.hero.description}
        mockupAlt={copy.hero.imageAlt}
        buttons={copy.hero.buttons}
        highlights={copy.hero.highlights}
      />
      <Logos
        badge={
          <Badge
            variant="outline"
            className="border-brand/30 bg-brand/10 text-brand"
          >
            {copy.workflow.badge}
          </Badge>
        }
        title={copy.workflow.title}
        steps={copy.workflow.steps.map((step, index) => ({
          ...step,
          icon: workflowIcons[index],
        }))}
      />
      <Mission
        badgeLabel={copy.mission.badge}
        title={copy.mission.title}
        description={copy.mission.description}
        operatingBeliefLabel={copy.mission.operatingBeliefLabel}
        operatingBelief={copy.mission.operatingBelief}
        operatingBeliefTags={copy.mission.operatingBeliefTags}
        principles={copy.mission.principles}
      />
      <Items
        title={copy.capabilities.title}
        description={copy.capabilities.description}
        items={copy.capabilities.items.map((item, index) => ({
          ...item,
          icon: capabilityIcons[index],
        }))}
      />
      <ResearchSignal
        badgeLabel={copy.researchSignal.badge}
        title={copy.researchSignal.title}
        description={copy.researchSignal.description}
        sourceLabel={copy.researchSignal.sourceLabel}
        cards={copy.researchSignal.cards.map((card, index) => ({
          ...card,
          icon: researchSignalIcons[index],
        }))}
      />
      <Stats items={copy.stats.items} />
      <Skills
        badgeLabel={copy.skills.badge}
        title={copy.skills.title}
        description={copy.skills.description}
        skills={copy.skills.skills}
        officialLabel={copy.skills.officialLabel}
        placeholderBadge={copy.skills.placeholderBadge}
        placeholderTitle={copy.skills.placeholderTitle}
        placeholderDescription={copy.skills.placeholderDescription}
        placeholderNote={copy.skills.placeholderNote}
      />
      <Team
        badgeLabel={copy.team.badge}
        title={copy.team.title}
        description={copy.team.description}
        members={copy.team.members}
        launchSlots={copy.team.launchSlots}
        launchSlotDescription={copy.team.launchSlotDescription}
      />
      <FAQ
        badgeLabel={copy.faq.badge}
        title={copy.faq.title}
        items={copy.faq.items.map((item) => ({
          ...item,
          answer: (
            <>
              {item.answer.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mb-4 max-w-[640px] text-balance text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </>
          ),
        }))}
      />
      <CTA
        title={copy.cta.title}
        description={copy.cta.description}
        buttons={copy.cta.buttons}
      />
      <Footer
        name={copy.brand.localizedName}
        description={copy.footer.description}
        columns={copy.footer.columns}
        copyright={copy.footer.copyright}
        policies={copy.footer.policies}
      />
    </main>
  )
}
