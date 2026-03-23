export type DeviceOwnerRole = "Student" | "Teacher" | "Staff" | "Admin"
export type DeviceType = "Chromebook" | "Windows Laptop" | "MacBook" | "iPad" | "Android Tablet"
export type DeviceTrustState = "Trusted" | "Unverified" | "Risky" | "Restricted" | "Revoked"
export type DeviceRiskLevel = "Low" | "Medium" | "High" | "Critical"
export type DevicePatchStatus = "Current" | "Due Soon" | "Overdue" | "Missing"
export type DeviceManagedState = "Managed" | "Unmanaged" | "Offline"
export type AppRiskStatus = "Safe" | "Vulnerable" | "Malicious" | "Unverified" | "Needs Review"

export type DeviceMetric = {
  id: string
  label: string
  count: number
  context: string
  badge: string
}

export type DeviceItem = {
  id: string
  deviceId: string
  deviceName: string
  ownerName: string
  ownerRole: DeviceOwnerRole
  deviceType: DeviceType
  trustState: DeviceTrustState
  riskLevel: DeviceRiskLevel
  patchStatus: DevicePatchStatus
  encryptionStatus: "Enabled" | "Disabled" | "Unknown"
  lastLoginAt: string
  activeSessionCount: number
  flaggedAppCount: number
  maliciousAppCount: number
  vulnerableAppCount: number
  linkedTicketCount: number
  notesCount: number
  managedState: DeviceManagedState
  status: "Active" | "Inactive"
}

export type DeviceActivityItem = {
  id: string
  message: string
  actor: string
  time: string
}

export type DeviceTaskItem = {
  id: string
  title: string
  dueBucket: "Due Now" | "Due Today" | "Overdue" | "Recently Completed"
  done: boolean
}

export type SessionEvent = {
  id: string
  deviceName: string
  ownerName: string
  event: string
  state: "Normal" | "Suspicious" | "Failed" | "Restricted"
  occurredAt: string
}

export type AppRiskItem = {
  id: string
  appName: string
  deviceId: string
  deviceName: string
  ownerName: string
  riskStatus: AppRiskStatus
  vulnerabilityState: "Patched" | "Patch Available" | "Exploited" | "Unknown"
  verifiedState: "Verified" | "Unverified"
  detectedAt: string
}

export const deviceMetrics: DeviceMetric[] = [
  { id: "active", label: "Active Devices", count: 1284, context: "currently accessing school systems", badge: "live" },
  { id: "untrusted", label: "Untrusted Devices", count: 34, context: "require trust validation", badge: "needs review" },
  { id: "vulnerable", label: "Vulnerable Devices", count: 19, context: "security patch gaps open", badge: "action needed" },
  { id: "malicious", label: "Malicious Application Flags", count: 7, context: "flagged by endpoint controls", badge: "urgent" },
  { id: "patch", label: "Patch Overdue", count: 26, context: "beyond patch policy window", badge: "overdue" },
  { id: "sessions", label: "High-Risk Login Sessions", count: 11, context: "active sessions under review", badge: "monitor" },
]

