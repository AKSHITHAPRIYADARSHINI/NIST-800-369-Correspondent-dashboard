import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/registry/new-york-v4/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import {
  executiveCards,
  type ExecutiveCardStatus,
} from "@/app/(app)/examples/dashboard/dashboard-data"

function statusBadge(status: ExecutiveCardStatus) {
  switch (status) {
    case "secure":
      return { variant: "secondary" as const, className: "text-emerald-600" }
    case "warning":
      return { variant: "outline" as const, className: "text-amber-600" }
    case "critical":
      return { variant: "destructive" as const, className: "" }
    case "improving":
      return { variant: "outline" as const, className: "text-primary" }
    default:
      return { variant: "outline" as const, className: "text-muted-foreground" }
  }
}

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      {executiveCards.map((metric) => {
        const badge = statusBadge(metric.status)
        const isDown = metric.status === "warning" || metric.status === "critical"

        return (
          <Card className="@container/card" key={metric.title}>
            <CardHeader>
              <CardDescription>{metric.title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {metric.value}
              </CardTitle>
              <CardAction>
                <Badge variant={badge.variant} className={badge.className}>
                  {isDown ? <IconTrendingDown /> : <IconTrendingUp />}
                  {metric.indicatorLabel}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {metric.supportingLabel}
              </div>
              <div className="text-muted-foreground">Leadership oversight metric</div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
