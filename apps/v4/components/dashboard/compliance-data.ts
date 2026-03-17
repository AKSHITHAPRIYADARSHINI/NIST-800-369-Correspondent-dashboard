export type ComplianceTrendPoint = {
  date: string
  score: number
}

export type ComplianceDomainScore = {
  domain: string
  score: number
}

export type ComplianceSeverityPoint = {
  severity: "High" | "Medium" | "Low"
  findings: number
  fill: string
}

export type ComplianceAlert = {
  alert: string
  domain: string
  severity: "High" | "Medium" | "Low"
  status: "Active now" | "Under review" | "Scheduled follow-up"
  created: string
}

export type AuditChecklistItem = {
  item: string
  status: "complete" | "warning" | "pending"
}

// TODO(api): replace placeholders below with backend values.
export const compliance_score = 87
export const audit_readiness = 82
export const pending_reviews = 3

export const trend_data: Record<"3m" | "6m" | "1y", ComplianceTrendPoint[]> = {
  "3m": [
    { date: "2026-01-01", score: 79 },
    { date: "2026-02-01", score: 83 },
    { date: "2026-03-01", score: 87 },
  ],
  "6m": [
    { date: "2025-10-01", score: 72 },
    { date: "2025-11-01", score: 74 },
    { date: "2025-12-01", score: 77 },
    { date: "2026-01-01", score: 79 },
    { date: "2026-02-01", score: 83 },
    { date: "2026-03-01", score: 87 },
  ],
  "1y": [
    { date: "2025-04-01", score: 64 },
    { date: "2025-05-01", score: 66 },
    { date: "2025-06-01", score: 68 },
    { date: "2025-07-01", score: 70 },
    { date: "2025-08-01", score: 71 },
    { date: "2025-09-01", score: 72 },
    { date: "2025-10-01", score: 72 },
    { date: "2025-11-01", score: 74 },
    { date: "2025-12-01", score: 77 },
    { date: "2026-01-01", score: 79 },
    { date: "2026-02-01", score: 83 },
    { date: "2026-03-01", score: 87 },
  ],
}

export const domain_scores: ComplianceDomainScore[] = [
  { domain: "Access Control", score: 92 },
  { domain: "Identification & Authentication", score: 88 },
  { domain: "Device Security", score: 73 },
  { domain: "Incident Response", score: 81 },
  { domain: "Audit & Accountability", score: 85 },
  { domain: "Data Protection", score: 90 },
  { domain: "Vendor Security", score: 69 },
  { domain: "Continuous Monitoring", score: 84 },
]

export const findings_by_severity: ComplianceSeverityPoint[] = [
  { severity: "High", findings: 2, fill: "var(--chart-1)" },
  { severity: "Medium", findings: 3, fill: "var(--chart-2)" },
  { severity: "Low", findings: 1, fill: "var(--chart-3)" },
]

export const alerts: ComplianceAlert[] = [
  {
    alert: "MFA disabled for privileged admin",
    domain: "Identification & Authentication",
    severity: "High",
    status: "Active now",
    created: "Mar 16, 2026",
  },
  {
    alert: "Vendor assessment expired",
    domain: "Vendor Security",
    severity: "Medium",
    status: "Under review",
    created: "Mar 15, 2026",
  },
  {
    alert: "3 unmanaged devices detected",
    domain: "Device Security",
    severity: "Medium",
    status: "Active now",
    created: "Mar 15, 2026",
  },
  {
    alert: "Backup verification overdue",
    domain: "Data Protection",
    severity: "Low",
    status: "Scheduled follow-up",
    created: "Mar 14, 2026",
  },
]

export const checklist: AuditChecklistItem[] = [
  { item: "Multi-Factor Authentication Enabled", status: "complete" },
  { item: "Incident Response Plan Updated", status: "complete" },
  { item: "Backup Verification Completed", status: "warning" },
  { item: "Vendor Security Assessment Pending", status: "pending" },
  { item: "Device Inventory Maintained", status: "complete" },
]

