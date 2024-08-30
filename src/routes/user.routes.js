const { Router } = require("express");
const {
  createUser,
  getUserToVerify,
  verifyUser,
  loginUser,
  getUser,
  getUserById,
  logoutUser,
  getAllUsers,
  editUser,
  deleteUser,
} = require("../controllers/user.controllers");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const route = Router();

route.post("/create", createUser);

route.get('/get-user-to-verify/:id', getUserToVerify)

route.put('/verify-user/:id', verifyUser);

route.post("/login-user", loginUser);

route.get("/get-user", isAuthenticated, getUser);

route.get("/get-user-by-id/:id", isAuthenticated, isAdmin("admin"), getUserById);

route.get("/logout-user", logoutUser);

route.get("/", isAuthenticated, isAdmin("admin"), getAllUsers);

route.put("/edit/:id", isAuthenticated, isAdmin("admin"), editUser);

route.delete("/delete/:id", isAuthenticated, isAdmin("admin"), deleteUser);

module.exports = route;