"use client"

import { IconCirclePlusFilled } from "@tabler/icons-react"

import { DashboardCalendar } from "@/components/dashboard/dashboard-calendar"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/new-york-v4/ui/popover"
import { Separator } from "@/registry/new-york-v4/ui/separator"

const accentColors = [
  "Blue",
  "Green",
  "Neutral",
  "Orange",
  "Red",
  "Rose",
  "Violet",
  "Yellow",
] as const

export type DashboardAccent = (typeof accentColors)[number]

type QuickCreateMenuProps = {
  selectedAccent: DashboardAccent
  onAccentChange: (accent: DashboardAccent) => void
}

export function QuickCreateMenu({
  selectedAccent,
  onAccentChange,
}: QuickCreateMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" className="h-7">
          <IconCirclePlusFilled />
          <span>Quick Create</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] rounded-xl p-3" align="end">
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-sm font-medium">Theme colors</p>
            <p className="text-xs text-muted-foreground">
              Dashboard accent preset
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {accentColors.map((color) => (
              <Button
                key={color}
                type="button"
                variant={selectedAccent === color ? "default" : "outline"}
                size="sm"
                className="h-7"
                onClick={() => onAccentChange(color)}
              >
                {color}
              </Button>
            ))}
          </div>
          <Badge variant="outline" className="text-muted-foreground">
            Selected: {selectedAccent}
          </Badge>
          <Separator />
          <div className="space-y-2">
            <p className="text-sm font-medium">Calendar</p>
            <DashboardCalendar />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
