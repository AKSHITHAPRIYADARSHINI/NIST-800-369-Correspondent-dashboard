import type { AccessReviewStatus } from "@/lib/mock-data/admin-users-access"
import { Badge } from "@/registry/new-york-v4/ui/badge"

export function ReviewStatusBadge({ status }: { status: AccessReviewStatus }) {
  if (status === "Revoked") return <Badge className="bg-zinc-600 text-white">Revoked</Badge>
  if (status === "Revoke Candidate") return <Badge variant="outline" className="border-red-400/60 text-red-300">Revoke Candidate</Badge>
  if (status === "Pending Review") return <Badge variant="outline" className="border-orange-400/60 text-orange-300">Pending Review</Badge>
  if (status === "Pending Approval") return <Badge variant="outline" className="border-amber-400/60 text-amber-300">Pending Approval</Badge>
  return <Badge className="bg-emerald-600/80 text-white">Current</Badge>
}

