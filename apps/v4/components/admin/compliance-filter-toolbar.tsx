"use client"

import * as React from "react"
import { IconFilter } from "@tabler/icons-react"

import {
  complianceFilterOptions,
  type ComplianceStatus,
  type ComplianceDomain,
  type EvidenceState,
  type LinkedArea,
} from "@/lib/mock-data/admin-compliance"
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

export type ComplianceFilters = {
  search: string
  status: string
  domain: string
  reviewDate: string
  evidenceState: string
  linkedArea: string
  assignedTo: string
  onlyOverdue: boolean
  evidenceMissing: boolean
  highImpact: boolean
  readyForReview: boolean
  vendorRelated: boolean
}

export const initialComplianceFilters: ComplianceFilters = {
  search: "",
  status: "all",
  domain: "all",
  reviewDate: "all",
  evidenceState: "all",
  linkedArea: "all",
  assignedTo: "all",
  onlyOverdue: false,
  evidenceMissing: false,
  highImpact: false,
  readyForReview: false,
  vendorRelated: false,
}

export function ComplianceFilterToolbar({
  filters,
  onFiltersChange,
}: {
  filters: ComplianceFilters
  onFiltersChange: (filters: ComplianceFilters) => void
}) {
  const [assigneeOpen, setAssigneeOpen] = React.useState(false)

  const update = <K extends keyof ComplianceFilters>(key: K, value: ComplianceFilters[K]) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggle = (key: "onlyOverdue" | "evidenceMissing" | "highImpact" | "readyForReview" | "vendorRelated") => {
    onFiltersChange({ ...filters, [key]: !filters[key] })
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          className="min-w-64 flex-1"
          placeholder="Search control, domain, asset, owner"
          value={filters.search}
          onChange={(event) => update("search", event.target.value)}
        />
        <Button variant="outline" size="sm">
          <IconFilter className="size-4" />
          Filter
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select value={filters.status} onValueChange={(value) => update("status", value as ComplianceStatus | "all")}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            {complianceFilterOptions.statuses.map((status) => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.domain} onValueChange={(value) => update("domain", value as ComplianceDomain | "all")}>
          <SelectTrigger className="w-48"><SelectValue placeholder="Domain" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All domains</SelectItem>
            {complianceFilterOptions.domains.map((domain) => (
              <SelectItem key={domain} value={domain}>{domain}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.evidenceState} onValueChange={(value) => update("evidenceState", value as EvidenceState | "all")}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Evidence" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All evidence</SelectItem>
            {complianceFilterOptions.evidenceStates.map((state) => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.linkedArea} onValueChange={(value) => update("linkedArea", value as LinkedArea | "all")}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Linked area" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All areas</SelectItem>
            {complianceFilterOptions.linkedAreas.map((area) => (
              <SelectItem key={area} value={area}>{area}</SelectItem>
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
                  {complianceFilterOptions.assignees.map((assignee) => (
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

        <Select value={filters.reviewDate} onValueChange={(value) => update("reviewDate", value)}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Review date" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any date</SelectItem>
            <SelectItem value="7d">Next 7 days</SelectItem>
            <SelectItem value="30d">Next 30 days</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant={filters.onlyOverdue ? "default" : "outline"} onClick={() => toggle("onlyOverdue")}>only overdue</Button>
        <Button size="sm" variant={filters.evidenceMissing ? "default" : "outline"} onClick={() => toggle("evidenceMissing")}>evidence missing</Button>
        <Button size="sm" variant={filters.highImpact ? "default" : "outline"} onClick={() => toggle("highImpact")}>high impact</Button>
        <Button size="sm" variant={filters.readyForReview ? "default" : "outline"} onClick={() => toggle("readyForReview")}>ready for review</Button>
        <Button size="sm" variant={filters.vendorRelated ? "default" : "outline"} onClick={() => toggle("vendorRelated")}>vendor related</Button>
        <Badge variant="outline">Operational queue</Badge>
      </div>
    </div>
  )
}

