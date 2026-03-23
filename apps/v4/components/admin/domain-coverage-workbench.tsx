import type { DomainCoverageItem } from "@/lib/mock-data/admin-compliance"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/new-york-v4/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Progress } from "@/registry/new-york-v4/ui/progress"

export function DomainCoverageWorkbench({ items }: { items: DomainCoverageItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Domain Coverage Workbench</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {items.map((item) => {
            const readiness = Math.max(0, 100 - item.overdue * 6 - item.missingEvidence * 5)
            return (
              <AccordionItem key={item.domain} value={item.domain}>
                <AccordionTrigger>{item.domain}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-md border border-border/70 p-2">Controls: {item.controlCount}</div>
                      <div className="rounded-md border border-border/70 p-2">In review: {item.inReview}</div>
                      <div className="rounded-md border border-border/70 p-2">Missing evidence: {item.missingEvidence}</div>
                      <div className="rounded-md border border-border/70 p-2">Overdue: {item.overdue}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Domain readiness</span>
                        <span>{readiness}%</span>
                      </div>
                      <Progress value={readiness} />
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

