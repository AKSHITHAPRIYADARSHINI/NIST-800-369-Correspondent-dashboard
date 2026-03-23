"use client"

import * as React from "react"
import { IconUpload } from "@tabler/icons-react"

import { AssignedComplianceTasksCard } from "@/components/admin/assigned-compliance-tasks-card"
import { ComplianceActivityFeed } from "@/components/admin/compliance-activity-feed"
import { ComplianceDetailsSheet } from "@/components/admin/compliance-details-sheet"
import {
  ComplianceFilterToolbar,
  initialComplianceFilters,
  type ComplianceFilters,
} from "@/components/admin/compliance-filter-toolbar"
import { ComplianceMetricCard } from "@/components/admin/compliance-metric-card"
import { CompliancePageHeader } from "@/components/admin/compliance-page-header"
import { ComplianceQueueTable } from "@/components/admin/compliance-queue-table"
import { DomainCoverageWorkbench } from "@/components/admin/domain-coverage-workbench"
import { NotesEvidenceLog } from "@/components/admin/notes-evidence-log"
import { PolicyLinkageCard } from "@/components/admin/policy-linkage-card"
import { PriorityComplianceActionsCard } from "@/components/admin/priority-compliance-actions-card"
import { ReadinessSnapshotCard } from "@/components/admin/readiness-snapshot-card"
import { ComplianceStatusBadge } from "@/components/admin/badges/compliance-status-badge"
import { EvidenceStateBadge } from "@/components/admin/badges/evidence-state-badge"
import { AdminDashboardShell } from "@/components/dashboard/admin/admin-dashboard-shell"
import {
  complianceMetrics,
  complianceQueue,
  domainCoverage,
  evidenceItems,
  myComplianceTasks,
  policyLinkedControls,
  readinessSummary,
  recentComplianceActivity,
  vendorComplianceItems,
  type ComplianceQueueItem,
} from "@/lib/mock-data/admin-compliance"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york-v4/ui/dialog"
import { ScrollArea } from "@/registry/new-york-v4/ui/scroll-area"
import { Separator } from "@/registry/new-york-v4/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/registry/new-york-v4/ui/tabs"

type QueueTab =
  | "All Controls"
  | "Missing Evidence"
  | "Overdue"
  | "In Review"
  | "Remediation Linked"
  | "Vendor / Third-Party"
  | "Policies / Governance"

function matchesReviewDateFilter(reviewDate: string, value: string) {
  if (value === "all") return true

  const today = new Date()
  const target = new Date(reviewDate)
  const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  if (value === "7d") return diffDays >= 0 && diffDays <= 7
  if (value === "30d") return diffDays >= 0 && diffDays <= 30
  if (value === "overdue") return diffDays < 0

  return true
}

function filterQueue(item: ComplianceQueueItem, tab: QueueTab, filters: ComplianceFilters) {
  const tabMatch =
    tab === "All Controls" ||
    (tab === "Missing Evidence" && item.evidenceState === "Missing") ||
    (tab === "Overdue" && item.status === "Overdue") ||
    (tab === "In Review" && item.status === "In Review") ||
    (tab === "Remediation Linked" && item.remediationLinked) ||
    (tab === "Vendor / Third-Party" && item.vendorRelated) ||
    (tab === "Policies / Governance" && item.policyLinked)

  const searchText = `${item.title} ${item.domain} ${item.linkedAsset} ${item.owner}`.toLowerCase()
  const searchMatch = searchText.includes(filters.search.toLowerCase())
  const statusMatch = filters.status === "all" || item.status === filters.status
  const domainMatch = filters.domain === "all" || item.domain === filters.domain
  const evidenceMatch = filters.evidenceState === "all" || item.evidenceState === filters.evidenceState
  const areaMatch = filters.linkedArea === "all" || item.linkedArea === filters.linkedArea
  const assignedMatch = filters.assignedTo === "all" || item.assignedTo === filters.assignedTo
  const dateMatch = matchesReviewDateFilter(item.reviewDate, filters.reviewDate)
  const overdueMatch = !filters.onlyOverdue || item.status === "Overdue"
  const missingMatch = !filters.evidenceMissing || item.evidenceState === "Missing"
  const highImpactMatch = !filters.highImpact || item.riskImpact === "High" || item.riskImpact === "Critical"
  const readyMatch = !filters.readyForReview || item.readinessEligible
  const vendorMatch = !filters.vendorRelated || item.vendorRelated

  return (
    tabMatch &&
    searchMatch &&
    statusMatch &&
    domainMatch &&
    evidenceMatch &&
    areaMatch &&
    assignedMatch &&
    dateMatch &&
    overdueMatch &&
    missingMatch &&
    highImpactMatch &&
    readyMatch &&
    vendorMatch
  )
}

