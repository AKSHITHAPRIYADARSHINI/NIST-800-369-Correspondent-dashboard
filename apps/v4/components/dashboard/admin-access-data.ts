export type AdminStatusBreakdownItem = {
  label: "Total Admins" | "Active Today" | "Inactive" | "Pending Approval" | "Suspended"
  value: number
}

export type PrivilegedRoleSummaryItem = {
  role: "Security Ops Admin" | "IAM & Policy Admin" | "Support & Operations Admin" | "Temporary Elevated Access"
  count: number
}

export type AdminItem = {
  adminId: string
  fullName: string
  roleType: "Security Ops Admin" | "IAM & Policy Admin" | "Support Admin"
  accessLevel: "Privileged" | "Standard"
  status: "Active" | "Inactive" | "Pending Approval" | "Suspended"
  mfaStatus: "Enabled" | "Pending" | "Disabled"
  lastActive: string
  departmentArea: string
  assignedBy: "Correspondent" | "Principal"
  accessReviewDue: string
  temporaryAccess: boolean
  contact: string
}

export type PendingAccessRequestItem = {
  adminId: string
  name: string
  requestedRole: string
  reason: string
  requestDate: string
  requestedBy: string
}

export type AccessReviewQueueItem = {
  adminId: string
  adminName: string
  role: string
  lastReviewDate: string
  nextReviewDue: string
  reviewStatus: "Due Soon" | "Overdue" | "Scheduled"
}

export type InactiveAdminItem = {
  adminId: string
  adminName: string
  daysInactive: number
  role: string
  accessRiskLevel: "High" | "Medium" | "Low"
  recommendedAction: "Review access" | "Temporary disable" | "Contact admin" | "Confirm leave / absence"
}

export type RecentAdminActivityItem = {
  id: string
  activity: string
  adminName: string
  timestamp: string
}

export type ContactAdminItem = {
  adminName: string
  reason: string
  priority: "High" | "Medium" | "Low"
}

// TODO(api): replace with endpoint values.
export const total_admin_accounts = 18
export const active_admins_today = 12
export const pending_access_requests = 2
export const privileged_accounts = 9
export const inactive_admins = 3
export const expiring_access_grants = 2

export const admin_status_breakdown: AdminStatusBreakdownItem[] = [
  { label: "Total Admins", value: 18 },
  { label: "Active Today", value: 12 },
  { label: "Inactive", value: 3 },
  { label: "Pending Approval", value: 2 },
  { label: "Suspended", value: 1 },
]

export const privileged_role_summary: PrivilegedRoleSummaryItem[] = [
  { role: "Security Ops Admin", count: 4 },
  { role: "IAM & Policy Admin", count: 3 },
  { role: "Support & Operations Admin", count: 5 },
  { role: "Temporary Elevated Access", count: 2 },
]

export const mfa_status = "93%"
export const password_policy_compliance = "16 / 18"
export const access_reviews_completed = "14 / 18"
export const expiring_access = ["ADM-002", "ADM-014"]

export const admins: AdminItem[] = [
  {
    adminId: "ADM-001",
    fullName: "Rachelle Adams",
    roleType: "Security Ops Admin",
    accessLevel: "Privileged",
    status: "Active",
    mfaStatus: "Enabled",
    lastActive: "Mar 16, 9:10 AM",
    departmentArea: "Security",
    assignedBy: "Correspondent",
    accessReviewDue: "Mar 28",
    temporaryAccess: false,
    contact: "r.adams@secured369.edu",
  },
  {
    adminId: "ADM-002",
    fullName: "Shelly Kumar",
    roleType: "IAM & Policy Admin",
    accessLevel: "Privileged",
    status: "Active",
    mfaStatus: "Enabled",
    lastActive: "Mar 16, 8:32 AM",
    departmentArea: "IAM",
    assignedBy: "Principal",
    accessReviewDue: "Mar 25",
    temporaryAccess: true,
    contact: "s.kumar@secured369.edu",
  },
  {
    adminId: "ADM-003",
    fullName: "Daniel Lee",
    roleType: "Support Admin",
    accessLevel: "Standard",
    status: "Inactive",
    mfaStatus: "Enabled",
    lastActive: "Mar 11",
    departmentArea: "Operations",
    assignedBy: "Correspondent",
    accessReviewDue: "Mar 20",
    temporaryAccess: false,
    contact: "d.lee@secured369.edu",
  },
  {
    adminId: "ADM-004",
    fullName: "Emma Davis",
    roleType: "Support Admin",
    accessLevel: "Standard",
    status: "Pending Approval",
    mfaStatus: "Pending",
    lastActive: "Pending",
    departmentArea: "Student Systems",
    assignedBy: "Principal",
    accessReviewDue: "Mar 18",
    temporaryAccess: false,
    contact: "e.davis@secured369.edu",
  },
  {
    adminId: "ADM-005",
    fullName: "Victor Wong",
    roleType: "Security Ops Admin",
    accessLevel: "Privileged",
    status: "Suspended",
    mfaStatus: "Enabled",
    lastActive: "Mar 10",
    departmentArea: "Security",
    assignedBy: "Correspondent",
    accessReviewDue: "Mar 19",
    temporaryAccess: false,
    contact: "v.wong@secured369.edu",
  },
]

