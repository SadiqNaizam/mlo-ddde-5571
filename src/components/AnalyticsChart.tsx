import * as React from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

// Interface for a single line on the chart
interface ChartLineConfig {
  dataKey: string;
  name: string;
  color: string;
}

// Props for the AnalyticsChart component
interface AnalyticsChartProps {
  title: string;
  description: string;
  data: any[];
  dataKeyX: string;
  lines: ChartLineConfig[];
  className?: string;
  yAxisFormatter?: (value: any) => string;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  title,
  description,
  data,
  dataKeyX,
  lines,
  className,
  yAxisFormatter,
}) => {
  console.log("AnalyticsChart loaded");

  // Dynamically create the chartConfig for ChartContainer and Tooltip
  const chartConfig = lines.reduce((config, line) => {
    config[line.dataKey] = {
      label: line.name,
      color: line.color,
    };
    return config;
  }, {} as ChartConfig);

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              accessibilityLayer
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey={dataKeyX}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickFormatter={yAxisFormatter}
              />
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Legend />
              {lines.map((line) => (
                <Line
                  key={line.dataKey}
                  dataKey={line.dataKey}
                  type="monotone"
                  stroke={`var(--color-${line.dataKey})`}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={700}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;