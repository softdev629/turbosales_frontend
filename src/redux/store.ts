import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

import { clientApi } from "./api/clientApi";
import { centerApi } from "./api/centerApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { testdriveApi } from "./api/testdriveApi";

import userSlice from "./features/userSlice";
import centerSlice from "./features/centerSlice";

export const store = configureStore({
  reducer: {
    [centerApi.reducerPath]: centerApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [testdriveApi.reducerPath]: testdriveApi.reducer,
    userState: userSlice,
    centerState: centerSlice,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      centerApi.middleware,
      clientApi.middleware,
      authApi.middleware,
      userApi.middleware,
      testdriveApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