export const pending_access_requests_list: PendingAccessRequestItem[] = [
  {
    adminId: "ADM-004",
    name: "Emma Davis",
    requestedRole: "Support Admin",
    reason: "New student systems onboarding",
    requestDate: "Mar 16",
    requestedBy: "Principal",
  },
  {
    adminId: "ADM-014",
    name: "Jordan Hale",
    requestedRole: "IAM & Policy Admin",
    reason: "Policy rollout support",
    requestDate: "Mar 15",
    requestedBy: "Correspondent",
  },
]

export const access_review_queue: AccessReviewQueueItem[] = [
  {
    adminId: "ADM-001",
    adminName: "Rachelle Adams",
    role: "Security Ops Admin",
    lastReviewDate: "Feb 28",
    nextReviewDue: "Mar 28",
    reviewStatus: "Due Soon",
  },
  {
    adminId: "ADM-003",
    adminName: "Daniel Lee",
    role: "Support Admin",
    lastReviewDate: "Feb 14",
    nextReviewDue: "Mar 20",
    reviewStatus: "Overdue",
  },
  {
    adminId: "ADM-002",
    adminName: "Shelly Kumar",
    role: "IAM & Policy Admin",
    lastReviewDate: "Mar 01",
    nextReviewDue: "Mar 25",
    reviewStatus: "Scheduled",
  },
]

export const inactive_admins_list: InactiveAdminItem[] = [
  {
    adminId: "ADM-003",
    adminName: "Daniel Lee",
    daysInactive: 5,
    role: "Support Admin",
    accessRiskLevel: "Medium",
    recommendedAction: "Review access",
  },
  {
    adminId: "ADM-011",
    adminName: "Nora Patel",
    daysInactive: 12,
    role: "Support Admin",
    accessRiskLevel: "High",
    recommendedAction: "Temporary disable",
  },
  {
    adminId: "ADM-013",
    adminName: "Liam Chen",
    daysInactive: 8,
    role: "IAM & Policy Admin",
    accessRiskLevel: "High",
    recommendedAction: "Confirm leave / absence",
  },
]

export const recent_admin_activity: RecentAdminActivityItem[] = [
  {
    id: "ACT-101",
    activity: "Role updated to IAM & Policy Admin",
    adminName: "Shelly Kumar",
    timestamp: "Mar 16, 9:22 AM",
  },
  {
    id: "ACT-102",
    activity: "Temporary access grant requested",
    adminName: "Jordan Hale",
    timestamp: "Mar 16, 8:05 AM",
  },
  {
    id: "ACT-103",
    activity: "MFA verification completed",
    adminName: "Rachelle Adams",
    timestamp: "Mar 15, 4:33 PM",
  },
]

export const contact_admin_list: ContactAdminItem[] = [
  {
    adminName: "Daniel Lee",
    reason: "Inactive account review",
    priority: "Medium",
  },
  {
    adminName: "Nora Patel",
    reason: "Dormant privileged access check",
    priority: "High",
  },
  {
    adminName: "Emma Davis",
    reason: "Pending onboarding follow-up",
    priority: "Low",
  },
]

export const full_name = ""
export const role_type = ""
export const access_level = ""
export const department = ""
export const temporary_access = false
export const start_date = ""
export const end_date = ""
export const notes = ""

