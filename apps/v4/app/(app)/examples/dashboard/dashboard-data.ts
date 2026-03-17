export type ExecutiveCardStatus =
  | "secure"
  | "warning"
  | "critical"
  | "improving"
  | "stable"

export type ExecutiveCard = {
  title: string
  value: string
  supportingLabel: string
  indicatorLabel: string
  status: ExecutiveCardStatus
}

export type SecurityPosturePoint = {
  date: string
  securityScore: number
  compliance: number
  activeIncidents: number
}

export type IncidentItem = {
  id: string
  title: string
  severity: "Low" | "Medium" | "High" | "Critical"
  status: "Active Now" | "Under Review" | "Scheduled Follow-up"
  assignedAdmin: string
  lastUpdated: string
  contactAction: "Email Admin" | "Contact Admin" | "Escalate"
}

export type IncidentTimelineItem = {
  id: string
  reportDate: string
  incident: string
  currentStatus: string
  assignedOwner: string
  nextReviewDate: string
  escalationDueDate: string
  expectedResolution: string
}

export type PolicyFileItem = {
  id: string
  fileName: string
  status:
    | "Uploaded"
    | "Pending Admin Review"
    | "Verified"
    | "Implemented"
    | "Rejected"
  uploadedBy: string
  uploadedDate: string
  adminVerificationStatus: string
  accessedBy: string
  lastAccessedDate: string
  verificationOwner: string
}

export const dashboardMeta = {
  pageTitle: "Security Leadership Dashboard",
  subtitle:
    "Real-time oversight for school cybersecurity, compliance, incidents, and governance",
  schoolUnit: "Greenfield Unified School District - North Campus",
  lastUpdated: "March 16, 2026, 9:42 AM CT",
}

export const executiveCards: ExecutiveCard[] = [
  {
    title: "Overall Security Score",
    value: "91/100",
    supportingLabel: "Improved from last review",
    indicatorLabel: "improving +3.2%",
    status: "improving",
  },
  {
    title: "Compliance Status",
    value: "87%",
    supportingLabel: "Aligned with required controls",
    indicatorLabel: "stable across NIST 800-369 domains",
    status: "stable",
  },
  {
    title: "Active Incidents",
    value: "4",
    supportingLabel: "2 high-priority incidents open",
    indicatorLabel: "critical attention needed",
    status: "critical",
  },
  {
    title: "Open Tickets",
    value: "12",
    supportingLabel: "Pending verification workflows",
    indicatorLabel: "warning review backlog",
    status: "warning",
  },
  {
    title: "MFA Adoption",
    value: "93%",
    supportingLabel: "Staff authentication coverage",
    indicatorLabel: "secure with 7-day checkpoint passed",
    status: "secure",
  },
  {
    title: "Protected Devices",
    value: "214 / 236",
    supportingLabel: "Devices currently secured",
    indicatorLabel: "improving +9 devices this week",
    status: "improving",
  },
]

export const securityPostureData: SecurityPosturePoint[] = [
  { date: "2026-02-15", securityScore: 83, compliance: 78, activeIncidents: 8 },
  { date: "2026-02-18", securityScore: 84, compliance: 79, activeIncidents: 7 },
  { date: "2026-02-21", securityScore: 85, compliance: 80, activeIncidents: 6 },
  { date: "2026-02-24", securityScore: 87, compliance: 82, activeIncidents: 6 },
  { date: "2026-02-27", securityScore: 88, compliance: 83, activeIncidents: 5 },
  { date: "2026-03-01", securityScore: 89, compliance: 84, activeIncidents: 5 },
  { date: "2026-03-04", securityScore: 90, compliance: 85, activeIncidents: 5 },
  { date: "2026-03-07", securityScore: 90, compliance: 86, activeIncidents: 4 },
  { date: "2026-03-10", securityScore: 91, compliance: 86, activeIncidents: 4 },
  { date: "2026-03-13", securityScore: 91, compliance: 87, activeIncidents: 4 },
  { date: "2026-03-16", securityScore: 91, compliance: 87, activeIncidents: 4 },
]

