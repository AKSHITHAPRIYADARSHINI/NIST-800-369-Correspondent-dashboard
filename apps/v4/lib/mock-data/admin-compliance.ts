export type ComplianceStatus =
  | "Not Started"
  | "In Progress"
  | "Pending Evidence"
  | "In Review"
  | "Ready for Approval"
  | "Overdue"
  | "Complete"
  | "Blocked"

export type EvidenceState =
  | "Missing"
  | "Uploaded"
  | "Under Validation"
  | "Rejected"
  | "Approved"

export type ImpactLevel = "Low" | "Medium" | "High" | "Critical"

export type ReadinessState =
  | "Not Ready"
  | "Partially Ready"
  | "Ready for Review"
  | "Leadership Ready"

export type ComplianceDomain =
  | "Access Control"
  | "Authentication"
  | "Student Data Protection"
  | "Device Security"
  | "Incident Response"
  | "Third-Party Risk"
  | "Secure SDLC"
  | "Applications"
  | "Policies / Governance"

export type LinkedArea =
  | "Devices"
  | "Users"
  | "Applications"
  | "Vendors"
  | "Policies"
  | "Incidents"

export type ComplianceQueueItem = {
  id: string
  controlId: string
  title: string
  domain: ComplianceDomain
  linkedArea: LinkedArea
  linkedAsset: string
  status: ComplianceStatus
  evidenceState: EvidenceState
  owner: string
  assignedTo: string
  reviewDate: string
  dueAt: string
  riskImpact: ImpactLevel
  notesCount: number
  policyLinked: boolean
  remediationLinked: boolean
  vendorRelated: boolean
  readinessEligible: boolean
}

export type ComplianceActivityItem = {
  id: string
  action: string
  detail: string
  actor: string
  at: string
}

export type MyComplianceTask = {
  id: string
  title: string
  dueBucket: "Due Now" | "Due Today" | "Overdue" | "Recently Completed"
  completed: boolean
}

export type EvidenceItem = {
  id: string
  controlId: string
  title: string
  state: EvidenceState
  updatedAt: string
}

export type DomainCoverageItem = {
  domain: ComplianceDomain
  controlCount: number
  overdue: number
  missingEvidence: number
  inReview: number
}

export type PolicyLinkedControlItem = {
  id: string
  policyName: string
  controlTitle: string
  reviewDate: string
  status: ComplianceStatus
  evidenceMissing: boolean
}

export type VendorComplianceItem = {
  id: string
  vendor: string
  item: string
  status: ComplianceStatus
  evidenceState: EvidenceState
  dueAt: string
}

export const complianceMetrics = [
  { id: "cm-1", label: "Controls In Scope", count: 148, context: "updated today", badge: "in scope" },
  { id: "cm-2", label: "Evidence Missing", count: 19, context: "needs action", badge: "evidence gap" },
  { id: "cm-3", label: "Overdue Reviews", count: 11, context: "urgent follow-up", badge: "overdue" },
  { id: "cm-4", label: "Ready for Leadership Review", count: 26, context: "awaiting sign-off", badge: "ready" },
  { id: "cm-5", label: "Remediation Linked", count: 33, context: "linked tasks", badge: "in progress" },
  { id: "cm-6", label: "Vendor Items Pending", count: 7, context: "third-party", badge: "vendor" },
]

