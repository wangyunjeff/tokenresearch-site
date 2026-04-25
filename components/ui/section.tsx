import type { ReactNode } from "react"

type SectionProps = {
  id?: string
  className?: string
  children: ReactNode
}

export function Section({ id, className = "", children }: SectionProps) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-6xl px-6 py-16 md:px-8 md:py-24 ${className}`.trim()}
    >
      {children}
    </section>
  )
}
