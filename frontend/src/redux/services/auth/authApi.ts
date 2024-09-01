// create api RTK Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../features/auth/authSlice";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}/v1/api/` }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<User, FormData>({
      query: (data) => {
        return {
          url: "auth/login",
          method: "POST",
          credentials: "include", // maybe not: check ky
          body: data,
        };
      },
      transformResponse: (response: User) => {
        return response;
      },
      transformErrorResponse: (response) => {
        return response;
      },
    }),
    register: builder.mutation<User, FormData>({
      query: (data) => {
        return {
          url: "auth/register",
          method: "POST",
          credentials: "include",
          body: data,
        };
      },
      transformResponse: (response: User) => {
        return response;
      },
      transformErrorResponse: (response) => {
        return response;
      },
    }),
  }),
});