export const complianceQueue: ComplianceQueueItem[] = [
  {
    id: "CQ-1001",
    controlId: "AC-02",
    title: "MFA enforcement evidence for staff accounts",
    domain: "Authentication",
    linkedArea: "Users",
    linkedAsset: "Staff Identity Directory",
    status: "Pending Evidence",
    evidenceState: "Missing",
    owner: "Identity Team",
    assignedTo: "A. Singh",
    reviewDate: "2026-03-25",
    dueAt: "2026-03-24T17:00:00",
    riskImpact: "High",
    notesCount: 2,
    policyLinked: true,
    remediationLinked: true,
    vendorRelated: false,
    readinessEligible: false,
  },
  {
    id: "CQ-1002",
    controlId: "DP-04",
    title: "Data classification control for student records",
    domain: "Student Data Protection",
    linkedArea: "Policies",
    linkedAsset: "Student Information System",
    status: "In Review",
    evidenceState: "Under Validation",
    owner: "Privacy Office",
    assignedTo: "D. Patel",
    reviewDate: "2026-03-27",
    dueAt: "2026-03-27T14:00:00",
    riskImpact: "Critical",
    notesCount: 4,
    policyLinked: true,
    remediationLinked: false,
    vendorRelated: false,
    readinessEligible: true,
  },
  {
    id: "CQ-1003",
    controlId: "DS-07",
    title: "Patch compliance validation for school endpoints",
    domain: "Device Security",
    linkedArea: "Devices",
    linkedAsset: "Chromebook Fleet",
    status: "Overdue",
    evidenceState: "Rejected",
    owner: "Endpoint Security",
    assignedTo: "M. Jordan",
    reviewDate: "2026-03-20",
    dueAt: "2026-03-22T12:00:00",
    riskImpact: "High",
    notesCount: 5,
    policyLinked: false,
    remediationLinked: true,
    vendorRelated: false,
    readinessEligible: false,
  },
  {
    id: "CQ-1004",
    controlId: "TP-02",
    title: "Vendor privacy review for learning platform",
    domain: "Third-Party Risk",
    linkedArea: "Vendors",
    linkedAsset: "LearnFlow LMS",
    status: "In Progress",
    evidenceState: "Uploaded",
    owner: "Vendor Risk Office",
    assignedTo: "A. Singh",
    reviewDate: "2026-03-29",
    dueAt: "2026-03-29T10:00:00",
    riskImpact: "Critical",
    notesCount: 3,
    policyLinked: true,
    remediationLinked: false,
    vendorRelated: true,
    readinessEligible: true,
  },
  {
    id: "CQ-1005",
    controlId: "SDLC-05",
    title: "Secure SDLC checklist for parent portal",
    domain: "Secure SDLC",
    linkedArea: "Applications",
    linkedAsset: "Parent Portal",
    status: "Ready for Approval",
    evidenceState: "Approved",
    owner: "AppSec Team",
    assignedTo: "D. Patel",
    reviewDate: "2026-03-24",
    dueAt: "2026-03-24T09:00:00",
    riskImpact: "Medium",
    notesCount: 1,
    policyLinked: true,
    remediationLinked: false,
    vendorRelated: false,
    readinessEligible: true,
  },
  {
    id: "CQ-1006",
    controlId: "IR-03",
    title: "Incident response review evidence",
    domain: "Incident Response",
    linkedArea: "Incidents",
    linkedAsset: "Incident Program",
    status: "Blocked",
    evidenceState: "Missing",
    owner: "Security Operations",
    assignedTo: "Unassigned",
    reviewDate: "2026-03-30",
    dueAt: "2026-03-30T15:00:00",
    riskImpact: "High",
    notesCount: 2,
    policyLinked: false,
    remediationLinked: true,
    vendorRelated: false,
    readinessEligible: false,
  },
  {
    id: "CQ-1007",
    controlId: "AC-09",
    title: "Access review sign-off for privileged users",
    domain: "Access Control",
    linkedArea: "Users",
    linkedAsset: "Privileged Access Group",
    status: "In Progress",
    evidenceState: "Uploaded",
    owner: "Access Governance",
    assignedTo: "M. Jordan",
    reviewDate: "2026-03-26",
    dueAt: "2026-03-26T16:30:00",
    riskImpact: "Critical",
    notesCount: 3,
    policyLinked: true,
    remediationLinked: false,
    vendorRelated: false,
    readinessEligible: true,
  },
  {
    id: "CQ-1008",
    controlId: "AP-02",
    title: "Application hardening baseline for SIS",
    domain: "Applications",
    linkedArea: "Applications",
    linkedAsset: "SIS Core",
    status: "Complete",
    evidenceState: "Approved",
    owner: "Platform Security",
    assignedTo: "D. Patel",
    reviewDate: "2026-04-02",
    dueAt: "2026-04-02T11:00:00",
    riskImpact: "Medium",
    notesCount: 2,
    policyLinked: false,
    remediationLinked: false,
    vendorRelated: false,
    readinessEligible: true,
  },
]

export const recentComplianceActivity: ComplianceActivityItem[] = [
  {
    id: "CA-1",
    action: "Evidence uploaded",
    detail: "MFA export attached for staff directory control.",
    actor: "A. Singh",
    at: "9 minutes ago",
  },
  {
    id: "CA-2",
    action: "Control marked in review",
    detail: "Student data classification control moved to validation.",
    actor: "D. Patel",
    at: "22 minutes ago",
  },
  {
    id: "CA-3",
    action: "Policy linked to control",
    detail: "Access Governance Policy linked to privileged user review control.",
    actor: "M. Jordan",
    at: "43 minutes ago",
  },
  {
    id: "CA-4",
    action: "Remediation task created",
    detail: "Endpoint patch evidence remediation opened.",
    actor: "Workflow Bot",
    at: "1 hour ago",
  },
  {
    id: "CA-5",
    action: "Vendor item updated",
    detail: "LearnFlow LMS privacy annex uploaded.",
    actor: "Vendor Risk Office",
    at: "2 hours ago",
  },
  {
    id: "CA-6",
    action: "Overdue flag triggered",
    detail: "Device patch validation exceeded review deadline.",
    actor: "Compliance Monitor",
    at: "2 hours ago",
  },
]

export const myComplianceTasks: MyComplianceTask[] = [
  {
    id: "CT-1",
    title: "Validate 2 uploaded evidence packages",
    dueBucket: "Due Now",
    completed: false,
  },
  {
    id: "CT-2",
    title: "Follow up on blocked incident response control",
    dueBucket: "Due Today",
    completed: false,
  },
  {
    id: "CT-3",
    title: "Close overdue endpoint evidence issue",
    dueBucket: "Overdue",
    completed: false,
  },
  {
    id: "CT-4",
    title: "Finalize secure SDLC sign-off packet",
    dueBucket: "Recently Completed",
    completed: true,
  },
]

