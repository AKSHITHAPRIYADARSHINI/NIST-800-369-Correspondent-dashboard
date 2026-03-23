import type { IncidentSeverity } from "@/lib/mock-data/admin-incidents"
import { Badge } from "@/registry/new-york-v4/ui/badge"

export function SeverityBadge({ severity }: { severity: IncidentSeverity }) {
  if (severity === "Critical") return <Badge className="bg-red-600/90 text-white">Critical</Badge>
  if (severity === "High") return <Badge variant="outline" className="border-orange-400/60 text-orange-300">High</Badge>
  if (severity === "Medium") return <Badge variant="outline" className="border-amber-400/60 text-amber-300">Medium</Badge>
  return <Badge className="bg-emerald-600/80 text-white">Low</Badge>
}
