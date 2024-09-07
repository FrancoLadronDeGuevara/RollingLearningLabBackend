const { Router } = require("express");
const route = Router();
const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const {
  getAllRequests,
  requestSpeaker,
  requestWorkshop,
  editRequest,
  cancelRequest,
  getRoleRequest,
  deleteRequest,
  resendRequest
} = require("../controllers/request.controllers");

route.get("/", isAuthenticated, isAdmin("admin"), getAllRequests);

route.post("/request-role", isAuthenticated, requestSpeaker);

route.post(
  "/request-workshop",
  isAuthenticated,
  isAdmin("speaker"),
  requestWorkshop
);

route.put("/edit-request/:id", isAuthenticated, isAdmin("admin"), editRequest);

route.delete(
  "/cancel-request/:id",
  isAuthenticated,
  isAdmin("speaker"),
  cancelRequest
);

route.get(
  "/get-role-request/:id",
  isAuthenticated,
  getRoleRequest
);

route.delete(
  "/delete-request/:id",
  isAuthenticated,
  isAdmin("admin"),
  deleteRequest
);

route.put("/resend-request/:id", isAuthenticated, resendRequest);

module.exports = route;
