"use client"

import * as React from "react"
import {
  IconChevronRight,
  IconDeviceDesktopAnalytics,
  IconDownload,
  IconFileDescription,
  IconLock,
  IconShield,
  IconUserCheck,
} from "@tabler/icons-react"
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

import { AdminBreadcrumbHeader } from "@/components/dashboard/admin/admin-breadcrumb-header"
import { AdminDashboardShell } from "@/components/dashboard/admin/admin-dashboard-shell"
import { AdminStatCard } from "@/components/dashboard/admin/admin-stat-card"
import {
  AdminStatusBadge,
  severityTone,
  workflowTone,
} from "@/components/dashboard/admin/admin-status-badge"
import { PriorityActionQueue } from "@/components/dashboard/admin/priority-action-queue"
import { SecurityActivityTimeline } from "@/components/dashboard/admin/security-activity-timeline"
import {
  adminKpis,
  adminTrendData,
  authAccessSnapshot,
  complianceExecution,
  deviceSecuritySnapshot,
  policyTasks,
  priorityActions,
  securityTimeline,
  vendorRisk,
  workflowSnapshot,
} from "@/lib/mock-data/admin-dashboard"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/new-york-v4/ui/chart"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york-v4/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/new-york-v4/ui/dropdown-menu"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Progress } from "@/registry/new-york-v4/ui/progress"
import { ScrollArea } from "@/registry/new-york-v4/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select"
import { Separator } from "@/registry/new-york-v4/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/new-york-v4/ui/tooltip"

const trendConfig = {
  incidents: { label: "Incidents", color: "var(--chart-1)" },
  tickets: { label: "Tickets", color: "var(--chart-2)" },
  risk: { label: "Risk", color: "var(--chart-3)" },
  compliance: { label: "Compliance", color: "var(--chart-4)" },
} satisfies ChartConfig

