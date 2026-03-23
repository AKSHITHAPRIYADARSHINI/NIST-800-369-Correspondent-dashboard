"use client"

import * as React from "react"

import { LikelihoodBadge } from "@/components/admin/badges/likelihood-badge"
import { RiskLevelBadge } from "@/components/admin/badges/risk-level-badge"
import { TreatmentStatusBadge } from "@/components/admin/badges/treatment-status-badge"
import { OwnedRisksCard } from "@/components/admin/owned-risks-card"
import { PriorityRisksCard } from "@/components/admin/priority-risks-card"
import { RiskActivityFeed } from "@/components/admin/risk-activity-feed"
import { RiskDetailsSheet } from "@/components/admin/risk-details-sheet"
import { RiskFilterToolbar, initialRiskFilters, type RiskFilters } from "@/components/admin/risk-filter-toolbar"
import { RiskMetricCard } from "@/components/admin/risk-metric-card"
import { RiskNotesLog } from "@/components/admin/risk-notes-log"
import { RiskRegisterPageHeader } from "@/components/admin/risk-register-page-header"
import { RiskRegisterTable } from "@/components/admin/risk-register-table"
import { RiskTreatmentWorkbench } from "@/components/admin/risk-treatment-workbench"
import { TicketToRiskCard } from "@/components/admin/ticket-to-risk-card"
import { AdminDashboardShell } from "@/components/dashboard/admin/admin-dashboard-shell"
import { riskActivity, riskMetrics, risks, ticketToRiskItems, ownedRisks, type RiskItem } from "@/lib/mock-data/admin-risk-register"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/registry/new-york-v4/ui/dialog"
import { Separator } from "@/registry/new-york-v4/ui/separator"

function filterRisk(item: RiskItem, filters: RiskFilters) {
  const text = `${item.riskId} ${item.title} ${item.domain} ${item.owner}`.toLowerCase()
  const searchMatch = text.includes(filters.search.toLowerCase())
  const domainMatch = filters.domain === "all" || item.domain === filters.domain
  const sourceMatch = filters.source === "all" || item.source === filters.source
  const likelihoodMatch = filters.likelihood === "all" || item.likelihood === filters.likelihood
  const impactMatch = filters.impact === "all" || item.impact === filters.impact
  const treatmentMatch = filters.treatment === "all" || item.treatmentStatus === filters.treatment
  const ownerMatch = filters.owner === "all" || item.owner === filters.owner
  const highRiskMatch = !filters.highRiskOnly || item.overallRisk === "High" || item.overallRisk === "Critical"
  const ticketMatch = !filters.linkedToTickets || item.linkedTicketCount > 0
  const overdueMatch = !filters.overdueReview || item.overdue
  const treatmentNeedMatch = !filters.needsTreatmentPlan || item.treatmentStatus === "Identified" || item.treatmentStatus === "Assessing"
  const leadershipMatch = !filters.leadershipReady || item.leadershipReady
  return searchMatch && domainMatch && sourceMatch && likelihoodMatch && impactMatch && treatmentMatch && ownerMatch && highRiskMatch && ticketMatch && overdueMatch && treatmentNeedMatch && leadershipMatch
}

