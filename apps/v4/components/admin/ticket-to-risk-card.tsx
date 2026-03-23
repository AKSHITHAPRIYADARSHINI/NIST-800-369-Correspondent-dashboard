import type { TicketToRiskItem } from "@/lib/mock-data/admin-risk-register"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Badge } from "@/registry/new-york-v4/ui/badge"

function recommendationBadge(value: TicketToRiskItem["recommendation"]) {
  if (value === "Create new risk entry") return <Badge className="bg-red-600/90 text-white">Create new risk entry</Badge>
  if (value === "Update existing risk") return <Badge className="bg-blue-600/80 text-white">Update existing risk</Badge>
  return <Badge variant="outline">No risk update needed</Badge>
}

export function TicketToRiskCard({ items }: { items: TicketToRiskItem[] }) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Ticket-to-Risk Conversion</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-md border border-border/70 p-2">
            <p className="text-sm font-medium">{item.ticketNo} - {item.title}</p>
            <div className="mt-1">{recommendationBadge(item.recommendation)}</div>
            <div className="mt-2 flex gap-1">
              <Button size="sm" variant="outline">Create</Button>
              <Button size="sm" variant="outline">Update</Button>
              <Button size="sm" variant="outline">Ignore</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
