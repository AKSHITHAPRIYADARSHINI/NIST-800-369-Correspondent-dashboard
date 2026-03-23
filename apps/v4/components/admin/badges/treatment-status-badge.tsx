import type { TreatmentStatus } from "@/lib/mock-data/admin-risk-register"
import { Badge } from "@/registry/new-york-v4/ui/badge"

export function TreatmentStatusBadge({ status }: { status: TreatmentStatus }) {
  if (status === "Closed") return <Badge className="bg-emerald-600/80 text-white">Closed</Badge>
  if (status === "Ready for Review") return <Badge className="bg-blue-600/80 text-white">Ready for Review</Badge>
  if (status === "Under Treatment") return <Badge variant="outline" className="border-amber-400/60 text-amber-300">Under Treatment</Badge>
  if (status === "Assessing") return <Badge variant="outline">Assessing</Badge>
  if (status === "Monitoring") return <Badge variant="outline">Monitoring</Badge>
  return <Badge variant="secondary">Identified</Badge>
}
