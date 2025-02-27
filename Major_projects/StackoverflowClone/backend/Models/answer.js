const { Schema, model } = require("mongoose");

// Answer comment schema
const answerCommentSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Answer schema
const answerSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "question",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  comments: [answerCommentSchema],  // Embedding the comment schema as an array of subdocuments
});

// Answer comment model
const answerCommentModel = model("answerComment", answerCommentSchema);

// Answer model
const answerModel = model("answer", answerSchema);

// Export models
module.exports = { answerModel, answerCommentModel };
