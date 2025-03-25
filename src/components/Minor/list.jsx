import React from "react";

const List = ({ items ,direction}) => {

  return (
    <div>
      <ul className={`${direction}`}> 
        {items.map((item, index) => (
          <li key={index}>{item}</li> 
        ))}
      </ul>
    </div>
  );    
};

export default List;
