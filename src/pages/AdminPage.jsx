import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MovieIcon from '@mui/icons-material/Movie';
import TheatersIcon from '@mui/icons-material/Theaters';
import StadiumIcon from '@mui/icons-material/Stadium';
import { NavLink, Outlet } from 'react-router-dom';


const AdminPage = () => {
  return (
    <div className='flex w-full min-h-screen divide-x-2'>
      <div className='w-[10%] h-full bg-white flex flex-col items-center gap-5 text-blue-500 pt-5' >
      <div>
            <NavLink to="/">
                <HomeIcon/>
                <span> Home</span>
            </NavLink>
        </div>
        <div>
            <NavLink to="all-user">
                <PeopleAltIcon/>
                <span> Users</span>
            </NavLink>
        </div>
        <div>
            <NavLink to="movies">
                <MovieIcon/>
                <span> Movies</span>
            </NavLink>
        </div>
        <div>
            <NavLink to="theaters">
                <TheatersIcon/>
                <span> Theater</span>
            </NavLink>
        </div>
        <div>
            <NavLink to="cinema-halls">
                <StadiumIcon/>
                <span> Cinema Hall</span>
            </NavLink>
        </div>
       
      </div>
      <div className='w-[90%] bg-gray-100' >
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminPage
