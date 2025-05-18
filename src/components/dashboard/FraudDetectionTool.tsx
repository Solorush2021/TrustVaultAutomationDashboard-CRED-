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
  merchant: "OnlineRetailer Inc.",
  location: "San Francisco, CA",
  userDevice: "Mobile App iOS 15.4",
  ipAddress: "192.168.1.100"
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
    <Card className="shadow-lg border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldQuestion className="h-6 w-6 text-primary" />
          Fraud Detection AI
        </CardTitle>
        <CardDescription>Analyze transaction data for suspicious patterns using GenAI.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="transactionData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Data (JSON format)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`Enter transaction data in JSON format. Example:\n${JSON.stringify(exampleTransaction, null, 2)}`}
                      className="min-h-[150px] font-mono text-xs bg-background/70 border-accent/30 focus:border-accent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/80 text-primary-foreground w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <SearchCheck className="mr-2 h-4 w-4" />
                  Analyze Transaction
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
      {analysisResult && (
        <CardContent>
          <Alert variant={analysisResult.isSuspicious ? "destructive" : "default"} className={analysisResult.isSuspicious ? "border-destructive/50 text-destructive" : "border-green-500/50 text-green-400"}>
             <AlertTitle className="font-bold flex items-center gap-2">
              {analysisResult.isSuspicious ? 'Suspicious Transaction' : 'Transaction Appears Normal'}
            </AlertTitle>
            <AlertDescription className="mt-2 space-y-1">
              <p><strong>Reason:</strong> {analysisResult.reason}</p>
              <p><strong>Confidence Score:</strong> {(analysisResult.confidenceScore * 100).toFixed(1)}%</p>
            </AlertDescription>
          </Alert>
        </CardContent>
      )}
    </Card>
  );
}
