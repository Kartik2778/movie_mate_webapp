import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const theaterSlice = createSlice({
  name: 'theater_admin',
  initialState,
  reducers: {
    SET_THEATER_ADMIN : (state, action) => {
      return [...action.payload];
    },
    UPDATE_THEATER_ADMIN: (state, action) => {
        state = state.filter( theater => theater.theater_id != action.payload.theater_id);
        return [...state,action.payload];
    },
    DELETE_THEATER_ADMIN: (state,action) => {
        return state = state.filter( theater => theater.theater_id != action.payload.theater_id);
    },
    NEW_THEATER_CREATED_ADMIN: (state,action) => {
        return [...state,action.payload];
    }
  },
});

// Action creators are generated for each case reducer function
export const { SET_THEATER_ADMIN, UPDATE_THEATER_ADMIN, DELETE_THEATER_ADMIN, NEW_THEATER_CREATED_ADMIN } = theaterSlice.actions

export default theaterSlice.reducer