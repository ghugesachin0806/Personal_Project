const express = require("express");
const { answerModel, answerCommentModel } = require("../Models/answer");
const { jwtAuthMiddleware } = require("../Middlewares/jwtMiddleware");
const router = express.Router();

// Create an answer
router.post("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const { body, question } = req.body;

    const answer = new answerModel({
      body,
      author: req.user._id, // User is retrieved from JWT auth middleware
      question,
    });

    await answer.save();
    res.status(201).json(answer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all answers for a specific question
router.get("/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;
    const answers = await answerModel
      .find({ question: questionId })
      .populate("author", "name");

    if (!answers) {
      return res.status(404).json({ message: "Answers not found" });
    }

    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific answer
router.get("/:answerId", async (req, res) => {
  try {
    const { answerId } = req.params;
    const answer = await answerModel
      .findById(answerId)
      .populate("author", "name");

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an answer
router.put("/:answerId", jwtAuthMiddleware, async (req, res) => {
  try {
    const { answerId } = req.params;
    const { body } = req.body;

    const answer = await answerModel.findById(answerId);

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    if (answer.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this answer" });
    }

    answer.body = body;
    answer.updatedAt = Date.now();

    await answer.save();
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an answer
router.delete("/:answerId", jwtAuthMiddleware, async (req, res) => {
  try {
    const { answerId } = req.params;

    const answer = await answerModel.findById(answerId);

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    if (answer.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this answer" });
    }

    await answer.remove();
    res.status(200).json({ message: "Answer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a comment to an answer
router.post(
  "/:answerId/comments",
  jwtAuthMiddleware,
  async (req, res) => {
    try {
      const { answerId } = req.params;
      const { body } = req.body;

      const answer = await answerModel.findById(answerId);

      if (!answer) {
        return res.status(404).json({ message: "Answer not found" });
      }

      const comment = new answerCommentModel({
        body,
        author: req.user._id,
      });

      answer.comments.push(comment);
      await answer.save();

      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Get all comments for a specific answer
router.get("/:answerId/comments", async (req, res) => {
  try {
    const { answerId } = req.params;

    // Find the answer and populate its comments
    const answer = await answerModel
      .findById(answerId)
      .populate("comments.author", "name");

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    // Return the comments associated with the answer
    res.status(200).json(answer.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an answer comment
router.put(
  "/:answerId/comments/:commentId",
  jwtAuthMiddleware,
  async (req, res) => {
    try {
      const { answerId, commentId } = req.params;
      const { body } = req.body;

      const answer = await answerModel.findById(answerId);

      if (!answer) {
        return res.status(404).json({ message: "Answer not found" });
      }

      const comment = answer.comments.id(commentId);

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      if (comment.author.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this comment" });
      }

      comment.body = body;
      comment.updatedAt = Date.now();

      await answer.save();
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Delete an answer comment
router.delete(
  "/:answerId/comments/:commentId",
  jwtAuthMiddleware,
  async (req, res) => {
    try {
      const { answerId, commentId } = req.params;

      const answer = await answerModel.findById(answerId);

      if (!answer) {
        return res.status(404).json({ message: "Answer not found" });
      }

      const comment = answer.comments.id(commentId);

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      if (comment.author.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ message: "Not authorized to delete this comment" });
      }

      comment.remove();
      await answer.save();
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
