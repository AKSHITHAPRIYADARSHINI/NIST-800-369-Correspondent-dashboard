import { IconDotsVertical } from "@tabler/icons-react"

import { LikelihoodBadge } from "@/components/admin/badges/likelihood-badge"
import { RiskLevelBadge } from "@/components/admin/badges/risk-level-badge"
import { TreatmentStatusBadge } from "@/components/admin/badges/treatment-status-badge"
import type { RiskItem } from "@/lib/mock-data/admin-risk-register"
import { Button } from "@/registry/new-york-v4/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/registry/new-york-v4/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/new-york-v4/ui/table"

function dateLabel(value: string) {
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export function RiskRegisterTable({ items, onOpen }: { items: RiskItem[]; onOpen: (item: RiskItem) => void }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Risk ID</TableHead>
          <TableHead>Risk Title</TableHead>
          <TableHead>Domain</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Likelihood</TableHead>
          <TableHead>Impact</TableHead>
          <TableHead>Overall Risk</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Treatment Status</TableHead>
          <TableHead>Review Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id} className="cursor-pointer" onClick={() => onOpen(item)}>
            <TableCell className="font-medium">{item.riskId}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.domain}</TableCell>
            <TableCell>{item.source}</TableCell>
            <TableCell><LikelihoodBadge likelihood={item.likelihood} /></TableCell>
            <TableCell>{item.impact}</TableCell>
            <TableCell><RiskLevelBadge level={item.overallRisk} /></TableCell>
            <TableCell>{item.owner}</TableCell>
            <TableCell><TreatmentStatusBadge status={item.treatmentStatus} /></TableCell>
            <TableCell>{dateLabel(item.reviewDate)}</TableCell>
            <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-end gap-1">
                <Button size="sm" variant="outline" onClick={() => onOpen(item)}>Open</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild><Button size="icon" variant="ghost" className="size-8"><IconDotsVertical className="size-4" /></Button></DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => onOpen(item)}>Update Rating</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onOpen(item)}>Add Treatment</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onOpen(item)}>Link Ticket</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onOpen(item)}>Link Incident</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onOpen(item)}>Close Risk</DropdownMenuItem>
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
