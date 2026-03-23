import type { PolicyLinkedControlItem } from "@/lib/mock-data/admin-compliance"
import { ComplianceStatusBadge } from "@/components/admin/badges/compliance-status-badge"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"

export function PolicyLinkageCard({ items }: { items: PolicyLinkedControlItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Policy & Compliance Linkage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-md border border-border/70 p-2 text-sm">
            <p className="font-medium">{item.controlTitle}</p>
            <p className="text-xs text-muted-foreground">{item.policyName} • Review {item.reviewDate}</p>
            <div className="mt-2 flex items-center gap-2">
              <ComplianceStatusBadge status={item.status} />
              {item.evidenceMissing ? (
                <Badge variant="outline" className="border-amber-400/60 text-amber-300">Evidence missing</Badge>
              ) : (
                <Badge variant="outline">Evidence linked</Badge>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