export const recentIncidents: IncidentItem[] = [
  {
    id: "INC-2407",
    title: "Phishing campaign targeting gradebook credentials",
    severity: "Critical",
    status: "Active Now",
    assignedAdmin: "Avery Patel",
    lastUpdated: "16 minutes ago",
    contactAction: "Escalate",
  },
  {
    id: "INC-2404",
    title: "Unapproved USB access on admin office workstation",
    severity: "High",
    status: "Under Review",
    assignedAdmin: "Morgan Lee",
    lastUpdated: "42 minutes ago",
    contactAction: "Contact Admin",
  },
  {
    id: "INC-2398",
    title: "MFA recovery lockouts for substitute teacher accounts",
    severity: "Medium",
    status: "Scheduled Follow-up",
    assignedAdmin: "Jordan Kim",
    lastUpdated: "1 hour ago",
    contactAction: "Email Admin",
  },
  {
    id: "INC-2389",
    title: "Firewall rule drift detected in library VLAN",
    severity: "High",
    status: "Under Review",
    assignedAdmin: "Riley Gomez",
    lastUpdated: "2 hours ago",
    contactAction: "Contact Admin",
  },
]

export const incidentTimeline: IncidentTimelineItem[] = [
  {
    id: "TL-601",
    reportDate: "Mar 12, 2026",
    incident: "District SIS credential stuffing attempt",
    currentStatus: "Containment Complete",
    assignedOwner: "Avery Patel",
    nextReviewDate: "Mar 17, 2026",
    escalationDueDate: "Mar 18, 2026",
    expectedResolution: "Mar 20, 2026",
  },
  {
    id: "TL-602",
    reportDate: "Mar 13, 2026",
    incident: "Parent portal suspicious API token usage",
    currentStatus: "Forensic Review",
    assignedOwner: "Morgan Lee",
    nextReviewDate: "Mar 18, 2026",
    escalationDueDate: "Mar 19, 2026",
    expectedResolution: "Mar 22, 2026",
  },
  {
    id: "TL-603",
    reportDate: "Mar 14, 2026",
    incident: "Antivirus definition lag on science lab devices",
    currentStatus: "Patch Deployment",
    assignedOwner: "Jordan Kim",
    nextReviewDate: "Mar 16, 2026",
    escalationDueDate: "Mar 17, 2026",
    expectedResolution: "Mar 18, 2026",
  },
]

export const policyFiles: PolicyFileItem[] = [
  {
    id: "FILE-1102",
    fileName: "district-password-policy-q2.csv",
    status: "Pending Admin Review",
    uploadedBy: "Principal - N. Campus",
    uploadedDate: "Mar 16, 2026",
    adminVerificationStatus: "Awaiting security admin validation",
    accessedBy: "Avery Patel",
    lastAccessedDate: "Mar 16, 2026",
    verificationOwner: "Avery Patel",
  },
  {
    id: "FILE-1095",
    fileName: "mfa-recovery-procedure-update.csv",
    status: "Verified",
    uploadedBy: "Correspondent - District Office",
    uploadedDate: "Mar 14, 2026",
    adminVerificationStatus: "Verified for implementation",
    accessedBy: "Jordan Kim",
    lastAccessedDate: "Mar 15, 2026",
    verificationOwner: "Jordan Kim",
  },
  {
    id: "FILE-1088",
    fileName: "incident-escalation-matrix.csv",
    status: "Implemented",
    uploadedBy: "Principal - N. Campus",
    uploadedDate: "Mar 11, 2026",
    adminVerificationStatus: "Applied in response workflow",
    accessedBy: "Riley Gomez",
    lastAccessedDate: "Mar 16, 2026",
    verificationOwner: "Riley Gomez",
  },
  {
    id: "FILE-1082",
    fileName: "legacy-network-policy.csv",
    status: "Rejected",
    uploadedBy: "Correspondent - District Office",
    uploadedDate: "Mar 9, 2026",
    adminVerificationStatus: "Rejected - missing control mapping",
    accessedBy: "Morgan Lee",
    lastAccessedDate: "Mar 10, 2026",
    verificationOwner: "Morgan Lee",
  },
]

export const quickActions = [
  { title: "Send Immediate Alert", description: "Notify school leadership now." },
  {
    title: "Contact Security Admin",
    description: "Open direct admin coordination channel.",
  },
  {
    title: "Escalate Active Incident",
    description: "Route to district escalation workflow.",
  },
  {
    title: "Upload Governance CSV",
    description: "Submit policy file for admin verification.",
  },
  {
    title: "Review Compliance",
    description: "Check NIST 800-369 control alignment.",
  },
  { title: "Open Settings", description: "Manage profile, MFA, and alerts." },
]
