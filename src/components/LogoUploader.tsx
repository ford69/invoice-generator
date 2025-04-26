import React from 'react';
import logo from '../images/noblefit-logo.jpg';



const LogoUploader: React.FC = () => {
  return (
    <div className="mb-4">
      <div className="w-40 h-40 border rounded-md overflow-hidden">
        <img
          src={logo}
          alt="Company Logo"
          className="w-full h-full object-contain p-2"
        />
      </div>
    </div>
  );
};

export default LogoUploader;
