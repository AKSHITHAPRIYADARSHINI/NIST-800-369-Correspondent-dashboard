import type { RevocationCandidate } from "@/lib/mock-data/admin-users-access"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"

export function RevocationReviewWorkspace({ items }: { items: RevocationCandidate[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Revocation & Review Workspace</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-md border border-border/70 p-2 text-sm">
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium">{item.user}</p>
              <Badge variant="outline">{item.riskState}</Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{item.reason}</p>
            <div className="mt-2 flex gap-2">
              <Button size="sm" variant="outline">Revoke</Button>
              <Button size="sm" variant="outline">Schedule Review</Button>
              <Button size="sm" variant="outline">Escalate</Button>
              <Button size="sm" variant="outline">Add Exception</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

