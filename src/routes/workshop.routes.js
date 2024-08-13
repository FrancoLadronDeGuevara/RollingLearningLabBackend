const { Router } = require("express");
const route = Router();
const { addWorkshop, updateWorkshop, getWorkshop, getAllWorkshops } = require("../controllers/workshop.controllers");
const { isAdmin, isAuthenticated } = require("../middlewares/auth");

route.post("/create-workshop", isAuthenticated, isAdmin("admin"), addWorkshop);
route.put("/update-workshop/:id", isAuthenticated, isAdmin("admin"), updateWorkshop);
route.get("/get-workshop/:id", isAuthenticated, getWorkshop);
route.get("/", getAllWorkshops)

module.exports = route