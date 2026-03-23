"use client"

import { IconFilter } from "@tabler/icons-react"

import { deviceFilterOptions, type AppRiskStatus, type DeviceManagedState, type DevicePatchStatus, type DeviceRiskLevel, type DeviceTrustState, type DeviceOwnerRole } from "@/lib/mock-data/admin-devices"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/new-york-v4/ui/select"

export type DeviceFilters = {
  search: string
  role: "all" | DeviceOwnerRole
  trust: "all" | DeviceTrustState
  risk: "all" | DeviceRiskLevel
  patch: "all" | DevicePatchStatus
  appRisk: "all" | AppRiskStatus
  managedState: "all" | DeviceManagedState
  activeState: "all" | "Active" | "Inactive"
  untrustedOnly: boolean
  vulnerableOnly: boolean
  maliciousAppsOnly: boolean
  highRiskTrafficOnly: boolean
  needsReview: boolean
  linkedTicketsOnly: boolean
}

export const initialDeviceFilters: DeviceFilters = {
  search: "",
  role: "all",
  trust: "all",
  risk: "all",
  patch: "all",
  appRisk: "all",
  managedState: "all",
  activeState: "all",
  untrustedOnly: false,
  vulnerableOnly: false,
  maliciousAppsOnly: false,
  highRiskTrafficOnly: false,
  needsReview: false,
  linkedTicketsOnly: false,
}

export function DeviceFilterToolbar({
  filters,
  onFiltersChange,
}: {
  filters: DeviceFilters
  onFiltersChange: (value: DeviceFilters) => void
}) {
  const update = <K extends keyof DeviceFilters>(key: K, value: DeviceFilters[K]) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggle = (key: "untrustedOnly" | "vulnerableOnly" | "maliciousAppsOnly" | "highRiskTrafficOnly" | "needsReview" | "linkedTicketsOnly") => {
    onFiltersChange({ ...filters, [key]: !filters[key] })
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          className="min-w-64 flex-1"
          placeholder="Search device, user, device ID, application"
          value={filters.search}
          onChange={(event) => update("search", event.target.value)}
        />
        <Button size="sm" variant="outline">
          <IconFilter className="size-4" />
          Filter
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select value={filters.role} onValueChange={(value) => update("role", value as DeviceFilters["role"])}>
          <SelectTrigger className="w-36"><SelectValue placeholder="Role" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            {deviceFilterOptions.roles.map((role) => <SelectItem key={role} value={role}>{role}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.trust} onValueChange={(value) => update("trust", value as DeviceFilters["trust"])}>
          <SelectTrigger className="w-36"><SelectValue placeholder="Trust state" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All trust states</SelectItem>
            {deviceFilterOptions.trustStates.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.risk} onValueChange={(value) => update("risk", value as DeviceFilters["risk"])}>
          <SelectTrigger className="w-32"><SelectValue placeholder="Risk" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All risks</SelectItem>
            {deviceFilterOptions.risks.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.patch} onValueChange={(value) => update("patch", value as DeviceFilters["patch"])}>
          <SelectTrigger className="w-32"><SelectValue placeholder="Patch" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All patch states</SelectItem>
            {deviceFilterOptions.patchStates.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.appRisk} onValueChange={(value) => update("appRisk", value as DeviceFilters["appRisk"])}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Application risk" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All app risk</SelectItem>
            {deviceFilterOptions.appRisk.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.managedState} onValueChange={(value) => update("managedState", value as DeviceFilters["managedState"])}>
          <SelectTrigger className="w-32"><SelectValue placeholder="Managed state" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All states</SelectItem>
            {deviceFilterOptions.managedStates.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.activeState} onValueChange={(value) => update("activeState", value as DeviceFilters["activeState"])}>
          <SelectTrigger className="w-28"><SelectValue placeholder="Active" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant={filters.untrustedOnly ? "default" : "outline"} onClick={() => toggle("untrustedOnly")}>untrusted only</Button>
        <Button size="sm" variant={filters.vulnerableOnly ? "default" : "outline"} onClick={() => toggle("vulnerableOnly")}>vulnerable only</Button>
        <Button size="sm" variant={filters.maliciousAppsOnly ? "default" : "outline"} onClick={() => toggle("maliciousAppsOnly")}>malicious apps only</Button>
        <Button size="sm" variant={filters.highRiskTrafficOnly ? "default" : "outline"} onClick={() => toggle("highRiskTrafficOnly")}>high-risk traffic only</Button>
        <Button size="sm" variant={filters.needsReview ? "default" : "outline"} onClick={() => toggle("needsReview")}>needs review</Button>
        <Button size="sm" variant={filters.linkedTicketsOnly ? "default" : "outline"} onClick={() => toggle("linkedTicketsOnly")}>linked tickets only</Button>
        <Badge variant="outline">Operational filtering</Badge>
      </div>
    </div>
  )
}

