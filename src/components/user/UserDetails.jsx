import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";

const UserDetails = () => {

  const userProfile = useSelector(store => store.userProfile);


  return (
    <div className="bg-white w-fit h-fit flex flex-col gap-5 mt-[20%] items-center pl-5 shadow-lg rounded-md p-5">
      <div className="p-5 bg-gray-100 w-fit rounded-full">
        <PersonIcon fontSize="large" />
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <strong>Name: </strong>
          {userProfile.firstName+" "+userProfile.lastName}
        </div>
        <div>
          <strong>Email: </strong>
          {userProfile.email}
        </div>
        <div>
          <strong>Phone: </strong>
          {userProfile.phone}
        </div>
        <div className="flex gap-2">
          <div>
            <strong>Address: </strong>
          </div>
          <div className="flex flex-col gap-1">
            <div>{userProfile.address.street}</div>
            <div>{userProfile.address.city}</div>
            <div>{userProfile.address.state}</div>
            <div>{userProfile.address.country}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
