import { IconExternalLink } from "@tabler/icons-react"

import { PriorityBadge } from "@/components/admin/badges/priority-badge"
import { TicketStatusBadge } from "@/components/admin/badges/ticket-status-badge"
import type { TicketItem } from "@/lib/mock-data/admin-tickets"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Separator } from "@/registry/new-york-v4/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/registry/new-york-v4/ui/sheet"
import { Textarea } from "@/registry/new-york-v4/ui/textarea"

function stamp(value: string) {
  return new Date(value).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
}

export function TicketDetailsSheet({
  ticket,
  open,
  onOpenChange,
}: {
  ticket: TicketItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl">
        {ticket ? (
          <>
            <SheetHeader>
              <SheetTitle>{ticket.ticketNo} - {ticket.title}</SheetTitle>
              <SheetDescription>Ticket details, operational metadata, and workflow actions</SheetDescription>
            </SheetHeader>
            <div className="mt-4 space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-md border border-border/70 p-2"><p className="text-xs text-muted-foreground">Category</p><p>{ticket.category}</p></div>
                <div className="rounded-md border border-border/70 p-2"><p className="text-xs text-muted-foreground">Priority</p><PriorityBadge priority={ticket.priority} /></div>
                <div className="rounded-md border border-border/70 p-2"><p className="text-xs text-muted-foreground">Raised by</p><p>{ticket.raisedBy}</p></div>
                <div className="rounded-md border border-border/70 p-2"><p className="text-xs text-muted-foreground">Assigned</p><p>{ticket.assignedTo}</p></div>
              </div>

              <p className="text-sm">{ticket.description}</p>

              <div className="flex flex-wrap gap-2">
                <TicketStatusBadge status={ticket.statusColumn} />
                {ticket.incidentLinked ? <Button size="sm" variant="outline">Linked Incident</Button> : null}
                {ticket.complianceLinked ? <Button size="sm" variant="outline">Linked Compliance</Button> : null}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <p>Due: {stamp(ticket.dueAt)}</p>
                <p>Created: {stamp(ticket.createdAt)}</p>
                <p>Linked user: {ticket.linkedUser || "N/A"}</p>
                <p>Linked device: {ticket.linkedDevice || "N/A"}</p>
                <p>Linked app: {ticket.linkedApp || "N/A"}</p>
                <p>Linked vendor: {ticket.linkedVendor || "N/A"}</p>
              </div>

              <div>
                <p className="mb-1 text-xs text-muted-foreground">Notes</p>
                <Textarea placeholder="Add ticket notes, remediation updates, and closure summary" className="min-h-24" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">Reassign</Button>
                <Button variant="outline">Escalate</Button>
                <Button variant="outline">Move to Review</Button>
                <Button variant="outline">Move to Auditing</Button>
                <Button>Mark Done</Button>
                <Button variant="outline">Add Note</Button>
                <Button variant="outline">Link Risk</Button>
                <Button variant="outline">Link Incident</Button>
              </div>

              <Separator />
              <Button variant="ghost" size="sm" className="px-0"><IconExternalLink className="size-4" />Open activity and evidence history</Button>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
