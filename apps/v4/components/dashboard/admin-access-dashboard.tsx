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
import { IconAlertTriangle, IconChevronDown, IconDots, IconMail, IconPlus } from "@tabler/icons-react"

import {
  access_review_queue,
  access_reviews_completed,
  admin_status_breakdown,
  admins,
  contact_admin_list,
  expiring_access_grants,
  inactive_admins,
  inactive_admins_list,
  mfa_status,
  password_policy_compliance,
  pending_access_requests,
  pending_access_requests_list,
  privileged_accounts,
  privileged_role_summary,
  recent_admin_activity,
  total_admin_accounts,
  active_admins_today,
  type AdminItem,
} from "@/components/dashboard/admin-access-data"
import {
  type DashboardAccent,
  QuickCreateMenu,
} from "@/components/dashboard/quick-create-menu"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardThemeToggle } from "@/components/dashboard/theme-toggle"
import { NumberTicker } from "@/components/ui/number-ticker"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york-v4/ui/avatar"
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
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/new-york-v4/ui/sidebar"
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

function roleBadge(role: AdminItem["roleType"]) {
  if (role === "Security Ops Admin") return <Badge variant="destructive">Security Ops</Badge>
  if (role === "IAM & Policy Admin") return <Badge className="bg-amber-500 text-black">IAM & Policy</Badge>
  return <Badge variant="outline">Support</Badge>
}

function accessBadge(access: AdminItem["accessLevel"]) {
  return access === "Privileged" ? <Badge variant="secondary">Privileged</Badge> : <Badge variant="outline">Standard</Badge>
}

function statusBadge(status: AdminItem["status"]) {
  if (status === "Active") return <Badge className="bg-emerald-600 text-white">Active</Badge>
  if (status === "Pending Approval") return <Badge className="bg-amber-500 text-black">Pending Approval</Badge>
  if (status === "Suspended") return <Badge variant="destructive">Suspended</Badge>
  return <Badge variant="outline">Inactive</Badge>
}

function mfaBadge(status: AdminItem["mfaStatus"]) {
  if (status === "Enabled") return <Badge variant="secondary">Enabled</Badge>
  if (status === "Pending") return <Badge variant="outline">Pending</Badge>
  return <Badge variant="destructive">Disabled</Badge>
}

function boolBadge(value: boolean) {
  return value ? <Badge variant="outline">Yes</Badge> : <Badge variant="outline">No</Badge>
}

function kpiBadge(variant: "ok" | "warn" | "crit" | "live" | "neutral", text: string) {
  if (variant === "ok") return <Badge className="bg-emerald-600/80 text-white">{text}</Badge>
  if (variant === "live") return <Badge className="bg-sky-600/80 text-white">{text}</Badge>
  if (variant === "warn") return <Badge variant="outline" className="text-amber-600">{text}</Badge>
  if (variant === "crit") return <Badge variant="destructive">{text}</Badge>
  return <Badge variant="outline">{text}</Badge>
}

function AccessHeader({
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
          <p className="hidden text-right text-xs text-muted-foreground xl:block">
            Last updated: March 16, 2026
          </p>
          <DashboardThemeToggle />
          <Button size="sm" variant="outline" className="hidden h-7 sm:flex">Quick Alert</Button>
          <Button size="sm" variant="outline" className="hidden h-7 sm:flex">Contact Admin</Button>
          <QuickCreateMenu selectedAccent={selectedAccent} onAccentChange={onAccentChange} />
        </div>
      </div>
    </header>
  )
}

