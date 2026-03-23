export type Severity = "Low" | "Medium" | "High" | "Critical"
export type WorkflowStatus =
  | "Open"
  | "In Progress"
  | "Pending Review"
  | "Resolved"
  | "Escalated"

export const adminKpis = [
  {
    id: "kpi-1",
    label: "Active Incidents",
    value: "8",
    helper: "2 high priority open",
    badge: "Live",
  },
  {
    id: "kpi-2",
    label: "Open Tickets",
    value: "34",
    helper: "Verification and remediation",
    badge: "Queue",
  },
  {
    id: "kpi-3",
    label: "Risk Score",
    value: "71 / 100",
    helper: "Moderate to elevated",
    badge: "Risk",
  },
  {
    id: "kpi-4",
    label: "Protected Devices",
    value: "2,834 / 3,012",
    helper: "94.1% protected",
    badge: "Coverage",
  },
  {
    id: "kpi-5",
    label: "MFA Coverage",
    value: "92%",
    helper: "Staff and admin accounts",
    badge: "Identity",
  },
  {
    id: "kpi-6",
    label: "Compliance Readiness",
    value: "86%",
    helper: "Evidence completion",
    badge: "NIST 800-369",
  },
]

export const adminTrendData = [
  { day: "Mon", incidents: 11, tickets: 24, risk: 68, compliance: 79, range: "7d" },
  { day: "Tue", incidents: 9, tickets: 27, risk: 70, compliance: 80, range: "7d" },
  { day: "Wed", incidents: 10, tickets: 26, risk: 69, compliance: 82, range: "7d" },
  { day: "Thu", incidents: 8, tickets: 29, risk: 71, compliance: 83, range: "7d" },
  { day: "Fri", incidents: 12, tickets: 31, risk: 73, compliance: 84, range: "7d" },
  { day: "Sat", incidents: 7, tickets: 20, risk: 67, compliance: 85, range: "7d" },
  { day: "Sun", incidents: 8, tickets: 18, risk: 66, compliance: 86, range: "7d" },
  { day: "W1", incidents: 58, tickets: 152, risk: 69, compliance: 77, range: "30d" },
  { day: "W2", incidents: 63, tickets: 164, risk: 71, compliance: 81, range: "30d" },
  { day: "W3", incidents: 49, tickets: 146, risk: 68, compliance: 84, range: "30d" },
  { day: "W4", incidents: 54, tickets: 159, risk: 70, compliance: 86, range: "30d" },
  { day: "Jan", incidents: 238, tickets: 621, risk: 74, compliance: 75, range: "90d" },
  { day: "Feb", incidents: 214, tickets: 590, risk: 71, compliance: 81, range: "90d" },
  { day: "Mar", incidents: 201, tickets: 575, risk: 69, compliance: 86, range: "90d" },
]

export const priorityActions = [
  "3 student logins detected from unknown devices",
  "2 staff accounts missing MFA enrollment",
  "4 devices overdue for critical patching",
  "1 vendor review pending principal approval",
  "2 critical tickets awaiting remediation confirmation",
]

export const deviceSecuritySnapshot = {
  enrolled: 3012,
  protected: 2834,
  vulnerable: 78,
  unmanaged: 52,
  patchOverdue: 121,
  encryptionCoverage: 93,
  recentlyFlagged: 14,
}

export const authAccessSnapshot = {
  failedLogins: 43,
  suspiciousSignIns: 9,
  studentUnknownDeviceLogins: 7,
  staffWithoutMfa: 12,
  privilegedAccessChanges: 3,
}

export const workflowSnapshot = [
  { label: "Open Tickets", count: 34, status: "Open" as WorkflowStatus },
  { label: "In Progress", count: 19, status: "In Progress" as WorkflowStatus },
  { label: "Pending Review", count: 11, status: "Pending Review" as WorkflowStatus },
  { label: "Escalated", count: 5, status: "Escalated" as WorkflowStatus },
  { label: "Overdue", count: 4, status: "Open" as WorkflowStatus },
]

export const complianceExecution = {
  implementedControls: 124,
  needsEvidence: 21,
  reviewDeadlines: 7,
  policyTasks: 14,
  auditReady: 109,
}

export const vendorRisk = {
  activeVendors: 26,
  pendingAssessments: 4,
  elevatedRisk: 3,
  expiredReviews: 2,
  studentDataTouchingSystems: 11,
}

export const policyTasks = {
  draft: 5,
  underReview: 6,
  overdue: 3,
  approvalsNeeded: 4,
  recentlyUpdated: 8,
}

export const securityTimeline = [
  {
    id: "T-1",
    title: "Vulnerable Chromebook detected",
    detail: "Kernel patch missing on East Campus device pool",
    severity: "High" as Severity,
    at: "10 minutes ago",
  },
  {
    id: "T-2",
    title: "Access change recorded",
    detail: "Counselor role elevated for temporary SIS support",
    severity: "Medium" as Severity,
    at: "24 minutes ago",
  },
  {
    id: "T-3",
    title: "Compliance report generated",
    detail: "Weekly evidence packet exported for leadership review",
    severity: "Low" as Severity,
    at: "1 hour ago",
  },
  {
    id: "T-4",
    title: "Policy updated",
    detail: "Student device trust policy moved to review",
    severity: "Medium" as Severity,
    at: "2 hours ago",
  },
  {
    id: "T-5",
    title: "Parent notification prepared",
    detail: "Incident advisory queued for approved release",
    severity: "Low" as Severity,
    at: "3 hours ago",
  },
  {
    id: "T-6",
    title: "Suspicious login flagged",
    detail: "Student account accessed from unrecognized city",
    severity: "Critical" as Severity,
    at: "4 hours ago",
  },
]
