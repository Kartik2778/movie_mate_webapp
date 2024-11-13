import React, { useEffect, useState } from "react";
import MovieShowDetails from "./MovieShowDetails";
import MovieShowModal from "./MovieShowModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SET_MOVIE_SHOW_ADMIN } from "../../../slices/admin/movie_show";
import { CircularProgress } from "@mui/material";
import axiosInstance from "../../../config/apiConfig";

const AllMovieShows = () => {
  const [open, setOpen] = useState(false);
  const { id: cinemaHallId } = useParams(); // Destructure 'id' from useParams directly
  const dispatch = useDispatch();
  const movieShows = useSelector((store) => store.movieShow_admin);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieShows = async () => {
      try {
        const response = await axiosInstance.get(
          `admin/cinema-hall/${cinemaHallId}/movie-shows`
        );
        dispatch(SET_MOVIE_SHOW_ADMIN(response.data));
      } catch (error) {
        console.error("Error fetching movie shows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieShows();
  }, [cinemaHallId, dispatch]); // Added dispatch and cinemaHallId as dependencies

  return (
    <>
      {loading ? (
        <div className="flex w-full min-h-screen justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="flex flex-col gap-5 m-5">
          <div>
            {movieShows.map((movieShow) => (
              <MovieShowDetails movieShow={movieShow} key={movieShow.show_id} />
            ))}
          </div>
          <div className="flex justify-center">
            <button
              className="pt-2 pb-2 pl-5 pr-5 bg-blue-600 rounded-md shadow-sm text-white"
              onClick={() => setOpen(true)}
            >
              New Movie Show
            </button>
            {open && (
              <MovieShowModal
                cinemaHallId={cinemaHallId}
                open={open}
                close={() => setOpen(false)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AllMovieShows;
