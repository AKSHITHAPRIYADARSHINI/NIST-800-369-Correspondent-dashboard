export type FileRecordStatus =
  | "Approved"
  | "Pending Review"
  | "Needs Update"
  | "Expired"
  | "Draft"

export type FileRecord = {
  id: string
  name: string
  category: "Governance" | "Security" | "Compliance" | "Student Data" | "Vendor"
  type: "PDF" | "DOCX" | "XLSX" | "CSV"
  owner: string
  uploadedAt: string
  reviewedAt: string
  status: FileRecordStatus
  version: string
  size: string
  expiresAt: string
}

export const fileRecords: FileRecord[] = [
  {
    id: "F-001",
    name: "SECURED 369 Governance Charter",
    category: "Governance",
    type: "PDF",
    owner: "Dr. K. Rivera",
    uploadedAt: "2026-02-02",
    reviewedAt: "2026-03-10",
    status: "Approved",
    version: "v3.2",
    size: "3.1 MB",
    expiresAt: "2027-02-02",
  },
  {
    id: "F-002",
    name: "Student Data Handling SOP",
    category: "Student Data",
    type: "DOCX",
    owner: "A. Banerjee",
    uploadedAt: "2026-01-20",
    reviewedAt: "2026-03-05",
    status: "Pending Review",
    version: "v2.1",
    size: "1.4 MB",
    expiresAt: "2026-06-01",
  },
  {
    id: "F-003",
    name: "Vendor Access Register",
    category: "Vendor",
    type: "XLSX",
    owner: "M. Hawkins",
    uploadedAt: "2026-03-01",
    reviewedAt: "2026-03-12",
    status: "Needs Update",
    version: "v1.4",
    size: "860 KB",
    expiresAt: "2026-04-10",
  },
  {
    id: "F-004",
    name: "Incident Escalation Matrix",
    category: "Security",
    type: "PDF",
    owner: "J. Allen",
    uploadedAt: "2025-11-09",
    reviewedAt: "2025-12-12",
    status: "Expired",
    version: "v1.8",
    size: "2.2 MB",
    expiresAt: "2026-02-28",
  },
  {
    id: "F-005",
    name: "Board Security Review Notes",
    category: "Compliance",
    type: "PDF",
    owner: "Dr. K. Rivera",
    uploadedAt: "2026-03-18",
    reviewedAt: "2026-03-18",
    status: "Draft",
    version: "v0.9",
    size: "540 KB",
    expiresAt: "2026-05-20",
  },
  {
    id: "F-006",
    name: "Data Retention Schedule",
    category: "Compliance",
    type: "PDF",
    owner: "P. Edwards",
    uploadedAt: "2026-02-26",
    reviewedAt: "2026-03-17",
    status: "Approved",
    version: "v4.0",
    size: "1.1 MB",
    expiresAt: "2027-02-25",
  },
]

export const fileActivity = [
  {
    id: "FA-1",
    title: "Vendor Access Register updated",
    detail: "Needs Update flagged by compliance office",
    at: "5 minutes ago",
  },
  {
    id: "FA-2",
    title: "Student Data Handling SOP reviewed",
    detail: "Awaiting principal approval",
    at: "22 minutes ago",
  },
  {
    id: "FA-3",
    title: "Governance Charter downloaded",
    detail: "Downloaded by Supervisor",
    at: "1 hour ago",
  },
]
