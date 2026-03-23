"use client"

import * as React from "react"
import {
  IconCalendarStats,
  IconDownload,
  IconFileAnalytics,
  IconFileCheck,
  IconFileDescription,
  IconFlag,
  IconShare,
} from "@tabler/icons-react"

import { ActivityFeed } from "@/components/dashboard/governance/activity-feed"
import { DashboardBreadcrumbHeader } from "@/components/dashboard/governance/breadcrumb-header"
import { GovernanceDashboardShell } from "@/components/dashboard/governance/governance-dashboard-shell"
import { RowActions } from "@/components/dashboard/governance/row-actions"
import { DashboardStatCard } from "@/components/dashboard/governance/stat-card"
import {
  reportStatusTone,
  StatusBadge,
} from "@/components/dashboard/governance/status-badge"
import { DashboardTableToolbar } from "@/components/dashboard/governance/table-toolbar"
import {
  reportActivity,
  reportRecords,
  type ReportCategory,
  type ReportRecord,
} from "@/lib/mock-data/reports"
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

export function ReportsDashboardPage() {
  const [query, setQuery] = React.useState("")
  const [status, setStatus] = React.useState("all")
  const [format, setFormat] = React.useState("all")
  const [period, setPeriod] = React.useState("all")
  const [tab, setTab] = React.useState("All")
  const [selectedReport, setSelectedReport] = React.useState<ReportRecord | null>(null)

  const filtered = React.useMemo(() => {
    return reportRecords.filter((report) => {
      const matchesQuery =
        report.title.toLowerCase().includes(query.toLowerCase()) ||
        report.generatedBy.toLowerCase().includes(query.toLowerCase())

      const matchesStatus = status === "all" || report.status === status
      const matchesFormat = format === "all" || report.format === format
      const matchesPeriod = period === "all" || report.period === period

      const matchesTab =
        tab === "All" ||
        (tab === "Archived" && report.status === "Archived") ||
        (tab !== "Archived" && report.category === (tab as ReportCategory))

      return (
        matchesQuery &&
        matchesStatus &&
        matchesFormat &&
        matchesPeriod &&
        matchesTab
      )
    })
  }, [format, period, query, status, tab])

  const stats = React.useMemo(() => {
    const thisMonth = reportRecords.filter((item) =>
      item.generatedAt.startsWith("2026-03")
    ).length

    return {
      total: filtered.length,
      generatedThisMonth: thisMonth,
      pending: filtered.filter((item) => item.status === "Pending").length,
      highPriority: filtered.filter((item) => item.highPriority).length,
    }
  }, [filtered])

  return (
    <GovernanceDashboardShell>
      <DashboardBreadcrumbHeader
        current="Reports"
        title="Reports"
        subtitle="Review governance and security report readiness and download evidence packages."
        actions={
          <>
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <IconCalendarStats className="size-4" />
                  Schedule Review
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule Leadership Report Review</DialogTitle>
                  <DialogDescription>
                    Next scheduled report pack is due tomorrow at 8:00 AM.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Set Reminder</Button>
                  <Button>Open Calendar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        }
      />

      <div className="grid gap-4 px-4 lg:grid-cols-4 lg:px-6">
        <DashboardStatCard
          label="Total Reports"
          value={stats.total}
          hint="Visible in current filter"
          icon={<IconFileDescription className="size-4 text-muted-foreground" />}
        />
        <DashboardStatCard
          label="Generated This Month"
          value={stats.generatedThisMonth}
          hint="March 2026 production volume"
          icon={<IconFileCheck className="size-4 text-emerald-300" />}
        />
        <DashboardStatCard
          label="Pending Review"
          value={stats.pending}
          hint="Awaiting leadership validation"
          icon={<IconFileAnalytics className="size-4 text-amber-300" />}
        />
        <DashboardStatCard
          label="High-Priority Reports"
          value={stats.highPriority}
          hint="Requires principal attention"
          icon={<IconFlag className="size-4 text-red-300" />}
        />
      </div>

      <div className="grid gap-4 px-4 lg:grid-cols-[2fr_1fr] lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Report Inventory</CardTitle>
            <CardDescription>
              Track generated evidence by category, period, and readiness.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="All">All</TabsTrigger>
                <TabsTrigger value="Compliance">Compliance</TabsTrigger>
                <TabsTrigger value="Security">Security</TabsTrigger>
                <TabsTrigger value="Governance">Governance</TabsTrigger>
                <TabsTrigger value="Archived">Archived</TabsTrigger>
              </TabsList>
            </Tabs>

            <DashboardTableToolbar
              searchValue={query}
              onSearchChange={setQuery}
              searchPlaceholder="Search report name or generator"
              lastUpdated="2 minutes ago"
              filters={
                <>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="Ready">Ready</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All format</SelectItem>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="CSV">CSV</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="w-44">
                      <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All periods</SelectItem>
                      {Array.from(new Set(reportRecords.map((item) => item.period))).map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              }
              actions={
                <Button variant="outline" size="sm">
                  <IconShare className="size-4" />
                  Share
                </Button>
              }
            />

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Reporting Period</TableHead>
                  <TableHead>Generated On</TableHead>
                  <TableHead>Generated By</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.title}</TableCell>
                    <TableCell>{report.category}</TableCell>
                    <TableCell>{report.period}</TableCell>
                    <TableCell>{formatDate(report.generatedAt)}</TableCell>
                    <TableCell>{report.generatedBy}</TableCell>
                    <TableCell>{report.format}</TableCell>
                    <TableCell>
                      <StatusBadge
                        label={report.status}
                        tone={reportStatusTone(report.status)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <RowActions
                        items={[
                          { label: "View", onSelect: () => setSelectedReport(report) },
                          { label: "Download PDF", onSelect: () => setSelectedReport(report) },
                          { label: "Download CSV", onSelect: () => setSelectedReport(report) },
                          { label: "Share", onSelect: () => setSelectedReport(report) },
                          { label: "Mark Reviewed", onSelect: () => setSelectedReport(report) },
                        ]}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <ActivityFeed
          title="Quick Insights"
          description="Latest generated reports and backlog highlights"
          items={reportActivity}
        />
      </div>

      <Sheet open={Boolean(selectedReport)} onOpenChange={() => setSelectedReport(null)}>
        <SheetContent className="sm:max-w-lg">
          {selectedReport ? (
            <>
              <SheetHeader>
                <SheetTitle>{selectedReport.title}</SheetTitle>
                <SheetDescription>Report metadata and export options</SheetDescription>
              </SheetHeader>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span>{selectedReport.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Period</span>
                  <span>{selectedReport.period}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Generated On</span>
                  <span>{formatDate(selectedReport.generatedAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <StatusBadge
                    label={selectedReport.status}
                    tone={reportStatusTone(selectedReport.status)}
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1">
                    <IconDownload className="size-4" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <IconDownload className="size-4" />
                    Download CSV
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
