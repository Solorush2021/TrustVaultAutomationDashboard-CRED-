
'use client'; 

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { KeyMetricCard } from '@/components/dashboard/KeyMetricCard';
import { StatusDisplay } from '@/components/dashboard/StatusDisplay';
import { RiskPulseIndicator } from '@/components/dashboard/RiskPulseIndicator';
import { TransactionTrendGraph } from '@/components/dashboard/TransactionTrendGraph';
import { FraudDetectionTool } from '@/components/dashboard/FraudDetectionTool';
import { Activity, Percent, AlertTriangle, TimerIcon } from 'lucide-react';
import { Card as ShadcnCard, CardHeader as ShadcnCardHeader, CardContent as ShadcnCardContent } from '@/components/ui/card';

interface Metrics {
  totalTransactions: number;
  successRate: number;
  highRiskCount: number;
  avgResponseTime: number;
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    setMetrics({
      totalTransactions: 120450,
      successRate: 98.7,
      highRiskCount: 32,
      avgResponseTime: 120,
    });

    const intervalId = setInterval(() => {
      setMetrics(prevMetrics => prevMetrics ? ({
        totalTransactions: prevMetrics.totalTransactions + Math.floor(Math.random() * 100),
        successRate: Math.min(100, Math.max(95, prevMetrics.successRate + (Math.random() - 0.5) * 0.1)),
        highRiskCount: Math.max(0, prevMetrics.highRiskCount + Math.floor(Math.random() * 5) - 2),
        avgResponseTime: Math.max(50, Math.min(300, prevMetrics.avgResponseTime + Math.floor(Math.random() * 10) - 5)),
      }) : null);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 space-y-8 md:space-y-10">
        <section aria-labelledby="key-metrics-title">
          <h2 id="key-metrics-title" className="sr-only">Key Metrics</h2>
          {metrics ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <KeyMetricCard
                title="Total Transactions"
                value={metrics.totalTransactions.toLocaleString()}
                icon={<Activity size={28} />}
                description="All processed transactions"
                glowEffect="primary" // This prop will remain, but styling might not apply
              />
              <KeyMetricCard
                title="Success Rate"
                value={`${metrics.successRate.toFixed(1)}%`}
                icon={<Percent size={28} />}
                description="Successful transactions"
                valueClassName={metrics.successRate > 98 ? 'text-[hsl(var(--chart-3))]' : metrics.successRate > 95 ? 'text-warning' : 'text-destructive'}
                glowEffect={metrics.successRate > 98 ? 'secondary' : metrics.successRate > 95 ? 'warning' : 'destructive'} // This prop will remain
              />
              <KeyMetricCard
                title="High-Risk Alerts"
                value={metrics.highRiskCount.toLocaleString()}
                icon={<AlertTriangle size={28} />}
                description="Flagged for review"
                valueClassName={metrics.highRiskCount > 50 ? 'text-destructive' : metrics.highRiskCount > 20 ? 'text-warning' : 'text-[hsl(var(--chart-3))]'}
                glowEffect={metrics.highRiskCount > 50 ? 'destructive' : metrics.highRiskCount > 20 ? 'warning' : 'accent'} // This prop will remain
              />
              <KeyMetricCard
                title="Avg. Response Time"
                value={`${metrics.avgResponseTime}ms`}
                icon={<TimerIcon size={28} />}
                description="System processing speed"
                valueClassName={metrics.avgResponseTime < 150 ? 'text-[hsl(var(--chart-3))]' : metrics.avgResponseTime < 250 ? 'text-warning' : 'text-destructive'}
                glowEffect={metrics.avgResponseTime < 150 ? 'secondary' : metrics.avgResponseTime < 250 ? 'warning' : 'destructive'} // This prop will remain
              />
            </div>
          ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {[...Array(4)].map((_, i) => (
                  // tilted-card and neon-glow-accent classes might not be defined in reverted globals.css
                  <div key={i} className="tilted-card"> 
                    <ShadcnCard className="shadow-lg neon-glow-accent animate-pulse">
                      <div className="tilted-card-content">
                        <ShadcnCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <div className="h-4 bg-muted/30 rounded w-3/4"></div>
                          <div className="h-6 w-6 bg-muted/30 rounded-full"></div>
                        </ShadcnCardHeader>
                        <ShadcnCardContent>
                          <div className="h-8 bg-muted/30 rounded w-1/2 mb-2"></div>
                          <div className="h-3 bg-muted/30 rounded w-full"></div>
                        </ShadcnCardContent>
                      </div>
                    </ShadcnCard>
                  </div>
                ))}
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2">
            <TransactionTrendGraph />
          </div>
          <div className="space-y-6 md:space-y-8">
            <StatusDisplay />
            <RiskPulseIndicator />
          </div>
        </section>

        <section aria-labelledby="fraud-detection-title">
           <h2 id="fraud-detection-title" className="sr-only">Fraud Detection Tool</h2>
          <FraudDetectionTool />
        </section>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border/30">
        © {new Date().getFullYear()} TrustVault Automation. All rights reserved. Cyber-secured.
      </footer>
    </div>
  );
}
