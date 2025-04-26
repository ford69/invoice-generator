import React from 'react';
import InvoiceGenerator from './components/InvoiceGenerator';
import { InvoiceProvider } from './context/InvoiceContext';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <InvoiceProvider>
        <InvoiceGenerator />
      </InvoiceProvider>
    </div>
  );
}

export default App;