import { IconDotsVertical } from "@tabler/icons-react"

import { IncidentStatusBadge } from "@/components/admin/badges/incident-status-badge"
import { SeverityBadge } from "@/components/admin/badges/severity-badge"
import { SlaBadge } from "@/components/admin/badges/sla-badge"
import type { IncidentQueueItem } from "@/lib/mock-data/admin-incidents"
import { Button } from "@/registry/new-york-v4/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/registry/new-york-v4/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/new-york-v4/ui/table"

function shortDate(value: string) {
  return new Date(value).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
}

export function IncidentsQueueTable({
  items,
  onOpen,
}: {
  items: IncidentQueueItem[]
  onOpen: (item: IncidentQueueItem) => void
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Incident ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Affected Area</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>SLA / Due</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id} className="cursor-pointer" onClick={() => onOpen(item)}>
            <TableCell className="font-medium">{item.incidentId}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>{item.affectedArea}</TableCell>
            <TableCell><SeverityBadge severity={item.severity} /></TableCell>
            <TableCell><IncidentStatusBadge status={item.status} /></TableCell>
            <TableCell>{item.owner}</TableCell>
            <TableCell>{shortDate(item.createdAt)}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <SlaBadge state={item.slaState} />
                <p className="text-xs text-muted-foreground">Due {shortDate(item.dueAt)}</p>
              </div>
            </TableCell>
            <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-end gap-1">
                <Button size="sm" variant="outline" onClick={() => onOpen(item)}>Open</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8"><IconDotsVertical className="size-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => onOpen(item)}>Assign</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onOpen(item)}>Escalate</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onOpen(item)}>Link Ticket</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onOpen(item)}>Add Note</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onOpen(item)}>Mark In Review</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onOpen(item)}>Notify</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onOpen(item)}>Resolve</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
