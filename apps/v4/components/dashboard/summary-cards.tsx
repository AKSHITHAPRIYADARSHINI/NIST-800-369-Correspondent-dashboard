"use client"

import * as React from "react"
import { IconLayoutGridAdd } from "@tabler/icons-react"

import { NumberTicker } from "@/components/dashboard/number-ticker"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"

type SummaryCard = {
  title: string
  value: React.ReactNode
  badge: string
  label: string
  subline: string
}

const summaryBadgeClass = "max-w-[70%] truncate text-[10px] font-medium leading-none"

const topRowCards: SummaryCard[] = [
  {
    title: "Overall Security Score",
    value: (
      <>
        <NumberTicker value={91} className="tabular-nums" />
        <span className="text-muted-foreground">/100</span>
      </>
    ),
    badge: "improving +3.2%",
    label: "Improved from last review",
    subline: "Leadership oversight metric",
  },
  {
    title: "Compliance Status",
    value: (
      <>
        <NumberTicker value={87} className="tabular-nums" />
        <span>%</span>
      </>
    ),
    badge: "NIST 800-369 stable",
    label: "Aligned with required controls",
    subline: "Leadership oversight metric",
  },
  {
    title: "Active Incidents",
    value: <NumberTicker value={4} className="tabular-nums" />,
    badge: "Needs attention",
    label: "2 high-priority incidents open",
    subline: "Leadership oversight metric",
  },
  {
    title: "Open Tickets",
    value: <NumberTicker value={12} className="tabular-nums" />,
    badge: "warning review backlog",
    label: "Pending verification workflows",
    subline: "Leadership oversight metric",
  },
]

const secondRowCards: SummaryCard[] = [
  {
    title: "MFA Adoption",
    value: (
      <>
        <NumberTicker value={93} className="tabular-nums" />
        <span>%</span>
      </>
    ),
    badge: "7-day check passed",
    label: "Staff authentication coverage",
    subline: "Leadership oversight metric",
  },
  {
    title: "Protected Devices",
    value: (
      <>
        <NumberTicker value={214} className="tabular-nums" />
        <span className="text-muted-foreground"> / </span>
        <NumberTicker value={236} className="tabular-nums" />
      </>
    ),
    badge: "+9 devices this week",
    label: "Devices currently secured",
    subline: "Leadership oversight metric",
  },
]

function SummaryCardItem({ card }: { card: SummaryCard }) {
  return (
    <Card className="gap-3 py-4">
      <CardHeader className="flex flex-row items-start justify-between gap-3 px-4 pb-0">
        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
        <Badge variant="outline" className={summaryBadgeClass}>
          {card.badge}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-1 px-4 pt-0">
        <p className="text-2xl font-semibold leading-none tracking-tight text-foreground">
          {card.value}
        </p>
        <p className="text-xs text-muted-foreground">{card.label}</p>
        <p className="text-[11px] text-muted-foreground/90">{card.subline}</p>
      </CardContent>
    </Card>
  )
}

export function DashboardSummaryCards() {
  return (
    <div className="grid gap-4 px-4 lg:px-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {topRowCards.map((card) => (
          <SummaryCardItem key={card.title} card={card} />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {secondRowCards.map((card) => (
          <SummaryCardItem key={card.title} card={card} />
        ))}
        <Card className="gap-3 py-4">
          <CardHeader className="flex flex-row items-start justify-between gap-3 px-4 pb-0">
            <CardTitle className="text-sm font-medium">Customizable Card</CardTitle>
            <Badge variant="outline" className="text-[10px]">
              Add widget
            </Badge>
          </CardHeader>
          <CardContent className="space-y-2 px-4 pt-0">
            <div className="flex items-center gap-2 text-2xl font-semibold leading-none tracking-tight">
              <IconLayoutGridAdd className="size-5 text-primary" />
              <span>+</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Add a chart or metric
            </p>
            <p className="text-[11px] text-muted-foreground/90">
              Select the next visual card or dashboard chart
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
