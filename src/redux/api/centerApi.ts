import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import { ICenterSettings, ICenters, IGenericResponse } from "./types";
import { NewCenterSaveSchema } from "../../components/modals/center.modal";
import { setSettings } from "../features/centerSlice";

export const centerApi = createApi({
  reducerPath: "centerApi",
  baseQuery: customFetchBase,
  tagTypes: ["Center", "Settings"],
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
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSettings(data));
        } catch (error) {}
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
    getAllCenters: builder.query<string[], void>({
      query() {
        return {
          url: "/centers/all",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: { center_id: string }[] }) =>
        result.data.map((item) => item.center_id),
    }),
  }),
});

export const {
  useAddCenterMutation,
  useLazyGetCentersQuery,
  useGetCenterSettingsQuery,
  useLazyGetCenterSettingsQuery,
  useUpdateCenterSettingsMutation,
  useGetAllCentersQuery,
} = centerApi;
