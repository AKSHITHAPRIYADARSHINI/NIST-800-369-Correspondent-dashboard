import type { RiskLevel } from "@/lib/mock-data/security-operations"
import { Badge } from "@/registry/new-york-v4/ui/badge"

export function RiskBadge({ level }: { level: RiskLevel }) {
  if (level === "Critical") {
    return <Badge className="bg-red-600/90 text-white">Critical</Badge>
  }

  if (level === "High") {
    return (
      <Badge variant="outline" className="border-orange-400/60 text-orange-300">
        High
      </Badge>
    )
  }

  if (level === "Medium") {
    return (
      <Badge variant="outline" className="border-amber-400/60 text-amber-300">
        Medium
      </Badge>
    )
  }

  return <Badge className="bg-emerald-600/80 text-white">Low</Badge>
}

