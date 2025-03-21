import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetPostsQuery } from "../../redux/api/postApi";

const ArticlePreview = () => {
  const { data, error, isLoading } = useGetPostsQuery();
  const posts = data?.posts || []; // Ensure we're accessing the 'posts' array correctly
  const navigate = useNavigate();

  const handleArticleClick = (postId) => {
    // Navigate to the specific article's detail page using its ID
    navigate(`/dashboard/article/${postId}`);
  };

  if (isLoading)
    return <p className="text-black text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">Error fetching articles</p>
    );

  return (
    <div className="flex flex-col w-full bg-transparent p-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            className="my-4 p-4 bg-gray-700 w-auto rounded-md"
            onClick={() => handleArticleClick(post._id)}
          >
            <h2 className="text-white text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-500 text-sm mt-1">
              Author: {post.author?.username || "Unknown"}
            </p>
            <div className="mt-2">
              {post.tags.map((tag, index) => (
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
        <p className="text-black text-center mt-10">No articles available</p>
      )}
    </div>
  );
};

export default ArticlePreview;
