import { IconDots, IconExternalLink } from "@tabler/icons-react"

import { AccessStateBadge } from "@/components/admin/badges/access-state-badge"
import { ReviewStatusBadge } from "@/components/admin/badges/review-status-badge"
import { RiskStateBadge } from "@/components/admin/badges/risk-state-badge"
import type { UserAccessItem } from "@/lib/mock-data/admin-users-access"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/new-york-v4/ui/dropdown-menu"
import { ScrollArea } from "@/registry/new-york-v4/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york-v4/ui/table"

export function UsersAccessTable({
  items,
  onOpen,
}: {
  items: UserAccessItem[]
  onOpen: (item: UserAccessItem) => void
}) {
  return (
    <ScrollArea className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Access Scope</TableHead>
            <TableHead>Granted By</TableHead>
            <TableHead>Approval Source</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead>Risk</TableHead>
            <TableHead>Review Status</TableHead>
            <TableHead>Access State</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onOpen(item)}>
              <TableCell className="font-mono text-xs">{item.userId}</TableCell>
              <TableCell>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.email}</p>
              </TableCell>
              <TableCell>{item.role}</TableCell>
              <TableCell>{item.accessScope}</TableCell>
              <TableCell>{item.grantedBy}</TableCell>
              <TableCell>{item.approvalSource}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{item.lastActiveAt}</TableCell>
              <TableCell><RiskStateBadge state={item.riskState} /></TableCell>
              <TableCell><ReviewStatusBadge status={item.reviewStatus} /></TableCell>
              <TableCell><AccessStateBadge state={item.accessState} /></TableCell>
              <TableCell className="text-right" onClick={(event) => event.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost"><IconDots className="size-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onOpen(item)}><IconExternalLink className="size-4" />Open</DropdownMenuItem>
                    <DropdownMenuItem>Edit Access</DropdownMenuItem>
                    <DropdownMenuItem>Revoke</DropdownMenuItem>
                    <DropdownMenuItem>Add Note</DropdownMenuItem>
                    <DropdownMenuItem>View Approval Chain</DropdownMenuItem>
                    <DropdownMenuItem>Assign Review</DropdownMenuItem>
                    <DropdownMenuItem>Link IAM Policy</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}

