export type QueueStatus =
  | "New"
  | "In Review"
  | "Pending Verification"
  | "Assigned"
  | "Waiting Response"
  | "Escalated"
  | "Resolved"

export type RiskLevel = "Low" | "Medium" | "High" | "Critical"
export type DeviceTrust = "Trusted" | "Unverified" | "Risky" | "Blocked"
export type NotificationState =
  | "Not Needed"
  | "Draft Required"
  | "Awaiting Approval"
  | "Ready to Send"
  | "Sent"

export type QueueType =
  | "Access Reviews"
  | "Device Trust"
  | "Suspicious Activity"
  | "Notifications"
  | "Compliance Tasks"

export type OperationsQueueItem = {
  id: string
  type: QueueType
  title: string
  userName: string
  userRole: "Student" | "Teacher" | "Staff" | "Admin" | "Parent"
  sourceModule:
    | "Authentication"
    | "Devices"
    | "Portal"
    | "Files"
    | "Access"
    | "Compliance"
  riskLevel: RiskLevel
  status: QueueStatus
  assignedTo: string
  dueAt: string
  createdAt: string
  deviceName: string
  deviceTrust: DeviceTrust
  notesCount: number
  notificationRequired: NotificationState
  escalationEligible: boolean
  riskRationale: string
}

export type ActivityItem = {
  id: string
  action: string
  detail: string
  actor: string
  at: string
}

export type MyTask = {
  id: string
  title: string
  dueBucket: "Due Now" | "Due Today" | "Overdue" | "Recently Completed"
  completed: boolean
}

export type CommunicationDraft = {
  id: string
  target: "Teacher" | "Leadership" | "Parent"
  title: string
  state: NotificationState
}

export type SuspiciousSession = {
  id: string
  userName: string
  sessionDetail: string
  riskLevel: RiskLevel
  status: QueueStatus
}

export type DeviceTrustReview = {
  id: string
  deviceName: string
  userName: string
  trust: DeviceTrust
  actionNeeded: string
}

export const operationsMetrics = [
  { id: "m1", label: "Open Verifications", count: 29, context: "needs review" },
  { id: "m2", label: "Suspicious Logins", count: 12, context: "new today" },
  { id: "m3", label: "Untrusted Devices", count: 18, context: "in progress" },
  { id: "m4", label: "Tasks Due Today", count: 21, context: "due by 5 PM" },
  { id: "m5", label: "Escalated Cases", count: 5, context: "urgent" },
  { id: "m6", label: "Pending Notifications", count: 9, context: "awaiting approval" },
]

export const operationsQueue: OperationsQueueItem[] = [
  {
    id: "Q-1001",
    type: "Device Trust",
    title: "Student login from unknown Chromebook",
    userName: "Liam Carter",
    userRole: "Student",
    sourceModule: "Authentication",
    riskLevel: "High",
    status: "Pending Verification",
    assignedTo: "A. Singh",
    dueAt: "2026-03-23T15:00:00",
    createdAt: "2026-03-23T10:04:00",
    deviceName: "Chromebook-CM-221",
    deviceTrust: "Unverified",
    notesCount: 2,
    notificationRequired: "Draft Required",
    escalationEligible: true,
    riskRationale: "Location mismatch and first-time device fingerprint.",
  },
  {
    id: "Q-1002",
    type: "Access Reviews",
    title: "Staff account failed MFA verification",
    userName: "Ms. Harper",
    userRole: "Teacher",
    sourceModule: "Authentication",
    riskLevel: "Medium",
    status: "In Review",
    assignedTo: "D. Patel",
    dueAt: "2026-03-23T16:30:00",
    createdAt: "2026-03-23T09:41:00",
    deviceName: "MacBook-HR-14",
    deviceTrust: "Trusted",
    notesCount: 1,
    notificationRequired: "Not Needed",
    escalationEligible: false,
    riskRationale: "Repeated MFA timeout from known trusted device.",
  },
  {
    id: "Q-1003",
    type: "Suspicious Activity",
    title: "Suspicious file upload submitted through school form",
    userName: "Unknown",
    userRole: "Parent",
    sourceModule: "Files",
    riskLevel: "Critical",
    status: "Escalated",
    assignedTo: "A. Singh",
    dueAt: "2026-03-23T13:00:00",
    createdAt: "2026-03-23T08:22:00",
    deviceName: "Web Session",
    deviceTrust: "Blocked",
    notesCount: 6,
    notificationRequired: "Awaiting Approval",
    escalationEligible: true,
    riskRationale: "Malware signature detected in attachment metadata.",
  },
  {
    id: "Q-1004",
    type: "Notifications",
    title: "Parent portal session flagged for device mismatch",
    userName: "Nora Ellis",
    userRole: "Parent",
    sourceModule: "Portal",
    riskLevel: "High",
    status: "Assigned",
    assignedTo: "M. Jordan",
    dueAt: "2026-03-23T17:15:00",
    createdAt: "2026-03-23T11:08:00",
    deviceName: "Android-PX-9",
    deviceTrust: "Risky",
    notesCount: 3,
    notificationRequired: "Ready to Send",
    escalationEligible: true,
    riskRationale: "Session token used across two device IDs in 20 minutes.",
  },
  {
    id: "Q-1005",
    type: "Access Reviews",
    title: "Teacher access request pending approval",
    userName: "Mr. Diaz",
    userRole: "Teacher",
    sourceModule: "Access",
    riskLevel: "Low",
    status: "New",
    assignedTo: "Unassigned",
    dueAt: "2026-03-24T10:00:00",
    createdAt: "2026-03-23T12:01:00",
    deviceName: "Windows-LAB-17",
    deviceTrust: "Trusted",
    notesCount: 0,
    notificationRequired: "Not Needed",
    escalationEligible: false,
    riskRationale: "Routine role request with manager pre-approval.",
  },
  {
    id: "Q-1006",
    type: "Compliance Tasks",
    title: "Remediation evidence missing for endpoint issue",
    userName: "Security Ops",
    userRole: "Admin",
    sourceModule: "Compliance",
    riskLevel: "Medium",
    status: "Waiting Response",
    assignedTo: "D. Patel",
    dueAt: "2026-03-24T14:00:00",
    createdAt: "2026-03-22T16:32:00",
    deviceName: "Endpoint-Pool-E3",
    deviceTrust: "Unverified",
    notesCount: 4,
    notificationRequired: "Draft Required",
    escalationEligible: true,
    riskRationale: "Control evidence not uploaded before SLA checkpoint.",
  },
  {
    id: "Q-1007",
    type: "Device Trust",
    title: "Student account accessed from unmanaged tablet",
    userName: "Ava Reed",
    userRole: "Student",
    sourceModule: "Devices",
    riskLevel: "High",
    status: "Assigned",
    assignedTo: "M. Jordan",
    dueAt: "2026-03-23T18:00:00",
    createdAt: "2026-03-23T12:20:00",
    deviceName: "iPad-Unknown-1",
    deviceTrust: "Risky",
    notesCount: 1,
    notificationRequired: "Draft Required",
    escalationEligible: true,
    riskRationale: "Device not enrolled in district management profile.",
  },
]

