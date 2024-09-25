const Comment = require("../models/comment.model");
const Workshop = require("../models/workshop.model");
const Event = require("../models/event.model");
const User = require("../models/user.model");

const addWorkshopCommentService = async (comment) => {
  const newComment = new Comment(comment);
  await newComment.save();
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
    .populate({
      path: "author",
      select: "username profileImage",
    })
    .populate({
      path: "replies",
      populate: {
        path: "author",
        select: "username profileImage",
      },
    });
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
  const editedComment = await Comment.findByIdAndUpdate(id, commentData, {
    new: true,
  })
    .populate({
      path: "author",
      select: "username profileImage",
    })
    .populate({
      path: "replies",
      populate: {
        path: "author",
        select: "username profileImage",
      },
    });
  return editedComment;
};

const deleteCommentService = async (id) => {
  const comment = await Comment.findById(id);
  comment.replies.forEach(async (reply) => {
    await Comment.findByIdAndDelete(reply._id);
  });

  await Comment.findByIdAndDelete(id);
  return comment;
};

const replyCommentService = async (id, replyData) => {
  const comment = await Comment.findById(id);
  const reply = new Comment(replyData);
  comment.replies.push(reply);
  await reply.save();
  await comment.save();

  const populatedReply = await Comment.findById(reply._id).populate({
    path: "author",
    select: "username profileImage",
  });

  return populatedReply;
};

const deleteReplyService = async (id, replyId) => {
  const comment = await Comment.findById(id);
  await Comment.findByIdAndDelete(replyId);
  comment.replies = comment.replies.filter(
    (reply) => reply._id.toString() !== replyId
  );
  await comment.save();

  const populatedComment = await Comment.findById(id)
    .populate({
      path: "author",
      select: "username profileImage",
    })
    .populate({
      path: "replies",
      populate: {
        path: "author",
        select: "username profileImage",
      },
    });

  return populatedComment;
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
  await Comment.findByIdAndUpdate(
    id,
    {
      blocked: true,
    },
    { new: true }
  );

  const populatedComment = await Comment.findById(id)
    .populate({
      path: "author",
      select: "username profileImage",
    })
    .populate({
      path: "replies",
      populate: {
        path: "author",
        select: "username profileImage",
      },
    });

  return populatedComment;
};

const unblockCommentService = async (id) => {
  await Comment.findByIdAndUpdate(
    id,
    {
      blocked: false,
    },
    { new: true }
  );

  const populatedComment = await Comment.findById(id)
    .populate({
      path: "author",
      select: "username profileImage",
    })
    .populate({
      path: "replies",
      populate: {
        path: "author",
        select: "username profileImage",
      },
    });

  return populatedComment;
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
  deleteReplyService,
  likeCommentService,
  blockCommentService,
  unblockCommentService,
};
