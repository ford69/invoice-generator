import React, { useRef, useState } from 'react';
import { useInvoice } from '../context/InvoiceContext';
import { ImageIcon, X } from 'lucide-react';

const LogoUploader: React.FC = () => {
  const { invoice, updateLogo } = useInvoice();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveLogo = () => {
    updateLogo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="mb-4">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      
      {invoice.logoUrl ? (
        <div className="relative w-40 h-40 border rounded-md overflow-hidden">
          <img 
            src={invoice.logoUrl} 
            alt="Company Logo" 
            className="w-full h-full object-contain p-2"
          />
          <button
            type="button"
            onClick={handleRemoveLogo}
            className="absolute top-1 right-1 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          className={`w-40 h-40 border-2 border-dashed flex flex-col items-center justify-center rounded-md cursor-pointer transition-colors ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-xs text-gray-500 text-center">
            Click or drag and drop <br />to upload logo
          </p>
        </div>
      )}
    </div>
  );
};

export default LogoUploader;