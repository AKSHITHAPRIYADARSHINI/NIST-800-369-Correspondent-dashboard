import type { ComplianceStatus } from "@/lib/mock-data/admin-compliance"
import { Badge } from "@/registry/new-york-v4/ui/badge"

export function ComplianceStatusBadge({ status }: { status: ComplianceStatus }) {
  if (status === "Overdue") {
    return <Badge className="bg-red-600/90 text-white">Overdue</Badge>
  }

  if (status === "Complete") {
    return <Badge className="bg-emerald-600/80 text-white">Complete</Badge>
  }

  if (status === "Blocked") {
    return (
      <Badge variant="outline" className="border-orange-400/60 text-orange-300">
        Blocked
      </Badge>
    )
  }

  if (status === "Ready for Approval") {
    return <Badge className="bg-blue-600/80 text-white">Ready for Approval</Badge>
  }

  if (status === "In Review") {
    return <Badge className="bg-violet-600/80 text-white">In Review</Badge>
  }

  if (status === "Pending Evidence") {
    return (
      <Badge variant="outline" className="border-amber-400/60 text-amber-300">
        Pending Evidence
      </Badge>
    )
  }

  if (status === "In Progress") {
    return <Badge variant="outline">In Progress</Badge>
  }

  return <Badge variant="secondary">Not Started</Badge>
}

