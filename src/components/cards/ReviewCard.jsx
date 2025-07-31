import React from "react";

const ReviewCard = ({ data }) => {
  const { name, designation, desc, image } = data || {};

  return (
    <div className="shadow-2xl border border-[#f1f1f1] p-4 min-w-[350px] max-w-[350px] space-y-2">
       <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-[12px]">{name}</p>
          <p className="text-[7px]">{designation}</p>
        </div>
        <img
          src={image}
          alt={name}
          className="max-w-[50px] rounded-[50%]  object-fill"
        />
      </div>
      <div>
        <p className="text-[10px]">{desc}</p>
      </div>
     
    </div>
  );
};

export default ReviewCard;
