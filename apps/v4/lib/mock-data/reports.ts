export type ReportStatus = "Ready" | "Pending" | "Draft" | "Archived"
export type ReportCategory = "Compliance" | "Security" | "Governance"

export type ReportRecord = {
  id: string
  title: string
  category: ReportCategory
  period: string
  generatedAt: string
  generatedBy: string
  format: "PDF" | "CSV"
  status: ReportStatus
  highPriority: boolean
}

export const reportRecords: ReportRecord[] = [
  {
    id: "R-201",
    title: "Compliance Summary Report",
    category: "Compliance",
    period: "Q1 2026",
    generatedAt: "2026-03-19",
    generatedBy: "Governance Bot",
    format: "PDF",
    status: "Ready",
    highPriority: true,
  },
  {
    id: "R-202",
    title: "Incident Summary Report",
    category: "Security",
    period: "Mar 2026",
    generatedAt: "2026-03-21",
    generatedBy: "A. McKenzie",
    format: "PDF",
    status: "Pending",
    highPriority: true,
  },
  {
    id: "R-203",
    title: "Access Review Report",
    category: "Security",
    period: "Mar 2026",
    generatedAt: "2026-03-18",
    generatedBy: "Identity Team",
    format: "CSV",
    status: "Ready",
    highPriority: false,
  },
  {
    id: "R-204",
    title: "Vendor Risk Report",
    category: "Governance",
    period: "Q1 2026",
    generatedAt: "2026-03-12",
    generatedBy: "Procurement Office",
    format: "PDF",
    status: "Draft",
    highPriority: true,
  },
  {
    id: "R-205",
    title: "Audit Readiness Report",
    category: "Compliance",
    period: "Mar 2026",
    generatedAt: "2026-03-22",
    generatedBy: "Governance Bot",
    format: "PDF",
    status: "Ready",
    highPriority: true,
  },
  {
    id: "R-206",
    title: "Security Posture Summary",
    category: "Security",
    period: "Week 12, 2026",
    generatedAt: "2026-03-20",
    generatedBy: "Security Office",
    format: "CSV",
    status: "Archived",
    highPriority: false,
  },
]

export const reportActivity = [
  {
    id: "RA-1",
    title: "Audit Readiness Report generated",
    detail: "Scheduled monthly export completed",
    at: "9 minutes ago",
  },
  {
    id: "RA-2",
    title: "Incident Summary Report pending review",
    detail: "Assigned to Principal",
    at: "31 minutes ago",
  },
  {
    id: "RA-3",
    title: "Vendor Risk Report draft updated",
    detail: "Third-party contract annex added",
    at: "Today, 8:04 AM",
  },
]
