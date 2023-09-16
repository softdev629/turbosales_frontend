import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import { IGenericResponse } from "./types";
import { NewTestDriveSaveSchema } from "../../components/modals/testdrive.modal";

export const testdriveApi = createApi({
  reducerPath: "testdriveApi",
  baseQuery: customFetchBase,
  tagTypes: ["Testdrive"],
  endpoints: (builder) => ({
    createTestdrive: builder.mutation<IGenericResponse, NewTestDriveSaveSchema>(
      {
        query(data) {
          return {
            url: "testdrives",
            method: "POST",
            body: data,
            credentials: "include",
          };
        },
        invalidatesTags: [{ type: "Testdrive", id: "LIST" }],
      }
    ),
  }),
});

export const { useCreateTestdriveMutation } = testdriveApi;
