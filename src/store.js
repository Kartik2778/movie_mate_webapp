import { configureStore } from '@reduxjs/toolkit'
import selectCityReducer from './slices/SelectCity'
import userProfileReducer from './slices/userProfile'
import theaterAdminReducer from './slices/admin/theater'
import cinemaHallAdminReducer from './slices/admin/cinemaHall'
import moviesAdminReducer from './slices/admin/movies'
import movieShowAdminReducer from './slices/admin/movie_show'

export const store = configureStore({
  reducer: {
    selectedCity : selectCityReducer,
    userProfile:  userProfileReducer,
    theater_admin: theaterAdminReducer,
    cinemaHall_admin: cinemaHallAdminReducer,
    movies_admin: moviesAdminReducer,
    movieShow_admin: movieShowAdminReducer,
  },
})