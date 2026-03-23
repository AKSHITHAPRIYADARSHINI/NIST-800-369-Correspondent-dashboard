export type RiskDomain =
  | "Access Control"
  | "Authentication & Identity"
  | "Student Data Protection"
  | "Device Security"
  | "Incident Response"
  | "Third-Party Vendor Risk"
  | "Secure SDLC"
  | "Application Security"
  | "Audit & Accountability"
  | "Policy / Governance"
  | "Compliance Operations"
  | "Platform / Integration Risk"

export type RiskSource =
  | "Ticket"
  | "Incident"
  | "Compliance Gap"
  | "Vendor Review"
  | "Device Finding"
  | "Access Review"
  | "SDLC Review"
  | "Manual Entry"

export type Likelihood = "Rare" | "Unlikely" | "Possible" | "Likely" | "Almost Certain"
export type RiskImpact = "Low" | "Medium" | "High" | "Critical"
export type OverallRisk = "Low" | "Medium" | "High" | "Critical"

export type TreatmentStatus =
  | "Identified"
  | "Assessing"
  | "Under Treatment"
  | "Monitoring"
  | "Ready for Review"
  | "Closed"

export type RiskItem = {
  id: string
  riskId: string
  title: string
  description: string
  domain: RiskDomain
  source: RiskSource
  likelihood: Likelihood
  impact: RiskImpact
  overallRisk: OverallRisk
  owner: string
  treatmentStatus: TreatmentStatus
  createdAt: string
  reviewDate: string
  linkedTicketCount: number
  linkedIncidentCount: number
  linkedPolicy: string
  linkedControl: string
  notesCount: number
  leadershipReady: boolean
  overdue: boolean
  affectedArea: string
}

export type RiskActivityItem = {
  id: string
  action: string
  detail: string
  actor: string
  at: string
}

export type OwnedRiskItem = {
  id: string
  title: string
  state: "Overdue" | "Due This Week" | "Under Treatment" | "Awaiting Review"
}

export type TicketToRiskItem = {
  id: string
  ticketNo: string
  title: string
  recommendation: "Create new risk entry" | "Update existing risk" | "No risk update needed"
}

export const riskMetrics = [
  { id: "rm-1", label: "Open Risks", count: 42, context: "active register", badge: "open" },
  { id: "rm-2", label: "High / Critical", count: 14, context: "priority", badge: "high impact" },
  { id: "rm-3", label: "Under Treatment", count: 19, context: "mitigation", badge: "in progress" },
  { id: "rm-4", label: "Awaiting Review", count: 8, context: "sign-off", badge: "review queue" },
  { id: "rm-5", label: "Logged from Tickets", count: 17, context: "workflow linkage", badge: "ticket source" },
  { id: "rm-6", label: "Closed This Month", count: 9, context: "completed", badge: "closed" },
]

export const risks: RiskItem[] = [
  {
    id: "R-1",
    riskId: "RISK-1101",
    title: "Repeated student logins from untrusted devices",
    description: "Pattern indicates ongoing trust validation gaps for student endpoints.",
    domain: "Student Data Protection",
    source: "Ticket",
    likelihood: "Likely",
    impact: "High",
    overallRisk: "High",
    owner: "A. Singh",
    treatmentStatus: "Under Treatment",
    createdAt: "2026-03-03",
    reviewDate: "2026-03-28",
    linkedTicketCount: 3,
    linkedIncidentCount: 1,
    linkedPolicy: "Student Device Trust Policy",
    linkedControl: "DP-04",
    notesCount: 5,
    leadershipReady: false,
    overdue: false,
    affectedArea: "Student Portal",
  },
  {
    id: "R-2",
    riskId: "RISK-1102",
    title: "Incomplete MFA enforcement for staff accounts",
    description: "MFA exceptions increase identity takeover risk for teaching staff.",
    domain: "Authentication & Identity",
    source: "Incident",
    likelihood: "Possible",
    impact: "Critical",
    overallRisk: "Critical",
    owner: "D. Patel",
    treatmentStatus: "Assessing",
    createdAt: "2026-03-12",
    reviewDate: "2026-03-24",
    linkedTicketCount: 2,
    linkedIncidentCount: 2,
    linkedPolicy: "Access Governance Policy",
    linkedControl: "AC-02",
    notesCount: 4,
    leadershipReady: true,
    overdue: false,
    affectedArea: "Identity Platform",
  },
  {
    id: "R-3",
    riskId: "RISK-1103",
    title: "Vendor privacy documentation gap for learning platform",
    description: "Missing annexes create uncertainty in student data obligations.",
    domain: "Third-Party Vendor Risk",
    source: "Vendor Review",
    likelihood: "Likely",
    impact: "High",
    overallRisk: "High",
    owner: "A. Singh",
    treatmentStatus: "Ready for Review",
    createdAt: "2026-03-10",
    reviewDate: "2026-03-23",
    linkedTicketCount: 1,
    linkedIncidentCount: 1,
    linkedPolicy: "Vendor Security Policy",
    linkedControl: "TP-02",
    notesCount: 6,
    leadershipReady: true,
    overdue: true,
    affectedArea: "LearnFlow LMS",
  },
  {
    id: "R-4",
    riskId: "RISK-1104",
    title: "Patch delay for school-managed Chromebooks",
    description: "Delayed patch cycles may expose known exploit paths.",
    domain: "Device Security",
    source: "Device Finding",
    likelihood: "Almost Certain",
    impact: "High",
    overallRisk: "Critical",
    owner: "M. Jordan",
    treatmentStatus: "Under Treatment",
    createdAt: "2026-03-08",
    reviewDate: "2026-03-22",
    linkedTicketCount: 4,
    linkedIncidentCount: 1,
    linkedPolicy: "Endpoint Security Standard",
    linkedControl: "DS-07",
    notesCount: 7,
    leadershipReady: true,
    overdue: true,
    affectedArea: "Chromebook Fleet",
  },
  {
    id: "R-5",
    riskId: "RISK-1105",
    title: "SDLC review gap for parent portal release",
    description: "Incomplete secure release checks on parent portal workflow.",
    domain: "Secure SDLC",
    source: "SDLC Review",
    likelihood: "Possible",
    impact: "Medium",
    overallRisk: "Medium",
    owner: "D. Patel",
    treatmentStatus: "Monitoring",
    createdAt: "2026-03-14",
    reviewDate: "2026-04-01",
    linkedTicketCount: 2,
    linkedIncidentCount: 0,
    linkedPolicy: "Secure Release Policy",
    linkedControl: "SDLC-05",
    notesCount: 3,
    leadershipReady: false,
    overdue: false,
    affectedArea: "Parent Portal",
  },
]

