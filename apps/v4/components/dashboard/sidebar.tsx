"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileDescription,
  IconFileWord,
  IconListDetails,
  IconNotification,
  IconReport,
  IconSettings,
  IconShield,
  IconShieldCheck,
  IconSquareCheck,
  IconUserCircle,
  IconUsers,
  type Icon,
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

type NavItem = {
  title: string
  icon: Icon
  url: string
}

type DocumentItem = {
  name: string
  icon: Icon
  url: string
}

const navMain: NavItem[] = [
  {
    title: "Dashboard",
    icon: IconDashboard,
    url: "/security-leadership-dashboard",
  },
  {
    title: "Security Overview",
    icon: IconShieldCheck,
    url: "/security-leadership-dashboard",
  },
  { title: "Compliance", icon: IconChartBar, url: "/compliance" },
  { title: "Incidents", icon: IconListDetails, url: "/incidents" },
  { title: "Tickets", icon: IconSquareCheck, url: "/tickets" },
  { title: "Admin Access", icon: IconUsers, url: "/admin-access" },
]

const documents: DocumentItem[] = [
  {
    name: "Files",
    icon: IconDatabase,
    url: "/security-leadership-dashboard/files",
  },
  {
    name: "Policies",
    icon: IconFileDescription,
    url: "/security-leadership-dashboard/policies",
  },
  {
    name: "Reports",
    icon: IconReport,
    url: "/security-leadership-dashboard/reports",
  },
  {
    name: "Audit History",
    icon: IconFileWord,
    url: "/security-leadership-dashboard/audit-history",
  },
]

const account: NavItem[] = [
  { title: "Notifications", icon: IconNotification, url: "#" },
  { title: "Profile", icon: IconUserCircle, url: "#" },
  { title: "Settings", icon: IconSettings, url: "#" },
]

export function DashboardSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  const pathname = usePathname()

  const isRouteActive = React.useCallback(
    (url: string) => pathname === url || pathname.startsWith(`${url}/`),
    [pathname]
  )

  return (
    <Sidebar collapsible="icon" variant="sidebar" {...props}>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <IconShield className="size-5!" />
                <span className="text-base font-semibold">SECURED 369</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarMenu>
              {navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isRouteActive(item.url)}
                    asChild
                  >
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

        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Documents / Governance</SidebarGroupLabel>
          <SidebarMenu>
            {documents.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton isActive={isRouteActive(item.url)} asChild>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarMenu>
              {account.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src="/avatars/shadcn.jpg" alt="Principal" />
                <AvatarFallback className="rounded-lg">CP</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  Correspondent / Principal
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  principal@secured369.edu
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
