import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  credit: 0,
};

export const coin = createSlice({
  name: "Coin",
  initialState: initialState,
  reducers: {
    loade: (state, action) => {
      return {
        credit: action.payload.credit,
      };
    },
  },
});

export const { loade } = coin.actions;
export default coin.reducer;
