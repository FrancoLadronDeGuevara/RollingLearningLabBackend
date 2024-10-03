const { Router } = require("express");
const route = Router();
const {
  addWorkshop,
  editWorkshop,
  getWorkshop,
  getAllWorkshops,
  deleteWorkshop,
  addWorkshopBySpeaker
} = require("../controllers/workshop.controllers");
const { isAdmin, isAuthenticated } = require("../middlewares/auth");

route.post("/create-workshop", isAuthenticated, isAdmin("admin"), addWorkshop);
route.post(
  "/create-workshop-by-speaker",
  isAuthenticated,
  isAdmin("speaker"),
  addWorkshopBySpeaker
);
route.put(
  "/update-workshop/:id",
  isAuthenticated,
  isAdmin("admin"),
  editWorkshop
);
route.get("/get-workshop/:id", isAuthenticated, getWorkshop);
route.delete(
  "/delete-workshop/:id",
  isAuthenticated,
  isAdmin("admin"),
  deleteWorkshop
);
route.get("/", getAllWorkshops);

module.exports = route;
