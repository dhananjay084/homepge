import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white px-4 py-6">
      <div className="w-full max-w-md">
        <div className="flex justify-between text-xs text-purple-700 font-bold mb-4">
          <span>MY COUPON STOCK</span>
          <a href="#" className="text-right">HELP</a>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
