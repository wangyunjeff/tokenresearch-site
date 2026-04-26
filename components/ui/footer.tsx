import * as React from "react"

import { cn } from "@/lib/utils"

function Footer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="footer"
      className={cn("bg-background pt-12 pb-4 text-foreground", className)}
      {...props}
    />
  )
}

function FooterContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="footer-content"
      className={cn(
        "grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
        className
      )}
      {...props}
    />
  )
}

function FooterColumn({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="footer-column"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  )
}

function FooterBottom({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="footer-bottom"
      className={cn(
        "mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-4 text-xs text-muted-foreground sm:flex-row dark:border-border/15",
        className
      )}
      {...props}
    />
  )
}

export { Footer, FooterBottom, FooterColumn, FooterContent }
