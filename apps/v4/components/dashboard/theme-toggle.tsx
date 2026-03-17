"use client"

import * as React from "react"
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react"
import { useTheme } from "next-themes"

import { Button } from "@/registry/new-york-v4/ui/button"

export function DashboardThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button size="icon" variant="outline" className="size-7">
        <IconSunFilled />
      </Button>
    )
  }

  const isDark = theme === "dark"

  return (
    <Button
      size="icon"
      variant="outline"
      className="size-7"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {isDark ? <IconSunFilled /> : <IconMoonFilled />}
    </Button>
  )
}
