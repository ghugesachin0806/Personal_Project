import React from "react";
import { useGetQuestionsQuery } from "../../redux/api/questionApi";
import { useNavigate } from "react-router-dom";

const MainContent = () => {
  const { data: questions, error, isLoading } = useGetQuestionsQuery();
  const navigate = useNavigate();

  const handleQuestionClick = (questionId) => {
    // Navigate to the specific question's detail page using its ID
    navigate(`/dashboard/question/${questionId}`);
  };

  if (isLoading)
    return <p className="text-white text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">Error fetching questions</p>
    );

  return (
    <div className="flex flex-col w-full bg-transparent p-4">
      {questions?.length > 0 ? (
        questions.map((question) => (
          <div
            key={question._id}
            className="my-4 p-4 bg-gray-700 w-auto rounded-md"
            onClick={() => handleQuestionClick(question._id)}
          >
            <h2 className="text-white text-xl font-semibold">
              {question.title}
            </h2>
            <p className="text-gray-400 mt-2">{question.body}</p>
            <p className="text-gray-500 text-sm mt-1">
              Author: {question.author?.name || "Unknown"}
            </p>
            <div className="mt-2">
              {question.tags.map((tag, index) => (
                <span
                  key={index}
                  className="mr-2 px-2 py-1 bg-blue-600 text-white text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-white text-center mt-10">No questions available</p>
      )}
    </div>
  );
};

export default MainContent;
