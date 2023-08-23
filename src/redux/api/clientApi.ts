import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { NewClientSaveInput } from "../../components/modals/newclient.modal";
import { IGenericResponse } from "./types";

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/client/` }),
  endpoints: (builder) => ({
    addClient: builder.mutation<IGenericResponse, NewClientSaveInput>({
      query(data) {
        return {
          url: "",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});
