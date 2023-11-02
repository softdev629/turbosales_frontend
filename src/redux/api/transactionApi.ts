import { createApi } from "@reduxjs/toolkit/dist/query/react";
import customFetchBase from "./customFetchBase";
import { IGenericResponse } from "./types";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getCommissions: builder.query<{ upcomingCommissions: number }, void>({
      query() {
        return {
          url: "/commissions",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: { upcomingCommissions: number } }) =>
        result.data,
    }),
  }),
});

export const { useGetCommissionsQuery } = transactionApi;
