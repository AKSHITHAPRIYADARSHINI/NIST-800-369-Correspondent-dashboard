import type { ImpactLevel } from "@/lib/mock-data/admin-compliance"
import { Badge } from "@/registry/new-york-v4/ui/badge"

export function ImpactBadge({ impact }: { impact: ImpactLevel }) {
  if (impact === "Critical") {
    return <Badge className="bg-red-600/90 text-white">Critical</Badge>
  }

  if (impact === "High") {
    return (
      <Badge variant="outline" className="border-orange-400/60 text-orange-300">
        High
      </Badge>
    )
  }

  if (impact === "Medium") {
    return (
      <Badge variant="outline" className="border-amber-400/60 text-amber-300">
        Medium
      </Badge>
    )
  }

  return <Badge className="bg-emerald-600/80 text-white">Low</Badge>
}

