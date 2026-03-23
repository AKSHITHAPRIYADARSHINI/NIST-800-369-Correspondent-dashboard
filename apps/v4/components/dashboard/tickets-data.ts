export type TicketTrendPoint = {
  date: string
  tickets: number
  range: "7d" | "30d" | "90d"
}

export type StatusDistributionPoint = {
  status: "Open" | "In Progress" | "Pending Review" | "Resolved" | "Escalated"
  count: number
  fill: string
}

export type PriorityDistributionPoint = {
  priority: "Critical" | "High" | "Medium" | "Low"
  count: number
}

export type RiskScoreDistributionPoint = {
  period: string
  highRisk: number
  mediumRisk: number
  lowRisk: number
}

export type TicketItem = {
  id: string
  title: string
  category: string
  priority: "Critical" | "High" | "Medium" | "Low"
  riskScore: number
  status: "Open" | "In Progress" | "Pending Review" | "Resolved" | "Escalated"
  affectedArea: string
  assignedTeam: string
  created: string
  dueDate: string
  leadershipReview: boolean
}

export type LeadershipReviewItem = {
  id: string
  title: string
  reason: string
  priority: "Critical" | "High" | "Medium" | "Low"
  dueDate: string
}

export type TicketEscalationItem = {
  id: string
  category: string
  team: string
  overdue: boolean
}

// TODO(api): connect these placeholders to ticket summary endpoints.
export const open_tickets = 12
export const resolved_tickets = 21
export const pending_review_tickets = 5
export const high_priority_tickets = 4
export const avg_resolution_time = "2.4 days"
export const sla_breaches = 2

export const ticket_trend_data: TicketTrendPoint[] = [
  { date: "2026-03-11", tickets: 2, range: "7d" },
  { date: "2026-03-12", tickets: 1, range: "7d" },
  { date: "2026-03-13", tickets: 2, range: "7d" },
  { date: "2026-03-14", tickets: 1, range: "7d" },
  { date: "2026-03-15", tickets: 3, range: "7d" },
  { date: "2026-03-16", tickets: 2, range: "7d" },
  { date: "2026-03-17", tickets: 1, range: "7d" },

  { date: "2026-02-15", tickets: 8, range: "30d" },
  { date: "2026-02-22", tickets: 12, range: "30d" },
  { date: "2026-03-01", tickets: 10, range: "30d" },
  { date: "2026-03-08", tickets: 14, range: "30d" },

  { date: "2026-01-01", tickets: 7, range: "90d" },
  { date: "2026-01-15", tickets: 9, range: "90d" },
  { date: "2026-02-01", tickets: 8, range: "90d" },
  { date: "2026-02-15", tickets: 12, range: "90d" },
  { date: "2026-03-01", tickets: 10, range: "90d" },
  { date: "2026-03-15", tickets: 14, range: "90d" },
]

export const status_distribution: StatusDistributionPoint[] = [
  { status: "Open", count: 12, fill: "var(--chart-1)" },
  { status: "In Progress", count: 8, fill: "var(--chart-2)" },
  { status: "Pending Review", count: 5, fill: "var(--chart-3)" },
  { status: "Resolved", count: 21, fill: "var(--chart-4)" },
  { status: "Escalated", count: 3, fill: "var(--chart-5)" },
]

export const priority_distribution: PriorityDistributionPoint[] = [
  { priority: "Critical", count: 2 },
  { priority: "High", count: 5 },
  { priority: "Medium", count: 11 },
  { priority: "Low", count: 9 },
]

export const risk_score_distribution: RiskScoreDistributionPoint[] = [
  {
    period: "Current",
    highRisk: 4,
    mediumRisk: 9,
    lowRisk: 14,
  },
]

export const tickets: TicketItem[] = [
  {
    id: "TKT-00124",
    title: "MFA enrollment delay",
    category: "Access Control",
    priority: "High",
    riskScore: 82,
    status: "In Progress",
    affectedArea: "Admin Access",
    assignedTeam: "IAM Team",
    created: "Mar 16",
    dueDate: "Mar 18",
    leadershipReview: true,
  },
  {
    id: "TKT-00125",
    title: "Unmanaged device follow-up",
    category: "Device Security",
    priority: "Medium",
    riskScore: 66,
    status: "Open",
    affectedArea: "Endpoint Fleet",
    assignedTeam: "Device Team",
    created: "Mar 15",
    dueDate: "Mar 19",
    leadershipReview: false,
  },
  {
    id: "TKT-00126",
    title: "Vendor assessment reminder",
    category: "Vendor Security",
    priority: "Low",
    riskScore: 41,
    status: "Pending Review",
    affectedArea: "Third-Party Governance",
    assignedTeam: "Compliance Team",
    created: "Mar 14",
    dueDate: "Mar 20",
    leadershipReview: true,
  },
  {
    id: "TKT-00127",
    title: "Student record access review",
    category: "Data Protection",
    priority: "High",
    riskScore: 88,
    status: "Escalated",
    affectedArea: "Student Records",
    assignedTeam: "Security Ops",
    created: "Mar 14",
    dueDate: "Mar 17",
    leadershipReview: true,
  },
  {
    id: "TKT-00128",
    title: "Firewall policy exception request",
    category: "Continuous Monitoring",
    priority: "Critical",
    riskScore: 91,
    status: "Open",
    affectedArea: "Network Edge",
    assignedTeam: "Network Security",
    created: "Mar 13",
    dueDate: "Mar 17",
    leadershipReview: true,
  },
  {
    id: "TKT-00129",
    title: "Camera network patch verification",
    category: "Device / Endpoint Security",
    priority: "Medium",
    riskScore: 58,
    status: "Resolved",
    affectedArea: "School Camera Network",
    assignedTeam: "Infrastructure Team",
    created: "Mar 12",
    dueDate: "Mar 16",
    leadershipReview: false,
  },
]

export const leadership_review_queue: LeadershipReviewItem[] = [
  {
    id: "TKT-00124",
    title: "MFA enrollment delay",
    reason: "Policy exception required",
    priority: "High",
    dueDate: "Mar 18",
  },
  {
    id: "TKT-00127",
    title: "Student record access review",
    reason: "Student-data-related issue",
    priority: "High",
    dueDate: "Mar 17",
  },
  {
    id: "TKT-00128",
    title: "Firewall policy exception request",
    reason: "Overdue security remediation",
    priority: "Critical",
    dueDate: "Mar 17",
  },
]

export const ticket_escalations: TicketEscalationItem[] = [
  {
    id: "TKT-00127",
    category: "Data Protection",
    team: "Security Ops",
    overdue: false,
  },
  {
    id: "TKT-00128",
    category: "Access Control",
    team: "Network Security",
    overdue: true,
  },
  {
    id: "TKT-00124",
    category: "Access Control",
    team: "IAM Team",
    overdue: false,
  },
]

export const ticket_title = ""
export const category = ""
export const priority = ""
export const risk_score = 0
export const affected_area = ""
export const description = ""
export const created_by = ""
export const due_date = ""

