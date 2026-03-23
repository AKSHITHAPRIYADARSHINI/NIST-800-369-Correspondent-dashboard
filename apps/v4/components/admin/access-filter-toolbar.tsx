"use client"

import { IconFilter } from "@tabler/icons-react"

import { accessFilterOptions, type AccessRiskState, type AccessReviewStatus, type AccessScope, type UserRole } from "@/lib/mock-data/admin-users-access"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/new-york-v4/ui/select"

export type AccessFilters = {
  search: string
  role: "all" | UserRole
  scope: "all" | AccessScope
  approvalSource: "all" | string
  riskState: "all" | AccessRiskState
  reviewStatus: "all" | AccessReviewStatus
  parentsOnly: boolean
  teachersOnly: boolean
  pendingApproval: boolean
  revokeCandidates: boolean
  inactiveAccounts: boolean
  highRiskOnly: boolean
}

export const initialAccessFilters: AccessFilters = {
  search: "",
  role: "all",
  scope: "all",
  approvalSource: "all",
  riskState: "all",
  reviewStatus: "all",
  parentsOnly: false,
  teachersOnly: false,
  pendingApproval: false,
  revokeCandidates: false,
  inactiveAccounts: false,
  highRiskOnly: false,
}

export function AccessFilterToolbar({
  filters,
  onFiltersChange,
}: {
  filters: AccessFilters
  onFiltersChange: (value: AccessFilters) => void
}) {
  const update = <K extends keyof AccessFilters>(key: K, value: AccessFilters[K]) => {
    onFiltersChange({ ...filters, [key]: value })
  }
  const toggle = (key: "parentsOnly" | "teachersOnly" | "pendingApproval" | "revokeCandidates" | "inactiveAccounts" | "highRiskOnly") => {
    onFiltersChange({ ...filters, [key]: !filters[key] })
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          className="min-w-64 flex-1"
          placeholder="Search user name, email, role, dashboard"
          value={filters.search}
          onChange={(event) => update("search", event.target.value)}
        />
        <Button size="sm" variant="outline">
          <IconFilter className="size-4" />
          Filter
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select value={filters.role} onValueChange={(value) => update("role", value as AccessFilters["role"])}>
          <SelectTrigger className="w-36"><SelectValue placeholder="Role" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            {accessFilterOptions.roles.map((role) => <SelectItem key={role} value={role}>{role}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.scope} onValueChange={(value) => update("scope", value as AccessFilters["scope"])}>
          <SelectTrigger className="w-52"><SelectValue placeholder="Access scope" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All scopes</SelectItem>
            {accessFilterOptions.scopes.map((scope) => <SelectItem key={scope} value={scope}>{scope}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.approvalSource} onValueChange={(value) => update("approvalSource", value)}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Approval source" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sources</SelectItem>
            {accessFilterOptions.approvalSources.map((source) => <SelectItem key={source} value={source}>{source}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.riskState} onValueChange={(value) => update("riskState", value as AccessFilters["riskState"])}>
          <SelectTrigger className="w-36"><SelectValue placeholder="Risk state" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All risk states</SelectItem>
            {accessFilterOptions.riskStates.map((state) => <SelectItem key={state} value={state}>{state}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.reviewStatus} onValueChange={(value) => update("reviewStatus", value as AccessFilters["reviewStatus"])}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Review status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All review statuses</SelectItem>
            {accessFilterOptions.reviewStatuses.map((state) => <SelectItem key={state} value={state}>{state}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant={filters.parentsOnly ? "default" : "outline"} onClick={() => toggle("parentsOnly")}>parents only</Button>
        <Button size="sm" variant={filters.teachersOnly ? "default" : "outline"} onClick={() => toggle("teachersOnly")}>teachers only</Button>
        <Button size="sm" variant={filters.pendingApproval ? "default" : "outline"} onClick={() => toggle("pendingApproval")}>pending approval</Button>
        <Button size="sm" variant={filters.revokeCandidates ? "default" : "outline"} onClick={() => toggle("revokeCandidates")}>revoke candidates</Button>
        <Button size="sm" variant={filters.inactiveAccounts ? "default" : "outline"} onClick={() => toggle("inactiveAccounts")}>inactive accounts</Button>
        <Button size="sm" variant={filters.highRiskOnly ? "default" : "outline"} onClick={() => toggle("highRiskOnly")}>high-risk only</Button>
        <Badge variant="outline">IAM review workflow</Badge>
      </div>
    </div>
  )
}

