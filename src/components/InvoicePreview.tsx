import React, { useRef } from 'react';
import { useInvoice } from '../context/InvoiceContext';
import { formatCurrency, formatDate } from '../utils/invoiceUtils';
import { Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const InvoicePreview: React.FC = () => {
  const { invoice, resetInvoice } = useInvoice();
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    const element = invoiceRef.current;
    if (!element) return;

    const opt = {
      margin: 1,
      filename: `invoice-${invoice.id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const handleGenerateNew = () => {
    if (confirm('Are you sure you want to create a new invoice? This will reset all current data.')) {
      resetInvoice();
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-6" ref={invoiceRef}>
        {/* Invoice Header */}
        <div className="flex justify-between items-start mb-8">
          {/* Logo */}
          <div className="logo-container w-28 h-16">
          <img
            src={invoice.logoUrl || '/src/images/noblefit-logo.jpg'}
            alt="Company Logo"
            className="max-w-full max-h-full object-contain"
          />
          </div>

          {/* Invoice Info */}
          <div className="text-right">
            <div className="text-2xl font-bold text-black mb-1">
              {invoice.id}
            </div>
            <div className="text-gray-500 mb-4">
              {formatDate(invoice.date)}
            </div>
          </div>
        </div>

        {/* Client & Billing Information */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-700 border-b pb-2 mb-2">Bill To</h3>
          <div className="text-gray-600">
            <p className="font-medium">{invoice.clientInfo.name || 'Client Name'}</p>
            <p>{invoice.clientInfo.email || 'client@example.com'}</p>
            <p>{invoice.clientInfo.phone || '(555) 123-4567'}</p>
            <p>{invoice.clientInfo.address || 'Client Address'}</p>
          </div>
        </div>

        {/* Products Table */}
        <div className="mb-8">
          <table className="w-full mb-4">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 text-left font-semibold text-gray-600">Product</th>
                <th className="py-2 px-4 text-left font-semibold text-gray-600">Details</th>
                <th className="py-2 px-4 text-right font-semibold text-gray-600">Qty</th>
                <th className="py-2 px-4 text-right font-semibold text-gray-600">Unit Price</th>
                <th className="py-2 px-4 text-right font-semibold text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">{product.name || 'Product Name'}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {product.fabricType && product.color
                      ? `${product.fabricType}, ${product.color}`
                      : product.fabricType || product.color || 'No details'}
                  </td>
                  <td className="py-3 px-4 text-right">{product.quantity}</td>
                  <td className="py-3 px-4 text-right">{formatCurrency(product.unitPrice)}</td>
                  <td className="py-3 px-4 text-right font-medium">
                    {formatCurrency(product.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="w-full md:w-64 ml-auto">
            <div className="flex justify-between py-2">
              <span className="font-medium text-gray-600">Subtotal:</span>
              <span>{formatCurrency(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium text-gray-600">Shipping:</span>
              <span>{formatCurrency(invoice.shippingCost)}</span>
            </div>
            <div className="flex justify-between py-2 text-lg font-bold mt-2">
              <span>Total:</span>
              <span>{formatCurrency(invoice.total)}</span>
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="text-sm text-gray-500 border-t pt-4">
          <p className="mb-1">Thank you for your business!</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={handleDownloadPDF}
          className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          <Download size={18} className="mr-2" />
          Download PDF
        </button>

        <button
          type="button"
          onClick={handleGenerateNew}
          className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          New Invoice
        </button>
      </div>
    </div>
  );
};

export default InvoicePreview;