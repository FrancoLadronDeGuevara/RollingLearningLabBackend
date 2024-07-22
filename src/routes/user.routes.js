const { Router } = require("express");
const {
  createUser,
  loginUser,
  getUser,
  logoutUser,
  getAllUsers,
  editUser,
  deleteUser,
} = require("../controllers/user.controllers");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const route = Router();

route.post("/create", createUser);

route.post("/login-user", loginUser);

route.get("/get-user", isAuthenticated, getUser);

route.get("/logout-user", logoutUser);

route.get("/", getAllUsers);

route.put("/edit/:id", isAuthenticated, isAdmin("admin"), editUser);

route.delete("/delete/:id", isAuthenticated, isAdmin("admin"), deleteUser);

module.exports = route;