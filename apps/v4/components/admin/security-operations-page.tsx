"use client"

import * as React from "react"
import {
  IconAlertTriangle,
  IconClipboardCheck,
  IconDeviceLaptop,
  IconMessages,
  IconShieldLock,
  IconUserSearch,
} from "@tabler/icons-react"

import { AssignedTasksCard } from "@/components/admin/assigned-tasks-card"
import { CommunicationReadinessCard } from "@/components/admin/communication-readiness-card"
import { NoteLogCard } from "@/components/admin/note-log-card"
import { OperationDetailsSheet } from "@/components/admin/operation-details-sheet"
import { OperationsFilterToolbar } from "@/components/admin/operations-filter-toolbar"
import { OperationsMetricCard } from "@/components/admin/operations-metric-card"
import { OperationsPageHeader } from "@/components/admin/operations-page-header"
import { PriorityActionsCard } from "@/components/admin/priority-actions-card"
import { ReviewQueueTable } from "@/components/admin/review-queue-table"
import { SecurityActivityFeed } from "@/components/admin/security-activity-feed"
import { SlaSnapshotCard } from "@/components/admin/sla-snapshot-card"
import { WorkbenchTabs } from "@/components/admin/workbench-tabs"
import { AdminDashboardShell } from "@/components/dashboard/admin/admin-dashboard-shell"
import {
  communicationDrafts,
  deviceTrustReviews,
  myTasks,
  operationsMetrics,
  operationsQueue,
  recentActivity,
  suspiciousSessions,
  type OperationsQueueItem,
} from "@/lib/mock-data/security-operations"
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
import { Separator } from "@/registry/new-york-v4/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/registry/new-york-v4/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/new-york-v4/ui/tooltip"

type QueueTab =
  | "All"
  | "Access Reviews"
  | "Device Trust"
  | "Suspicious Activity"
  | "Notifications"
  | "Compliance Tasks"

type Filters = {
  search: string
  status: string
  risk: string
  role: string
  module: string
  assignedTo: string
  due: string
  onlyHighRisk: boolean
  needsNotification: boolean
  unassigned: boolean
}

const initialFilters: Filters = {
  search: "",
  status: "all",
  risk: "all",
  role: "all",
  module: "all",
  assignedTo: "all",
  due: "all",
  onlyHighRisk: false,
  needsNotification: false,
  unassigned: false,
}

function dueFilterMatch(dueAt: string, due: string) {
  if (due === "all") return true

  const now = Date.now()
  const dueMs = new Date(dueAt).getTime()

  if (due === "today") {
    const dueDate = new Date(dueMs).toDateString()
    return dueDate === new Date(now).toDateString()
  }

  if (due === "24h") {
    return dueMs >= now && dueMs <= now + 24 * 60 * 60 * 1000
  }

  if (due === "overdue") {
    return dueMs < now
  }

  return true
}

