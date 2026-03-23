import { Badge } from "@/registry/new-york-v4/ui/badge"

type StatusTone = "safe" | "pending" | "risk" | "critical" | "neutral"

const toneClass: Record<StatusTone, string> = {
  safe: "bg-emerald-600/80 text-white",
  pending: "border-amber-400/60 text-amber-300",
  risk: "border-orange-400/60 text-orange-300",
  critical: "bg-red-600/90 text-white",
  neutral: "border-muted-foreground/40 text-muted-foreground",
}

export function StatusBadge({
  label,
  tone,
}: {
  label: string
  tone: StatusTone
}) {
  if (tone === "neutral") {
    return <Badge variant="outline" className={toneClass.neutral}>{label}</Badge>
  }

  if (tone === "pending" || tone === "risk") {
    return (
      <Badge variant="outline" className={toneClass[tone]}>
        {label}
      </Badge>
    )
  }

  return <Badge className={toneClass[tone]}>{label}</Badge>
}

export function fileStatusTone(status: string): StatusTone {
  if (status === "Approved") return "safe"
  if (status === "Pending Review" || status === "Draft") return "pending"
  if (status === "Needs Update") return "risk"
  if (status === "Expired") return "critical"
  return "neutral"
}

export function policyStatusTone(status: string): StatusTone {
  if (status === "Active") return "safe"
  if (status === "Under Review" || status === "Draft") return "pending"
  if (status === "Overdue") return "critical"
  if (status === "Archived") return "neutral"
  return "neutral"
}

export function reportStatusTone(status: string): StatusTone {
  if (status === "Ready") return "safe"
  if (status === "Pending") return "pending"
  if (status === "Draft") return "risk"
  if (status === "Archived") return "neutral"
  return "neutral"
}

export function auditStatusTone(status: string): StatusTone {
  if (status === "Reviewed") return "safe"
  if (status === "Pending") return "pending"
  if (status === "Flagged") return "critical"
  return "neutral"
}

export function severityTone(severity: string): StatusTone {
  if (severity === "Low") return "safe"
  if (severity === "Medium") return "pending"
  if (severity === "High") return "risk"
  if (severity === "Critical") return "critical"
  return "neutral"
}
