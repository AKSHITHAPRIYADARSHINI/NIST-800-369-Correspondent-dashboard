import { IconMail } from "@tabler/icons-react"

import { recentIncidents } from "@/components/dashboard/data"
import { incidentStatusBadge, severityBadge } from "@/components/dashboard/shared-badges"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york-v4/ui/table"

export function IncidentsTable() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <CardTitle>Recent Incidents &amp; Alerts</CardTitle>
          <CardDescription>
            Active now, under review, and scheduled follow-up visibility
          </CardDescription>
        </div>
        <Button size="sm" variant="outline" className="shrink-0 whitespace-nowrap">
          <IconMail />
          Contact Admin Team
        </Button>
      </CardHeader>
      <CardContent>
        <div className="min-w-0 overflow-hidden rounded-lg border">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[47%]">Incident title</TableHead>
                <TableHead className="w-[14%] whitespace-nowrap px-1.5 text-xs">
                  Severity
                </TableHead>
                <TableHead className="w-[19%] whitespace-nowrap px-1.5 text-xs">
                  Status
                </TableHead>
                <TableHead className="w-[20%] text-right whitespace-nowrap px-1.5 text-xs">
                  Contact action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentIncidents.slice(0, 5).map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell className="min-w-0 py-2">
                    <div className="truncate font-medium" title={incident.title}>
                      {incident.title}
                    </div>
                    <div className="text-xs text-muted-foreground">{incident.id}</div>
                  </TableCell>
                  <TableCell className="py-2 px-1.5 whitespace-nowrap">
                    {severityBadge(incident.severity)}
                  </TableCell>
                  <TableCell className="py-2 px-1.5 whitespace-nowrap">
                    {incidentStatusBadge(incident.status)}
                  </TableCell>
                  <TableCell className="py-2 px-1.5 text-right whitespace-nowrap">
                    {/* TODO(api): Wire admin contact/escalation workflow actions. */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 w-[110px] px-2 text-xs whitespace-nowrap"
                    >
                      {incident.contactAction}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
