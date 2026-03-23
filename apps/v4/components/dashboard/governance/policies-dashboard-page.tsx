"use client"

import * as React from "react"
import {
  IconBook,
  IconCalendarDue,
  IconCircleCheck,
  IconClipboardList,
  IconDownload,
  IconFileAlert,
  IconHistory,
} from "@tabler/icons-react"

import { ActivityFeed } from "@/components/dashboard/governance/activity-feed"
import { DashboardBreadcrumbHeader } from "@/components/dashboard/governance/breadcrumb-header"
import { GovernanceDashboardShell } from "@/components/dashboard/governance/governance-dashboard-shell"
import { RowActions } from "@/components/dashboard/governance/row-actions"
import { DashboardStatCard } from "@/components/dashboard/governance/stat-card"
import {
  policyStatusTone,
  StatusBadge,
} from "@/components/dashboard/governance/status-badge"
import { DashboardTableToolbar } from "@/components/dashboard/governance/table-toolbar"
import {
  policyActivity,
  policyCoverage,
  policyRecords,
  type PolicyRecord,
} from "@/lib/mock-data/policies"
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
import { Progress } from "@/registry/new-york-v4/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/registry/new-york-v4/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york-v4/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/registry/new-york-v4/ui/tabs"

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function PoliciesDashboardPage() {
  const [query, setQuery] = React.useState("")
  const [domain, setDomain] = React.useState("all")
  const [status, setStatus] = React.useState("all")
  const [tab, setTab] = React.useState("all")
  const [selectedPolicy, setSelectedPolicy] = React.useState<PolicyRecord | null>(null)

  const filtered = React.useMemo(() => {
    return policyRecords.filter((policy) => {
      const matchesQuery =
        policy.title.toLowerCase().includes(query.toLowerCase()) ||
        policy.owner.toLowerCase().includes(query.toLowerCase()) ||
        policy.domain.toLowerCase().includes(query.toLowerCase())
      const matchesDomain = domain === "all" || policy.domain === domain
      const matchesStatus = status === "all" || policy.status === status
      const matchesTab =
        tab === "all" ||
        (tab === "needs-review" && (policy.status === "Under Review" || policy.status === "Draft")) ||
        (tab === "overdue" && policy.status === "Overdue")

      return matchesQuery && matchesDomain && matchesStatus && matchesTab
    })
  }, [domain, query, status, tab])

  const stats = React.useMemo(() => {
    return {
      active: filtered.filter((item) => item.status === "Active").length,
      pending: filtered.filter((item) => item.status === "Under Review").length,
      due: filtered.filter((item) => item.status === "Overdue").length,
      critical: filtered.filter((item) => item.critical).length,
    }
  }, [filtered])

  return (
    <GovernanceDashboardShell>
      <DashboardBreadcrumbHeader
        current="Policies"
        title="Policies"
        subtitle="Review policy readiness, approvals, and upcoming governance deadlines."
        actions={
          <>
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <IconClipboardList className="size-4" />
                  Start Review
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Policy Review Queue</DialogTitle>
                  <DialogDescription>
                    2 policies are under review and 1 is overdue. Start with the overdue item first.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Notify Owners</Button>
                  <Button>Open Queue</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        }
      />

      <div className="grid gap-4 px-4 lg:grid-cols-4 lg:px-6">
        <DashboardStatCard
          label="Active Policies"
          value={stats.active}
          hint="Currently approved and in force"
          icon={<IconCircleCheck className="size-4 text-emerald-300" />}
        />
        <DashboardStatCard
          label="Pending Approvals"
          value={stats.pending}
          hint="Awaiting leadership sign-off"
          icon={<IconBook className="size-4 text-amber-300" />}
        />
        <DashboardStatCard
          label="Policies Due"
          value={stats.due}
          hint="Overdue for review"
          icon={<IconCalendarDue className="size-4 text-red-300" />}
        />
        <DashboardStatCard
          label="Compliance-Critical"
          value={stats.critical}
          hint="High-impact governance controls"
          icon={<IconFileAlert className="size-4 text-violet-300" />}
        />
      </div>

      <div className="grid gap-4 px-4 lg:grid-cols-[2fr_1fr] lg:px-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Policy Coverage</CardTitle>
              <CardDescription>
                Governance coverage across major policy domains
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {policyCoverage.map((domainMetric) => (
                <div key={domainMetric.domain} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span>{domainMetric.domain}</span>
                    <span>{domainMetric.coverage}%</span>
                  </div>
                  <Progress value={domainMetric.coverage} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Policy Inventory</CardTitle>
              <CardDescription>
                Leadership-friendly view of policy status, owners, and next review dates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="needs-review">Needs Review</TabsTrigger>
                  <TabsTrigger value="overdue">Overdue</TabsTrigger>
                </TabsList>
              </Tabs>

              <DashboardTableToolbar
                searchValue={query}
                onSearchChange={setQuery}
                searchPlaceholder="Search policy name, domain, or owner"
                lastUpdated="3 minutes ago"
                filters={
                  <>
                    <Select value={domain} onValueChange={setDomain}>
                      <SelectTrigger className="w-44">
                        <SelectValue placeholder="Domain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All domains</SelectItem>
                        {Array.from(new Set(policyRecords.map((item) => item.domain))).map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger className="w-44">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All statuses</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Under Review">Under Review</SelectItem>
                        <SelectItem value="Overdue">Overdue</SelectItem>
                        <SelectItem value="Archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </>
                }
                actions={
                  <Button variant="outline" size="sm">
                    <IconHistory className="size-4" />
                    View Timeline
                  </Button>
                }
              />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Policy Name</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Next Review</TableHead>
                    <TableHead>Approval Status</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((policy) => (
                    <TableRow
                      key={policy.id}
                      className={policy.status === "Overdue" ? "bg-red-500/5" : ""}
                    >
                      <TableCell className="font-medium">{policy.title}</TableCell>
                      <TableCell>{policy.domain}</TableCell>
                      <TableCell>{policy.owner}</TableCell>
                      <TableCell>{formatDate(policy.updatedAt)}</TableCell>
                      <TableCell>{formatDate(policy.nextReview)}</TableCell>
                      <TableCell>
                        <StatusBadge
                          label={policy.status}
                          tone={policyStatusTone(policy.status)}
                        />
                      </TableCell>
                      <TableCell>{policy.version}</TableCell>
                      <TableCell className="text-right">
                        <RowActions
                          items={[
                            { label: "View Policy", onSelect: () => setSelectedPolicy(policy) },
                            { label: "Download PDF", onSelect: () => setSelectedPolicy(policy) },
                            { label: "Request Review", onSelect: () => setSelectedPolicy(policy) },
                            { label: "View History", onSelect: () => setSelectedPolicy(policy) },
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <ActivityFeed
          title="Review Timeline"
          description="Upcoming deadlines and latest approvals"
          items={policyActivity}
        />
      </div>

      <Sheet open={Boolean(selectedPolicy)} onOpenChange={() => setSelectedPolicy(null)}>
        <SheetContent className="sm:max-w-lg">
          {selectedPolicy ? (
            <>
              <SheetHeader>
                <SheetTitle>{selectedPolicy.title}</SheetTitle>
                <SheetDescription>Policy details and review actions</SheetDescription>
              </SheetHeader>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Domain</span>
                  <span>{selectedPolicy.domain}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Owner</span>
                  <span>{selectedPolicy.owner}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Next review</span>
                  <span>{formatDate(selectedPolicy.nextReview)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <StatusBadge
                    label={selectedPolicy.status}
                    tone={policyStatusTone(selectedPolicy.status)}
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1">View Policy</Button>
                  <Button variant="outline" className="flex-1">
                    <IconDownload className="size-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </GovernanceDashboardShell>
  )
}
