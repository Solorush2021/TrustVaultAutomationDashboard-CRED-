
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, SearchCheck, ShieldQuestion } from 'lucide-react';
import { analyzeTransactionData, type AnalyzeTransactionDataOutput } from '@/ai/flows/analyze-transaction-data';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  transactionData: z.string().min(10, { message: 'Transaction data must be at least 10 characters.' })
    .refine(value => {
      try {
        JSON.parse(value);
        return true;
      } catch {
        return false;
      }
    }, { message: 'Invalid JSON format.' }),
});

type FormData = z.infer<typeof formSchema>;

const exampleTransaction = {
  id: "txn_123abc",
  amount: 150.75,
  currency: "USD",
  timestamp: new Date().toISOString(),
  type: "debit",
  merchant: "CyberRetailer X",
  location: "Neo-Tokyo, Sector 7",
  userDevice: "HoloLens v3.2",
  ipAddress: "2077.168.1.100"
};

export function FraudDetectionTool() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeTransactionDataOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionData: JSON.stringify(exampleTransaction, null, 2),
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeTransactionData({ transactionData: data.transactionData });
      setAnalysisResult(result);
      toast({
        title: "Analysis Complete",
        description: "Transaction data has been analyzed.",
        variant: result.isSuspicious ? "destructive" : "default",
      });
    } catch (error) {
      console.error("Fraud detection error:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not analyze transaction data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-xl neon-glow-secondary border-secondary/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <ShieldQuestion className="h-7 w-7 text-secondary" />
          Fraud Detection AI
        </CardTitle>
        <CardDescription className="text-muted-foreground">Analyze transaction data for suspicious patterns using GenAI.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="transactionData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/90">Transaction Data (JSON format)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`Enter transaction data in JSON format. Example:\n${JSON.stringify(exampleTransaction, null, 2)}`}
                      className="min-h-[150px] font-mono text-xs bg-input border-border/50 focus:border-accent focus:ring-accent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="analyze-button w-full text-lg py-3">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing Grid...
                </>
              ) : (
                <>
                  <SearchCheck className="mr-2 h-5 w-5" />
                  Scan Transaction Matrix
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
      {analysisResult && (
        <CardContent className="mt-4">
          <Alert 
            variant={analysisResult.isSuspicious ? "destructive" : "default"} 
            className={cn(
              "border-2",
              analysisResult.isSuspicious 
              ? "border-destructive/70 text-destructive neon-glow-destructive bg-destructive/10" 
              : "border-chart-3/70 text-chart-3 neon-glow-secondary bg-chart-3/10" // Using chart-3 (green) for non-suspicious
            )}
          >
             <AlertTitle className="font-bold flex items-center gap-2 text-lg">
              {analysisResult.isSuspicious ? 'Threat Detected!' : 'System Nominal'}
            </AlertTitle>
            <AlertDescription className="mt-2 space-y-1 text-base">
              <p><strong>Intel:</strong> {analysisResult.reason}</p>
              <p><strong>Certainty Index:</strong> {(analysisResult.confidenceScore * 100).toFixed(1)}%</p>
            </AlertDescription>
          </Alert>
        </CardContent>
      )}
    </Card>
  );
}
