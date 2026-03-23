export type IncidentCategory =
  | "SDLC / App Security"
  | "Authentication / Access"
  | "Devices"
  | "Tickets Linked"
  | "Third-Party Vendor"
  | "User Activity"
  | "Policy / Compliance"
  | "General / Other"

export type IncidentStatus =
  | "New"
  | "In Triage"
  | "In Review"
  | "Assigned"
  | "Escalated"
  | "Waiting Response"
  | "Resolved"
  | "Closed"

export type IncidentSeverity = "Low" | "Medium" | "High" | "Critical"
export type SlaState = "On Track" | "Due Soon" | "Overdue" | "Breached"
export type NotificationState =
  | "Not Needed"
  | "Draft Required"
  | "Awaiting Approval"
  | "Ready to Send"
  | "Sent"

export type IncidentQueueItem = {
  id: string
  incidentId: string
  title: string
  category: IncidentCategory
  affectedArea: string
  affectedUser: string
  affectedDevice: string
  affectedApp: string
  affectedVendor: string
  severity: IncidentSeverity
  status: IncidentStatus
  owner: string
  assignedTo: string
  createdAt: string
  dueAt: string
  slaState: SlaState
  linkedTicketCount: number
  notificationRequired: NotificationState
  escalationState: "Eligible" | "Escalated" | "Not Required"
  notesCount: number
  sourceModule: string
}

export type IncidentActivityItem = {
  id: string
  action: string
  detail: string
  actor: string
  at: string
}

export type MyIncidentTask = {
  id: string
  title: string
  dueBucket: "Due Now" | "Due Today" | "Overdue" | "Recently Updated"
  completed: boolean
}

export type IncidentNotification = {
  id: string
  target: "Parent" | "Teacher" | "Leadership"
  title: string
  state: NotificationState
}

export type IncidentCategorySummaryItem = {
  category: IncidentCategory
  total: number
  critical: number
  inReview: number
  linkedRemediation: number
  pendingCommunication: number
}

export type IncidentPlaybookItem = {
  category: IncidentCategory
  steps: string[]
}

export type LinkedTicketItem = {
  id: string
  ticketId: string
  incidentId: string
  status: "Open" | "In Progress" | "Pending Review" | "Closed"
}

export type IncidentTimelineItem = {
  id: string
  incidentId: string
  label: string
  at: string
  by: string
}

export const incidentMetrics = [
  { id: "im-1", label: "Open Incidents", count: 37, context: "needs triage", badge: "new today" },
  { id: "im-2", label: "Critical Incidents", count: 6, context: "urgent", badge: "needs action" },
  { id: "im-3", label: "Assigned to Me", count: 14, context: "active", badge: "in progress" },
  { id: "im-4", label: "Escalated", count: 5, context: "leadership", badge: "awaiting action" },
  { id: "im-5", label: "Pending Review", count: 11, context: "review queue", badge: "in review" },
  { id: "im-6", label: "Linked Tickets", count: 22, context: "workflow", badge: "ticket linked" },
]

