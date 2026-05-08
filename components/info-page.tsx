"use client"

import {
  ArrowRight,
  BookOpen,
  CircleDollarSign,
  ExternalLink,
  Radar,
  Route,
  ServerCog,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import SiteShell from "@/components/site-shell"
import { useLanguage } from "@/components/language-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { getPageCopy } from "@/lib/site-pages"

type PageKind = "mission" | "gateway" | "skills" | "perspectives" | "signals"

const pageIcons = {
  mission: Sparkles,
  gateway: ServerCog,
  skills: Route,
  perspectives: BookOpen,
  signals: Radar,
} as const

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://")
}

function PageHero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  kind,
}: {
  eyebrow: string
  title: string
  description: string
  primaryAction: { text: string; href: string }
  secondaryAction?: { text: string; href: string }
  kind: PageKind
}) {
  const Icon = pageIcons[kind]

  return (
    <Section id="top" className="overflow-hidden pb-10 sm:pb-14">
      <div className="mx-auto grid max-w-container gap-10 pt-14 lg:grid-cols-[1fr_0.64fr] lg:items-end">
        <div className="flex flex-col gap-7">
          <Badge
            variant="outline"
            className="w-fit border-brand/30 bg-brand/10 text-brand"
          >
            <Icon className="size-3.5" />
            {eyebrow}
          </Badge>
          <div className="flex flex-col gap-6">
            <h1 className="max-w-[980px] font-[family-name:var(--font-display)] text-4xl leading-tight font-semibold text-balance sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="max-w-[760px] text-base leading-8 text-muted-foreground sm:text-xl sm:leading-9">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <a
                href={primaryAction.href}
                target={isExternalHref(primaryAction.href) ? "_blank" : undefined}
                rel={
                  isExternalHref(primaryAction.href) ? "noreferrer" : undefined
                }
              >
                {primaryAction.text}
                {isExternalHref(primaryAction.href) ? (
                  <ExternalLink className="size-4" />
                ) : (
                  <ArrowRight className="size-4" />
                )}
              </a>
            </Button>
            {secondaryAction && (
              <Button size="lg" variant="outline" asChild>
                <a
                  href={secondaryAction.href}
                  target={
                    isExternalHref(secondaryAction.href) ? "_blank" : undefined
                  }
                  rel={
                    isExternalHref(secondaryAction.href)
                      ? "noreferrer"
                      : undefined
                  }
                >
                  {secondaryAction.text}
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] border border-border/60 bg-card/70 p-5 shadow-xl shadow-black/10 backdrop-blur">
          <div className="grid aspect-[1.18] place-items-center rounded-[1.5rem] border border-border/60 bg-background/70">
            <div className="grid size-40 place-items-center rounded-full border border-brand/20 bg-brand/10">
              <Icon className="size-16 text-brand" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function LinkedCard({
  title,
  value,
  description,
  href,
}: {
  title: string
  value: string
  description: string
  href: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group rounded-[1.75rem] border border-border/60 bg-card/70 p-6 shadow-lg shadow-black/10 backdrop-blur transition-transform duration-300 hover:-translate-y-1 hover:border-brand/40"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">{title}</p>
          <h3 className="mt-3 text-2xl font-semibold">{value}</h3>
        </div>
        <ExternalLink className="size-5 text-brand" />
      </div>
      <p className="mt-5 text-sm leading-7 text-muted-foreground">
        {description}
      </p>
    </a>
  )
}

function SimpleCard({
  title,
  description,
  label,
}: {
  title: string
  description: string
  label?: string
}) {
  return (
    <article className="rounded-[1.75rem] border border-border/60 bg-card/70 p-6 backdrop-blur">
      {label && (
        <Badge
          variant="outline"
          className="mb-5 border-brand/25 bg-brand/10 text-brand"
        >
          {label}
        </Badge>
      )}
      <h3 className="text-xl leading-tight font-semibold text-balance">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        {description}
      </p>
    </article>
  )
}

function MissionPage() {
  const { language } = useLanguage()
  const copy = getPageCopy(language).missionPage

  return (
    <SiteShell>
      <PageHero
        kind="mission"
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        primaryAction={copy.primaryAction}
        secondaryAction={copy.secondaryAction}
      />
      <Section className="pt-4">
        <div className="mx-auto grid max-w-container gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-[2rem] border border-border/60 bg-card/75 p-7 shadow-xl shadow-black/10 backdrop-blur">
            <p className="text-sm font-semibold text-brand">
              {copy.thesisLabel}
            </p>
            <p className="mt-5 font-[family-name:var(--font-display)] text-3xl leading-tight font-semibold text-balance">
              {copy.thesis}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {copy.beliefs.map((belief) => (
              <SimpleCard key={belief.title} {...belief} />
            ))}
          </div>
        </div>
      </Section>
      <Section>
        <div className="mx-auto max-w-container">
          <div className="rounded-[2rem] border border-border/60 bg-card/70 p-7 backdrop-blur">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold">
              {copy.operatingModelTitle}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {copy.operatingModel.map((item, index) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border border-border/60 bg-background/55 p-5"
                >
                  <div className="mb-5 grid size-9 place-items-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </SiteShell>
  )
}

function GatewayPage() {
  const { language } = useLanguage()
  const copy = getPageCopy(language).gatewayPage

  return (
    <SiteShell>
      <PageHero
        kind="gateway"
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        primaryAction={copy.primaryAction}
        secondaryAction={copy.secondaryAction}
      />
      <Section className="pt-4">
        <div className="mx-auto grid max-w-container gap-4 md:grid-cols-2">
          {copy.statusCards.map((card) => (
            <LinkedCard key={card.title} {...card} />
          ))}
        </div>
      </Section>
      <Section>
        <div className="mx-auto grid max-w-container gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            {copy.features.map((feature) => (
              <SimpleCard key={feature.title} {...feature} />
            ))}
          </div>
          <div className="rounded-[2rem] border border-border/60 bg-card/70 p-7 backdrop-blur">
            <Badge
              variant="outline"
              className="border-brand/25 bg-brand/10 text-brand"
            >
              Roadmap
            </Badge>
            <div className="mt-6 grid gap-3">
              {copy.roadmap.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-[1.25rem] border border-border/60 bg-background/55 p-4"
                >
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" />
                  <p className="text-sm leading-7 text-muted-foreground">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </SiteShell>
  )
}

function SkillsPage() {
  const { language } = useLanguage()
  const copy = getPageCopy(language).skillsPage

  return (
    <SiteShell>
      <PageHero
        kind="skills"
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        primaryAction={copy.primaryAction}
        secondaryAction={copy.secondaryAction}
      />
      <Section className="pt-4">
        <div className="mx-auto grid max-w-container gap-4 md:grid-cols-3">
          {copy.tiers.map((tier) => (
            <article
              key={tier.title}
              className="rounded-[1.75rem] border border-border/60 bg-card/70 p-6 backdrop-blur"
            >
              <CircleDollarSign className="size-5 text-brand" />
              <h3 className="mt-5 text-xl font-semibold">{tier.title}</h3>
              <p className="mt-2 text-sm font-semibold text-brand">
                {tier.price}
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {tier.description}
              </p>
            </article>
          ))}
        </div>
      </Section>
      <Section>
        <div className="mx-auto grid max-w-container gap-4 md:grid-cols-2 xl:grid-cols-4">
          {copy.skillCards.map((skill) => (
            <SimpleCard key={skill.title} {...skill} />
          ))}
        </div>
      </Section>
    </SiteShell>
  )
}

function PerspectivesPage() {
  const { language } = useLanguage()
  const copy = getPageCopy(language).perspectivesPage

  return (
    <SiteShell>
      <PageHero
        kind="perspectives"
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        primaryAction={{ text: language === "zh" ? "查看 AI 讯息" : "View AI Signals", href: "/signals" }}
        secondaryAction={{ text: language === "zh" ? "查看 Skill" : "Explore Skills", href: "/skills" }}
      />
      <Section className="pt-4">
        <div className="mx-auto grid max-w-container gap-4 md:grid-cols-3">
          {copy.articles.map((article) => (
            <SimpleCard
              key={article.title}
              title={article.title}
              description={article.description}
              label={article.category}
            />
          ))}
        </div>
      </Section>
      <Section>
        <div className="mx-auto max-w-container rounded-[2rem] border border-border/60 bg-card/70 p-7 backdrop-blur">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold">
            {copy.backlogTitle}
          </h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {copy.backlog.map((item) => (
              <div
                key={item}
                className="rounded-[1.25rem] border border-border/60 bg-background/55 p-4 text-sm leading-7 text-muted-foreground"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </SiteShell>
  )
}

function SignalsPage() {
  const { language } = useLanguage()
  const copy = getPageCopy(language).signalsPage

  return (
    <SiteShell>
      <PageHero
        kind="signals"
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        primaryAction={{ text: language === "zh" ? "打开监控" : "Open Monitor", href: "http://8.137.174.4/" }}
        secondaryAction={{ text: language === "zh" ? "查看观点" : "Read Perspectives", href: "/perspectives" }}
      />
      <Section className="pt-4">
        <div className="mx-auto grid max-w-container gap-4 md:grid-cols-3">
          {copy.pipeline.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[1.75rem] border border-border/60 bg-card/70 p-6 backdrop-blur"
            >
              <div className="grid size-10 place-items-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
                {index + 1}
              </div>
              <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </Section>
      <Section>
        <div className="mx-auto grid max-w-container gap-4 md:grid-cols-3">
          {copy.signals.map((signal) => (
            <a
              key={signal.title}
              href={signal.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-[1.75rem] border border-border/60 bg-card/70 p-6 backdrop-blur transition-colors hover:border-brand/40"
            >
              <div className="flex items-center justify-between gap-3">
                <Badge
                  variant="outline"
                  className="border-brand/25 bg-brand/10 text-brand"
                >
                  {signal.source}
                </Badge>
                <ExternalLink className="size-4 text-muted-foreground" />
              </div>
              <h3 className="mt-5 text-xl leading-tight font-semibold text-balance">
                {signal.title}
              </h3>
              <p className="mt-2 text-sm font-semibold text-brand">
                {signal.impact}
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {signal.description}
              </p>
            </a>
          ))}
        </div>
      </Section>
    </SiteShell>
  )
}

export default function InfoPage({ kind }: { kind: PageKind }) {
  if (kind === "mission") {
    return <MissionPage />
  }

  if (kind === "gateway") {
    return <GatewayPage />
  }

  if (kind === "skills") {
    return <SkillsPage />
  }

  if (kind === "perspectives") {
    return <PerspectivesPage />
  }

  return <SignalsPage />
}
