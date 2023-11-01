import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICenterSettings } from "../api/types";

interface ICenterState {
  settings: ICenterSettings | null;
  centers: string[];
}

const initialState: ICenterState = {
  settings: null,
  centers: [],
};

export const centerSlice = createSlice({
  initialState,
  name: "centerSlice",
  reducers: {
    setSettings: (state, action: PayloadAction<ICenterSettings>) => {
      state.settings = action.payload;
    },
    setCenters: (state, action: PayloadAction<string[]>) => {
      state.centers = [...action.payload];
    },
  },
});

export default centerSlice.reducer;

export const { setSettings, setCenters } = centerSlice.actions;
