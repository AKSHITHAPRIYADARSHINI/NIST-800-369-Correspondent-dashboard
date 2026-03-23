import type { IncidentCategorySummaryItem } from "@/lib/mock-data/admin-incidents"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/new-york-v4/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Progress } from "@/registry/new-york-v4/ui/progress"

export function IncidentCategoryWorkbench({ items }: { items: IncidentCategorySummaryItem[] }) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Incident Category Workbench</CardTitle></CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {items.map((item) => {
            const health = Math.max(0, 100 - item.critical * 10 - item.pendingCommunication * 6)
            return (
              <AccordionItem key={item.category} value={item.category}>
                <AccordionTrigger>{item.category}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-md border border-border/70 p-2">Total: {item.total}</div>
                      <div className="rounded-md border border-border/70 p-2">Critical: {item.critical}</div>
                      <div className="rounded-md border border-border/70 p-2">In review: {item.inReview}</div>
                      <div className="rounded-md border border-border/70 p-2">Linked remediation: {item.linkedRemediation}</div>
                      <div className="rounded-md border border-border/70 p-2">Pending communication: {item.pendingCommunication}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-muted-foreground"><span>Category health</span><span>{health}%</span></div>
                      <Progress value={health} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </CardContent>
    </Card>
  )
}
