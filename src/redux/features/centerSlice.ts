import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICenterSettings } from "../api/types";

interface ICenterState {
  settings: ICenterSettings | null;
}

const initialState: ICenterState = {
  settings: null,
};

export const centerSlice = createSlice({
  initialState,
  name: "centerSlice",
  reducers: {
    setSettings: (state, action: PayloadAction<ICenterSettings>) => {
      state.settings = action.payload;
    },
  },
});

export default centerSlice.reducer;

export const { setSettings } = centerSlice.actions;
