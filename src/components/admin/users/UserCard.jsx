import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonIcon from "@mui/icons-material/Person";

const UserCard = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden w-[100%] mb-4">
      <div
        className="flex justify-between items-center p-4 bg-white shadow-md cursor-pointer"
        onClick={toggleDetails}
      >
        <div>
          <PersonIcon />
          <span className="ml-2 font-semibold">{user.firstName+" "+user.lastName}</span>
        </div>
        <span className="text-lg">
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </span>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-2 p-4 border-t  bg-white shadow-md border-gray-300">
          <div>Email: {user.email}</div>
          <div>Phone: {user.phone}</div>
          <div className="flex gap-2">
            <div>Address: </div>
            <div className="flex flex-col gap-2">
              <p>{user.address.street}</p>
              <p>{user.address.city}</p>
              <p>{user.address.state}</p>
              <p>{user.address.country}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
