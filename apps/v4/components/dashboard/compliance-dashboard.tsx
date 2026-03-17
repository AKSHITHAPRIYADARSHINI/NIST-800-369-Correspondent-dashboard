"use client"

import * as React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis,
} from "recharts"
import { IconCircleCheckFilled, IconClockHour4, IconPlus } from "@tabler/icons-react"

import {
  alerts,
  audit_readiness,
  checklist,
  compliance_score,
  domain_scores,
  findings_by_severity,
  pending_reviews,
  trend_data,
  type ComplianceTrendPoint,
} from "@/components/dashboard/compliance-data"
import { type DashboardAccent } from "@/components/dashboard/quick-create-menu"
import { NumberTicker } from "@/components/ui/number-ticker"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardThemeToggle } from "@/components/dashboard/theme-toggle"
import { QuickCreateMenu } from "@/components/dashboard/quick-create-menu"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/new-york-v4/ui/breadcrumb"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/new-york-v4/ui/select"
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

const trendConfig = {
  score: { label: "Compliance Score", color: "var(--chart-1)" },
} satisfies ChartConfig

const domainConfig = {
  score: { label: "Score", color: "var(--chart-2)" },
} satisfies ChartConfig

const severityConfig = {
  findings: { label: "Findings" },
  high: { label: "High", color: "var(--chart-1)" },
  medium: { label: "Medium", color: "var(--chart-2)" },
  low: { label: "Low", color: "var(--chart-3)" },
} satisfies ChartConfig

const readinessConfig = {
  value: { label: "Readiness", color: "var(--chart-1)" },
} satisfies ChartConfig