export function AdminCompliancePage() {
  const [tab, setTab] = React.useState<QueueTab>("All Controls")
  const [filters, setFilters] = React.useState<ComplianceFilters>(initialComplianceFilters)
  const [selected, setSelected] = React.useState<ComplianceQueueItem | null>(null)

  const queue = React.useMemo(
    () => complianceQueue.filter((item) => filterQueue(item, tab, filters)),
    [filters, tab]
  )

  const evidenceSummary = React.useMemo(() => {
    return {
      missing: evidenceItems.filter((item) => item.state === "Missing").length,
      uploaded: evidenceItems.filter((item) => item.state === "Uploaded").length,
      waiting: evidenceItems.filter((item) => item.state === "Under Validation").length,
      rejected: evidenceItems.filter((item) => item.state === "Rejected").length,
      ready: complianceQueue.filter((item) => item.status === "Ready for Approval").length,
    }
  }, [])

  return (
    <AdminDashboardShell>
      <CompliancePageHeader
        actions={
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">Add Compliance Task</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Compliance Task</DialogTitle>
                  <DialogDescription>
                    Create a control follow-up, evidence review, or remediation task.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Save Draft</Button>
                  <Button>Create Task</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <IconUpload className="size-4" />
                  Upload Evidence
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Evidence</DialogTitle>
                  <DialogDescription>
                    Attach implementation evidence to a control and route for validation.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Attach Later</Button>
                  <Button>Upload</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="sm">Quick Create</Button>
          </>
        }
      />

      <div className="grid gap-4 px-4 lg:grid-cols-6 lg:px-6">
        {complianceMetrics.map((item) => (
          <ComplianceMetricCard
            key={item.id}
            label={item.label}
            count={item.count}
            context={item.context}
            badge={item.badge}
          />
        ))}
      </div>

      <div className="grid gap-4 px-4 lg:grid-cols-[2fr_1fr] lg:px-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Work Queue</CardTitle>
              <CardDescription>
                Active controls, evidence actions, overdue reviews, and remediation-linked work.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={tab} onValueChange={(value) => setTab(value as QueueTab)}>
                <TabsList className="grid w-full grid-cols-7">
                  <TabsTrigger value="All Controls">All Controls</TabsTrigger>
                  <TabsTrigger value="Missing Evidence">Missing Evidence</TabsTrigger>
                  <TabsTrigger value="Overdue">Overdue</TabsTrigger>
                  <TabsTrigger value="In Review">In Review</TabsTrigger>
                  <TabsTrigger value="Remediation Linked">Remediation Linked</TabsTrigger>
                  <TabsTrigger value="Vendor / Third-Party">Vendor / Third-Party</TabsTrigger>
                  <TabsTrigger value="Policies / Governance">Policies / Governance</TabsTrigger>
                </TabsList>
              </Tabs>

              <ComplianceFilterToolbar filters={filters} onFiltersChange={setFilters} />

              <div className="rounded-lg border border-border/70">
                <ComplianceQueueTable items={queue} onOpen={setSelected} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Evidence & Verification Panel</CardTitle>
              <CardDescription>
                Missing evidence, validation queue, rejected items, and controls ready for sign-off.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
              <div className="rounded-md border border-border/70 p-3 text-sm">
                <p className="text-xs text-muted-foreground">Missing evidence</p>
                <p className="text-xl font-semibold">{evidenceSummary.missing}</p>
              </div>
              <div className="rounded-md border border-border/70 p-3 text-sm">
                <p className="text-xs text-muted-foreground">Recently uploaded</p>
                <p className="text-xl font-semibold">{evidenceSummary.uploaded}</p>
              </div>
              <div className="rounded-md border border-border/70 p-3 text-sm">
                <p className="text-xs text-muted-foreground">Waiting validation</p>
                <p className="text-xl font-semibold">{evidenceSummary.waiting}</p>
              </div>
              <div className="rounded-md border border-border/70 p-3 text-sm">
                <p className="text-xs text-muted-foreground">Rejected / incomplete</p>
                <p className="text-xl font-semibold">{evidenceSummary.rejected}</p>
              </div>
              <div className="rounded-md border border-border/70 p-3 text-sm">
                <p className="text-xs text-muted-foreground">Ready for sign-off</p>
                <p className="text-xl font-semibold">{evidenceSummary.ready}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <PriorityComplianceActionsCard
            items={[
              "4 overdue access review controls",
              "2 vendor privacy documents missing",
              "3 device compliance validations due today",
              "1 policy-linked control waiting sign-off",
              "2 application controls missing SDLC evidence",
            ]}
          />

          <ComplianceActivityFeed items={recentComplianceActivity} />
          <AssignedComplianceTasksCard tasks={myComplianceTasks} />

          <ReadinessSnapshotCard
            operationalReadiness={readinessSummary.operationalReadiness}
            evidenceCompleteness={readinessSummary.evidenceCompleteness}
            awaitingSignOff={readinessSummary.awaitingSignOff}
            blockedItems={readinessSummary.blockedItems}
            upcomingDeadlines={readinessSummary.upcomingDeadlines}
            readinessState={readinessSummary.readinessState}
          />
        </div>
      </div>

      <div className="grid gap-4 px-4 lg:grid-cols-2 lg:px-6">
        <DomainCoverageWorkbench items={domainCoverage} />

        <div className="space-y-4">
          <PolicyLinkageCard items={policyLinkedControls} />

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Vendor Compliance Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {vendorComplianceItems.map((item) => (
                <div key={item.id} className="rounded-md border border-border/70 p-2 text-sm">
                  <p className="font-medium">{item.vendor} - {item.item}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <ComplianceStatusBadge status={item.status} />
                    <EvidenceStateBadge state={item.evidenceState} />
                    <Badge variant="outline">Due {item.dueAt}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <NotesEvidenceLog items={evidenceItems} />

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Review Calendar / Deadline Snapshot</CardTitle>
              <CardDescription>Operational review cycle milestones</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-md border border-border/70 p-2">Due this week: 12</div>
              <div className="rounded-md border border-border/70 p-2">Overdue: 11</div>
              <div className="rounded-md border border-border/70 p-2">Upcoming sign-offs: 8</div>
              <div className="rounded-md border border-border/70 p-2">Milestones in 30d: 17</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ComplianceDetailsSheet item={selected} open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} />

      <div className="px-4 pb-2 lg:px-6">
        <Separator className="mb-3" />
        <p className="text-xs text-muted-foreground">
          NIST 800-369 operational focus: access control evidence, authentication verification, student data protection,
          endpoint compliance, incident documentation, third-party risk evidence, secure SDLC validation, and
          policy-linked control readiness.
        </p>
      </div>
    </AdminDashboardShell>
  )
}

