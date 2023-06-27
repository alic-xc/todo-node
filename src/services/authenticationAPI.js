import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const authenticationAPI = createApi({
  reducerPath: "authenticationAPI",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    createUserAccount: builder.mutation({
      query: (initialRegistration) => ({
        url: "/auth/register",
        method: "POST",
        body: initialRegistration,
      }),
    }),
    login: builder.mutation({
      query: (initialLogin) => ({
        url: "auth/login/",
        method: "POST",
        body: initialLogin,
      }),
    }),
  }),
});

export const { useCreateUserAccountMutation, useLoginMutation } =
  authenticationAPI;
