"use client"

import * as React from "react"
import { IconFilter } from "@tabler/icons-react"
import { riskFilterOptions, type Likelihood, type RiskDomain, type RiskImpact, type RiskSource, type TreatmentStatus } from "@/lib/mock-data/admin-risk-register"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/new-york-v4/ui/select"

export type RiskFilters = {
  search: string
  domain: string
  source: string
  likelihood: string
  impact: string
  treatment: string
  owner: string
  highRiskOnly: boolean
  linkedToTickets: boolean
  overdueReview: boolean
  needsTreatmentPlan: boolean
  leadershipReady: boolean
}

export const initialRiskFilters: RiskFilters = {
  search: "",
  domain: "all",
  source: "all",
  likelihood: "all",
  impact: "all",
  treatment: "all",
  owner: "all",
  highRiskOnly: false,
  linkedToTickets: false,
  overdueReview: false,
  needsTreatmentPlan: false,
  leadershipReady: false,
}

export function RiskFilterToolbar({ filters, onFiltersChange }: { filters: RiskFilters; onFiltersChange: (v: RiskFilters) => void }) {
  const update = <K extends keyof RiskFilters>(k: K, v: RiskFilters[K]) => onFiltersChange({ ...filters, [k]: v })
  const toggle = (k: "highRiskOnly" | "linkedToTickets" | "overdueReview" | "needsTreatmentPlan" | "leadershipReady") => onFiltersChange({ ...filters, [k]: !filters[k] })

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Input className="min-w-64 flex-1" placeholder="Search risk ID, title, domain, owner" value={filters.search} onChange={(e) => update("search", e.target.value)} />
        <Button variant="outline" size="sm"><IconFilter className="size-4" />Filter</Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select value={filters.domain} onValueChange={(v) => update("domain", v as RiskDomain | "all")}><SelectTrigger className="w-48"><SelectValue placeholder="Domain" /></SelectTrigger><SelectContent><SelectItem value="all">All domains</SelectItem>{riskFilterOptions.domains.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select>
        <Select value={filters.source} onValueChange={(v) => update("source", v as RiskSource | "all")}><SelectTrigger className="w-40"><SelectValue placeholder="Source" /></SelectTrigger><SelectContent><SelectItem value="all">All sources</SelectItem>{riskFilterOptions.sources.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select>
        <Select value={filters.likelihood} onValueChange={(v) => update("likelihood", v as Likelihood | "all")}><SelectTrigger className="w-36"><SelectValue placeholder="Likelihood" /></SelectTrigger><SelectContent><SelectItem value="all">All likelihood</SelectItem>{riskFilterOptions.likelihoods.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select>
        <Select value={filters.impact} onValueChange={(v) => update("impact", v as RiskImpact | "all")}><SelectTrigger className="w-32"><SelectValue placeholder="Impact" /></SelectTrigger><SelectContent><SelectItem value="all">All impact</SelectItem>{riskFilterOptions.impacts.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select>
        <Select value={filters.treatment} onValueChange={(v) => update("treatment", v as TreatmentStatus | "all")}><SelectTrigger className="w-44"><SelectValue placeholder="Treatment" /></SelectTrigger><SelectContent><SelectItem value="all">All treatment</SelectItem>{riskFilterOptions.treatment.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select>
        <Select value={filters.owner} onValueChange={(v) => update("owner", v)}><SelectTrigger className="w-36"><SelectValue placeholder="Owner" /></SelectTrigger><SelectContent><SelectItem value="all">All owners</SelectItem>{riskFilterOptions.owners.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant={filters.highRiskOnly ? "default" : "outline"} onClick={() => toggle("highRiskOnly")}>high risk only</Button>
        <Button size="sm" variant={filters.linkedToTickets ? "default" : "outline"} onClick={() => toggle("linkedToTickets")}>linked to tickets</Button>
        <Button size="sm" variant={filters.overdueReview ? "default" : "outline"} onClick={() => toggle("overdueReview")}>overdue review</Button>
        <Button size="sm" variant={filters.needsTreatmentPlan ? "default" : "outline"} onClick={() => toggle("needsTreatmentPlan")}>needs treatment plan</Button>
        <Button size="sm" variant={filters.leadershipReady ? "default" : "outline"} onClick={() => toggle("leadershipReady")}>leadership review ready</Button>
        <Badge variant="outline">Risk operations</Badge>
      </div>
    </div>
  )
}
