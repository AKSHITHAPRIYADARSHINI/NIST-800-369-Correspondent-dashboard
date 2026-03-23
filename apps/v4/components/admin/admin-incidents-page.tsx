"use client"

import * as React from "react"

import { CommunicationReadinessCard } from "@/components/admin/communication-readiness-card"
import { AssignedIncidentsCard } from "@/components/admin/assigned-incidents-card"
import { IncidentActivityFeed } from "@/components/admin/incident-activity-feed"
import { IncidentActionsPlaybook } from "@/components/admin/incident-actions-playbook"
import { IncidentCategoryWorkbench } from "@/components/admin/incident-category-workbench"
import { IncidentDetailsSheet } from "@/components/admin/incident-details-sheet"
import {
  IncidentsFilterToolbar,
  initialIncidentFilters,
  type IncidentFilters,
} from "@/components/admin/incidents-filter-toolbar"
import { IncidentsMetricCard } from "@/components/admin/incidents-metric-card"
import { IncidentsPageHeader } from "@/components/admin/incidents-page-header"
import { IncidentsQueueTable } from "@/components/admin/incidents-queue-table"
import { NotesResolutionLog } from "@/components/admin/notes-resolution-log"
import { PriorityIncidentsCard } from "@/components/admin/priority-incidents-card"
import { IncidentStatusBadge } from "@/components/admin/badges/incident-status-badge"
import { SeverityBadge } from "@/components/admin/badges/severity-badge"
import { SlaBadge } from "@/components/admin/badges/sla-badge"
import { AdminDashboardShell } from "@/components/dashboard/admin/admin-dashboard-shell"
import {
  incidentActivity,
  incidentCategorySummary,
  incidentMetrics,
  incidentNotifications,
  incidentPlaybookItems,
  incidentTimeline,
  incidentsQueue,
  linkedTickets,
  myIncidentTasks,
  type IncidentQueueItem,
} from "@/lib/mock-data/admin-incidents"
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
import { Separator } from "@/registry/new-york-v4/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/registry/new-york-v4/ui/tabs"

const categoryTabs = [
  "All",
  "SDLC / App Security",
  "Authentication / Access",
  "Devices",
  "Tickets Linked",
  "Third-Party Vendor",
  "User Activity",
  "Policy / Compliance",
] as const

type CategoryTab = (typeof categoryTabs)[number]

function dateFilterMatch(createdAt: string, value: string) {
  if (value === "all") return true
  const now = Date.now()
  const created = new Date(createdAt).getTime()
  const delta = now - created
  if (value === "24h") return delta <= 24 * 60 * 60 * 1000
  if (value === "7d") return delta <= 7 * 24 * 60 * 60 * 1000
  if (value === "overdue") return false
  return true
}

function queueFilter(item: IncidentQueueItem, tab: CategoryTab, filters: IncidentFilters) {
  const tabMatch = tab === "All" || item.category === tab
  const searchText = `${item.incidentId} ${item.title} ${item.affectedUser} ${item.affectedDevice} ${item.affectedApp} ${item.affectedVendor}`.toLowerCase()
  const searchMatch = searchText.includes(filters.search.toLowerCase())
  const categoryMatch = filters.category === "all" || item.category === filters.category
  const severityMatch = filters.severity === "all" || item.severity === filters.severity
  const statusMatch = filters.status === "all" || item.status === filters.status
  const ownerMatch = filters.owner === "all" || item.owner === filters.owner
  const areaMatch = filters.linkedArea === "all" || item.affectedArea.includes(filters.linkedArea)
  const dateMatch = dateFilterMatch(item.createdAt, filters.dateRange)
  const assignedMatch = filters.assignedTo === "all" || item.assignedTo === filters.assignedTo

  const criticalMatch = !filters.onlyCritical || item.severity === "Critical"
  const unassignedMatch = !filters.onlyUnassigned || item.assignedTo === "Unassigned"
  const ticketMatch = !filters.linkedToTicket || item.linkedTicketCount > 0
  const notifyMatch = !filters.needsNotification || item.notificationRequired !== "Not Needed"
  const overdueMatch = !filters.overdue || item.slaState === "Overdue" || item.slaState === "Breached"
  const vendorMatch = !filters.vendorRelated || item.category === "Third-Party Vendor"

  return (
    tabMatch && searchMatch && categoryMatch && severityMatch && statusMatch && ownerMatch && areaMatch && dateMatch && assignedMatch &&
    criticalMatch && unassignedMatch && ticketMatch && notifyMatch && overdueMatch && vendorMatch
  )
}

