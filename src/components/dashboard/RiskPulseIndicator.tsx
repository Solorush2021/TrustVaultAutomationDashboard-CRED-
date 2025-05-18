
'use client';

import { useState, useEffect } from 'react';
import type { RiskLevel } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

const riskConfig: Record<RiskLevel, { pulseClass: string; text: string; cardGlowVar: string }> = {
  low: { pulseClass: 'risk-pulse-low', text: 'Low Risk', cardGlowVar: '--primary' }, // Green
  medium: { pulseClass: 'risk-pulse-medium', text: 'Medium Risk', cardGlowVar: '--warning' }, // Orange
  high: { pulseClass: 'risk-pulse-high', text: 'High Risk', cardGlowVar: '--destructive' }, // Red
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
  const cardGlowStyle = {
    boxShadow: `0 0 12px hsl(var(${activeConfig.cardGlowVar}) / 0.5), 0 0 18px hsl(var(${activeConfig.cardGlowVar}) / 0.3)`,
    borderColor: `hsl(var(${activeConfig.cardGlowVar}) / 0.6)`
  } as React.CSSProperties;

  return (
    <Card style={cardGlowStyle} className={cn("shadow-lg border backdrop-blur-md bg-card/70")}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium text-foreground/80">Threat Matrix</CardTitle>
         <ShieldAlert className="h-5 w-5 text-muted-foreground filter drop-shadow(0 0 2px hsl(var(--muted-foreground)/0.5))" />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-3 pt-4">
        <div className={cn("w-24 h-24 rounded-full flex items-center justify-center", activeConfig.pulseClass)}>
          <div className="w-20 h-20 rounded-full bg-background/80 flex items-center justify-center border-2 border-current">
             <span className="text-md font-semibold text-foreground">{activeConfig.text}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Current system threat assessment.</p>
      </CardContent>
    </Card>
  );
}
