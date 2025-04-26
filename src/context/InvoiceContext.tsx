import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Invoice, Product, ClientInfo } from '../types/invoice';
import { generateInvoiceId } from '../utils/invoiceUtils';

interface InvoiceContextType {
  invoice: Invoice;
  addProduct: () => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  updateClientInfo: (updates: Partial<ClientInfo>) => void;
  updateShippingCost: (cost: number) => void;
  updateLogo: (url: string | null) => void;
  resetInvoice: () => void;
  calculateTotals: () => void;
}

const defaultClientInfo: ClientInfo = {
  name: '',
  email: '',
  address: '',
  phone: '',
};

const createEmptyProduct = (): Product => ({
  id: crypto.randomUUID(),
  name: '',
  quantity: 1,
  fabricType: '',
  color: '',
  unitPrice: 0,
  total: 0,
});

const createDefaultInvoice = (): Invoice => ({
  id: generateInvoiceId(),
  date: new Date(),
  products: [createEmptyProduct()],
  clientInfo: defaultClientInfo,
  shippingCost: 0,
  logoUrl: null,
  subtotal: 0,
  total: 0,
});

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [invoice, setInvoice] = useState<Invoice>(createDefaultInvoice());

  const calculateTotals = () => {
    setInvoice((current) => {
      // Calculate individual product totals
      const updatedProducts = current.products.map(product => ({
        ...product,
        total: product.quantity * product.unitPrice
      }));
      
      // Calculate subtotal (sum of all product totals)
      const subtotal = updatedProducts.reduce((sum, product) => sum + product.total, 0);
      
      // Calculate total (subtotal + shipping)
      const total = subtotal + current.shippingCost;
      
      return {
        ...current,
        products: updatedProducts,
        subtotal,
        total
      };
    });
  };

  const addProduct = () => {
    setInvoice((current) => ({
      ...current,
      products: [...current.products, createEmptyProduct()]
    }));
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setInvoice((current) => {
      const updatedProducts = current.products.map(product => 
        product.id === id ? { ...product, ...updates } : product
      );
      
      return {
        ...current,
        products: updatedProducts
      };
    });
    calculateTotals();
  };

  const removeProduct = (id: string) => {
    setInvoice((current) => {
      // Don't remove if it's the only product
      if (current.products.length <= 1) {
        return current;
      }
      
      return {
        ...current,
        products: current.products.filter(product => product.id !== id)
      };
    });
    calculateTotals();
  };

  const updateClientInfo = (updates: Partial<ClientInfo>) => {
    setInvoice((current) => ({
      ...current,
      clientInfo: { ...current.clientInfo, ...updates }
    }));
  };

  const updateShippingCost = (cost: number) => {
    setInvoice((current) => ({
      ...current,
      shippingCost: cost
    }));
    calculateTotals();
  };

  const updateLogo = (url: string | null) => {
    setInvoice((current) => ({
      ...current,
      logoUrl: url
    }));
  };

  const resetInvoice = () => {
    setInvoice(createDefaultInvoice());
  };

  return (
    <InvoiceContext.Provider value={{
      invoice,
      addProduct,
      updateProduct,
      removeProduct,
      updateClientInfo,
      updateShippingCost,
      updateLogo,
      resetInvoice,
      calculateTotals
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = (): InvoiceContextType => {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
};