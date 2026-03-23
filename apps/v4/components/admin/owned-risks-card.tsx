import type { OwnedRiskItem } from "@/lib/mock-data/admin-risk-register"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Button } from "@/registry/new-york-v4/ui/button"

export function OwnedRisksCard({ items }: { items: OwnedRiskItem[] }) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">My Owned Risks</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-md border border-border/70 p-2">
            <p className="text-sm font-medium">{item.title}</p>
            <p className="text-xs text-muted-foreground">{item.state}</p>
            <div className="mt-2 flex gap-1">
              <Button size="sm" variant="outline">Open</Button>
              <Button size="sm" variant="outline">Update</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
