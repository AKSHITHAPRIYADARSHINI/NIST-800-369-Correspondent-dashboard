import type { DeviceTrustState } from "@/lib/mock-data/admin-devices"
import type { DeviceTrust as OperationsDeviceTrust } from "@/lib/mock-data/security-operations"
import { Badge } from "@/registry/new-york-v4/ui/badge"

type Trust = DeviceTrustState | OperationsDeviceTrust

export function DeviceTrustBadge({ trust }: { trust: Trust }) {
  if (trust === "Revoked") return <Badge className="bg-zinc-600 text-white">Revoked</Badge>
  if (trust === "Restricted") return <Badge className="bg-rose-700/90 text-white">Restricted</Badge>
  if (trust === "Blocked") return <Badge className="bg-red-600/90 text-white">Blocked</Badge>
  if (trust === "Risky") return <Badge variant="outline" className="border-orange-400/60 text-orange-300">Risky</Badge>
  if (trust === "Unverified") return <Badge variant="outline" className="border-amber-400/60 text-amber-300">Unverified</Badge>
  return <Badge className="bg-emerald-600/80 text-white">Trusted</Badge>
}
