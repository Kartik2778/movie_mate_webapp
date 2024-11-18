import { CircularProgress, Divider } from "@mui/material";
import Seat from "./Seat";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../config/apiConfig";
import Message from "./Message";
import { current } from "@reduxjs/toolkit";

const ShowSeats = () => {
  const { id: showId } = useParams("id");
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatDetails, setSeatDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    flag: false,
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const res = await axiosInstance.get(`/user/${showId}/show-seats`);
        setSeats(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    const fetchSeatDetails = async () => {
      try {
        const res = await axiosInstance.get(
          `/user/${showId}/show-seat-details`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSeatDetails(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSeatDetails();
    fetchSeats();
  }, [showId]);

  useEffect(() => {});

  const getSelectedSeats = (seatId) => {
    let res = selectedSeats.indexOf(seatId);
    if (res == -1) {
      setSelectedSeats((currSeats) => {
        return [...currSeats, seatId];
      });
    } else {
      setSelectedSeats((currSeats) => {
        const updatedSeats = currSeats.filter((seat) => seat != seatId);
        return updatedSeats;
      });
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      setErrorMessage({
        message: "Please select some seats first",
        flag: true,
      });
    } else {
      const bookSeats = async () => {
        const isScriptLoaded = await loadRazorpayScript();
        if (!isScriptLoaded) {
          setErrorMessage({
            message: "Razorpay SDK failed to load. Please try again later.",
            flag: true,
          });
          return;
        }

        try {
          const res = await axiosInstance.post("/user/create-booking", {
            movieShowId: showId,
            seatIds: selectedSeats,
          });
          const order = res.data;
          const options = {
            key: "rzp_test_b8iv7N5HFqzQ8O",
            amount: order.totalPrice,
            currency: "INR",
            name: "Movie Mate",
            description: "Ticket Payment",
            order_id: order.razorpayOrderId,
            handler: async function (response) {
              try {
                await axiosInstance.post("/user/confirm-booking", {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                });
                navigate("/payment-success");
              } catch (error) {
                console.error("Payment failed:", error);
              }
            },
            prefill: {
              name: order.user.name,
              email: order.user.email,
              contact: order.user.phone,
            },
            theme: {
              color: "#3399cc",
            },
          };

          const paymentObject = new Razorpay(options);
          paymentObject.open();
          paymentObject.on("payment.failed",function(response) {
            const paymentFailed = async () => {
              try{
                await axiosInstance.post("/user/payment-failed",{
                  razorpay_payment_id: response.error.metadata.payment_id,
                  razorpay_order_id: response.error.metadata.order_id,
                });
                navigate("/payment-failed");
              }
              catch(error) {
                console.log(error);
              }
            }
            paymentFailed();
          })
        } catch (error) {
          setErrorMessage({ message: error.error.description, flag: true });
        }
      };

      setSelectedSeats([]);
      setErrorMessage({ message: "", flag: false });
      bookSeats();
    }
  };

  const regularSeats = seats.slice(0, seatDetails.noOfRegularSeats);
  const premiumSeats = seats.slice(
    seatDetails.noOfRegularSeats,
    seatDetails.noOfRegularSeats + seatDetails.noOfPremiumSeats
  );
  const vipSeats = seats.slice(
    seatDetails.noOfRegularSeats + seatDetails.noOfPremiumSeats,
    seatDetails.noOfRegularSeats +
      seatDetails.noOfPremiumSeats +
      seatDetails.noOfVipSeats
  );

  return (
    <>
      {loading ? (
        <div className="flex w-full min-h-screen justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="w-full min-h-screen pt-5 mb-10">
          <div className="flex justify-center text-2xl font-semibold">
            Select Seats
          </div>
          <div className="pl-5 flex gap-10">
            <div className="flex flex-col">
              <button className="w-7 h-7 bg-green-600"></button>
              <div>Selected</div>
            </div>
            <div className="flex flex-col">
              <button className="w-7 h-7 bg-gray-200"></button>
              <div>Occupied</div>
            </div>
          </div>
          <div className="mt-10 flex justify-center text-2xl">Screen</div>
          <div className="mt-10">
            <Divider />
            <div className="pl-5">
              <strong>Regular Seats</strong>
              <span> ₹{seatDetails.regularSeatPrice}</span>
            </div>
            <div className="w-[60%] flex flex-wrap gap-5 ml-[20%] mr-[20%]">
              {regularSeats.map((seat) => (
                <Seat getId={getSelectedSeats} seat={seat} key={seat.id} />
              ))}
            </div>
          </div>
          <div className="mt-10">
            <Divider />
            <div className="pl-5">
              <strong>Premium Seat </strong>
              <span> ₹{seatDetails.premiumSeatPrice}</span>
            </div>
            <div className="w-[60%] flex flex-wrap gap-5 ml-[20%] mr-[20%]">
              {premiumSeats.map((seat) => (
                <Seat getId={getSelectedSeats} seat={seat} key={seat.id} />
              ))}
            </div>
          </div>
          <div className="mt-10">
            <Divider />
            <div className="pl-5">
              <strong>VIP Seat </strong>
              <span> ₹{seatDetails.vipSeatPrice}</span>
            </div>
            <div className="w-[60%] flex flex-wrap gap-5 ml-[20%] mr-[20%]">
              {vipSeats.map((seat) => (
                <Seat getId={getSelectedSeats} seat={seat} key={seat.id} />
              ))}
            </div>
          </div>
          {errorMessage.flag && (
            <div className="w-[80%] ml-[10%] mr-[10%] mt-5 mb-5 flex justify-center">
              {" "}
              <Message severity={"error"}>{errorMessage.message}</Message>{" "}
            </div>
          )}
          <div className="flex justify-center">
            <button
              className="pl-5 pr-5 pt-2 pb-2 rounded-md outline outline-green-600 text-green-600"
              onClick={handleBooking}
            >
              Book
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowSeats;
