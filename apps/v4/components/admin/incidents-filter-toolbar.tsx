"use client"

import * as React from "react"
import { IconFilter } from "@tabler/icons-react"

import {
  incidentFilterOptions,
  type IncidentCategory,
  type IncidentSeverity,
  type IncidentStatus,
} from "@/lib/mock-data/admin-incidents"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/registry/new-york-v4/ui/command"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/new-york-v4/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/new-york-v4/ui/select"

export type IncidentFilters = {
  search: string
  category: string
  severity: string
  status: string
  owner: string
  linkedArea: string
  dateRange: string
  assignedTo: string
  onlyCritical: boolean
  onlyUnassigned: boolean
  linkedToTicket: boolean
  needsNotification: boolean
  overdue: boolean
  vendorRelated: boolean
}

export const initialIncidentFilters: IncidentFilters = {
  search: "",
  category: "all",
  severity: "all",
  status: "all",
  owner: "all",
  linkedArea: "all",
  dateRange: "all",
  assignedTo: "all",
  onlyCritical: false,
  onlyUnassigned: false,
  linkedToTicket: false,
  needsNotification: false,
  overdue: false,
  vendorRelated: false,
}

export function IncidentsFilterToolbar({
  filters,
  onFiltersChange,
}: {
  filters: IncidentFilters
  onFiltersChange: (filters: IncidentFilters) => void
}) {
  const [assigneeOpen, setAssigneeOpen] = React.useState(false)
  const update = <K extends keyof IncidentFilters>(key: K, value: IncidentFilters[K]) => onFiltersChange({ ...filters, [key]: value })
  const toggle = (key: "onlyCritical" | "onlyUnassigned" | "linkedToTicket" | "needsNotification" | "overdue" | "vendorRelated") => onFiltersChange({ ...filters, [key]: !filters[key] })

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Input className="min-w-64 flex-1" placeholder="Search incident title, ID, user, device, app, vendor" value={filters.search} onChange={(e) => update("search", e.target.value)} />
        <Button variant="outline" size="sm"><IconFilter className="size-4" />Filter</Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select value={filters.category} onValueChange={(v) => update("category", v as IncidentCategory | "all")}><SelectTrigger className="w-48"><SelectValue placeholder="Category" /></SelectTrigger><SelectContent><SelectItem value="all">All categories</SelectItem>{incidentFilterOptions.categories.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select>
        <Select value={filters.severity} onValueChange={(v) => update("severity", v as IncidentSeverity | "all")}><SelectTrigger className="w-36"><SelectValue placeholder="Severity" /></SelectTrigger><SelectContent><SelectItem value="all">All severity</SelectItem>{incidentFilterOptions.severities.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select>
        <Select value={filters.status} onValueChange={(v) => update("status", v as IncidentStatus | "all")}><SelectTrigger className="w-44"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">All status</SelectItem>{incidentFilterOptions.statuses.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select>
        <Select value={filters.owner} onValueChange={(v) => update("owner", v)}><SelectTrigger className="w-44"><SelectValue placeholder="Owner" /></SelectTrigger><SelectContent><SelectItem value="all">All owners</SelectItem>{incidentFilterOptions.owners.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select>
        <Select value={filters.linkedArea} onValueChange={(v) => update("linkedArea", v)}><SelectTrigger className="w-36"><SelectValue placeholder="Linked area" /></SelectTrigger><SelectContent><SelectItem value="all">All areas</SelectItem>{incidentFilterOptions.linkedAreas.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select>
        <Popover open={assigneeOpen} onOpenChange={setAssigneeOpen}><PopoverTrigger asChild><Button variant="outline" className="justify-start">{filters.assignedTo === "all" ? "Assigned admin" : filters.assignedTo}</Button></PopoverTrigger><PopoverContent className="w-56 p-0" align="start"><Command><CommandInput placeholder="Find assignee" /><CommandList><CommandEmpty>No assignee found.</CommandEmpty><CommandGroup><CommandItem onSelect={() => { update("assignedTo", "all"); setAssigneeOpen(false) }}>All assignees</CommandItem>{incidentFilterOptions.assignees.map((a) => <CommandItem key={a} onSelect={() => { update("assignedTo", a); setAssigneeOpen(false) }}>{a}</CommandItem>)}</CommandGroup></CommandList></Command></PopoverContent></Popover>
        <Select value={filters.dateRange} onValueChange={(v) => update("dateRange", v)}><SelectTrigger className="w-36"><SelectValue placeholder="Date" /></SelectTrigger><SelectContent><SelectItem value="all">Any date</SelectItem><SelectItem value="24h">Last 24h</SelectItem><SelectItem value="7d">Last 7d</SelectItem><SelectItem value="overdue">Overdue</SelectItem></SelectContent></Select>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant={filters.onlyCritical ? "default" : "outline"} onClick={() => toggle("onlyCritical")}>only critical</Button>
        <Button size="sm" variant={filters.onlyUnassigned ? "default" : "outline"} onClick={() => toggle("onlyUnassigned")}>only unassigned</Button>
        <Button size="sm" variant={filters.linkedToTicket ? "default" : "outline"} onClick={() => toggle("linkedToTicket")}>linked to ticket</Button>
        <Button size="sm" variant={filters.needsNotification ? "default" : "outline"} onClick={() => toggle("needsNotification")}>needs notification</Button>
        <Button size="sm" variant={filters.overdue ? "default" : "outline"} onClick={() => toggle("overdue")}>overdue</Button>
        <Button size="sm" variant={filters.vendorRelated ? "default" : "outline"} onClick={() => toggle("vendorRelated")}>vendor related</Button>
        <Badge variant="outline">Incident queue</Badge>
      </div>
    </div>
  )
}
