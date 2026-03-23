import type { ReactNode } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"

export function AdminStatCard({
  label,
  value,
  helper,
  badge,
  icon,
}: {
  label: string
  value: string
  helper: string
  badge: string
  icon?: ReactNode
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription className="flex items-center justify-between gap-2">
          <span>{label}</span>
          {icon}
        </CardDescription>
        <CardTitle className="text-2xl tabular-nums">{value}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 pt-0">
        <p className="text-xs text-muted-foreground">{helper}</p>
        <p className="text-xs font-medium text-primary">{badge}</p>
      </CardContent>
    </Card>
  )
}
