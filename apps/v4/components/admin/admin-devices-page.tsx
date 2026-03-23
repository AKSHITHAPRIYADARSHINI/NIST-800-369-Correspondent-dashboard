"use client"

import * as React from "react"
import { IconNotebook, IconPlus } from "@tabler/icons-react"

import { DeviceActivityFeed } from "@/components/admin/device-activity-feed"
import { DeviceDetailsSheet } from "@/components/admin/device-details-sheet"
import {
  DeviceFilterToolbar,
  initialDeviceFilters,
  type DeviceFilters,
} from "@/components/admin/device-filter-toolbar"
import { DeviceMetricCard } from "@/components/admin/device-metric-card"
import { DeviceRemediationQueue } from "@/components/admin/device-remediation-queue"
import { DevicesPageHeader } from "@/components/admin/devices-page-header"
import { DevicesTable } from "@/components/admin/devices-table"
import { MyDeviceTasksCard } from "@/components/admin/my-device-tasks-card"
import { PriorityDeviceActionsCard } from "@/components/admin/priority-device-actions-card"
import { AppRiskBadge } from "@/components/admin/badges/app-risk-badge"
import { AdminDashboardShell } from "@/components/dashboard/admin/admin-dashboard-shell"
import {
  appRiskItems,
  deviceActivity,
  deviceMetrics,
  deviceTasks,
  devices,
  remediationQueue,
  sessionEvents,
  type DeviceItem,
} from "@/lib/mock-data/admin-devices"
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
import { Tabs, TabsList, TabsTrigger } from "@/registry/new-york-v4/ui/tabs"

type DeviceTab =
  | "All Devices"
  | "Students"
  | "Teachers"
  | "Staff / Admin"
  | "Untrusted"
  | "Vulnerable"
  | "Application Risk"
  | "Offline / Unmanaged"

function matchesTab(item: DeviceItem, tab: DeviceTab) {
  if (tab === "All Devices") return true
  if (tab === "Students") return item.ownerRole === "Student"
  if (tab === "Teachers") return item.ownerRole === "Teacher"
  if (tab === "Staff / Admin") return item.ownerRole === "Staff" || item.ownerRole === "Admin"
  if (tab === "Untrusted") return item.trustState !== "Trusted"
  if (tab === "Vulnerable") return item.riskLevel === "High" || item.riskLevel === "Critical"
  if (tab === "Application Risk") return item.flaggedAppCount > 0
  return item.managedState !== "Managed" || item.status === "Inactive"
}

function filterDevices(item: DeviceItem, tab: DeviceTab, filters: DeviceFilters) {
  const text = `${item.deviceName} ${item.ownerName} ${item.deviceId}`.toLowerCase()
  const searchMatch = text.includes(filters.search.toLowerCase())
  const roleMatch = filters.role === "all" || item.ownerRole === filters.role
  const trustMatch = filters.trust === "all" || item.trustState === filters.trust
  const riskMatch = filters.risk === "all" || item.riskLevel === filters.risk
  const patchMatch = filters.patch === "all" || item.patchStatus === filters.patch
  const appRiskMatch =
    filters.appRisk === "all" ||
    (filters.appRisk === "Malicious" && item.maliciousAppCount > 0) ||
    (filters.appRisk === "Vulnerable" && item.vulnerableAppCount > 0) ||
    (filters.appRisk === "Safe" && item.flaggedAppCount === 0) ||
    (filters.appRisk === "Unverified" && item.trustState === "Unverified") ||
    (filters.appRisk === "Needs Review" && item.notesCount > 0)
  const managedMatch = filters.managedState === "all" || item.managedState === filters.managedState
  const activeMatch = filters.activeState === "all" || item.status === filters.activeState
  const untrustedMatch = !filters.untrustedOnly || item.trustState !== "Trusted"
  const vulnerableMatch = !filters.vulnerableOnly || item.riskLevel === "High" || item.riskLevel === "Critical"
  const maliciousMatch = !filters.maliciousAppsOnly || item.maliciousAppCount > 0
  const highTrafficMatch = !filters.highRiskTrafficOnly || item.activeSessionCount > 1
  const reviewMatch = !filters.needsReview || item.notesCount > 0 || item.trustState === "Unverified"
  const linkedTicketMatch = !filters.linkedTicketsOnly || item.linkedTicketCount > 0

  return (
    matchesTab(item, tab) &&
    searchMatch &&
    roleMatch &&
    trustMatch &&
    riskMatch &&
    patchMatch &&
    appRiskMatch &&
    managedMatch &&
    activeMatch &&
    untrustedMatch &&
    vulnerableMatch &&
    maliciousMatch &&
    highTrafficMatch &&
    reviewMatch &&
    linkedTicketMatch
  )
}

