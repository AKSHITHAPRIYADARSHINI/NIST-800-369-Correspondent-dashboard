import { IconLink, IconNotes, IconUserCheck } from "@tabler/icons-react"

import { AccessStateBadge } from "@/components/admin/badges/access-state-badge"
import { ReviewStatusBadge } from "@/components/admin/badges/review-status-badge"
import { RiskStateBadge } from "@/components/admin/badges/risk-state-badge"
import type { UserAccessItem } from "@/lib/mock-data/admin-users-access"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Separator } from "@/registry/new-york-v4/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/registry/new-york-v4/ui/sheet"
import { Textarea } from "@/registry/new-york-v4/ui/textarea"

export function UserAccessDetailsSheet({
  item,
  open,
  onOpenChange,
}: {
  item: UserAccessItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{item?.name ?? "User access details"}</SheetTitle>
          <SheetDescription>
            Review approval chain, permissions, revocation history, and IAM mapping readiness.
          </SheetDescription>
        </SheetHeader>

        {item ? (
          <div className="mt-4 space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-md border border-border/70 p-2">
                <p className="text-xs text-muted-foreground">User ID</p>
                <p className="font-mono text-xs">{item.userId}</p>
              </div>
              <div className="rounded-md border border-border/70 p-2">
                <p className="text-xs text-muted-foreground">Role</p>
                <p>{item.role}</p>
              </div>
              <div className="rounded-md border border-border/70 p-2">
                <p className="text-xs text-muted-foreground">Granted by</p>
                <p>{item.grantedBy}</p>
              </div>
              <div className="rounded-md border border-border/70 p-2">
                <p className="text-xs text-muted-foreground">Approval source</p>
                <p>{item.approvalSource}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <RiskStateBadge state={item.riskState} />
              <ReviewStatusBadge status={item.reviewStatus} />
              <AccessStateBadge state={item.accessState} />
              <Badge variant="outline">Last active: {item.lastActiveAt}</Badge>
            </div>

            <div className="rounded-md border border-border/70 p-3">
              <p className="font-medium">Approval chain</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.approvalChain}</p>
            </div>

            <div className="rounded-md border border-border/70 p-3">
              <p className="font-medium">Access and policy mapping</p>
              <p className="mt-1 text-xs text-muted-foreground">Scope: {item.accessScope}</p>
              <p className="text-xs text-muted-foreground">Policy: {item.linkedPolicy}</p>
              <p className="text-xs text-muted-foreground">IAM role: {item.linkedIamRole}</p>
            </div>

            <div className="rounded-md border border-border/70 p-3">
              <p className="font-medium">Review notes</p>
              <Textarea className="mt-2 min-h-24" placeholder="Add review notes, revocation reasons, and approval comments." />
              <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                <IconNotes className="size-3" />
                {item.notesCount} notes recorded
              </p>
            </div>

            <Separator />
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm"><IconUserCheck className="size-4" />Grant Access</Button>
              <Button size="sm" variant="outline">Modify Access</Button>
              <Button size="sm" variant="outline">Revoke Access</Button>
              <Button size="sm" variant="outline">Assign Review</Button>
              <Button size="sm" variant="outline"><IconLink className="size-4" />Link IAM Policy</Button>
              <Button size="sm" variant="outline">Add Note</Button>
              <Button size="sm" variant="outline">Notify Teacher</Button>
              <Button size="sm" variant="outline">Notify Leadership</Button>
            </div>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}

