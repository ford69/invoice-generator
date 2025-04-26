export interface Product {
  id: string;
  name: string;
  quantity: number;
  fabricType: string;
  color: string;
  unitPrice: number;
  total: number;
}

export interface ClientInfo {
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface Invoice {
  id: string;
  date: Date;
  products: Product[];
  clientInfo: ClientInfo;
  shippingCost: number;
  logoUrl: string | null;
  subtotal: number;
  total: number;
}