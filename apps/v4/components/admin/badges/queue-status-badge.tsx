import type { QueueStatus } from "@/lib/mock-data/security-operations"
import { Badge } from "@/registry/new-york-v4/ui/badge"

export function QueueStatusBadge({ status }: { status: QueueStatus }) {
  if (status === "Escalated") {
    return <Badge className="bg-red-600/90 text-white">Escalated</Badge>
  }

  if (status === "Resolved") {
    return <Badge className="bg-emerald-600/80 text-white">Resolved</Badge>
  }

  if (status === "Pending Verification") {
    return (
      <Badge variant="outline" className="border-amber-400/60 text-amber-300">
        Pending Verification
      </Badge>
    )
  }

  if (status === "In Review" || status === "Assigned") {
    return <Badge className="bg-blue-600/80 text-white">{status}</Badge>
  }

  if (status === "Waiting Response") {
    return (
      <Badge variant="outline" className="border-orange-400/60 text-orange-300">
        Waiting Response
      </Badge>
    )
  }

  return <Badge variant="outline">New</Badge>
}

