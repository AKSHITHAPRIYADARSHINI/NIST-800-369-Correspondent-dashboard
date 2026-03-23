import type { ApprovalChainItem } from "@/lib/mock-data/admin-users-access"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Progress } from "@/registry/new-york-v4/ui/progress"

export function IamGovernancePanel({ items }: { items: ApprovalChainItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Approval Flow / IAM Governance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-md border border-border/70 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium">{item.title}</p>
              <Badge variant={item.state === "Healthy" ? "default" : "outline"}>{item.state}</Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
            <Progress value={item.state === "Healthy" ? 92 : item.state === "Pending" ? 67 : 49} className="mt-2 h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

