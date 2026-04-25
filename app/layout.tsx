import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TokenResearch | Research & Engineering Workflow Advisory",
  description:
    "TokenResearch builds bilingual brand and service experiences for research and engineering workflow advisory, SOP design, and high-value service coordination.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
