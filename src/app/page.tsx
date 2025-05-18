'use client'; // This page uses client-side hooks for dynamic data

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { KeyMetricCard } from '@/components/dashboard/KeyMetricCard';
import { StatusDisplay } from '@/components/dashboard/StatusDisplay';
import { RiskPulseIndicator } from '@/components/dashboard/RiskPulseIndicator';
import { TransactionTrendGraph } from '@/components/dashboard/TransactionTrendGraph';
import { FraudDetectionTool } from '@/components/dashboard/FraudDetectionTool';
import { Activity, TrendingUp, AlertTriangle, TimerIcon, Percent } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card'; // Added import

interface Metrics {
  totalTransactions: number;
  successRate: number;
  highRiskCount: number;
  avgResponseTime: number;
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    // Simulate fetching initial metrics
    setMetrics({
      totalTransactions: 120450,
      successRate: 98.7,
      highRiskCount: 32,
      avgResponseTime: 120,
    });

    // Simulate metrics updates
    const intervalId = setInterval(() => {
      setMetrics(prevMetrics => prevMetrics ? ({
        totalTransactions: prevMetrics.totalTransactions + Math.floor(Math.random() * 100),
        successRate: Math.min(100, Math.max(95, prevMetrics.successRate + (Math.random() - 0.5) * 0.1)),
        highRiskCount: Math.max(0, prevMetrics.highRiskCount + Math.floor(Math.random() * 5) - 2),
        avgResponseTime: Math.max(50, Math.min(300, prevMetrics.avgResponseTime + Math.floor(Math.random() * 10) - 5)),
      }) : null);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
        {/* Key Metrics Section */}
        <section aria-labelledby="key-metrics-title">
          <h2 id="key-metrics-title" className="sr-only">Key Metrics</h2>
          {metrics ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <KeyMetricCard
                title="Total Transactions"
                value={metrics.totalTransactions.toLocaleString()}
                icon={<Activity size={24} />}
                description="All processed transactions"
              />
              <KeyMetricCard
                title="Success Rate"
                value={`${metrics.successRate.toFixed(1)}%`}
                icon={<Percent size={24} />}
                description="Successful transactions"
                valueClassName={metrics.successRate > 98 ? 'text-green-400' : metrics.successRate > 95 ? 'text-yellow-400' : 'text-red-400'}
              />
              <KeyMetricCard
                title="High-Risk Alerts"
                value={metrics.highRiskCount.toLocaleString()}
                icon={<AlertTriangle size={24} />}
                description="Flagged for review"
                 valueClassName={metrics.highRiskCount > 50 ? 'text-red-400' : metrics.highRiskCount > 20 ? 'text-yellow-400' : 'text-green-400'}
              />
              <KeyMetricCard
                title="Avg. Response Time"
                value={`${metrics.avgResponseTime}ms`}
                icon={<TimerIcon size={24} />}
                description="System processing speed"
                valueClassName={metrics.avgResponseTime < 150 ? 'text-green-400' : metrics.avgResponseTime < 250 ? 'text-yellow-400' : 'text-red-400'}
              />
            </div>
          ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="shadow-lg border-primary/20 animate-pulse">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-6 w-6 bg-muted rounded-full"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-full"></div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </section>

        {/* Main Dashboard Area */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2">
            <TransactionTrendGraph />
          </div>
          <div className="space-y-4 md:space-y-6">
            <StatusDisplay />
            <RiskPulseIndicator />
          </div>
        </section>

        {/* Fraud Detection Tool */}
        <section aria-labelledby="fraud-detection-title">
           <h2 id="fraud-detection-title" className="sr-only">Fraud Detection Tool</h2>
          <FraudDetectionTool />
        </section>
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t border-primary/10">
        © {new Date().getFullYear()} TrustVault Automation. All rights reserved.
      </footer>
    </div>
  );
}
