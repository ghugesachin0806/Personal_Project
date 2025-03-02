import React, { useState } from 'react';
import { TextInput, Textarea, Button, Group } from '@mantine/core';
import { useCreateQuestionMutation } from '../../redux/api/questionApi';

const PostQuestion = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createQuestion] = useCreateQuestionMutation(); // mutation hook

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const questionData = {
      title,
      body,
      tags: tags.split(',').map(tag => tag.trim()), // assuming tags are comma-separated
    };

    try {
      await createQuestion(questionData).unwrap(); // sends the question data to the API

      // Clear the form after submission
      setTitle('');
      setBody('');
      setTags('');
      alert('Question posted successfully!');
    } catch (error) {
      console.error(error);
      alert('Error posting the question.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Post a New Question</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Question Title"
          placeholder="Enter your question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          label="Question Body"
          placeholder="Describe your question in detail"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <Textarea
          label="Tags (comma separated)"
          placeholder="e.g. React, MongoDB, Mongoose"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <Group position="right" mt="md">
          <Button type="submit" loading={isSubmitting}>Post Question</Button>
        </Group>
      </form>
    </div>
  );
};

export default PostQuestion;