export const devices: DeviceItem[] = [
  {
    id: "D-1",
    deviceId: "DEV-2041",
    deviceName: "North-Hall-Chromebook-114",
    ownerName: "Liam Carter",
    ownerRole: "Student",
    deviceType: "Chromebook",
    trustState: "Unverified",
    riskLevel: "High",
    patchStatus: "Overdue",
    encryptionStatus: "Enabled",
    lastLoginAt: "2026-03-23 08:12",
    activeSessionCount: 2,
    flaggedAppCount: 2,
    maliciousAppCount: 1,
    vulnerableAppCount: 1,
    linkedTicketCount: 1,
    notesCount: 3,
    managedState: "Managed",
    status: "Active",
  },
  {
    id: "D-2",
    deviceId: "DEV-1189",
    deviceName: "Teacher-Laptop-Math-07",
    ownerName: "Rita Johnson",
    ownerRole: "Teacher",
    deviceType: "Windows Laptop",
    trustState: "Trusted",
    riskLevel: "Medium",
    patchStatus: "Due Soon",
    encryptionStatus: "Enabled",
    lastLoginAt: "2026-03-23 07:58",
    activeSessionCount: 1,
    flaggedAppCount: 1,
    maliciousAppCount: 0,
    vulnerableAppCount: 1,
    linkedTicketCount: 0,
    notesCount: 1,
    managedState: "Managed",
    status: "Active",
  },
  {
    id: "D-3",
    deviceId: "DEV-0872",
    deviceName: "Admin-Endpoint-02",
    ownerName: "Security Admin",
    ownerRole: "Admin",
    deviceType: "MacBook",
    trustState: "Risky",
    riskLevel: "Critical",
    patchStatus: "Missing",
    encryptionStatus: "Enabled",
    lastLoginAt: "2026-03-23 08:24",
    activeSessionCount: 3,
    flaggedAppCount: 4,
    maliciousAppCount: 2,
    vulnerableAppCount: 2,
    linkedTicketCount: 2,
    notesCount: 5,
    managedState: "Managed",
    status: "Active",
  },
  {
    id: "D-4",
    deviceId: "DEV-2250",
    deviceName: "Front-Office-iPad-01",
    ownerName: "Grace Harper",
    ownerRole: "Staff",
    deviceType: "iPad",
    trustState: "Trusted",
    riskLevel: "Low",
    patchStatus: "Current",
    encryptionStatus: "Enabled",
    lastLoginAt: "2026-03-22 16:42",
    activeSessionCount: 0,
    flaggedAppCount: 0,
    maliciousAppCount: 0,
    vulnerableAppCount: 0,
    linkedTicketCount: 0,
    notesCount: 0,
    managedState: "Managed",
    status: "Inactive",
  },
  {
    id: "D-5",
    deviceId: "DEV-1933",
    deviceName: "Parent-Portal-Android-11",
    ownerName: "Parent Session",
    ownerRole: "Staff",
    deviceType: "Android Tablet",
    trustState: "Restricted",
    riskLevel: "High",
    patchStatus: "Overdue",
    encryptionStatus: "Unknown",
    lastLoginAt: "2026-03-23 06:33",
    activeSessionCount: 1,
    flaggedAppCount: 3,
    maliciousAppCount: 0,
    vulnerableAppCount: 2,
    linkedTicketCount: 1,
    notesCount: 2,
    managedState: "Unmanaged",
    status: "Active",
  },
  {
    id: "D-6",
    deviceId: "DEV-3097",
    deviceName: "Science-Lab-Chromebook-41",
    ownerName: "Mia Nguyen",
    ownerRole: "Student",
    deviceType: "Chromebook",
    trustState: "Revoked",
    riskLevel: "Critical",
    patchStatus: "Missing",
    encryptionStatus: "Disabled",
    lastLoginAt: "2026-03-23 05:11",
    activeSessionCount: 0,
    flaggedAppCount: 5,
    maliciousAppCount: 2,
    vulnerableAppCount: 3,
    linkedTicketCount: 3,
    notesCount: 6,
    managedState: "Unmanaged",
    status: "Inactive",
  },
  {
    id: "D-7",
    deviceId: "DEV-3120",
    deviceName: "History-Laptop-03",
    ownerName: "Amelia Brooks",
    ownerRole: "Teacher",
    deviceType: "Windows Laptop",
    trustState: "Trusted",
    riskLevel: "Low",
    patchStatus: "Current",
    encryptionStatus: "Enabled",
    lastLoginAt: "2026-03-23 08:05",
    activeSessionCount: 1,
    flaggedAppCount: 0,
    maliciousAppCount: 0,
    vulnerableAppCount: 0,
    linkedTicketCount: 0,
    notesCount: 1,
    managedState: "Managed",
    status: "Active",
  },
  {
    id: "D-8",
    deviceId: "DEV-3212",
    deviceName: "Counselor-Mac-04",
    ownerName: "Jordan Ellis",
    ownerRole: "Staff",
    deviceType: "MacBook",
    trustState: "Unverified",
    riskLevel: "Medium",
    patchStatus: "Due Soon",
    encryptionStatus: "Enabled",
    lastLoginAt: "2026-03-23 07:35",
    activeSessionCount: 1,
    flaggedAppCount: 1,
    maliciousAppCount: 0,
    vulnerableAppCount: 1,
    linkedTicketCount: 1,
    notesCount: 2,
    managedState: "Managed",
    status: "Active",
  },
]

export const deviceActivity: DeviceActivityItem[] = [
  { id: "DA-1", message: "New student Chromebook detected in Grade 8 network", actor: "Device Monitor", time: "2 minutes ago" },
  { id: "DA-2", message: "Trust state changed to Restricted for Parent-Portal-Android-11", actor: "A. Singh", time: "8 minutes ago" },
  { id: "DA-3", message: "Flagged application observed on Admin-Endpoint-02", actor: "Endpoint Guard", time: "14 minutes ago" },
  { id: "DA-4", message: "Ticket linked to DEV-2041 for patch remediation", actor: "J. Patel", time: "21 minutes ago" },
  { id: "DA-5", message: "Session revoked for Science-Lab-Chromebook-41", actor: "Ops Workflow", time: "37 minutes ago" },
]

