import { IconCircleDot } from "@tabler/icons-react"

import type { ActivityItem } from "@/lib/mock-data/security-operations"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { ScrollArea } from "@/registry/new-york-v4/ui/scroll-area"

export function SecurityActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Security Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 pr-2">
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="rounded-md border border-border/70 p-2">
                <div className="mb-1 flex items-center gap-2 text-sm font-medium">
                  <IconCircleDot className="size-3.5 text-primary" />
                  {item.action}
                </div>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.actor} - {item.at}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

