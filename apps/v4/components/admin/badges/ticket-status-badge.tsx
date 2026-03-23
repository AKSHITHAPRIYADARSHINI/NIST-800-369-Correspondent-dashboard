import type { TicketStatusColumn } from "@/lib/mock-data/admin-tickets"
import { Badge } from "@/registry/new-york-v4/ui/badge"

export function TicketStatusBadge({ status }: { status: TicketStatusColumn }) {
  if (status === "Done") return <Badge className="bg-emerald-600/80 text-white">Done</Badge>
  if (status === "Escalation") return <Badge className="bg-red-600/90 text-white">Escalation</Badge>
  if (status === "Review") return <Badge className="bg-blue-600/80 text-white">Review</Badge>
  if (status === "Auditing") return <Badge variant="outline" className="border-amber-400/60 text-amber-300">Auditing</Badge>
  return <Badge variant="outline">Created</Badge>
}
