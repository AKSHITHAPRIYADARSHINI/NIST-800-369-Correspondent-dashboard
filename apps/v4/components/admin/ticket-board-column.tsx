"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

import { TicketCard } from "@/components/admin/ticket-card"
import type { TicketItem, TicketStatusColumn } from "@/lib/mock-data/admin-tickets"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { ScrollArea } from "@/registry/new-york-v4/ui/scroll-area"

export function TicketBoardColumn({
  title,
  tickets,
  onOpen,
}: {
  title: TicketStatusColumn
  tickets: TicketItem[]
  onOpen: (ticket: TicketItem) => void
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: title,
    data: { type: "column", column: title },
  })

  return (
    <Card className={`min-h-[28rem] ${isOver ? "border-primary/50" : ""}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm">
          <span>{title}</span>
          <Badge variant="outline">{tickets.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent ref={setNodeRef}>
        <ScrollArea className="h-[25rem] pr-2">
          <SortableContext items={tickets.map((x) => x.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} onOpen={onOpen} />
              ))}
            </div>
          </SortableContext>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
