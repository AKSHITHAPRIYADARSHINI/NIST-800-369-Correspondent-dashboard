export type UserRole = "Student" | "Parent" | "Teacher" | "Staff" | "Admin" | "Leadership"
export type AccessScope =
  | "Security Metrics Dashboard"
  | "Parent Dashboard"
  | "Teacher Tools"
  | "Admin Operations"
  | "Compliance Review"
  | "Incident Review"
  | "Device Oversight"
export type AccessRiskState = "Normal" | "Needs Review" | "High Risk" | "Restricted"
export type AccessReviewStatus = "Current" | "Pending Approval" | "Pending Review" | "Revoke Candidate" | "Revoked"
export type AccessState = "Active" | "Limited" | "Suspended" | "Revoked"

export type AccessMetric = {
  id: string
  label: string
  count: number
  context: string
  badge: string
}

export type UserAccessItem = {
  id: string
  userId: string
  name: string
  email: string
  role: UserRole
  accessScope: AccessScope
  grantedBy: string
  approvalSource: string
  approvalChain: string
  riskState: AccessRiskState
  reviewStatus: AccessReviewStatus
  accessState: AccessState
  lastActiveAt: string
  linkedPolicy: string
  linkedIamRole: string
  revokeEligible: boolean
  notesCount: number
  status: "Active" | "Inactive"
}

export type AccessActivityItem = {
  id: string
  message: string
  actor: string
  time: string
}

export type AccessTaskItem = {
  id: string
  title: string
  bucket: "Due Now" | "Due Today" | "Overdue" | "Recently Completed"
  done: boolean
}

export type ApprovalChainItem = {
  id: string
  title: string
  state: "Healthy" | "Needs Review" | "Pending"
  detail: string
}

export type RevocationCandidate = {
  id: string
  user: string
  reason: string
  riskState: AccessRiskState
}

export const accessMetrics: AccessMetric[] = [
  { id: "users", label: "Total Active Users", count: 2478, context: "active accounts across school systems", badge: "live" },
  { id: "teachers", label: "Teachers with Dashboard Access", count: 214, context: "granted by correspondent or head of school", badge: "tracked" },
  { id: "parents", label: "Parent Access Enabled", count: 861, context: "teacher-linked parent dashboard access", badge: "approved" },
  { id: "reviews", label: "Pending Access Reviews", count: 39, context: "awaiting admin verification", badge: "needs action" },
  { id: "revocations", label: "Revocations Due", count: 12, context: "inactive or no-longer-needed access", badge: "due" },
  { id: "risk", label: "High-Risk Accounts", count: 8, context: "manual review and follow-up required", badge: "urgent" },
]

export const usersAccess: UserAccessItem[] = [
  {
    id: "UA-1",
    userId: "USR-00129",
    name: "Ava Thompson",
    email: "ava.thompson@northk12.edu",
    role: "Teacher",
    accessScope: "Teacher Tools",
    grantedBy: "Correspondent Office",
    approvalSource: "Leadership Approval",
    approvalChain: "Teacher access granted by correspondent and logged by admin",
    riskState: "Normal",
    reviewStatus: "Current",
    accessState: "Active",
    lastActiveAt: "2026-03-23 08:11",
    linkedPolicy: "POL-ACCESS-04",
    linkedIamRole: "ROLE_TEACHER_TOOLS",
    revokeEligible: false,
    notesCount: 1,
    status: "Active",
  },
  {
    id: "UA-2",
    userId: "USR-00477",
    name: "Mason Rivera",
    email: "mason.rivera.parent@northk12.edu",
    role: "Parent",
    accessScope: "Parent Dashboard",
    grantedBy: "Teacher - Ava Thompson",
    approvalSource: "Teacher Workflow",
    approvalChain: "Parent access granted by teacher and verified by admin",
    riskState: "Needs Review",
    reviewStatus: "Pending Review",
    accessState: "Limited",
    lastActiveAt: "2026-03-23 06:42",
    linkedPolicy: "POL-PARENT-ACCESS-02",
    linkedIamRole: "ROLE_PARENT_DASHBOARD",
    revokeEligible: true,
    notesCount: 3,
    status: "Active",
  },
  {
    id: "UA-3",
    userId: "USR-00015",
    name: "Security Admin",
    email: "admin.ops@secured369.edu",
    role: "Admin",
    accessScope: "Admin Operations",
    grantedBy: "Leadership",
    approvalSource: "Leadership Approval",
    approvalChain: "Admin role assigned by leadership with periodic review",
    riskState: "High Risk",
    reviewStatus: "Pending Review",
    accessState: "Active",
    lastActiveAt: "2026-03-23 08:25",
    linkedPolicy: "POL-PRIV-ACCESS-01",
    linkedIamRole: "ROLE_ADMIN_OPS",
    revokeEligible: false,
    notesCount: 5,
    status: "Active",
  },
  {
    id: "UA-4",
    userId: "USR-00264",
    name: "Noah Patel",
    email: "noah.patel@northk12.edu",
    role: "Student",
    accessScope: "Security Metrics Dashboard",
    grantedBy: "Admin Override",
    approvalSource: "Exception Workflow",
    approvalChain: "Student access exception documented and awaiting closure",
    riskState: "Restricted",
    reviewStatus: "Revoke Candidate",
    accessState: "Suspended",
    lastActiveAt: "2026-03-20 15:33",
    linkedPolicy: "POL-STUDENT-DATA-03",
    linkedIamRole: "ROLE_STUDENT_LIMITED",
    revokeEligible: true,
    notesCount: 4,
    status: "Inactive",
  },
  {
    id: "UA-5",
    userId: "USR-00522",
    name: "Olivia Bennett",
    email: "olivia.bennett@northk12.edu",
    role: "Leadership",
    accessScope: "Compliance Review",
    grantedBy: "Head of School",
    approvalSource: "Leadership Approval",
    approvalChain: "Leadership access approved and tracked for audit readiness",
    riskState: "Normal",
    reviewStatus: "Current",
    accessState: "Active",
    lastActiveAt: "2026-03-22 17:09",
    linkedPolicy: "POL-GOV-07",
    linkedIamRole: "ROLE_LEADERSHIP_COMPLIANCE",
    revokeEligible: false,
    notesCount: 1,
    status: "Active",
  },
  {
    id: "UA-6",
    userId: "USR-00311",
    name: "Ella Brooks",
    email: "ella.brooks.parent@northk12.edu",
    role: "Parent",
    accessScope: "Parent Dashboard",
    grantedBy: "Teacher - Daniel Kim",
    approvalSource: "Teacher Workflow",
    approvalChain: "Parent metrics visibility approved by teacher and logged by admin",
    riskState: "Normal",
    reviewStatus: "Pending Approval",
    accessState: "Limited",
    lastActiveAt: "2026-03-21 20:14",
    linkedPolicy: "POL-PARENT-ACCESS-02",
    linkedIamRole: "ROLE_PARENT_DASHBOARD",
    revokeEligible: false,
    notesCount: 2,
    status: "Active",
  },
  {
    id: "UA-7",
    userId: "USR-00671",
    name: "Daniel Kim",
    email: "daniel.kim@northk12.edu",
    role: "Teacher",
    accessScope: "Incident Review",
    grantedBy: "Head of School",
    approvalSource: "Leadership Approval",
    approvalChain: "Teacher access granted by head of school",
    riskState: "Needs Review",
    reviewStatus: "Pending Review",
    accessState: "Active",
    lastActiveAt: "2026-03-23 07:10",
    linkedPolicy: "POL-INCIDENT-05",
    linkedIamRole: "ROLE_TEACHER_INCIDENT",
    revokeEligible: false,
    notesCount: 2,
    status: "Active",
  },
  {
    id: "UA-8",
    userId: "USR-00720",
    name: "Harper Collins",
    email: "harper.collins@northk12.edu",
    role: "Staff",
    accessScope: "Device Oversight",
    grantedBy: "Admin Ops",
    approvalSource: "Operational Approval",
    approvalChain: "Staff access verified by admin after device ownership validation",
    riskState: "Normal",
    reviewStatus: "Current",
    accessState: "Active",
    lastActiveAt: "2026-03-23 08:02",
    linkedPolicy: "POL-DEVICE-06",
    linkedIamRole: "ROLE_DEVICE_REVIEW",
    revokeEligible: false,
    notesCount: 0,
    status: "Active",
  },
]

