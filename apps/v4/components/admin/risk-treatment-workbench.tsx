import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Progress } from "@/registry/new-york-v4/ui/progress"

const stages = ["Identified", "Assessing", "Under Treatment", "Monitoring", "Ready for Review", "Closed"]

export function RiskTreatmentWorkbench({ items }: { items: Record<string, number> }) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Risk Treatment Workbench</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {stages.map((stage) => {
          const count = items[stage] ?? 0
          const progress = Math.min(100, count * 8)
          return (
            <div key={stage} className="space-y-1">
              <div className="flex items-center justify-between text-sm"><span>{stage}</span><span>{count}</span></div>
              <Progress value={progress} />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