export function AdminDevicesPage() {
  const [tab, setTab] = React.useState<DeviceTab>("All Devices")
  const [filters, setFilters] = React.useState<DeviceFilters>(initialDeviceFilters)
  const [selected, setSelected] = React.useState<DeviceItem | null>(null)

  const filteredDevices = React.useMemo(
    () => devices.filter((item) => filterDevices(item, tab, filters)),
    [filters, tab]
  )

  return (
    <AdminDashboardShell>
      <DevicesPageHeader
        actions={
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <IconNotebook className="size-4" />
                  Add Device Note
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Device Note</DialogTitle>
                  <DialogDescription>Record investigation context, trust validation, or remediation follow-up.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Save Draft</Button>
                  <Button>Add Note</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button size="sm">
              <IconPlus className="size-4" />
              Create Device Task
            </Button>
            <Button size="sm" variant="outline">Quick Create</Button>
          </>
        }
      />

      <div className="grid gap-4 px-4 lg:grid-cols-6 lg:px-6">
        {deviceMetrics.map((item) => (
          <DeviceMetricCard
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
              <CardTitle>Device Overview Workspace</CardTitle>
              <CardDescription>
                Live inventory, trust state, risk posture, session visibility, and remediation controls.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={tab} onValueChange={(value) => setTab(value as DeviceTab)}>
                <TabsList className="grid w-full grid-cols-4 xl:grid-cols-8">
                  <TabsTrigger value="All Devices">All Devices</TabsTrigger>
                  <TabsTrigger value="Students">Students</TabsTrigger>
                  <TabsTrigger value="Teachers">Teachers</TabsTrigger>
                  <TabsTrigger value="Staff / Admin">Staff / Admin</TabsTrigger>
                  <TabsTrigger value="Untrusted">Untrusted</TabsTrigger>
                  <TabsTrigger value="Vulnerable">Vulnerable</TabsTrigger>
                  <TabsTrigger value="Application Risk">Application Risk</TabsTrigger>
                  <TabsTrigger value="Offline / Unmanaged">Offline / Unmanaged</TabsTrigger>
                </TabsList>
              </Tabs>

              <DeviceFilterToolbar filters={filters} onFiltersChange={setFilters} />

              <div className="rounded-lg border border-border/70">
                <DevicesTable items={filteredDevices} onOpen={setSelected} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Device Traffic &amp; Session Monitoring</CardTitle>
              <CardDescription>Recent login sessions, unusual access patterns, and trust mismatch signals.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {sessionEvents.map((event) => (
                <div key={event.id} className="flex items-start justify-between rounded-md border border-border/70 p-2 text-sm">
                  <div>
                    <p className="font-medium">{event.deviceName}</p>
                    <p className="text-xs text-muted-foreground">{event.ownerName} • {event.event}</p>
                  </div>
                  <Badge variant={event.state === "Normal" ? "outline" : "destructive"}>{event.state}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Risk Panel</CardTitle>
              <CardDescription>Applications observed across devices with vulnerability and verification status.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-60">
                <div className="space-y-2 pr-3">
                  {appRiskItems.map((item) => (
                    <div key={item.id} className="rounded-md border border-border/70 p-2 text-sm">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium">{item.appName}</p>
                        <AppRiskBadge status={item.riskStatus} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.deviceName} ({item.deviceId}) • {item.ownerName}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline">{item.vulnerabilityState}</Badge>
                        <Badge variant="outline">{item.verifiedState}</Badge>
                        <span>{item.detectedAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <PriorityDeviceActionsCard
            items={[
              "3 student devices need trust validation",
              "2 teacher laptops overdue for patch review",
              "1 admin endpoint flagged for risky application activity",
              "4 devices linked to repeated failed logins",
            ]}
          />
          <DeviceActivityFeed items={deviceActivity} />
          <MyDeviceTasksCard tasks={deviceTasks} />
          <DeviceRemediationQueue items={remediationQueue} />
        </div>
      </div>

      <DeviceDetailsSheet item={selected} open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} />
    </AdminDashboardShell>
  )
}

