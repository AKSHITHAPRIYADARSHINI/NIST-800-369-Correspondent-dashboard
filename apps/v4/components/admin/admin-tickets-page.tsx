"use client"

import * as React from "react"
import { DndContext, DragEndEvent, DragStartEvent, PointerSensor, closestCorners, useSensor, useSensors } from "@dnd-kit/core"

import { AssignedTicketsCard } from "@/components/admin/assigned-tickets-card"
import { PriorityBadge } from "@/components/admin/badges/priority-badge"
import { RiskUpdateReadyCard } from "@/components/admin/risk-update-ready-card"
import { PriorityTicketsCard } from "@/components/admin/priority-tickets-card"
import { TicketActivityFeed } from "@/components/admin/ticket-activity-feed"
import { TicketBoardColumn } from "@/components/admin/ticket-board-column"
import { TicketDetailsSheet } from "@/components/admin/ticket-details-sheet"
import { TicketFilterToolbar, initialTicketFilters } from "@/components/admin/ticket-filter-toolbar"
import { TicketMetricCard } from "@/components/admin/ticket-metric-card"
import { TicketsPageHeader } from "@/components/admin/tickets-page-header"
import { AdminDashboardShell } from "@/components/dashboard/admin/admin-dashboard-shell"
import { assignedTickets, riskUpdateReadyItems, ticketActivity, ticketMetrics, tickets, type TicketItem, type TicketStatusColumn } from "@/lib/mock-data/admin-tickets"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/registry/new-york-v4/ui/dialog"
import { Separator } from "@/registry/new-york-v4/ui/separator"

const columns: TicketStatusColumn[] = ["Created", "Escalation", "Review", "Auditing", "Done"]

function isOverdue(value: string) {
  return new Date(value).getTime() < Date.now()
}

