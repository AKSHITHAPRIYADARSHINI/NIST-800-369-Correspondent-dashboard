"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/registry/new-york-v4/ui/drawer"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Textarea } from "@/registry/new-york-v4/ui/textarea"

export function RiskNotesLog() {
  const [entries, setEntries] = React.useState<string[]>([
    "RISK-1104 treatment expanded with weekly endpoint patch compliance checks.",
    "RISK-1102 leadership briefing required before next review cycle.",
  ])
  const [draft, setDraft] = React.useState("")

  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Risk Log / Notes</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {entries.map((entry, idx) => <div key={idx} className="rounded-md border border-border/70 p-2 text-sm">{entry}</div>)}
        <Drawer>
          <DrawerTrigger asChild><Button size="sm" variant="outline">Add Risk Note</Button></DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-xl p-4">
              <DrawerHeader className="px-0"><DrawerTitle>Add Risk Note</DrawerTitle><DrawerDescription>Log treatment decisions, linked tickets/incidents, and review outcomes.</DrawerDescription></DrawerHeader>
              <div className="space-y-2">
                <Input placeholder="Risk ID / linked artifact" />
                <Input placeholder="Next review action" />
                <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Treatment update or governance note" className="min-h-24" />
                <Button onClick={() => { if (!draft.trim()) return; setEntries((prev) => [draft, ...prev]); setDraft("") }}>Save</Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </CardContent>
    </Card>
  )
}
