import { IconDownload, IconExternalLink } from "@tabler/icons-react"

import { DeviceTrustBadge } from "@/components/admin/badges/device-trust-badge"
import { QueueStatusBadge } from "@/components/admin/badges/queue-status-badge"
import { RiskBadge } from "@/components/admin/badges/risk-badge"
import type { OperationsQueueItem } from "@/lib/mock-data/security-operations"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Separator } from "@/registry/new-york-v4/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/registry/new-york-v4/ui/sheet"
import { Textarea } from "@/registry/new-york-v4/ui/textarea"

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
}

export function OperationDetailsSheet({
  item,
  open,
  onOpenChange,
}: {
  item: OperationsQueueItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl">
        {item ? (
          <>
            <SheetHeader>
              <SheetTitle>{item.title}</SheetTitle>
              <SheetDescription>Operational event details and recommended actions</SheetDescription>
            </SheetHeader>

            <div className="mt-4 space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-md border border-border/70 p-2">
                  <p className="text-xs text-muted-foreground">User</p>
                  <p>{item.userName}</p>
                </div>
                <div className="rounded-md border border-border/70 p-2">
                  <p className="text-xs text-muted-foreground">Role</p>
                  <p>{item.userRole}</p>
                </div>
                <div className="rounded-md border border-border/70 p-2">
                  <p className="text-xs text-muted-foreground">Device</p>
                  <p>{item.deviceName}</p>
                </div>
                <div className="rounded-md border border-border/70 p-2">
                  <p className="text-xs text-muted-foreground">Source module</p>
                  <p>{item.sourceModule}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <RiskBadge level={item.riskLevel} />
                <QueueStatusBadge status={item.status} />
                <DeviceTrustBadge trust={item.deviceTrust} />
              </div>

              <Separator />
              <div>
                <p className="text-xs text-muted-foreground">Risk rationale</p>
                <p>{item.riskRationale}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>Created: {formatDate(item.createdAt)}</div>
                <div>Due: {formatDate(item.dueAt)}</div>
                <div>Assigned: {item.assignedTo}</div>
                <div>Notes: {item.notesCount}</div>
              </div>

              <div>
                <p className="mb-1 text-xs text-muted-foreground">Notes</p>
                <Textarea placeholder="Add operational notes and verification findings" className="min-h-24" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button>Approve / Mark Safe</Button>
                <Button variant="outline">Request Investigation</Button>
                <Button variant="outline">Notify Teacher</Button>
                <Button variant="outline">Notify Parent</Button>
                <Button variant="outline">Escalate to Leadership</Button>
                <Button variant="outline">Create Ticket</Button>
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="sm"><IconExternalLink className="size-4" />Open Linked Policy</Button>
                <Button variant="ghost" size="sm"><IconDownload className="size-4" />Export Record</Button>
              </div>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}

