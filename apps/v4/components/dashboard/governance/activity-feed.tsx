import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import { ScrollArea } from "@/registry/new-york-v4/ui/scroll-area"
import { Separator } from "@/registry/new-york-v4/ui/separator"
import { Skeleton } from "@/registry/new-york-v4/ui/skeleton"

type ActivityItem = {
  id: string
  title: string
  detail: string
  at: string
}

export function ActivityFeed({
  title,
  description,
  items,
  loading = false,
}: {
  title: string
  description: string
  items: ActivityItem[]
  loading?: boolean
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 pr-3">
          <div className="space-y-3">
            {loading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-3 w-1/3" />
                    {idx < 3 ? <Separator /> : null}
                  </div>
                ))
              : items.map((item, idx) => (
                  <div key={item.id} className="space-y-1.5">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                    <p className="text-xs text-muted-foreground">{item.at}</p>
                    {idx < items.length - 1 ? <Separator /> : null}
                  </div>
                ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
