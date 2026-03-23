import { IconDots, IconExternalLink } from "@tabler/icons-react"

import { AppRiskBadge } from "@/components/admin/badges/app-risk-badge"
import { DeviceRiskBadge } from "@/components/admin/badges/device-risk-badge"
import { DeviceTrustBadge } from "@/components/admin/badges/device-trust-badge"
import type { DeviceItem } from "@/lib/mock-data/admin-devices"
import { Badge } from "@/registry/new-york-v4/ui/badge"
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

export function DevicesTable({
  items,
  onOpen,
}: {
  items: DeviceItem[]
  onOpen: (item: DeviceItem) => void
}) {
  return (
    <ScrollArea className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Device ID</TableHead>
            <TableHead>Device Name</TableHead>
            <TableHead>User / Owner</TableHead>
            <TableHead>User Role</TableHead>
            <TableHead>Device Type</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Trust State</TableHead>
            <TableHead>Risk</TableHead>
            <TableHead>App Flags</TableHead>
            <TableHead>Patch</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onOpen(item)}>
              <TableCell className="font-mono text-xs">{item.deviceId}</TableCell>
              <TableCell className="font-medium">{item.deviceName}</TableCell>
              <TableCell>{item.ownerName}</TableCell>
              <TableCell>{item.ownerRole}</TableCell>
              <TableCell>{item.deviceType}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{item.lastLoginAt}</TableCell>
              <TableCell><DeviceTrustBadge trust={item.trustState} /></TableCell>
              <TableCell><DeviceRiskBadge level={item.riskLevel} /></TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Badge variant="outline">{item.flaggedAppCount}</Badge>
                  <AppRiskBadge status={item.maliciousAppCount > 0 ? "Malicious" : item.vulnerableAppCount > 0 ? "Vulnerable" : "Safe"} />
                </div>
              </TableCell>
              <TableCell>{item.patchStatus}</TableCell>
              <TableCell className="text-right" onClick={(event) => event.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost"><IconDots className="size-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onOpen(item)}><IconExternalLink className="size-4" />Open</DropdownMenuItem>
                    <DropdownMenuItem>Log Review</DropdownMenuItem>
                    <DropdownMenuItem>Add Note</DropdownMenuItem>
                    <DropdownMenuItem>Assign Remediation</DropdownMenuItem>
                    <DropdownMenuItem>Mark Trusted</DropdownMenuItem>
                    <DropdownMenuItem>Restrict</DropdownMenuItem>
                    <DropdownMenuItem>Revoke Access</DropdownMenuItem>
                    <DropdownMenuItem>Link Ticket</DropdownMenuItem>
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

