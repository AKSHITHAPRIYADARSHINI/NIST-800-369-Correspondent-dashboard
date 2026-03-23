"use client"

import * as React from "react"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/registry/new-york-v4/ui/drawer"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Textarea } from "@/registry/new-york-v4/ui/textarea"

export function NotesResolutionLog() {
  const [entries, setEntries] = React.useState<string[]>([
    "INC-2401 triage complete; risk confirmed high due to repeated unknown device login.",
    "INC-2405 escalation packet prepared with evidence links and communication draft.",
  ])
  const [draft, setDraft] = React.useState("")

  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Notes & Resolution Log</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {entries.map((entry, idx) => (
          <div key={idx} className="rounded-md border border-border/70 p-2 text-sm">{entry}</div>
        ))}

        <Drawer>
          <DrawerTrigger asChild><Button size="sm" variant="outline">Add Incident Note</Button></DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-xl p-4">
              <DrawerHeader className="px-0">
                <DrawerTitle>Add Resolution Entry</DrawerTitle>
                <DrawerDescription>Tag incident type, next action, follow-up owner, and review status.</DrawerDescription>
              </DrawerHeader>
              <div className="space-y-2">
                <Input placeholder="Incident ID / category" />
                <Input placeholder="Next action / follow-up owner" />
                <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Resolution summary or operational note" className="min-h-24" />
                <Button onClick={() => { if (!draft.trim()) return; setEntries((prev) => [draft, ...prev]); setDraft("") }}>Save Entry</Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </CardContent>
    </Card>
  )
}
