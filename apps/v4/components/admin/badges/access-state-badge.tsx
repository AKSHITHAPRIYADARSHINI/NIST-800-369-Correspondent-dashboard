import type { AccessState } from "@/lib/mock-data/admin-users-access"
import { Badge } from "@/registry/new-york-v4/ui/badge"

export function AccessStateBadge({ state }: { state: AccessState }) {
  if (state === "Revoked") return <Badge className="bg-zinc-600 text-white">Revoked</Badge>
  if (state === "Suspended") return <Badge className="bg-red-700/90 text-white">Suspended</Badge>
  if (state === "Limited") return <Badge variant="outline" className="border-amber-400/60 text-amber-300">Limited</Badge>
  return <Badge className="bg-emerald-600/80 text-white">Active</Badge>
}

