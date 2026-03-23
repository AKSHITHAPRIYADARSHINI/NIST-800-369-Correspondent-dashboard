import type { AccessActivityItem } from "@/lib/mock-data/admin-users-access"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { ScrollArea } from "@/registry/new-york-v4/ui/scroll-area"

export function AccessActivityFeed({ items }: { items: AccessActivityItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Access Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 pr-3">
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="rounded-md border border-border/70 p-2 text-sm">
                <p>{item.message}</p>
                <p className="text-xs text-muted-foreground">{item.actor} • {item.time}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

