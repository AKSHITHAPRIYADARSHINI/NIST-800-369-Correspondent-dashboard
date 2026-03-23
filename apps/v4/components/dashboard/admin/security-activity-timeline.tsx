import { AdminStatusBadge, severityTone } from "@/components/dashboard/admin/admin-status-badge"
import type { Severity } from "@/lib/mock-data/admin-dashboard"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import { ScrollArea } from "@/registry/new-york-v4/ui/scroll-area"

type TimelineItem = {
  id: string
  title: string
  detail: string
  severity: Severity
  at: string
}

export function SecurityActivityTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Security Activity Timeline</CardTitle>
        <CardDescription>Live operational feed for incidents, access, and governance events</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[31rem] pr-2">
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="rounded-md border border-border/70 p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{item.title}</p>
                  <AdminStatusBadge label={item.severity} tone={severityTone(item.severity)} />
                </div>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
                <p className="mt-2 text-xs text-muted-foreground">{item.at}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
