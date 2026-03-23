"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  IconActivityHeartbeat,
  IconAlertTriangle,
  IconApps,
  IconBell,
  IconBook,
  IconChartBar,
  IconDatabase,
  IconDashboard,
  IconFileDescription,
  IconFileWord,
  IconFingerprint,
  IconKey,
  IconLink,
  IconListDetails,
  IconNotification,
  IconReport,
  IconServer,
  IconSettings,
  IconShieldCheck,
  IconShieldCog,
  IconTicket,
  IconUserCircle,
  IconUserShield,
  IconUsers,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york-v4/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/registry/new-york-v4/ui/sidebar"

type Item = { title: string; icon: typeof IconDashboard; url: string }

type Group = { label: string; items: Item[] }

const groups: Group[] = [
  {
    label: "Main",
    items: [
      { title: "Dashboard", icon: IconDashboard, url: "/admin-dashboard" },
      {
        title: "Security Operations",
        icon: IconShieldCheck,
        url: "/admin-dashboard/security-operations",
      },
      { title: "Compliance", icon: IconChartBar, url: "/admin-dashboard/compliance" },
      { title: "Incidents", icon: IconListDetails, url: "/admin-dashboard/incidents" },
      { title: "Tickets", icon: IconTicket, url: "/admin-dashboard/tickets" },
      { title: "Risk Register", icon: IconAlertTriangle, url: "/admin-dashboard/risk-register" },
    ],
  },
  {
    label: "Monitoring",
    items: [
      { title: "Devices", icon: IconDatabase, url: "/admin-dashboard/devices" },
      { title: "Users & Access", icon: IconUsers, url: "/admin-dashboard/users-access" },
      { title: "Authentication", icon: IconFingerprint, url: "/admin-dashboard/authentication" },
      { title: "Vulnerabilities", icon: IconShieldCog, url: "/admin-dashboard/vulnerabilities" },
      { title: "Alerts", icon: IconNotification, url: "/admin-dashboard/alerts" },
    ],
  },
  {
    label: "Governance",
    items: [
      { title: "Policies", icon: IconFileDescription, url: "/admin-dashboard/policies" },
      { title: "Files", icon: IconDatabase, url: "/admin-dashboard/files" },
      { title: "Reports", icon: IconReport, url: "/admin-dashboard/reports" },
      { title: "Audit History", icon: IconFileWord, url: "/admin-dashboard/audit-history" },
      {
        title: "Third-Party Vendors",
        icon: IconUserShield,
        url: "/admin-dashboard/vendors",
      },
    ],
  },
  {
    label: "Platform / Security Engineering",
    items: [
      { title: "Applications", icon: IconApps, url: "/admin-dashboard/applications" },
      { title: "SDLC Security", icon: IconBook, url: "/admin-dashboard/sdlc-security" },
      { title: "Integrations", icon: IconLink, url: "/admin-dashboard/integrations" },
      { title: "System Health", icon: IconServer, url: "/admin-dashboard/system-health" },
    ],
  },
]

const account = [
  { title: "Notifications", icon: IconBell, url: "#" },
  { title: "Profile", icon: IconUserCircle, url: "#" },
  { title: "Settings", icon: IconSettings, url: "#" },
]

export function AdminSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  const isActive = (url: string) => pathname === url || pathname.startsWith(`${url}/`)

  return (
    <Sidebar collapsible="icon" variant="sidebar" {...props}>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <Link href="/admin-dashboard">
                <IconActivityHeartbeat className="size-5!" />
                <span className="text-base font-semibold">SECURED 369 Ops</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupContent>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={isActive(item.url)} tooltip={item.title} asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarMenu>
              {account.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src="/avatars/shadcn.jpg" alt="Admin" />
                <AvatarFallback className="rounded-lg">SA</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Security Admin</span>
                <span className="truncate text-xs text-muted-foreground">admin.ops@secured369.edu</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
