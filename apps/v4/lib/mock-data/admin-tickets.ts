export type TicketPriority = "Low" | "Medium" | "High" | "Critical"
export type TicketStatusColumn =
  | "Created"
  | "Escalation"
  | "Review"
  | "Auditing"
  | "Done"

export type TicketCategory =
  | "Access Review"
  | "Authentication / MFA"
  | "Student Device Trust"
  | "Staff Device Security"
  | "Vulnerability Remediation"
  | "Incident Follow-up"
  | "Policy Review"
  | "Compliance Evidence"
  | "SDLC / Application Security"
  | "Third-Party Vendor Review"
  | "Data Protection"
  | "Audit Follow-up"
  | "Notification / Communication"
  | "General Operations"

export type TicketItem = {
  id: string
  ticketNo: string
  title: string
  description: string
  category: TicketCategory
  priority: TicketPriority
  statusColumn: TicketStatusColumn
  raisedBy: string
  assignedTo: string
  dueAt: string
  createdAt: string
  linkedArea: "Users" | "Devices" | "Applications" | "Vendors" | "Policies" | "Compliance"
  linkedUser: string
  linkedDevice: string
  linkedApp: string
  linkedVendor: string
  notesCount: number
  attachmentCount: number
  incidentLinked: boolean
  complianceLinked: boolean
  riskUpdateEligible: boolean
  completed: boolean
}

export type TicketActivityItem = {
  id: string
  action: string
  detail: string
  actor: string
  at: string
}

export type AssignedTicketItem = {
  id: string
  title: string
  dueBucket: "Due Now" | "Due Today" | "Overdue" | "Recently Completed"
  done: boolean
}

export const ticketMetrics = [
  { id: "tm-1", label: "Open Tickets", count: 46, context: "active workflow", badge: "needs triage" },
  { id: "tm-2", label: "Escalated", count: 8, context: "high urgency", badge: "leadership aware" },
  { id: "tm-3", label: "In Review", count: 14, context: "quality checks", badge: "awaiting verification" },
  { id: "tm-4", label: "Awaiting Audit", count: 9, context: "evidence checks", badge: "audit queue" },
  { id: "tm-5", label: "Completed Today", count: 12, context: "closed tasks", badge: "done" },
  { id: "tm-6", label: "Overdue", count: 7, context: "sla breach risk", badge: "urgent" },
]

export const tickets: TicketItem[] = [
  {
    id: "T-1",
    ticketNo: "TCK-2034",
    title: "Student login from untrusted Chromebook",
    description: "Verify device trust and account legitimacy for repeated login anomalies.",
    category: "Student Device Trust",
    priority: "High",
    statusColumn: "Created",
    raisedBy: "Auto Monitor",
    assignedTo: "A. Singh",
    dueAt: "2026-03-24T13:00:00",
    createdAt: "2026-03-23T08:40:00",
    linkedArea: "Devices",
    linkedUser: "Liam Carter",
    linkedDevice: "Chromebook-CM-221",
    linkedApp: "Student Portal",
    linkedVendor: "",
    notesCount: 3,
    attachmentCount: 1,
    incidentLinked: true,
    complianceLinked: false,
    riskUpdateEligible: true,
    completed: false,
  },
  {
    id: "T-2",
    ticketNo: "TCK-2035",
    title: "Teacher MFA bypass attempt follow-up",
    description: "Validate MFA logs and apply conditional access hardening.",
    category: "Authentication / MFA",
    priority: "Critical",
    statusColumn: "Escalation",
    raisedBy: "Security Operations",
    assignedTo: "D. Patel",
    dueAt: "2026-03-23T18:00:00",
    createdAt: "2026-03-23T09:05:00",
    linkedArea: "Users",
    linkedUser: "Ms. Harper",
    linkedDevice: "MacBook-HR-14",
    linkedApp: "Identity Portal",
    linkedVendor: "",
    notesCount: 5,
    attachmentCount: 2,
    incidentLinked: true,
    complianceLinked: true,
    riskUpdateEligible: true,
    completed: false,
  },
  {
    id: "T-3",
    ticketNo: "TCK-2036",
    title: "Vendor privacy package missing annex",
    description: "Obtain and validate third-party student data privacy annex.",
    category: "Third-Party Vendor Review",
    priority: "High",
    statusColumn: "Review",
    raisedBy: "Vendor Risk Office",
    assignedTo: "A. Singh",
    dueAt: "2026-03-25T10:00:00",
    createdAt: "2026-03-22T16:40:00",
    linkedArea: "Vendors",
    linkedUser: "",
    linkedDevice: "",
    linkedApp: "LearnFlow LMS",
    linkedVendor: "LearnFlow",
    notesCount: 4,
    attachmentCount: 3,
    incidentLinked: false,
    complianceLinked: true,
    riskUpdateEligible: true,
    completed: false,
  },
  {
    id: "T-4",
    ticketNo: "TCK-2037",
    title: "SDLC gate failure on parent portal release",
    description: "Review failed secure pipeline checks before production deployment.",
    category: "SDLC / Application Security",
    priority: "Medium",
    statusColumn: "Auditing",
    raisedBy: "AppSec Bot",
    assignedTo: "D. Patel",
    dueAt: "2026-03-26T12:00:00",
    createdAt: "2026-03-22T14:15:00",
    linkedArea: "Applications",
    linkedUser: "",
    linkedDevice: "",
    linkedApp: "Parent Portal",
    linkedVendor: "",
    notesCount: 2,
    attachmentCount: 2,
    incidentLinked: true,
    complianceLinked: true,
    riskUpdateEligible: true,
    completed: false,
  },
  {
    id: "T-5",
    ticketNo: "TCK-2038",
    title: "Endpoint malware remediation evidence uploaded",
    description: "Confirm endpoint remediation and close with audit-ready notes.",
    category: "Vulnerability Remediation",
    priority: "High",
    statusColumn: "Done",
    raisedBy: "Endpoint Security",
    assignedTo: "M. Jordan",
    dueAt: "2026-03-23T15:00:00",
    createdAt: "2026-03-21T11:00:00",
    linkedArea: "Devices",
    linkedUser: "IT Lab",
    linkedDevice: "Windows-LAB-17",
    linkedApp: "",
    linkedVendor: "",
    notesCount: 6,
    attachmentCount: 4,
    incidentLinked: true,
    complianceLinked: true,
    riskUpdateEligible: true,
    completed: true,
  },
  {
    id: "T-6",
    ticketNo: "TCK-2039",
    title: "Privileged access review sign-off",
    description: "Complete access recertification for admin panel users.",
    category: "Access Review",
    priority: "Medium",
    statusColumn: "Created",
    raisedBy: "Compliance Office",
    assignedTo: "Unassigned",
    dueAt: "2026-03-27T17:00:00",
    createdAt: "2026-03-23T12:15:00",
    linkedArea: "Users",
    linkedUser: "Admin Group",
    linkedDevice: "",
    linkedApp: "Admin Dashboard",
    linkedVendor: "",
    notesCount: 1,
    attachmentCount: 0,
    incidentLinked: false,
    complianceLinked: true,
    riskUpdateEligible: false,
    completed: false,
  },
]

