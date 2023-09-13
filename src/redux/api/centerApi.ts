import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import { ICenterSettings, ICenters, IGenericResponse } from "./types";
import { NewCenterSaveSchema } from "../../components/modals/center.modal";

export const centerApi = createApi({
  reducerPath: "centerApi",
  baseQuery: customFetchBase,
  tagTypes: ["Center"],
  endpoints: (builder) => ({
    addCenter: builder.mutation<IGenericResponse, NewCenterSaveSchema>({
      query(data) {
        return {
          url: "centers",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: [{ type: "Center", id: "LIST" }],
    }),
    getCenters: builder.query<
      { total_counts: number; filtered_counts: number; centers: ICenters[] },
      {
        page: number;
        rowsPerPage: number;
        country: string;
        level: string;
        search: string;
      }
    >({
      query({ page, rowsPerPage, country, level, search }) {
        return {
          url: `centers?page=${page}&rowsPerPage=${rowsPerPage}&country=${country}&level=${level}&search=${search}`,
          credentials: "include",
        };
      },
      providesTags: [{ type: "Center", id: "LIST" }],
    }),
    getCenterSettings: builder.query<ICenterSettings, void>({
      query() {
        return {
          url: "centers/settings",
          method: "GET",
          credentials: "include",
        };
      },
    }),
    updateCenterSettings: builder.mutation<{ status: string }, ICenterSettings>(
      {
        query(data) {
          return {
            url: "centers/settings",
            method: "POST",
            body: data,
            credentials: "include",
          };
        },
      }
    ),
  }),
});

export const {
  useAddCenterMutation,
  useLazyGetCentersQuery,
  useGetCenterSettingsQuery,
  useUpdateCenterSettingsMutation,
} = centerApi;
