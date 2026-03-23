"use client"

import * as React from "react"
import {
  IconDownload,
  IconFileUpload,
  IconFilter,
  IconFolder,
  IconHourglassHigh,
  IconListCheck,
  IconRefresh,
  IconShieldCheck,
} from "@tabler/icons-react"

import { ActivityFeed } from "@/components/dashboard/governance/activity-feed"
import { DashboardBreadcrumbHeader } from "@/components/dashboard/governance/breadcrumb-header"
import { GovernanceDashboardShell } from "@/components/dashboard/governance/governance-dashboard-shell"
import { RowActions } from "@/components/dashboard/governance/row-actions"
import { DashboardStatCard } from "@/components/dashboard/governance/stat-card"
import {
  fileStatusTone,
  StatusBadge,
} from "@/components/dashboard/governance/status-badge"
import { DashboardTableToolbar } from "@/components/dashboard/governance/table-toolbar"
import { fileActivity, fileRecords, type FileRecord } from "@/lib/mock-data/files"
import {
  Avatar,
  AvatarFallback,
} from "@/registry/new-york-v4/ui/avatar"
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
import { Separator } from "@/registry/new-york-v4/ui/separator"
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/new-york-v4/ui/tooltip"

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function daysUntil(dateString: string) {
  const ms = new Date(dateString).getTime() - Date.now()
  return Math.ceil(ms / (1000 * 60 * 60 * 24))
}

