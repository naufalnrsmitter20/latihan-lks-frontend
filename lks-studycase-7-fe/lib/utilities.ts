import { JwtPayload } from "jwt-decode";

export interface UserPayload extends JwtPayload {
  username: string;
  role: string;
}
export interface UserDataPayload extends JwtPayload {
  id: string;
  username: string;
  password?: string;
  role: string;
}
export interface DataBahanProps {
  id: string;
  name: string;
  qty: number;
  price: number;
}

export interface DataTransactionProps {
  id: number;
  customer_id: number;
  cashier_id: number;
  transaction_date: string;
  total_amount: number;
  created_at: string;
  updated_at: string;
  detail_transaction: [{ id: 1; transaction_id: number; roti_id: number; name: string; qty: number; price: number; subtotal: number; created_at: number; updated_at: number }];
  cashier: {
    username: string;
  };
  customer: {
    username: string;
  };
}

export interface KomposisiProps {
  Roti: string;
  Bahan: [
    {
      "nama bahan": string;
      "quantity used": number;
    }
  ];
}

export interface LogSupplyProps {
  qty: number;
  received_at: string;
  created_at: string;
  updated_at: string;
  supplier: { username: string };
  bahan: { name: string; qty: number; price: number };
}
export interface LogUsageProps {
  qty: number;
  usage_at: string;
  bahan: { name: string; price: number };
}

export interface TotalPenjualanProps {
  transaction_date: string;
  total_amount: number;
}
export interface TotalPengeluaranProps {
  "nama bahan": string;
  qty: number;
  price: number;
  total: number;
}
