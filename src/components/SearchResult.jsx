import React, { useEffect, useState } from "react";
import MovieCart from "./MovieCart";
import { useSearchParams } from "react-router-dom";
import Message from "./Message";
import axiosInstance from "../config/apiConfig";
import NavBar2 from "./NavBar2";

const SearchResult = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  const [movies, setMovies] = useState([]);

  const [errorMovies, setErrorMovies] = useState({ message: "", flag: false });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axiosInstance.get(
          `/public/movies/search?query=${query}`
        );
        setMovies(res.data);
        setErrorMovies({ message: "", flag: false });
      } catch (error) {
        setErrorMovies({ message: error.response.data, flag: true });
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <NavBar2 />
      <div className="w-full flex justify-center mb-10 mt-10">
        {errorMovies.flag ? (
          <Message severity={"success"}>{errorMovies.message}</Message>
        ) : (
          <div className="w-[90%] flex flex-wrap gap-5">
            {movies.map((movie) => (
              <MovieCart key={movie.movie_id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
