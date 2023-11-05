import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import { IGenericResponse } from "./types";
import { LoginUserSchema } from "../../pages/login.page";
import { userApi } from "./userApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    loginUser: builder.mutation<IGenericResponse, LoginUserSchema>({
      query(data) {
        return {
          method: "POST",
          url: "/auth/login",
          body: data,
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {}
      },
    }),
    logoutUser: builder.mutation<IGenericResponse, void>({
      query() {
        return {
          url: "/auth/logout",
          credentials: "include",
        };
      },
    }),
    getTerms: builder.query<string, void>({
      query() {
        return {
          url: "/terms",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: string }) => result.data,
    }),
    updateTerms: builder.mutation<IGenericResponse, { terms: string }>({
      query(data) {
        return {
          method: "PATCH",
          url: "/terms",
          credentials: "include",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetTermsQuery,
  useUpdateTermsMutation,
} = authApi;