export const ticketActivity: TicketActivityItem[] = [
  { id: "TA-1", action: "ticket created", detail: "TCK-2039 opened from compliance queue.", actor: "Compliance Office", at: "11 minutes ago" },
  { id: "TA-2", action: "reassigned", detail: "TCK-2036 moved to Vendor Risk Office.", actor: "A. Singh", at: "26 minutes ago" },
  { id: "TA-3", action: "moved to escalation", detail: "TCK-2035 escalated due to critical auth risk.", actor: "D. Patel", at: "43 minutes ago" },
  { id: "TA-4", action: "review note added", detail: "TCK-2037 evidence update logged.", actor: "D. Patel", at: "1 hour ago" },
  { id: "TA-5", action: "audit completed", detail: "TCK-2038 marked audit complete.", actor: "M. Jordan", at: "2 hours ago" },
  { id: "TA-6", action: "marked done", detail: "TCK-2038 moved to Done.", actor: "M. Jordan", at: "2 hours ago" },
]

export const assignedTickets: AssignedTicketItem[] = [
  { id: "AT-1", title: "TCK-2035 critical auth follow-up", dueBucket: "Due Now", done: false },
  { id: "AT-2", title: "TCK-2036 vendor annex review", dueBucket: "Due Today", done: false },
  { id: "AT-3", title: "TCK-2019 overdue endpoint patch closure", dueBucket: "Overdue", done: false },
  { id: "AT-4", title: "TCK-2038 audit closure", dueBucket: "Recently Completed", done: true },
]

export const riskUpdateReadyItems = [
  "TCK-2038 completed remediation should update endpoint risk score",
  "TCK-2035 escalation may create identity and access risk entry",
  "TCK-2036 unresolved vendor annex gap should create vendor risk",
]

export const ticketFilterOptions = {
  priorities: ["Low", "Medium", "High", "Critical"] as TicketPriority[],
  categories: [
    "Access Review",
    "Authentication / MFA",
    "Student Device Trust",
    "Staff Device Security",
    "Vulnerability Remediation",
    "Incident Follow-up",
    "Policy Review",
    "Compliance Evidence",
    "SDLC / Application Security",
    "Third-Party Vendor Review",
    "Data Protection",
    "Audit Follow-up",
    "Notification / Communication",
    "General Operations",
  ] as TicketCategory[],
  assignees: ["A. Singh", "D. Patel", "M. Jordan", "Unassigned"],
  linkedAreas: ["Users", "Devices", "Applications", "Vendors", "Policies", "Compliance"] as const,
  columns: ["Created", "Escalation", "Review", "Auditing", "Done"] as TicketStatusColumn[],
}
