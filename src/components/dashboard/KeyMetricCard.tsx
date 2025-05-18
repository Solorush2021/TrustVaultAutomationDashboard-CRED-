
'use client';

import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface KeyMetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  className?: string;
  valueClassName?: string;
  glowEffect?: 'primary' | 'accent' | 'secondary' | 'warning' | 'destructive' | 'none';
}

export function KeyMetricCard({ title, value, icon, description, className, valueClassName, glowEffect = 'accent' }: KeyMetricCardProps) {
  const glowClass = glowEffect !== 'none' ? `neon-glow-${glowEffect}` : '';
  
  return (
    <div className={cn("tilted-card", className)}>
      <Card className={cn("shadow-lg transition-all duration-300 ease-out", glowClass, "hover:shadow-[0_0_25px_theme(colors.accent/70)]")}>
        <div className="tilted-card-content">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">{title}</CardTitle>
            <span className="text-primary">{icon}</span>
          </CardHeader>
          <CardContent>
            <div className={cn("text-3xl font-bold", valueClassName)}>{value}</div>
            {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
