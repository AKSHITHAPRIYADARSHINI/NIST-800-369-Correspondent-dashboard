import { IconDotsVertical } from "@tabler/icons-react"

import { ComplianceStatusBadge } from "@/components/admin/badges/compliance-status-badge"
import { EvidenceStateBadge } from "@/components/admin/badges/evidence-state-badge"
import { ImpactBadge } from "@/components/admin/badges/impact-badge"
import type { ComplianceQueueItem } from "@/lib/mock-data/admin-compliance"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/new-york-v4/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york-v4/ui/table"

function dateLabel(value: string) {
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export function ComplianceQueueTable({
  items,
  onOpen,
}: {
  items: ComplianceQueueItem[]
  onOpen: (item: ComplianceQueueItem) => void
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Control / Requirement</TableHead>
          <TableHead>Domain</TableHead>
          <TableHead>Linked Asset / Area</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Evidence</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Review Date</TableHead>
          <TableHead>Risk Impact</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id} className="cursor-pointer" onClick={() => onOpen(item)}>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>{item.domain}</TableCell>
            <TableCell>{item.linkedAsset}</TableCell>
            <TableCell><ComplianceStatusBadge status={item.status} /></TableCell>
            <TableCell><EvidenceStateBadge state={item.evidenceState} /></TableCell>
            <TableCell>{item.owner}</TableCell>
            <TableCell>{dateLabel(item.reviewDate)}</TableCell>
            <TableCell><ImpactBadge impact={item.riskImpact} /></TableCell>
            <TableCell className="text-right" onClick={(event) => event.stopPropagation()}>
              <div className="flex justify-end gap-1">
                <Button size="sm" variant="outline" onClick={() => onOpen(item)}>Open</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <IconDotsVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => onOpen(item)}>Update Status</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onOpen(item)}>Upload Evidence</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onOpen(item)}>Add Note</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onOpen(item)}>Link Policy</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onOpen(item)}>Create Follow-up Task</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onOpen(item)}>Escalate</DropdownMenuItem>
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

