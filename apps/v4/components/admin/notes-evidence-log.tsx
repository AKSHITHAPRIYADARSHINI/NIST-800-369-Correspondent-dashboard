"use client"

import * as React from "react"

import type { EvidenceItem } from "@/lib/mock-data/admin-compliance"
import { EvidenceStateBadge } from "@/components/admin/badges/evidence-state-badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/new-york-v4/ui/collapsible"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/new-york-v4/ui/drawer"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Textarea } from "@/registry/new-york-v4/ui/textarea"

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
}

export function NotesEvidenceLog({ items }: { items: EvidenceItem[] }) {
  const [open, setOpen] = React.useState(true)
  const [notes, setNotes] = React.useState<string[]>([
    "Access control evidence package requires updated reviewer comment.",
    "Vendor DPA review linked to third-party compliance task.",
  ])
  const [draft, setDraft] = React.useState("")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Notes & Evidence Log</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm">
              {open ? "Hide Evidence Items" : "Show Evidence Items"}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-2">
            {items.map((item) => (
              <div key={item.id} className="rounded-md border border-border/70 p-2 text-sm">
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">Control: {item.controlId} • Updated {formatDate(item.updatedAt)}</p>
                <div className="mt-1"><EvidenceStateBadge state={item.state} /></div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {notes.map((note, idx) => (
          <div key={idx} className="rounded-md border border-border/70 p-2 text-sm">
            {note}
          </div>
        ))}

        <Drawer>
          <DrawerTrigger asChild>
            <Button size="sm" variant="outline">Add Note / Evidence Reference</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-xl p-4">
              <DrawerHeader className="px-0">
                <DrawerTitle>Add Structured Note</DrawerTitle>
                <DrawerDescription>Tag control, asset, reviewer comment, and next action.</DrawerDescription>
              </DrawerHeader>
              <div className="space-y-2">
                <Input placeholder="Control ID / linked system" />
                <Input placeholder="Reviewer comment or ticket reference" />
                <Textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Operational note and next action required"
                  className="min-h-24"
                />
                <Button
                  onClick={() => {
                    if (!draft.trim()) return
                    setNotes((prev) => [draft, ...prev])
                    setDraft("")
                  }}
                >
                  Save Note
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </CardContent>
    </Card>
  )
}

