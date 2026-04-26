import Image from "next/image"

import { Badge } from "../../ui/badge"
import { Section } from "../../ui/section"

interface TeamMember {
  name: string
  title: string
  note?: string
  imageSrc: string
  imageAlt?: string
}

interface TeamProps {
  title?: string
  description?: string
  members?: TeamMember[] | false
  className?: string
}

export default function Team({
  title = "Meet the founding team",
  description = "The founding team profiles are now in place, with room to expand bios, links, and launch materials as the site evolves.",
  members = [
    {
      name: "Luoxiao Yang",
      title: "Founder",
      note: "Profile details can be expanded here when the final short bio is ready.",
      imageSrc: "/team/luoxiao-yang.svg",
      imageAlt: "Portrait illustration of Luoxiao Yang",
    },
    {
      name: "Yun Wang",
      title: "Founder",
      note: "Profile details can be expanded here when the final short bio is ready.",
      imageSrc: "/team/yun-wang.svg",
      imageAlt: "Portrait illustration of Yun Wang",
    },
  ],
  className,
}: TeamProps) {
  const launchSlots = [
    "Case study cover placeholder",
    "Institution or partner logo strip placeholder",
    "Press quote or testimonial placeholder",
  ]

  return (
    <Section id="team" className={className}>
      <div className="mx-auto max-w-container space-y-8">
        <div className="space-y-4 text-center">
          <Badge
            variant="outline"
            className="border-brand/30 bg-brand/10 text-brand"
          >
            Team and launch assets
          </Badge>
          <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight font-semibold sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto max-w-[760px] text-base leading-8 text-muted-foreground sm:text-lg">
            {description}
          </p>
        </div>

        {members !== false && members.length > 0 && (
          <div className="grid gap-6 lg:grid-cols-2">
            {members.map((member) => (
              <article
                key={member.name}
                className="rounded-[2rem] border border-border/60 bg-card/72 p-6 shadow-xl shadow-black/10"
              >
                <div className="rounded-[1.75rem] border border-dashed border-brand/35 bg-background/40 p-4">
                  <div className="overflow-hidden rounded-[1.4rem] border border-dashed border-border/70 bg-white/95">
                    <Image
                      src={member.imageSrc}
                      alt={member.imageAlt ?? `${member.name} portrait`}
                      width={900}
                      height={1200}
                      className="aspect-[4/3] h-full w-full object-contain object-center"
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-semibold">{member.name}</h3>
                    <p className="mt-2 text-lg text-muted-foreground">
                      {member.title}
                    </p>
                  </div>
                  {member.note && (
                    <p className="text-sm leading-7 text-muted-foreground">
                      {member.note}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          {launchSlots.map((slot) => (
            <div
              key={slot}
              className="rounded-[1.75rem] border border-dashed border-brand/30 bg-background/35 p-5"
            >
              <p className="text-sm font-semibold">{slot}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Reserve this block for additional launch credibility assets when
                you have the final image or copy.
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