export function FilesDashboardPage() {
  const [query, setQuery] = React.useState("")
  const [status, setStatus] = React.useState<string>("all")
  const [type, setType] = React.useState<string>("all")
  const [dateRange, setDateRange] = React.useState<string>("all")
  const [selectedFile, setSelectedFile] = React.useState<FileRecord | null>(null)
  const [feedLoading, setFeedLoading] = React.useState(false)
  const [lastUpdated, setLastUpdated] = React.useState(new Date())

  const filteredFiles = React.useMemo(() => {
    return fileRecords.filter((record) => {
      const matchesQuery =
        record.name.toLowerCase().includes(query.toLowerCase()) ||
        record.owner.toLowerCase().includes(query.toLowerCase()) ||
        record.category.toLowerCase().includes(query.toLowerCase())

      const matchesStatus = status === "all" || record.status === status
      const matchesType = type === "all" || record.type === type

      const uploadDaysAgo =
        (Date.now() - new Date(record.uploadedAt).getTime()) /
        (1000 * 60 * 60 * 24)
      const matchesDate =
        dateRange === "all" ||
        (dateRange === "30" && uploadDaysAgo <= 30) ||
        (dateRange === "60" && uploadDaysAgo <= 60) ||
        (dateRange === "90" && uploadDaysAgo <= 90)

      return matchesQuery && matchesStatus && matchesType && matchesDate
    })
  }, [dateRange, query, status, type])

  const stats = React.useMemo(() => {
    const total = filteredFiles.length
    const pending = filteredFiles.filter((item) => item.status === "Pending Review").length
    const approved = filteredFiles.filter((item) => item.status === "Approved").length
    const expiringSoon = filteredFiles.filter((item) => {
      const days = daysUntil(item.expiresAt)
      return days >= 0 && days <= 45
    }).length

    return { total, pending, approved, expiringSoon }
  }, [filteredFiles])

  const reviewCompletion = React.useMemo(() => {
    if (filteredFiles.length === 0) return 0
    const completed = filteredFiles.filter((item) => item.status === "Approved").length
    return Math.round((completed / filteredFiles.length) * 100)
  }, [filteredFiles])

  return (
    <GovernanceDashboardShell>
      <DashboardBreadcrumbHeader
        current="Files"
        title="Files"
        subtitle="Verify governance and security files are current, approved, and downloadable."
        actions={
          <>
            <Button variant="outline" size="sm">
              <IconRefresh className="size-4" />
              Refresh
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <IconListCheck className="size-4" />
                  Quick Review
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Quick Leadership Review</DialogTitle>
                  <DialogDescription>
                    3 files are pending review. Continue to review queue or export evidence.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Export Review Queue</Button>
                  <Button>Open Pending Files</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        }
      />

      <div className="grid gap-4 px-4 lg:grid-cols-4 lg:px-6">
        <DashboardStatCard
          label="Total Files"
          value={stats.total}
          hint="Across governance and security categories"
          icon={<IconFolder className="size-4 text-muted-foreground" />}
        />
        <DashboardStatCard
          label="Pending Review"
          value={stats.pending}
          hint="Needs leadership sign-off"
          icon={<IconHourglassHigh className="size-4 text-amber-300" />}
        />
        <DashboardStatCard
          label="Approved Files"
          value={stats.approved}
          hint="Ready for audit evidence"
          icon={<IconShieldCheck className="size-4 text-emerald-300" />}
        />
        <DashboardStatCard
          label="Expiring Soon"
          value={stats.expiringSoon}
          hint="Within next 45 days"
          icon={<IconFilter className="size-4 text-orange-300" />}
        />
      </div>

      <div className="grid gap-4 px-4 lg:grid-cols-[2fr_1fr] lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>File Inventory</CardTitle>
            <CardDescription>
              Search, filter, and review supporting files for governance and compliance checks.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <DashboardTableToolbar
              searchValue={query}
              onSearchChange={setQuery}
              searchPlaceholder="Search files, owners, or categories"
              lastUpdated={lastUpdated.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
              filters={
                <>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="DOCX">DOCX</SelectItem>
                      <SelectItem value="XLSX">XLSX</SelectItem>
                      <SelectItem value="CSV">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-44">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Pending Review">Pending Review</SelectItem>
                      <SelectItem value="Needs Update">Needs Update</SelectItem>
                      <SelectItem value="Expired">Expired</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-44">
                      <SelectValue placeholder="Uploaded" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any upload date</SelectItem>
                      <SelectItem value="30">Last 30 days</SelectItem>
                      <SelectItem value="60">Last 60 days</SelectItem>
                      <SelectItem value="90">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              }
              actions={
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFeedLoading(true)
                      window.setTimeout(() => setFeedLoading(false), 900)
                    }}
                  >
                    Export
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setLastUpdated(new Date())
                      setFeedLoading(true)
                      window.setTimeout(() => setFeedLoading(false), 900)
                    }}
                  >
                    <IconFileUpload className="size-4" />
                    Upload
                  </Button>
                </>
              }
            />

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Uploaded Date</TableHead>
                  <TableHead>Last Reviewed</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFiles.map((file) => (
                  <TableRow
                    key={file.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedFile(file)}
                  >
                    <TableCell className="font-medium">{file.name}</TableCell>
                    <TableCell>{file.category}</TableCell>
                    <TableCell>{file.type}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarFallback className="text-xs">
                            {file.owner
                              .split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{file.owner}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(file.uploadedAt)}</TableCell>
                    <TableCell>{formatDate(file.reviewedAt)}</TableCell>
                    <TableCell>
                      <StatusBadge label={file.status} tone={fileStatusTone(file.status)} />
                    </TableCell>
                    <TableCell>{file.version}</TableCell>
                    <TableCell className="text-right" onClick={(event) => event.stopPropagation()}>
                      <div className="flex justify-end gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8">
                              <IconDownload className="size-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Download file</TooltipContent>
                        </Tooltip>
                        <RowActions
                          items={[
                            { label: "View", onSelect: () => setSelectedFile(file) },
                            { label: "Download", onSelect: () => setSelectedFile(file) },
                            { label: "Mark Reviewed", onSelect: () => setSelectedFile(file) },
                          ]}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Review Completion</CardTitle>
              <CardDescription>Visible files reviewed and approved</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Completion</span>
                  <span>{reviewCompletion}%</span>
                </div>
                <Progress value={reviewCompletion} />
                <p className="text-xs text-muted-foreground">
                  Focus on files marked Pending Review and Needs Update.
                </p>
              </div>
            </CardContent>
          </Card>

          <ActivityFeed
            title="Recent File Activity"
            description="Uploads, reviews, and evidence actions"
            items={fileActivity}
            loading={feedLoading}
          />
        </div>
      </div>

      <Sheet open={Boolean(selectedFile)} onOpenChange={() => setSelectedFile(null)}>
        <SheetContent className="sm:max-w-lg">
          {selectedFile ? (
            <>
              <SheetHeader>
                <SheetTitle>{selectedFile.name}</SheetTitle>
                <SheetDescription>Metadata and verification details</SheetDescription>
              </SheetHeader>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span>{selectedFile.category}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Owner</span>
                  <span>{selectedFile.owner}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Uploaded</span>
                  <span>{formatDate(selectedFile.uploadedAt)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Last reviewed</span>
                  <span>{formatDate(selectedFile.reviewedAt)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Version</span>
                  <span>{selectedFile.version}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Expires in</span>
                  <span>{daysUntil(selectedFile.expiresAt)} days</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <StatusBadge
                    label={selectedFile.status}
                    tone={fileStatusTone(selectedFile.status)}
                  />
                </div>
                <Button className="mt-2 w-full">
                  <IconDownload className="size-4" />
                  Download {selectedFile.type}
                </Button>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </GovernanceDashboardShell>
  )
}
