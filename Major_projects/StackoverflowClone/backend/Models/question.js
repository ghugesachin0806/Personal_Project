const { Schema, model } = require("mongoose");

// Question comment schema
const questionCommentSchema = new Schema({
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
});

// Question schema
const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 200,
  },
  body: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
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
  answers: [{
    type: Schema.Types.ObjectId,
    ref: "answer",
  }],
  comments: [questionCommentSchema],  // Embedding the comment schema as an array of subdocuments
});

// Create models
const questionModel = model("question", questionSchema);
const questionCommentModel = model("questionComment", questionCommentSchema);

module.exports = { questionModel, questionCommentModel };

