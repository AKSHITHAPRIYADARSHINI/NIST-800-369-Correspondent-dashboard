"use client"

import * as React from "react"
import { IconPlus, IconUserMinus } from "@tabler/icons-react"

import { AccessActivityFeed } from "@/components/admin/access-activity-feed"
import { AccessFilterToolbar, initialAccessFilters, type AccessFilters } from "@/components/admin/access-filter-toolbar"
import { AccessMetricCard } from "@/components/admin/access-metric-card"
import { IamGovernancePanel } from "@/components/admin/iam-governance-panel"
import { MyAccessTasksCard } from "@/components/admin/my-access-tasks-card"
import { PriorityAccessActionsCard } from "@/components/admin/priority-access-actions-card"
import { RevocationReviewWorkspace } from "@/components/admin/revocation-review-workspace"
import { UserAccessDetailsSheet } from "@/components/admin/user-access-details-sheet"
import { UsersAccessPageHeader } from "@/components/admin/users-access-page-header"
import { UsersAccessTable } from "@/components/admin/users-access-table"
import { AdminDashboardShell } from "@/components/dashboard/admin/admin-dashboard-shell"
import {
  accessActivity,
  accessMetrics,
  accessTasks,
  approvalChainItems,
  revocationCandidates,
  usersAccess,
  type UserAccessItem,
} from "@/lib/mock-data/admin-users-access"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/registry/new-york-v4/ui/tabs"

type AccessTab =
  | "All Users"
  | "Students"
  | "Parents"
  | "Teachers"
  | "Staff / Admin"
  | "Leadership"
  | "Pending Approval"
  | "Revocation Review"
  | "High-Risk Accounts"

function matchesTab(item: UserAccessItem, tab: AccessTab) {
  if (tab === "All Users") return true
  if (tab === "Students") return item.role === "Student"
  if (tab === "Parents") return item.role === "Parent"
  if (tab === "Teachers") return item.role === "Teacher"
  if (tab === "Staff / Admin") return item.role === "Staff" || item.role === "Admin"
  if (tab === "Leadership") return item.role === "Leadership"
  if (tab === "Pending Approval") return item.reviewStatus === "Pending Approval"
  if (tab === "Revocation Review") return item.reviewStatus === "Revoke Candidate" || item.revokeEligible
  return item.riskState === "High Risk" || item.riskState === "Restricted"
}

function filterUsers(item: UserAccessItem, tab: AccessTab, filters: AccessFilters) {
  const searchText = `${item.name} ${item.email} ${item.role} ${item.accessScope}`.toLowerCase()
  const searchMatch = searchText.includes(filters.search.toLowerCase())
  const roleMatch = filters.role === "all" || item.role === filters.role
  const scopeMatch = filters.scope === "all" || item.accessScope === filters.scope
  const approvalMatch = filters.approvalSource === "all" || item.approvalSource === filters.approvalSource
  const riskMatch = filters.riskState === "all" || item.riskState === filters.riskState
  const reviewMatch = filters.reviewStatus === "all" || item.reviewStatus === filters.reviewStatus
  const parentsMatch = !filters.parentsOnly || item.role === "Parent"
  const teachersMatch = !filters.teachersOnly || item.role === "Teacher"
  const pendingMatch = !filters.pendingApproval || item.reviewStatus === "Pending Approval"
  const revokeMatch = !filters.revokeCandidates || item.reviewStatus === "Revoke Candidate" || item.revokeEligible
  const inactiveMatch = !filters.inactiveAccounts || item.status === "Inactive"
  const highRiskMatch = !filters.highRiskOnly || item.riskState === "High Risk" || item.riskState === "Restricted"

  return (
    matchesTab(item, tab) &&
    searchMatch &&
    roleMatch &&
    scopeMatch &&
    approvalMatch &&
    riskMatch &&
    reviewMatch &&
    parentsMatch &&
    teachersMatch &&
    pendingMatch &&
    revokeMatch &&
    inactiveMatch &&
    highRiskMatch
  )
}

