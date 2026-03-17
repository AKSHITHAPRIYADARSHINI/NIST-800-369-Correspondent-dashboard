import { IconCirclePlusFilled } from "@tabler/icons-react"

import { policyFiles } from "@/components/dashboard/data"
import { fileStatusBadge } from "@/components/dashboard/shared-badges"
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

export function PolicyFilesTable() {
  return (
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
          TODO(api): Integrate access-history events and policy verification
          workflow status updates.
        </p>
      </CardContent>
    </Card>
  )
}
