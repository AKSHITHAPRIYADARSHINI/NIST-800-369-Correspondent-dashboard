import { IconAlertTriangle } from "@tabler/icons-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { ScrollArea } from "@/registry/new-york-v4/ui/scroll-area"

export function PriorityActionQueue({ items }: { items: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Priority Action Queue</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-56 pr-2">
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item} className="flex items-start gap-2 rounded-md border border-border/70 p-2 text-sm">
                <IconAlertTriangle className="mt-0.5 size-4 text-amber-300" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
