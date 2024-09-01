export interface Product {
  trackingId: number;
  productImage: string;
  productName: string;
  customer: string;
  date: string;
  amount: number;
  paymentMode: string;
  status: "Cancelled" | "Delivered" | "Process";
}
