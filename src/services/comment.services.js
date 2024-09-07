const Comment = require("../models/comment.model");
const Workshop = require("../models/workshop.model");
const Event = require("../models/event.model");
const User = require("../models/user.model");

const addWorkshopCommentService = async (comment, id, userId) => {
  const newComment = new Comment(comment);
  await newComment.save();

  await Workshop.findByIdAndUpdate(id, {
    $push: { comments: newComment._id },
  });
  return newComment;
};

const addEventCommentService = async (comment, id, userId) => {
  const newComment = new Comment(comment);
  await newComment.save();

  await Event.findByIdAndUpdate(id, {
    $push: { comments: newComment._id },
  });
  return newComment;
};

const getWorkshopCommentsService = async (id) => {
  const comments = await Comment.find({ workshop: id })
    .populate("author", "username")
    .populate("replies", "content author");

  return comments;
};

const getEventCommentsService = async (id) => {
  const comments = await Comment.find({ event: id })
    .populate("author", "username")
    .populate("replies", "content author");

  return comments;
};

const getUserCommentsService = async (id) => {
  const comments = await Comment.find({ author: id })
    .populate("author", "username")
    .populate("replies", "content author")
    .populate("workshop", "title _id")
    .populate("event", "title _id");
  return comments;
};

const editCommentService = async (id, commentData) => {
  return Comment.findByIdAndUpdate(id, commentData, { new: true });
};

const deleteCommentService = async (id) => {
  return Comment.findByIdAndDelete(id);
};

const replyCommentService = async (id, replyData) => {
  const comment = await Comment.findById(id);
  const reply = new Comment(replyData);
  comment.replies.push(reply);
  await reply.save();
  await comment.save();
  return reply;
};

const likeCommentService = async (id, userId) => {
  const comment = await Comment.findById(id);
  if (comment.likes.includes(userId)) {
    comment.likes.pull(userId);
  } else {
    comment.likes.push(userId);
  }
  await comment.save();
  return comment;
};

const blockCommentService = async (id) => {
  return Comment.findByIdAndUpdate(id, { blocked: true }, { new: true });
};

module.exports = {
  addWorkshopCommentService,
  addEventCommentService,
  getWorkshopCommentsService,
  getEventCommentsService,
  getUserCommentsService,
  editCommentService,
  deleteCommentService,
  replyCommentService,
  likeCommentService,
  blockCommentService,
};
