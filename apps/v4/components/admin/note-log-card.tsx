"use client"

import * as React from "react"
import { IconNotebook } from "@tabler/icons-react"

import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
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

export function NoteLogCard() {
  const [notes, setNotes] = React.useState([
    "Verified teacher MFA retry came from trusted campus network.",
    "Parent portal mismatch case moved to notification draft queue.",
  ])
  const [draft, setDraft] = React.useState("")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Notes & Action Log</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {notes.map((note, idx) => (
          <div key={idx} className="rounded-md border border-border/70 p-2 text-sm">
            {note}
          </div>
        ))}

        <Drawer>
          <DrawerTrigger asChild>
            <Button size="sm" variant="outline">
              <IconNotebook className="size-4" />
              Add Note
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-xl p-4">
              <DrawerHeader className="px-0">
                <DrawerTitle>Add Operational Note</DrawerTitle>
                <DrawerDescription>Tag user/device, link ticket, and mark follow-up.</DrawerDescription>
              </DrawerHeader>
              <div className="space-y-2">
                <Input placeholder="Tag user/device (e.g., Liam Carter / Chromebook-CM-221)" />
                <Input placeholder="Linked ticket (optional)" />
                <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Write verification and action details" className="min-h-24" />
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

