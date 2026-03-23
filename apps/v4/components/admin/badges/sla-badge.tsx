import type { SlaState } from "@/lib/mock-data/admin-incidents"
import { Badge } from "@/registry/new-york-v4/ui/badge"

export function SlaBadge({ state }: { state: SlaState }) {
  if (state === "Breached") return <Badge className="bg-red-600/90 text-white">Breached</Badge>
  if (state === "Overdue") return <Badge variant="outline" className="border-orange-400/60 text-orange-300">Overdue</Badge>
  if (state === "Due Soon") return <Badge variant="outline" className="border-amber-400/60 text-amber-300">Due Soon</Badge>
  return <Badge className="bg-emerald-600/80 text-white">On Track</Badge>
}