export const recentActivity: ActivityItem[] = [
  {
    id: "A-1",
    action: "Unknown device detected",
    detail: "Student account login blocked pending verification.",
    actor: "Auto Monitor",
    at: "8 minutes ago",
  },
  {
    id: "A-2",
    action: "Access changed",
    detail: "Counselor portal permission temporarily elevated.",
    actor: "D. Patel",
    at: "19 minutes ago",
  },
  {
    id: "A-3",
    action: "Teacher notified",
    detail: "MFA reset guidance sent for staff account.",
    actor: "M. Jordan",
    at: "32 minutes ago",
  },
  {
    id: "A-4",
    action: "Parent notification prepared",
    detail: "Draft ready for correspondent approval.",
    actor: "A. Singh",
    at: "1 hour ago",
  },
  {
    id: "A-5",
    action: "Incident escalated",
    detail: "Suspicious upload referred to leadership.",
    actor: "A. Singh",
    at: "1 hour ago",
  },
  {
    id: "A-6",
    action: "Ticket created",
    detail: "Endpoint patch evidence request opened.",
    actor: "Auto Workflow",
    at: "2 hours ago",
  },
]

export const myTasks: MyTask[] = [
  { id: "T-1", title: "Review 3 unverified student devices", dueBucket: "Due Now", completed: false },
  { id: "T-2", title: "Finalize parent portal notification draft", dueBucket: "Due Today", completed: false },
  { id: "T-3", title: "Collect endpoint remediation evidence", dueBucket: "Overdue", completed: false },
  { id: "T-4", title: "Close resolved MFA verification case", dueBucket: "Recently Completed", completed: true },
]

export const communicationDrafts: CommunicationDraft[] = [
  {
    id: "C-1",
    target: "Teacher",
    title: "Staff MFA verification follow-up",
    state: "Ready to Send",
  },
  {
    id: "C-2",
    target: "Leadership",
    title: "Critical suspicious upload escalation",
    state: "Awaiting Approval",
  },
  {
    id: "C-3",
    target: "Parent",
    title: "Untrusted device login advisory",
    state: "Draft Required",
  },
  {
    id: "C-4",
    target: "Parent",
    title: "Student portal session verification",
    state: "Sent",
  },
]

export const suspiciousSessions: SuspiciousSession[] = [
  {
    id: "S-1",
    userName: "Liam Carter",
    sessionDetail: "Login from unknown Chromebook outside usual geofence",
    riskLevel: "High",
    status: "Pending Verification",
  },
  {
    id: "S-2",
    userName: "Nora Ellis",
    sessionDetail: "Parent portal session replay detected",
    riskLevel: "Critical",
    status: "Escalated",
  },
]

export const deviceTrustReviews: DeviceTrustReview[] = [
  {
    id: "D-1",
    deviceName: "Chromebook-CM-221",
    userName: "Liam Carter",
    trust: "Unverified",
    actionNeeded: "Validate district enrollment and run trust check",
  },
  {
    id: "D-2",
    deviceName: "iPad-Unknown-1",
    userName: "Ava Reed",
    trust: "Risky",
    actionNeeded: "Restrict SIS access until verification is complete",
  },
]

export const filterOptions = {
  statuses: [
    "New",
    "In Review",
    "Pending Verification",
    "Assigned",
    "Waiting Response",
    "Escalated",
    "Resolved",
  ] as QueueStatus[],
  risks: ["Low", "Medium", "High", "Critical"] as RiskLevel[],
  roles: ["Student", "Teacher", "Staff", "Admin", "Parent"],
  modules: ["Authentication", "Devices", "Portal", "Files", "Access", "Compliance"],
  assignees: ["A. Singh", "D. Patel", "M. Jordan", "Unassigned"],
}
