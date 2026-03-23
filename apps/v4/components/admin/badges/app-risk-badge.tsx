import type { AppRiskStatus } from "@/lib/mock-data/admin-devices"
import { Badge } from "@/registry/new-york-v4/ui/badge"

export function AppRiskBadge({ status }: { status: AppRiskStatus }) {
  if (status === "Malicious") return <Badge className="bg-red-600/90 text-white">Malicious</Badge>
  if (status === "Vulnerable") return <Badge variant="outline" className="border-orange-400/60 text-orange-300">Vulnerable</Badge>
  if (status === "Needs Review") return <Badge variant="outline" className="border-amber-400/60 text-amber-300">Needs Review</Badge>
  if (status === "Unverified") return <Badge variant="outline" className="border-zinc-500/70 text-zinc-200">Unverified</Badge>
  return <Badge className="bg-emerald-600/80 text-white">Safe</Badge>
}

