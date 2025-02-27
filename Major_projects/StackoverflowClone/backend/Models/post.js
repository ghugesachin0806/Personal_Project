const { Schema, model } = require("mongoose");

const postCommentSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "post", 
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

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 200,
  },
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
  tags: {
    type: [String],
    default: [],
  },
  comments: [postCommentSchema],  // Embedding the comment schema as an array of subdocuments
});

const postModel = model("post", postSchema);
const commentModel = model("postComment", postCommentSchema);

module.exports = { postModel, commentModel };
