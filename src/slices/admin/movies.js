import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const movieSlice = createSlice({
  name: 'movies_admin',
  initialState,
  reducers: {
    SET_MOVIES_ADMIN : (state,action) => {
      return [...action.payload];
    },
    UPDATE_MOVIES_ADMIN: (state, action) => {
        state = state.filter( movie => movie.movie_id != action.payload.movie_id);
        return [...state,action.payload];
    },
    DELETE_MOVIES_ADMIN: (state,action) => {
        return state = state.filter( movie => movie.movie_id!= action.payload.movie_id);
    },
    NEW_MOVIE_CREATED_ADMIN: (state,action) => {
        return [...state,action.payload];
    }
  },
});

// Action creators are generated for each case reducer function
export const { SET_MOVIES_ADMIN, UPDATE_MOVIES_ADMIN, DELETE_MOVIES_ADMIN, NEW_MOVIE_CREATED_ADMIN } = movieSlice.actions

export default movieSlice.reducer