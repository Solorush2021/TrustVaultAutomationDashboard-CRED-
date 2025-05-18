export type TransactionStatus = 'success' | 'failed' | 'pending';

export type RiskLevel = 'low' | 'medium' | 'high';

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface TransactionData {
  id: string;
  amount: number;
  currency: string;
  timestamp: string;
  type: 'debit' | 'credit';
  merchant: string;
  location: string;
  userDevice: string;
  ipAddress: string;
}
