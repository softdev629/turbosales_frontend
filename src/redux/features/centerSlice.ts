import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICenterSettings } from "../api/types";

interface ICenterState {
  settings: ICenterSettings | null;
}
