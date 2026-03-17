import { IconBell, IconCirclePlusFilled, IconMail } from "@tabler/icons-react"

import { Button } from "@/registry/new-york-v4/ui/button"
import { dashboardMeta } from "@/app/(app)/examples/dashboard/dashboard-data"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background/90 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-4 px-4 lg:px-6">
        <div className="min-w-0">
          <h1 className="truncate text-base font-medium">{dashboardMeta.pageTitle}</h1>
          <p className="hidden truncate text-xs text-muted-foreground lg:block">
            {dashboardMeta.subtitle}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden text-right text-xs text-muted-foreground xl:block">
            <p className="font-medium text-foreground">{dashboardMeta.schoolUnit}</p>
            <p>Last updated: {dashboardMeta.lastUpdated}</p>
          </div>
          <Button size="sm" className="hidden h-7 sm:flex">
            <IconBell />
            <span>Quick Alert</span>
          </Button>
          <Button size="sm" variant="outline" className="hidden h-7 sm:flex">
            <IconMail />
            <span>Contact Admin</span>
          </Button>
          <Button size="sm" variant="outline" className="h-7">
            <IconCirclePlusFilled />
            <span>Upload Policy File</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
