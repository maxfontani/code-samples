/* eslint no-param-reassign: "off" */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { InitialState } from "./types";

// TODO: get init state from BE
export const initialState: InitialState = {
  id: 1,
  firstName: "Mohamed",
  lastName: "Salah",
  role: "user",
  wishlist: [1],
  watchlist: [1],
  votelist: [3],
  extensionlist: [1],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    EXTEND_BOOKING: (
      state,
      action: PayloadAction<{ id: number; extensionDate: string }>
    ) => {
      const { id } = action.payload;

      if (!state.extensionlist.includes(id)) state.extensionlist.push(id);
    },
    TOGGLED_WISH: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const wishIndex = state.wishlist.indexOf(id);

      if (~wishIndex) {
        state.wishlist.splice(wishIndex, 1);
      } else {
        state.wishlist.push(id);
      }
    },
    TOGGLED_WATCH: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const watchIndex = state.watchlist.indexOf(id);

      if (~watchIndex) {
        state.watchlist.splice(watchIndex, 1);
      } else {
        state.watchlist.push(id);
      }
    },
    TOGGLED_VOTE: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const voteIndex = state.votelist.indexOf(id);

      if (~voteIndex) {
        state.votelist.splice(voteIndex, 1);
      } else {
        state.votelist.push(id);
      }
    },
  },
});

export const {
  EXTEND_BOOKING: extendBooking,
  TOGGLED_WATCH: toggleWatch,
  TOGGLED_WISH: toggleWish,
  TOGGLED_VOTE: toggleVote,
} = userSlice.actions;

export default userSlice.reducer;
