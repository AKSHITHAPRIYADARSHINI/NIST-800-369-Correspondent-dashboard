import Link from "next/link"
import type { ReactNode } from "react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/registry/new-york-v4/ui/breadcrumb"

export function RiskRegisterPageHeader({ actions }: { actions?: ReactNode }) {
  return (
    <div className="space-y-3 px-4 lg:px-6">
      <Breadcrumb>
        <BreadcrumbList className="text-xs">
          <BreadcrumbItem><BreadcrumbLink asChild><Link href="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink asChild><Link href="/admin-dashboard/risk-register">Main</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Risk Register</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Risk Register</h2>
          <p className="text-sm text-muted-foreground">Track operational risk, document ownership, update treatment plans, and log governance-impacting items across K-12 cybersecurity domains.</p>
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </div>
    </div>
  )
}
