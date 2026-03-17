import { IconBell, IconMail } from "@tabler/icons-react"

import { dashboardMeta } from "@/components/dashboard/data"
import {
  type DashboardAccent,
  QuickCreateMenu,
} from "@/components/dashboard/quick-create-menu"
import { DashboardThemeToggle } from "@/components/dashboard/theme-toggle"
import { Button } from "@/registry/new-york-v4/ui/button"
import { SidebarTrigger } from "@/registry/new-york-v4/ui/sidebar"

type DashboardSiteHeaderProps = {
  selectedAccent: DashboardAccent
  onAccentChange: (accent: DashboardAccent) => void
}

export function DashboardSiteHeader({
  selectedAccent,
  onAccentChange,
}: DashboardSiteHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background/90 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-3 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1 size-7" />
        <div className="min-w-0">
          <h1 className="truncate text-base font-medium">
            {dashboardMeta.schoolName}
          </h1>
          <p className="truncate text-xs text-muted-foreground">
            {dashboardMeta.userId}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <p className="hidden text-right text-xs text-muted-foreground xl:block">
            {dashboardMeta.lastUpdated}
          </p>
          <DashboardThemeToggle />
          <Button size="sm" variant="outline" className="hidden h-7 sm:flex">
            <IconBell />
            <span>Quick Alert</span>
          </Button>
          <Button size="sm" variant="outline" className="hidden h-7 sm:flex">
            <IconMail />
            <span>Contact Admin</span>
          </Button>
          <QuickCreateMenu
            selectedAccent={selectedAccent}
            onAccentChange={onAccentChange}
          />
        </div>
      </div>
    </header>
  )
}
