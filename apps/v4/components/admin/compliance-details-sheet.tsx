import { IconExternalLink, IconUpload } from "@tabler/icons-react"

import { ComplianceStatusBadge } from "@/components/admin/badges/compliance-status-badge"
import { EvidenceStateBadge } from "@/components/admin/badges/evidence-state-badge"
import { ImpactBadge } from "@/components/admin/badges/impact-badge"
import type { ComplianceQueueItem } from "@/lib/mock-data/admin-compliance"
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

function dateTime(value: string) {
  return new Date(value).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
}

export function ComplianceDetailsSheet({
  item,
  open,
  onOpenChange,
}: {
  item: ComplianceQueueItem | null
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
              <SheetDescription>Control details, evidence workflow, and follow-up actions</SheetDescription>
            </SheetHeader>
            <div className="mt-4 space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-md border border-border/70 p-2">
                  <p className="text-xs text-muted-foreground">Control ID</p>
                  <p>{item.controlId}</p>
                </div>
                <div className="rounded-md border border-border/70 p-2">
                  <p className="text-xs text-muted-foreground">Domain</p>
                  <p>{item.domain}</p>
                </div>
                <div className="rounded-md border border-border/70 p-2">
                  <p className="text-xs text-muted-foreground">Linked area</p>
                  <p>{item.linkedArea}</p>
                </div>
                <div className="rounded-md border border-border/70 p-2">
                  <p className="text-xs text-muted-foreground">Linked asset</p>
                  <p>{item.linkedAsset}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <ComplianceStatusBadge status={item.status} />
                <EvidenceStateBadge state={item.evidenceState} />
                <ImpactBadge impact={item.riskImpact} />
              </div>

              <Separator />
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <p>Owner: {item.owner}</p>
                <p>Assigned: {item.assignedTo}</p>
                <p>Review date: {dateTime(item.reviewDate)}</p>
                <p>Due: {dateTime(item.dueAt)}</p>
                <p>Policy linked: {item.policyLinked ? "Yes" : "No"}</p>
                <p>Remediation linked: {item.remediationLinked ? "Yes" : "No"}</p>
              </div>

              <div>
                <p className="mb-1 text-xs text-muted-foreground">Notes</p>
                <Textarea placeholder="Add implementation notes, evidence context, and follow-up details" className="min-h-24" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">Mark In Progress</Button>
                <Button variant="outline">Mark Ready for Review</Button>
                <Button><IconUpload className="size-4" />Upload Evidence</Button>
                <Button variant="outline">Add Follow-up</Button>
                <Button variant="outline">Link Ticket</Button>
                <Button variant="outline">Link Policy</Button>
                <Button variant="outline">Escalate to Leadership</Button>
                <Button>Mark Complete</Button>
              </div>

              <Button variant="ghost" size="sm" className="px-0">
                <IconExternalLink className="size-4" />Open linked framework mapping
              </Button>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}

