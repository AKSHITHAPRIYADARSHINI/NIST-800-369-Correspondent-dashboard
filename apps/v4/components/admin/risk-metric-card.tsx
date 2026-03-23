import { NumberTicker } from "@/components/ui/number-ticker"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"

export function RiskMetricCard({ label, count, context, badge }: { label: string; count: number; context: string; badge: string }) {
  return (
    <Card className="transition-colors hover:border-primary/40">
      <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">{label}</CardTitle></CardHeader>
      <CardContent className="space-y-1 pt-0">
        <div className="text-2xl font-semibold tabular-nums"><NumberTicker value={count} /></div>
        <p className="text-xs text-muted-foreground">{context}</p>
        <Badge variant="outline" className="text-xs">{badge}</Badge>
      </CardContent>
    </Card>
  )
}
