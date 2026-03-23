import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"

export function DeviceRemediationQueue({ items }: { items: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Device Remediation Queue</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => (
          <div key={item} className="flex items-center justify-between rounded-md border border-border/70 p-2 text-sm">
            <span>{item}</span>
            <Badge variant="outline">Queue</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

