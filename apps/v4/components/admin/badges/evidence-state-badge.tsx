import type { EvidenceState } from "@/lib/mock-data/admin-compliance"
import { Badge } from "@/registry/new-york-v4/ui/badge"

export function EvidenceStateBadge({ state }: { state: EvidenceState }) {
  if (state === "Approved") {
    return <Badge className="bg-emerald-600/80 text-white">Approved</Badge>
  }

  if (state === "Rejected") {
    return <Badge className="bg-red-600/90 text-white">Rejected</Badge>
  }

  if (state === "Under Validation") {
    return <Badge className="bg-blue-600/80 text-white">Under Validation</Badge>
  }

  if (state === "Uploaded") {
    return <Badge variant="outline">Uploaded</Badge>
  }

  return (
    <Badge variant="outline" className="border-amber-400/60 text-amber-300">
      Missing
    </Badge>
  )
}