export function AdminDashboardPage() {
  const [range, setRange] = React.useState<"7d" | "30d" | "90d">("30d")
  const [workflowTab, setWorkflowTab] = React.useState<"tickets" | "incidents" | "escalations">("tickets")
  const [queueSearch, setQueueSearch] = React.useState("")

  const trend = React.useMemo(
    () => adminTrendData.filter((row) => row.range === range),
    [range]
  )

  const filteredQueue = React.useMemo(() => {
    return priorityActions.filter((item) =>
      item.toLowerCase().includes(queueSearch.toLowerCase())
    )
  }, [queueSearch])

  return (
    <AdminDashboardShell>
      <AdminBreadcrumbHeader
        actions={
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">New Security Action</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Security Action</DialogTitle>
                  <DialogDescription>
                    Open a new task for incident response, device verification, policy work, or escalation.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Draft Task</Button>
                  <Button>Create Action</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button size="sm" variant="outline">Contact Leadership</Button>
            <Button size="sm" variant="outline">Quick Create</Button>
          </>
        }
      />

      <div className="grid gap-4 px-4 lg:grid-cols-6 lg:px-6">
        {adminKpis.map((item) => (
          <AdminStatCard
            key={item.id}
            label={item.label}
            value={item.value}
            helper={item.helper}
            badge={item.badge}
            icon={<IconChevronRight className="size-4 text-muted-foreground" />}
          />
        ))}
      </div>

      <div className="grid gap-4 px-4 lg:grid-cols-[2fr_1fr] lg:px-6">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle>Security Operations Overview</CardTitle>
                <CardDescription>
                  Incidents, tickets, risk score, and compliance trend lines
                </CardDescription>
              </div>
              <Tabs value={range} onValueChange={(value) => setRange(value as "7d" | "30d" | "90d")}>
                <TabsList>
                  <TabsTrigger value="7d">Last 7 days</TabsTrigger>
                  <TabsTrigger value="30d">Last 30 days</TabsTrigger>
                  <TabsTrigger value="90d">Last 3 months</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={trendConfig} className="h-[18rem] w-full">
              <LineChart data={trend}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={36} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line dataKey="incidents" stroke="var(--color-incidents)" strokeWidth={2} dot={false} />
                <Line dataKey="tickets" stroke="var(--color-tickets)" strokeWidth={2} dot={false} />
                <Line dataKey="risk" stroke="var(--color-risk)" strokeWidth={2} dot={false} />
                <Line dataKey="compliance" stroke="var(--color-compliance)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Priority Action Queue</CardTitle>
            <CardDescription>Immediate tasks requiring admin attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Search action queue"
              value={queueSearch}
              onChange={(event) => setQueueSearch(event.target.value)}
            />
            <PriorityActionQueue items={filteredQueue} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 px-4 lg:grid-cols-[2fr_1fr] lg:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Device Security</CardTitle>
              <CardDescription>Device trust, patching, and endpoint protection status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-md border border-border/70 p-2">Total enrolled: {deviceSecuritySnapshot.enrolled}</div>
                <div className="rounded-md border border-border/70 p-2">Protected: {deviceSecuritySnapshot.protected}</div>
                <div className="rounded-md border border-border/70 p-2">Vulnerable: {deviceSecuritySnapshot.vulnerable}</div>
                <div className="rounded-md border border-border/70 p-2">Unmanaged: {deviceSecuritySnapshot.unmanaged}</div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Encryption coverage</span>
                  <span>{deviceSecuritySnapshot.encryptionCoverage}%</span>
                </div>
                <Progress value={deviceSecuritySnapshot.encryptionCoverage} />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Patch overdue: {deviceSecuritySnapshot.patchOverdue}</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">Actions</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Devices</DropdownMenuItem>
                    <DropdownMenuItem>Isolate/Check Later</DropdownMenuItem>
                    <DropdownMenuItem>Mark Reviewed</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="px-0">
                    Recently flagged devices ({deviceSecuritySnapshot.recentlyFlagged})
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Recently Flagged Devices</SheetTitle>
                    <SheetDescription>
                      Review unverified or vulnerable devices touching school systems.
                    </SheetDescription>
                  </SheetHeader>
                  <ScrollArea className="mt-4 h-[70vh] pr-2">
                    {Array.from({ length: deviceSecuritySnapshot.recentlyFlagged }).map((_, idx) => (
                      <div key={idx} className="mb-2 rounded-md border border-border/70 p-2 text-sm">
                        Chromebook-{1000 + idx} | East Campus | Needs patch verification
                      </div>
                    ))}
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Authentication & Access</CardTitle>
              <CardDescription>Student and staff sign-in trust plus privileged role changes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Failed logins</span>
                <AdminStatusBadge label={`${authAccessSnapshot.failedLogins}`} tone="risk" />
              </div>
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Suspicious sign-ins</span>
                <AdminStatusBadge label={`${authAccessSnapshot.suspiciousSignIns}`} tone="critical" />
              </div>
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Student logins from unrecognized devices</span>
                <AdminStatusBadge label={`${authAccessSnapshot.studentUnknownDeviceLogins}`} tone="warning" />
              </div>
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Staff without MFA</span>
                <AdminStatusBadge label={`${authAccessSnapshot.staffWithoutMfa}`} tone="warning" />
              </div>
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Privileged access changes</span>
                <AdminStatusBadge label={`${authAccessSnapshot.privilegedAccessChanges}`} tone="info" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-base">Ticket & Incident Workflow</CardTitle>
                  <CardDescription>Operational remediation and escalation queue</CardDescription>
                </div>
                <Select defaultValue="severity">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="severity">By severity</SelectItem>
                    <SelectItem value="module">By module</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Tabs
                value={workflowTab}
                onValueChange={(value) => setWorkflowTab(value as "tickets" | "incidents" | "escalations")}
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="tickets">Tickets</TabsTrigger>
                  <TabsTrigger value="incidents">Incidents</TabsTrigger>
                  <TabsTrigger value="escalations">Escalations</TabsTrigger>
                </TabsList>
              </Tabs>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Workflow</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workflowSnapshot.map((row) => (
                    <TableRow key={row.label}>
                      <TableCell>{row.label}</TableCell>
                      <TableCell>{row.count}</TableCell>
                      <TableCell>
                        <AdminStatusBadge label={row.status} tone={workflowTone(row.status)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Compliance Execution</CardTitle>
              <CardDescription>Evidence completion and pending control tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Controls implemented</span>
                <span>{complianceExecution.implementedControls}</span>
              </div>
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Controls needing evidence</span>
                <AdminStatusBadge label={`${complianceExecution.needsEvidence}`} tone="warning" />
              </div>
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Upcoming review deadlines</span>
                <AdminStatusBadge label={`${complianceExecution.reviewDeadlines}`} tone="risk" />
              </div>
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Policy review tasks</span>
                <span>{complianceExecution.policyTasks}</span>
              </div>
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Audit-ready evidence items</span>
                <AdminStatusBadge label={`${complianceExecution.auditReady}`} tone="safe" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Third-Party Vendor Risk</CardTitle>
              <CardDescription>Supply chain and external partner review status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Active vendors</span>
                <span>{vendorRisk.activeVendors}</span>
              </div>
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Pending assessments</span>
                <AdminStatusBadge label={`${vendorRisk.pendingAssessments}`} tone="warning" />
              </div>
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Vendors with elevated risk</span>
                <AdminStatusBadge label={`${vendorRisk.elevatedRisk}`} tone="critical" />
              </div>
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Expired reviews</span>
                <AdminStatusBadge label={`${vendorRisk.expiredReviews}`} tone="risk" />
              </div>
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Systems touching student data</span>
                <span>{vendorRisk.studentDataTouchingSystems}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Policy & Governance Tasks</CardTitle>
              <CardDescription>Drafting, routing, and approvals for school policy lifecycle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Draft policies</span>
                <span>{policyTasks.draft}</span>
              </div>
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Under review</span>
                <AdminStatusBadge label={`${policyTasks.underReview}`} tone="warning" />
              </div>
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Overdue updates</span>
                <AdminStatusBadge label={`${policyTasks.overdue}`} tone="risk" />
              </div>
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Approvals needed</span>
                <AdminStatusBadge label={`${policyTasks.approvalsNeeded}`} tone="info" />
              </div>
              <div className="flex items-center justify-between rounded-md border border-border/70 p-2">
                <span>Recently updated tasks</span>
                <span>{policyTasks.recentlyUpdated}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">K-12 Protection Focus</CardTitle>
              <CardDescription>Student data and access safeguards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2 rounded-md border border-border/70 p-2">
                <IconShield className="size-4 text-primary" />
                <span>PII-related alerts monitored in real time</span>
              </div>
              <div className="flex items-center gap-2 rounded-md border border-border/70 p-2">
                <IconDeviceDesktopAnalytics className="size-4 text-primary" />
                <span>Unverified devices blocked from SIS access</span>
              </div>
              <div className="flex items-center gap-2 rounded-md border border-border/70 p-2">
                <IconLock className="size-4 text-primary" />
                <span>Role-based access checks for staff/student accounts</span>
              </div>
              <div className="flex items-center gap-2 rounded-md border border-border/70 p-2">
                <IconUserCheck className="size-4 text-primary" />
                <span>Parent and leadership communication readiness</span>
              </div>
            </CardContent>
          </Card>

          <SecurityActivityTimeline items={securityTimeline} />
        </div>
      </div>

      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Audit Readiness Evidence</CardTitle>
            <CardDescription>
              Download and verify current evidence package for NIST 800-369 aligned controls.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1 text-sm">
                <p>Evidence package includes logs, policy history, access reviews, and vendor risk records.</p>
                <p className="text-xs text-muted-foreground">Last generated: March 23, 2026 at 12:22 PM</p>
              </div>
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      <IconFileDescription className="size-4" />
                      View Contents
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Preview audit evidence items</TooltipContent>
                </Tooltip>
                <Button>
                  <IconDownload className="size-4" />
                  Download Evidence
                </Button>
              </div>
            </div>
            <Separator className="my-4" />
            <p className="text-xs text-muted-foreground">
              Alignment focus: Access Control, Authentication, Audit & Accountability, Device Security,
              Incident Response, Third-Party Risk, Secure SDLC, and Student Data Protection.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardShell>
  )
}
