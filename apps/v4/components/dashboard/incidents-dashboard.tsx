"use client"

import * as React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts"
import { IconAlertTriangle, IconDots, IconExternalLink, IconPlus } from "@tabler/icons-react"

import {
  active_incidents,
  affected_systems,
  high_priority_incidents,
  incident_categories,
  incident_trend_data,
  incidents,
  pending_leadership_review,
  resolved_incidents,
  response_status_data,
  severity_distribution,
  workflow_snapshot,
  type IncidentItem,
} from "@/components/dashboard/incidents-data"
import {
  type DashboardAccent,
  QuickCreateMenu,
} from "@/components/dashboard/quick-create-menu"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardThemeToggle } from "@/components/dashboard/theme-toggle"
import { NumberTicker } from "@/components/ui/number-ticker"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/new-york-v4/ui/breadcrumb"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardAction,
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
import { Label } from "@/registry/new-york-v4/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select"
import { Separator } from "@/registry/new-york-v4/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/new-york-v4/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york-v4/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/registry/new-york-v4/ui/tabs"
import { Textarea } from "@/registry/new-york-v4/ui/textarea"

const trendConfig = {
  incidents: {
    label: "Incidents",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const severityConfig = {
  count: { label: "Count" },
  critical: { label: "Critical", color: "var(--chart-1)" },
  high: { label: "High", color: "var(--chart-2)" },
  medium: { label: "Medium", color: "var(--chart-3)" },
  low: { label: "Low", color: "var(--chart-4)" },
} satisfies ChartConfig

const categoryConfig = {
  count: { label: "Incidents", color: "var(--chart-2)" },
} satisfies ChartConfig

const responseConfig = {
  new: { label: "New", color: "var(--chart-1)" },
  investigating: { label: "Investigating", color: "var(--chart-2)" },
  contained: { label: "Contained", color: "var(--chart-3)" },
  resolved: { label: "Resolved", color: "var(--chart-4)" },
} satisfies ChartConfig

function formatTrendLabel(value: string, range: "7d" | "30d" | "90d") {
  const date = new Date(value)
  if (range === "7d") {
    return date.toLocaleDateString("en-US", { weekday: "short" })
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function compactSeverityBadge(level: IncidentItem["severity"]) {
  const cls =
    "inline-flex h-6 items-center rounded-full px-2.5 py-0 text-xs leading-none whitespace-nowrap"
  if (level === "Critical") return <Badge className={`bg-red-600 text-white ${cls}`}>Critical</Badge>
  if (level === "High") return <Badge variant="destructive" className={cls}>High</Badge>
  if (level === "Medium") return <Badge className={`bg-amber-500 text-black ${cls}`}>Medium</Badge>
  return <Badge variant="outline" className={`bg-muted/40 text-muted-foreground ${cls}`}>Low</Badge>
}

function statusBadge(status: IncidentItem["status"]) {
  if (status === "Escalated") return <Badge variant="destructive">Escalated</Badge>
  if (status === "Investigating") return <Badge className="bg-amber-500 text-black">Investigating</Badge>
  if (status === "Resolved") return <Badge className="bg-emerald-600 text-white">Resolved</Badge>
  return <Badge variant="outline">{status}</Badge>
}

function kpiBadge(variant: "crit" | "warn" | "ok", text: string) {
  if (variant === "crit") return <Badge variant="destructive">{text}</Badge>
  if (variant === "warn") return <Badge variant="outline" className="text-amber-600">{text}</Badge>
  return <Badge className="bg-emerald-600/80 text-white">{text}</Badge>
}

function IncidentHeader({
  selectedAccent,
  onAccentChange,
}: {
  selectedAccent: DashboardAccent
  onAccentChange: (accent: DashboardAccent) => void
}) {
  return (
    <header className="sticky top-0 z-10 flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background/90">
      <div className="flex w-full items-center gap-3 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1 size-7" />
        <div className="min-w-0">
          <h1 className="truncate text-base font-medium">Greenfield Unified School</h1>
          <p className="truncate text-xs text-muted-foreground">User ID: SEC-CP-000184</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <p className="hidden text-right text-xs text-muted-foreground xl:block">
            Last updated: March 16, 2026
          </p>
          <DashboardThemeToggle />
          <Button size="sm" variant="outline" className="hidden h-7 sm:flex">Quick Alert</Button>
          <Button size="sm" variant="outline" className="hidden h-7 sm:flex">Contact Admin</Button>
          <QuickCreateMenu
            selectedAccent={selectedAccent}
            onAccentChange={onAccentChange}
          />
        </div>
      </div>
    </header>
  )
}

export function IncidentsDashboard() {
  const [accent, setAccent] = React.useState<DashboardAccent>("Violet")
  const [trendRange, setTrendRange] = React.useState<"7d" | "30d" | "90d">("30d")
  const [alertFilter, setAlertFilter] = React.useState<"all" | "high-priority" | "leadership-review">("all")
  const [selectedIncident, setSelectedIncident] = React.useState<IncidentItem | null>(null)
  const reportSectionRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const saved = window.localStorage.getItem(
      "security-dashboard-accent"
    ) as DashboardAccent | null
    if (saved) setAccent(saved)
  }, [])

  const handleAccentChange = React.useCallback((value: DashboardAccent) => {
    setAccent(value)
    window.localStorage.setItem("security-dashboard-accent", value)
  }, [])

  const trendSeries = React.useMemo(
    () => incident_trend_data.filter((item) => item.range === trendRange),
    [trendRange]
  )

  const filteredIncidents = React.useMemo(() => {
    if (alertFilter === "high-priority") {
      return incidents.filter((item) => item.severity === "Critical" || item.severity === "High")
    }
    if (alertFilter === "leadership-review") {
      return incidents.filter((item) => item.leadershipReview)
    }
    return incidents
  }, [alertFilter])

  return (
    <SidebarProvider
      className="security-dashboard-theme flex"
      data-accent={accent.toLowerCase()}
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 12 + 1px)",
        } as React.CSSProperties
      }
    >
      <DashboardSidebar variant="sidebar" />
      <SidebarInset>
        <IncidentHeader
          selectedAccent={accent}
          onAccentChange={handleAccentChange}
        />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <Breadcrumb>
                  <BreadcrumbList className="text-xs">
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Incidents</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className="px-4 lg:px-6">
                <h2 className="text-2xl font-semibold tracking-tight">Incidents Dashboard</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Real-time view of active incidents, response status, severity, and leadership oversight across school systems.
                </p>
              </div>

              <div className="grid gap-4 px-4 lg:grid-cols-3 lg:px-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Incident Trend</CardTitle>
                    <CardDescription>Track the number of reported incidents over time.</CardDescription>
                    <CardAction>
                      <Select value={trendRange} onValueChange={(v) => setTrendRange(v as "7d" | "30d" | "90d")}>
                        <SelectTrigger size="sm" className="w-36">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7d">Last 7 days</SelectItem>
                          <SelectItem value="30d">Last 30 days</SelectItem>
                          <SelectItem value="90d">Last 3 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={trendConfig} className="h-[260px] w-full">
                      <LineChart data={trendSeries} margin={{ left: 8, right: 8 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => formatTrendLabel(value, trendRange)}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              labelFormatter={(value) =>
                                new Date(value).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })
                              }
                            />
                          }
                        />
                        <Line
                          dataKey="incidents"
                          type="monotone"
                          stroke="var(--color-incidents)"
                          strokeWidth={2.5}
                          dot={{ r: 3 }}
                        />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Incidents by Severity</CardTitle>
                    <CardDescription>Distribution of active incidents by severity level.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ChartContainer config={severityConfig} className="mx-auto aspect-square max-h-[220px] w-full">
                      <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="severity" />} />
                        <Pie
                          data={severity_distribution}
                          dataKey="count"
                          nameKey="severity"
                          innerRadius={50}
                          outerRadius={84}
                          strokeWidth={2}
                        >
                          {severity_distribution.map((entry) => (
                            <Cell key={entry.severity} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ChartContainer>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs text-muted-foreground">
                      {severity_distribution.map((item) => (
                        <div key={item.severity}>
                          <p className="font-medium text-foreground">{item.count}</p>
                          <p>{item.severity}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Incident Categories</CardTitle>
                    <CardDescription>Most common types of school security incidents.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={categoryConfig} className="h-[290px] w-full">
                      <BarChart data={incident_categories} layout="vertical" margin={{ left: 8, right: 8 }}>
                        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                        <YAxis
                          type="category"
                          dataKey="category"
                          width={160}
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 12 }}
                        />
                        <XAxis type="number" tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="var(--color-count)" radius={[0, 6, 6, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Response Progress</CardTitle>
                    <CardDescription>Current response lifecycle status for reported incidents.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={responseConfig} className="h-[290px] w-full">
                      <BarChart data={response_status_data}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="period" tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="new" stackId="response" fill="var(--color-new)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="investigating" stackId="response" fill="var(--color-investigating)" />
                        <Bar dataKey="contained" stackId="response" fill="var(--color-contained)" />
                        <Bar dataKey="resolved" stackId="response" fill="var(--color-resolved)" />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 px-4 lg:grid-cols-4 lg:px-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Active Incidents</CardTitle>
                    <CardAction>{kpiBadge("crit", "Needs attention")}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold tabular-nums">
                      <NumberTicker value={active_incidents} className="tabular-nums" />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Incidents currently open for leadership oversight
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">High Priority Incidents</CardTitle>
                    <CardAction>{kpiBadge("crit", "Escalated")}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold tabular-nums">
                      <NumberTicker value={high_priority_incidents} className="tabular-nums" />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Incidents affecting critical systems or student data
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Resolved Incidents</CardTitle>
                    <CardAction>{kpiBadge("ok", "On track")}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold tabular-nums">
                      <NumberTicker value={resolved_incidents} className="tabular-nums" />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Incidents closed during the selected reporting period
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Pending Leadership Review</CardTitle>
                    <CardAction>{kpiBadge("warn", "Awaiting approval")}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold tabular-nums">
                      <NumberTicker value={pending_leadership_review} className="tabular-nums" />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Incident cases requiring Correspondent / Principal review
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="px-4 lg:px-6">
                <Button
                  onClick={() =>
                    reportSectionRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }
                >
                  <IconAlertTriangle />
                  Report Incident
                </Button>
              </div>

              <Separator className="mx-4 lg:mx-6" />

              <div className="grid gap-4 px-4 lg:grid-cols-2 lg:px-6">
                <Card
                  id="report-incident-section"
                  ref={reportSectionRef}
                  className="scroll-mt-20"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle>Incident Alerts</CardTitle>
                        <CardDescription>Live incident issues requiring attention.</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="outline" className="size-8">
                            <IconDots />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Export incident summary</DropdownMenuItem>
                          <DropdownMenuItem>Contact response team</DropdownMenuItem>
                          <DropdownMenuItem>Mark selected for leadership review</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <Tabs
                      value={alertFilter}
                      onValueChange={(value) =>
                        setAlertFilter(value as "all" | "high-priority" | "leadership-review")
                      }
                    >
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="high-priority">High Priority</TabsTrigger>
                        <TabsTrigger value="leadership-review">Review</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardHeader>
                  <CardContent>
                    <div className="min-w-0 overflow-hidden rounded-lg border">
                      <Table className="w-full table-fixed">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[24%]">Incident</TableHead>
                            <TableHead className="w-[17%]">Category</TableHead>
                            <TableHead className="w-[12%]">Severity</TableHead>
                            <TableHead className="w-[12%]">Status</TableHead>
                            <TableHead className="w-[16%]">Affected System</TableHead>
                            <TableHead className="w-[8%]">Reported</TableHead>
                            <TableHead className="w-[11%]">Owner</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredIncidents.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="truncate font-medium" title={item.incident}>
                                <button
                                  className="inline-flex items-center gap-1 hover:underline"
                                  onClick={() => setSelectedIncident(item)}
                                >
                                  {item.incident}
                                  <IconExternalLink className="size-3" />
                                </button>
                              </TableCell>
                              <TableCell className="truncate text-xs" title={item.category}>
                                {item.category}
                              </TableCell>
                              <TableCell>{compactSeverityBadge(item.severity)}</TableCell>
                              <TableCell>{statusBadge(item.status)}</TableCell>
                              <TableCell className="truncate text-xs" title={item.affectedSystem}>
                                {item.affectedSystem}
                              </TableCell>
                              <TableCell className="text-xs">{item.reported}</TableCell>
                              <TableCell className="truncate text-xs" title={item.owner}>
                                {item.owner}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Response Workflow</CardTitle>
                    <CardDescription>
                      Track how incidents are progressing through response stages.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {workflow_snapshot.map((item) => (
                      <div key={item.incident} className="rounded-md border p-3">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-medium">{item.incident}</p>
                          <Badge variant="outline">{item.stage}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Assigned team: {item.assignedTeam}</p>
                        <p className="mt-1 text-xs text-muted-foreground">Next action: {item.nextAction}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Affected Systems</CardTitle>
                    <CardDescription>Systems currently impacted by open incidents.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="min-w-0 overflow-hidden rounded-lg border">
                      <Table className="w-full table-fixed">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[36%]">System</TableHead>
                            <TableHead className="w-[12%]">Incidents</TableHead>
                            <TableHead className="w-[20%]">Severity</TableHead>
                            <TableHead className="w-[32%]">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {affected_systems.map((item) => (
                            <TableRow key={item.system}>
                              <TableCell className="truncate font-medium" title={item.system}>
                                {item.system}
                              </TableCell>
                              <TableCell className="text-sm">{item.incidents}</TableCell>
                              <TableCell>{compactSeverityBadge(item.severitySummary as IncidentItem["severity"])}</TableCell>
                              <TableCell className="truncate text-xs">{item.status}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Report Incident</CardTitle>
                    <CardDescription>
                      Quick entry panel for leadership to report or escalate an incident.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="incident-title">Incident Title</Label>
                        <Input id="incident-title" placeholder="Enter incident title" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="incident-category">Incident Category</Label>
                        <Select>
                          <SelectTrigger id="incident-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unauthorized-access">Unauthorized Access</SelectItem>
                            <SelectItem value="device-security">Device / Endpoint Security</SelectItem>
                            <SelectItem value="data-protection">Data Protection</SelectItem>
                            <SelectItem value="vendor-security">Vendor / Third-Party Security</SelectItem>
                            <SelectItem value="policy-violation">Policy Violation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="incident-severity">Severity</Label>
                        <Select>
                          <SelectTrigger id="incident-severity">
                            <SelectValue placeholder="Select severity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="critical">Critical</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="affected-system">Affected System</Label>
                        <Input id="affected-system" placeholder="System or platform" />
                      </div>
                      <div className="space-y-1.5 sm:col-span-2">
                        <Label htmlFor="short-description">Short Description</Label>
                        <Textarea
                          id="short-description"
                          placeholder="Summarize what happened and potential school impact."
                          className="min-h-20"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="date-time">Date / Time</Label>
                        <Input id="date-time" placeholder="Mar 17, 2026 09:15 AM" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="reported-by">Reported By</Label>
                        <Input id="reported-by" placeholder="Correspondent / Principal" />
                      </div>
                    </div>
                    <Button className="w-full">
                      <IconAlertTriangle />
                      Submit Incident Report
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Customizable Incident Widget</CardTitle>
                      <CardDescription>
                        Add additional visual charts, response metrics, or leadership oversight widgets.
                      </CardDescription>
                    </div>
                    <Button size="sm">
                      <IconPlus />
                      Add Widget
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Future widgets: mean time to resolve, incidents by campus, incidents affecting student data,
                      after-hours incidents, vendor tracker, and incident SLA compliance.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <Dialog open={!!selectedIncident} onOpenChange={(open) => !open && setSelectedIncident(null)}>
          <DialogTrigger asChild>
            <span className="hidden" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedIncident?.incident ?? "Incident Detail"}</DialogTitle>
              <DialogDescription>
                Leadership oversight snapshot for current incident response and audit tracking.
              </DialogDescription>
            </DialogHeader>
            {selectedIncident && (
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">Category:</span> {selectedIncident.category}</p>
                <p><span className="text-muted-foreground">Severity:</span> {selectedIncident.severity}</p>
                <p><span className="text-muted-foreground">Status:</span> {selectedIncident.status}</p>
                <p><span className="text-muted-foreground">Affected System:</span> {selectedIncident.affectedSystem}</p>
                <p><span className="text-muted-foreground">Owner:</span> {selectedIncident.owner}</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  )
}
