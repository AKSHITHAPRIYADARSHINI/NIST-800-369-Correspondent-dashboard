export type PolicyStatus =
  | "Active"
  | "Draft"
  | "Under Review"
  | "Overdue"
  | "Archived"

export type PolicyDomain =
  | "Access Control"
  | "Data Protection"
  | "Incident Response"
  | "Third-Party Risk"
  | "Acceptable Use"
  | "Authentication"

export type PolicyRecord = {
  id: string
  title: string
  domain: PolicyDomain
  owner: string
  updatedAt: string
  nextReview: string
  status: PolicyStatus
  version: string
  critical: boolean
}

export const policyRecords: PolicyRecord[] = [
  {
    id: "P-101",
    title: "District Access Control Policy",
    domain: "Access Control",
    owner: "IT Governance Office",
    updatedAt: "2026-02-18",
    nextReview: "2026-06-15",
    status: "Active",
    version: "v5.1",
    critical: true,
  },
  {
    id: "P-102",
    title: "Student Data Protection Policy",
    domain: "Data Protection",
    owner: "Data Privacy Team",
    updatedAt: "2026-01-28",
    nextReview: "2026-04-01",
    status: "Under Review",
    version: "v4.3",
    critical: true,
  },
  {
    id: "P-103",
    title: "Incident Response Policy",
    domain: "Incident Response",
    owner: "Security Office",
    updatedAt: "2025-10-14",
    nextReview: "2026-03-01",
    status: "Overdue",
    version: "v3.9",
    critical: true,
  },
  {
    id: "P-104",
    title: "Third-Party Access Policy",
    domain: "Third-Party Risk",
    owner: "Procurement Governance",
    updatedAt: "2026-03-07",
    nextReview: "2026-08-20",
    status: "Active",
    version: "v2.7",
    critical: true,
  },
  {
    id: "P-105",
    title: "Acceptable Use Policy for Staff",
    domain: "Acceptable Use",
    owner: "HR Compliance",
    updatedAt: "2026-03-15",
    nextReview: "2026-09-30",
    status: "Draft",
    version: "v1.0",
    critical: false,
  },
  {
    id: "P-106",
    title: "Multi-Factor Authentication Policy",
    domain: "Authentication",
    owner: "Identity Team",
    updatedAt: "2026-03-11",
    nextReview: "2026-07-10",
    status: "Active",
    version: "v2.2",
    critical: true,
  },
  {
    id: "P-107",
    title: "Legacy Password Policy",
    domain: "Authentication",
    owner: "Identity Team",
    updatedAt: "2024-09-19",
    nextReview: "2025-09-19",
    status: "Archived",
    version: "v1.6",
    critical: false,
  },
]

export const policyCoverage = [
  { domain: "Access Control", coverage: 91 },
  { domain: "Data Protection", coverage: 88 },
  { domain: "Incident Response", coverage: 72 },
  { domain: "Third-Party Risk", coverage: 79 },
  { domain: "Acceptable Use", coverage: 84 },
  { domain: "Authentication", coverage: 95 },
]

export const policyActivity = [
  {
    id: "PA-1",
    title: "Student Data Protection Policy routed",
    detail: "Awaiting final sign-off",
    at: "11 minutes ago",
  },
  {
    id: "PA-2",
    title: "Incident Response Policy marked overdue",
    detail: "Review deadline missed on Mar 1",
    at: "2 hours ago",
  },
  {
    id: "PA-3",
    title: "MFA Policy approved",
    detail: "Approved by Principal",
    at: "Yesterday",
  },
]
