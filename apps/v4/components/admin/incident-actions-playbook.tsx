import type { IncidentPlaybookItem } from "@/lib/mock-data/admin-incidents"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/new-york-v4/ui/collapsible"
import { Button } from "@/registry/new-york-v4/ui/button"

export function IncidentActionsPlaybook({ items }: { items: IncidentPlaybookItem[] }) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Incident Actions Playbook</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => (
          <Collapsible key={item.category}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-start">{item.category}</Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-1 rounded-md border border-border/70 p-2 text-sm">
              {item.steps.map((step) => (
                <p key={step}>- {step}</p>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  )
}