function severityBadge(level: "High" | "Medium" | "Low") {
  const compactClass =
    "inline-flex h-6 items-center rounded-full px-2.5 py-0 text-xs leading-none whitespace-nowrap"
  if (level === "High") return <Badge variant="destructive" className={compactClass}>High</Badge>
  if (level === "Medium") {
    return (
      <Badge className={`bg-amber-500 text-black ${compactClass}`}>
        Medium
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className={`border-border bg-muted/40 text-muted-foreground ${compactClass}`}>
      Low
    </Badge>
  )
}

function checklistIcon(status: "complete" | "warning" | "pending") {
  if (status === "complete") return <IconCircleCheckFilled className="size-4 text-emerald-500" />
  if (status === "warning") return <IconClockHour4 className="size-4 text-amber-500" />
  return <IconClockHour4 className="size-4 text-muted-foreground" />
}

function formatMonth(value: string) {
  return new Date(value).toLocaleDateString("en-US", { month: "short" })
}

function kpiBadge(variant: "ok" | "warn" | "crit", text: string) {
  if (variant === "ok") return <Badge className="bg-emerald-600/80 text-white">{text}</Badge>
  if (variant === "crit") return <Badge variant="destructive">{text}</Badge>
  return <Badge variant="outline" className="text-amber-600">{text}</Badge>
}

function ComplianceHeader({
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
          <Button size="sm" variant="outline" className="hidden h-7 sm:flex">
            Quick Alert
          </Button>
          <Button size="sm" variant="outline" className="hidden h-7 sm:flex">
            Contact Admin
          </Button>
          <QuickCreateMenu selectedAccent={selectedAccent} onAccentChange={onAccentChange} />
        </div>
      </div>
    </header>
  )
}

export function ComplianceDashboard() {
  const [accent, setAccent] = React.useState<DashboardAccent>("Violet")
  const [range, setRange] = React.useState<"3m" | "6m" | "1y">("3m")

  React.useEffect(() => {
    const saved = window.localStorage.getItem("security-dashboard-accent") as DashboardAccent | null
    if (saved) setAccent(saved)
  }, [])

  const handleAccentChange = React.useCallback((value: DashboardAccent) => {
    setAccent(value)
    window.localStorage.setItem("security-dashboard-accent", value)
  }, [])

  const trendPoints: ComplianceTrendPoint[] = trend_data[range]
  const readinessData = [{ name: "Audit readiness", value: audit_readiness, fill: "var(--chart-1)" }]

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
        <ComplianceHeader selectedAccent={accent} onAccentChange={handleAccentChange} />

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
                      <BreadcrumbPage>Compliance</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className="px-4 lg:px-6">
                <h2 className="text-2xl font-semibold tracking-tight">Compliance Dashboard</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Real-time view of NIST 800-369 compliance status, governance controls, and regulatory readiness.
                </p>
              </div>

              <div className="grid gap-4 px-4 lg:grid-cols-3 lg:px-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Compliance Trend</CardTitle>
                    <CardDescription>Compliance posture improvement over time.</CardDescription>
                    <CardAction>
                      <Select value={range} onValueChange={(v) => setRange(v as "3m" | "6m" | "1y")}>
                        <SelectTrigger size="sm" className="w-36">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3m">Last 3 months</SelectItem>
                          <SelectItem value="6m">Last 6 months</SelectItem>
                          <SelectItem value="1y">Last year</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={trendConfig} className="h-[260px] w-full">
                      <LineChart data={trendPoints} margin={{ left: 8, right: 8 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={formatMonth}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              labelFormatter={(value) =>
                                new Date(value).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                              }
                            />
                          }
                        />
                        <Line
                          dataKey="score"
                          type="monotone"
                          stroke="var(--color-score)"
                          strokeWidth={2.5}
                          dot={{ r: 3 }}
                        />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Findings by Severity</CardTitle>
                    <CardDescription>Distribution of active compliance issues.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center gap-3">
                    <ChartContainer config={severityConfig} className="mx-auto aspect-square max-h-[240px] w-full">
                      <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="severity" />} />
                        <Pie
                          data={findings_by_severity}
                          dataKey="findings"
                          nameKey="severity"
                          innerRadius={52}
                          outerRadius={88}
                          strokeWidth={2}
                        />
                      </PieChart>
                    </ChartContainer>
                    <div className="grid w-full grid-cols-3 gap-2 text-xs text-muted-foreground">
                      {findings_by_severity.map((item) => (
                        <div key={item.severity} className="text-center">
                          <p className="font-medium text-foreground">{item.findings}</p>
                          <p>{item.severity}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Compliance by Domain</CardTitle>
                    <CardDescription>
                      Implementation progress across NIST 800-369 control areas.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={domainConfig} className="h-[320px] w-full">
                      <BarChart data={domain_scores} layout="vertical" margin={{ left: 8, right: 8 }}>
                        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                        <YAxis
                          type="category"
                          dataKey="domain"
                          width={170}
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 12 }}
                        />
                        <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="score" fill="var(--color-score)" radius={[0, 6, 6, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Audit Readiness Progress</CardTitle>
                    <CardDescription>Completion of required audit preparation controls.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ChartContainer config={readinessConfig} className="mx-auto aspect-square max-h-[220px] w-full">
                      <RadialBarChart
                        data={readinessData}
                        innerRadius="68%"
                        outerRadius="100%"
                        startAngle={90}
                        endAngle={-270}
                      >
                        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                        <RadialBar dataKey="value" cornerRadius={12} fill="var(--color-value)" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </RadialBarChart>
                    </ChartContainer>
                    <div className="text-center">
                      <p className="text-3xl font-semibold tabular-nums">{audit_readiness}%</p>
                      <p className="text-xs text-muted-foreground">Audit readiness</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 px-4 lg:grid-cols-4 lg:px-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Overall Compliance Score</CardTitle>
                    <CardAction>{kpiBadge("ok", "Improving +2.1%")}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold tabular-nums">
                      <NumberTicker value={compliance_score} className="tabular-nums" />
                      <span>%</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Aligned with required NIST 800-369 controls
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">NIST 800-369 Domain Coverage</CardTitle>
                    <CardAction>{kpiBadge("ok", "Stable")}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold tabular-nums">
                      <NumberTicker value={8} className="tabular-nums" />
                      <span> / 10</span>
                    </p>
                    <p className="text-xs text-muted-foreground">Domains actively monitored</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Open Compliance Findings</CardTitle>
                    <CardAction>{kpiBadge("crit", "Needs attention")}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold tabular-nums">
                      <NumberTicker value={6} className="tabular-nums" />
                    </p>
                    <p className="text-xs text-muted-foreground">Controls needing remediation</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Pending Compliance Reviews</CardTitle>
                    <CardAction>{kpiBadge("warn", "Review backlog")}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold tabular-nums">
                      <NumberTicker value={pending_reviews} className="tabular-nums" />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Policy or control reviews awaiting approval
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 px-4 lg:grid-cols-2 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Alerts</CardTitle>
                    <CardDescription>Live issues impacting compliance posture.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="min-w-0 overflow-hidden rounded-lg border">
                      <Table className="w-full table-fixed">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[34%]">Alert</TableHead>
                            <TableHead className="w-[24%]">Domain</TableHead>
                            <TableHead className="w-[12%]">Severity</TableHead>
                            <TableHead className="w-[16%]">Status</TableHead>
                            <TableHead className="w-[14%]">Created</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {alerts.map((item) => (
                            <TableRow key={item.alert}>
                              <TableCell className="truncate" title={item.alert}>
                                {item.alert}
                              </TableCell>
                              <TableCell className="truncate" title={item.domain}>
                                {item.domain}
                              </TableCell>
                              <TableCell>{severityBadge(item.severity)}</TableCell>
                              <TableCell className="truncate text-xs">{item.status}</TableCell>
                              <TableCell className="text-xs">{item.created}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Audit Readiness</CardTitle>
                    <CardDescription>Controls required for regulatory readiness.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {checklist.map((entry) => (
                      <div
                        key={entry.item}
                        className="flex items-center justify-between rounded-md border px-3 py-2"
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          {checklistIcon(entry.status)}
                          <p className="truncate text-sm">{entry.item}</p>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {entry.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Customizable Compliance Widget</CardTitle>
                      <CardDescription>
                        Add additional compliance charts, reports, or governance metrics.
                      </CardDescription>
                    </div>
                    <Button size="sm">
                      <IconPlus />
                      Add Widget
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Supports future widgets: FERPA compliance, policy approvals, student data protection,
                      and vendor review tracking.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
