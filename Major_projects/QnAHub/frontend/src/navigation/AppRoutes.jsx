import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import LoginComponent from "../pages/Auth/LoginComponent";
import SignUpComponent from "../pages/Auth/SignUpComponent";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import MainContent from "../components/MainContent/MainContent";
import PostQuestion from "../components/PostQuestion/PostQuestion";
import QuestionPreview from "../components/QuestionPreview/QuestionPreview";
import AnswerPreview from "../components/AnswerPreview/AnswerPreview";
import PostAnswer from "../components/PostAnswer/PostAnswer";
import PostArticle from "../components/PostArticle/PostArticle";
import ArticlePreview from "../components/ArticlePreview/ArticlePreview";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* public */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/signup" element={<SignUpComponent />} />
      {/* protected */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard/" element={<Dashboard />}>
          <Route index path="home" element={<MainContent />} />
          <Route path="post-question" element={<PostQuestion />} />
          <Route path="post-article" element={<PostArticle />} />
          <Route path="preview-articles" element={<ArticlePreview />} />
          <Route path="question/:id" element={<QuestionPreview />}>
            <Route index element={<AnswerPreview />} />
            <Route path="post-answer" element={<PostAnswer />} />
          </Route>
        </Route>
      </Route>
    </>
  )
);

const AppRoutes = () => {
  return <RouterProvider router={routes} />;
};

export default AppRoutes;