export const evidenceItems: EvidenceItem[] = [
  {
    id: "EV-1",
    controlId: "AC-02",
    title: "Staff MFA enforcement export",
    state: "Missing",
    updatedAt: "2026-03-23T08:10:00",
  },
  {
    id: "EV-2",
    controlId: "DS-07",
    title: "Endpoint patch validation report",
    state: "Rejected",
    updatedAt: "2026-03-23T10:18:00",
  },
  {
    id: "EV-3",
    controlId: "TP-02",
    title: "Vendor privacy legal annex",
    state: "Uploaded",
    updatedAt: "2026-03-23T11:35:00",
  },
  {
    id: "EV-4",
    controlId: "SDLC-05",
    title: "Secure SDLC sign-off checklist",
    state: "Approved",
    updatedAt: "2026-03-23T12:12:00",
  },
  {
    id: "EV-5",
    controlId: "DP-04",
    title: "Student data classification matrix",
    state: "Under Validation",
    updatedAt: "2026-03-23T12:38:00",
  },
]

export const domainCoverage: DomainCoverageItem[] = [
  { domain: "Access Control", controlCount: 19, overdue: 2, missingEvidence: 3, inReview: 4 },
  { domain: "Authentication", controlCount: 16, overdue: 1, missingEvidence: 2, inReview: 3 },
  { domain: "Student Data Protection", controlCount: 18, overdue: 2, missingEvidence: 4, inReview: 5 },
  { domain: "Device Security", controlCount: 22, overdue: 3, missingEvidence: 4, inReview: 6 },
  { domain: "Incident Response", controlCount: 14, overdue: 1, missingEvidence: 2, inReview: 2 },
  { domain: "Third-Party Risk", controlCount: 12, overdue: 1, missingEvidence: 2, inReview: 3 },
  { domain: "Secure SDLC", controlCount: 11, overdue: 0, missingEvidence: 1, inReview: 2 },
  { domain: "Applications", controlCount: 17, overdue: 1, missingEvidence: 1, inReview: 3 },
  { domain: "Policies / Governance", controlCount: 19, overdue: 0, missingEvidence: 0, inReview: 4 },
]

export const readinessSummary = {
  operationalReadiness: 84,
  evidenceCompleteness: 87,
  awaitingSignOff: 13,
  blockedItems: 4,
  upcomingDeadlines: 9,
  readinessState: "Partially Ready" as ReadinessState,
}

export const policyLinkedControls: PolicyLinkedControlItem[] = [
  {
    id: "PLC-1",
    policyName: "Access Governance Policy",
    controlTitle: "Access review sign-off for privileged users",
    reviewDate: "2026-03-26",
    status: "In Progress",
    evidenceMissing: false,
  },
  {
    id: "PLC-2",
    policyName: "Student Data Protection Policy",
    controlTitle: "Data classification control for student records",
    reviewDate: "2026-03-27",
    status: "In Review",
    evidenceMissing: false,
  },
  {
    id: "PLC-3",
    policyName: "Vendor Security Policy",
    controlTitle: "Vendor privacy review for learning platform",
    reviewDate: "2026-03-29",
    status: "In Progress",
    evidenceMissing: true,
  },
]

export const vendorComplianceItems: VendorComplianceItem[] = [
  {
    id: "VC-1",
    vendor: "LearnFlow LMS",
    item: "Privacy annex and DPA review",
    status: "In Progress",
    evidenceState: "Uploaded",
    dueAt: "2026-03-29",
  },
  {
    id: "VC-2",
    vendor: "ClassBridge",
    item: "Student data retention evidence",
    status: "Pending Evidence",
    evidenceState: "Missing",
    dueAt: "2026-03-26",
  },
  {
    id: "VC-3",
    vendor: "ParentComms",
    item: "API security attestation",
    status: "Overdue",
    evidenceState: "Rejected",
    dueAt: "2026-03-22",
  },
]

export const complianceFilterOptions = {
  statuses: [
    "Not Started",
    "In Progress",
    "Pending Evidence",
    "In Review",
    "Ready for Approval",
    "Overdue",
    "Complete",
    "Blocked",
  ] as ComplianceStatus[],
  domains: [
    "Access Control",
    "Authentication",
    "Student Data Protection",
    "Device Security",
    "Incident Response",
    "Third-Party Risk",
    "Secure SDLC",
    "Applications",
    "Policies / Governance",
  ] as ComplianceDomain[],
  evidenceStates: ["Missing", "Uploaded", "Under Validation", "Rejected", "Approved"] as EvidenceState[],
  linkedAreas: ["Devices", "Users", "Applications", "Vendors", "Policies", "Incidents"] as LinkedArea[],
  assignees: ["A. Singh", "D. Patel", "M. Jordan", "Unassigned"],
}

