const express = require("express");
const { questionModel, questionCommentModel } = require("../Models/question");
const { jwtAuthMiddleware } = require("../Middlewares/jwtMiddleware");
const router = express.Router();

// Create a Question
router.post("/", jwtAuthMiddleware, async (req, res) => {
  const { title, body, tags } = req.body;
  try {
    const newQuestion = new questionModel({
      title,
      body,
      tags,
      author: req.user._id,
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all Questions
router.get("/", async (req, res) => {
  try {
    const questions = await questionModel
      .find()
      .populate("author", "name")
      .exec();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single Question by ID
router.get("/:id", async (req, res) => {
  try {
    const question = await questionModel
      .findById(req.params.id)
      .populate("author", "name")
      .exec();
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a Question
router.put("/:id", jwtAuthMiddleware, async (req, res) => {
  const { title, body, tags } = req.body;
  try {
    const question = await questionModel.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    if (question.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    question.title = title || question.title;
    question.body = body || question.body;
    question.tags = tags || question.tags;
    question.updatedAt = Date.now();

    await question.save();
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a Question
router.delete("/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const question = await questionModel.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    if (question.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await question.remove();
    res.status(200).json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a Comment on a Question
router.post("/:id/comments", jwtAuthMiddleware, async (req, res) => {
  const { body } = req.body;
  try {
    const question = await questionModel.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    const newComment = new questionCommentModel({
      body,
      author: req.user._id,
      question: question._id,
    });

    question.comments.push(newComment);
    await question.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all comments for a Question
router.get("/:id/comments", async (req, res) => {
  try {
    // Find the question by its ID and populate the comments
    const question = await questionModel
      .findById(req.params.id)
      .populate("comments.author", "name") // Populate the author of each comment (optional)
      .exec();

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json(question.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a Comment on a Question
router.put(
  "/:questionId/comments/:commentId",
  jwtAuthMiddleware,
  async (req, res) => {
    const { body } = req.body;
    try {
      const question = await questionModel.findById(req.params.questionId);
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      const comment = question.comments.id(req.params.commentId);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      if (comment.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      comment.body = body || comment.body;
      comment.updatedAt = Date.now();

      await question.save();
      res.status(200).json(comment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Delete a Comment on a Question
router.delete(
  "/:questionId/comments/:commentId",
  jwtAuthMiddleware,
  async (req, res) => {
    try {
      const question = await questionModel.findById(req.params.questionId);
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      const comment = question.comments.id(req.params.commentId);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      if (comment.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      comment.remove();
      await question.save();
      res.status(200).json({ message: "Comment deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
