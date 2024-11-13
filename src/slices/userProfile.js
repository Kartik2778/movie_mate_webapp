import { Password } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    Password:"",
    phone: "",
    address: {
        street: "",
        city: "",
        state: "",
        country: ""
    },
    role: "",
    bookings: []
}

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    SET_USER_PROFILE : (state, action) => {
       return {...state, ...action.payload}
    },
    RESET_USER_PROFILE: () => {
        return initialState;
    }
  },
});


export const { SET_USER_PROFILE, RESET_USER_PROFILE } = userProfileSlice.actions

export default userProfileSlice.reducer