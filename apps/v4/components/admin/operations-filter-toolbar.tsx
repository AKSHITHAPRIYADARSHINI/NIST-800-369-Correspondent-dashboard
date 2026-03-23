"use client"

import * as React from "react"
import { IconChevronsUp, IconFilter } from "@tabler/icons-react"

import { filterOptions, type QueueStatus, type RiskLevel } from "@/lib/mock-data/security-operations"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/new-york-v4/ui/command"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/new-york-v4/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select"

type Filters = {
  search: string
  status: string
  risk: string
  role: string
  module: string
  assignedTo: string
  due: string
  onlyHighRisk: boolean
  needsNotification: boolean
  unassigned: boolean
}

export function OperationsFilterToolbar({
  filters,
  onFiltersChange,
}: {
  filters: Filters
  onFiltersChange: (value: Filters) => void
}) {
  const [assigneeOpen, setAssigneeOpen] = React.useState(false)

  const update = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggle = (key: "onlyHighRisk" | "needsNotification" | "unassigned") => {
    update(key, !filters[key])
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          className="min-w-64 flex-1"
          placeholder="Search user, device, task, or action"
          value={filters.search}
          onChange={(event) => update("search", event.target.value)}
        />
        <Button variant="outline" size="sm">
          <IconFilter className="size-4" />
          Filter
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select value={filters.status} onValueChange={(value) => update("status", value as QueueStatus | "all")}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            {filterOptions.statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.risk} onValueChange={(value) => update("risk", value as RiskLevel | "all")}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Risk" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All risk</SelectItem>
            {filterOptions.risks.map((risk) => (
              <SelectItem key={risk} value={risk}>
                {risk}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.role} onValueChange={(value) => update("role", value)}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            {filterOptions.roles.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.module} onValueChange={(value) => update("module", value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Module" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All modules</SelectItem>
            {filterOptions.modules.map((module) => (
              <SelectItem key={module} value={module}>
                {module}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover open={assigneeOpen} onOpenChange={setAssigneeOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start">
              {filters.assignedTo === "all" ? "Assigned admin" : filters.assignedTo}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput placeholder="Find assignee" />
              <CommandList>
                <CommandEmpty>No assignee found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      update("assignedTo", "all")
                      setAssigneeOpen(false)
                    }}
                  >
                    All assignees
                  </CommandItem>
                  {filterOptions.assignees.map((assignee) => (
                    <CommandItem
                      key={assignee}
                      onSelect={() => {
                        update("assignedTo", assignee)
                        setAssigneeOpen(false)
                      }}
                    >
                      {assignee}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Select value={filters.due} onValueChange={(value) => update("due", value)}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Due" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any time</SelectItem>
            <SelectItem value="today">Due today</SelectItem>
            <SelectItem value="24h">Next 24h</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant={filters.onlyHighRisk ? "default" : "outline"} onClick={() => toggle("onlyHighRisk")}>
          <IconChevronsUp className="size-4" />
          Only high risk
        </Button>
        <Button size="sm" variant={filters.needsNotification ? "default" : "outline"} onClick={() => toggle("needsNotification")}>
          Needs notification
        </Button>
        <Button size="sm" variant={filters.unassigned ? "default" : "outline"} onClick={() => toggle("unassigned")}>
          Unassigned
        </Button>
        <Badge variant="outline">{filters.search ? "Filtered" : "Live queue"}</Badge>
      </div>
    </div>
  )
}