export function AdminTicketsPage() {
  const [board, setBoard] = React.useState<TicketItem[]>(tickets)
  const [filters, setFilters] = React.useState(initialTicketFilters)
  const [selected, setSelected] = React.useState<TicketItem | null>(null)
  const [activeTicketId, setActiveTicketId] = React.useState<string | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  const filtered = React.useMemo(() => {
    return board.filter((item) => {
      const text = `${item.ticketNo} ${item.title} ${item.linkedUser} ${item.linkedDevice}`.toLowerCase()
      const searchMatch = text.includes(filters.search.toLowerCase())
      const priorityMatch = filters.priority === "all" || item.priority === filters.priority
      const categoryMatch = filters.category === "all" || item.category === filters.category
      const assignedMatch = filters.assignedTo === "all" || item.assignedTo === filters.assignedTo
      const areaMatch = filters.linkedArea === "all" || item.linkedArea === filters.linkedArea
      const overdueMatch = !filters.overdue || isOverdue(item.dueAt)
      const mineMatch = !filters.mineOnly || item.assignedTo === "A. Singh"
      const highMatch = !filters.highPriorityOnly || item.priority === "High" || item.priority === "Critical"
      const unresolvedMatch = !filters.unresolvedOnly || item.statusColumn !== "Done"
      const incidentMatch = !filters.linkedToIncidents || item.incidentLinked
      const riskReadyMatch = !filters.readyForRiskUpdate || item.riskUpdateEligible
      return searchMatch && priorityMatch && categoryMatch && assignedMatch && areaMatch && overdueMatch && mineMatch && highMatch && unresolvedMatch && incidentMatch && riskReadyMatch
    })
  }, [board, filters])

  const grouped = React.useMemo(() => {
    return columns.reduce<Record<TicketStatusColumn, TicketItem[]>>((acc, col) => {
      const list = filtered.filter((item) => item.statusColumn === col)
      const sorted = [...list].sort((a, b) => {
        const order = { Critical: 0, High: 1, Medium: 2, Low: 3 }
        return order[a.priority] - order[b.priority]
      })
      acc[col] = sorted
      return acc
    }, { Created: [], Escalation: [], Review: [], Auditing: [], Done: [] })
  }, [filtered])

  const findTicket = React.useCallback((id: string) => board.find((t) => t.id === id), [board])

  const onDragStart = (event: DragStartEvent) => {
    const id = String(event.active.id)
    setActiveTicketId(id)
  }

  const onDragEnd = (event: DragEndEvent) => {
    setActiveTicketId(null)
    const activeId = String(event.active.id)
    if (!event.over) return

    const overId = String(event.over.id)
    const moved = findTicket(activeId)
    if (!moved) return

    const overTicket = findTicket(overId)
    const targetColumn: TicketStatusColumn = overTicket ? overTicket.statusColumn : (overId as TicketStatusColumn)

    setBoard((prev) => prev.map((item) => {
      if (item.id !== activeId) return item
      const done = targetColumn === "Done"
      return { ...item, statusColumn: targetColumn, completed: done }
    }))
  }

  return (
    <AdminDashboardShell>
      <TicketsPageHeader
        actions={
          <>
            <Dialog>
              <DialogTrigger asChild><Button size="sm">Create Ticket</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Create Ticket</DialogTitle><DialogDescription>Create a new operational work item and assign ownership.</DialogDescription></DialogHeader>
                <DialogFooter><Button variant="outline">Save Draft</Button><Button>Create</Button></DialogFooter>
              </DialogContent>
            </Dialog>
            <Button size="sm" variant="outline">Bulk Update</Button>
            <Button size="sm" variant="outline">Quick Create</Button>
          </>
        }
      />

      <div className="grid gap-4 px-4 lg:grid-cols-6 lg:px-6">
        {ticketMetrics.map((m) => <TicketMetricCard key={m.id} label={m.label} count={m.count} context={m.context} badge={m.badge} />)}
      </div>

      <div className="grid gap-4 px-4 lg:grid-cols-[2fr_1fr] lg:px-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Board</CardTitle>
              <CardDescription>Drag cards across workflow stages to track operational execution.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <TicketFilterToolbar filters={filters} onFiltersChange={setFilters} />
              <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <div className="grid gap-3 xl:grid-cols-5">
                  {columns.map((col) => (
                    <TicketBoardColumn key={col} title={col} tickets={grouped[col]} onOpen={setSelected} />
                  ))}
                </div>
              </DndContext>
              {activeTicketId ? <Badge variant="outline">Moving {findTicket(activeTicketId)?.ticketNo}</Badge> : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Ticket Workflow Guidance</CardTitle></CardHeader>
            <CardContent className="grid gap-2 md:grid-cols-5 text-sm">
              <div className="rounded-md border border-border/70 p-2"><p className="font-medium">Created</p><p className="text-xs text-muted-foreground">Validate and classify</p></div>
              <div className="rounded-md border border-border/70 p-2"><p className="font-medium">Escalation</p><p className="text-xs text-muted-foreground">Assign and prioritize</p></div>
              <div className="rounded-md border border-border/70 p-2"><p className="font-medium">Review</p><p className="text-xs text-muted-foreground">Verify remediation progress</p></div>
              <div className="rounded-md border border-border/70 p-2"><p className="font-medium">Auditing</p><p className="text-xs text-muted-foreground">Confirm closure quality</p></div>
              <div className="rounded-md border border-border/70 p-2"><p className="font-medium">Done</p><p className="text-xs text-muted-foreground">Close and update risk register</p></div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <PriorityTicketsCard items={[
            "TCK-2035 critical auth follow-up requires escalation",
            "TCK-2036 vendor privacy annex review pending",
            "TCK-2034 student device trust validation due soon",
          ]} />
          <TicketActivityFeed items={ticketActivity} />
          <AssignedTicketsCard tasks={assignedTickets} />
          <RiskUpdateReadyCard items={riskUpdateReadyItems} />
        </div>
      </div>

      <TicketDetailsSheet ticket={selected} open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} />

      <div className="px-4 pb-2 lg:px-6">
        <Separator className="mb-3" />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <PriorityBadge priority="Critical" />
          <span>NIST 800-369 operations flow: ticket progress drives incident closure and risk register updates.</span>
        </div>
      </div>
    </AdminDashboardShell>
  )
}
