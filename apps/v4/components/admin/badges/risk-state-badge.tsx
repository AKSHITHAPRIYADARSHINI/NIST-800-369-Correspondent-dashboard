import type { AccessRiskState } from "@/lib/mock-data/admin-users-access"
import { Badge } from "@/registry/new-york-v4/ui/badge"

export function RiskStateBadge({ state }: { state: AccessRiskState }) {
  if (state === "Restricted") return <Badge className="bg-red-700/90 text-white">Restricted</Badge>
  if (state === "High Risk") return <Badge className="bg-red-600/90 text-white">High Risk</Badge>
  if (state === "Needs Review") return <Badge variant="outline" className="border-amber-400/60 text-amber-300">Needs Review</Badge>
  return <Badge className="bg-emerald-600/80 text-white">Normal</Badge>
}

