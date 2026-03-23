export type AuditSeverity = "Low" | "Medium" | "High" | "Critical"
export type AuditStatus = "Reviewed" | "Pending" | "Flagged"

export type AuditRecord = {
  id: string
  timestamp: string
  user: string
  role: "Principal" | "Supervisor" | "Compliance Officer" | "IT Admin"
  action:
    | "File Downloaded"
    | "Policy Updated"
    | "Report Generated"
    | "Access Changed"
    | "Review Approved"
    | "Incident Record Viewed"
  module: "Files" | "Policies" | "Reports" | "Access" | "Incidents"
  severity: AuditSeverity
  status: AuditStatus
}

export const auditRecords: AuditRecord[] = [
  {
    id: "A-301",
    timestamp: "2026-03-23T11:48:00",
    user: "Dr. K. Rivera",
    role: "Principal",
    action: "Review Approved",
    module: "Policies",
    severity: "Low",
    status: "Reviewed",
  },
  {
    id: "A-302",
    timestamp: "2026-03-23T10:51:00",
    user: "N. Bailey",
    role: "IT Admin",
    action: "Access Changed",
    module: "Access",
    severity: "High",
    status: "Flagged",
  },
  {
    id: "A-303",
    timestamp: "2026-03-23T09:33:00",
    user: "M. Hawkins",
    role: "Supervisor",
    action: "File Downloaded",
    module: "Files",
    severity: "Medium",
    status: "Pending",
  },
  {
    id: "A-304",
    timestamp: "2026-03-23T08:57:00",
    user: "A. Banerjee",
    role: "Compliance Officer",
    action: "Policy Updated",
    module: "Policies",
    severity: "Medium",
    status: "Reviewed",
  },
  {
    id: "A-305",
    timestamp: "2026-03-22T17:42:00",
    user: "Security Bot",
    role: "IT Admin",
    action: "Report Generated",
    module: "Reports",
    severity: "Low",
    status: "Reviewed",
  },
  {
    id: "A-306",
    timestamp: "2026-03-22T16:06:00",
    user: "J. Allen",
    role: "Supervisor",
    action: "Incident Record Viewed",
    module: "Incidents",
    severity: "Critical",
    status: "Flagged",
  },
]

export const auditTimeline = [
  {
    id: "AT-1",
    title: "High-risk access change detected",
    detail: "Temporary admin access granted outside school hours",
    severity: "High",
    at: "Today, 10:51 AM",
  },
  {
    id: "AT-2",
    title: "Policy review approval logged",
    detail: "Student Data Protection Policy signed",
    severity: "Low",
    at: "Today, 11:48 AM",
  },
  {
    id: "AT-3",
    title: "Critical incident record opened",
    detail: "Incident #INC-1984 accessed for leadership review",
    severity: "Critical",
    at: "Yesterday, 4:06 PM",
  },
]