export const incidentsQueue: IncidentQueueItem[] = [
  {
    id: "IQ-1",
    incidentId: "INC-2401",
    title: "Unauthorized login pattern detected in student portal",
    category: "Authentication / Access",
    affectedArea: "Student Portal",
    affectedUser: "Liam Carter",
    affectedDevice: "Chromebook-CM-221",
    affectedApp: "Student Portal",
    affectedVendor: "",
    severity: "Critical",
    status: "In Triage",
    owner: "Identity Team",
    assignedTo: "A. Singh",
    createdAt: "2026-03-23T08:12:00",
    dueAt: "2026-03-23T14:00:00",
    slaState: "Due Soon",
    linkedTicketCount: 1,
    notificationRequired: "Draft Required",
    escalationState: "Eligible",
    notesCount: 3,
    sourceModule: "Authentication",
  },
  {
    id: "IQ-2",
    incidentId: "INC-2402",
    title: "Third-party learning platform privacy incident under review",
    category: "Third-Party Vendor",
    affectedArea: "Learning Platform",
    affectedUser: "",
    affectedDevice: "",
    affectedApp: "LearnFlow LMS",
    affectedVendor: "LearnFlow",
    severity: "High",
    status: "Escalated",
    owner: "Vendor Risk Office",
    assignedTo: "D. Patel",
    createdAt: "2026-03-23T07:44:00",
    dueAt: "2026-03-23T16:00:00",
    slaState: "On Track",
    linkedTicketCount: 2,
    notificationRequired: "Awaiting Approval",
    escalationState: "Escalated",
    notesCount: 5,
    sourceModule: "Vendor Monitoring",
  },
  {
    id: "IQ-3",
    incidentId: "INC-2403",
    title: "Unpatched Chromebook flagged in protected device inventory",
    category: "Devices",
    affectedArea: "Endpoint Security",
    affectedUser: "Ava Reed",
    affectedDevice: "Chromebook-EC-88",
    affectedApp: "",
    affectedVendor: "",
    severity: "High",
    status: "Assigned",
    owner: "Endpoint Security",
    assignedTo: "M. Jordan",
    createdAt: "2026-03-23T09:16:00",
    dueAt: "2026-03-23T18:00:00",
    slaState: "On Track",
    linkedTicketCount: 1,
    notificationRequired: "Not Needed",
    escalationState: "Eligible",
    notesCount: 1,
    sourceModule: "Devices",
  },
  {
    id: "IQ-4",
    incidentId: "INC-2404",
    title: "SDLC build pipeline security check failed for school web app",
    category: "SDLC / App Security",
    affectedArea: "App Pipeline",
    affectedUser: "",
    affectedDevice: "",
    affectedApp: "School Web App",
    affectedVendor: "",
    severity: "Medium",
    status: "In Review",
    owner: "AppSec Team",
    assignedTo: "D. Patel",
    createdAt: "2026-03-22T16:18:00",
    dueAt: "2026-03-24T11:00:00",
    slaState: "On Track",
    linkedTicketCount: 3,
    notificationRequired: "Not Needed",
    escalationState: "Not Required",
    notesCount: 4,
    sourceModule: "CI/CD",
  },
  {
    id: "IQ-5",
    incidentId: "INC-2405",
    title: "Suspicious file upload submitted through school form",
    category: "User Activity",
    affectedArea: "Public Forms",
    affectedUser: "Unknown",
    affectedDevice: "Web session",
    affectedApp: "School Website",
    affectedVendor: "",
    severity: "Critical",
    status: "Escalated",
    owner: "Security Operations",
    assignedTo: "A. Singh",
    createdAt: "2026-03-23T06:58:00",
    dueAt: "2026-03-23T13:30:00",
    slaState: "Breached",
    linkedTicketCount: 2,
    notificationRequired: "Awaiting Approval",
    escalationState: "Escalated",
    notesCount: 8,
    sourceModule: "Forms",
  },
  {
    id: "IQ-6",
    incidentId: "INC-2406",
    title: "Policy exception incident pending compliance review",
    category: "Policy / Compliance",
    affectedArea: "Governance",
    affectedUser: "",
    affectedDevice: "",
    affectedApp: "",
    affectedVendor: "",
    severity: "Medium",
    status: "Waiting Response",
    owner: "Compliance Office",
    assignedTo: "Unassigned",
    createdAt: "2026-03-22T15:10:00",
    dueAt: "2026-03-24T09:00:00",
    slaState: "Due Soon",
    linkedTicketCount: 1,
    notificationRequired: "Draft Required",
    escalationState: "Eligible",
    notesCount: 2,
    sourceModule: "Compliance",
  },
  {
    id: "IQ-7",
    incidentId: "INC-2407",
    title: "Ticket-linked endpoint malware follow-up",
    category: "Tickets Linked",
    affectedArea: "Endpoint Remediation",
    affectedUser: "Ms. Harper",
    affectedDevice: "Windows-LAB-17",
    affectedApp: "",
    affectedVendor: "",
    severity: "High",
    status: "Assigned",
    owner: "Endpoint Security",
    assignedTo: "M. Jordan",
    createdAt: "2026-03-23T10:22:00",
    dueAt: "2026-03-23T19:00:00",
    slaState: "On Track",
    linkedTicketCount: 1,
    notificationRequired: "Not Needed",
    escalationState: "Not Required",
    notesCount: 2,
    sourceModule: "Tickets",
  },
  {
    id: "IQ-8",
    incidentId: "INC-2408",
    title: "Access control rule misconfiguration affecting admin panel",
    category: "General / Other",
    affectedArea: "Admin Panel",
    affectedUser: "Security Admin",
    affectedDevice: "",
    affectedApp: "Admin Dashboard",
    affectedVendor: "",
    severity: "Medium",
    status: "New",
    owner: "Platform Security",
    assignedTo: "Unassigned",
    createdAt: "2026-03-23T12:04:00",
    dueAt: "2026-03-24T12:00:00",
    slaState: "On Track",
    linkedTicketCount: 0,
    notificationRequired: "Not Needed",
    escalationState: "Eligible",
    notesCount: 0,
    sourceModule: "Access",
  },
]

export const incidentActivity: IncidentActivityItem[] = [
  { id: "IA-1", action: "incident opened", detail: "Authentication anomaly incident created from SIEM alert.", actor: "Auto Monitor", at: "7 minutes ago" },
  { id: "IA-2", action: "incident reassigned", detail: "Device incident moved to Endpoint Security queue.", actor: "D. Patel", at: "16 minutes ago" },
  { id: "IA-3", action: "note added", detail: "Parent portal token mismatch investigation note saved.", actor: "A. Singh", at: "34 minutes ago" },
  { id: "IA-4", action: "ticket linked", detail: "INC-2407 linked to TCK-9921.", actor: "Workflow Bot", at: "45 minutes ago" },
  { id: "IA-5", action: "leadership escalation triggered", detail: "Critical suspicious upload escalated.", actor: "A. Singh", at: "1 hour ago" },
  { id: "IA-6", action: "incident resolved", detail: "Parent portal token issue mitigated pending review.", actor: "M. Jordan", at: "2 hours ago" },
]

