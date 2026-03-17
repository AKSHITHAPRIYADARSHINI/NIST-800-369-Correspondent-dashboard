"use client"

import * as React from "react"

import { Calendar } from "@/registry/new-york-v4/ui/calendar"

export function DashboardCalendar() {
  const [selected, setSelected] = React.useState<Date | undefined>(new Date())

  return (
    <div className="rounded-lg border">
      <Calendar mode="single" selected={selected} onSelect={setSelected} />
      <div className="border-t px-3 py-2 text-xs text-muted-foreground">
        Selected date:{" "}
        {selected
          ? selected.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "None"}
      </div>
    </div>
  )
}