export const accessActivity: AccessActivityItem[] = [
  { id: "AA-1", message: "Parent dashboard access granted for Mason Rivera", actor: "Ava Thompson", time: "3 minutes ago" },
  { id: "AA-2", message: "Teacher role scope updated for Incident Review", actor: "Ops Workflow", time: "10 minutes ago" },
  { id: "AA-3", message: "Suspended access for student exception account", actor: "A. Singh", time: "18 minutes ago" },
  { id: "AA-4", message: "IAM policy note added to admin privileged role", actor: "J. Patel", time: "24 minutes ago" },
  { id: "AA-5", message: "Access review completed for leadership compliance scope", actor: "Compliance Ops", time: "41 minutes ago" },
]

export const accessTasks: AccessTaskItem[] = [
  { id: "AT-1", title: "Review 6 pending parent access requests", bucket: "Due Now", done: false },
  { id: "AT-2", title: "Validate leadership approval chain for 2 teacher accounts", bucket: "Due Today", done: false },
  { id: "AT-3", title: "Revoke 3 inactive user accounts", bucket: "Overdue", done: false },
  { id: "AT-4", title: "Close IAM mapping update for compliance role", bucket: "Recently Completed", done: true },
]

export const approvalChainItems: ApprovalChainItem[] = [
  {
    id: "AC-1",
    title: "Teacher grants parent dashboard access",
    state: "Healthy",
    detail: "96% of requests include teacher verification notes.",
  },
  {
    id: "AC-2",
    title: "Correspondent grants teacher-level access",
    state: "Pending",
    detail: "2 role updates awaiting correspondent sign-off.",
  },
  {
    id: "AC-3",
    title: "Head of school grants elevated permissions",
    state: "Needs Review",
    detail: "Quarterly review due for privileged leadership scopes.",
  },
]

export const revocationCandidates: RevocationCandidate[] = [
  { id: "RC-1", user: "Noah Patel", reason: "Student exception access no longer required", riskState: "Restricted" },
  { id: "RC-2", user: "Mason Rivera", reason: "Parent dashboard access pending revalidation", riskState: "Needs Review" },
  { id: "RC-3", user: "Legacy Staff Account", reason: "Inactive for 67 days", riskState: "High Risk" },
]

export const accessFilterOptions = {
  roles: ["Student", "Parent", "Teacher", "Staff", "Admin", "Leadership"] as UserRole[],
  scopes: [
    "Security Metrics Dashboard",
    "Parent Dashboard",
    "Teacher Tools",
    "Admin Operations",
    "Compliance Review",
    "Incident Review",
    "Device Oversight",
  ] as AccessScope[],
  approvalSources: ["Teacher Workflow", "Leadership Approval", "Operational Approval", "Exception Workflow"],
  riskStates: ["Normal", "Needs Review", "High Risk", "Restricted"] as AccessRiskState[],
  reviewStatuses: ["Current", "Pending Approval", "Pending Review", "Revoke Candidate", "Revoked"] as AccessReviewStatus[],
}