export function SecurityOperationsPage() {
  const [tab, setTab] = React.useState<QueueTab>("All")
  const [filters, setFilters] = React.useState<Filters>(initialFilters)
  const [selectedItem, setSelectedItem] = React.useState<OperationsQueueItem | null>(null)

  const queue = React.useMemo(() => {
    return operationsQueue.filter((item) => {
      const matchesTab = tab === "All" || item.type === tab
      const text = `${item.title} ${item.userName} ${item.deviceName} ${item.sourceModule}`.toLowerCase()
      const matchesSearch = text.includes(filters.search.toLowerCase())
      const matchesStatus = filters.status === "all" || item.status === filters.status
      const matchesRisk = filters.risk === "all" || item.riskLevel === filters.risk
      const matchesRole = filters.role === "all" || item.userRole === filters.role
      const matchesModule = filters.module === "all" || item.sourceModule === filters.module
      const matchesAssigned = filters.assignedTo === "all" || item.assignedTo === filters.assignedTo
      const matchesDue = dueFilterMatch(item.dueAt, filters.due)
      const matchesHighRisk = !filters.onlyHighRisk || item.riskLevel === "High" || item.riskLevel === "Critical"
      const matchesNotify = !filters.needsNotification || item.notificationRequired !== "Not Needed"
      const matchesUnassigned = !filters.unassigned || item.assignedTo === "Unassigned"

      return (
        matchesTab &&
        matchesSearch &&
        matchesStatus &&
        matchesRisk &&
        matchesRole &&
        matchesModule &&
        matchesAssigned &&
        matchesDue &&
        matchesHighRisk &&
        matchesNotify &&
        matchesUnassigned
      )
    })
  }, [filters, tab])

  const triageCounts = React.useMemo(() => {
    const waitingVerification = queue.filter((item) => item.status === "Pending Verification").length
    const assignedToMe = queue.filter((item) => item.assignedTo === "A. Singh").length
    const overdueFollowUps = queue.filter((item) => new Date(item.dueAt).getTime() < Date.now()).length
    const pendingAccessReview = queue.filter((item) => item.type === "Access Reviews").length
    const unresolvedSuspicious = queue.filter((item) => item.type === "Suspicious Activity" && item.status !== "Resolved").length

    return {
      waitingVerification,
      assignedToMe,
      overdueFollowUps,
      pendingAccessReview,
      unresolvedSuspicious,
    }
  }, [queue])

  return (
    <AdminDashboardShell>
      <OperationsPageHeader
        actions={
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">Create Task</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Operational Task</DialogTitle>
                  <DialogDescription>
                    Open a review, verification, remediation, or notification task for active queue items.
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
                <Button size="sm" variant="outline">Escalate Issue</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Escalate to Leadership</DialogTitle>
                  <DialogDescription>
                    Attach evidence, summary, and recommended action before escalation.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Prepare Summary</Button>
                  <Button>Escalate</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button size="sm" variant="outline">Quick Create</Button>
          </>
        }
      />

      <div className="grid gap-4 px-4 lg:grid-cols-6 lg:px-6">
        {operationsMetrics.map((metric) => (
          <OperationsMetricCard key={metric.id} label={metric.label} count={metric.count} context={metric.context} />
        ))}
      </div>

      <div className="grid gap-4 px-4 lg:grid-cols-[2fr_1fr] lg:px-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Review Queue</CardTitle>
              <CardDescription>Active operational work across access, device trust, suspicious activity, and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={tab} onValueChange={(value) => setTab(value as QueueTab)}>
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="All">All</TabsTrigger>
                  <TabsTrigger value="Access Reviews">Access Reviews</TabsTrigger>
                  <TabsTrigger value="Device Trust">Device Trust</TabsTrigger>
                  <TabsTrigger value="Suspicious Activity">Suspicious Activity</TabsTrigger>
                  <TabsTrigger value="Notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="Compliance Tasks">Compliance Tasks</TabsTrigger>
                </TabsList>
              </Tabs>

              <OperationsFilterToolbar filters={filters} onFiltersChange={setFilters} />

              <div className="rounded-lg border border-border/70">
                <ReviewQueueTable items={queue} onReview={setSelectedItem} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verification / Triage Panel</CardTitle>
              <CardDescription>Current workload focus and unresolved items</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
              <div className="rounded-md border border-border/70 p-3 text-sm">
                <p className="text-xs text-muted-foreground">Waiting verification</p>
                <p className="text-xl font-semibold">{triageCounts.waitingVerification}</p>
              </div>
              <div className="rounded-md border border-border/70 p-3 text-sm">
                <p className="text-xs text-muted-foreground">Assigned to me</p>
                <p className="text-xl font-semibold">{triageCounts.assignedToMe}</p>
              </div>
              <div className="rounded-md border border-border/70 p-3 text-sm">
                <p className="text-xs text-muted-foreground">Overdue follow-ups</p>
                <p className="text-xl font-semibold">{triageCounts.overdueFollowUps}</p>
              </div>
              <div className="rounded-md border border-border/70 p-3 text-sm">
                <p className="text-xs text-muted-foreground">Pending access review</p>
                <p className="text-xl font-semibold">{triageCounts.pendingAccessReview}</p>
              </div>
              <div className="rounded-md border border-border/70 p-3 text-sm">
                <p className="text-xs text-muted-foreground">Unresolved suspicious events</p>
                <p className="text-xl font-semibold">{triageCounts.unresolvedSuspicious}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <PriorityActionsCard
            items={[
              "3 student logins need device validation",
              "2 malicious upload reviews pending",
              "1 privileged access change requires approval",
              "4 ticket closures waiting evidence",
            ]}
          />

          <SecurityActivityFeed items={recentActivity} />
          <AssignedTasksCard tasks={myTasks} />
          <CommunicationReadinessCard drafts={communicationDrafts} />
        </div>
      </div>

      <div className="grid gap-4 px-4 lg:grid-cols-2 lg:px-6">
        <WorkbenchTabs suspiciousSessions={suspiciousSessions} deviceTrustReviews={deviceTrustReviews} />

        <div className="space-y-4">
          <NoteLogCard />
          <SlaSnapshotCard overdue={4} withinSla={23} pending={9} awaitingExternal={3} />

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Operational Focus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 rounded-md border border-border/70 p-2">
                    <IconUserSearch className="size-4 text-primary" />
                    <span>Review all user logins touching school systems</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>K-12 access assurance priority</TooltipContent>
              </Tooltip>

              <div className="flex items-center gap-2 rounded-md border border-border/70 p-2">
                <IconDeviceLaptop className="size-4 text-primary" />
                <span>Verify device trust for student and staff sessions</span>
              </div>

              <div className="flex items-center gap-2 rounded-md border border-border/70 p-2">
                <IconShieldLock className="size-4 text-primary" />
                <span>Support policy-linked enforcement and compliance follow-up</span>
              </div>

              <div className="flex items-center gap-2 rounded-md border border-border/70 p-2">
                <IconMessages className="size-4 text-primary" />
                <span>Trigger teacher/parent/leadership communications when required</span>
              </div>

              <div className="flex items-center gap-2 rounded-md border border-border/70 p-2">
                <IconAlertTriangle className="size-4 text-primary" />
                <span>Escalate critical and malicious activity for immediate action</span>
              </div>

              <Separator />
              <div className="flex items-center justify-between">
                <Badge variant="outline">Audit-ready activity trace</Badge>
                <Button variant="ghost" size="sm">
                  <IconClipboardCheck className="size-4" />
                  View action log
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <OperationDetailsSheet item={selectedItem} open={Boolean(selectedItem)} onOpenChange={(open) => !open && setSelectedItem(null)} />
    </AdminDashboardShell>
  )
}