export const myIncidentTasks: MyIncidentTask[] = [
  { id: "MIT-1", title: "Triage critical student portal incident", dueBucket: "Due Now", completed: false },
  { id: "MIT-2", title: "Prepare leadership escalation summary", dueBucket: "Due Today", completed: false },
  { id: "MIT-3", title: "Close overdue ticket-linked malware follow-up", dueBucket: "Overdue", completed: false },
  { id: "MIT-4", title: "Update incident notes for SDLC check failure", dueBucket: "Recently Updated", completed: true },
]

export const incidentNotifications: IncidentNotification[] = [
  { id: "IN-1", target: "Parent", title: "Student portal suspicious access advisory", state: "Draft Required" },
  { id: "IN-2", target: "Teacher", title: "Staff MFA bypass attempt notification", state: "Ready to Send" },
  { id: "IN-3", target: "Leadership", title: "Critical upload incident escalation brief", state: "Awaiting Approval" },
  { id: "IN-4", target: "Parent", title: "Resolved incident follow-up message", state: "Sent" },
]

export const incidentCategorySummary: IncidentCategorySummaryItem[] = [
  { category: "SDLC / App Security", total: 4, critical: 0, inReview: 2, linkedRemediation: 3, pendingCommunication: 1 },
  { category: "Authentication / Access", total: 9, critical: 2, inReview: 3, linkedRemediation: 4, pendingCommunication: 3 },
  { category: "Third-Party Vendor", total: 5, critical: 1, inReview: 1, linkedRemediation: 2, pendingCommunication: 2 },
  { category: "Devices", total: 7, critical: 1, inReview: 2, linkedRemediation: 5, pendingCommunication: 1 },
  { category: "Tickets Linked", total: 6, critical: 1, inReview: 2, linkedRemediation: 6, pendingCommunication: 0 },
  { category: "Policy / Compliance", total: 3, critical: 0, inReview: 1, linkedRemediation: 2, pendingCommunication: 1 },
]

export const incidentPlaybookItems: IncidentPlaybookItem[] = [
  {
    category: "SDLC / App Security",
    steps: [
      "Review failed secure build or deployment checks",
      "Validate code or release exposure",
      "Open linked engineering ticket",
      "Assign remediation owner",
      "Document school app impact",
    ],
  },
  {
    category: "Authentication / Access",
    steps: [
      "Verify account or session legitimacy",
      "Review MFA and trusted device context",
      "Check privileged access implications",
      "Notify stakeholders if threshold met",
    ],
  },
  {
    category: "Devices",
    steps: [
      "Verify asset ownership",
      "Confirm patch, encryption, and trust status",
      "Isolate if needed",
      "Create remediation follow-up task",
    ],
  },
  {
    category: "Third-Party Vendor",
    steps: [
      "Confirm vendor service affected",
      "Assess student data exposure risk",
      "Verify contract and privacy obligations",
      "Escalate leadership if required",
    ],
  },
]

export const linkedTickets: LinkedTicketItem[] = [
  { id: "LT-1", ticketId: "TCK-9921", incidentId: "INC-2407", status: "In Progress" },
  { id: "LT-2", ticketId: "TCK-9913", incidentId: "INC-2405", status: "Pending Review" },
  { id: "LT-3", ticketId: "TCK-9904", incidentId: "INC-2402", status: "Open" },
]

export const incidentTimeline: IncidentTimelineItem[] = [
  { id: "TL-1", incidentId: "INC-2401", label: "detected", at: "08:12 AM", by: "Auto Monitor" },
  { id: "TL-2", incidentId: "INC-2401", label: "triaged", at: "08:28 AM", by: "A. Singh" },
  { id: "TL-3", incidentId: "INC-2401", label: "owner assigned", at: "08:31 AM", by: "A. Singh" },
  { id: "TL-4", incidentId: "INC-2401", label: "communication drafted", at: "09:02 AM", by: "A. Singh" },
  { id: "TL-5", incidentId: "INC-2401", label: "escalated", at: "09:14 AM", by: "D. Patel" },
]

export const incidentFilterOptions = {
  categories: [
    "SDLC / App Security",
    "Authentication / Access",
    "Devices",
    "Tickets Linked",
    "Third-Party Vendor",
    "User Activity",
    "Policy / Compliance",
    "General / Other",
  ] as IncidentCategory[],
  severities: ["Low", "Medium", "High", "Critical"] as IncidentSeverity[],
  statuses: [
    "New",
    "In Triage",
    "In Review",
    "Assigned",
    "Escalated",
    "Waiting Response",
    "Resolved",
    "Closed",
  ] as IncidentStatus[],
  owners: ["Identity Team", "Vendor Risk Office", "Endpoint Security", "AppSec Team", "Security Operations", "Compliance Office", "Platform Security"],
  linkedAreas: ["Users", "Devices", "Applications", "Vendors", "Policies", "Tickets"],
  assignees: ["A. Singh", "D. Patel", "M. Jordan", "Unassigned"],
}
