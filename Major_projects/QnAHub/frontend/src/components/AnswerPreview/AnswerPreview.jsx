import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetAnswersByQuestionQuery } from "../../redux/api/answerApi";

const AnswerPreview = () => {
  const { id } = useParams();
  const { data: answers, error, isLoading } = useGetAnswersByQuestionQuery(id);
  const [allAnswers, setAllAnswers] = useState([]);

  useEffect(() => {
    if (answers) {
      setAllAnswers(answers);
    }
  }, [answers]);

  if (isLoading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Answers</h2>
      {allAnswers.length > 0 ? (
        allAnswers.map((answer, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-4">
            <p className="text-lg text-gray-600 mb-4">{answer.body}</p>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Comments:</h3>
            <ul className="space-y-4 mb-4">
              {answer.comments.map((comment, idx) => (
                <li key={idx} className="border-b pb-4">
                  <p className="text-lg text-gray-700 mb-2">{comment.body}</p>
                  <small className="text-gray-500">By {comment.author}</small>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No answers available.</div>
      )}
    </div>
  );
};

export default AnswerPreview;
