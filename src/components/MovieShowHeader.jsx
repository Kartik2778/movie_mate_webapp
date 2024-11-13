import React from 'react';

const MovieShowHeader = ({ movie }) => {
  return (
    <div className='w-full flex h-[70vh] bg-black/90'>
      <div className='w-[30%] h-full flex justify-center items-center'>
        <img
          className='h-[80%] object-cover rounded-sm'
          src={movie?.photo}
          alt={movie?.title ? `${movie.title} Poster` : 'Movie poster'}
        />
      </div>
      <div className='w-[70%] h-full flex flex-col gap-5 justify-center text-white p-5'>
        <div className='text-4xl font-bold'>{movie?.title}</div>
        <div className='text-black'>
          <div className='flex gap-2'>
            {movie?.languages?.map((lang, index) => (
              <span key={index} className='p-2 bg-gray-200 rounded-sm'>
                {lang}
              </span>
            ))}
          </div>
        </div>
        <div className='flex gap-2'>
          <span>{movie?.duration}</span>
          <span>{movie?.type}</span>
          <span>{movie?.releaseDate}</span>
        </div>
        <div>
          <div className='text-xl font-semibold mb-2'>About the Movie</div>
          <div>{movie?.description}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieShowHeader;
