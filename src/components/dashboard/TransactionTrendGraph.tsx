'use client';

import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, Legend } from 'recharts';
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

const initialChartData: ChartDataPoint[] = [
  { name: 'Jan', value: 0 },
  { name: 'Feb', value: 0 },
  { name: 'Mar', value: 0 },
  { name: 'Apr', value: 0 },
  { name: 'May', value: 0 },
  { name: 'Jun', value: 0 },
];

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
    // Simulate data fetching for the chart
    const intervalId = setInterval(() => {
      setData(prevData => prevData.map(item => ({
        ...item,
        value: Math.floor(Math.random() * 5000) + 1000
      })));
    }, 5000); // Update data every 5 seconds
    
    // Initial data load
     setData(initialChartData.map(item => ({
        ...item,
        value: Math.floor(Math.random() * 5000) + 1000
      })));

    return () => clearInterval(intervalId);
  }, []);


  return (
    <Card className="shadow-lg border-primary/20 h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Transaction Trends
        </CardTitle>
        <CardDescription>Monthly transaction volume overview.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
            <XAxis dataKey="name" stroke="hsl(var(--foreground)/0.7)" />
            <YAxis stroke="hsl(var(--foreground)/0.7)" />
            <RechartsTooltip
              cursor={{fill: 'hsl(var(--accent)/0.1)'}}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Legend content={<ChartLegendContent />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-transactions)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-transactions)",
                r: 4,
              }}
              activeDot={{
                r: 6,
                strokeWidth: 1,
                fill: 'hsl(var(--background))',
                stroke: 'var(--color-transactions)',
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
