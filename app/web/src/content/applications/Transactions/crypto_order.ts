export type DevStatus = "completed" | "pending" | "failed";

export interface CryptoOrder {
  id: string;
  status: DevStatus;
  orderDetails: string;
  orderDate: number;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amountCrypto: number;
  amount: number;
  cryptoCurrency: string;
  currency: string;
}
