import type { ReactNode } from "react"
import { IconSearch } from "@tabler/icons-react"

import { Input } from "@/registry/new-york-v4/ui/input"

export function DashboardTableToolbar({
  searchValue,
  searchPlaceholder,
  onSearchChange,
  filters,
  actions,
  lastUpdated,
}: {
  searchValue: string
  searchPlaceholder: string
  onSearchChange: (value: string) => void
  filters?: ReactNode
  actions?: ReactNode
  lastUpdated: string
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-64 flex-1">
          <IconSearch className="pointer-events-none absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
          <Input
            className="pl-9"
            value={searchValue}
            placeholder={searchPlaceholder}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
        {actions}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">{filters}</div>
        <p className="text-xs text-muted-foreground">Last updated {lastUpdated}</p>
      </div>
    </div>
  )
}
