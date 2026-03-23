import { IconAlertTriangle, IconDeviceLaptop, IconLink, IconNotes, IconUser } from "@tabler/icons-react"

import { AppRiskBadge } from "@/components/admin/badges/app-risk-badge"
import { DeviceRiskBadge } from "@/components/admin/badges/device-risk-badge"
import { DeviceTrustBadge } from "@/components/admin/badges/device-trust-badge"
import type { DeviceItem } from "@/lib/mock-data/admin-devices"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Separator } from "@/registry/new-york-v4/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/registry/new-york-v4/ui/sheet"
import { Textarea } from "@/registry/new-york-v4/ui/textarea"

export function DeviceDetailsSheet({
  item,
  open,
  onOpenChange,
}: {
  item: DeviceItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{item?.deviceName ?? "Device details"}</SheetTitle>
          <SheetDescription>
            Review trust state, login context, flagged applications, and operational next actions.
          </SheetDescription>
        </SheetHeader>

        {item ? (
          <div className="mt-4 space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-md border border-border/70 p-2">
                <p className="text-xs text-muted-foreground">Device ID</p>
                <p className="font-mono text-xs">{item.deviceId}</p>
              </div>
              <div className="rounded-md border border-border/70 p-2">
                <p className="text-xs text-muted-foreground">Device Type</p>
                <p>{item.deviceType}</p>
              </div>
              <div className="rounded-md border border-border/70 p-2">
                <p className="text-xs text-muted-foreground">Owner</p>
                <p className="inline-flex items-center gap-1"><IconUser className="size-3" />{item.ownerName}</p>
              </div>
              <div className="rounded-md border border-border/70 p-2">
                <p className="text-xs text-muted-foreground">Role</p>
                <p>{item.ownerRole}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <DeviceTrustBadge trust={item.trustState} />
              <DeviceRiskBadge level={item.riskLevel} />
              <Badge variant="outline">Patch: {item.patchStatus}</Badge>
              <Badge variant="outline">Encryption: {item.encryptionStatus}</Badge>
            </div>

            <div className="rounded-md border border-border/70 p-3">
              <p className="font-medium">Login activity</p>
              <p className="mt-1 text-xs text-muted-foreground">Last login: {item.lastLoginAt}</p>
              <p className="text-xs text-muted-foreground">Active sessions: {item.activeSessionCount}</p>
            </div>

            <div className="rounded-md border border-border/70 p-3">
              <p className="font-medium">Flagged applications</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="outline">{item.flaggedAppCount} flagged</Badge>
                <AppRiskBadge status={item.maliciousAppCount > 0 ? "Malicious" : item.vulnerableAppCount > 0 ? "Vulnerable" : "Safe"} />
                <Badge variant="outline">{item.maliciousAppCount} malicious</Badge>
                <Badge variant="outline">{item.vulnerableAppCount} vulnerable</Badge>
              </div>
            </div>

            <div className="rounded-md border border-border/70 p-3">
              <p className="font-medium">Notes and activity log</p>
              <Textarea className="mt-2 min-h-24" placeholder="Add operational notes, validation context, and follow-up actions." />
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <IconNotes className="size-3" />
                {item.notesCount} notes recorded
              </div>
            </div>

            <Separator />
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm">Mark Trusted</Button>
              <Button size="sm" variant="outline">Mark Under Review</Button>
              <Button size="sm" variant="outline"><IconAlertTriangle className="size-4" />Restrict Device</Button>
              <Button size="sm" variant="outline">Revoke Session Access</Button>
              <Button size="sm" variant="outline"><IconLink className="size-4" />Create Ticket</Button>
              <Button size="sm" variant="outline">Add Note</Button>
              <Button size="sm" variant="outline"><IconDeviceLaptop className="size-4" />Notify Teacher</Button>
              <Button size="sm" variant="outline">Notify Leadership</Button>
            </div>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}

