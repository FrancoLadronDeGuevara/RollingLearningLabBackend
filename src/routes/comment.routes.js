const { Router } = require("express");
const route = Router();
const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const {
  addWorkshopComment,
  addEventComment,
  editComment,
  getWorkshopComments,
  getEventComments,
  getUserComments,
  replyComment,
  deleteReply,
  editReply,
  deleteComment,
  likeComment,
  blockComment,
  unblockComment,
} = require("../controllers/comment.controllers");

route.post("/add-workshop-comment/:id", isAuthenticated, addWorkshopComment);

route.post("/add-event-comment/:id", isAuthenticated, addEventComment);

route.put("/edit-comment/:id", isAuthenticated, editComment);

route.get("/get-workshop-comments/:id", isAuthenticated, getWorkshopComments);

route.get("/get-event-comments/:id", isAuthenticated, getEventComments);

route.get(
  "/get-user-comments/:id",
  isAuthenticated,
  isAdmin("admin"),
  getUserComments
);

route.post("/reply-comment/:id", isAuthenticated, replyComment);

route.put("/delete-reply/:id", isAuthenticated, deleteReply);

route.put("/edit-reply/:id", isAuthenticated, editReply);

route.delete("/delete-comment/:id", isAuthenticated, deleteComment);

route.put("/like-comment/:id", isAuthenticated, likeComment);

route.put(
  "/block-comment/:id",
  isAuthenticated,
  isAdmin("admin"),
  blockComment
);

route.put("/block-reply/:id", isAuthenticated, isAdmin("admin"), blockComment);

route.put(
  "/unblock-comment/:id",
  isAuthenticated,
  isAdmin("admin"),
  unblockComment
);

route.put(
  "/unblock-reply/:id",
  isAuthenticated,
  isAdmin("admin"),
  unblockComment
);

module.exports = route;
