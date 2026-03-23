import type { IncidentStatus } from "@/lib/mock-data/admin-incidents"
import { Badge } from "@/registry/new-york-v4/ui/badge"

export function IncidentStatusBadge({ status }: { status: IncidentStatus }) {
  if (status === "Escalated") return <Badge className="bg-red-600/90 text-white">Escalated</Badge>
  if (status === "Resolved" || status === "Closed") return <Badge className="bg-emerald-600/80 text-white">{status}</Badge>
  if (status === "In Triage" || status === "In Review") return <Badge className="bg-blue-600/80 text-white">{status}</Badge>
  if (status === "Waiting Response") return <Badge variant="outline" className="border-orange-400/60 text-orange-300">Waiting Response</Badge>
  if (status === "Assigned") return <Badge variant="outline">Assigned</Badge>
  return <Badge variant="secondary">New</Badge>
}
