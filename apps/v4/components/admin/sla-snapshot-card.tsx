import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"

export function SlaSnapshotCard({
  overdue,
  withinSla,
  pending,
  awaitingExternal,
}: {
  overdue: number
  withinSla: number
  pending: number
  awaitingExternal: number
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">SLA / Workflow Snapshot</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-md border border-border/70 p-2">Overdue tasks: {overdue}</div>
        <div className="rounded-md border border-border/70 p-2">Within SLA: {withinSla}</div>
        <div className="rounded-md border border-border/70 p-2">Pending response: {pending}</div>
        <div className="rounded-md border border-border/70 p-2">Awaiting external: {awaitingExternal}</div>
      </CardContent>
    </Card>
  )
}

