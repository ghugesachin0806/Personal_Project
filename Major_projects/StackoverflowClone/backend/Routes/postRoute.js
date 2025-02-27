const express = require("express");
const { postModel, commentModel } = require("../Models/post"); // Correct import for models
const { jwtAuthMiddleware } = require("../Middlewares/jwtMiddleware");
const router = express.Router();

// Create Post
router.post("/", jwtAuthMiddleware, async (req, res) => {
  const { title, body, tags } = req.body;
  const userId = req.user.id;

  if (!title || !body) {
    return res.status(400).json({ error: "Title and body are required" });
  }

  try {
    const newPost = new postModel({
      title,
      body,
      author: userId,
      tags: tags || [],
    });

    await newPost.save();

    return res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// Get All Posts
router.get("/", async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("author", "username")
      .populate("comments.author", "username");

    return res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// Get Post by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postModel
      .findById(id)
      .populate("author", "username")
      .populate("comments.author", "username");

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// Update Post
router.put("/:id", jwtAuthMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, body, tags } = req.body;
  const userId = req.user.id;

  if (!title || !body) {
    return res.status(400).json({ error: "Title and body are required" });
  }

  try {
    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.author.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "You can only update your own post" });
    }

    post.title = title;
    post.body = body;
    post.tags = tags || post.tags;
    post.updatedAt = Date.now(); // Update the updatedAt field

    await post.save();

    return res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// Delete Post
router.delete("/:id", jwtAuthMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.author.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "You can only delete your own post" });
    }

    await post.remove();

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// Create Comment on Post
router.post("/:postId/comments", jwtAuthMiddleware, async (req, res) => {
  const { body } = req.body;
  const { postId } = req.params;
  const userId = req.user.id;

  if (!body) {
    return res.status(400).json({ error: "Comment body is required" });
  }

  try {
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newComment = new commentModel({
      body,
      post: postId,
      author: userId,
    });

    post.comments.push(newComment);
    await post.save();

    return res.status(201).json({
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// Update Comment on Post
router.put(
  "/:postId/comments/:commentId",
  jwtAuthMiddleware,
  async (req, res) => {
    const { postId, commentId } = req.params;
    const { body } = req.body;
    const userId = req.user.id;

    if (!body) {
      return res.status(400).json({ error: "Comment body is required" });
    }

    try {
      const post = await postModel.findById(postId);

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      const comment = post.comments.id(commentId);

      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      if (comment.author.toString() !== userId) {
        return res
          .status(403)
          .json({ error: "You can only update your own comment" });
      }

      comment.body = body;
      comment.updatedAt = Date.now();

      await post.save();

      return res.status(200).json({
        message: "Comment updated successfully",
        comment,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
);

// Get All Comments for a Post
router.get("/:postId/comments", async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await postModel
      .findById(postId)
      .populate("comments.author", "username") // Populating the author's username for each comment
      .select("comments"); // Selecting only the comments field

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json({ comments: post.comments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// Delete Comment from Post
router.delete(
  "/:postId/comments/:commentId",
  jwtAuthMiddleware,
  async (req, res) => {
    const { postId, commentId } = req.params;
    const userId = req.user.id;

    try {
      const post = await postModel.findById(postId);

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      const comment = post.comments.id(commentId);

      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      if (comment.author.toString() !== userId) {
        return res
          .status(403)
          .json({ error: "You can only delete your own comment" });
      }

      comment.remove();
      await post.save();

      return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
);

module.exports = router;