export const riskActivity: RiskActivityItem[] = [
  { id: "RA-1", action: "risk created", detail: "RISK-1104 logged from endpoint ticket closure review.", actor: "M. Jordan", at: "12 minutes ago" },
  { id: "RA-2", action: "rating updated", detail: "RISK-1102 elevated to critical impact.", actor: "D. Patel", at: "27 minutes ago" },
  { id: "RA-3", action: "treatment added", detail: "RISK-1101 mitigation checklist updated.", actor: "A. Singh", at: "44 minutes ago" },
  { id: "RA-4", action: "ticket linked", detail: "TCK-2038 linked to RISK-1104.", actor: "Workflow Bot", at: "1 hour ago" },
  { id: "RA-5", action: "review due", detail: "RISK-1103 review deadline reached.", actor: "Risk Monitor", at: "2 hours ago" },
  { id: "RA-6", action: "risk closed", detail: "RISK-1092 moved to closed after treatment validation.", actor: "A. Singh", at: "Yesterday" },
]

export const ownedRisks: OwnedRiskItem[] = [
  { id: "OR-1", title: "RISK-1103 vendor documentation gap", state: "Overdue" },
  { id: "OR-2", title: "RISK-1101 student device trust", state: "Due This Week" },
  { id: "OR-3", title: "RISK-1104 endpoint patch delay", state: "Under Treatment" },
  { id: "OR-4", title: "RISK-1102 MFA enforcement", state: "Awaiting Review" },
]

export const ticketToRiskItems: TicketToRiskItem[] = [
  { id: "TR-1", ticketNo: "TCK-2038", title: "Endpoint malware remediation complete", recommendation: "Update existing risk" },
  { id: "TR-2", ticketNo: "TCK-2036", title: "Vendor privacy annex unresolved", recommendation: "Create new risk entry" },
  { id: "TR-3", ticketNo: "TCK-2039", title: "Routine access recertification", recommendation: "No risk update needed" },
]

export const riskFilterOptions = {
  domains: [
    "Access Control",
    "Authentication & Identity",
    "Student Data Protection",
    "Device Security",
    "Incident Response",
    "Third-Party Vendor Risk",
    "Secure SDLC",
    "Application Security",
    "Audit & Accountability",
    "Policy / Governance",
    "Compliance Operations",
    "Platform / Integration Risk",
  ] as RiskDomain[],
  sources: ["Ticket", "Incident", "Compliance Gap", "Vendor Review", "Device Finding", "Access Review", "SDLC Review", "Manual Entry"] as RiskSource[],
  likelihoods: ["Rare", "Unlikely", "Possible", "Likely", "Almost Certain"] as Likelihood[],
  impacts: ["Low", "Medium", "High", "Critical"] as RiskImpact[],
  treatment: ["Identified", "Assessing", "Under Treatment", "Monitoring", "Ready for Review", "Closed"] as TreatmentStatus[],
  owners: ["A. Singh", "D. Patel", "M. Jordan"],
}
