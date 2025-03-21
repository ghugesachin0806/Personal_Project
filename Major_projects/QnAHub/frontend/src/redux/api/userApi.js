import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/user',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // Fetch user profile
        getUserProfile: builder.query({
            query: () => ({
                url: "",
                method: "GET",
            }),
        }),
        
        // Update user profile
        updateUserProfile: builder.mutation({
            query: (userData) => ({
                url: "",
                method: "PUT",
                body: userData,
            }),
        }),

        // Delete user account
        deleteUserAccount: builder.mutation({
            query: () => ({
                url: "",
                method: "DELETE",
            }),
        }),
    }),
});

export const { 
    useGetUserProfileQuery, 
    useUpdateUserProfileMutation, 
    useDeleteUserAccountMutation 
} = userApi;
