"use client"

import * as React from "react"
import { IconFilter } from "@tabler/icons-react"
import { ticketFilterOptions, type TicketCategory, type TicketPriority } from "@/lib/mock-data/admin-tickets"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/new-york-v4/ui/select"

type TicketFilters = {
  search: string
  priority: string
  category: string
  assignedTo: string
  linkedArea: string
  overdue: boolean
  mineOnly: boolean
  highPriorityOnly: boolean
  unresolvedOnly: boolean
  linkedToIncidents: boolean
  readyForRiskUpdate: boolean
}

export const initialTicketFilters: TicketFilters = {
  search: "",
  priority: "all",
  category: "all",
  assignedTo: "all",
  linkedArea: "all",
  overdue: false,
  mineOnly: false,
  highPriorityOnly: false,
  unresolvedOnly: false,
  linkedToIncidents: false,
  readyForRiskUpdate: false,
}

export function TicketFilterToolbar({ filters, onFiltersChange }: { filters: TicketFilters; onFiltersChange: (v: TicketFilters) => void }) {
  const update = <K extends keyof TicketFilters>(k: K, v: TicketFilters[K]) => onFiltersChange({ ...filters, [k]: v })
  const toggle = (k: "overdue" | "mineOnly" | "highPriorityOnly" | "unresolvedOnly" | "linkedToIncidents" | "readyForRiskUpdate") => onFiltersChange({ ...filters, [k]: !filters[k] })

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Input className="min-w-64 flex-1" placeholder="Search ticket number, title, user, device" value={filters.search} onChange={(e) => update("search", e.target.value)} />
        <Button variant="outline" size="sm"><IconFilter className="size-4" />Filter</Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select value={filters.priority} onValueChange={(v) => update("priority", v as TicketPriority | "all")}><SelectTrigger className="w-36"><SelectValue placeholder="Priority" /></SelectTrigger><SelectContent><SelectItem value="all">All priority</SelectItem>{ticketFilterOptions.priorities.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select>
        <Select value={filters.category} onValueChange={(v) => update("category", v as TicketCategory | "all")}><SelectTrigger className="w-48"><SelectValue placeholder="Category" /></SelectTrigger><SelectContent><SelectItem value="all">All categories</SelectItem>{ticketFilterOptions.categories.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select>
        <Select value={filters.assignedTo} onValueChange={(v) => update("assignedTo", v)}><SelectTrigger className="w-36"><SelectValue placeholder="Assigned" /></SelectTrigger><SelectContent><SelectItem value="all">All assignees</SelectItem>{ticketFilterOptions.assignees.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select>
        <Select value={filters.linkedArea} onValueChange={(v) => update("linkedArea", v)}><SelectTrigger className="w-36"><SelectValue placeholder="Linked area" /></SelectTrigger><SelectContent><SelectItem value="all">All areas</SelectItem>{ticketFilterOptions.linkedAreas.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant={filters.mineOnly ? "default" : "outline"} onClick={() => toggle("mineOnly")}>mine only</Button>
        <Button size="sm" variant={filters.highPriorityOnly ? "default" : "outline"} onClick={() => toggle("highPriorityOnly")}>high priority only</Button>
        <Button size="sm" variant={filters.unresolvedOnly ? "default" : "outline"} onClick={() => toggle("unresolvedOnly")}>unresolved only</Button>
        <Button size="sm" variant={filters.linkedToIncidents ? "default" : "outline"} onClick={() => toggle("linkedToIncidents")}>linked to incidents</Button>
        <Button size="sm" variant={filters.readyForRiskUpdate ? "default" : "outline"} onClick={() => toggle("readyForRiskUpdate")}>ready for risk update</Button>
        <Button size="sm" variant={filters.overdue ? "default" : "outline"} onClick={() => toggle("overdue")}>overdue</Button>
        <Badge variant="outline">Kanban workflow</Badge>
      </div>
    </div>
  )
}
