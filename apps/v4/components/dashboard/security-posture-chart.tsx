"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/registry/new-york-v4/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/new-york-v4/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select"

type SecurityPosturePoint = {
  date: string
  securityScore: number
  complianceTrend: number
}

const chartConfig = {
  securityScore: {
    label: "Security Score",
    color: "var(--chart-1)",
  },
  complianceTrend: {
    label: "Compliance Trend",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

function formatDateKey(date: Date) {
  return date.toISOString().slice(0, 10)
}

function buildFallbackSeries(anchorDate: Date, days = 90): SecurityPosturePoint[] {
  const points: SecurityPosturePoint[] = []
  const totalPoints = Math.max(12, Math.floor(days / 3))

  for (let index = totalPoints - 1; index >= 0; index--) {
    const date = new Date(anchorDate)
    date.setDate(anchorDate.getDate() - index * 3)

    const progress = (totalPoints - index) / totalPoints
    const securityScore = Math.round(82 + progress * 9 + (index % 3 === 0 ? 1 : 0))
    const compliance = Math.round(77 + progress * 10 + (index % 4 === 0 ? 1 : 0))
    const activeIncidents = Math.max(2, 9 - Math.floor(progress * 6))

    points.push({
      date: formatDateKey(date),
      securityScore: Math.min(securityScore, 95),
      complianceTrend: Math.min(compliance - Math.floor(activeIncidents / 2), 92),
    })
  }

  return points
}

function getSecurityPostureSeries(): SecurityPosturePoint[] {
  const now = new Date()

  // TODO(api): Replace mock security posture series with enrollment-date
  // or uploaded CSV-driven timeline data.
  const onboardingDate: Date | null = null
  const uploadedCsvTimelineData: SecurityPosturePoint[] | null = null

  if (uploadedCsvTimelineData?.length) {
    return uploadedCsvTimelineData
  }

  const anchorDate = onboardingDate ?? now
  return buildFallbackSeries(anchorDate, 90)
}

export function SecurityPostureChart() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")
  const timelineData = React.useMemo(() => getSecurityPostureSeries(), [])

  const filteredData = React.useMemo(() => {
    const now = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }

    const startDate = new Date(now)
    startDate.setDate(startDate.getDate() - daysToSubtract)

    return timelineData.filter((item) => new Date(item.date) >= startDate)
  }, [timeRange, timelineData])

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Security Posture Overview</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Live view of security health, incidents, and compliance performance
          </span>
          <span className="@[540px]/card:hidden">Live security trend</span>
        </CardDescription>
        <CardAction>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillSecurityScore" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-securityScore)"
                  stopOpacity={0.45}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-securityScore)"
                  stopOpacity={0.03}
                />
              </linearGradient>
              <linearGradient id="fillComplianceTrend" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-complianceTrend)"
                  stopOpacity={0.25}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-complianceTrend)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="complianceTrend"
              type="monotone"
              fill="url(#fillComplianceTrend)"
              stroke="var(--color-complianceTrend)"
              strokeWidth={2}
              dot={false}
            />
            <Area
              dataKey="securityScore"
              type="monotone"
              fill="url(#fillSecurityScore)"
              stroke="var(--color-securityScore)"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
