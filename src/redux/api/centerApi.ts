import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICenters, IGenericResponse } from "./types";
import { NewCenterSaveSchema } from "../../components/modals/center.modal";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

export const centerApi = createApi({
  reducerPath: "centerApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/center` }),
  tagTypes: ["Center"],
  endpoints: (builder) => ({
    addCenter: builder.mutation<IGenericResponse, NewCenterSaveSchema>({
      query(data) {
        return {
          url: "",
          method: "POST",
          body: data,
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
          url: `?page=${page}&rowsPerPage=${rowsPerPage}&country=${country}&level=${level}&search=${search}`,
        };
      },
      providesTags: [{ type: "Center", id: "LIST" }],
    }),
  }),
});

export const { useAddCenterMutation, useLazyGetCentersQuery } = centerApi;
