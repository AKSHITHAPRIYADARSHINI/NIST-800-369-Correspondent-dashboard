import type { ReactNode } from "react"
import { IconChevronRight } from "@tabler/icons-react"

import { NumberTicker } from "@/components/ui/number-ticker"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Badge } from "@/registry/new-york-v4/ui/badge"

export function OperationsMetricCard({
  label,
  count,
  context,
  icon,
}: {
  label: string
  count: number
  context: string
  icon?: ReactNode
}) {
  return (
    <Card className="transition-colors hover:border-primary/40">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm font-medium">
          <span>{label}</span>
          {icon ?? <IconChevronRight className="size-4 text-muted-foreground" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 pt-0">
        <div className="text-2xl font-semibold tabular-nums">
          <NumberTicker value={count} />
        </div>
        <Badge variant="outline" className="text-xs">
          {context}
        </Badge>
      </CardContent>
    </Card>
  )
}

