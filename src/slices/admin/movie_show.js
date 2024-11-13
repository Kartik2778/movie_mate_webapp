import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const movieShowSlice = createSlice({
  name: 'movieShow_admin',
  initialState,
  reducers: {
    SET_MOVIE_SHOW_ADMIN : (state,action) => {
      return [...action.payload];
    },
    DELETE_MOVIE_SHOW_ADMIN: (state,action) => {
        return state = state.filter( movieShow => movieShow.show_id!= action.payload.show_id);
    },
    NEW_MOVIE_SHOW_CREATED_ADMIN: (state,action) => {
        return [...state,action.payload];
    }
  },
});

// Action creators are generated for each case reducer function
export const { SET_MOVIE_SHOW_ADMIN, DELETE_MOVIE_SHOW_ADMIN, NEW_MOVIE_SHOW_CREATED_ADMIN } = movieShowSlice.actions

export default movieShowSlice.reducer