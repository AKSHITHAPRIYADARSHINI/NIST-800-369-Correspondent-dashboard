import { Badge } from "@/registry/new-york-v4/ui/badge"

export function AdminStatusBadge({
  label,
  tone,
}: {
  label: string
  tone:
    | "safe"
    | "info"
    | "warning"
    | "risk"
    | "critical"
    | "neutral"
}) {
  if (tone === "neutral") {
    return (
      <Badge variant="outline" className="border-muted-foreground/40 text-muted-foreground">
        {label}
      </Badge>
    )
  }

  if (tone === "info") {
    return <Badge className="bg-blue-600/80 text-white">{label}</Badge>
  }

  if (tone === "safe") {
    return <Badge className="bg-emerald-600/80 text-white">{label}</Badge>
  }

  if (tone === "warning") {
    return (
      <Badge variant="outline" className="border-amber-400/60 text-amber-300">
        {label}
      </Badge>
    )
  }

  if (tone === "risk") {
    return (
      <Badge variant="outline" className="border-orange-400/60 text-orange-300">
        {label}
      </Badge>
    )
  }

  return <Badge className="bg-red-600/90 text-white">{label}</Badge>
}

export function workflowTone(status: string) {
  if (status === "Resolved") return "safe"
  if (status === "In Progress") return "info"
  if (status === "Pending Review") return "warning"
  if (status === "Escalated") return "critical"
  if (status === "Open") return "risk"
  return "neutral"
}

export function severityTone(level: string) {
  if (level === "Low") return "safe"
  if (level === "Medium") return "warning"
  if (level === "High") return "risk"
  if (level === "Critical") return "critical"
  return "neutral"
}
