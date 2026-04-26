import Image from "next/image"
import * as React from "react"

import { cn } from "@/lib/utils"

type BrandLogoProps = Omit<React.ComponentPropsWithoutRef<"div">, "children"> & {
  imageClassName?: string
  logoAlt?: string
  name?: string
  nameClassName?: string
  priority?: boolean
  showName?: boolean
  size?: number
}

function BrandLogo({
  className,
  imageClassName,
  logoAlt = "TokenResearch logo",
  name = "TokenResearch",
  nameClassName,
  priority = false,
  showName = true,
  size = 28,
  ...props
}: BrandLogoProps) {
  return (
    <div
      data-slot="brand-logo"
      className={cn("inline-flex items-center gap-2", className)}
      aria-label={logoAlt}
      {...props}
    >
      <span
        className={cn(
          "relative inline-flex shrink-0 overflow-hidden rounded-[6px]",
          imageClassName
        )}
        style={{ height: size, width: size }}
        aria-hidden="true"
      >
        <Image
          src="/logo/tr1.png"
          alt=""
          width={size}
          height={size}
          priority={priority}
          sizes={`${size}px`}
          className="block size-full object-cover dark:hidden"
        />
        <Image
          src="/logo/tr3.png"
          alt=""
          width={size}
          height={size}
          priority={priority}
          sizes={`${size}px`}
          className="hidden size-full object-cover dark:block"
        />
      </span>
      <span
        className={cn(
          "text-sm font-semibold leading-none text-foreground",
          !showName && "sr-only",
          nameClassName
        )}
      >
        {name}
      </span>
    </div>
  )
}

export { BrandLogo }
export default BrandLogo
