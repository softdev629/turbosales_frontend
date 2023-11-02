import { createApi } from "@reduxjs/toolkit/dist/query/react";
import customFetchBase from "./customFetchBase";
import { ICommissionData, IGenericResponse } from "./types";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getCommissions: builder.query<ICommissionData, void>({
      query() {
        return {
          url: "/commissions",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: ICommissionData }) => result.data,
    }),
  }),
});

export const { useGetCommissionsQuery } = transactionApi;
