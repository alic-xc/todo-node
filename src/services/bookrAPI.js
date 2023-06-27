/**
 *  --- Bookr API ---
 *  React Redux toolkit.
 *  This section handles requests to API without the worrying about tool to handle request.
 */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const bookrAPI = createApi({
  reducerPath: "BookrAPI",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");
      headers.set("authorization", "Bearer " + localStorage.getItem("access"));
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getTodo: builder.query({
      query: () => `todos/user`,
    }),
    getMyAccount: builder.query({ query: () => "auth/user" }),
    addTodo: builder.mutation({
      query: (initial) => ({
        url: `todos/`,
        method: "POST",
        body: initial,
      }),
    }),
    patchTodo: builder.mutation({
      query: (initial) => ({
        url: `todos/${initial.id}`,
        method: "PATCH",
        body: initial,
      }),
    }),

    deleteTodo: builder.mutation({
      query: (initial) => ({
        url: `todos/${initial.id}`,
        method: "DELETE",
        body: initial,
      }),
    }),
  }),
});

export const {
  useGetMyAccountQuery,
  useGetTodoQuery,
  useAddTodoMutation,
  usePatchTodoMutation,
  useDeleteTodoMutation,
} = bookrAPI;
