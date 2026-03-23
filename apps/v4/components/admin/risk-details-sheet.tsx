import { IconExternalLink } from "@tabler/icons-react"

import { LikelihoodBadge } from "@/components/admin/badges/likelihood-badge"
import { RiskLevelBadge } from "@/components/admin/badges/risk-level-badge"
import { TreatmentStatusBadge } from "@/components/admin/badges/treatment-status-badge"
import type { RiskItem } from "@/lib/mock-data/admin-risk-register"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Separator } from "@/registry/new-york-v4/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/registry/new-york-v4/ui/sheet"
import { Textarea } from "@/registry/new-york-v4/ui/textarea"

export function RiskDetailsSheet({ item, open, onOpenChange }: { item: RiskItem | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl">
        {item ? (
          <>
            <SheetHeader>
              <SheetTitle>{item.riskId} - {item.title}</SheetTitle>
              <SheetDescription>Risk details, treatment workflow, linkage, and review actions</SheetDescription>
            </SheetHeader>
            <div className="mt-4 space-y-3 text-sm">
              <p>{item.description}</p>
              <div className="flex flex-wrap gap-2">
                <LikelihoodBadge likelihood={item.likelihood} />
                <RiskLevelBadge level={item.overallRisk} />
                <TreatmentStatusBadge status={item.treatmentStatus} />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <p>Domain: {item.domain}</p>
                <p>Source: {item.source}</p>
                <p>Owner: {item.owner}</p>
                <p>Affected area: {item.affectedArea}</p>
                <p>Review date: {item.reviewDate}</p>
                <p>Created: {item.createdAt}</p>
                <p>Linked tickets: {item.linkedTicketCount}</p>
                <p>Linked incidents: {item.linkedIncidentCount}</p>
                <p>Linked policy: {item.linkedPolicy || "N/A"}</p>
                <p>Linked control: {item.linkedControl || "N/A"}</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Notes</p>
                <Textarea placeholder="Add treatment notes, review outcomes, and follow-up actions" className="min-h-24" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">Update Rating</Button>
                <Button variant="outline">Add Treatment</Button>
                <Button variant="outline">Link Ticket</Button>
                <Button variant="outline">Link Incident</Button>
                <Button variant="outline">Mark Under Treatment</Button>
                <Button variant="outline">Mark Ready for Review</Button>
                <Button>Close Risk</Button>
                <Button variant="outline">Add Note</Button>
              </div>
              <Separator />
              <Button variant="ghost" size="sm" className="px-0"><IconExternalLink className="size-4" />Open related governance records</Button>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
