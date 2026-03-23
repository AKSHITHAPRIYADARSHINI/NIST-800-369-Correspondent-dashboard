import { Button } from "@/registry/new-york-v4/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"

export function PriorityAccessActionsCard({ items }: { items: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Priority Access Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => (
          <div key={item} className="rounded-md border border-border/70 p-2 text-sm">
            <p>{item}</p>
            <div className="mt-2 flex gap-2">
              <Button variant="outline" size="sm">Open</Button>
              <Button variant="outline" size="sm">Assign</Button>
              <Button variant="outline" size="sm">Review</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

