import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import { NewClientSaveInput } from "../../components/modals/client.modal";
import { IGenericResponse } from "./types";

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    addClient: builder.mutation<IGenericResponse, NewClientSaveInput>({
      query(data) {
        return {
          url: "clients",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useAddClientMutation } = clientApi;