export function AdminRiskRegisterPage() {
  const [filters, setFilters] = React.useState(initialRiskFilters)
  const [selected, setSelected] = React.useState<RiskItem | null>(null)

  const filtered = React.useMemo(() => risks.filter((item) => filterRisk(item, filters)), [filters])

  const treatmentCounts = React.useMemo(() => {
    return {
      Identified: filtered.filter((x) => x.treatmentStatus === "Identified").length,
      Assessing: filtered.filter((x) => x.treatmentStatus === "Assessing").length,
      "Under Treatment": filtered.filter((x) => x.treatmentStatus === "Under Treatment").length,
      Monitoring: filtered.filter((x) => x.treatmentStatus === "Monitoring").length,
      "Ready for Review": filtered.filter((x) => x.treatmentStatus === "Ready for Review").length,
      Closed: filtered.filter((x) => x.treatmentStatus === "Closed").length,
    }
  }, [filtered])

  return (
    <AdminDashboardShell>
      <RiskRegisterPageHeader
        actions={
          <>
            <Dialog>
              <DialogTrigger asChild><Button size="sm">Add Risk</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add Risk</DialogTitle><DialogDescription>Create a new risk entry from ticket, incident, or manual assessment.</DialogDescription></DialogHeader>
                <DialogFooter><Button variant="outline">Save Draft</Button><Button>Create</Button></DialogFooter>
              </DialogContent>
            </Dialog>
            <Button size="sm" variant="outline">Export Register</Button>
            <Button size="sm" variant="outline">Quick Create</Button>
          </>
        }
      />

      <div className="grid gap-4 px-4 lg:grid-cols-6 lg:px-6">
        {riskMetrics.map((m) => <RiskMetricCard key={m.id} label={m.label} count={m.count} context={m.context} badge={m.badge} />)}
      </div>

      <div className="grid gap-4 px-4 lg:grid-cols-[2fr_1fr] lg:px-6">
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Risk Register Workspace</CardTitle><CardDescription>Maintain risk entries, ownership, treatment plans, and governance linkage.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <RiskFilterToolbar filters={filters} onFiltersChange={setFilters} />
              <div className="rounded-lg border border-border/70">
                <RiskRegisterTable items={filtered} onOpen={setSelected} />
              </div>
            </CardContent>
          </Card>

          <RiskTreatmentWorkbench items={treatmentCounts} />

          <Card>
            <CardHeader><CardTitle>Risk Heat / Priority Summary</CardTitle></CardHeader>
            <CardContent className="grid gap-2 sm:grid-cols-2 text-sm">
              <div className="rounded-md border border-border/70 p-2">High likelihood / high impact: {filtered.filter((x) => (x.likelihood === "Likely" || x.likelihood === "Almost Certain") && (x.impact === "High" || x.impact === "Critical")).length}</div>
              <div className="rounded-md border border-border/70 p-2">Medium likelihood / high impact: {filtered.filter((x) => x.likelihood === "Possible" && (x.impact === "High" || x.impact === "Critical")).length}</div>
              <div className="rounded-md border border-border/70 p-2">Low likelihood / critical impact: {filtered.filter((x) => (x.likelihood === "Rare" || x.likelihood === "Unlikely") && x.impact === "Critical").length}</div>
              <div className="rounded-md border border-border/70 p-2">Leadership-ready risks: {filtered.filter((x) => x.leadershipReady).length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <PriorityRisksCard items={[
            "RISK-1102 incomplete MFA enforcement for staff accounts",
            "RISK-1104 patch delay for school-managed Chromebooks",
            "RISK-1103 vendor privacy documentation gap",
          ]} />
          <RiskActivityFeed items={riskActivity} />
          <OwnedRisksCard items={ownedRisks} />
          <TicketToRiskCard items={ticketToRiskItems} />
        </div>
      </div>

      <div className="grid gap-4 px-4 lg:grid-cols-2 lg:px-6">
        <Card>
          <CardHeader><CardTitle>Treatment Guidance</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="rounded-md border border-border/70 p-2"><p className="font-medium">Access / Authentication</p><p className="text-xs text-muted-foreground">Strengthen MFA, validate device trust, review privileged access recertification.</p></div>
            <div className="rounded-md border border-border/70 p-2"><p className="font-medium">Student Data</p><p className="text-xs text-muted-foreground">Confirm retention controls, data classification, and vendor data handling coverage.</p></div>
            <div className="rounded-md border border-border/70 p-2"><p className="font-medium">Devices / Vendors / SDLC</p><p className="text-xs text-muted-foreground">Close patch delays, collect vendor evidence, and validate secure release checks.</p></div>
          </CardContent>
        </Card>
        <RiskNotesLog />
      </div>

      <RiskDetailsSheet item={selected} open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} />

      <div className="px-4 pb-2 lg:px-6">
        <Separator className="mb-3" />
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <LikelihoodBadge likelihood="Likely" />
          <RiskLevelBadge level="High" />
          <TreatmentStatusBadge status="Under Treatment" />
          <span>Ticket to risk flow: complete or audited ticket updates treatment and governance visibility.</span>
        </div>
      </div>
    </AdminDashboardShell>
  )
}
