import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface IngredientLevelWidgetProps {
  label: string;
  currentAmount: number;
  maxAmount: number;
  unit: string;
  size?: number;
}

const IngredientLevelWidget: React.FC<IngredientLevelWidgetProps> = ({
  label,
  currentAmount,
  maxAmount,
  unit,
  size = 120, // Default size in pixels
}) => {
  console.log('IngredientLevelWidget loaded for:', label);

  const percentage = maxAmount > 0 ? Math.round((currentAmount / maxAmount) * 100) : 0;

  const getColor = () => {
    if (percentage < 15) return '#ef4444'; // red-500 for critical
    if (percentage < 50) return '#f59e0b'; // amber-500 for low
    return '#22c55e'; // green-500 for healthy
  };

  const color = getColor();
  
  // Data for the radial bar chart
  const data = [{ name: 'level', value: percentage, fill: color }];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center justify-center gap-2" style={{ width: size }}>
            <div style={{ width: size, height: size }} className="relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="70%"
                  outerRadius="100%"
                  data={data}
                  startAngle={90}
                  endAngle={-270} // A full 360-degree circle
                  barSize={10}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar
                    background={{ fill: 'hsl(var(--secondary))' }} // Use theme color for the track
                    dataKey="value"
                    cornerRadius={10}
                    className="transition-all duration-500"
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
                <span className="text-2xl font-bold" style={{ color }}>
                  {`${percentage}%`}
                </span>
              </div>
            </div>
            <p className="text-sm font-medium text-center truncate w-full text-muted-foreground">
              {label}
            </p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{`Stock: ${currentAmount} / ${maxAmount} ${unit}`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default IngredientLevelWidget;