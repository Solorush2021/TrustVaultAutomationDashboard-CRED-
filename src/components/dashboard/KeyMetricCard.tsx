
'use client';

import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface KeyMetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  className?: string;
  valueClassName?: string;
  glowEffect?: 'primary' | 'accent' | 'accent-secondary' | 'warning' | 'destructive' | 'none';
  trendDirection?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  timePeriod?: string;
}

export function KeyMetricCard({ 
  title, 
  value, 
  icon, 
  description, 
  className, 
  valueClassName, 
  glowEffect = 'accent',
  trendDirection,
  trendValue,
  timePeriod 
}: KeyMetricCardProps) {
  
  const glowClass = glowEffect !== 'none' && glowEffect 
    ? `shadow-[0_0_15px_hsl(var(--${glowEffect === 'primary' ? 'primary' : glowEffect === 'accent-secondary' ? 'accent-secondary' : glowEffect}-bg)/0.5),0_0_20px_hsl(var(--${glowEffect === 'primary' ? 'primary' : glowEffect === 'accent-secondary' ? 'accent-secondary' : glowEffect})/0.3)]` 
    : '';

  const TrendIcon = trendDirection === 'up' 
    ? ArrowUpRight 
    : trendDirection === 'down' 
    ? ArrowDownRight 
    : trendDirection === 'neutral'
    ? Minus
    : null;

  const trendColor = trendDirection === 'up' 
    ? 'text-primary' 
    : trendDirection === 'down' 
    ? 'text-destructive' 
    : 'text-muted-foreground';

  return (
    <div className={cn(className)}> 
      <Card className={cn(
        "shadow-lg transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl", 
        glowClass,
        glowEffect !== 'none' ? `border-${glowEffect === 'primary' ? 'primary' : glowEffect}/50` : 'border-border',
        "hover:shadow-[0_0_25px_theme(colors.accent/70)]" // Keep existing hover shadow or refine
      )}>
        <div> 
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium text-foreground/80">{title}</CardTitle>
            <span className={cn("p-1 rounded-full bg-primary/10 text-primary", `filter drop-shadow(0 0 3px hsl(var(--primary)/0.7))`)}>{icon}</span>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className={cn("text-3xl font-bold", valueClassName)}>{value}</div>
              {TrendIcon && trendValue && (
                <span className={cn("text-xs font-medium flex items-center", trendColor)}>
                  <TrendIcon size={14} className="mr-0.5" />
                  {trendValue}
                </span>
              )}
            </div>
            {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
            {timePeriod && <p className="text-xs text-muted-foreground/70 pt-0.5">{timePeriod}</p>}
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
