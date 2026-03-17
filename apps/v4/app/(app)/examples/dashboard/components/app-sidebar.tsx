"use client"

import * as React from "react"
import Link from "next/link"
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
} from "@tabler/icons-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/registry/new-york-v4/ui/sidebar"
import { NavDocuments } from "@/app/(app)/examples/dashboard/components/nav-documents"
import { NavMain } from "@/app/(app)/examples/dashboard/components/nav-main"
import { NavSecondary } from "@/app/(app)/examples/dashboard/components/nav-secondary"
import { NavUser } from "@/app/(app)/examples/dashboard/components/nav-user"

const data = {
  user: {
    name: "Correspondent / Principal",
    email: "principal@greenfield.k12.edu",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Security Overview",
      url: "#",
      icon: IconShieldCheck,
    },
    {
      title: "Compliance",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Incidents",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Tickets",
      url: "#",
      icon: IconSquareCheck,
    },
    {
      title: "Admin Access",
      url: "#",
      icon: IconUsers,
    },
  ],
  documents: [
    {
      name: "Files",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Policies",
      url: "#",
      icon: IconFileDescription,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Audit History",
      url: "#",
      icon: IconFileWord,
    },
  ],
  navSecondary: [
    {
      title: "Notifications",
      url: "#",
      icon: IconNotification,
    },
    {
      title: "Profile",
      url: "#",
      icon: IconUserCircle,
    },
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="none" className="h-auto border-r" {...props}>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="#">
                <IconShield className="size-5!" />
                <span className="text-base font-semibold">
                  Greenfield SD Security
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
