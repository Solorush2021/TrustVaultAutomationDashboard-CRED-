
'use client';

import { useState, useEffect } from 'react';
import type { TransactionStatus } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, Loader2, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusConfig: Record<TransactionStatus, { icon: React.ElementType; colorClass: string; text: string; glowClassVar: string }> = {
  success: { icon: CheckCircle2, colorClass: 'text-primary', text: 'System: Nominal', glowClassVar: '--primary' },
  failed: { icon: XCircle, colorClass: 'text-destructive', text: 'System: Critical Alert', glowClassVar: '--destructive' },
  pending: { icon: Loader2, colorClass: 'text-warning', text: 'System: Standby', glowClassVar: '--warning' },
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
  const glowStyle = {
    boxShadow: `0 0 12px hsl(var(${activeConfig.glowClassVar}) / 0.6), 0 0 18px hsl(var(${activeConfig.glowClassVar}) / 0.4)`,
    borderColor: `hsl(var(${activeConfig.glowClassVar}) / 0.7)`
  } as React.CSSProperties;


  return (
    <Card style={glowStyle} className={cn("shadow-lg border backdrop-blur-md bg-card/70")}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium text-foreground/80">Network Integrity</CardTitle>
        <Zap className="h-5 w-5 text-muted-foreground filter drop-shadow(0 0 2px hsl(var(--muted-foreground)/0.5))" />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center space-x-3">
          <IconComponent 
            className={cn(
              "h-10 w-10", 
              activeConfig.colorClass, 
              currentStatus === 'pending' && 'animate-spin',
              `filter drop-shadow(0 0 5px hsl(var(${activeConfig.glowClassVar})/0.8))`
            )} 
          />
          <span className={cn("text-2xl font-semibold", activeConfig.colorClass, `text-glow-${activeConfig.glowClassVar === '--primary' ? 'primary' : activeConfig.glowClassVar === '--destructive' ? 'destructive' : 'warning'}`)}>
            {activeConfig.text}
          </span>
        </div>
        <p className="text-xs text-muted-foreground pt-1.5">Real-time operational uplink.</p>
      </CardContent>
    </Card>
  );
}
