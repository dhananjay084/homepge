import React from 'react';
import { Typography } from '@mui/material';

const CouponModal = ({ open, onClose, brand, oldOffer, newOffer, code, description, detailsLink }) => {
  if (!open) return null;

  return (
    // <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.3)] flex items-center justify-center">

      <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md relative border-[2px] border-[#6c38d9]">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-black text-lg font-bold">
          ×
        </button>

        {/* Content */}
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{brand}</Typography>
        <div className="flex gap-2 text-sm my-2">
          <s className="text-gray-400">{oldOffer}</s>
          <span className="font-bold text-[#6c38d9]">{newOffer}</span>
        </div>

        {/* Code section */}
        <div className="border border-dashed border-[#6c38d9] p-2 rounded-xl mt-2 flex items-center justify-between text-sm">
          <span><strong>{newOffer}</strong> with Code <strong>{code}</strong></span>
          <button onClick={() => navigator.clipboard.writeText(code)} className="text-[#6c38d9] underline">
            Copy
          </button>
        </div>

        {/* Details */}
        <Typography className="mt-4 text-sm text-[#6c38d9] underline cursor-pointer">
          <a href={detailsLink} target="_blank" rel="noopener noreferrer">See Details</a>
        </Typography>
      </div>
    </div>
  );
};

export default CouponModal;
