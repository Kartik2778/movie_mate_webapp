import React, { useState } from "react";

const Seat = ({ getId, seat }) => {
  const [selected, setSelected] = useState(false);

  const handleSetSelection = (seat) => {
    if (!seat.status) { 
      setSelected(!selected);
      getId(seat.id);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        disabled={seat.status}
        className={`w-7 h-7 ${
          seat.status
            ? "bg-gray-100 cursor-not-allowed"
            : selected
            ? "bg-green-600 cursor-pointer"
            : "bg-yellow-400 cursor-pointer"
        } shadow-sm`}
        onClick={() => handleSetSelection(seat)}
      ></button>
      <div>{seat.seatNumber}</div>
    </div>
  );
};

export default Seat;
