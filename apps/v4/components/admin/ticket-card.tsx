"use client"

import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"
import { IconPaperclip, IconNotes } from "@tabler/icons-react"

import { PriorityBadge } from "@/components/admin/badges/priority-badge"
import { TicketStatusBadge } from "@/components/admin/badges/ticket-status-badge"
import type { TicketItem } from "@/lib/mock-data/admin-tickets"
import { Card, CardContent, CardHeader } from "@/registry/new-york-v4/ui/card"

export function TicketCard({ ticket, onOpen }: { ticket: TicketItem; onOpen: (ticket: TicketItem) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: ticket.id, data: { type: "ticket", ticket } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  }

  return (
    <Card ref={setNodeRef} style={style} className={`cursor-pointer ${ticket.completed ? "opacity-70" : ""}`} {...attributes} {...listeners} onClick={() => onOpen(ticket)}>
      <CardHeader className="space-y-1 pb-2">
        <p className="text-xs text-muted-foreground">{ticket.ticketNo}</p>
        <p className={`text-sm font-medium ${ticket.completed ? "line-through" : ""}`}>{ticket.title}</p>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        <div className="flex flex-wrap gap-1">
          <PriorityBadge priority={ticket.priority} />
          <TicketStatusBadge status={ticket.statusColumn} />
        </div>
        <p className="text-xs text-muted-foreground">{ticket.category}</p>
        <p className="text-xs text-muted-foreground">Assigned: {ticket.assignedTo}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><IconNotes className="size-3" />{ticket.notesCount}</span>
          <span className="inline-flex items-center gap-1"><IconPaperclip className="size-3" />{ticket.attachmentCount}</span>
        </div>
      </CardContent>
    </Card>
  )
}
