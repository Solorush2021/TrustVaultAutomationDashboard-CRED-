// src/ai/flows/analyze-transaction-data.ts
'use server';

/**
 * @fileOverview Analyzes transaction data to identify and flag suspicious patterns.
 *
 * - analyzeTransactionData - A function that analyzes transaction data for fraud detection.
 * - AnalyzeTransactionDataInput - The input type for the analyzeTransactionData function.
 * - AnalyzeTransactionDataOutput - The return type for the analyzeTransactionData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeTransactionDataInputSchema = z.object({
  transactionData: z.string().describe('JSON string of transaction data to analyze.'),
});
export type AnalyzeTransactionDataInput = z.infer<
  typeof AnalyzeTransactionDataInputSchema
>;

const AnalyzeTransactionDataOutputSchema = z.object({
  isSuspicious: z.boolean().describe('Whether the transaction is flagged as suspicious.'),
  reason: z
    .string()
    .describe('The reason why the transaction is flagged as suspicious.'),
  confidenceScore: z
    .number()
    .describe('A score indicating the confidence level of the suspicion.'),
});
export type AnalyzeTransactionDataOutput = z.infer<
  typeof AnalyzeTransactionDataOutputSchema
>;

export async function analyzeTransactionData(
  input: AnalyzeTransactionDataInput
): Promise<AnalyzeTransactionDataOutput> {
  return analyzeTransactionDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeTransactionDataPrompt',
  input: {schema: AnalyzeTransactionDataInputSchema},
  output: {schema: AnalyzeTransactionDataOutputSchema},
  prompt: `You are a fraud detection expert analyzing transaction data for suspicious patterns.

  Analyze the following transaction data and determine if it is suspicious. Provide a reason for your determination and a confidence score between 0 and 1.

  Transaction Data: {{{transactionData}}}
  `,
});

const analyzeTransactionDataFlow = ai.defineFlow(
  {
    name: 'analyzeTransactionDataFlow',
    inputSchema: AnalyzeTransactionDataInputSchema,
    outputSchema: AnalyzeTransactionDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
