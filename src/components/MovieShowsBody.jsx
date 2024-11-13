import React from "react";
import MovieShowCart from "./MovieShowCart";
import Message from "./Message";

const MovieShowsBody = ({ movieShows }) => {
  return (
    <div className="bg-gray-100 flex justify-center">
      <div className="mt-10 flex flex-col w-[90%] divide-y-2 bg-white pb-10 mb-10">
        <div className="flex p-2 justify-center">
          <span className="text-lg">shows</span>
        </div>
        {movieShows.map((movieShow) => (
          <MovieShowCart key={movieShow.show_id} movieShow={movieShow} />
        ))}
      </div>
    </div>
  );
};

export default MovieShowsBody;
