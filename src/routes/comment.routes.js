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
  deleteComment,
  likeComment,
  blockComment,
} = require("../controllers/comment.controllers");

route.post("/add-workshop-comment/:id", isAuthenticated, addWorkshopComment);

route.post("/add-event-comment/:id", isAuthenticated, addEventComment);

route.put("/edit-comment/:id", isAuthenticated, editComment);

route.get("/get-wokshop-comments/:id", isAuthenticated, getWorkshopComments);

route.get("/get-event-comments/:id", isAuthenticated, getEventComments);

route.get(
  "/get-user-comments/:id",
  isAuthenticated,
  isAdmin("admin"),
  getUserComments
);

route.put("/reply-comment/:id", isAuthenticated, replyComment);

route.delete("/delete-reply/:id", isAuthenticated, deleteReply);

route.delete("/delete-comment/:id", isAuthenticated, deleteComment);

route.put("/like-comment/:id", isAuthenticated, likeComment);

route.put(
  "/block-comment/:id",
  isAuthenticated,
  isAdmin("admin"),
  blockComment
);

module.exports = route;
