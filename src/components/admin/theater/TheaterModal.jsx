import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { NEW_THEATER_CREATED_ADMIN, SET_THEATER_ADMIN, UPDATE_THEATER_ADMIN } from "../../../slices/admin/theater";

const TheaterModal = ({ title, buttonTitle, theater, open, close }) => {
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (title === "Update Theater" && theater) {
      setName(theater.name);
      setStreet(theater.address.street);
      setCity(theater.address.city);
      setState(theater.address.state);
      setCountry(theater.address.country);
    }
  }, [title, theater]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const theaterData = {
      name,
      address: {
        street,
        city,
        state,
        country,
      },
    };

    try {
      if (title === "Create New Theater") {
        const response = await axios.post(
          "http://localhost:8085/admin/create-theater",
          theaterData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(NEW_THEATER_CREATED_ADMIN(response.data));
      } else {
        const response = await axios.put(
          `http://localhost:8085/admin/${theater.theater_id}/update-theater`,
          theaterData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(UPDATE_THEATER_ADMIN(response.data));
      }
      close();
    } catch (error) {
      console.error("Error managing theater:", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-opacity ${
        open ? "visible opacity-100 bg-black/20" : "invisible opacity-0"
      }`}
    >
      <div className="bg-slate-700 p-6 rounded-lg shadow-lg w-1/2">
        <button
          type="button"
          className="float-right text-white hover:text-gray-100"
          onClick={close}
        >
          &times;
        </button>
        <h2 className="text-xl text-white font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-white">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mb-2 p-2 rounded-sm"
            />
          </div>

          <div>
            <label className="text-white flex flex-col gap-1">Address</label>
            <input
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
              className="w-full mb-2 p-2 rounded-sm"
              placeholder="Street"
            />
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full mb-2 p-2 rounded-sm"
              placeholder="City"
            />
            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              className="w-full mb-2 p-2 rounded-sm"
              placeholder="State"
            />
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="w-full mb-2 p-2 rounded-sm"
              placeholder="Country"
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              {buttonTitle}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TheaterModal;
