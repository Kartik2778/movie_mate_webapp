import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { NEW_CINEMA_HALL_CREATED_ADMIN } from "../../../slices/admin/cinemaHall";
import axios from "axios";

const CinemaHallModal = ({ open, close }) => {
  const nameRef = useRef();
  const theaterNameRef = useRef();
  const regularSeatsRef = useRef();
  const premiumSeatsRef = useRef();
  const vipSeatsRef = useRef();

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cinemaHallData = {
      name: nameRef.current.value,
      theaterName: theaterNameRef.current.value,
      noOfRegularSeats: regularSeatsRef.current.value,
      noOfPremiumSeats: premiumSeatsRef.current.value,
      noOfVipSeats: vipSeatsRef.current.value,
    };

    console.log(cinemaHallData);

    try {
      const response = await axios.post(
        "http://localhost:8085/admin/create-cinemaHall",
        cinemaHallData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(NEW_CINEMA_HALL_CREATED_ADMIN(response.data));
      console.log("Cinema Hall created:", response.data);
      close();
    } catch (error) {
      console.error("Error creating cinema hall:", error);
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
        <h2 className="text-xl text-white font-bold mb-4">
          Create New Cinema Hall
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-white">Name:</label>
            <input
              type="text"
              ref={nameRef}
              required
              className="w-full mb-2 p-2 rounded-sm"
            />
          </div>

          <div>
            <label className="text-white ">Theater Name:</label>
            <input
              type="text"
              ref={theaterNameRef}
              required
              className="w-full mb-2 p-2 rounded-sm"
            />
          </div>

          <div className="flex flex-col">
            <div>
              <label className="text-white">Seats:</label>
            </div>
            <div className="flex gap-5">
              <input
                type="number"
                ref={regularSeatsRef}
                required
                className="w-full mb-2 p-2 rounded-sm"
                placeholder="Regular Seats"
              />
              <input
                type="number"
                ref={premiumSeatsRef}
                required
                className="w-full mb-2 p-2 rounded-sm"
                placeholder="Premium Seats"
              />
              <input
                type="number"
                ref={vipSeatsRef}
                required
                className="w-full mb-2 p-2 rounded-sm"
                placeholder="VIP Seats"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Create Cinema Hall
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CinemaHallModal;
