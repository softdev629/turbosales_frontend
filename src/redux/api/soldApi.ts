import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import { IGenericResponse } from "./types";
import { NewSoldSaveSchema } from "../../components/modals/sold.modal";

export const soldApi = createApi({
  reducerPath: "soldApi",
  baseQuery: customFetchBase,
  tagTypes: ["Sold"],
  endpoints: (builder) => ({
    createSold: builder.mutation<IGenericResponse, NewSoldSaveSchema>({
      query(data) {
        return {
          url: "solds",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: [{ type: "Sold", id: "LIST" }],
    }),
  }),
});

export const { useCreateSoldMutation } = soldApi;
