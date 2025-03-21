import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useGetQuestionByIdQuery } from "../../redux/api/questionApi";

const QuestionPreview = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetQuestionByIdQuery(id);
  const [question, setQuestion] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setQuestion(data);
    }
  }, [data]);

  if (isLoading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  const handleAnswerClick = () => {
    navigate("post-answer");
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        {question && (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              {question.title}
            </h2>
            <p className="text-lg text-gray-600 mb-4">{question.body}</p>

            <h3 className="text-xl font-medium text-gray-800 mb-2">Tags:</h3>
            <ul className="flex flex-wrap gap-2 mb-4">
              {question.tags.map((tag, index) => (
                <li
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Comments:
            </h3>
            <ul className="space-y-4 mb-4">
              {question.comments.map((comment, index) => (
                <li key={index} className="border-b pb-4">
                  <p className="text-lg text-gray-700 mb-2">{comment.body}</p>
                  <small className="text-gray-500">By {comment.author}</small>
                </li>
              ))}
            </ul>

            <button
              onClick={handleAnswerClick}
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
            >
              Answer
            </button>
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default QuestionPreview;
