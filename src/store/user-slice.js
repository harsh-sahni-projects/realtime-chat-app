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
      console.log('userslice msgObj:', action.payload)
      const msgObj = action.payload;
      const { sender, receiver } = msgObj;

      if (sender == state.user.username) { // current user has sent msg
        state.conversations[receiver].push(msgObj);
      } else { // current user has received msg from friend
        state.conversations[sender].push(msgObj);
      }
      
    }
  }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;