import React, { useEffect } from 'react';
import { useInvoice } from '../context/InvoiceContext';
import InvoiceForm from './InvoiceForm';
import InvoicePreview from './InvoicePreview';

const InvoiceGenerator: React.FC = () => {
  const { calculateTotals } = useInvoice();
  
  // Calculate totals when component mounts
  useEffect(() => {
    calculateTotals();
  }, [calculateTotals]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-black mb-8">
        NobleFit Invoice Generator
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Invoice Details
          </h2>
          <InvoiceForm />
        </div>
        
        <div>
          <InvoicePreview />
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;