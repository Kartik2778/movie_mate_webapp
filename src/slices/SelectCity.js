import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedCity : '',
  cities: [] 
};

export const selectedCitySlice = createSlice({
  name: 'selectedCity',
  initialState,
  reducers: {
    UPDATE_CITY_VALUE : (state, action) => {
      return {...state, selectedCity: action.payload};
    },
    SET_CITIES: (state,action) => {
      return {selectedCity: action.payload[0],cities: [...action.payload]};
    }
  },
});

// Action creators are generated for each case reducer function
export const { UPDATE_CITY_VALUE, SET_CITIES } = selectedCitySlice.actions

export default selectedCitySlice.reducer