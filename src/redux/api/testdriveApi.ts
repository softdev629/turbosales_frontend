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
    getPendding: builder.query<ITestdrive | null, void>({
      query() {
        return {
          url: "testdrives/pending",
          credentials: "include",
        };
      },
      transformResponse: (results: { data: ITestdrive | null }) => results.data,
    }),
    assignTestdrive: builder.mutation<
      IGenericResponse,
      { testdrive_id: string; staff_id: string }
    >({
      query(data) {
        return {
          method: "PATCH",
          url: "/testdrives/assign",
          credentials: "include",
          body: data,
        };
      },
    }),
    getConfirm: builder.query<ITestdrive | null, void>({
      query() {
        return {
          url: "/testdrives/confirm",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: ITestdrive | null }) => result.data,
    }),
    confirmTestdrive: builder.mutation<
      IGenericResponse,
      { testdrive_id: string }
    >({
      query(data) {
        return {
          method: "PATCH",
          url: "/testdrives/confirm",
          credentials: "include",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useCreateTestdriveMutation,
  useLazyGetTestdriveByDateQuery,
  useLazyGetPenddingQuery,
  useAssignTestdriveMutation,
  useLazyGetConfirmQuery,
  useConfirmTestdriveMutation,
} = testdriveApi;
