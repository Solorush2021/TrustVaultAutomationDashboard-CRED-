'use client';

import { useState, useEffect } from 'react';
import type { TransactionStatus } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, Loader2, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

// Updated to use theme colors
const statusConfig: Record<TransactionStatus, { icon: React.ElementType; colorClass: string; text: string }> = {
  success: { icon: CheckCircle2, colorClass: 'text-secondary', text: 'Transactions: Nominal' }, // Green -> Secondary
  failed: { icon: XCircle, colorClass: 'text-destructive', text: 'Transactions: Critical' }, // Red -> Destructive
  pending: { icon: Loader2, colorClass: 'text-[hsl(var(--warning))]', text: 'Transactions: Pending' }, // Yellow -> Warning
};

export function StatusDisplay() {
  const [currentStatus, setCurrentStatus] = useState<TransactionStatus>('pending');

  useEffect(() => {
    // Simulate real-time status updates
    const statuses: TransactionStatus[] = ['success', 'failed', 'pending'];
    let i = 0;
    const intervalId = setInterval(() => {
      i = (i + 1) % statuses.length;
      setCurrentStatus(statuses[i]);
    }, 5000); // Change status every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  const IconComponent = statusConfig[currentStatus].icon;
  const activeConfig = statusConfig[currentStatus];

  return (
    <Card className="shadow-lg border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground/80">System Status</CardTitle>
        <Zap className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <IconComponent className={cn("h-8 w-8", activeConfig.colorClass, currentStatus === 'pending' && 'animate-spin')} />
          <span className={cn("text-xl font-semibold", activeConfig.colorClass)}>
            {activeConfig.text}
          </span>
        </div>
        <p className="text-xs text-muted-foreground pt-1">Real-time operational status.</p>
      </CardContent>
    </Card>
  );
}
