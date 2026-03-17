import { IconPhoneCall } from "@tabler/icons-react"

import { quickActions } from "@/components/dashboard/data"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Immediate leadership controls for alerts, escalation, and governance
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action) => (
          <Button
            key={action.title}
            variant={action.title === "Send Immediate Alert" ? "default" : "outline"}
            className="h-auto min-h-16 justify-start py-3 text-left"
          >
            <span>
              <span className="block font-medium">{action.title}</span>
              <span className="text-xs text-muted-foreground">
                {action.description}
              </span>
            </span>
          </Button>
        ))}
        <div className="rounded-lg border p-3 sm:col-span-2 lg:col-span-3">
          <p className="text-sm font-medium">Security Access Settings</p>
          <p className="text-xs text-muted-foreground">
            Profile access, MFA settings, and notification preferences are
            available in Account and Settings.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="secondary">MFA Enabled</Badge>
            <Badge variant="outline">Recovery Status: Ready</Badge>
            <Badge variant="outline">Last Verification: Mar 15, 2026</Badge>
          </div>
          <div className="mt-3 flex gap-2">
            <Button size="sm" variant="outline">
              <IconPhoneCall />
              Contact Security Admin
            </Button>
            <Button size="sm" variant="outline">
              Open Settings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
