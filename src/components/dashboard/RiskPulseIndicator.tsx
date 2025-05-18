'use client';

import { useState, useEffect } from 'react';
import type { RiskLevel } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

const riskConfig: Record<RiskLevel, { className: string; text: string }> = {
  low: { className: 'risk-pulse-low', text: 'Low Risk' },
  medium: { className: 'risk-pulse-medium', text: 'Medium Risk' },
  high: { className: 'risk-pulse-high', text: 'High Risk' },
};

export function RiskPulseIndicator() {
  const [currentRisk, setCurrentRisk] = useState<RiskLevel>('low');

  useEffect(() => {
    // Simulate real-time risk updates
    const riskLevels: RiskLevel[] = ['low', 'medium', 'high'];
    let i = 0;
    const intervalId = setInterval(() => {
      i = (i + 1) % riskLevels.length;
      setCurrentRisk(riskLevels[i]);
    }, 7000); // Change risk every 7 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card className="shadow-lg border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground/80">Risk Pulse</CardTitle>
         <ShieldAlert className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-3 pt-4">
        <div className={cn("w-20 h-20 rounded-full flex items-center justify-center", riskConfig[currentRisk].className)}>
          <div className="w-16 h-16 rounded-full bg-background/80 flex items-center justify-center">
             <span className="text-sm font-semibold text-foreground">{riskConfig[currentRisk].text}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Current threat assessment.</p>
      </CardContent>
    </Card>
  );
}
