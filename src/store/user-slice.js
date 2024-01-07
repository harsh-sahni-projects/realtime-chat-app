import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    activeFriend: null,
    conversations: {}
  },
  reducers: {
    setUser(state, action) {
      const userDetails = action.payload;
      state.user = userDetails;
      if (!userDetails) { // 'null' on logout
        state.conversations = {};
        return;
      }
      // console.log('state:', state.user, state.activeFriend, state.conversations)
      userDetails.friends.forEach(friend => {
        if (!state.conversations.hasOwnProperty(friend))
          state.conversations[friend] = [];
      })
    },
    setActiveFriend(state, action) {
      state.activeFriend = action.payload
    },
    updateFriendsList(state, action) {
      const updateFriends = action.payload;
      state.user.friends = [...updateFriends];
      updateFriends.forEach(friend => {
        if (!state.conversations.hasOwnProperty(friend))
          state.conversations[friend] = [];
      });
    },
    saveNewMsg(state, action) {
      const { friend, msgObj } = action.payload;
      state.conversations[friend].push(msgObj);
      console.log('slice - saved msg:', action.payload);
    }
  }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;