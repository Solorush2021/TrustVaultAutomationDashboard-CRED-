
'use client';

import { useState, useEffect } from 'react';
import type { RiskLevel } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

// riskConfig uses CSS classes that might not be defined in reverted globals.css
const riskConfig: Record<RiskLevel, { className: string; text: string; cardGlow: string }> = {
  low: { className: 'risk-pulse-low', text: 'Low Risk', cardGlow: 'neon-glow-accent' },
  medium: { className: 'risk-pulse-medium', text: 'Medium Risk', cardGlow: 'neon-glow-warning' },
  high: { className: 'risk-pulse-high', text: 'High Risk', cardGlow: 'neon-glow-primary' },
};

export function RiskPulseIndicator() {
  const [currentRisk, setCurrentRisk] = useState<RiskLevel>('low');

  useEffect(() => {
    const riskLevels: RiskLevel[] = ['low', 'medium', 'high'];
    let i = 0;
    const intervalId = setInterval(() => {
      i = (i + 1) % riskLevels.length;
      setCurrentRisk(riskLevels[i]);
    }, 7000); 

    return () => clearInterval(intervalId);
  }, []);

  const activeConfig = riskConfig[currentRisk];

  return (
    // activeConfig.cardGlow (neon-glow-*) might not be defined in reverted globals.css
    <Card className={cn("shadow-lg border-transparent", activeConfig.cardGlow)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground/80">Threat Matrix</CardTitle>
         <ShieldAlert className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-3 pt-4">
        {/* activeConfig.className (risk-pulse-*) might not be defined in reverted globals.css */}
        <div className={cn("w-24 h-24 rounded-full flex items-center justify-center", activeConfig.className)}>
          <div className="w-20 h-20 rounded-full bg-background/80 flex items-center justify-center border-2 border-current">
             <span className="text-md font-semibold text-foreground">{activeConfig.text}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Current threat assessment.</p>
      </CardContent>
    </Card>
  );
}
