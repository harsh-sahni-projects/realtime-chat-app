import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    activeFriend: null
  },
  reducers: {
    setUser(state, action) {
      const userDetails = action.payload;
      state.user = userDetails;
    },
    setActiveFriend(state, action) {
      state.activeFriend = action.payload
    }
  }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;