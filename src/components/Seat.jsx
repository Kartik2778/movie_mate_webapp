import React, { useState } from "react";

const Seat = ({getId,seat}) => {

    const [selected ,setSelected] = useState(false);

    const status = false;
    
    const handleSetSelection = (seat) => {
        setSelected(!selected);
        getId(seat);
    }


  return (
    <div className="flex flex-col items-center">
      <button className={`w-7 h-7 ${ !status ? selected ? "bg-green-600" : "bg-yellow-400 " : "bg-gray-100 cursor-not-allowed"} cursor-pointer shadow-sm`} 
      disabled={status}
      onClick={() => handleSetSelection(seat)}
      ></button>
      <div>{seat.seatNumber}</div>
    </div>
  );
};

export default Seat;
