import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Button } from "@/registry/new-york-v4/ui/button"

export function PriorityActionsCard({ items }: { items: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Priority Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => (
          <div key={item} className="rounded-md border border-border/70 p-2">
            <p className="text-sm">{item}</p>
            <div className="mt-2 flex gap-1">
              <Button size="sm" variant="outline">Review</Button>
              <Button size="sm" variant="outline">Assign</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

