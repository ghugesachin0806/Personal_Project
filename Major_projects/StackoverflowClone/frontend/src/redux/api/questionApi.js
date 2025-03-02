import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const questionsApi = createApi({
    reducerPath: "questionsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/question",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createQuestion: builder.mutation({
            query: (questionData) => ({
                url: "/",
                method: "POST",
                body: questionData,
            }),
        }),
        getQuestions: builder.query({
            query: () => "/",
        }),
        getQuestionById: builder.query({
            query: (id) => `/${id}`,
        }),
        updateQuestion: builder.mutation({
            query: ({ id, questionData }) => ({
                url: `/${id}`,
                method: "PUT",
                body: questionData,
            }),
        }),
        deleteQuestion: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
        }),
        createQuestionComment: builder.mutation({
            query: ({ questionId, commentData }) => ({
                url: `/${questionId}/comments`,
                method: "POST",
                body: commentData,
            }),
        }),
        getQuestionComments: builder.query({
            query: (questionId) => `/${questionId}/comments`,
        }),
        updateQuestionComment: builder.mutation({
            query: ({ questionId, commentId, commentData }) => ({
                url: `/${questionId}/comments/${commentId}`,
                method: "PUT",
                body: commentData,
            }),
        }),
        deleteQuestionComment: builder.mutation({
            query: ({ questionId, commentId }) => ({
                url: `/${questionId}/comments/${commentId}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useCreateQuestionMutation,
    useGetQuestionsQuery,
    useGetQuestionByIdQuery,
    useUpdateQuestionMutation,
    useDeleteQuestionMutation,
    useCreateQuestionCommentMutation,
    useGetQuestionCommentsQuery,
    useUpdateQuestionCommentMutation,
    useDeleteQuestionCommentMutation,
} = questionsApi;
