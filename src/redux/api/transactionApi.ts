import { createApi } from "@reduxjs/toolkit/dist/query/react";
import customFetchBase from "./customFetchBase";
import { ICommissionData, IDashboardData, IHQDashboardData } from "./types";

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
    getHQDashboard: builder.query<IHQDashboardData, void>({
      query() {
        return {
          url: "/hq_dashboard",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: IHQDashboardData }) => result.data,
    }),
    getDashboard: builder.query<IDashboardData, void>({
      query() {
        return {
          url: "/dashboard",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: IDashboardData }) => result.data,
    }),
  }),
});

export const {
  useGetCommissionsQuery,
  useGetHQDashboardQuery,
  useGetDashboardQuery,
} = transactionApi;
