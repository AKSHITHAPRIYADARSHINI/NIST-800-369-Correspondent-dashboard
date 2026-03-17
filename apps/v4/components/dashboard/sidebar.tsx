"use client"

import * as React from "react"
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
  { title: "Dashboard", icon: IconDashboard, url: "/dashboard" },
  { title: "Security Overview", icon: IconShieldCheck, url: "/dashboard" },
  { title: "Compliance", icon: IconChartBar, url: "/dashboard/compliance" },
  { title: "Incidents", icon: IconListDetails, url: "#" },
  { title: "Tickets", icon: IconSquareCheck, url: "#" },
  { title: "Admin Access", icon: IconUsers, url: "#" },
]

const documents: DocumentItem[] = [
  { name: "Files", icon: IconDatabase, url: "#" },
  { name: "Policies", icon: IconFileDescription, url: "#" },
  { name: "Reports", icon: IconReport, url: "#" },
  { name: "Audit History", icon: IconFileWord, url: "#" },
]

const account: NavItem[] = [
  { title: "Notifications", icon: IconNotification, url: "#" },
  { title: "Profile", icon: IconUserCircle, url: "#" },
  { title: "Settings", icon: IconSettings, url: "#" },
]

export function DashboardSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
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
                  <SidebarMenuButton tooltip={item.title} asChild>
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

        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Documents / Governance</SidebarGroupLabel>
          <SidebarMenu>
            {documents.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </a>
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
