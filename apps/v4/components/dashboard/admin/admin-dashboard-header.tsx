import { IconMail, IconPlus } from "@tabler/icons-react"

import {
  type DashboardAccent,
  QuickCreateMenu,
} from "@/components/dashboard/quick-create-menu"
import { DashboardThemeToggle } from "@/components/dashboard/theme-toggle"
import { Button } from "@/registry/new-york-v4/ui/button"
import { SidebarTrigger } from "@/registry/new-york-v4/ui/sidebar"

export function AdminDashboardHeader({
  selectedAccent,
  onAccentChange,
}: {
  selectedAccent: DashboardAccent
  onAccentChange: (accent: DashboardAccent) => void
}) {
  return (
    <header className="sticky top-0 z-10 flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background/90">
      <div className="flex w-full items-center gap-3 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1 size-7" />
        <div className="min-w-0">
          <h1 className="truncate text-base font-medium">Greenfield Unified School</h1>
          <p className="truncate text-xs text-muted-foreground">User ID: SEC-ADM-000042</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <p className="hidden text-right text-xs text-muted-foreground xl:block">
            Last updated: March 23, 2026
          </p>
          <DashboardThemeToggle />
          <Button size="sm" variant="outline" className="hidden h-7 sm:flex">
            <IconPlus />
            <span>New Security Action</span>
          </Button>
          <Button size="sm" variant="outline" className="hidden h-7 sm:flex">
            <IconMail />
            <span>Contact Leadership</span>
          </Button>
          <QuickCreateMenu selectedAccent={selectedAccent} onAccentChange={onAccentChange} />
        </div>
      </div>
    </header>
  )
}
