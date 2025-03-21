import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/post",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createPost: builder.mutation({
            query: (postData) => ({
                url: "/",
                method: "POST",
                body: postData,
            }),
        }),
        getPosts: builder.query({
            query: () => "/",
        }),
        getPostById: builder.query({
            query: (id) => `/${id}`,
        }),
        updatePost: builder.mutation({
            query: ({ id, postData }) => ({
                url: `/${id}`,
                method: "PUT",
                body: postData,
            }),
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
        }),
        createCommentPost: builder.mutation({
            query: ({ postId, commentData }) => ({
                url: `/${postId}/comments`,
                method: "POST",
                body: commentData,
            }),
        }),
        getCommentPosts: builder.query({
            query: (postId) => `/${postId}/comments`,
        }),
        updateCommentPost: builder.mutation({
            query: ({ postId, commentId, commentData }) => ({
                url: `/${postId}/comments/${commentId}`,
                method: "PUT",
                body: commentData,
            }),
        }),
        deleteCommentPost: builder.mutation({
            query: ({ postId, commentId }) => ({
                url: `/${postId}/comments/${commentId}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useCreatePostMutation,
    useGetPostsQuery,
    useGetPostByIdQuery,
    useUpdatePostMutation,
    useDeletePostMutation,
    useCreateCommentPostMutation,
    useGetCommentPostsQuery,
    useUpdateCommentPostMutation,
    useDeleteCommentPostMutation,
} = postsApi;