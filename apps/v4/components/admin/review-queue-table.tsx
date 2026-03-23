import { IconDotsVertical } from "@tabler/icons-react"

import { DeviceTrustBadge } from "@/components/admin/badges/device-trust-badge"
import { QueueStatusBadge } from "@/components/admin/badges/queue-status-badge"
import { RiskBadge } from "@/components/admin/badges/risk-badge"
import type { OperationsQueueItem } from "@/lib/mock-data/security-operations"
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

function dueLabel(value: string) {
  return new Date(value).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
}

export function ReviewQueueTable({
  items,
  onReview,
}: {
  items: OperationsQueueItem[]
  onReview: (item: OperationsQueueItem) => void
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Event / Task</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Risk</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead>Due</TableHead>
          <TableHead>Device Trust</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id} className="cursor-pointer" onClick={() => onReview(item)}>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>{item.userName}</TableCell>
            <TableCell>{item.userRole}</TableCell>
            <TableCell>{item.sourceModule}</TableCell>
            <TableCell><RiskBadge level={item.riskLevel} /></TableCell>
            <TableCell><QueueStatusBadge status={item.status} /></TableCell>
            <TableCell>{item.assignedTo}</TableCell>
            <TableCell>{dueLabel(item.dueAt)}</TableCell>
            <TableCell><DeviceTrustBadge trust={item.deviceTrust} /></TableCell>
            <TableCell className="text-right" onClick={(event) => event.stopPropagation()}>
              <div className="flex justify-end gap-1">
                <Button size="sm" variant="outline" onClick={() => onReview(item)}>Review</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <IconDotsVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => onReview(item)}>Assign</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onReview(item)}>Mark safe</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onReview(item)}>Escalate</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onReview(item)}>Notify</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onReview(item)}>Open details</DropdownMenuItem>
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