export function AdminAccessDashboard() {
  const [accent, setAccent] = React.useState<DashboardAccent>("Violet")
  const [activeTab, setActiveTab] = React.useState<
    "all" | "pending" | "privileged" | "inactive" | "reviews" | "onboarding"
  >("all")

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<Record<string, boolean>>({})

  const [search, setSearch] = React.useState("")
  const [roleFilter, setRoleFilter] = React.useState("all")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [mfaFilter, setMfaFilter] = React.useState("all")
  const [accessFilter, setAccessFilter] = React.useState("all")
  const [pendingFilter, setPendingFilter] = React.useState("all")
  const [inactiveFilter, setInactiveFilter] = React.useState("all")

  React.useEffect(() => {
    const saved = window.localStorage.getItem("security-dashboard-accent") as DashboardAccent | null
    if (saved) setAccent(saved)
  }, [])

  const handleAccentChange = React.useCallback((value: DashboardAccent) => {
    setAccent(value)
    window.localStorage.setItem("security-dashboard-accent", value)
  }, [])

  const preFilteredAdmins = React.useMemo(() => {
    return admins.filter((admin) => {
      const matchesSearch =
        search.length === 0 ||
        admin.fullName.toLowerCase().includes(search.toLowerCase()) ||
        admin.adminId.toLowerCase().includes(search.toLowerCase())

      const matchesRole = roleFilter === "all" || admin.roleType === roleFilter
      const matchesStatus = statusFilter === "all" || admin.status === statusFilter
      const matchesMfa = mfaFilter === "all" || admin.mfaStatus === mfaFilter
      const matchesAccess = accessFilter === "all" || admin.accessLevel === accessFilter
      const matchesPending =
        pendingFilter === "all" ||
        (pendingFilter === "yes" ? admin.status === "Pending Approval" : admin.status !== "Pending Approval")
      const matchesInactive =
        inactiveFilter === "all" ||
        (inactiveFilter === "yes" ? admin.status === "Inactive" : admin.status !== "Inactive")

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus &&
        matchesMfa &&
        matchesAccess &&
        matchesPending &&
        matchesInactive
      )
    })
  }, [search, roleFilter, statusFilter, mfaFilter, accessFilter, pendingFilter, inactiveFilter])

  const tabFilteredAdmins = React.useMemo(() => {
    if (activeTab === "pending") return preFilteredAdmins.filter((admin) => admin.status === "Pending Approval")
    if (activeTab === "privileged") return preFilteredAdmins.filter((admin) => admin.accessLevel === "Privileged")
    if (activeTab === "inactive") return preFilteredAdmins.filter((admin) => admin.status === "Inactive")
    if (activeTab === "reviews") return preFilteredAdmins.filter((admin) => admin.accessReviewDue <= "Mar 25")
    if (activeTab === "onboarding") return preFilteredAdmins.filter((admin) => admin.status === "Pending Approval")
    return preFilteredAdmins
  }, [activeTab, preFilteredAdmins])

  const columns = React.useMemo<ColumnDef<AdminItem>[]>(
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
      { accessorKey: "adminId", header: "Admin ID" },
      {
        accessorKey: "fullName",
        header: "Full Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Avatar className="size-7 rounded-md">
              <AvatarImage src="/avatars/shadcn.jpg" alt={row.original.fullName} />
              <AvatarFallback className="rounded-md">{row.original.fullName.split(" ").map((n) => n[0]).join("").slice(0,2)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{row.original.fullName}</span>
          </div>
        ),
      },
      {
        accessorKey: "roleType",
        header: "Role Type",
        cell: ({ row }) => roleBadge(row.original.roleType),
      },
      {
        accessorKey: "accessLevel",
        header: "Access Level",
        cell: ({ row }) => accessBadge(row.original.accessLevel),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => statusBadge(row.original.status),
      },
      {
        accessorKey: "mfaStatus",
        header: "MFA Status",
        cell: ({ row }) => mfaBadge(row.original.mfaStatus),
      },
      { accessorKey: "lastActive", header: "Last Active" },
      { accessorKey: "departmentArea", header: "Department / Area" },
      { accessorKey: "assignedBy", header: "Assigned By" },
      { accessorKey: "accessReviewDue", header: "Access Review Due" },
      {
        accessorKey: "temporaryAccess",
        header: "Temporary Access",
        cell: ({ row }) => boolBadge(row.original.temporaryAccess),
      },
      { accessorKey: "contact", header: "Contact" },
      {
        id: "actions",
        header: "Actions",
        cell: () => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8"><IconDots /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View profile</DropdownMenuItem>
              <DropdownMenuItem>Approve access</DropdownMenuItem>
              <DropdownMenuItem>Revoke access</DropdownMenuItem>
              <DropdownMenuItem>Mark for review</DropdownMenuItem>
              <DropdownMenuItem>Contact admin</DropdownMenuItem>
              <DropdownMenuItem>Extend temporary access</DropdownMenuItem>
              <DropdownMenuItem>Export details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data: tabFilteredAdmins,
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
        <AccessHeader selectedAccent={accent} onAccentChange={handleAccentChange} />

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
                      <BreadcrumbPage>Admin Access</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className="px-4 lg:px-6">
                <h2 className="text-2xl font-semibold tracking-tight">Admin Access Dashboard</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Real-time view of administrative access, role status, privileged accounts, approvals, and leadership oversight across SECURED 369.
                </p>
              </div>

              <div className="grid gap-4 px-4 lg:grid-cols-3 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Access Status Overview</CardTitle>
                    <CardDescription>Current breakdown of administrative account status.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-2">
                    {admin_status_breakdown.map((item) => (
                      <div key={item.label} className="rounded-md border p-2">
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-xl font-semibold tabular-nums">{item.value}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Privileged Access Summary</CardTitle>
                    <CardDescription>
                      Overview of elevated administrative roles and privileged access assignments.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {privileged_role_summary.map((item) => (
                      <div key={item.role} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="truncate">{item.role}</span>
                          <span className="font-medium">{item.count}</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: `${Math.min(100, item.count * 20)}%` }} />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Authentication &amp; Policy Status</CardTitle>
                    <CardDescription>
                      Administrative authentication readiness and policy enforcement.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="rounded-md border p-2">
                      <p className="text-xs text-muted-foreground">MFA Enabled</p>
                      <p className="font-medium">{mfa_status}</p>
                    </div>
                    <div className="rounded-md border p-2">
                      <p className="text-xs text-muted-foreground">Password Policy Compliant</p>
                      <p className="font-medium">{password_policy_compliance}</p>
                    </div>
                    <div className="rounded-md border p-2">
                      <p className="text-xs text-muted-foreground">Recent Access Reviews Completed</p>
                      <p className="font-medium">{access_reviews_completed}</p>
                    </div>
                    <div className="rounded-md border p-2">
                      <p className="text-xs text-muted-foreground">Expiring Access Grants</p>
                      <p className="font-medium">{expiring_access_grants}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 px-4 md:grid-cols-2 xl:grid-cols-3 lg:px-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Admin Accounts</CardTitle>
                    <CardAction>{kpiBadge("neutral", "Stable")}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold tabular-nums"><NumberTicker value={total_admin_accounts} /></p>
                    <p className="text-xs text-muted-foreground">Administrative users with dashboard or operational access</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Active Admins Today</CardTitle>
                    <CardAction>{kpiBadge("live", "Live")}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold tabular-nums"><NumberTicker value={active_admins_today} /></p>
                    <p className="text-xs text-muted-foreground">Admins currently active or recently active</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Pending Access Requests</CardTitle>
                    <CardAction>{kpiBadge("warn", "Awaiting approval")}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold tabular-nums"><NumberTicker value={pending_access_requests} /></p>
                    <p className="text-xs text-muted-foreground">New or modified admin access awaiting review</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Privileged Accounts</CardTitle>
                    <CardAction>{kpiBadge("warn", "Monitor")}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold tabular-nums"><NumberTicker value={privileged_accounts} /></p>
                    <p className="text-xs text-muted-foreground">Accounts with elevated administrative privileges</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Inactive or Absent</CardTitle>
                    <CardAction>{kpiBadge("warn", "Review required")}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold tabular-nums"><NumberTicker value={inactive_admins} /></p>
                    <p className="text-xs text-muted-foreground">Admins with low activity or absence pattern</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Expiring Access Grants</CardTitle>
                    <CardAction>{kpiBadge("crit", "Needs review")}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold tabular-nums"><NumberTicker value={expiring_access_grants} /></p>
                    <p className="text-xs text-muted-foreground">Temporary or time-bound access nearing expiration</p>
                  </CardContent>
                </Card>
              </div>

              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Workflow</CardTitle>
                    <CardDescription>Leadership views for approvals, privileged access, and periodic reviews.</CardDescription>
                    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
                      <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
                        <TabsTrigger value="all">All Admins</TabsTrigger>
                        <TabsTrigger value="pending">Pending Approval</TabsTrigger>
                        <TabsTrigger value="privileged">Privileged Access</TabsTrigger>
                        <TabsTrigger value="inactive">Inactive / Absence</TabsTrigger>
                        <TabsTrigger value="reviews">Access Reviews</TabsTrigger>
                        <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2 md:grid-cols-7">
                      <Input
                        placeholder="Search by admin name / ID"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="md:col-span-2"
                      />
                      <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger><SelectValue placeholder="Role type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Roles</SelectItem>
                          <SelectItem value="Security Ops Admin">Security Ops Admin</SelectItem>
                          <SelectItem value="IAM & Policy Admin">IAM & Policy Admin</SelectItem>
                          <SelectItem value="Support Admin">Support Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                          <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                          <SelectItem value="Suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={mfaFilter} onValueChange={setMfaFilter}>
                        <SelectTrigger><SelectValue placeholder="MFA" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All MFA</SelectItem>
                          <SelectItem value="Enabled">Enabled</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Disabled">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={accessFilter} onValueChange={setAccessFilter}>
                        <SelectTrigger><SelectValue placeholder="Access" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Access</SelectItem>
                          <SelectItem value="Privileged">Privileged</SelectItem>
                          <SelectItem value="Standard">Standard</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={pendingFilter} onValueChange={setPendingFilter}>
                        <SelectTrigger><SelectValue placeholder="Pending" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="yes">Pending only</SelectItem>
                          <SelectItem value="no">Not pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-2">
                      <Select value={inactiveFilter} onValueChange={setInactiveFilter}>
                        <SelectTrigger className="w-[220px]"><SelectValue placeholder="Inactive / absent" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="yes">Inactive only</SelectItem>
                          <SelectItem value="no">Exclude inactive</SelectItem>
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
                                No admin records found.
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
                        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                          Previous
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
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
                    <CardTitle>Pending Access Approval</CardTitle>
                    <CardDescription>
                      Admin access requests awaiting Correspondent / Principal approval.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {pending_access_requests_list.map((item) => (
                      <div key={item.adminId} className="rounded-md border p-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-medium">{item.name}</p>
                          <Badge variant="outline">{item.requestedRole}</Badge>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">Reason: {item.reason}</p>
                        <p className="text-xs text-muted-foreground">
                          Request date: {item.requestDate} - Requested by: {item.requestedBy}
                        </p>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" variant="outline">Approve</Button>
                          <Button size="sm" variant="outline">Deny</Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Access Review Queue</CardTitle>
                    <CardDescription>
                      Accounts due for periodic review under security governance policy.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {access_review_queue.map((item) => (
                      <div key={item.adminId} className="rounded-md border p-3 text-xs">
                        <p className="font-medium text-sm">{item.adminName}</p>
                        <p className="text-muted-foreground">Role: {item.role}</p>
                        <p className="text-muted-foreground">Last review: {item.lastReviewDate}</p>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-muted-foreground">Next due: {item.nextReviewDue}</span>
                          <Badge variant={item.reviewStatus === "Overdue" ? "destructive" : "outline"}>{item.reviewStatus}</Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Inactive / Absence Monitoring</CardTitle>
                    <CardDescription>
                      Track admins with low activity, prolonged absence, or dormant access.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {inactive_admins_list.map((item) => (
                      <div key={item.adminId} className="rounded-md border p-3 text-xs">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{item.adminName}</p>
                          <Badge variant={item.accessRiskLevel === "High" ? "destructive" : "outline"}>{item.accessRiskLevel}</Badge>
                        </div>
                        <p className="text-muted-foreground">Days inactive: {item.daysInactive}</p>
                        <p className="text-muted-foreground">Role: {item.role}</p>
                        <p className="mt-1 text-muted-foreground">Recommended action: {item.recommendedAction}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Admin</CardTitle>
                    <CardDescription>
                      Quick contact and follow-up area for leadership.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="mb-2 text-xs text-muted-foreground">Recent admin activity</p>
                      <div className="space-y-2">
                        {recent_admin_activity.map((item) => (
                          <div key={item.id} className="rounded-md border p-2 text-xs">
                            <p className="font-medium">{item.activity}</p>
                            <p className="text-muted-foreground">{item.adminName} - {item.timestamp}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="mb-2 text-xs text-muted-foreground">High-priority follow-up</p>
                      <div className="space-y-2">
                        {contact_admin_list.map((item) => (
                          <div key={item.adminName} className="flex items-center justify-between rounded-md border p-2 text-xs">
                            <div>
                              <p className="font-medium">{item.adminName}</p>
                              <p className="text-muted-foreground">{item.reason}</p>
                            </div>
                            <Badge variant={item.priority === "High" ? "destructive" : "outline"}>{item.priority}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline"><IconMail /> Contact admin</Button>
                      <Button size="sm" variant="outline">Escalate to response team</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Grant or Review Admin Access</CardTitle>
                    <CardDescription>
                      Leadership workflow for onboarding new admins or approving role changes.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="full-name">Full Name</Label>
                      <Input id="full-name" placeholder="Admin full name" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="role-type">Role Type</Label>
                      <Input id="role-type" placeholder="Role type" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="access-level">Access Level</Label>
                      <Select>
                        <SelectTrigger id="access-level"><SelectValue placeholder="Select access" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="privileged">Privileged</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" placeholder="Department / Area" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="temporary-access">Temporary Access</Label>
                      <Select>
                        <SelectTrigger id="temporary-access"><SelectValue placeholder="Temporary access" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input id="start-date" placeholder="Mar 18, 2026" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input id="end-date" placeholder="Mar 31, 2026" />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="notes">Notes / Reason</Label>
                      <Textarea id="notes" className="min-h-20" placeholder="Reason for access grant or review." />
                    </div>
                    <div className="flex gap-2 sm:col-span-2">
                      <Button><IconAlertTriangle /> Approve Access</Button>
                      <Button variant="outline">Save for Review</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Customizable Admin Access Widget</CardTitle>
                      <CardDescription>
                        Add additional access governance metrics, admin activity widgets, or approval tools.
                      </CardDescription>
                    </div>
                    <Button size="sm"><IconPlus /> Add Widget</Button>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Future widgets: login heatmap, admin activity by day, MFA exception list, dormant privileged accounts, access changes this week, and approval turnaround time.
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
