import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import { IGenericResponse } from "./types";
import { NewStaffSaveSchema } from "../../components/modals/staff.modal";

export const staffApi = createApi({
  reducerPath: "staffApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    addStaff: builder.mutation<IGenericResponse, NewStaffSaveSchema>({
      query(data) {
        return {
          url: "staffs",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useAddStaffMutation } = staffApi;
