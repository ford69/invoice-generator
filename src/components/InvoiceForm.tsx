import React from 'react';
import { useInvoice } from '../context/InvoiceContext';
import { Trash2, Plus } from 'lucide-react';
import LogoUploader from './LogoUploader';

const InvoiceForm: React.FC = () => {
  const { 
    invoice, 
    addProduct, 
    updateProduct, 
    removeProduct, 
    updateClientInfo,
    updateShippingCost 
  } = useInvoice();
  
  return (
    <div className="space-y-6">
      {/* Logo Section */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Logo
        </label>
        <LogoUploader />
      </div>
      
      {/* Client Information */}
      <div className="p-4 bg-gray-50 rounded-md">
        <h3 className="font-medium text-gray-700 mb-3">Bill To</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={invoice.clientInfo.name}
              onChange={(e) => updateClientInfo({ name: e.target.value })}
              placeholder="Enter client name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={invoice.clientInfo.email}
              onChange={(e) => updateClientInfo({ email: e.target.value })}
              placeholder="client@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={invoice.clientInfo.phone}
              onChange={(e) => updateClientInfo({ phone: e.target.value })}
              placeholder="(555) 123-4567"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={invoice.clientInfo.address}
              onChange={(e) => updateClientInfo({ address: e.target.value })}
              placeholder="Enter client address"
            />
          </div>
        </div>
      </div>
      
      {/* Product Items */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-700">Products/Services</h3>
          <button
            type="button"
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
            onClick={addProduct}
          >
            <Plus size={16} className="mr-1" /> Add Item
          </button>
        </div>
        
        {invoice.products.map((product, index) => (
          <div
            key={product.id}
            className="p-4 bg-gray-50 rounded-md mb-4 relative transition-all duration-300 hover:shadow-sm"
          >
            <div className="absolute right-3 top-3">
              <button
                type="button"
                className="text-gray-400 hover:text-red-500 transition-colors"
                onClick={() => removeProduct(product.id)}
                disabled={invoice.products.length <= 1}
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={product.name}
                onChange={(e) => updateProduct(product.id, { name: e.target.value })}
                placeholder="Enter product name"
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fabric Type
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={product.fabricType}
                  onChange={(e) => updateProduct(product.id, { fabricType: e.target.value })}
                  placeholder="Cotton, Silk, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={product.color}
                  onChange={(e) => updateProduct(product.id, { color: e.target.value })}
                  placeholder="Red, Blue, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={product.quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value > 0 || e.target.value === '') {
                      updateProduct(product.id, { 
                        quantity: e.target.value === '' ? 0 : value 
                      });
                    }
                  }}
                  placeholder="Qty"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit Price ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={product.unitPrice === 0 ? '' : product.unitPrice}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    updateProduct(product.id, { 
                      unitPrice: isNaN(value) ? 0 : value 
                    });
                  }}
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Shipping Cost */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Shipping Cost ($)
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={invoice.shippingCost === 0 ? '' : invoice.shippingCost}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            updateShippingCost(isNaN(value) ? 0 : value);
          }}
          placeholder="0.00"
        />
      </div>
    </div>
  );
};

export default InvoiceForm;