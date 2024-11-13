import React, { useEffect, useRef, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_CITIES, UPDATE_CITY_VALUE } from "../slices/SelectCity";
import { RESET_USER_PROFILE } from "../slices/userProfile";
import axios from "axios";

const NavBar = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const role = localStorage.getItem("role");
  const searchText = useRef("");
  const navigate = useNavigate();
  const { selectedCity, cities } = useSelector((store) => store.selectedCity);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get("http://localhost:8085/public/all-cities");
        dispatch(SET_CITIES(res.data));
      } catch (error) {
        console.log("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, [dispatch]);

  const handleSelectCity = (event) => {
    dispatch(UPDATE_CITY_VALUE(event.target.value));
  };

  const handleSearchOperation = () => {
    navigate(`/search?query=${encodeURIComponent(searchText.current.value)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    dispatch(RESET_USER_PROFILE());
  };

  return (
    <div className="flex items-center justify-between bg-red-600 p-3">
      <div className="ml-5 flex gap-5">
        <div className="text-white font-medium text-lg">Movie Mate</div>
        <div className="flex bg-white w-96 items-center rounded-full p-2">
          <input
            className="w-full h-[100%] bg-transparent focus:outline-none pl-3 pr-2"
            type="text"
            placeholder="Search movies..."
            ref={searchText}
            onKeyDown={(e) => e.key === "Enter" && handleSearchOperation()}
          />
          <SearchIcon
            className="w-full h-[100%] text-gray-600 cursor-pointer"
            onClick={handleSearchOperation}
          />
        </div>
      </div>
      <div className="flex gap-5 items-center mr-5">
        <div>
          <select className="p-1 focus:outline-none" value={selectedCity} onChange={handleSelectCity}>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div>
          {token ? (
            <div className="flex gap-5 items-center">
              {role === "ROLE_ADMIN" && (
                <Link to="/admin-panel" className="text-white">
                  Admin
                </Link>
              )}
              <Link to="user-profile">
                <AccountCircleIcon className="text-white" fontSize="large" />
              </Link>
              <button
                onClick={handleLogout}
                className="text-white pt-2 pb-2 pl-5 pr-5 bg-blue-600 rounded-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <button className="text-white pt-2 pb-2 pl-5 pr-5 bg-blue-600 rounded-md">
                  Login
                </button>
              </Link>
              <Link to="signup">
                <button className="text-white pt-2 pb-2 pl-5 pr-5 bg-green-600 rounded-md">
                  Signup
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
