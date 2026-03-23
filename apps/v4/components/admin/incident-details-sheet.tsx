import { IconExternalLink } from "@tabler/icons-react"

import { IncidentStatusBadge } from "@/components/admin/badges/incident-status-badge"
import { SeverityBadge } from "@/components/admin/badges/severity-badge"
import { SlaBadge } from "@/components/admin/badges/sla-badge"
import type { IncidentQueueItem, IncidentTimelineItem, LinkedTicketItem } from "@/lib/mock-data/admin-incidents"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Separator } from "@/registry/new-york-v4/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/registry/new-york-v4/ui/sheet"
import { ScrollArea } from "@/registry/new-york-v4/ui/scroll-area"
import { Textarea } from "@/registry/new-york-v4/ui/textarea"

function stamp(value: string) {
  return new Date(value).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
}

export function IncidentDetailsSheet({
  incident,
  timeline,
  tickets,
  open,
  onOpenChange,
}: {
  incident: IncidentQueueItem | null
  timeline: IncidentTimelineItem[]
  tickets: LinkedTicketItem[]
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl">
        {incident ? (
          <>
            <SheetHeader>
              <SheetTitle>{incident.incidentId} - {incident.title}</SheetTitle>
              <SheetDescription>Incident details, timeline, linked workflows, and next actions</SheetDescription>
            </SheetHeader>
            <div className="mt-4 space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-md border border-border/70 p-2"><p className="text-xs text-muted-foreground">Category</p><p>{incident.category}</p></div>
                <div className="rounded-md border border-border/70 p-2"><p className="text-xs text-muted-foreground">Affected area</p><p>{incident.affectedArea}</p></div>
                <div className="rounded-md border border-border/70 p-2"><p className="text-xs text-muted-foreground">Affected user</p><p>{incident.affectedUser || "N/A"}</p></div>
                <div className="rounded-md border border-border/70 p-2"><p className="text-xs text-muted-foreground">Device / app / vendor</p><p>{incident.affectedDevice || incident.affectedApp || incident.affectedVendor || "N/A"}</p></div>
              </div>

              <div className="flex flex-wrap gap-2">
                <SeverityBadge severity={incident.severity} />
                <IncidentStatusBadge status={incident.status} />
                <SlaBadge state={incident.slaState} />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <p>Source module: {incident.sourceModule}</p>
                <p>Owner: {incident.owner}</p>
                <p>Assigned: {incident.assignedTo}</p>
                <p>Created: {stamp(incident.createdAt)}</p>
                <p>Due: {stamp(incident.dueAt)}</p>
                <p>Notifications: {incident.notificationRequired}</p>
              </div>

              <Separator />
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Incident timeline</p>
                <ScrollArea className="h-28 pr-2">
                  <div className="space-y-1">
                    {timeline.filter((x) => x.incidentId === incident.incidentId).map((x) => (
                      <div key={x.id} className="rounded-md border border-border/70 p-2 text-xs">{x.label} - {x.at} - {x.by}</div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div>
                <p className="mb-1 text-xs text-muted-foreground">Linked tickets</p>
                <div className="space-y-1">
                  {tickets.filter((x) => x.incidentId === incident.incidentId).map((x) => (
                    <div key={x.id} className="rounded-md border border-border/70 p-2 text-xs">{x.ticketId} - {x.status}</div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-1 text-xs text-muted-foreground">Notes</p>
                <Textarea placeholder="Document actions, findings, communication needs, and next steps" className="min-h-24" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">Assign Owner</Button>
                <Button variant="outline">Mark In Review</Button>
                <Button variant="outline">Escalate to Leadership</Button>
                <Button variant="outline">Create / Link Ticket</Button>
                <Button variant="outline">Add Note</Button>
                <Button variant="outline">Notify Teacher</Button>
                <Button variant="outline">Notify Parent</Button>
                <Button variant="outline">Notify Correspondent / Principal</Button>
                <Button>Mark Resolved</Button>
              </div>

              <Button variant="ghost" size="sm" className="px-0"><IconExternalLink className="size-4" />Open policy/compliance linkage</Button>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
