
'use client';

import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { Line, Area, LineChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig
} from '@/components/ui/chart';
import type { ChartDataPoint } from '@/types'; // Assuming ChartDataPoint might need to support multiple values
import { cn } from '@/lib/utils';

// Define a new type for multi-series data if needed, or adapt ChartDataPoint
interface MultiSeriesChartDataPoint {
  name: string;
  total: number;
  failed?: number; // Optional second series
}

const initialChartData: MultiSeriesChartDataPoint[] = [
  { name: 'Jan', total: 0, failed: 0 },
  { name: 'Feb', total: 0, failed: 0 },
  { name: 'Mar', total: 0, failed: 0 },
  { name: 'Apr', total: 0, failed: 0 },
  { name: 'May', total: 0, failed: 0 },
  { name: 'Jun', total: 0, failed: 0 },
];

const chartConfig = {
  total: {
    label: 'Total Transactions',
    color: 'hsl(var(--chart-1))', // Primary (Green)
  },
  failed: {
    label: 'Failed Transactions',
    color: 'hsl(var(--chart-3))', // Accent Secondary (Cool Blue)
  }
} satisfies ChartConfig;


export function TransactionTrendGraph() {
  const [data, setData] = useState<MultiSeriesChartDataPoint[]>(initialChartData);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData(prevData => prevData.map(item => ({
        ...item,
        total: Math.floor(Math.random() * 4000) + 1000,
        failed: Math.floor(Math.random() * 500) // Simulate some failed transactions
      })));
    }, 5000); 
    
     setData(initialChartData.map(item => ({
        ...item,
        total: Math.floor(Math.random() * 4000) + 1000,
        failed: Math.floor(Math.random() * 500) 
      })));

    return () => clearInterval(intervalId);
  }, []);


  return (
    <Card className={cn("shadow-xl border-transparent h-full backdrop-blur-md bg-card/70")}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <TrendingUp className="h-7 w-7 text-accent filter drop-shadow(0 0 4px hsl(var(--accent)/0.8))" />
          Transaction Velocity
        </CardTitle>
        <CardDescription className="text-muted-foreground">Monthly transaction volume & flux.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.2)" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--foreground)/0.7)" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                tickLine={{ stroke: 'hsl(var(--border)/0.3)' }}
              />
              <YAxis 
                stroke="hsl(var(--foreground)/0.7)" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickLine={{ stroke: 'hsl(var(--border)/0.3)' }}
              />
              <RechartsTooltip
                cursor={{fill: 'hsl(var(--accent)/0.1)'}}
                content={<ChartTooltipContent 
                            indicator="line" 
                            labelClassName="text-foreground font-semibold"
                            className="bg-card/90 backdrop-blur-sm border-accent/50 shadow-xl rounded-lg" 
                          />}
              />
              <Legend content={<ChartLegendContent className="text-muted-foreground" />} />
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-total)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--color-total)" stopOpacity={0.05}/>
                </linearGradient>
                 <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-failed)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--color-failed)" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="total"
                stroke="transparent"
                fillOpacity={1}
                fill="url(#colorTotal)"
              />
              <Line
                type="monotone"
                dataKey="total"
                strokeWidth={3}
                stroke="var(--color-total)" 
                dot={{
                  fill: "var(--color-total)",
                  r: 4,
                  strokeWidth: 2,
                  stroke: 'hsl(var(--background))'
                }}
                activeDot={{
                  r: 6,
                  strokeWidth: 2,
                  fill: 'hsl(var(--background))',
                  stroke: 'var(--color-total)',
                  style: { filter: 'drop-shadow(0 0 5px var(--color-total))' }
                }}
              />
               <Area
                type="monotone"
                dataKey="failed"
                stroke="transparent"
                fillOpacity={1}
                fill="url(#colorFailed)"
              />
              <Line
                type="monotone"
                dataKey="failed"
                strokeWidth={2}
                stroke="var(--color-failed)"
                dot={{
                  fill: "var(--color-failed)",
                  r: 3,
                  strokeWidth: 1,
                  stroke: 'hsl(var(--background))'
                }}
                activeDot={{
                  r: 5,
                  strokeWidth: 1,
                  fill: 'hsl(var(--background))',
                  stroke: 'var(--color-failed)',
                   style: { filter: 'drop-shadow(0 0 4px var(--color-failed))' }
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
