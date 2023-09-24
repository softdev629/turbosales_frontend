import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import { IGenericResponse, ITestdrive } from "./types";
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
    getTestdriveByDate: builder.query<ITestdrive[], { date: string }>({
      query({ date }) {
        return {
          url: `testdrives/date?date=${date}`,
          credentials: "include",
        };
      },
      transformResponse: (result: { data: ITestdrive[] }) => result.data,
    }),
  }),
});

export const { useCreateTestdriveMutation, useLazyGetTestdriveByDateQuery } =
  testdriveApi;
