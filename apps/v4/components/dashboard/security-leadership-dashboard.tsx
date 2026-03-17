"use client"

import * as React from "react"

import {
  SidebarInset,
  SidebarProvider,
} from "@/registry/new-york-v4/ui/sidebar"
import { DashboardBreadcrumb } from "@/components/dashboard/dashboard-breadcrumb"
import { type DashboardAccent } from "@/components/dashboard/quick-create-menu"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardSiteHeader } from "@/components/dashboard/site-header"
import { DashboardSummaryCards } from "@/components/dashboard/summary-cards"
import { SecurityPostureChart } from "@/components/dashboard/security-posture-chart"
import { IncidentsTable } from "@/components/dashboard/incidents-table"
import { IncidentTimeline } from "@/components/dashboard/incident-timeline"
import { PolicyFilesTable } from "@/components/dashboard/policy-files-table"
import { QuickActions } from "@/components/dashboard/quick-actions"

export function SecurityLeadershipDashboard() {
  const [accent, setAccent] = React.useState<DashboardAccent>("Violet")

  React.useEffect(() => {
    const saved = window.localStorage.getItem(
      "security-dashboard-accent"
    ) as DashboardAccent | null

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
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 12 + 1px)",
        } as React.CSSProperties
      }
    >
      <DashboardSidebar variant="sidebar" />
      <SidebarInset>
        <DashboardSiteHeader
          selectedAccent={accent}
          onAccentChange={handleAccentChange}
        />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <DashboardBreadcrumb />
              <DashboardSummaryCards />
              <div className="px-4 lg:px-6">
                <SecurityPostureChart />
              </div>
              <div className="grid gap-4 px-4 lg:px-6">
                <IncidentsTable />
                <IncidentTimeline />
                <PolicyFilesTable />
                <QuickActions />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
