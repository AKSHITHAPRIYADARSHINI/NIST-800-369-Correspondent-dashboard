"use client"

import * as React from "react"

import { AdminDashboardHeader } from "@/components/dashboard/admin/admin-dashboard-header"
import { AdminSidebar } from "@/components/dashboard/admin/admin-sidebar"
import { type DashboardAccent } from "@/components/dashboard/quick-create-menu"
import {
  SidebarInset,
  SidebarProvider,
} from "@/registry/new-york-v4/ui/sidebar"

export function AdminDashboardShell({ children }: { children: React.ReactNode }) {
  const [accent, setAccent] = React.useState<DashboardAccent>("Violet")

  React.useEffect(() => {
    const saved = window.localStorage.getItem("security-dashboard-accent") as DashboardAccent | null
    if (saved) {
      setAccent(saved)
    }
  }, [])

  const handleAccentChange = React.useCallback((value: DashboardAccent) => {
    setAccent(value)
    window.localStorage.setItem("security-dashboard-accent", value)
  }, [])

  return (
    <SidebarProvider
      className="security-dashboard-theme flex"
      data-accent={accent.toLowerCase()}
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 68)",
          "--header-height": "calc(var(--spacing) * 12 + 1px)",
        } as React.CSSProperties
      }
    >
      <AdminSidebar variant="sidebar" />
      <SidebarInset>
        <AdminDashboardHeader selectedAccent={accent} onAccentChange={handleAccentChange} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">{children}</div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
