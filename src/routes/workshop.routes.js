const { Router } = require("express");
const route = Router();
const { addWorkshop, updateWorkshop, getWorkshop, getAllWorkshops, virtualDeleteWorkshop, deleteWorkshop } = require("../controllers/workshop.controllers");
const { isAdmin, isAuthenticated } = require("../middlewares/auth");

route.post("/create-workshop", isAuthenticated, isAdmin("admin"), addWorkshop);
route.put("/update-workshop/:id", isAuthenticated, isAdmin("admin"), updateWorkshop);
route.get("/get-workshop/:id", isAuthenticated, getWorkshop);
route.put("/v-delete-workshop/:id", isAuthenticated, isAdmin("admin"), virtualDeleteWorkshop);
route.delete("/delete-workshop/:id", isAuthenticated, isAdmin("admin"), deleteWorkshop);
route.get("/", getAllWorkshops)

module.exports = route