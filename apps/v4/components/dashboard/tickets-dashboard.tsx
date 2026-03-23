"use client"

import * as React from "react"
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts"
import { IconAlertTriangle, IconChevronDown, IconDots, IconPlus } from "@tabler/icons-react"

import {
  type DashboardAccent,
  QuickCreateMenu,
} from "@/components/dashboard/quick-create-menu"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import {
  avg_resolution_time,
  high_priority_tickets,
  leadership_review_queue,
  open_tickets,
  pending_review_tickets,
  priority_distribution,
  resolved_tickets,
  risk_score_distribution,
  sla_breaches,
  status_distribution,
  ticket_escalations,
  ticket_trend_data,
  tickets,
  type TicketItem,
} from "@/components/dashboard/tickets-data"
import { DashboardThemeToggle } from "@/components/dashboard/theme-toggle"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/new-york-v4/ui/breadcrumb"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/registry/new-york-v4/ui/chart"
import { Checkbox } from "@/registry/new-york-v4/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/new-york-v4/ui/dropdown-menu"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Label } from "@/registry/new-york-v4/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select"
import { Separator } from "@/registry/new-york-v4/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/registry/new-york-v4/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york-v4/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/registry/new-york-v4/ui/tabs"
import { Textarea } from "@/registry/new-york-v4/ui/textarea"

const trendConfig = {
  tickets: { label: "Tickets", color: "var(--chart-1)" },
} satisfies ChartConfig

const statusConfig = {
  count: { label: "Tickets" },
  open: { label: "Open", color: "var(--chart-1)" },
  inProgress: { label: "In Progress", color: "var(--chart-2)" },
  pendingReview: { label: "Pending Review", color: "var(--chart-3)" },
  resolved: { label: "Resolved", color: "var(--chart-4)" },
  escalated: { label: "Escalated", color: "var(--chart-5)" },
} satisfies ChartConfig

const priorityConfig = {
  count: { label: "Tickets", color: "var(--chart-2)" },
} satisfies ChartConfig

const riskConfig = {
  highRisk: { label: "High Risk", color: "var(--chart-1)" },
  mediumRisk: { label: "Medium Risk", color: "var(--chart-2)" },
  lowRisk: { label: "Low Risk", color: "var(--chart-3)" },
} satisfies ChartConfig

