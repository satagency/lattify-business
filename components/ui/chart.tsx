// components/ui/chart.tsx

"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
    color?: string
    theme?: {
      light?: string
      dark?: string
    }
  }
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-muted/40 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-muted [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-reference-line-line]:stroke-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

// List of Recharts-specific props that should not be passed to DOM elements
const RECHARTS_DOM_PROPS = [
  'allowEscapeViewBox',
  'animationBegin',
  'animationDuration',
  'animationEasing',
  'animationId',
  'coordinate',
  'cursor',
  'viewBox',
  'axisId',
  'contentStyle',
  'content',
  'itemStyle',
  'labelStyle',
  'separator',
  'wrapperStyle',
  'filterNull',
  'isAnimationActive',
  'align',
  'layout',
  'iconSize',
  'iconType',
] as const

type RechartsDomProp = typeof RECHARTS_DOM_PROPS[number]

// Helper function to filter out Recharts props from props object
const filterRechartsProps = (props: any) => {
  const filtered: any = {}
  const propsToFilter = new Set(RECHARTS_DOM_PROPS)
  for (const key in props) {
    if (!propsToFilter.has(key as RechartsDomProp)) {
      filtered[key] = props[key]
    }
  }
  return filtered
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

type TooltipProps = React.ComponentProps<typeof RechartsPrimitive.Tooltip> & {
  active?: boolean
  payload?: Array<{
    dataKey?: string
    name?: string
    value?: number | string
    payload?: any
    color?: string
    fill?: string
  }>
  label?: string
  labelFormatter?: (value: any, payload: any[]) => React.ReactNode
  formatter?: (value: any, name: any, item: any, index: number, payload: any) => React.ReactNode
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  TooltipProps &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelKey,
      labelFormatter,
      nameKey,
      formatter,
      ...props
    },
    ref
  ) => {
    const { config } = useChart()

    // Filter out Recharts-specific props that shouldn't be on DOM elements
    const domProps = filterRechartsProps(props)

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = config[key as keyof typeof config]
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className="font-medium">
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className="font-medium">{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs shadow-md dark:border-gray-800 dark:bg-gray-900",
          className
        )}
        {...domProps}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.dataKey || item.name || "value"}`
            const itemConfig = config[key as keyof typeof config]
            const indicatorColor = item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  nestLabel ? "items-center" : "items-start"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-1 border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "line",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 items-center justify-between leading-none",
                        nestLabel ? "gap-2" : "gap-4"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-gray-600 dark:text-gray-400">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-gray-900 dark:text-gray-50">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = RechartsPrimitive.Legend

type LegendProps = {
  payload?: Array<{
    value?: string
    dataKey?: string
    color?: string
  }>
  verticalAlign?: "top" | "bottom"
}

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    LegendProps & {
      hideIcon?: boolean
      nameKey?: string
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey, ...props },
    ref
  ) => {
    const { config } = useChart()

    // Filter out Recharts-specific props that shouldn't be on DOM elements
    const domProps = filterRechartsProps(props)

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
        {...domProps}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`
          const itemConfig = config[key as keyof typeof config]

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label || item.value}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}

