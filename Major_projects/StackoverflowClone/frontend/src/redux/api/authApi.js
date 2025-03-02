import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authenticationApi = createApi({
    reducerPath: "authenticationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/auth',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userData) => ({
                url: "/login",
                method: "POST",
                body: userData,
            }),
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: "/register",
                method: "POST",
                body: userData,
            }),
        }),
        resetPassword: builder.mutation({
            query: (passwordData) => ({
                url: "/reset-password",
                method: "POST",
                body: passwordData,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useResetPasswordMutation } = authenticationApi;
