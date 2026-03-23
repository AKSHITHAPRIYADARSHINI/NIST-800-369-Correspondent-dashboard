export type IncidentTrendPoint = {
  date: string
  incidents: number
  range: "7d" | "30d" | "90d"
}

export type SeverityDistributionPoint = {
  severity: "Critical" | "High" | "Medium" | "Low"
  count: number
  fill: string
}

export type IncidentCategoryPoint = {
  category: string
  count: number
}

export type ResponseStatusPoint = {
  period: string
  new: number
  investigating: number
  contained: number
  resolved: number
}

export type IncidentItem = {
  id: string
  incident: string
  category: string
  severity: "Critical" | "High" | "Medium" | "Low"
  status: "New" | "Investigating" | "Contained" | "Resolved" | "Escalated" | "Monitoring" | "Active"
  affectedSystem: string
  reported: string
  owner: string
  leadershipReview: boolean
}

export type WorkflowItem = {
  incident: string
  stage: "Reported" | "Investigating" | "Contained" | "Reviewing" | "Resolved"
  assignedTeam: string
  nextAction: string
}

export type AffectedSystemItem = {
  system: string
  incidents: number
  severitySummary: string
  status: string
}

// TODO(api): connect these placeholders to endpoint payloads.
export const active_incidents = 4
export const high_priority_incidents = 2
export const resolved_incidents = 7
export const pending_leadership_review = 3

export const incident_trend_data: IncidentTrendPoint[] = [
  { date: "2026-03-11", incidents: 1, range: "7d" },
  { date: "2026-03-12", incidents: 0, range: "7d" },
  { date: "2026-03-13", incidents: 1, range: "7d" },
  { date: "2026-03-14", incidents: 1, range: "7d" },
  { date: "2026-03-15", incidents: 0, range: "7d" },
  { date: "2026-03-16", incidents: 2, range: "7d" },
  { date: "2026-03-17", incidents: 1, range: "7d" },

  { date: "2026-02-15", incidents: 2, range: "30d" },
  { date: "2026-02-22", incidents: 4, range: "30d" },
  { date: "2026-03-01", incidents: 3, range: "30d" },
  { date: "2026-03-08", incidents: 5, range: "30d" },

  { date: "2026-01-01", incidents: 2, range: "90d" },
  { date: "2026-01-15", incidents: 4, range: "90d" },
  { date: "2026-02-01", incidents: 3, range: "90d" },
  { date: "2026-02-15", incidents: 5, range: "90d" },
  { date: "2026-03-01", incidents: 4, range: "90d" },
  { date: "2026-03-15", incidents: 3, range: "90d" },
]

export const severity_distribution: SeverityDistributionPoint[] = [
  { severity: "Critical", count: 1, fill: "var(--chart-1)" },
  { severity: "High", count: 2, fill: "var(--chart-2)" },
  { severity: "Medium", count: 4, fill: "var(--chart-3)" },
  { severity: "Low", count: 3, fill: "var(--chart-4)" },
]

export const incident_categories: IncidentCategoryPoint[] = [
  { category: "Unauthorized Access", count: 3 },
  { category: "Device Compromise", count: 2 },
  { category: "Vendor / Platform Issue", count: 1 },
  { category: "Data Protection Concern", count: 2 },
  { category: "Policy Violation", count: 2 },
]

export const response_status_data: ResponseStatusPoint[] = [
  {
    period: "Current",
    new: 2,
    investigating: 3,
    contained: 2,
    resolved: 3,
  },
]

export const incidents: IncidentItem[] = [
  {
    id: "INC-2614",
    incident: "Suspicious admin login",
    category: "Unauthorized Access",
    severity: "High",
    status: "Investigating",
    affectedSystem: "Admin Portal",
    reported: "Mar 16",
    owner: "District Response Team",
    leadershipReview: true,
  },
  {
    id: "INC-2612",
    incident: "Unmanaged tablet detected",
    category: "Device Security",
    severity: "Medium",
    status: "Active",
    affectedSystem: "Student Device Fleet",
    reported: "Mar 15",
    owner: "Campus IT Operations",
    leadershipReview: false,
  },
  {
    id: "INC-2608",
    incident: "Vendor outage",
    category: "Vendor Security",
    severity: "Medium",
    status: "Monitoring",
    affectedSystem: "LMS Platform",
    reported: "Mar 15",
    owner: "Vendor Liaison",
    leadershipReview: false,
  },
  {
    id: "INC-2601",
    incident: "Student data access anomaly",
    category: "Data Protection",
    severity: "High",
    status: "Escalated",
    affectedSystem: "Student Records",
    reported: "Mar 14",
    owner: "Data Governance Team",
    leadershipReview: true,
  },
]

export const workflow_snapshot: WorkflowItem[] = [
  {
    incident: "Suspicious admin login",
    stage: "Investigating",
    assignedTeam: "District Response Team",
    nextAction: "Approve escalation to identity remediation",
  },
  {
    incident: "Student data access anomaly",
    stage: "Reviewing",
    assignedTeam: "Data Governance Team",
    nextAction: "Confirm student data notification pathway",
  },
  {
    incident: "Vendor outage",
    stage: "Contained",
    assignedTeam: "Vendor Liaison",
    nextAction: "Validate service restoration checklist",
  },
  {
    incident: "Unmanaged tablet detected",
    stage: "Reported",
    assignedTeam: "Campus IT Operations",
    nextAction: "Complete endpoint isolation review",
  },
]

export const affected_systems: AffectedSystemItem[] = [
  {
    system: "Admin Portal",
    incidents: 1,
    severitySummary: "High",
    status: "Investigating",
  },
  {
    system: "Student Records System",
    incidents: 1,
    severitySummary: "High",
    status: "Escalated",
  },
  {
    system: "Teacher Device Fleet",
    incidents: 1,
    severitySummary: "Medium",
    status: "Active",
  },
  {
    system: "LMS / EdTech Platform",
    incidents: 1,
    severitySummary: "Medium",
    status: "Monitoring",
  },
  {
    system: "School Camera Network",
    incidents: 0,
    severitySummary: "Low",
    status: "No active incident",
  },
]

export const incident_title = ""
export const incident_category = ""
export const severity = ""
export const affected_system = ""
export const description = ""
export const reported_by = ""
export const reported_at = ""

