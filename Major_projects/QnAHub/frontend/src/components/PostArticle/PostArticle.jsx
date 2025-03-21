import React, { useState } from 'react';
import { TextInput, Textarea, Button, Group } from '@mantine/core';
import { useCreatePostMutation } from '../../redux/api/postApi';

const PostArticle = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createPost] = useCreatePostMutation();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const postData = {
      title,
      body,
      tags: tags.split(',').map(tag => tag.trim()),
    };

    try {
      await createPost(postData).unwrap();

      // Clear the form after submission
      setTitle('');
      setBody('');
      setTags('');
      alert('Article posted successfully!');
    } catch (error) {
      console.error(error);
      alert('Error posting the article.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Post a New Article</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Article Title"
          placeholder="Enter your article title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          label="Article Body"
          placeholder="Write your article here"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <Textarea
          label="Tags (comma separated)"
          placeholder="e.g. Technology, AI, JavaScript"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <Group position="right" mt="md">
          <Button type="submit" loading={isSubmitting}>Post Article</Button>
        </Group>
      </form>
    </div>
  );
};

export default PostArticle;
