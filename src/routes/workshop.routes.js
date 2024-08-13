const { Router } = require("express");
const route = Router();
const { addWorkshop, updateWorkshop, getWorkshop, getAllWorkshops } = require("../controllers/workshop.controllers");
const { isAdmin, isAuthenticated } = require("../middlewares/auth");

route.post("/create-workshop", isAuthenticated, isAdmin("admin"), addWorkshop);
route.put("/update-workshop", isAuthenticated, isAdmin("admin"), updateWorkshop);
route.get("/get-workshop/:id", isAuthenticated, getWorkshop);
route.get("/get-all-workshops", getAllWorkshops)

module.exports = route