function formatTrendLabel(value: string, range: "7d" | "30d" | "90d") {
  const date = new Date(value)
  if (range === "7d") {
    return date.toLocaleDateString("en-US", { weekday: "short" })
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function priorityBadge(priority: TicketItem["priority"]) {
  const compact = "inline-flex h-6 items-center rounded-full px-2.5 py-0 text-xs whitespace-nowrap"
  if (priority === "Critical") return <Badge className={`bg-red-600 text-white ${compact}`}>Critical</Badge>
  if (priority === "High") return <Badge variant="destructive" className={compact}>High</Badge>
  if (priority === "Medium") return <Badge className={`bg-amber-500 text-black ${compact}`}>Medium</Badge>
  return <Badge variant="outline" className={`text-muted-foreground ${compact}`}>Low</Badge>
}

function statusBadge(status: TicketItem["status"]) {
  if (status === "Escalated") return <Badge variant="destructive">Escalated</Badge>
  if (status === "In Progress") return <Badge className="bg-amber-500 text-black">In Progress</Badge>
  if (status === "Resolved") return <Badge className="bg-emerald-600 text-white">Resolved</Badge>
  if (status === "Pending Review") return <Badge variant="outline">Pending Review</Badge>
  return <Badge variant="outline">Open</Badge>
}

function reviewBadge(value: boolean) {
  return value ? <Badge variant="secondary">Yes</Badge> : <Badge variant="outline">No</Badge>
}

function kpiBadge(variant: "crit" | "warn" | "ok" | "neutral", text: string) {
  if (variant === "crit") return <Badge variant="destructive">{text}</Badge>
  if (variant === "warn") return <Badge variant="outline" className="text-amber-600">{text}</Badge>
  if (variant === "ok") return <Badge className="bg-emerald-600/80 text-white">{text}</Badge>
  return <Badge variant="outline">{text}</Badge>
}

function TicketsHeader({
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
          <p className="truncate text-xs text-muted-foreground">User ID: SEC-CP-000184</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <p className="hidden text-right text-xs text-muted-foreground xl:block">Last updated: March 16, 2026</p>
          <DashboardThemeToggle />
          <Button size="sm" variant="outline" className="hidden h-7 sm:flex">Quick Alert</Button>
          <Button size="sm" variant="outline" className="hidden h-7 sm:flex">Contact Admin</Button>
          <QuickCreateMenu selectedAccent={selectedAccent} onAccentChange={onAccentChange} />
        </div>
      </div>
    </header>
  )
}

export function TicketsDashboard() {
  const [accent, setAccent] = React.useState<DashboardAccent>("Violet")
  const [trendRange, setTrendRange] = React.useState<"7d" | "30d" | "90d">("30d")
  const [activeTab, setActiveTab] = React.useState<
    "all" | "priority-review" | "risk-compliance" | "resolved" | "leadership-review"
  >("all")

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<Record<string, boolean>>({})

  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [priorityFilter, setPriorityFilter] = React.useState("all")
  const [areaFilter, setAreaFilter] = React.useState("all")
  const [reviewFilter, setReviewFilter] = React.useState("all")

  React.useEffect(() => {
    const saved = window.localStorage.getItem("security-dashboard-accent") as DashboardAccent | null
    if (saved) setAccent(saved)
  }, [])

  const handleAccentChange = React.useCallback((value: DashboardAccent) => {
    setAccent(value)
    window.localStorage.setItem("security-dashboard-accent", value)
  }, [])

  const trendSeries = React.useMemo(
    () => ticket_trend_data.filter((item) => item.range === trendRange),
    [trendRange]
  )

  const preFilteredTickets = React.useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        search.length === 0 ||
        ticket.title.toLowerCase().includes(search.toLowerCase()) ||
        ticket.id.toLowerCase().includes(search.toLowerCase())

      const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
      const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter
      const matchesArea = areaFilter === "all" || ticket.affectedArea === areaFilter
      const matchesReview =
        reviewFilter === "all" ||
        (reviewFilter === "yes" ? ticket.leadershipReview : !ticket.leadershipReview)

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesArea && matchesReview
      )
    })
  }, [search, statusFilter, priorityFilter, areaFilter, reviewFilter])

  const tabFilteredTickets = React.useMemo(() => {
    if (activeTab === "priority-review") {
      return preFilteredTickets.filter(
        (ticket) => ticket.priority === "Critical" || ticket.priority === "High"
      )
    }

    if (activeTab === "risk-compliance") {
      return preFilteredTickets.filter(
        (ticket) => ticket.riskScore >= 70 || ticket.category === "Data Protection"
      )
    }

    if (activeTab === "resolved") {
      return preFilteredTickets.filter((ticket) => ticket.status === "Resolved")
    }

    if (activeTab === "leadership-review") {
      return preFilteredTickets.filter((ticket) => ticket.leadershipReview)
    }

    return preFilteredTickets
  }, [activeTab, preFilteredTickets])

  const columns = React.useMemo<ColumnDef<TicketItem>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      { accessorKey: "id", header: "Ticket ID" },
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => <span className="font-medium">{row.original.title}</span>,
      },
      { accessorKey: "category", header: "Category" },
      {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => priorityBadge(row.original.priority),
      },
      {
        accessorKey: "riskScore",
        header: "Risk Score",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => statusBadge(row.original.status),
      },
      { accessorKey: "affectedArea", header: "Affected Area" },
      { accessorKey: "assignedTeam", header: "Assigned Team" },
      { accessorKey: "created", header: "Created" },
      { accessorKey: "dueDate", header: "Due Date" },
      {
        accessorKey: "leadershipReview",
        header: "Leadership Review",
        cell: ({ row }) => reviewBadge(row.original.leadershipReview),
      },
      {
        id: "actions",
        header: "Actions",
        cell: () => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <IconDots />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View ticket</DropdownMenuItem>
              <DropdownMenuItem>Mark for review</DropdownMenuItem>
              <DropdownMenuItem>Escalate</DropdownMenuItem>
              <DropdownMenuItem>Assign follow-up</DropdownMenuItem>
              <DropdownMenuItem>Export details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data: tabFilteredTickets,
    columns,
    state: {
      sorting,
      rowSelection,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

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
        <TicketsHeader selectedAccent={accent} onAccentChange={handleAccentChange} />

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <Breadcrumb>
                  <BreadcrumbList className="text-xs">
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Tickets</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className="px-4 lg:px-6">
                <h2 className="text-2xl font-semibold tracking-tight">Tickets Dashboard</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Real-time view of ticket status, remediation progress, backlog, and leadership oversight across school systems.
                </p>
              </div>

              <div className="grid gap-4 px-4 lg:grid-cols-3 lg:px-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Ticket Trend</CardTitle>
                    <CardDescription>Track how many tickets were created over time.</CardDescription>
                    <CardAction>
                      <Select value={trendRange} onValueChange={(v) => setTrendRange(v as "7d" | "30d" | "90d")}>
                        <SelectTrigger size="sm" className="w-36">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7d">Last 7 days</SelectItem>
                          <SelectItem value="30d">Last 30 days</SelectItem>
                          <SelectItem value="90d">Last 3 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={trendConfig} className="h-[260px] w-full">
                      <LineChart data={trendSeries} margin={{ left: 8, right: 8 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => formatTrendLabel(value, trendRange)}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              labelFormatter={(value) =>
                                new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                              }
                            />
                          }
                        />
                        <Line dataKey="tickets" type="monotone" stroke="var(--color-tickets)" strokeWidth={2.5} dot={{ r: 3 }} />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tickets by Status</CardTitle>
                    <CardDescription>Current distribution of ticket workflow states.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ChartContainer config={statusConfig} className="mx-auto aspect-square max-h-[220px] w-full">
                      <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="status" />} />
                        <Pie data={status_distribution} dataKey="count" nameKey="status" innerRadius={50} outerRadius={84} strokeWidth={2}>
                          {status_distribution.map((entry) => (
                            <Cell key={entry.status} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Tickets by Priority</CardTitle>
                    <CardDescription>Distribution of tickets by urgency.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={priorityConfig} className="h-[280px] w-full">
                      <BarChart data={priority_distribution} layout="vertical" margin={{ left: 8, right: 8 }}>
                        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                        <YAxis type="category" dataKey="priority" width={90} tickLine={false} axisLine={false} />
                        <XAxis type="number" tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="var(--color-count)" radius={[0, 6, 6, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Risk Score Distribution</CardTitle>
                    <CardDescription>Tickets grouped by associated risk severity.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={riskConfig} className="h-[280px] w-full">
                      <BarChart data={risk_score_distribution}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="period" tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="highRisk" stackId="risk" fill="var(--color-highRisk)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="mediumRisk" stackId="risk" fill="var(--color-mediumRisk)" />
                        <Bar dataKey="lowRisk" stackId="risk" fill="var(--color-lowRisk)" />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 px-4 md:grid-cols-2 xl:grid-cols-3 lg:px-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Open Tickets</CardTitle>
                    <CardAction>{kpiBadge("crit", "Needs attention")}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold tabular-nums">{open_tickets}</p>
                    <p className="text-xs text-muted-foreground">Tickets currently awaiting action or review</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Resolved Tickets</CardTitle>
                    <CardAction>{kpiBadge("ok", "On track")}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold tabular-nums">{resolved_tickets}</p>
                    <p className="text-xs text-muted-foreground">Tickets completed in the selected period</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Pending Review</CardTitle>
                    <CardAction>{kpiBadge("warn", "Awaiting approval")}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold tabular-nums">{pending_review_tickets}</p>
                    <p className="text-xs text-muted-foreground">Tickets requiring Correspondent / Principal review</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">High Priority</CardTitle>
                    <CardAction>{kpiBadge("crit", "Escalated")}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold tabular-nums">{high_priority_tickets}</p>
                    <p className="text-xs text-muted-foreground">Tickets impacting critical school operations</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Avg. Resolution Time</CardTitle>
                    <CardAction>{kpiBadge("neutral", "Stable")}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold tabular-nums">{avg_resolution_time}</p>
                    <p className="text-xs text-muted-foreground">Average time to close tickets</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">SLA Breaches</CardTitle>
                    <CardAction>{kpiBadge("warn", "Monitor")}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold tabular-nums">{sla_breaches}</p>
                    <p className="text-xs text-muted-foreground">Tickets exceeding response or resolution targets</p>
                  </CardContent>
                </Card>
              </div>

              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ticket Oversight</CardTitle>
                    <CardDescription>Operational views for leadership ticket monitoring and review.</CardDescription>
                    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
                      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
                        <TabsTrigger value="all">All Tickets</TabsTrigger>
                        <TabsTrigger value="priority-review">Priority Review</TabsTrigger>
                        <TabsTrigger value="risk-compliance">Risk / Compliance</TabsTrigger>
                        <TabsTrigger value="resolved">Resolved</TabsTrigger>
                        <TabsTrigger value="leadership-review">Leadership Review</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2 md:grid-cols-5">
                      <Input
                        placeholder="Search by title or ID"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="md:col-span-2"
                      />
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="Open">Open</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Pending Review">Pending Review</SelectItem>
                          <SelectItem value="Resolved">Resolved</SelectItem>
                          <SelectItem value="Escalated">Escalated</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                        <SelectTrigger><SelectValue placeholder="Priority" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Priority</SelectItem>
                          <SelectItem value="Critical">Critical</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={reviewFilter} onValueChange={setReviewFilter}>
                        <SelectTrigger><SelectValue placeholder="Leadership Review" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Review</SelectItem>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Select value={areaFilter} onValueChange={setAreaFilter}>
                        <SelectTrigger className="w-[220px]"><SelectValue placeholder="Affected area" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Areas</SelectItem>
                          {Array.from(new Set(tickets.map((ticket) => ticket.affectedArea))).map((area) => (
                            <SelectItem key={area} value={area}>{area}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="ml-auto">
                            Columns
                            <IconChevronDown />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                              <DropdownMenuCheckboxItem
                                key={column.id}
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                              >
                                {column.id}
                              </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="overflow-hidden rounded-lg border">
                      <Table>
                        <TableHeader>
                          {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                              {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                  {header.isPlaceholder ? null : (
                                    <div className="flex items-center gap-1">
                                      {flexRender(header.column.columnDef.header, header.getContext())}
                                      {header.column.getCanSort() && (
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="size-6"
                                          onClick={header.column.getToggleSortingHandler()}
                                        >
                                          <IconChevronDown className="size-3" />
                                        </Button>
                                      )}
                                    </div>
                                  )}
                                </TableHead>
                              ))}
                            </TableRow>
                          ))}
                        </TableHeader>
                        <TableBody>
                          {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                {row.getVisibleCells().map((cell) => (
                                  <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={columns.length} className="h-24 text-center">
                                No tickets found.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => table.previousPage()}
                          disabled={!table.getCanPreviousPage()}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => table.nextPage()}
                          disabled={!table.getCanNextPage()}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 px-4 lg:grid-cols-2 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Leadership Review Queue</CardTitle>
                    <CardDescription>
                      Tickets that require Principal / Correspondent approval or acknowledgment.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {leadership_review_queue.map((item) => (
                      <div key={item.id} className="rounded-md border p-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-medium">{item.title}</p>
                          {priorityBadge(item.priority)}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">Reason: {item.reason}</p>
                        <p className="text-xs text-muted-foreground">Due: {item.dueDate}</p>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" variant="outline">Approve</Button>
                          <Button size="sm" variant="outline">Escalate</Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Escalation Summary</CardTitle>
                    <CardDescription>
                      Tickets escalated due to severity, risk score, or delay.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm font-medium">Escalated count: {ticket_escalations.length}</p>
                    <Separator />
                    {ticket_escalations.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-xs">
                        <span className="truncate">{item.id} - {item.category} ({item.team})</span>
                        <Badge variant={item.overdue ? "destructive" : "outline"}>
                          {item.overdue ? "Overdue" : "On time"}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Ticket</CardTitle>
                    <CardDescription>
                      Quick entry panel for leadership to report an issue, remediation task, or follow-up request.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="ticket-title">Ticket Title</Label>
                      <Input id="ticket-title" placeholder="Enter ticket title" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="ticket-category">Category</Label>
                      <Input id="ticket-category" placeholder="Category" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="ticket-priority">Priority</Label>
                      <Select>
                        <SelectTrigger id="ticket-priority"><SelectValue placeholder="Select priority" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="critical">Critical</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="ticket-risk">Risk Score</Label>
                      <Input id="ticket-risk" placeholder="0-100" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="ticket-area">Affected Area</Label>
                      <Input id="ticket-area" placeholder="Affected area" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="ticket-created-by">Created By</Label>
                      <Input id="ticket-created-by" placeholder="Correspondent / Principal" />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="ticket-description">Short Description</Label>
                      <Textarea id="ticket-description" className="min-h-20" placeholder="Describe ticket context and expected remediation." />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="ticket-due-date">Due Date</Label>
                      <Input id="ticket-due-date" placeholder="Mar 20, 2026" />
                    </div>
                    <div className="sm:col-span-2">
                      <Button className="w-full">
                        <IconAlertTriangle />
                        Submit Ticket
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Customizable Ticket Widget</CardTitle>
                      <CardDescription>
                        Add additional ticket metrics, remediation visuals, or leadership oversight widgets.
                      </CardDescription>
                    </div>
                    <Button size="sm">
                      <IconPlus />
                      Add Widget
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Future widgets: backlog by team, overdue tickets by department, compliance remediation tickets, incident-linked tickets, student-data ticket tracker, and SLA performance.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
