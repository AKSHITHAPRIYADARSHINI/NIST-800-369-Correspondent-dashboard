import type { ReactNode } from "react"

import { Badge } from "@/registry/new-york-v4/ui/badge"
import {
  type IncidentItem,
  type PolicyFileItem,
} from "@/components/dashboard/data"

export function severityBadge(severity: IncidentItem["severity"]) {
  if (severity === "Critical") {
    return <Badge variant="destructive">Critical</Badge>
  }

  if (severity === "High") {
    return <Badge className="bg-amber-500 text-black">High</Badge>
  }

  if (severity === "Medium") {
    return (
      <Badge variant="outline" className="text-amber-600">
        Medium
      </Badge>
    )
  }

  return <Badge variant="secondary">Low</Badge>
}

export function incidentStatusBadge(status: IncidentItem["status"]) {
  if (status === "Active Now") {
    return <Badge variant="destructive">Active now</Badge>
  }

  if (status === "Under Review") {
    return (
      <Badge variant="outline" className="text-amber-600">
        Under review
      </Badge>
    )
  }

  return <Badge variant="secondary">Scheduled follow-up</Badge>
}

export function fileStatusBadge(status: PolicyFileItem["status"]) {
  switch (status) {
    case "Uploaded":
      return <Badge variant="outline">Uploaded</Badge>
    case "Pending Admin Review":
      return (
        <Badge variant="outline" className="text-amber-600">
          Pending Admin Review
        </Badge>
      )
    case "Verified":
      return <Badge variant="secondary">Verified</Badge>
    case "Implemented":
      return <Badge className="bg-emerald-600 text-white">Implemented</Badge>
    default:
      return <Badge variant="destructive">Rejected</Badge>
  }
}

export function dashboardSectionContainer(children: ReactNode) {
  return <div className="grid gap-4 px-4 lg:px-6">{children}</div>
}
