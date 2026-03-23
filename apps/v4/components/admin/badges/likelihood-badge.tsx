import type { Likelihood } from "@/lib/mock-data/admin-risk-register"
import { Badge } from "@/registry/new-york-v4/ui/badge"

export function LikelihoodBadge({ likelihood }: { likelihood: Likelihood }) {
  if (likelihood === "Almost Certain") return <Badge className="bg-red-600/90 text-white">Almost Certain</Badge>
  if (likelihood === "Likely") return <Badge variant="outline" className="border-orange-400/60 text-orange-300">Likely</Badge>
  if (likelihood === "Possible") return <Badge variant="outline" className="border-amber-400/60 text-amber-300">Possible</Badge>
  if (likelihood === "Unlikely") return <Badge variant="outline">Unlikely</Badge>
  return <Badge className="bg-emerald-600/80 text-white">Rare</Badge>
}
