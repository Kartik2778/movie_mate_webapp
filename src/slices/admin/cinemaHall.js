import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const cinemaHallSlice = createSlice({
  name: 'cinemaHall_admin',
  initialState,
  reducers: {
    SET_CINEMA_HALL_ADMIN : (state,action) => {
      return [...action.payload];
    },
    UPDATE_CINEMA_HALL_ADMIN: (state, action) => {
        state = state.filter( cinemaHall => cinemaHall.hall_id != action.payload.hall_id);
        return [...state,action.payload];
    },
    DELETE_CINEMA_HALL_ADMIN: (state,action) => {
        return state = state.filter( cinemaHall => cinemaHall.hall_id != action.payload.hall_id);
    },
    NEW_CINEMA_HALL_CREATED_ADMIN: (state,action) => {
        return [...state,action.payload];
    }
  },
});

// Action creators are generated for each case reducer function
export const { SET_CINEMA_HALL_ADMIN, UPDATE_CINEMA_HALL_ADMIN, DELETE_CINEMA_HALL_ADMIN, NEW_CINEMA_HALL_CREATED_ADMIN } = cinemaHallSlice.actions

export default cinemaHallSlice.reducer