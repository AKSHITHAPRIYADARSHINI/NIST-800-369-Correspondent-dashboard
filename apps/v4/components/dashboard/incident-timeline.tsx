import { Pie, PieChart } from "recharts"

import { incidentTimeline } from "@/components/dashboard/data"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/new-york-v4/ui/chart"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york-v4/ui/table"

const followUpChartData = [
  {
    status: "Containment Complete",
    incidents: 3,
    fill: "var(--color-containmentComplete)",
  },
  {
    status: "Forensic Review",
    incidents: 2,
    fill: "var(--color-forensicReview)",
  },
  {
    status: "Patch Deployment",
    incidents: 2,
    fill: "var(--color-patchDeployment)",
  },
  {
    status: "Scheduled Follow-up",
    incidents: 2,
    fill: "var(--color-scheduledFollowUp)",
  },
  {
    status: "Pending Escalation",
    incidents: 1,
    fill: "var(--color-pendingEscalation)",
  },
]

const followUpChartConfig = {
  incidents: {
    label: "Incidents",
  },
  containmentComplete: {
    label: "Containment Complete",
    color: "var(--chart-1)",
  },
  forensicReview: {
    label: "Forensic Review",
    color: "var(--chart-2)",
  },
  patchDeployment: {
    label: "Patch Deployment",
    color: "var(--chart-3)",
  },
  scheduledFollowUp: {
    label: "Scheduled Follow-up",
    color: "var(--chart-4)",
  },
  pendingEscalation: {
    label: "Pending Escalation",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

function compactDate(value: string) {
  const parts = value.split(",")
  return parts[0] ?? value
}

export function IncidentTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Incident Follow-up Timeline</CardTitle>
        <CardDescription>
          Report date, status, owner, review schedule, and escalation deadlines
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]">
          <div className="min-w-0 overflow-hidden rounded-lg border">
            <Table className="w-full table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[17%] px-1.5 text-xs">Report date</TableHead>
                  <TableHead className="w-[33%] px-1.5 text-xs">Incident</TableHead>
                  <TableHead className="w-[20%] px-1.5 text-xs">Current status</TableHead>
                  <TableHead className="w-[15%] px-1.5 text-xs">Assigned owner</TableHead>
                  <TableHead className="w-[15%] px-1.5 text-xs">Next review date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incidentTimeline.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="py-2 px-1.5 text-xs">
                      {compactDate(item.reportDate)}
                    </TableCell>
                    <TableCell className="min-w-0 py-2 font-medium">
                      <div className="truncate" title={item.incident}>
                        {item.incident}
                      </div>
                    </TableCell>
                    <TableCell className="py-2 px-1.5">
                      <span className="inline-block max-w-full truncate align-middle">
                        {item.currentStatus}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 px-1.5">
                      <div className="truncate text-xs" title={item.assignedOwner}>
                        {item.assignedOwner}
                      </div>
                    </TableCell>
                    <TableCell className="py-2 px-1.5 text-xs">
                      {compactDate(item.nextReviewDate)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Card className="min-w-0 py-4">
            <CardContent className="min-w-0 space-y-3 px-4">
              <ChartContainer
                config={followUpChartConfig}
                className="mx-auto aspect-square max-h-[250px] w-full max-w-[300px] [&_.recharts-pie-label-text]:fill-foreground"
              >
                <PieChart>
                  <ChartTooltip
                    content={<ChartTooltipContent nameKey="status" hideLabel />}
                  />
                  <Pie
                    data={followUpChartData}
                    dataKey="incidents"
                    nameKey="status"
                    innerRadius={50}
                    outerRadius={90}
                    strokeWidth={2}
                  />
                </PieChart>
              </ChartContainer>
              <div className="grid min-w-0 grid-cols-1 gap-x-3 gap-y-1 text-xs text-muted-foreground sm:grid-cols-2">
                {followUpChartData.map((item) => (
                  <div key={item.status} className="flex min-w-0 items-center gap-2">
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="min-w-0 truncate">{item.status}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
