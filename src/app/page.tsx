
'use client'; 

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { KeyMetricCard } from '@/components/dashboard/KeyMetricCard';
import { StatusDisplay } from '@/components/dashboard/StatusDisplay';
import { RiskPulseIndicator } from '@/components/dashboard/RiskPulseIndicator';
import { TransactionTrendGraph } from '@/components/dashboard/TransactionTrendGraph';
import { FraudDetectionTool } from '@/components/dashboard/FraudDetectionTool';
import { Activity, Percent, AlertTriangle, TimerIcon } from 'lucide-react';
import { Card as ShadcnCard, CardHeader as ShadcnCardHeader, CardContent as ShadcnCardContent } from '@/components/ui/card'; // Renamed to avoid conflict
import { cn } from '@/lib/utils';


interface Metrics {
  totalTransactions: number;
  successRate: number;
  highRiskCount: number;
  avgResponseTime: number;
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    // Initial mock data
    setMetrics({
      totalTransactions: 120450,
      successRate: 98.7,
      highRiskCount: 32,
      avgResponseTime: 120,
    });

    // Simulate data updates
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
          <h2 id="key-metrics-title" className="text-2xl font-semibold mb-4 text-glow-primary">System Vitals</h2>
          {metrics ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <KeyMetricCard
                title="Total Transactions"
                value={metrics.totalTransactions.toLocaleString()}
                icon={<Activity size={24} />} // Adjusted icon size
                description="All processed transactions"
                glowEffect="primary"
                trendDirection={metrics.totalTransactions % 100 > 50 ? 'up' : 'down'}
                trendValue={`${(Math.random() * 2).toFixed(1)}%`}
                timePeriod="vs last hour"
              />
              <KeyMetricCard
                title="Success Rate"
                value={`${metrics.successRate.toFixed(1)}%`}
                icon={<Percent size={24} />}
                description="Successful transactions"
                valueClassName={metrics.successRate > 98 ? 'text-primary' : metrics.successRate > 95 ? 'text-warning' : 'text-destructive'}
                glowEffect={metrics.successRate > 98 ? 'primary' : metrics.successRate > 95 ? 'warning' : 'destructive'}
                trendDirection={metrics.successRate > 98.5 ? 'up' : 'down'}
                trendValue={`${(Math.random() * 0.5).toFixed(1)}%`}
                timePeriod="vs last hour"
              />
               <Link href="#" className="block hover:no-underline focus:outline-none focus:ring-2 focus:ring-ring rounded-lg">
                <KeyMetricCard
                  title="High-Risk Alerts"
                  value={metrics.highRiskCount.toLocaleString()}
                  icon={<AlertTriangle size={24} />}
                  description="Flagged for review"
                  valueClassName={metrics.highRiskCount > 50 ? 'text-destructive' : metrics.highRiskCount > 20 ? 'text-warning' : 'text-primary-light'}
                  glowEffect={metrics.highRiskCount > 50 ? 'destructive' : metrics.highRiskCount > 20 ? 'warning' : 'accent'}
                  className="cursor-pointer"
                  trendDirection={metrics.highRiskCount > 30 ? 'up' : (metrics.highRiskCount < 10 ? 'down' : 'neutral')}
                  trendValue={metrics.highRiskCount > 30 ? `+${Math.floor(Math.random()*5)}` : (metrics.highRiskCount < 10 ? `-${Math.floor(Math.random()*3)}` : '±0')}
                  timePeriod="in last 24h"
                />
              </Link>
              <KeyMetricCard
                title="Avg. Response Time"
                value={`${metrics.avgResponseTime}ms`}
                icon={<TimerIcon size={24} />}
                description="System processing speed"
                valueClassName={metrics.avgResponseTime < 150 ? 'text-primary' : metrics.avgResponseTime < 250 ? 'text-warning' : 'text-destructive'}
                glowEffect={metrics.avgResponseTime < 150 ? 'primary' : metrics.avgResponseTime < 250 ? 'warning' : 'destructive'}
                trendDirection={metrics.avgResponseTime < 100 ? 'down' : 'up'}
                trendValue={`${Math.floor(Math.random()*10)-5}ms`}
                timePeriod="avg last 5m"
              />
            </div>
          ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {[...Array(4)].map((_, i) => (
                  <ShadcnCard key={i} className="shadow-lg animate-pulse backdrop-blur-md bg-card/70">
                      <ShadcnCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="h-4 bg-muted/30 rounded w-3/4"></div>
                        <div className="h-6 w-6 bg-muted/30 rounded-full"></div>
                      </ShadcnCardHeader>
                      <ShadcnCardContent>
                        <div className="h-8 bg-muted/30 rounded w-1/2 mb-2"></div>
                        <div className="h-3 bg-muted/30 rounded w-full mb-1"></div>
                        <div className="h-3 bg-muted/30 rounded w-3/4"></div>
                      </ShadcnCardContent>
                  </ShadcnCard>
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
           <h2 id="fraud-detection-title" className="text-2xl font-semibold mb-4 text-glow-accent">AI Threat Scanner</h2>
          <FraudDetectionTool />
        </section>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border/30">
        © {new Date().getFullYear()} TrustVault Automation. All rights reserved. Cyber-secured.
      </footer>
    </div>
  );
}
