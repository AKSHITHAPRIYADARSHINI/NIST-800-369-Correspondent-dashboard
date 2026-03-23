import type { CommunicationDraft } from "@/lib/mock-data/security-operations"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Badge } from "@/registry/new-york-v4/ui/badge"

function stateBadge(state: CommunicationDraft["state"]) {
  if (state === "Ready to Send") return <Badge className="bg-emerald-600/80 text-white">Ready to Send</Badge>
  if (state === "Awaiting Approval") return <Badge className="bg-blue-600/80 text-white">Awaiting Approval</Badge>
  if (state === "Draft Required") return <Badge variant="outline" className="border-amber-400/60 text-amber-300">Draft Required</Badge>
  if (state === "Sent") return <Badge variant="outline">Sent</Badge>
  return <Badge variant="secondary">Not Needed</Badge>
}

export function CommunicationReadinessCard({ drafts }: { drafts: CommunicationDraft[] }) {
  const ready = drafts.filter((item) => item.state === "Ready to Send").length
  const awaiting = drafts.filter((item) => item.state === "Awaiting Approval").length
  const draft = drafts.filter((item) => item.state === "Draft Required").length
  const follow = drafts.filter((item) => item.state === "Sent").length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Communication Readiness</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-md border border-border/70 p-2">Ready to send: {ready}</div>
          <div className="rounded-md border border-border/70 p-2">Awaiting approval: {awaiting}</div>
          <div className="rounded-md border border-border/70 p-2">Draft notices: {draft}</div>
          <div className="rounded-md border border-border/70 p-2">Follow-up required: {follow}</div>
        </div>
        {drafts.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-md border border-border/70 p-2 text-sm">
            <span>{item.target}: {item.title}</span>
            {stateBadge(item.state)}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