export function AdminIncidentsPage() {
  const [tab, setTab] = React.useState<CategoryTab>("All")
  const [filters, setFilters] = React.useState<IncidentFilters>(initialIncidentFilters)
  const [selected, setSelected] = React.useState<IncidentQueueItem | null>(null)

  const queue = React.useMemo(() => incidentsQueue.filter((item) => queueFilter(item, tab, filters)), [filters, tab])

  return (
    <AdminDashboardShell>
      <IncidentsPageHeader
        actions={
          <>
            <Dialog>
              <DialogTrigger asChild><Button size="sm">Create Incident</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Create Incident</DialogTitle><DialogDescription>Open a new incident and assign immediate triage ownership.</DialogDescription></DialogHeader>
                <DialogFooter><Button variant="outline">Save Draft</Button><Button>Create</Button></DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild><Button size="sm" variant="outline">Escalate Incident</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Escalate Incident</DialogTitle><DialogDescription>Prepare leadership escalation with incident context and recommended actions.</DialogDescription></DialogHeader>
                <DialogFooter><Button variant="outline">Prepare Brief</Button><Button>Escalate</Button></DialogFooter>
              </DialogContent>
            </Dialog>
            <Button size="sm" variant="outline">Quick Create</Button>
          </>
        }
      />

      <div className="grid gap-4 px-4 lg:grid-cols-6 lg:px-6">
        {incidentMetrics.map((m) => (
          <IncidentsMetricCard key={m.id} label={m.label} count={m.count} context={m.context} badge={m.badge} />
        ))}
      </div>

      <div className="grid gap-4 px-4 lg:grid-cols-[2fr_1fr] lg:px-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Incident Segmentation</CardTitle>
              <CardDescription>Operate incidents by category for focused triage and response workflows.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={tab} onValueChange={(value) => setTab(value as CategoryTab)}>
                <TabsList className="grid w-full grid-cols-8">
                  {categoryTabs.map((label) => <TabsTrigger key={label} value={label}>{label}</TabsTrigger>)}
                </TabsList>
              </Tabs>

              <IncidentsFilterToolbar filters={filters} onFiltersChange={setFilters} />

              <div className="rounded-lg border border-border/70">
                <IncidentsQueueTable items={queue} onOpen={setSelected} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Incident Timeline / Updates</CardTitle>
              <CardDescription>Detection, triage, assignment, communication, escalation, and resolution trail.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-52 pr-2">
                <div className="space-y-2">
                  {incidentTimeline.map((item) => (
                    <div key={item.id} className="rounded-md border border-border/70 p-2 text-sm">
                      <p className="font-medium">{item.incidentId} - {item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.at} - {item.by}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <PriorityIncidentsCard
            items={[
              "2 critical authentication incidents need triage",
              "1 third-party vendor incident pending escalation",
              "3 device-related incidents awaiting review",
              "2 incidents linked to overdue tickets",
              "1 SDLC incident affecting production school app",
            ]}
          />
          <IncidentActivityFeed items={incidentActivity} />
          <AssignedIncidentsCard tasks={myIncidentTasks} />
          <CommunicationReadinessCard drafts={incidentNotifications} />
        </div>
      </div>

      <div className="grid gap-4 px-4 lg:grid-cols-2 lg:px-6">
        <IncidentCategoryWorkbench items={incidentCategorySummary} />
        <div className="space-y-4">
          <IncidentActionsPlaybook items={incidentPlaybookItems} />
          <Card>
            <CardHeader><CardTitle className="text-base">Linked Tickets</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {linkedTickets.map((ticket) => (
                <div key={ticket.id} className="rounded-md border border-border/70 p-2 text-sm">
                  <p className="font-medium">{ticket.incidentId} - {ticket.ticketId}</p>
                  <p className="text-xs text-muted-foreground">Status: {ticket.status}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <NotesResolutionLog />
          <Card>
            <CardHeader><CardTitle className="text-base">Operational Incident Legend</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2"><IncidentStatusBadge status="Escalated" /><span className="text-sm">Leadership threshold reached</span></div>
              <div className="flex items-center gap-2"><SeverityBadge severity="Critical" /><span className="text-sm">Immediate safety and system risk</span></div>
              <div className="flex items-center gap-2"><SlaBadge state="Breached" /><span className="text-sm">Response SLA exceeded</span></div>
              <Separator />
              <Badge variant="outline">NIST 800-369 aligned incident operations</Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      <IncidentDetailsSheet incident={selected} timeline={incidentTimeline} tickets={linkedTickets} open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} />
    </AdminDashboardShell>
  )
}
