import type { AccessTaskItem } from "@/lib/mock-data/admin-users-access"
import { Checkbox } from "@/registry/new-york-v4/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"

export function MyAccessTasksCard({ tasks }: { tasks: AccessTaskItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">My Access Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {tasks.map((task) => (
          <label key={task.id} className="flex cursor-pointer items-start gap-2 rounded-md border border-border/70 p-2">
            <Checkbox checked={task.done} />
            <span className="flex-1 text-sm">
              <span className={task.done ? "line-through text-muted-foreground" : ""}>{task.title}</span>
              <span className="mt-1 block text-xs text-muted-foreground">{task.bucket}</span>
            </span>
          </label>
        ))}
      </CardContent>
    </Card>
  )
}

