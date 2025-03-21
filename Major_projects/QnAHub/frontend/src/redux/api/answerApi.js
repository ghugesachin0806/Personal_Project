import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const answersApi = createApi({
    reducerPath: "answersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/answer",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createAnswer: builder.mutation({
            query: (answerData) => ({
                url: "/",
                method: "POST",
                body: answerData,
            }),
        }),
        getAnswersByQuestion: builder.query({
            query: (questionId) => `/${questionId}`,
        }),
        getAnswerById: builder.query({
            query: (id) => `/${id}`,
        }),
        updateAnswer: builder.mutation({
            query: ({ id, answerData }) => ({
                url: `/${id}`,
                method: "PUT",
                body: answerData,
            }),
        }),
        deleteAnswer: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
        }),
        createAnswerComment: builder.mutation({
            query: ({ answerId, commentData }) => ({
                url: `/${answerId}/comments`,
                method: "POST",
                body: commentData,
            }),
        }),
        getAnswerComments: builder.query({
            query: (answerId) => `/${answerId}/comments`,
        }),
        updateAnswerComment: builder.mutation({
            query: ({ answerId, commentId, commentData }) => ({
                url: `/${answerId}/comments/${commentId}`,
                method: "PUT",
                body: commentData,
            }),
        }),
        deleteAnswerComment: builder.mutation({
            query: ({ answerId, commentId }) => ({
                url: `/${answerId}/comments/${commentId}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useCreateAnswerMutation,
    useGetAnswersByQuestionQuery,
    useGetAnswerByIdQuery,
    useUpdateAnswerMutation,
    useDeleteAnswerMutation,
    useCreateAnswerCommentMutation,
    useGetAnswerCommentsQuery,
    useUpdateAnswerCommentMutation,
    useDeleteAnswerCommentMutation,
} = answersApi;