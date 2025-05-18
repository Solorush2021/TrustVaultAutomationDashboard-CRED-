
'use client';

import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig
} from '@/components/ui/chart';
import type { ChartDataPoint } from '@/types';
import { cn } from '@/lib/utils';

const initialChartData: ChartDataPoint[] = [
  { name: 'Jan', value: 0 },
  { name: 'Feb', value: 0 },
  { name: 'Mar', value: 0 },
  { name: 'Apr', value: 0 },
  { name: 'May', value: 0 },
  { name: 'Jun', value: 0 },
];

// ChartConfig colors will use HSL variables from the theme
const chartConfig = {
  transactions: {
    label: 'Transactions',
    color: 'hsl(var(--primary))', 
  },
  volume: { 
    label: 'Volume',
    color: 'hsl(var(--accent))', 
  }
} satisfies ChartConfig;


export function TransactionTrendGraph() {
  const [data, setData] = useState<ChartDataPoint[]>(initialChartData);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData(prevData => prevData.map(item => ({
        ...item,
        value: Math.floor(Math.random() * 5000) + 1000
      })));
    }, 5000); 
    
     setData(initialChartData.map(item => ({
        ...item,
        value: Math.floor(Math.random() * 5000) + 1000
      })));

    return () => clearInterval(intervalId);
  }, []);


  return (
    // neon-glow-accent class might not be defined in reverted globals.css
    <Card className={cn("shadow-xl border-transparent neon-glow-accent h-full")}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <TrendingUp className="h-6 w-6 text-accent" />
          Transaction Velocity
        </CardTitle>
        <CardDescription className="text-muted-foreground">Monthly transaction volume & flux.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.3)" />
              <XAxis dataKey="name" stroke="hsl(var(--foreground)/0.7)" tick={{ fill: 'hsl(var(--foreground)/0.7)' }} />
              <YAxis stroke="hsl(var(--foreground)/0.7)" tick={{ fill: 'hsl(var(--foreground)/0.7)' }} />
              <RechartsTooltip
                cursor={{fill: 'hsl(var(--accent)/0.1)'}}
                content={<ChartTooltipContent 
                            indicator="line" 
                            labelClassName="text-foreground font-bold"
                            className="bg-card/80 backdrop-blur-sm border-accent/50 shadow-xl" 
                          />}
              />
              <Legend content={<ChartLegendContent className="text-foreground/80" />} />
              <Line
                type="monotone"
                dataKey="value"
                strokeWidth={3}
                stroke="var(--color-transactions)" 
                dot={{
                  fill: "var(--color-transactions)",
                  r: 5,
                  strokeWidth: 2,
                  stroke: 'hsl(var(--background))'
                }}
                activeDot={{
                  r: 7,
                  strokeWidth: 2,
                  fill: 'hsl(var(--background))',
                  stroke: 'var(--color-transactions)',
                  style: { boxShadow: '0 0 10px var(--color-transactions)' }
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
