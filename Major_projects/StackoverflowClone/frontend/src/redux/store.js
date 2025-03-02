import { configureStore } from "@reduxjs/toolkit";
import { answersApi } from "./api/answerApi";
import { postsApi } from "./api/postApi";
import { questionsApi } from "./api/questionApi";
import { userApi } from "./api/userApi";
import authReducer from "./slices/authApiSlice";
import { authenticationApi } from "./api/authApi";

const store = configureStore({
  reducer: {
    auth: authReducer, // Add authSlice reducer to the store
    [authenticationApi.reducerPath]: authenticationApi.reducer, // Authentication API reducer
    [answersApi.reducerPath]: answersApi.reducer, // Answers API reducer
    [postsApi.reducerPath]: postsApi.reducer, // Posts API reducer
    [questionsApi.reducerPath]: questionsApi.reducer, // Questions API reducer
    [userApi.reducerPath]: userApi.reducer, // User API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authenticationApi.middleware, // Authentication API middleware
      answersApi.middleware, // Answers API middleware
      postsApi.middleware, // Posts API middleware
      questionsApi.middleware, // Questions API middleware
      userApi.middleware // User API middleware
    ),
});

export default store;