export function AdminUsersAccessPage() {
  const [tab, setTab] = React.useState<AccessTab>("All Users")
  const [filters, setFilters] = React.useState<AccessFilters>(initialAccessFilters)
  const [selected, setSelected] = React.useState<UserAccessItem | null>(null)

  const filteredUsers = React.useMemo(
    () => usersAccess.filter((item) => filterUsers(item, tab, filters)),
    [filters, tab]
  )

  return (
    <AdminDashboardShell>
      <UsersAccessPageHeader
        actions={
          <>
            <Button size="sm">
              <IconPlus className="size-4" />
              Add User Access
            </Button>
            <Button size="sm" variant="outline">
              <IconUserMinus className="size-4" />
              Revoke Access
            </Button>
            <Button size="sm" variant="outline">Quick Create</Button>
          </>
        }
      />

      <div className="grid gap-4 px-4 lg:grid-cols-6 lg:px-6">
        {accessMetrics.map((item) => (
          <AccessMetricCard key={item.id} label={item.label} count={item.count} context={item.context} badge={item.badge} />
        ))}
      </div>

      <div className="grid gap-4 px-4 lg:grid-cols-[2fr_1fr] lg:px-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Access Workspace</CardTitle>
              <CardDescription>Role access, approval chains, review status, and revocation workflow for school systems.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={tab} onValueChange={(value) => setTab(value as AccessTab)}>
                <TabsList className="grid w-full grid-cols-3 xl:grid-cols-9">
                  <TabsTrigger value="All Users">All Users</TabsTrigger>
                  <TabsTrigger value="Students">Students</TabsTrigger>
                  <TabsTrigger value="Parents">Parents</TabsTrigger>
                  <TabsTrigger value="Teachers">Teachers</TabsTrigger>
                  <TabsTrigger value="Staff / Admin">Staff / Admin</TabsTrigger>
                  <TabsTrigger value="Leadership">Leadership</TabsTrigger>
                  <TabsTrigger value="Pending Approval">Pending Approval</TabsTrigger>
                  <TabsTrigger value="Revocation Review">Revocation Review</TabsTrigger>
                  <TabsTrigger value="High-Risk Accounts">High-Risk Accounts</TabsTrigger>
                </TabsList>
              </Tabs>

              <AccessFilterToolbar filters={filters} onFiltersChange={setFilters} />

              <div className="rounded-lg border border-border/70">
                <UsersAccessTable items={filteredUsers} onOpen={setSelected} />
              </div>
            </CardContent>
          </Card>

          <IamGovernancePanel items={approvalChainItems} />
          <RevocationReviewWorkspace items={revocationCandidates} />
        </div>

        <div className="space-y-4">
          <PriorityAccessActionsCard
            items={[
              "6 parent access requests awaiting teacher-linked verification",
              "2 teacher accounts pending leadership approval validation",
              "3 inactive users due for revocation",
              "1 admin account flagged for high-risk access review",
            ]}
          />

          <AccessActivityFeed items={accessActivity} />
          <MyAccessTasksCard tasks={accessTasks} />

          <Card>
            <CardHeader>
              <CardTitle className="text-base">IAM Policy / Governance Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-md border border-border/70 p-2">Roles mapped: 28</div>
              <div className="rounded-md border border-border/70 p-2">Custom exceptions: 5</div>
              <div className="rounded-md border border-border/70 p-2">Pending role reviews: 9</div>
              <div className="rounded-md border border-border/70 p-2">Awaiting sign-off: 4</div>
              <div className="rounded-md border border-border/70 p-2">Review cycle alerts: 7</div>
              <div className="rounded-md border border-border/70 p-2">Revocation due this week: 12</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Approval Chain Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Teacher-linked parent requests</span>
                <Badge variant="outline">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Correspondent teacher approvals</span>
                <Badge variant="outline">Pending</Badge>
              </div>
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Leadership privileged review</span>
                <Badge variant="outline">Needs Review</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <UserAccessDetailsSheet item={selected} open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} />
    </AdminDashboardShell>
  )
}

