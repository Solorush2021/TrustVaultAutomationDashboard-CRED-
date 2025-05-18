'use client';

import { useState, useEffect } from 'react';
import type { TransactionStatus } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, Loader2, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusConfig: Record<TransactionStatus, { icon: React.ElementType; color: string; text: string }> = {
  success: { icon: CheckCircle2, color: 'text-green-400', text: 'Transactions: Nominal' },
  failed: { icon: XCircle, color: 'text-red-400', text: 'Transactions: Critical' },
  pending: { icon: Loader2, color: 'text-yellow-400', text: 'Transactions: Pending' },
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

  return (
    <Card className="shadow-lg border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground/80">System Status</CardTitle>
        <Zap className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <IconComponent className={cn("h-8 w-8", statusConfig[currentStatus].color, currentStatus === 'pending' && 'animate-spin')} />
          <span className={cn("text-xl font-semibold", statusConfig[currentStatus].color)}>
            {statusConfig[currentStatus].text}
          </span>
        </div>
        <p className="text-xs text-muted-foreground pt-1">Real-time operational status.</p>
      </CardContent>
    </Card>
  );
}
