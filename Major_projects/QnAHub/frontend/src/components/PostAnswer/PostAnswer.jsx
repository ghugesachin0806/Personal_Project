import React, { useState } from "react";
import { Textarea, Button, Group } from "@mantine/core";
import { useCreateAnswerMutation } from "../../redux/api/answerApi";
import { useNavigate, useParams } from "react-router-dom";

const PostAnswer = ({ questionId }) => {
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const [createAnswer] = useCreateAnswerMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const answerData = {
      body,
      question: id,
    };

    try {
      await createAnswer(answerData).unwrap();
      setBody("");
      console.log("Answer posted successfully!");
    } catch (error) {
      console.error(error);
      console.log("Error posting the answer.");
    } finally {
      setIsSubmitting(false);
    }
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace("/post-answer", "");
    navigate(newPath);
  };

  return (
    <div>
      <h2>Post an Answer</h2>
      <form onSubmit={handleSubmit}>
        <Textarea
          label="Your Answer"
          placeholder="Write your answer here"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <Group position="right" mt="md">
          <Button type="submit" loading={isSubmitting}>
            Post Answer
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default PostAnswer;
