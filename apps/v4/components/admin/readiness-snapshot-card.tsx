import type { ReadinessState } from "@/lib/mock-data/admin-compliance"
import { NumberTicker } from "@/components/ui/number-ticker"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Progress } from "@/registry/new-york-v4/ui/progress"

function readinessBadge(state: ReadinessState) {
  if (state === "Leadership Ready") return <Badge className="bg-emerald-600/80 text-white">Leadership Ready</Badge>
  if (state === "Ready for Review") return <Badge className="bg-blue-600/80 text-white">Ready for Review</Badge>
  if (state === "Partially Ready") return <Badge variant="outline" className="border-amber-400/60 text-amber-300">Partially Ready</Badge>
  return <Badge className="bg-red-600/90 text-white">Not Ready</Badge>
}

export function ReadinessSnapshotCard({
  operationalReadiness,
  evidenceCompleteness,
  awaitingSignOff,
  blockedItems,
  upcomingDeadlines,
  readinessState,
}: {
  operationalReadiness: number
  evidenceCompleteness: number
  awaitingSignOff: number
  blockedItems: number
  upcomingDeadlines: number
  readinessState: ReadinessState
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Readiness Snapshot</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Operational readiness</span>
            <span>{operationalReadiness}%</span>
          </div>
          <Progress value={operationalReadiness} />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Evidence completeness</span>
            <span>{evidenceCompleteness}%</span>
          </div>
          <Progress value={evidenceCompleteness} />
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-md border border-border/70 p-2">Awaiting sign-off: <NumberTicker value={awaitingSignOff} /></div>
          <div className="rounded-md border border-border/70 p-2">Blocked items: <NumberTicker value={blockedItems} /></div>
          <div className="rounded-md border border-border/70 p-2">Upcoming deadlines: <NumberTicker value={upcomingDeadlines} /></div>
          <div className="rounded-md border border-border/70 p-2 flex items-center justify-center">{readinessBadge(readinessState)}</div>
        </div>
      </CardContent>
    </Card>
  )
}