export const sessionEvents: SessionEvent[] = [
  {
    id: "SE-1",
    deviceName: "North-Hall-Chromebook-114",
    ownerName: "Liam Carter",
    event: "Repeated login failures on student portal",
    state: "Suspicious",
    occurredAt: "08:12",
  },
  {
    id: "SE-2",
    deviceName: "Teacher-Laptop-Math-07",
    ownerName: "Rita Johnson",
    event: "Successful trusted login and MFA verification",
    state: "Normal",
    occurredAt: "07:58",
  },
  {
    id: "SE-3",
    deviceName: "Admin-Endpoint-02",
    ownerName: "Security Admin",
    event: "Token mismatch on privileged session attempt",
    state: "Suspicious",
    occurredAt: "08:24",
  },
  {
    id: "SE-4",
    deviceName: "Science-Lab-Chromebook-41",
    ownerName: "Mia Nguyen",
    event: "Session access blocked after malicious app detection",
    state: "Restricted",
    occurredAt: "05:11",
  },
  {
    id: "SE-5",
    deviceName: "Parent-Portal-Android-11",
    ownerName: "Parent Session",
    event: "Portal login failed due to trust mismatch",
    state: "Failed",
    occurredAt: "06:33",
  },
]

export const appRiskItems: AppRiskItem[] = [
  {
    id: "AR-1",
    appName: "Classroom Sync Helper",
    deviceId: "DEV-2041",
    deviceName: "North-Hall-Chromebook-114",
    ownerName: "Liam Carter",
    riskStatus: "Vulnerable",
    vulnerabilityState: "Patch Available",
    verifiedState: "Unverified",
    detectedAt: "2026-03-23 07:49",
  },
  {
    id: "AR-2",
    appName: "Remote File Transfer Utility",
    deviceId: "DEV-0872",
    deviceName: "Admin-Endpoint-02",
    ownerName: "Security Admin",
    riskStatus: "Malicious",
    vulnerabilityState: "Exploited",
    verifiedState: "Verified",
    detectedAt: "2026-03-23 08:19",
  },
  {
    id: "AR-3",
    appName: "Portal Companion Extension",
    deviceId: "DEV-1933",
    deviceName: "Parent-Portal-Android-11",
    ownerName: "Parent Session",
    riskStatus: "Needs Review",
    vulnerabilityState: "Unknown",
    verifiedState: "Unverified",
    detectedAt: "2026-03-23 06:30",
  },
  {
    id: "AR-4",
    appName: "Safe Exam Browser",
    deviceId: "DEV-3120",
    deviceName: "History-Laptop-03",
    ownerName: "Amelia Brooks",
    riskStatus: "Safe",
    vulnerabilityState: "Patched",
    verifiedState: "Verified",
    detectedAt: "2026-03-22 18:12",
  },
  {
    id: "AR-5",
    appName: "Unknown APK Side Loader",
    deviceId: "DEV-3097",
    deviceName: "Science-Lab-Chromebook-41",
    ownerName: "Mia Nguyen",
    riskStatus: "Malicious",
    vulnerabilityState: "Exploited",
    verifiedState: "Verified",
    detectedAt: "2026-03-23 05:02",
  },
]

export const deviceTasks: DeviceTaskItem[] = [
  { id: "DT-1", title: "Validate 3 student device trust records", dueBucket: "Due Now", done: false },
  { id: "DT-2", title: "Review teacher laptop patch status", dueBucket: "Due Today", done: false },
  { id: "DT-3", title: "Close overdue endpoint restriction review", dueBucket: "Overdue", done: false },
  { id: "DT-4", title: "Mark admin endpoint verification complete", dueBucket: "Recently Completed", done: true },
]

export const remediationQueue = [
  "3 devices waiting trust validation",
  "2 devices waiting patch review",
  "1 device waiting access review",
  "2 devices pending escalation",
  "4 devices pending closure",
]

export const deviceFilterOptions = {
  roles: ["Student", "Teacher", "Staff", "Admin"] as DeviceOwnerRole[],
  trustStates: ["Trusted", "Unverified", "Risky", "Restricted", "Revoked"] as DeviceTrustState[],
  risks: ["Low", "Medium", "High", "Critical"] as DeviceRiskLevel[],
  patchStates: ["Current", "Due Soon", "Overdue", "Missing"] as DevicePatchStatus[],
  appRisk: ["Safe", "Vulnerable", "Malicious", "Unverified", "Needs Review"] as AppRiskStatus[],
  managedStates: ["Managed", "Unmanaged", "Offline"] as DeviceManagedState[],
}
