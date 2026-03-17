"use client"

import { IconCirclePlusFilled, IconMail, IconPhoneCall } from "@tabler/icons-react"

import {
  incidentTimeline,
  policyFiles,
  quickActions,
  recentIncidents,
  type IncidentItem,
  type PolicyFileItem,
} from "@/app/(app)/examples/dashboard/dashboard-data"
import { Badge } from "@/registry/new-york-v4/ui/badge"
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

function severityBadge(severity: IncidentItem["severity"]) {
  if (severity === "Critical") {
    return <Badge variant="destructive">Critical</Badge>
  }

  if (severity === "High") {
    return <Badge className="bg-amber-500 text-black">High</Badge>
  }

  if (severity === "Medium") {
    return <Badge variant="outline" className="text-amber-600">Medium</Badge>
  }

  return <Badge variant="secondary">Low</Badge>
}

function statusBadge(status: IncidentItem["status"]) {
  if (status === "Active Now") {
    return <Badge variant="destructive">Active now</Badge>
  }

  if (status === "Under Review") {
    return <Badge variant="outline" className="text-amber-600">Under review</Badge>
  }

  return <Badge variant="secondary">Scheduled follow-up</Badge>
}

function fileStatusBadge(status: PolicyFileItem["status"]) {
  switch (status) {
    case "Uploaded":
      return <Badge variant="outline">Uploaded</Badge>
    case "Pending Admin Review":
      return <Badge variant="outline" className="text-amber-600">Pending Admin Review</Badge>
    case "Verified":
      return <Badge variant="secondary">Verified</Badge>
    case "Implemented":
      return <Badge className="bg-emerald-600 text-white">Implemented</Badge>
    default:
      return <Badge variant="destructive">Rejected</Badge>
  }
}

export function DataTable() {
  return (
    <div className="grid gap-4 px-4 lg:px-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Incidents &amp; Alerts</CardTitle>
            <CardDescription>
              Active now, under review, and scheduled follow-up visibility
            </CardDescription>
          </div>
          <Button size="sm" variant="outline">
            <IconMail />
            Contact Admin Team
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Incident title</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned admin</TableHead>
                  <TableHead>Last updated</TableHead>
                  <TableHead className="text-right">Contact action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentIncidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell>
                      <div className="font-medium">{incident.title}</div>
                      <div className="text-xs text-muted-foreground">{incident.id}</div>
                    </TableCell>
                    <TableCell>{severityBadge(incident.severity)}</TableCell>
                    <TableCell>{statusBadge(incident.status)}</TableCell>
                    <TableCell>{incident.assignedAdmin}</TableCell>
                    <TableCell>{incident.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      {/* TODO(api): Wire admin contact/escalation workflow actions. */}
                      <Button size="sm" variant="outline">
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

      <Card>
        <CardHeader>
          <CardTitle>Incident Follow-up Timeline</CardTitle>
          <CardDescription>
            Report date, status, owner, review schedule, and escalation deadlines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report date</TableHead>
                  <TableHead>Incident</TableHead>
                  <TableHead>Current status</TableHead>
                  <TableHead>Assigned owner</TableHead>
                  <TableHead>Next review date</TableHead>
                  <TableHead>Escalation due date</TableHead>
                  <TableHead>Expected resolution</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incidentTimeline.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.reportDate}</TableCell>
                    <TableCell className="font-medium">{item.incident}</TableCell>
                    <TableCell>{item.currentStatus}</TableCell>
                    <TableCell>{item.assignedOwner}</TableCell>
                    <TableCell>{item.nextReviewDate}</TableCell>
                    <TableCell>{item.escalationDueDate}</TableCell>
                    <TableCell>{item.expectedResolution}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Files &amp; Policy Intake</CardTitle>
            <CardDescription>
              Governance CSV uploads with verification and access history tracking
            </CardDescription>
          </div>
          {/* TODO(api): Connect CSV upload endpoint and validation pipeline. */}
          <Button size="sm">
            <IconCirclePlusFilled />
            Upload CSV
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Uploaded by</TableHead>
                  <TableHead>Uploaded date</TableHead>
                  <TableHead>Admin verification status</TableHead>
                  <TableHead>Access history</TableHead>
                  <TableHead>Verification owner</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policyFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <div className="font-medium">{file.fileName}</div>
                      <div className="text-xs text-muted-foreground">{file.id}</div>
                    </TableCell>
                    <TableCell>{fileStatusBadge(file.status)}</TableCell>
                    <TableCell>{file.uploadedBy}</TableCell>
                    <TableCell>{file.uploadedDate}</TableCell>
                    <TableCell>{file.adminVerificationStatus}</TableCell>
                    <TableCell>
                      {file.accessedBy} - {file.lastAccessedDate}
                    </TableCell>
                    <TableCell>{file.verificationOwner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            TODO(api): Integrate access-history events and policy verification workflow status updates.
          </p>
        </CardContent>
      </Card>

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
                <span className="text-xs text-muted-foreground">{action.description}</span>
              </span>
            </Button>
          ))}
          <div className="rounded-lg border p-3 sm:col-span-2 lg:col-span-3">
            <p className="text-sm font-medium">Security Access Settings</p>
            <p className="text-xs text-muted-foreground">
              Profile access, MFA settings, and notification preferences are available in Account and Settings.
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
    </div>
  )
}
