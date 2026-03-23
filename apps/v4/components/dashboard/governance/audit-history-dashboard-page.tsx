"use client"

import * as React from "react"
import {
  IconAlertTriangle,
  IconClock,
  IconDownload,
  IconHistory,
  IconKey,
  IconShieldHalf,
} from "@tabler/icons-react"

import { DashboardBreadcrumbHeader } from "@/components/dashboard/governance/breadcrumb-header"
import { GovernanceDashboardShell } from "@/components/dashboard/governance/governance-dashboard-shell"
import { RowActions } from "@/components/dashboard/governance/row-actions"
import { DashboardStatCard } from "@/components/dashboard/governance/stat-card"
import {
  auditStatusTone,
  severityTone,
  StatusBadge,
} from "@/components/dashboard/governance/status-badge"
import { DashboardTableToolbar } from "@/components/dashboard/governance/table-toolbar"
import { auditRecords, auditTimeline } from "@/lib/mock-data/audit-history"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import { ScrollArea } from "@/registry/new-york-v4/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select"
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

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

export function AuditHistoryDashboardPage() {
  const [query, setQuery] = React.useState("")
  const [action, setAction] = React.useState("all")
  const [severity, setSeverity] = React.useState("all")
  const [role, setRole] = React.useState("all")
  const [module, setModule] = React.useState("all")
  const [dateRange, setDateRange] = React.useState("7")
  const [tab, setTab] = React.useState("all")

  const filtered = React.useMemo(() => {
    return auditRecords.filter((entry) => {
      const matchesQuery =
        entry.user.toLowerCase().includes(query.toLowerCase()) ||
        entry.action.toLowerCase().includes(query.toLowerCase())

      const matchesAction = action === "all" || entry.action === action
      const matchesSeverity = severity === "all" || entry.severity === severity
      const matchesRole = role === "all" || entry.role === role
      const matchesModule = module === "all" || entry.module === module
      const daysOld =
        (Date.now() - new Date(entry.timestamp).getTime()) /
        (1000 * 60 * 60 * 24)
      const matchesDate = dateRange === "all" || daysOld <= Number(dateRange)

      const matchesTab =
        tab === "all" ||
        (tab === "high-risk" && (entry.severity === "High" || entry.severity === "Critical")) ||
        (tab === "reviewed" && entry.status === "Reviewed")

      return (
        matchesQuery &&
        matchesAction &&
        matchesSeverity &&
        matchesRole &&
        matchesModule &&
        matchesDate &&
        matchesTab
      )
    })
  }, [action, dateRange, module, query, role, severity, tab])

  const stats = React.useMemo(() => {
    return {
      today: filtered.filter((entry) => entry.timestamp.startsWith("2026-03-23")).length,
      highRisk: filtered.filter((entry) => entry.severity === "High" || entry.severity === "Critical").length,
      accessChanges: filtered.filter((entry) => entry.action === "Access Changed").length,
      reviewed: filtered.filter((entry) => entry.status === "Reviewed").length,
    }
  }, [filtered])

  return (
    <GovernanceDashboardShell>
      <DashboardBreadcrumbHeader
        current="Audit History"
        title="Audit History"
        subtitle="Track who changed what, when it happened, and which events need leadership attention."
        actions={
          <>
            <Button variant="outline" size="sm">
              <IconDownload className="size-4" />
              Export Logs
            </Button>
            <Button size="sm">
              <IconHistory className="size-4" />
              Open Timeline
            </Button>
          </>
        }
      />

      <div className="grid gap-4 px-4 lg:grid-cols-4 lg:px-6">
        <DashboardStatCard
          label="Audit Events Today"
          value={stats.today}
          hint="Actions recorded in the last 24h"
          icon={<IconClock className="size-4 text-muted-foreground" />}
        />
        <DashboardStatCard
          label="High-Risk Events"
          value={stats.highRisk}
          hint="High and critical severity entries"
          icon={<IconAlertTriangle className="size-4 text-red-300" />}
        />
        <DashboardStatCard
          label="Access Changes"
          value={stats.accessChanges}
          hint="Identity and permission changes"
          icon={<IconKey className="size-4 text-amber-300" />}
        />
        <DashboardStatCard
          label="Reviewed Logs"
          value={stats.reviewed}
          hint="Validated by leadership"
          icon={<IconShieldHalf className="size-4 text-emerald-300" />}
        />
      </div>

      <div className="grid gap-4 px-4 lg:grid-cols-[2fr_1fr] lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Audit Log</CardTitle>
            <CardDescription>
              Filter by role, severity, module, and timeframe to isolate governance-relevant events.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="high-risk">High Risk</TabsTrigger>
                <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
              </TabsList>
            </Tabs>

            <DashboardTableToolbar
              searchValue={query}
              onSearchChange={setQuery}
              searchPlaceholder="Search user or action"
              lastUpdated="1 minute ago"
              filters={
                <>
                  <Select value={action} onValueChange={setAction}>
                    <SelectTrigger className="w-44">
                      <SelectValue placeholder="Action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All actions</SelectItem>
                      {Array.from(new Set(auditRecords.map((item) => item.action))).map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={severity} onValueChange={setSeverity}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="w-44">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All roles</SelectItem>
                      {Array.from(new Set(auditRecords.map((item) => item.role))).map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={module} onValueChange={setModule}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Module" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All modules</SelectItem>
                      {Array.from(new Set(auditRecords.map((item) => item.module))).map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">Last 7d</SelectItem>
                      <SelectItem value="30">Last 30d</SelectItem>
                      <SelectItem value="90">Last 90d</SelectItem>
                      <SelectItem value="all">All</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              }
            />

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{formatDateTime(entry.timestamp)}</TableCell>
                    <TableCell className="font-medium">{entry.user}</TableCell>
                    <TableCell>{entry.role}</TableCell>
                    <TableCell>{entry.action}</TableCell>
                    <TableCell>{entry.module}</TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger>
                          <StatusBadge
                            label={entry.severity}
                            tone={severityTone(entry.severity)}
                          />
                        </TooltipTrigger>
                        <TooltipContent>Severity based on governance impact</TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <StatusBadge label={entry.status} tone={auditStatusTone(entry.status)} />
                    </TableCell>
                    <TableCell className="text-right">
                      <RowActions
                        items={[
                          { label: "View Details", onSelect: () => undefined },
                          { label: "Export Entry", onSelect: () => undefined },
                          { label: "Open Related Item", onSelect: () => undefined },
                        ]}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity Timeline</CardTitle>
            <CardDescription>
              Highlighted events and review markers for quick leadership checks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[30rem] pr-3">
              <div className="space-y-4">
                {auditTimeline.map((event) => (
                  <div key={event.id} className="rounded-lg border border-border/70 p-3">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-sm font-medium">{event.title}</p>
                      <StatusBadge label={event.severity} tone={severityTone(event.severity)} />
                    </div>
                    <p className="text-xs text-muted-foreground">{event.detail}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{event.at}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </GovernanceDashboardShell>
  )
}
