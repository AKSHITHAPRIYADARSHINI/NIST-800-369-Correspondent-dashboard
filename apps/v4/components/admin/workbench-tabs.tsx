import type { DeviceTrustReview, SuspiciousSession } from "@/lib/mock-data/security-operations"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/new-york-v4/ui/tabs"
import { Separator } from "@/registry/new-york-v4/ui/separator"

export function WorkbenchTabs({
  suspiciousSessions,
  deviceTrustReviews,
}: {
  suspiciousSessions: SuspiciousSession[]
  deviceTrustReviews: DeviceTrustReview[]
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Operations Workbench</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="user-access" className="space-y-3">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="user-access">User Access Checks</TabsTrigger>
            <TabsTrigger value="device-verify">Device Verification</TabsTrigger>
            <TabsTrigger value="submissions">Suspicious Submissions</TabsTrigger>
            <TabsTrigger value="drafts">Notification Drafts</TabsTrigger>
            <TabsTrigger value="notes">Follow-up Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="user-access" className="space-y-2">
            {suspiciousSessions.map((session) => (
              <div key={session.id} className="rounded-md border border-border/70 p-2 text-sm">
                <p className="font-medium">{session.userName}</p>
                <p className="text-xs text-muted-foreground">{session.sessionDetail}</p>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="device-verify" className="space-y-2">
            {deviceTrustReviews.map((review) => (
              <div key={review.id} className="rounded-md border border-border/70 p-2 text-sm">
                <p className="font-medium">{review.deviceName} - {review.userName}</p>
                <p className="text-xs text-muted-foreground">{review.actionNeeded}</p>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="submissions" className="text-sm text-muted-foreground">
            2 suspicious form submissions need manual review and attachment validation.
            <Separator className="my-2" />
            Queue includes one escalated item with malware signature flags.
          </TabsContent>

          <TabsContent value="drafts" className="text-sm text-muted-foreground">
            3 notification drafts are pending actions: one teacher advisory and two parent updates.
          </TabsContent>

          <TabsContent value="notes" className="text-sm text-muted-foreground">
            Add verification notes for each review before closing or escalating tasks.
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

