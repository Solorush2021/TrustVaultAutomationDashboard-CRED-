
'use client';

import { useState, useEffect } from 'react';
import type { TransactionStatus } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, Loader2, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusConfig: Record<TransactionStatus, { icon: React.ElementType; colorClass: string; text: string; glowClass: string }> = {
  success: { icon: CheckCircle2, colorClass: 'text-[hsl(var(--chart-3))]', text: 'System: Nominal', glowClass: 'neon-glow-secondary' }, // chart-3 (green)
  failed: { icon: XCircle, colorClass: 'text-destructive', text: 'System: Critical Alert', glowClass: 'neon-glow-destructive' },
  pending: { icon: Loader2, colorClass: 'text-warning', text: 'System: Standby', glowClass: 'neon-glow-warning' },
};

export function StatusDisplay() {
  const [currentStatus, setCurrentStatus] = useState<TransactionStatus>('pending');

  useEffect(() => {
    const statuses: TransactionStatus[] = ['success', 'failed', 'pending'];
    let i = 0;
    const intervalId = setInterval(() => {
      i = (i + 1) % statuses.length;
      setCurrentStatus(statuses[i]);
    }, 5000); 

    return () => clearInterval(intervalId);
  }, []);

  const IconComponent = statusConfig[currentStatus].icon;
  const activeConfig = statusConfig[currentStatus];

  return (
    <Card className={cn("shadow-lg border-transparent", activeConfig.glowClass)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground/80">Network Integrity</CardTitle>
        <Zap className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-3">
          <IconComponent className={cn("h-10 w-10", activeConfig.colorClass, currentStatus === 'pending' && 'animate-spin')} />
          <span className={cn("text-2xl font-semibold", activeConfig.colorClass)}>
            {activeConfig.text}
          </span>
        </div>
        <p className="text-xs text-muted-foreground pt-1">Real-time operational uplink.</p>
      </CardContent>
    </Card>
  );
}
