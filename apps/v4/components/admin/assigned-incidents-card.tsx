"use client"

import * as React from "react"
import type { MyIncidentTask } from "@/lib/mock-data/admin-incidents"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Checkbox } from "@/registry/new-york-v4/ui/checkbox"

export function AssignedIncidentsCard({ tasks }: { tasks: MyIncidentTask[] }) {
  const [state, setState] = React.useState(tasks)
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Assigned Incidents / My Queue</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {state.map((task) => (
          <div key={task.id} className="rounded-md border border-border/70 p-2">
            <div className="flex items-start gap-2">
              <Checkbox checked={task.completed} onCheckedChange={(checked) => setState((prev) => prev.map((row) => row.id === task.id ? { ...row, completed: Boolean(checked) } : row))} />
              <div className="flex-1">
                <p className="text-sm font-medium">{task.title}</p>
                <p className="text-xs text-muted-foreground">{task.dueBucket}</p>
              </div>
            </div>
            <div className="mt-2 flex gap-1">
              <Button size="sm" variant="outline">Open</Button>
              <Button size="sm" variant="outline">Change status</Button>
              <Button size="sm" variant="outline">Reassign</Button>
              <Button size="sm" variant="outline">Snooze</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
